import React, { useEffect, useRef, useState } from 'react';
import { fetchResumePdfUrl } from '../lib/fetchSiteContent';
import { AVATAR_PLACEHOLDER_IMAGE } from '../lib/imagePlaceholders';
import { sanityConfigured } from '../lib/sanity';

const FALLBACK_RESUME_PDF = '/ricko_resume.pdf';
/** Bundled headshot — portfolio art stays on Sanity; this stays in public/images. */
const LOCAL_AVATAR_SRC = '/images/avatar_linkedin.jpeg';

interface AvatarProps {
  onLightbulbClick?: () => void;
  highlightLightbulb?: boolean;
  /** Photo + ring outline (early, with portal) */
  shellEntranceActive?: boolean;
  /** Orbit icons — with portal entrance */
  iconsEntranceActive?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  onLightbulbClick,
  highlightLightbulb,
  shellEntranceActive = false,
  iconsEntranceActive = false,
}) => {
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
    <div
      className={`avatar-container${shellEntranceActive ? ' avatar-container--enter' : ''}`}
      data-cursor-hover
      onClick={handleAvatarClick}
      style={{ cursor: 'pointer' }}
    >
      <img
        ref={avatarRef}
        src={LOCAL_AVATAR_SRC}
        alt="Rick Owadally"
        className="linkedin-avatar"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = AVATAR_PLACEHOLDER_IMAGE;
          target.alt = 'Rick Owadally';
        }}
      />
      
      <div
        className={`icon-links${iconsEntranceActive ? ' avatar-icon-links--enter' : ''}`}
      >
        {onLightbulbClick && (
          <button
            className="ideas-icon avatar-orbit-icon avatar-orbit-icon--bulb"
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
          className="linkedin-icon avatar-orbit-icon avatar-orbit-icon--linkedin"
          onClick={e => handleIconClick(e, 'https://www.linkedin.com/in/rickowadally/')}
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href={resumePdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pdf-icon avatar-orbit-icon avatar-orbit-icon--pdf"
          onClick={(e) => handleIconClick(e, resumePdfUrl)}
        >
          <i className="fas fa-file-pdf"></i>
        </a>
      </div>
    </div>
  );
};

export default Avatar; 