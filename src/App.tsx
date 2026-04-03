import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Header from './components/Header';
import Avatar from './components/Avatar';
import LocationInsights from './components/LocationInsights';
import IntroSection from './components/IntroSection';
import KonamiCode from './components/KonamiCode';
import TetrisEasterEgg from './components/TetrisEasterEgg';
import { SiteStackModal } from './components/SiteStackModal';
import { CustomCursor } from './components/CustomCursor';
import './App.css';
import { sanityConfigured } from './lib/sanity';

/**
 * Portal intro starts before the shell opacity transition finishes so the glass
 * doesn’t sit empty as long (slight overlap with the fade is OK).
 */
const PORTAL_ENTRANCE_DELAY_MS = 480;

function App() {
  const [siteStackOpen, setSiteStackOpen] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFadedIn, setIsFadedIn] = useState(false);
  /** After shell fade so portal morph + WebGL aren’t masked by the same opacity ramp */
  const [portalEntranceReady, setPortalEntranceReady] = useState(false);
  /** After opening Work once, home uses intro-portal--settled (no name/skills replay when shell un-hides) */
  const [introSawWorkOnce, setIntroSawWorkOnce] = useState(false);
  const [tetrisOpen, setTetrisOpen] = useState(false);

  const openBox = () => setBoxOpen(true);
  const closeBox = () => setBoxOpen(false);
  const openTetris = () => setTetrisOpen(true);
  const closeTetris = () => setTetrisOpen(false);

  useEffect(() => {
    // Create a new image object to preload the background
    const bgImage = new Image();
    bgImage.src = '/images/rock_bg.avif';
    
    bgImage.onload = () => {
      // Once the background image is loaded, hide the preloader
      setIsLoading(false);
      // Add a small delay before fading in the content
      setTimeout(() => {
        setIsFadedIn(true);
      }, 40);
    };

    // Fallback in case the image fails to load
    bgImage.onerror = () => {
      setIsLoading(false);
      setTimeout(() => {
        setIsFadedIn(true);
      }, 40);
    };
  }, []);

  useLayoutEffect(() => {
    if (!isFadedIn) {
      setPortalEntranceReady(false);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPortalEntranceReady(true);
      return;
    }
    const id = window.setTimeout(() => setPortalEntranceReady(true), PORTAL_ENTRANCE_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [isFadedIn]);

  const prevBoxOpenRef = useRef(false);
  useEffect(() => {
    if (prevBoxOpenRef.current && !boxOpen) {
      setIntroSawWorkOnce(true);
    }
    prevBoxOpenRef.current = boxOpen;
  }, [boxOpen]);

  useEffect(() => {
    if (import.meta.env.DEV && !sanityConfigured) {
      console.info(
        '[Sanity] WORK/SKILLS use bundled fallback — add VITE_SANITY_PROJECT_ID to .env in the repo root (not sanity/) and restart `npm run dev`.',
      );
    }
  }, []);

  return (
    <>
      <CustomCursor />
      {/* Site preloader */}
      <div className={`site-preloader ${!isLoading ? 'hidden' : ''}`}>
        <div className="site-spinner"></div>
      </div>

      <div className="gradient-background"></div>
      <div className="rock-background"></div>
      
      <LocationInsights />
      
      <div className={`flex-container ${isFadedIn ? 'fade-in' : ''}`}>
        {/*
          Keep Intro mounted when Work is open (hidden) so closing X doesn’t remount intro:
          portal + typewriter only run once; state stays intact.
          display:contents when visible keeps .box a direct flex child like before.
        */}
        <div
          className="intro-shell"
          style={{ display: boxOpen ? 'none' : 'contents' }}
          aria-hidden={boxOpen}
        >
          <IntroSection
            onAboutSite={() => setSiteStackOpen(true)}
            entranceActive={portalEntranceReady}
            introSawWorkOnce={introSawWorkOnce}
          />
        </div>
        {boxOpen ? <Header onClose={closeBox} /> : null}
        <Avatar
          onLightbulbClick={openBox}
          highlightLightbulb={boxOpen}
          shellEntranceActive={portalEntranceReady}
          iconsEntranceActive={portalEntranceReady}
        />
      </div>
      
      {/* Konami Code Easter Egg */}
      <KonamiCode onActivate={openTetris} />
      
      {/* Tetris Easter Egg */}
      <TetrisEasterEgg isOpen={tetrisOpen} onClose={closeTetris} />

      <SiteStackModal open={siteStackOpen} onClose={() => setSiteStackOpen(false)} />
    </>
  );
}

export default App;
