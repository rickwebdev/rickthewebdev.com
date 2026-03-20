import React, { useEffect, useState } from 'react';
import { fetchPortfolioFromSanity } from '../lib/fetchSiteContent';
import type { CaseStudy, WebsiteCard } from '../lib/fetchSiteContent';
import { FALLBACK_CASE_STUDIES, FALLBACK_WEBSITES } from '../data/portfolioFallback';
import { sanityConfigured } from '../lib/sanity';
import CmsSpinnerSlot from './CmsSpinnerSlot';

function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

const Portfolio: React.FC<{ hideTitle?: boolean }> = ({ hideTitle }) => {
  const [websites, setWebsites] = useState<WebsiteCard[]>(() =>
    sanityConfigured ? [] : FALLBACK_WEBSITES,
  );
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() =>
    sanityConfigured ? [] : FALLBACK_CASE_STUDIES,
  );
  const [cmsReady, setCmsReady] = useState(!sanityConfigured);

  useEffect(() => {
    if (!sanityConfigured) return;
    let cancelled = false;
    fetchPortfolioFromSanity()
      .then((data) => {
        if (cancelled) return;
        if (data && (data.websites.length > 0 || data.caseStudies.length > 0)) {
          if (data.websites.length > 0) setWebsites(data.websites);
          if (data.caseStudies.length > 0) setCaseStudies(data.caseStudies);
        } else {
          setWebsites(FALLBACK_WEBSITES);
          setCaseStudies(FALLBACK_CASE_STUDIES);
        }
        setCmsReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          setWebsites(FALLBACK_WEBSITES);
          setCaseStudies(FALLBACK_CASE_STUDIES);
          setCmsReady(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    setImagesLoaded(0);
  }, [websites, caseStudies]);

  const displayedProjects = showAllProjects ? websites : websites.slice(0, 6);
  const hasMoreProjects = websites.length > 6;

  const imagesToWait = Math.min(6, websites.length);
  const allLoaded =
    !cmsReady ? false : websites.length === 0 ? true : imagesLoaded >= imagesToWait;

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  const toggleShowMore = () => {
    setShowAllProjects(!showAllProjects);
  };

  if (sanityConfigured && !cmsReady) {
    return (
      <div className="portfolio-container" style={{ position: 'relative' }}>
        {!hideTitle && <h1 className="portfolio-title">WORK</h1>}
        <div
          className="portfolio-work-section portfolio-work-section--cms-pending"
          aria-busy="true"
          aria-label="Loading portfolio"
        >
          <CmsSpinnerSlot />
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-container" style={{ position: 'relative' }}>
      {!hideTitle && <h1 className="portfolio-title">WORK</h1>}
      <div className="portfolio-work-section">
        {!allLoaded && (
          <>
            <div className="portfolio-preloader-overlay" aria-hidden />
            <CmsSpinnerSlot />
          </>
        )}
        <div className={`portfolio-grid ${allLoaded ? 'grid-loaded' : ''}`}>
          {displayedProjects.map((website) => {
            const ext = isExternalUrl(website.url);
            return (
              <a
                key={website.key}
                href={website.url}
                {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="website-card"
              >
                <img
                  src={website.image}
                  alt={website.title}
                  className="website-image"
                  width={400}
                  height={200}
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                />
                <div className="website-info">
                  <h3>{website.title}</h3>
                  <p>{website.subtitle}</p>
                </div>
              </a>
            );
          })}
        </div>

        {hasMoreProjects && (
          <div className="show-more-container">
            <button className="show-more-btn" type="button" onClick={toggleShowMore}>
              {showAllProjects ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>

      <div className="case-studies-section">
        <h2 className="case-studies-title">Case Studies</h2>
        <p className="case-studies-subtitle">
          Deep dives into strategic thinking and measurable results
        </p>

        <div className="case-studies-grid">
          {caseStudies.map((study) => {
            const ext = isExternalUrl(study.url);
            return (
              <div key={study.key} className="case-study-card">
                <div className="case-study-image">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="case-study-thumbnail"
                  />
                </div>

                <div className="case-study-content">
                  <h3 className="case-study-title">{study.title}</h3>
                  <p className="case-study-client">
                    <strong>Client:</strong> {study.client}
                  </p>

                  <div className="case-study-details">
                    <div className="case-study-section">
                      <h4>Challenge</h4>
                      <p>{study.challenge}</p>
                    </div>

                    <div className="case-study-section">
                      <h4>Solution</h4>
                      <p>{study.solution}</p>
                    </div>

                    <div className="case-study-section">
                      <h4>Results</h4>
                      <p>{study.results}</p>
                    </div>
                  </div>

                  <div className="case-study-technologies">
                    <h4>Technologies & Skills</h4>
                    <div className="tech-tags">
                      {study.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={study.url}
                    {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="case-study-link"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
