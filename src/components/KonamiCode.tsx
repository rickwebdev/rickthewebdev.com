import React, { useEffect } from 'react';

interface KonamiCodeProps {
  onActivate: () => void;
}

const KonamiCode: React.FC<KonamiCodeProps> = ({ onActivate }) => {
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];
    
    let currentIndex = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle case sensitivity for B and A keys
      let keyCode = event.code;
      if (event.key.toLowerCase() === 'b') {
        keyCode = 'KeyB';
      } else if (event.key.toLowerCase() === 'a') {
        keyCode = 'KeyA';
      }

      if (keyCode === konamiCode[currentIndex]) {
        currentIndex++;
        console.log('Konami sequence:', currentIndex, '/', konamiCode.length);
        
        if (currentIndex === konamiCode.length) {
          console.log('Konami code activated!');
          onActivate();
          currentIndex = 0;
        }
      } else {
        currentIndex = 0;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onActivate]);

  return null; // This component doesn't render anything
};

export default KonamiCode; 