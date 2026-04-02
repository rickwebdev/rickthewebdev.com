/** Inline SVG placeholders so portfolio/avatar work without bundled PNGs (Sanity serves real assets in production). */

export const PORTFOLIO_CARD_PLACEHOLDER_IMAGE =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><rect fill="#2a2b38" width="100%" height="100%"/><rect fill="none" stroke="#4a4f5f" stroke-width="1" x="0.5" y="0.5" width="399" height="199"/></svg>',
  );

export const AVATAR_PLACEHOLDER_IMAGE =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#3d3d52"/><stop offset="100%" style="stop-color:#1a1a24"/></linearGradient></defs><rect fill="url(#g)" width="300" height="300" rx="8"/><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="#a8a8b8" font-family="system-ui,sans-serif" font-size="72" font-weight="600">RO</text></svg>',
  );
