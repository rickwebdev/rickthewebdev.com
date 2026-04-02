/**
 * One-off / idempotent seed: pushes WORK + SKILLS from the current site source into Sanity.
 * Run from repo: cd sanity && npm run migrate
 *
 * Portfolio screenshots are no longer committed under public/images or repo-root images/.
 * Restore that folder from backup if you need this script to upload card images; otherwise add
 * images in Sanity Studio only.
 *
 * Requires SANITY_API_WRITE_TOKEN in sanity/.env (Editor token from sanity.io/manage → API → Tokens).
 */
import { createClient } from '@sanity/client';
import { createReadStream } from 'node:fs';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');

const projectId = process.env.SANITY_STUDIO_PROJECT_ID?.trim();
const dataset = process.env.SANITY_STUDIO_DATASET?.trim() || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

if (!projectId) {
  console.error('Missing SANITY_STUDIO_PROJECT_ID in sanity/.env');
  process.exit(1);
}
if (!token) {
  console.error(
    'Missing SANITY_API_WRITE_TOKEN. Create an Editor token: https://www.sanity.io/manage → API → Tokens → Add API token',
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

/** @type {{ id: number; title: string; subtitle: string; image: string; url: string }[]} */
const websites = [
  {
    id: 0,
    title: 'Demarchelier Bistro',
    subtitle: 'UX, Dev, Design, Logo, CMS, Custom Wordpress Theme',
    image: '/images/website0.png',
    url: 'https://demarchelierrestaurant.com/',
  },
  {
    id: 1,
    title: 'Clyra Studios',
    subtitle: 'UX, Design, Dev',
    image: '/images/clyrna.png',
    url: 'https://clyrastudios.com/',
  },
  {
    id: 2,
    title: 'MyLottoGenerator.com',
    subtitle: 'UX, Design, Dev, AI Chat',
    image: '/images/lottogen.png',
    url: 'https://mylottogenerator.com/',
  },
  {
    id: 3,
    title: 'Ocean Luxe Painting & Flooring',
    subtitle: 'UX, Dev, Design, Logo',
    image: '/images/website1.png',
    url: 'https://coastalluxepainting.com/',
  },
  {
    id: 4,
    title: 'Office Chat (parody simulation)',
    subtitle: 'Web App, UX, Dev',
    image: '/images/website6.png',
    url: 'https://rickthewebdev.com/magic-8-ball/',
  },
  {
    id: 5,
    title: 'Profusek',
    subtitle: 'UX, Dev, Design, CMS, Custom Wordpress Theme',
    image: '/images/website7.png',
    url: 'https://profusek.com/',
  },
  {
    id: 6,
    title: 'Website (SPA)',
    subtitle: 'UX, Dev, Design, Logo',
    image: '/images/website8.png',
    url: 'https://taxexemptconsultants.com/',
  },
  {
    id: 7,
    title: 'Website',
    subtitle: 'UX, Dev',
    image: '/images/website12.png',
    url: 'https://subtenantstudios.com/',
  },
  {
    id: 8,
    title: 'Website',
    subtitle: 'UX, Dev, Design, Logo',
    image: '/images/website2.png',
    url: 'https://coastalluxeflooring.com/',
  },
  {
    id: 9,
    title: 'Website: Redesign',
    subtitle:
      'UX, Dev, Tech Lead [This site is no longer live, but you can view an archived version on the Wayback Machine.',
    image: '/images/website3.png',
    url: 'https://web.archive.org/web/20250523084922/https://www.getrealaboutdiabetes.com/',
  },
  {
    id: 10,
    title: 'Website: User Experience',
    subtitle: 'UX, Design, Prototyping, Tech Lead',
    image: '/images/website5.png',
    url: 'https://www.ozempic.com/lifestyle-tips/healthy-eating.html',
  },
  {
    id: 11,
    title: 'Website (SPA)',
    subtitle: 'UX, Dev, Design',
    image: '/images/website10.png',
    url: 'https://ifatknaankostman.com/',
  },
  {
    id: 12,
    title: 'Website',
    subtitle: 'UX, Tech Lead',
    image: '/images/website11.png',
    url: 'https://diabeteseducation.novocare.com/',
  },
  {
    id: 13,
    title: 'Web (SPA)',
    subtitle: 'UX, Dev, Design',
    image: '/images/website9.png',
    url: '/',
  },
];

/** @type {{ id: number; title: string; client: string; challenge: string; solution: string; results: string; technologies: string[]; image: string; url: string }[]} */
const caseStudies = [
  {
    id: 1,
    title: 'Restaurant Digital Rescue & Transformation',
    client: 'Demarchelier Bistro',
    challenge:
      'When Demarchelier Bistro reached out, their site had been hacked and their web host suspended the domain. To anyone searching online, it looked like the restaurant was closed. For a family-owned French bistro in a tourist-driven town, that kind of outage is costly, especially on weekends when out-of-towners are deciding where to eat.',
    solution:
      'My first priority was to keep them online. I quickly jumped in, pointed their domain to my VPS, and set up a redirect to Resy so customers could keep making reservations without interruption. In just under a week I launched a brand new site built from the ground up with a custom WordPress theme, secure hosting, SSL, automated backups, and caching for long term stability.',
    results:
      'The result was a polished, resilient digital home that kept reservations flowing and gave the restaurant a site that truly represents their brand. Website performance optimization achieved top benchmarks: 98 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO scores.',
    technologies: [
      'WordPress',
      'Custom Themes',
      'VPS Hosting',
      'Security',
      'Performance Optimization',
      'SEO',
      'SSL',
      'Caching',
    ],
    image: '/images/website0.png',
    url: 'https://demarchelierrestaurant.com/',
  },
  {
    id: 2,
    title: 'Healthcare UX Innovation',
    client: 'Novo Nordisk',
    challenge:
      'Complex medical information needed to be accessible and engaging for patients while maintaining clinical accuracy and compliance requirements. The project required linking each of the 50 US states to diabetes-friendly recipes, creating an interactive educational experience that would engage patients across different regions.',
    solution:
      "As Creative Technologist, I concepted the user experience for the '50 Plates 50 States' initiative and managed the art director and tech lead. Redesigned the user experience with intuitive navigation, interactive elements, and mobile-optimized content that made complex diabetes education accessible and engaging through regional recipe curation.",
    results:
      'Successfully delivered a content curation system that connected regional cuisine with diabetes management education. The project demonstrated how creative UX design could make complex medical content more accessible and engaging for patients.',
    technologies: [
      'UX Design',
      'Content Curation',
      'Creative Direction',
      'Team Management',
      'Healthcare Compliance',
      'Mobile Optimization',
      'Interactive Design',
    ],
    image: '/images/website5.png',
    url: 'https://www.ozempic.com/lifestyle-tips/healthy-eating.html',
  },
  {
    id: 3,
    title: 'Digital Transformation for Coastal Luxe',
    client: 'Coastal Luxe Painting & Flooring',
    challenge:
      'Two separate businesses needed unified digital presence to compete with larger franchises while maintaining their premium positioning and local expertise.',
    solution:
      'Developed cohesive brand strategy with modern web development, integrated booking systems, and mobile-first responsive design that showcased their craftsmanship and local market knowledge.',
    results:
      '40% increase in online inquiries, 25% improvement in mobile conversion rates, and unified brand experience across both businesses.',
    technologies: [
      'Modern Web Development',
      'Responsive Design',
      'UX Strategy',
      'Brand Integration',
      'Booking Systems',
    ],
    image: '/images/website1.png',
    url: 'https://coastalluxepainting.com/',
  },
];

const coreSkills = [
  'Full-Stack Development & Digital Production',
  'Technical Leadership & Cross-Functional Collaboration',
  'Creative Direction & UI/UX Design',
  'Rapid Prototyping & Agile Sprint Planning',
  'AI Workflow Design & Automation (n8n, Zapier, Airtable)',
  'CMS Architecture & eCommerce Implementation',
  'QA Testing, Web Performance & Optimization',
  'Sound Design, Mixing & Post-Production',
  'AV Systems Engineering & Setup',
];

const toolSections = [
  {
    heading: 'Languages & Frameworks',
    body: `HTML5, CSS3, JavaScript (ES6), TypeScript, Python, PHP
React, Next.js, Node.js, Express.js, Django
MySQL, PostgreSQL, MongoDB, Supabase, Prisma, Mongoose
GraphQL, Zod, Vite, Webpack, Gulp, Tailwind CSS`,
  },
  {
    heading: 'Platforms & CMS',
    body: `WordPress, Drupal, Shopify, AEM, HubSpot, Salesforce, Veeva Vault
Airtable, Docker, AWS, Kubernetes, DigitalOcean`,
  },
  {
    heading: 'Automation & Integration Tools',
    body: 'n8n, Zapier, Make (Integromat), Airtable Automations, OpenAI API, REST APIs, Webhooks',
  },
  {
    heading: 'Version Control & CLI',
    body: `Git, GitHub, GitLab, Bitbucket
Terminal/Bash, NPM, Yarn, Homebrew, Netlify CLI, Vercel CLI`,
  },
  {
    heading: 'Creative & AI Tools',
    body: `Adobe Premiere, After Effects, Illustrator, Photoshop, XD
DaVinci Resolve, Figma, Ableton Live, Logic Pro
ChatGPT, OpenAI, MidJourney, VEO3, ComfyUI, Runway`,
  },
  {
    heading: 'Project & Ops Tools',
    body: `Jira, Trello, Confluence, Notion
Slack, Google Workspace, Microsoft Office`,
  },
];

/**
 * Site URLs are /images/foo.png. Resolve order: public/… then repo-root path (optional legacy).
 */
function resolveLocalImageFile(webPath) {
  const normalized = webPath.replace(/^\//, '');
  const underPublic = path.join(repoRoot, 'public', normalized);
  if (existsSync(underPublic)) return underPublic;
  const underRepoRoot = path.join(repoRoot, normalized);
  if (existsSync(underRepoRoot)) return underRepoRoot;
  return null;
}

async function ensureImageAsset(webPath, alt) {
  const local = resolveLocalImageFile(webPath);
  if (!local) {
    console.warn(
      `  Skip image (file missing): ${webPath} — tried public/${webPath.replace(/^\//, '')} and ${webPath.replace(/^\//, '')} at repo root`,
    );
    return undefined;
  }
  const filename = path.basename(local);
  const stream = createReadStream(local);
  const asset = await client.assets.upload('image', stream, { filename });
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    ...(alt ? { alt } : {}),
  };
}

async function main() {
  const uniquePaths = [
    ...new Set([...websites.map((w) => w.image), ...caseStudies.map((c) => c.image)]),
  ];
  console.log(
    `Uploading ${uniquePaths.length} unique images (lookup: public/… then repo-root images/…)…`,
  );
  /** @type {Record<string, object | undefined>} */
  const assetByPath = {};
  for (const p of uniquePaths) {
    assetByPath[p] = await ensureImageAsset(p);
  }

  const tx = client.transaction();

  tx.createOrReplace({
    _id: 'skillsPage',
    _type: 'skillsPage',
    coreSkillsHeading: 'CORE SKILLS',
    coreSkills,
    toolsHeading: 'TECHNOLOGIES & TOOLS',
    toolSections: toolSections.map((s, i) => ({
      _type: 'toolSection',
      _key: `tool-${i}`,
      heading: s.heading,
      body: s.body,
    })),
  });

  for (const w of websites) {
    const img = assetByPath[w.image];
    tx.createOrReplace({
      _id: `migrate-work-${w.id}`,
      _type: 'workProject',
      title: w.title,
      subtitle: w.subtitle,
      url: w.url,
      sortOrder: w.id,
      ...(img ? { image: { ...img, alt: w.title } } : {}),
    });
  }

  for (const c of caseStudies) {
    const img = assetByPath[c.image];
    tx.createOrReplace({
      _id: `migrate-case-${c.id}`,
      _type: 'caseStudy',
      title: c.title,
      client: c.client,
      challenge: c.challenge,
      solution: c.solution,
      results: c.results,
      technologies: c.technologies,
      url: c.url,
      sortOrder: c.id,
      ...(img ? { image: { ...img, alt: c.title } } : {}),
    });
  }

  await tx.commit();
  console.log(
    `Done. skillsPage + ${websites.length} workProject + ${caseStudies.length} caseStudy (re-run safe: same _ids). Open Studio to review.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
