import { sanityClient, urlForImage } from './sanity';

const portfolioQuery = `{
  "projects": *[_type == "workProject"] | order(sortOrder asc) {
    _id,
    title,
    subtitle,
    url,
    sortOrder,
    image
  },
  "cases": *[_type == "caseStudy"] | order(sortOrder asc) {
    _id,
    title,
    client,
    challenge,
    solution,
    results,
    technologies,
    url,
    sortOrder,
    image
  }
}`;

const resumePdfQuery = `*[_id == "resumePdf"][0]{
  "url": file.asset->url
}`;

const skillsQuery = `*[_id == "skillsPage"][0]{
  coreSkillsHeading,
  coreSkills,
  toolsHeading,
  toolSections[]{ heading, body }
}`;

export interface WebsiteCard {
  key: string;
  id: number;
  title: string;
  subtitle: string;
  image: string;
  url: string;
}

export interface CaseStudy {
  key: string;
  id: number;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  results: string;
  technologies: string[];
  image: string;
  url: string;
}

export interface SkillsContentData {
  coreSkillsHeading: string;
  coreSkills: string[];
  toolsHeading: string;
  toolSections: { heading: string; body: string }[];
}

interface PortfolioQueryResult {
  projects: {
    _id: string;
    title?: string;
    subtitle?: string;
    url?: string;
    sortOrder?: number;
    image?: unknown;
  }[];
  cases: {
    _id: string;
    title?: string;
    client?: string;
    challenge?: string;
    solution?: string;
    results?: string;
    technologies?: string[];
    url?: string;
    sortOrder?: number;
    image?: unknown;
  }[];
}

export async function fetchPortfolioFromSanity(): Promise<{
  websites: WebsiteCard[];
  caseStudies: CaseStudy[];
} | null> {
  if (!sanityClient) return null;
  try {
    const data = await sanityClient.fetch<PortfolioQueryResult>(
      portfolioQuery,
      {},
      { perspective: 'published' },
    );
    if (!data?.projects?.length && !data?.cases?.length) return null;

    const websites: WebsiteCard[] = (data.projects || []).map((p, index) => ({
      key: p._id,
      id: typeof p.sortOrder === 'number' ? p.sortOrder : index,
      title: p.title ?? '',
      subtitle: p.subtitle ?? '',
      url: p.url ?? '',
      image: urlForImage(p.image),
    }));

    const caseStudies: CaseStudy[] = (data.cases || []).map((c, index) => ({
      key: c._id,
      id: typeof c.sortOrder === 'number' ? c.sortOrder : index + 1,
      title: c.title ?? '',
      client: c.client ?? '',
      challenge: c.challenge ?? '',
      solution: c.solution ?? '',
      results: c.results ?? '',
      technologies: Array.isArray(c.technologies) ? c.technologies : [],
      url: c.url ?? '',
      image: urlForImage(c.image),
    }));

    return { websites, caseStudies };
  } catch {
    return null;
  }
}

/** Public CDN URL for the resume PDF, or null if not set in Studio. */
export async function fetchResumePdfUrl(): Promise<string | null> {
  if (!sanityClient) return null;
  try {
    const row = await sanityClient.fetch<{ url: string | null } | null>(
      resumePdfQuery,
      {},
      { perspective: 'published' },
    );
    const url = row?.url?.trim();
    return url || null;
  } catch {
    return null;
  }
}

export async function fetchSkillsFromSanity(): Promise<SkillsContentData | null> {
  if (!sanityClient) return null;
  try {
    const doc = await sanityClient.fetch<SkillsContentData | null>(
      skillsQuery,
      {},
      { perspective: 'published' },
    );
    if (
      !doc ||
      (!doc.coreSkills?.length && !doc.toolSections?.length)
    ) {
      return null;
    }
    return {
      coreSkillsHeading: doc.coreSkillsHeading || 'CORE SKILLS',
      coreSkills: doc.coreSkills || [],
      toolsHeading: doc.toolsHeading || 'TECHNOLOGIES & TOOLS',
      toolSections: (doc.toolSections || []).map((s) => ({
        heading: s.heading || '',
        body: s.body || '',
      })),
    };
  } catch {
    return null;
  }
}
