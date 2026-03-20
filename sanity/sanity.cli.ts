import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID?.trim();
const dataset = process.env.SANITY_STUDIO_DATASET?.trim() ?? 'production';

if (!projectId || projectId === 'placeholder') {
  throw new Error(
    'Set SANITY_STUDIO_PROJECT_ID in sanity/.env (see .env.example). ID is in https://www.sanity.io/manage',
  );
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: process.env.SANITY_STUDIO_STUDIO_HOST,
});
