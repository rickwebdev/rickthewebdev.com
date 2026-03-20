import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim();
const dataset = import.meta.env.VITE_SANITY_DATASET?.trim() || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION?.trim() || '2024-01-01';
const token = import.meta.env.VITE_SANITY_READ_TOKEN?.trim();

export const sanityConfigured = Boolean(projectId);

export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // API origin in dev so publishes show up immediately; CDN in production.
      useCdn: import.meta.env.PROD,
      ...(token ? { token } : {}),
    })
  : null;

const builder = projectId ? imageUrlBuilder({ projectId, dataset }) : null;

export function urlForImage(source: unknown): string {
  if (!builder || !source || typeof source !== 'object') return '';
  try {
    return (
      builder
        .image(source as Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0])
        .width(1200)
        .fit('max')
        .auto('format')
        .url() || ''
    );
  } catch {
    return '';
  }
}
