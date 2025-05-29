// import React from 'react';
import Header from './components/Header';
import Avatar from './components/Avatar';
import LocationInsights from './components/LocationInsights';
import './App.css';

function App() {
  return (
    <>
      <div className="gradient-background"></div>
      <div className="rock-background"></div>
      
      <LocationInsights />
      
      <div className="flex-container">
        <Header />
        <Avatar />
      </div>
    </>
  );
}

export default App;
