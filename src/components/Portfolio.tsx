import React, { useState, useEffect } from 'react';

interface WebsiteCard {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  url: string;
}

const Portfolio: React.FC<{ hideTitle?: boolean }> = ({ hideTitle }) => {
  const websites: WebsiteCard[] = [
    {
      id: 1,
      title: "Website",
      subtitle: "UX, Dev, Design, Logo",
      image: "/images/website1.png",
      url: "https://coastalluxepainting.com/"
    },
    {
      id: 2,
      title: "Website",
      subtitle: "UX, Dev, Design, Logo",
      image: "/images/website2.png",
      url: "https://coastalluxeflooring.com/"
    }, {
      id: 7,
      title: "Website",
      subtitle: "UX, Dev, Design, CMS",
      image: "/images/website7.png",
      url: "https://profusek.com/"
    },
    {
      id: 8,
      title: "Website",
      subtitle: "UX, Dev, Design, Logo",
      image: "/images/website8.png",
      url: "https://taxexemptconsultants.com/"
    },
    {
      id: 3,
      title: "Website: Redesign",
      subtitle: "UX, Dev, Tech Lead",
      image: "/images/website3.png",
      url: "https://www.getrealaboutdiabetes.com/"
    },
    {
      id: 4,
      title: "Website: Functionality",
      subtitle: "UX, Dev, Prototyping, Tech Lead",
      image: "/images/website4.png",
      url: "https://www.ozempic.com/faqs.html"
    },
    {
      id: 5,
      title: "Website: User Experience",
      subtitle: "UX, Design, Prototyping, Tech Lead",
      image: "/images/website5.png",
      url: "https://www.ozempic.com/lifestyle-tips/healthy-eating.html"
    },
    {
      id: 6,
      title: "Web Application: Just for Fun",
      subtitle: "UX, Dev",
      image: "/images/website6.png",
      url: "https://rickthewebdev.com/magic-8-ball/"
    },

    {
      id: 10,
      title: "Website",
      subtitle: "UX, Dev, Design",
      image: "/images/website10.png",
      url: "https://ifatknaankostman.com/"
    },
    {
      id: 11,
      title: "Website",
      subtitle: "UX, Tech Lead",
      image: "/images/website11.png",
      url: "https://diabeteseducation.novocare.com/"
    },
    {
      id: 9,
      title: "Web App",
      subtitle: "UX, Dev, Design",
      image: "/images/website9.png",
      url: "/"
    }
  ]

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const totalImages = websites.length;
  const allLoaded = imagesLoaded === totalImages;

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  // Reset first load state when component unmounts
  useEffect(() => {
    return () => {
      setIsFirstLoad(false);
    };
  }, []);

  return (
    <div className="portfolio-container" style={{ position: 'relative' }}>
      {!hideTitle && <h1 className="portfolio-title">WORK</h1>}
      {/* Spinner overlay */}
      {!allLoaded && (
        <div className="portfolio-preloader-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className={`portfolio-grid ${allLoaded ? 'grid-loaded' : ''} ${!isFirstLoad ? 'no-animation' : ''}`}>
        {websites.map((website) => (
          <a 
            key={website.id} 
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            className="website-card"
          >
            <img 
              src={website.image} 
              alt={website.title} 
              className="website-image"
              width={400} 
              height={200} 
              onLoad={handleImageLoad}
              onError={handleImageLoad}
            />
            <div className="website-info">
              <h3>{website.title}</h3>
              <p>{website.subtitle}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Portfolio; 