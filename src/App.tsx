import { useState, useEffect } from 'react';
import Header from './components/Header';
import Avatar from './components/Avatar';
import LocationInsights from './components/LocationInsights';
import IntroSection from './components/IntroSection';
import KonamiCode from './components/KonamiCode';
import TetrisEasterEgg from './components/TetrisEasterEgg';
import { SiteStackModal } from './components/SiteStackModal';
import './App.css';
import { sanityConfigured } from './lib/sanity';

function App() {
  const [siteStackOpen, setSiteStackOpen] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFadedIn, setIsFadedIn] = useState(false);
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
      }, 100);
    };

    // Fallback in case the image fails to load
    bgImage.onerror = () => {
      setIsLoading(false);
      setTimeout(() => {
        setIsFadedIn(true);
      }, 100);
    };
  }, []);

  useEffect(() => {
    if (import.meta.env.DEV && !sanityConfigured) {
      console.info(
        '[Sanity] WORK/SKILLS use bundled fallback — add VITE_SANITY_PROJECT_ID to .env in the repo root (not sanity/) and restart `npm run dev`.',
      );
    }
  }, []);

  return (
    <>
      {/* Site preloader */}
      <div className={`site-preloader ${!isLoading ? 'hidden' : ''}`}>
        <div className="site-spinner"></div>
      </div>

      <div className="gradient-background"></div>
      <div className="rock-background"></div>
      
      <LocationInsights />
      
      <div className={`flex-container ${isFadedIn ? 'fade-in' : ''}`}>
        {boxOpen ? (
          <Header onClose={closeBox} />
        ) : (
          <IntroSection onAboutSite={() => setSiteStackOpen(true)} />
        )}
        <Avatar onLightbulbClick={openBox} highlightLightbulb={boxOpen} />
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
