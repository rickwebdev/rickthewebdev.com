import React from 'react';

const IntroSection: React.FC = () => (
  <div className="intro-section box">
    <div className="large-text">RICK</div>
    <div className="large-text name-parts">
      <span className="name-part color-wash">OWA<span className="name-separator">·</span></span>
      <span className="name-part color-wash dally">DALLY</span>
    </div>
    <div className="small-text-container">
      <div className="small-text"><i className="fas fa-lightbulb"></i>CREATIVE TECHNOLOGIST</div>
      <div className="small-text"><i className="fas fa-chart-line"></i>DIGITAL STRATEGY</div>
      <div className="small-text"><i className="fas fa-desktop"></i>UX / UI DESIGN</div>
      <div className="small-text"><i className="fas fa-code"></i>WEB DEVELOPMENT</div>
      <div className="small-text"><i className="fas fa-video"></i>MULTI-MEDIA PRODUCTION</div>
    </div>
    <div className="summary">
      A Creative Technologist with expertise across digital strategy, UX/UI design, and multimedia production. With a strong background in web development and an ability to bridge the gap between creative and technical teams, I deliver innovative, user-centered solutions for top brands.
    </div>
  </div>
);

export default IntroSection; 