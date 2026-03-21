import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const MAX = { name: 200, email: 320, subject: 200, message: 10000 } as const;

function clip(s: string, max: number): string {
  return s.replace(/[\r\n]/g, ' ').trim().slice(0, max);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function errDetail(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

type MailPayload = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
};

async function sendWithSmtp(
  user: string,
  pass: string,
  mail: MailPayload,
): Promise<void> {
  const customHost = process.env.SMTP_HOST?.trim();

  const baseOpts = {
    auth: { user, pass },
    connectionTimeout: 25_000,
    socketTimeout: 25_000,
  };

  if (customHost) {
    const port = Number(process.env.SMTP_PORT) || 587;
    const secure = process.env.SMTP_SECURE === 'true';
    const transporter = nodemailer.createTransport({
      ...baseOpts,
      host: customHost,
      port,
      secure,
      ...(!secure ? { requireTLS: true as const } : {}),
    });
    await transporter.sendMail(mail);
    return;
  }

  // Default: Gmail — try 465 then 587 (datacenter blocks are common; custom SMTP_HOST avoids this)
  const attempts: Array<{
    host: string;
    port: number;
    secure: boolean;
    requireTLS?: boolean;
  }> = [
    { host: 'smtp.gmail.com', port: 465, secure: true },
    { host: 'smtp.gmail.com', port: 587, secure: false, requireTLS: true },
  ];

  let lastErr: unknown;
  for (const cfg of attempts) {
    try {
      const transporter = nodemailer.createTransport({
        ...baseOpts,
        host: cfg.host,
        port: cfg.port,
        secure: cfg.secure,
        ...(cfg.requireTLS ? { requireTLS: true as const } : {}),
      });
      await transporter.sendMail(mail);
      return;
    } catch (e) {
      lastErr = e;
      console.warn('[contact] Gmail SMTP attempt failed', cfg.port, errDetail(e));
    }
  }
  throw lastErr;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.replace(/\s/g, '').trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || smtpUser;
  const smtpDebug = process.env.SMTP_DEBUG === '1' || process.env.SMTP_DEBUG === 'true';

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

  const mail: MailPayload = {
    from: `"Portfolio" <${smtpUser}>`,
    to,
    replyTo: emailStr,
    subject: `Portfolio contact: ${subjectStr}`,
    text,
  };

  try {
    await sendWithSmtp(smtpUser, smtpPass, mail);
  } catch (err) {
    console.error('[contact] SMTP error:', err);
    const payload: { error: string; detail?: string } = { error: 'Failed to send' };
    if (smtpDebug) {
      payload.detail = errDetail(err);
    }
    return res.status(500).json(payload);
  }

  return res.status(200).json({ success: true });
}

export const config = {
  maxDuration: 30,
};
