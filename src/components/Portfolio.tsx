import React, { useEffect, useRef, useState } from 'react';
import { fetchPortfolioFromSanity } from '../lib/fetchSiteContent';
import type { WebsiteCard } from '../lib/fetchSiteContent';
import { FALLBACK_WEBSITES } from '../data/portfolioFallback';
import { sanityConfigured } from '../lib/sanity';
import CmsSpinnerSlot from './CmsSpinnerSlot';

function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

const REVEAL_THRESHOLD = 6;

const Portfolio: React.FC<{ hideTitle?: boolean }> = ({ hideTitle }) => {
  const [websites, setWebsites] = useState<WebsiteCard[]>(() =>
    sanityConfigured ? [] : FALLBACK_WEBSITES,
  );
  const [cmsReady, setCmsReady] = useState(!sanityConfigured);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sanityConfigured) return;
    let cancelled = false;
    fetchPortfolioFromSanity()
      .then((data) => {
        if (cancelled) return;
        if (data && (data.websites.length > 0 || data.caseStudies.length > 0)) {
          if (data.websites.length > 0) setWebsites(data.websites);
          else setWebsites(FALLBACK_WEBSITES);
        } else {
          setWebsites(FALLBACK_WEBSITES);
        }
        setCmsReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          setWebsites(FALLBACK_WEBSITES);
          setCmsReady(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    setImagesLoaded(0);
  }, [websites]);

  const imagesToWait = Math.min(6, websites.length);
  const allLoaded =
    !cmsReady ? false : websites.length === 0 ? true : imagesLoaded >= imagesToWait;

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    if (!allLoaded || websites.length <= REVEAL_THRESHOLD) return;

    const root = gridRef.current;
    if (!root) return;

    const pending = root.querySelectorAll<HTMLElement>('.website-card--reveal-pending');
    if (pending.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const incoming = entries.filter(
          (e) => e.isIntersecting && e.target instanceof HTMLElement,
        );
        if (incoming.length === 0) return;

        incoming.sort(
          (a, b) =>
            Number((a.target as HTMLElement).dataset.revealSlot) -
            Number((b.target as HTMLElement).dataset.revealSlot),
        );

        incoming.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          window.setTimeout(() => {
            el.classList.add('website-card--reveal-visible');
            observer.unobserve(el);
          }, i * 80);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px 8% 0px' },
    );

    pending.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [allLoaded, websites]);

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
        <div ref={gridRef} className={`portfolio-grid ${allLoaded ? 'grid-loaded' : ''}`}>
          {websites.map((website, index) => {
            const ext = isExternalUrl(website.url);
            const revealLater = index >= REVEAL_THRESHOLD;
            return (
              <a
                key={website.key}
                href={website.url}
                {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={
                  revealLater
                    ? 'website-card website-card--reveal-pending'
                    : 'website-card'
                }
                {...(revealLater
                  ? { 'data-reveal-slot': String(index - REVEAL_THRESHOLD) }
                  : {})}
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
      </div>
    </div>
  );
};

export default Portfolio;
