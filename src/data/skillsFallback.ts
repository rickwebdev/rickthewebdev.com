import type { SkillsContentData } from '../lib/fetchSiteContent';

export const FALLBACK_SKILLS: SkillsContentData = {
  coreSkillsHeading: 'CORE SKILLS',
  coreSkills: [
    'Full-Stack Development & Digital Production',
    'Technical Leadership & Cross-Functional Collaboration',
    'Creative Direction & UI/UX Design',
    'Rapid Prototyping & Agile Sprint Planning',
    'AI Workflow Design & Automation (n8n, Zapier, Airtable)',
    'CMS Architecture & eCommerce Implementation',
    'QA Testing, Web Performance & Optimization',
    'Sound Design, Mixing & Post-Production',
    'AV Systems Engineering & Setup',
  ],
  toolsHeading: 'TECHNOLOGIES & TOOLS',
  toolSections: [
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
  ],
};
