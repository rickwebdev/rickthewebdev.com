import React from 'react';

interface WebsiteCard {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  url: string;
}

const Portfolio: React.FC = () => {
  const websites: WebsiteCard[] = [
    {
      id: 1,
      title: "Website",
      subtitle: "UX, Dev, Design",
      image: "/images/website1.png",
      url: "https://coastalluxepainting.com/"
    },
    {
      id: 2,
      title: "Website",
      subtitle: "UX, Dev, Design",
      image: "/images/website2.png",
      url: "https://coastalluxeflooring.com/"
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
    }
  ];

  return (
    <div className="portfolio-container">
      <h1 className="portfolio-title">WORK</h1>
      <div className="portfolio-grid">
        {websites.map((website) => (
          <a 
            key={website.id} 
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            className="website-card"
          >
            <img src={website.image} alt={website.title} className="website-image" />
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