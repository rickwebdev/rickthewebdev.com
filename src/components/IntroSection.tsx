import { useEffect, useRef, useState } from 'react';
import { PortalWebGL } from './PortalWebGL';

const BIO_TEXT =
  "I'm Rick Owadally, a Creative Technologist and Marketing Systems Architect. I work at the " +
  'intersection of front-end engineering, UX, and data orchestration, designing and building systems ' +
  'where the experience layer and the automation layer talk to each other. From headless CMS ' +
  'architecture and personalization platforms to AI integration and marketing automation, I bring both ' +
  'the technical depth and the design sensibility to make it work end to end.';

/**
 * Start bio after all five skill lines have finished animating in (App.css:
 * line 5 uses delay 1.44s + duration 0.48s → ~1.92s), plus a short buffer.
 */
const BIO_TYPE_START_DELAY_MS = 1960;
/** Per-character interval — lower = faster full bio reveal */
const BIO_CHAR_MS = 1.65;

interface IntroSectionProps {
  onAboutSite?: () => void;
  /** When true (after load), runs portal morph + WebGL reveal */
  entranceActive?: boolean;
  /** After user opened Work at least once — skip voltron/skill-line replay when coming home */
  introSawWorkOnce?: boolean;
}

const IntroSection: React.FC<IntroSectionProps> = ({
  onAboutSite,
  entranceActive,
  introSawWorkOnce = false,
}) => {
  const [typedLen, setTypedLen] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (startTimeoutRef.current) {
      clearTimeout(startTimeoutRef.current);
      startTimeoutRef.current = null;
    }

    if (!entranceActive) {
      setTypedLen(0);
      setTypingDone(false);
      setFooterVisible(false);
      return;
    }

    if (reducedMotion) {
      setTypedLen(BIO_TEXT.length);
      setTypingDone(true);
      setFooterVisible(true);
      return;
    }

    setTypedLen(0);
    setTypingDone(false);
    setFooterVisible(false);

    startTimeoutRef.current = setTimeout(() => {
      startTimeoutRef.current = null;
      intervalRef.current = setInterval(() => {
        setTypedLen((prev) => {
          const next = prev + 1;
          if (next >= BIO_TEXT.length) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setTypingDone(true);
            return BIO_TEXT.length;
          }
          return next;
        });
      }, BIO_CHAR_MS);
    }, BIO_TYPE_START_DELAY_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
        startTimeoutRef.current = null;
      }
    };
  }, [entranceActive, reducedMotion]);

  useEffect(() => {
    if (!typingDone || reducedMotion) return;
    const t = setTimeout(() => setFooterVisible(true), 120);
    return () => clearTimeout(t);
  }, [typingDone, reducedMotion]);

  const showCursor = entranceActive && !reducedMotion && !typingDone;

  const portalClass =
    entranceActive && introSawWorkOnce
      ? ' intro-portal--settled'
      : entranceActive
        ? ' intro-portal--enter'
        : '';

  return (
    <div className={`intro-section box${portalClass}`}>
      <PortalWebGL className="portal-webgl-layer" entranceActive={!!entranceActive} />
      <div className="intro-content">
        <div className="large-text">RICK</div>
        <div className="large-text name-parts">
          <span className="name-part color-wash">
            OWA<span className="name-separator">·</span>
          </span>
          <span className="name-part color-wash dally">DALLY</span>
        </div>
        <div className="small-text-container">
          <div className="small-text">
            <i className="fas fa-lightbulb"></i>CREATIVE TECHNOLOGIST
          </div>
          <div className="small-text">
            <i className="fas fa-chart-line"></i>DIGITAL STRATEGY
          </div>
          <div className="small-text">
            <i className="fas fa-desktop"></i>UX / UI DESIGN
          </div>
          <div className="small-text">
            <i className="fas fa-code"></i>WEB DEVELOPMENT
          </div>
          <div className="small-text">
            <i className="fas fa-video"></i>MULTI-MEDIA PRODUCTION
          </div>
        </div>
        <div className="summary" aria-live="polite">
          <span className="summary-reserve" aria-hidden="true">
            {BIO_TEXT}
          </span>
          <span className="summary-typewriter">
            {BIO_TEXT.slice(0, typedLen)}
            {showCursor ? (
              <span className="summary-cursor" aria-hidden="true">
                |
              </span>
            ) : null}
          </span>
        </div>
        <p
          className={`intro-lightbulb-hint${footerVisible ? ' intro-lightbulb-hint--visible' : ''}`}
          aria-hidden={!footerVisible}
        >
          <i className="fas fa-lightbulb intro-lightbulb-hint-icon" aria-hidden="true" />
          Click the lightbulb to see more.
        </p>
        {onAboutSite && (
          <div
            className={`intro-about-wrap${footerVisible ? ' intro-about-wrap--visible' : ''}`}
            aria-hidden={!footerVisible}
          >
            <button
              type="button"
              className="intro-about-btn"
              tabIndex={footerVisible ? 0 : -1}
              onClick={onAboutSite}
            >
              About this site
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroSection;
