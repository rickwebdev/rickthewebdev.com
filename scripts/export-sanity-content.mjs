/**
 * Dump published portfolio-related docs to JSON for review / collaboration (e.g. paste into Claude).
 * Run from repo root: npm run export:sanity
 * Requires .env with VITE_SANITY_PROJECT_ID (and VITE_SANITY_READ_TOKEN if dataset is private).
 */
import { createClient } from '@sanity/client';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const projectId = process.env.VITE_SANITY_PROJECT_ID?.trim();
const dataset = process.env.VITE_SANITY_DATASET?.trim() || 'production';
const token = process.env.VITE_SANITY_READ_TOKEN?.trim();

if (!projectId) {
  console.error('Missing VITE_SANITY_PROJECT_ID. Add it to .env in the repo root (see .env.example).');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.VITE_SANITY_API_VERSION?.trim() || '2024-01-01',
  useCdn: false,
  ...(token ? { token } : {}),
});

const query = `{
  "projects": *[_type == "workProject"] | order(orderRank asc, sortOrder asc),
  "caseStudies": *[_type == "caseStudy"] | order(orderRank asc, sortOrder asc),
  "skillsPage": *[_id == "skillsPage"][0],
  "resumePdf": *[_id == "resumePdf"][0]{ _id, note, "fileUrl": file.asset->url }
}`;

const payload = await client.fetch(query, {}, { perspective: 'published' });

const data = {
  exportedAt: new Date().toISOString(),
  dataset,
  perspective: 'published',
  ...payload,
};

const outDir = join(root, 'exports');
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, `sanity-portfolio-${dataset}.json`);
writeFileSync(outFile, JSON.stringify(data, null, 2), 'utf8');
console.log(`Wrote ${outFile}`);
console.log('Open that file or paste its contents into your collaborator chat.');
