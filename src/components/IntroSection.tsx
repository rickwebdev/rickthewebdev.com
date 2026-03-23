interface IntroSectionProps {
  onAboutSite?: () => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({ onAboutSite }) => (
  <div className="intro-section box">
    <div className="intro-content">
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
        I’m Rick Owadally, a Creative Technologist and Marketing Systems Architect. I work at the
        intersection of front-end engineering, UX, and data orchestration, designing and building systems
        where the experience layer and the automation layer talk to each other. From headless CMS
        architecture and personalization platforms to AI integration and marketing automation, I bring both
        the technical depth and the design sensibility to make it work end to end.
      </div>
      {onAboutSite && (
        <div className="intro-about-wrap">
          <button type="button" className="intro-about-btn" onClick={onAboutSite}>
            About this site
          </button>
        </div>
      )}
    </div>
  </div>
);

export default IntroSection; 