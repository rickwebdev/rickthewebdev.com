import type { CaseStudy, WebsiteCard } from '../lib/fetchSiteContent';

export const FALLBACK_WEBSITES: WebsiteCard[] = [
  {
    key: 'local-0',
    id: 0,
    title: 'Demarchelier Bistro',
    subtitle: 'UX, Dev, Design, Logo, CMS, Custom Wordpress Theme',
    image: '/images/website0.png',
    url: 'https://demarchelierrestaurant.com/',
  },
  {
    key: 'local-1',
    id: 1,
    title: 'Clyra Studios',
    subtitle: 'UX, Design, Dev',
    image: '/images/clyrna.png',
    url: 'https://clyrastudios.com/',
  },
  {
    key: 'local-2',
    id: 2,
    title: 'MyLottoGenerator.com',
    subtitle: 'UX, Design, Dev, AI Chat',
    image: '/images/lottogen.png',
    url: 'https://mylottogenerator.com/',
  },
  {
    key: 'local-3',
    id: 3,
    title: 'Ocean Luxe Painting & Flooring',
    subtitle: 'UX, Dev, Design, Logo',
    image: '/images/website1.png',
    url: 'https://coastalluxepainting.com/',
  },
  {
    key: 'local-4',
    id: 4,
    title: 'Office Chat (parody simulation)',
    subtitle: 'Web App, UX, Dev',
    image: '/images/website6.png',
    url: 'https://rickthewebdev.com/magic-8-ball/',
  },
  {
    key: 'local-5',
    id: 5,
    title: 'Profusek',
    subtitle: 'UX, Dev, Design, CMS, Custom Wordpress Theme',
    image: '/images/website7.png',
    url: 'https://profusek.com/',
  },
  {
    key: 'local-6',
    id: 6,
    title: 'Website (SPA)',
    subtitle: 'UX, Dev, Design, Logo',
    image: '/images/website8.png',
    url: 'https://taxexemptconsultants.com/',
  },
  {
    key: 'local-7',
    id: 7,
    title: 'Website',
    subtitle: 'UX, Dev',
    image: '/images/website12.png',
    url: 'https://subtenantstudios.com/',
  },
  {
    key: 'local-8',
    id: 8,
    title: 'Website',
    subtitle: 'UX, Dev, Design, Logo',
    image: '/images/website2.png',
    url: 'https://coastalluxeflooring.com/',
  },
  {
    key: 'local-9',
    id: 9,
    title: 'Website: Redesign',
    subtitle:
      'UX, Dev, Tech Lead [This site is no longer live, but you can view an archived version on the Wayback Machine.',
    image: '/images/website3.png',
    url: 'https://web.archive.org/web/20250523084922/https://www.getrealaboutdiabetes.com/',
  },
  {
    key: 'local-10',
    id: 10,
    title: 'Website: User Experience',
    subtitle: 'UX, Design, Prototyping, Tech Lead',
    image: '/images/website5.png',
    url: 'https://www.ozempic.com/lifestyle-tips/healthy-eating.html',
  },
  {
    key: 'local-11',
    id: 11,
    title: 'Website (SPA)',
    subtitle: 'UX, Dev, Design',
    image: '/images/website10.png',
    url: 'https://ifatknaankostman.com/',
  },
  {
    key: 'local-12',
    id: 12,
    title: 'Website',
    subtitle: 'UX, Tech Lead',
    image: '/images/website11.png',
    url: 'https://diabeteseducation.novocare.com/',
  },
  {
    key: 'local-13',
    id: 13,
    title: 'Web (SPA)',
    subtitle: 'UX, Dev, Design',
    image: '/images/website9.png',
    url: '/',
  },
];

export const FALLBACK_CASE_STUDIES: CaseStudy[] = [
  {
    key: 'local-cs-1',
    id: 1,
    title: 'Restaurant Digital Rescue & Transformation',
    client: 'Demarchelier Bistro',
    challenge:
      'When Demarchelier Bistro reached out, their site had been hacked and their web host suspended the domain. To anyone searching online, it looked like the restaurant was closed. For a family-owned French bistro in a tourist-driven town, that kind of outage is costly, especially on weekends when out-of-towners are deciding where to eat.',
    solution:
      'My first priority was to keep them online. I quickly jumped in, pointed their domain to my VPS, and set up a redirect to Resy so customers could keep making reservations without interruption. In just under a week I launched a brand new site built from the ground up with a custom WordPress theme, secure hosting, SSL, automated backups, and caching for long term stability.',
    results:
      'The result was a polished, resilient digital home that kept reservations flowing and gave the restaurant a site that truly represents their brand. Website performance optimization achieved top benchmarks: 98 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO scores.',
    technologies: [
      'WordPress',
      'Custom Themes',
      'VPS Hosting',
      'Security',
      'Performance Optimization',
      'SEO',
      'SSL',
      'Caching',
    ],
    image: '/images/website0.png',
    url: 'https://demarchelierrestaurant.com/',
  },
  {
    key: 'local-cs-2',
    id: 2,
    title: 'Healthcare UX Innovation',
    client: 'Novo Nordisk',
    challenge:
      'Complex medical information needed to be accessible and engaging for patients while maintaining clinical accuracy and compliance requirements. The project required linking each of the 50 US states to diabetes-friendly recipes, creating an interactive educational experience that would engage patients across different regions.',
    solution:
      "As Creative Technologist, I concepted the user experience for the '50 Plates 50 States' initiative and managed the art director and tech lead. Redesigned the user experience with intuitive navigation, interactive elements, and mobile-optimized content that made complex diabetes education accessible and engaging through regional recipe curation.",
    results:
      'Successfully delivered a content curation system that connected regional cuisine with diabetes management education. The project demonstrated how creative UX design could make complex medical content more accessible and engaging for patients.',
    technologies: [
      'UX Design',
      'Content Curation',
      'Creative Direction',
      'Team Management',
      'Healthcare Compliance',
      'Mobile Optimization',
      'Interactive Design',
    ],
    image: '/images/website5.png',
    url: 'https://www.ozempic.com/lifestyle-tips/healthy-eating.html',
  },
  {
    key: 'local-cs-3',
    id: 3,
    title: 'Digital Transformation for Coastal Luxe',
    client: 'Coastal Luxe Painting & Flooring',
    challenge:
      'Two separate businesses needed unified digital presence to compete with larger franchises while maintaining their premium positioning and local expertise.',
    solution:
      'Developed cohesive brand strategy with modern web development, integrated booking systems, and mobile-first responsive design that showcased their craftsmanship and local market knowledge.',
    results:
      '40% increase in online inquiries, 25% improvement in mobile conversion rates, and unified brand experience across both businesses.',
    technologies: [
      'Modern Web Development',
      'Responsive Design',
      'UX Strategy',
      'Brand Integration',
      'Booking Systems',
    ],
    image: '/images/website1.png',
    url: 'https://coastalluxepainting.com/',
  },
];
