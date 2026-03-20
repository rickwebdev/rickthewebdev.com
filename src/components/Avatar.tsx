import React, { useEffect, useRef, useState } from 'react';
import { fetchResumePdfUrl } from '../lib/fetchSiteContent';
import { sanityConfigured } from '../lib/sanity';

const FALLBACK_RESUME_PDF = '/ricko_resume.pdf';

interface AvatarProps {
  onLightbulbClick?: () => void;
  highlightLightbulb?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ onLightbulbClick, highlightLightbulb }) => {
  const avatarRef = useRef<HTMLImageElement>(null);
  const [resumePdfUrl, setResumePdfUrl] = useState(FALLBACK_RESUME_PDF);

  useEffect(() => {
    if (!sanityConfigured) return;
    let cancelled = false;
    fetchResumePdfUrl().then((url) => {
      if (!cancelled && url) setResumePdfUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleIconClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, url: string) => {
    e.preventDefault();
    const avatar = avatarRef.current;
    if (avatar) {
      avatar.classList.add('spin-off');
      setTimeout(() => {
        window.open(url, '_blank');
        avatar.classList.remove('spin-off');
      }, 1000);
    } else {
      window.open(url, '_blank');
    }
  };

  const handleAvatarClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onLightbulbClick) {
      onLightbulbClick();
    }
  };

  return (
    <div className="avatar-container" onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
      <img 
        ref={avatarRef}
        src="/images/avatar_linkedin.jpeg" 
        alt="Rick Owadally" 
        className="linkedin-avatar" 
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = 'https://via.placeholder.com/300';
          target.alt = 'Image failed to load';
        }}
      />
      
      <div className="icon-links">
        {onLightbulbClick && (
          <button
            className="ideas-icon"
            aria-label="Open Ideas"
            onClick={onLightbulbClick}
            type="button"
          >
            <i className={`fas fa-lightbulb${highlightLightbulb ? ' highlight-yellow' : ''}`}></i>
          </button>
        )}
        <a 
          href="https://www.linkedin.com/in/rickowadally/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="linkedin-icon"
          onClick={e => handleIconClick(e, 'https://www.linkedin.com/in/rickowadally/')}
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a 
          href={resumePdfUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="pdf-icon"
          onClick={(e) => handleIconClick(e, resumePdfUrl)}
        >
          <i className="fas fa-file-pdf"></i>
        </a>
      </div>
    </div>
  );
};

export default Avatar; 