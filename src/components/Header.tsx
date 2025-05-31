import React, { useState } from 'react';
import Portfolio from './Portfolio';

const skillsText = (
  <div className="skills-section" style={{ maxWidth: '700px', margin: '0 auto', padding: '2.2rem 2.5rem' }}>
    <h2 className="skills-heading">CORE SKILLS</h2>
    <ul className="skills-list" style={{ fontSize: '1.15em', marginLeft: '1.2em' }}>
      <li>Full-Stack Development &amp; Digital Production</li>
      <li>Technical Leadership &amp; Cross-Functional Collaboration</li>
      <li>Creative Direction &amp; UI/UX Design</li>
      <li>Rapid Prototyping &amp; Agile Sprint Planning</li>
      <li>AI-Integrated Workflows &amp; Automation</li>
      <li>CMS Architecture &amp; eCommerce Implementation</li>
      <li>QA Testing, Web Performance &amp; Optimization</li>
      <li>Sound Design, Mixing &amp; Post-Production</li>
      <li>AV Systems Engineering &amp; Setup</li>
    </ul>
    <div style={{ borderTop: '1.5px solid #ffe259', margin: '2.2rem 0 1.5rem 0', opacity: 0.5 }} />
    <h2 className="skills-heading">TECHNOLOGIES &amp; TOOLS</h2>
    <div className="skills-block">
      <strong>Languages &amp; Frameworks</strong><br />
      HTML5, CSS3, JavaScript (ES6), TypeScript, Python, PHP<br />
      React, Next.js, Node.js, Express.js, Django<br />
      MySQL, PostgreSQL, MongoDB, Supabase, Prisma, Mongoose<br />
      GraphQL, Zod, Vite, Webpack, Gulp, Tailwind CSS
    </div>
    <div className="skills-block">
      <strong>Platforms &amp; CMS</strong><br />
      WordPress, Drupal, Shopify, AEM, HubSpot, Salesforce, Veeva Vault<br />
      Airtable, Zapier, Docker, AWS, Kubernetes, DigitalOcean
    </div>
    <div className="skills-block">
      <strong>Version Control &amp; CLI</strong><br />
      Git, GitHub, GitLab, Bitbucket<br />
      Terminal/Bash, NPM, Yarn, Homebrew, Netlify CLI, Vercel CLI
    </div>
    <div className="skills-block">
      <strong>Creative &amp; AI Tools</strong><br />
      Adobe Premiere, After Effects, Illustrator, Photoshop, XD<br />
      DaVinci Resolve, Figma, Ableton Live, Logic Pro<br />
      ChatGPT, OpenAI, MidJourney, VEO3, ComfyUI, Runway
    </div>
    <div className="skills-block">
      <strong>Project &amp; Ops Tools</strong><br />
      Jira, Trello, Confluence, Notion<br />
      Slack, Google Workspace, Microsoft Office
    </div>
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