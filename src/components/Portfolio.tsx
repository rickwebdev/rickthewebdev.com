import React, { useState } from 'react';

interface WebsiteCard {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  url: string;
}

interface CaseStudy {
  id: number;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  results: string;
  technologies: string[];
  image: string;
  url: string;
}

const Portfolio: React.FC<{ hideTitle?: boolean }> = ({ hideTitle }) => {
  const websites: WebsiteCard[] = [
    {
      id: 0,
      title: "Website",
      subtitle: "UX, Dev, Design, Logo, CMS, Custom Wordpress Theme",
      image: "/images/website0.png",
      url: "https://demarchelierrestaurant.com/"
    },
    {
      id: 1,
      title: "Website",
      subtitle: "UX, Dev, Design, Logo",
      image: "/images/website1.png",
      url: "https://coastalluxepainting.com/"
    },
    {
      id: 6,
      title: "Web Application: Just for Fun",
      subtitle: "UX, Dev",
      image: "/images/website6.png",
      url: "https://rickthewebdev.com/magic-8-ball/"
    }, 
    {
      id: 7,
      title: "Website",
      subtitle: "UX, Dev, Design, CMS, Custom Wordpress Theme",
      image: "/images/website7.png",
      url: "https://profusek.com/"
    },
    {
      id: 8,
      title: "Website (SPA)",
      subtitle: "UX, Dev, Design, Logo",
      image: "/images/website8.png",
      url: "https://taxexemptconsultants.com/"
    },
   { id: 12,
    title: "Website",
    subtitle: "UX, Dev",
    image: "/images/website12.png",
    url: "https://subtenantstudios.com/"
  },

 
    {
      id: 2,
      title: "Website",
      subtitle: "UX, Dev, Design, Logo",
      image: "/images/website2.png",
      url: "https://coastalluxeflooring.com/"
    },
    {
      id: 3,
      title: "Website: Redesign",
      subtitle: "UX, Dev, Tech Lead [This site is no longer live, but you can view an archived version on the Wayback Machine.",
      image: "/images/website3.png",
      url: "https://web.archive.org/web/20250523084922/https://www.getrealaboutdiabetes.com/"
    },
    {
      id: 5,
      title: "Website: User Experience",
      subtitle: "UX, Design, Prototyping, Tech Lead",
      image: "/images/website5.png",
      url: "https://www.ozempic.com/lifestyle-tips/healthy-eating.html"
    },
    {
      id: 10,
      title: "Website (SPA)",
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
      title: "Web (SPA)",
      subtitle: "UX, Dev, Design",
      image: "/images/website9.png",
      url: "/"
    }
  ];

  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: "Restaurant Digital Rescue & Transformation",
      client: "Demarchelier Bistro",
      challenge: "When Demarchelier Bistro reached out, their site had been hacked and their web host suspended the domain. To anyone searching online, it looked like the restaurant was closed. For a family-owned French bistro in a tourist-driven town, that kind of outage is costly, especially on weekends when out-of-towners are deciding where to eat.",
      solution: "My first priority was to keep them online. I quickly jumped in, pointed their domain to my VPS, and set up a redirect to Resy so customers could keep making reservations without interruption. In just under a week I launched a brand new site built from the ground up with a custom WordPress theme, secure hosting, SSL, automated backups, and caching for long term stability.",
      results: "The result was a polished, resilient digital home that kept reservations flowing and gave the restaurant a site that truly represents their brand. Website performance optimization achieved top benchmarks: 98 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO scores.",
      technologies: ["WordPress", "Custom Themes", "VPS Hosting", "Security", "Performance Optimization", "SEO", "SSL", "Caching"],
      image: "/images/website0.png",
      url: "https://demarchelierrestaurant.com/"
    },
    {
      id: 2,
      title: "Healthcare UX Innovation",
      client: "Novo Nordisk",
      challenge: "Complex medical information needed to be accessible and engaging for patients while maintaining clinical accuracy and compliance requirements. The project required linking each of the 50 US states to diabetes-friendly recipes, creating an interactive educational experience that would engage patients across different regions.",
      solution: "As Creative Technologist, I concepted the user experience for the '50 Plates 50 States' initiative and managed the art director and tech lead. Redesigned the user experience with intuitive navigation, interactive elements, and mobile-optimized content that made complex diabetes education accessible and engaging through regional recipe curation.",
      results: "Successfully delivered a content curation system that connected regional cuisine with diabetes management education. The project demonstrated how creative UX design could make complex medical content more accessible and engaging for patients.",
      technologies: ["UX Design", "Content Curation", "Creative Direction", "Team Management", "Healthcare Compliance", "Mobile Optimization", "Interactive Design"],
      image: "/images/website5.png",
      url: "https://www.ozempic.com/lifestyle-tips/healthy-eating.html"
    },
    {
      id: 3,
      title: "Digital Transformation for Coastal Luxe",
      client: "Coastal Luxe Painting & Flooring",
      challenge: "Two separate businesses needed unified digital presence to compete with larger franchises while maintaining their premium positioning and local expertise.",
      solution: "Developed cohesive brand strategy with modern web development, integrated booking systems, and mobile-first responsive design that showcased their craftsmanship and local market knowledge.",
      results: "40% increase in online inquiries, 25% improvement in mobile conversion rates, and unified brand experience across both businesses.",
      technologies: ["Modern Web Development", "Responsive Design", "UX Strategy", "Brand Integration", "Booking Systems"],
      image: "/images/website1.png",
      url: "https://coastalluxepainting.com/"
    }
  ];

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  // Show only 6 projects initially, or all if expanded
  const displayedProjects = showAllProjects ? websites : websites.slice(0, 6);
  const hasMoreProjects = websites.length > 6;
  
  // Only wait for initially visible images to load
  const initialImagesCount = 6;
  const allLoaded = imagesLoaded >= initialImagesCount;

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  const toggleShowMore = () => {
    setShowAllProjects(!showAllProjects);
  };

  return (
    <div className="portfolio-container" style={{ position: 'relative' }}>
      {!hideTitle && <h1 className="portfolio-title">WORK</h1>}
      {/* Spinner overlay */}
      {!allLoaded && (
        <div className="portfolio-preloader-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className={`portfolio-grid ${allLoaded ? 'grid-loaded' : ''}`}>
        {displayedProjects.map((website) => (
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

      {/* Show More/Less Button */}
      {hasMoreProjects && (
        <div className="show-more-container">
          <button 
            className="show-more-btn"
            onClick={toggleShowMore}
          >
            {showAllProjects ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}

      {/* Case Studies Section */}
      <div className="case-studies-section">
        <h2 className="case-studies-title">Case Studies</h2>
        <p className="case-studies-subtitle">
          Deep dives into strategic thinking and measurable results
        </p>
        
        <div className="case-studies-grid">
          {caseStudies.map((study) => (
            <div key={study.id} className="case-study-card">
              <div className="case-study-image">
                <img 
                  src={study.image} 
                  alt={study.title}
                  className="case-study-thumbnail"
                />
              </div>
              
              <div className="case-study-content">
                <h3 className="case-study-title">{study.title}</h3>
                <p className="case-study-client"><strong>Client:</strong> {study.client}</p>
                
                <div className="case-study-details">
                  <div className="case-study-section">
                    <h4>Challenge</h4>
                    <p>{study.challenge}</p>
                  </div>
                  
                  <div className="case-study-section">
                    <h4>Solution</h4>
                    <p>{study.solution}</p>
                  </div>
                  
                  <div className="case-study-section">
                    <h4>Results</h4>
                    <p>{study.results}</p>
                  </div>
                </div>
                
                <div className="case-study-technologies">
                  <h4>Technologies & Skills</h4>
                  <div className="tech-tags">
                    {study.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <a 
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-study-link"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio; 