import { useState } from 'react';
import Header from './components/Header';
import Avatar from './components/Avatar';
import LocationInsights from './components/LocationInsights';
import './App.css';

function App() {
  const [showPortfolio, setShowPortfolio] = useState(false);

  const togglePortfolio = () => {
    setShowPortfolio(!showPortfolio);
  };

  return (
    <>
      <div className="gradient-background"></div>
      <div className="rock-background"></div>
      
      <LocationInsights />
      
      <div className="flex-container">
        <Header showPortfolio={showPortfolio} onTogglePortfolio={togglePortfolio} />
        <Avatar onLightbulbClick={togglePortfolio} />
      </div>
    </>
  );
}

export default App;
