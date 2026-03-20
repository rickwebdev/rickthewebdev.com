import React, { useEffect, useState } from 'react';
import { fetchSkillsFromSanity } from '../lib/fetchSiteContent';
import type { SkillsContentData } from '../lib/fetchSiteContent';
import { FALLBACK_SKILLS } from '../data/skillsFallback';
import { sanityConfigured } from '../lib/sanity';
import CmsSpinnerSlot from './CmsSpinnerSlot';

function renderSkillsBody(data: SkillsContentData) {
  return (
    <div
      className="skills-section"
      style={{ maxWidth: '700px', margin: '0 auto', padding: '2.2rem 2.5rem' }}
    >
      <h2 className="skills-heading">{data.coreSkillsHeading}</h2>
      <ul className="skills-list" style={{ fontSize: '1.15em', marginLeft: '1.2em' }}>
        {data.coreSkills.map((line, index) => (
          <li key={`${index}-${line.slice(0, 24)}`}>{line}</li>
        ))}
      </ul>
      <div
        style={{
          borderTop: '1.5px solid #ffe259',
          margin: '2.2rem 0 1.5rem 0',
          opacity: 0.5,
        }}
      />
      <h2 className="skills-heading">{data.toolsHeading}</h2>
      {data.toolSections.map((section, index) => (
        <div className="skills-block" key={`${section.heading}-${index}`}>
          <strong>{section.heading}</strong>
          <br />
          <span style={{ whiteSpace: 'pre-line' }}>{section.body}</span>
        </div>
      ))}
    </div>
  );
}

const SkillsContent: React.FC = () => {
  const [data, setData] = useState<SkillsContentData | null>(() =>
    sanityConfigured ? null : FALLBACK_SKILLS,
  );
  const [ready, setReady] = useState(!sanityConfigured);

  useEffect(() => {
    if (!sanityConfigured) return;
    let cancelled = false;
    fetchSkillsFromSanity()
      .then((next) => {
        if (cancelled) return;
        setData(next ?? FALLBACK_SKILLS);
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          setData(FALLBACK_SKILLS);
          setReady(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready || data === null) {
    return (
      <div
        className="portfolio-work-section portfolio-work-section--cms-pending"
        aria-busy="true"
        aria-label="Loading skills"
      >
        <CmsSpinnerSlot />
      </div>
    );
  }

  return renderSkillsBody(data);
};

export default SkillsContent;
