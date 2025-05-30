import { useState } from 'react';
import Header from './components/Header';
import Avatar from './components/Avatar';
import LocationInsights from './components/LocationInsights';
import IntroSection from './components/IntroSection';
import './App.css';

function App() {
  const [boxOpen, setBoxOpen] = useState(false);

  const openBox = () => setBoxOpen(true);
  const closeBox = () => setBoxOpen(false);

  return (
    <>
      <div className="gradient-background"></div>
      <div className="rock-background"></div>
      
      <LocationInsights />
      
      <div className="flex-container">
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
