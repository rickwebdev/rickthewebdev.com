import React, { useState } from 'react';
import Portfolio from './Portfolio';

const skillsText = (
  <div className="skills-section">
    <h2 className="skills-heading">TECHNOLOGIES & TOOLS</h2>
    <div className="skills-block">
      <strong>Languages & Frameworks:</strong><br />
      HTML5, CSS3, JavaScript (ES6), TypeScript, React, Next.js, Node.js, Express.js,<br />
      Python, Django, PHP, MySQL, PostgreSQL, MongoDB, Supabase, Prisma,<br />
      Mongoose, GraphQL, Zod, Vite, Webpack, Gulp, Tailwind CSS
    </div>
    <div className="skills-block">
      <strong>Platforms & CMS:</strong><br />
      WordPress, Drupal, Shopify, AEM, HubSpot, Salesforce, Veeva Vault, Airtable,<br />
      Zapier, Docker, AWS, Kubernetes, DigitalOcean
    </div>
    <div className="skills-block">
      <strong>Creative & AI Tools:</strong><br />
      Adobe Premiere, After Effects, Illustrator, Photoshop, XD, Figma, DaVinci
      Resolve, Ableton Live, Logic Pro, ChatGPT, OpenAI, MidJourney, VEO3, ComfyUI,
      Runway
    </div>
    <div className="skills-block">
      <strong>Ops & Project Tools:</strong><br />
      Jira, Trello, Confluence, Slack, Google Workspace, Microsoft Office, Notion
    </div>
    <h2 className="skills-heading">SKILLS</h2>
    <ul className="skills-list">
      <li>Digital production and full-stack development</li>
      <li>Creative direction and sound design</li>
      <li>UI/UX design and prototyping</li>
      <li>AI-integrated workflows</li>
      <li>AV system setup and engineering</li>
      <li>eCommerce implementation</li>
      <li>Agile sprint planning and QA</li>
      <li>Cross-functional collaboration and leadership</li>
      <li>Technical writing and documentation</li>
    </ul>
  </div>
);

interface HeaderProps {
  onClose?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'work' | 'skills'>('work');

  return (
    <div className="box">
      <nav className="portfolio-nav">
        <div className="portfolio-nav-group">
          <button
            className={`portfolio-nav-btn${activeTab === 'work' ? ' active' : ''}`}
            onClick={() => setActiveTab('work')}
            type="button"
          >
            WORK
          </button>
          <span className="portfolio-nav-sep">|</span>
          <button
            className={`portfolio-nav-btn${activeTab === 'skills' ? ' active' : ''}`}
            onClick={() => setActiveTab('skills')}
            type="button"
          >
            SKILLS
          </button>
        </div>
        {onClose && (
          <button className="box-close-btn" onClick={onClose} aria-label="Close" type="button">×</button>
        )}
      </nav>
      {activeTab === 'work' ? (
        <Portfolio hideTitle />
      ) : (
        skillsText
      )}
    </div>
  );
};

export default Header; 