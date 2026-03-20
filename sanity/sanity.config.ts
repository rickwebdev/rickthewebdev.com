import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { structure } from './structure';
import { schemaTypes } from './schemas';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID?.trim();
const dataset = process.env.SANITY_STUDIO_DATASET?.trim() ?? 'production';

if (!projectId || projectId === 'placeholder') {
  throw new Error(
    [
      'SANITY_STUDIO_PROJECT_ID is missing or empty.',
      '1) Create sanity/.env (not .env.example) next to sanity.config.ts.',
      '2) Add: SANITY_STUDIO_PROJECT_ID=<your id from https://www.sanity.io/manage> (no quotes).',
      '3) Restart: npm run studio',
      'If it still fails, run from repo root: npm run studio (uses sanity/.env via dotenv preload).',
    ].join(' '),
  );
}

export default defineConfig({
  name: 'default',
  title: 'Rick the Web Dev',
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
