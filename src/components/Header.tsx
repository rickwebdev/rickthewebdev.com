import React, { useState } from 'react';
import Portfolio from './Portfolio';
import ContactForm from './ContactForm';
import SkillsContent from './SkillsContent';

interface HeaderProps {
  onClose?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'work' | 'skills' | 'contact'>('work');

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
          <span className="portfolio-nav-sep">|</span>
          <button
            className={`portfolio-nav-btn${activeTab === 'contact' ? ' active' : ''}`}
            onClick={() => setActiveTab('contact')}
            type="button"
          >
            CONTACT
          </button>
        </div>
        {onClose && (
          <button className="box-close-btn" onClick={onClose} aria-label="Close" type="button">×</button>
        )}
      </nav>
      <div className="tab-content">
      {activeTab === 'work' ? (
        <Portfolio hideTitle />
        ) : activeTab === 'skills' ? (
          <SkillsContent />
      ) : (
          <ContactForm />
      )}
      </div>
    </div>
  );
};

export default Header; 