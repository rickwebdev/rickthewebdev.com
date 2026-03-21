import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const MAX = { name: 200, email: 320, subject: 200, message: 10000 } as const;

function clip(s: string, max: number): string {
  return s.replace(/[\r\n]/g, ' ').trim().slice(0, max);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.replace(/\s/g, '').trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || smtpUser;

  if (!smtpUser || !smtpPass || !to) {
    console.error('[contact] Missing SMTP_USER, SMTP_PASS, or CONTACT_TO_EMAIL');
    return res.status(503).json({ error: 'Email not configured' });
  }

  let body: unknown = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body) as unknown;
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
  }

  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid body' });
  }

  const { name, email, subject, message } = body as Record<string, unknown>;
  const nameStr = typeof name === 'string' ? clip(name, MAX.name) : '';
  const emailStr = typeof email === 'string' ? clip(email, MAX.email) : '';
  const subjectStr = typeof subject === 'string' ? clip(subject, MAX.subject) : '';
  const messageStr = typeof message === 'string' ? clip(message, MAX.message) : '';

  if (!nameStr || !emailStr || !subjectStr || !messageStr) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!isValidEmail(emailStr)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const text = [
    `New message from your portfolio contact form`,
    ``,
    `Name: ${nameStr}`,
    `Email: ${emailStr}`,
    `Subject: ${subjectStr}`,
    ``,
    messageStr,
  ].join('\n');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${smtpUser}>`,
      to,
      replyTo: emailStr,
      subject: `Portfolio contact: ${subjectStr}`,
      text,
    });
  } catch (err) {
    console.error('[contact] SMTP error:', err);
    return res.status(500).json({ error: 'Failed to send' });
  }

  return res.status(200).json({ success: true });
}

export const config = {
  maxDuration: 15,
};
