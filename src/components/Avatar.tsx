import React, { useRef } from 'react';

interface AvatarProps {
  onLightbulbClick: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ onLightbulbClick }) => {
  const avatarRef = useRef<HTMLImageElement>(null);

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

  return (
    <div className="avatar-container">
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
        <button
          className="ideas-icon"
          aria-label="Open Ideas"
          onClick={onLightbulbClick}
          type="button"
        >
          <i className="fas fa-lightbulb"></i>
        </button>
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
          href="/ricko_resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="pdf-icon"
          onClick={e => handleIconClick(e, '/ricko_resume.pdf')}
        >
          <i className="fas fa-file-pdf"></i>
        </a>
      </div>
    </div>
  );
};

export default Avatar; 