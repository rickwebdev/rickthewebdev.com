import { useState, useEffect } from 'react';
import Header from './components/Header';
import Avatar from './components/Avatar';
import LocationInsights from './components/LocationInsights';
import IntroSection from './components/IntroSection';
import './App.css';

function App() {
  const [boxOpen, setBoxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFadedIn, setIsFadedIn] = useState(false);

  const openBox = () => setBoxOpen(true);
  const closeBox = () => setBoxOpen(false);

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
          <IntroSection />
        )}
        <Avatar onLightbulbClick={openBox} />
      </div>
    </>
  );
}

export default App;
