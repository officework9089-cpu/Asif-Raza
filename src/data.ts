import { Project, Skill, TimelineItem, ServiceItem, TestimonialItem, BlogItem } from './types';

// Import images
import asifAvatar from './assets/images/asif_avatar_1781735629670.jpg';
import cyberCode from './assets/images/cyber_code_1781735646624.jpg';
import neuralBrain from './assets/images/neural_brain_1781735667609.jpg';
import airmontPublisher from './assets/images/airmont_publisher_1781735690302.jpg';
import autoboliMarketplace from './assets/images/autoboli_marketplace_1781735707122.jpg';
import marketingMockup from './assets/images/marketing_mockup_1781735730670.jpg';

export const projectsData: Project[] = [
  {
    id: 'airmont',
    title: 'Airmont Publisher Website',
    description: 'A modern publishing platform developed for Airmont Publisher featuring book management, author profiles, category browsing, responsive layouts, and an optimized user experience for readers and publishers.',
    category: 'Publishing',
    image: airmontPublisher,
    tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    github: 'https://github.com/officework9089-cpu',
    demo: 'https://airmontpublishing.com/',
    features: [
      'Comprehensive Book Catalogue & Digital Inventory System',
      'Interactive Author Profile Timelines & Bios',
      'Advanced Category Filter Engine with Instant Search',
      'Fully Responsive Reader-Focused Mobile Interface',
      'Secured Administrative Portal for Content Curators'
    ],
    challenges: 'Architecting a highly flexible relational structure that allows authors to be mapped dynamically to multiple anthologies while maintaining performance.',
    results: 'Delivered a robust platform resulting in a 40% increase in reader session times and simplified administration overhead for Airmont editors.'
  },
  {
    id: 'autoboli',
    title: 'Autoboli Vehicle Marketplace',
    description: 'A modern automotive marketplace platform for buying and selling vehicles with advanced search filters, vehicle listings, dealer profiles, booking features, and responsive user experience across all devices.',
    category: 'Automotive',
    image: autoboliMarketplace,
    tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'jQuery'],
    github: 'https://github.com/daprimeg/boli',
    demo: 'https://github.com/daprimeg/boli',
    features: [
      'Multi-Attribute Advanced Vehicular Search Form',
      'Dealer Profile Verification and Direct Chat Intakes',
      'Dynamic Booking Calendar for Virtual Showroom Walkthroughs',
      'Automated Vehicle Spec Ingestion and Auto-categorization',
      'Sleek Visual Showcase with Dynamic Hover Inspection Animations'
    ],
    challenges: 'Handling real-time image uploads, automated asset resizing, and ensuring security parameters across direct buyer-to-seller requests.',
    results: 'Deployed a responsive SaaS vehicle platform that handles thousands of concurrent listings seamlessly with sub-second page loads.'
  },
  {
    id: 'business-mind',
    title: 'Business Mind Marketing Website',
    description: 'A professional digital marketing website designed for Business Mind Marketing featuring service showcases, lead generation forms, SEO-focused pages, responsive layouts, and modern branding for business growth.',
    category: 'Marketing',
    image: marketingMockup,
    tech: ['Laravel', 'PHP', 'SQLite', 'Tailwind CSS', 'JavaScript'],
    github: 'https://github.com/officework9089-cpu',
    demo: 'https://github.com/officework9089-cpu',
    features: [
      'High-Conversion Intelligent Lead Capture Forms',
      'Configurable Interactive Pricing Calculators for Tailored Services',
      'Performance-Optimized SEO Pages Boosting Core Web Vitals',
      'Modern Elegant Glassmorphic Brand Design System',
      'Light/Dark Real-Time UI Theme Adaptability'
    ],
    challenges: 'Implementing smooth premium design animations and glassmorphism styling across legacy browsers without bloating bundle sizes.',
    results: 'Achieved an instant 100% Mobile performance score, generating a 25% uptick in client discovery and direct email inquiries.'
  }
];

export const skillsData: Skill[] = [
  // Frontend
  { name: 'HTML5 / CSS3', level: 100, category: 'frontend', rating: 'Expert' },
  { name: 'JavaScript (ES6+)', level: 95, category: 'frontend', rating: 'Expert' },
  { name: 'React.js', level: 85, category: 'frontend', rating: 'Advanced' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend', rating: 'Advanced' },
  { name: 'Bootstrap', level: 85, category: 'frontend', rating: 'Advanced' },
  { name: 'Angular', level: 55, category: 'frontend', rating: 'Beginner' },

  // Backend
  { name: 'PHP', level: 88, category: 'backend', rating: 'Advanced' },
  { name: 'Laravel Framework', level: 90, category: 'backend', rating: 'Advanced' },
  { name: 'Python', level: 85, category: 'backend', rating: 'Advanced' },
  { name: 'Django / FastAPI', level: 80, category: 'backend', rating: 'Advanced' },
  { name: 'Flask', level: 75, category: 'backend', rating: 'Intermediate' },
  { name: 'Java', level: 70, category: 'backend', rating: 'Intermediate' },
  { name: 'C#', level: 65, category: 'backend', rating: 'Intermediate' },

  // Databases
  { name: 'MySQL', level: 88, category: 'database', rating: 'Advanced' },
  { name: 'MS SQL Server', level: 85, category: 'database', rating: 'Advanced' },
  { name: 'SQLite', level: 90, category: 'database', rating: 'Advanced' },
  { name: 'MongoDB', level: 70, category: 'database', rating: 'Intermediate' },
  { name: 'Firebase', level: 75, category: 'database', rating: 'Intermediate' },

  // AI & Data Science
  { name: 'NumPy / Pandas', level: 80, category: 'ai', rating: 'Advanced' },
  { name: 'Matplotlib / Seaborn', level: 70, category: 'ai', rating: 'Intermediate' },
  { name: 'scikit-learn', level: 70, category: 'ai', rating: 'Intermediate' },
  { name: 'TensorFlow', level: 50, category: 'ai', rating: 'Beginner' },
  { name: 'OpenCV', level: 55, category: 'ai', rating: 'Beginner' },

  // Tools & Platforms
  { name: 'Git & GitHub', level: 90, category: 'tools', rating: 'Expert' },
  { name: 'VS Code', level: 95, category: 'tools', rating: 'Expert' },
  { name: 'Visual Studio (2019/2022)', level: 75, category: 'tools', rating: 'Intermediate' },
  { name: 'WAMP / XAMPP / Laragon', level: 85, category: 'tools', rating: 'Intermediate' }
];

export const timelineData: TimelineItem[] = [
  {
    year: '2026',
    title: 'Senior Full Stack Developer Engagement',
    subtitle: 'Karachi, PK (Freelance & Remote Contract)',
    description: 'Leading digital architecture planning, developing highly scalable SaaS client portals, and writing performance-hardened system nodes using React, Django, and Laravel frameworks.',
    type: 'experience'
  },
  {
    year: '2025',
    title: 'Enterprise Software Engineering Contributions',
    subtitle: 'Software Development Specialist',
    description: 'Delivered several large-scale web products with sophisticated backends. Successfully integrated secure database topologies, optimized API structures, and designed immersive client products.',
    type: 'achievement'
  },
  {
    year: '2024',
    title: 'Professional Engineering Inbound Journey',
    subtitle: 'Full-Stack Developer Path',
    description: 'Began building production-grade PHP applications and custom websites. Discovered passion for combining algorithmic computer science with jaw-dropping pixel-perfect frontend experiences.',
    type: 'education'
  }
];

export const servicesData: ServiceItem[] = [
  {
    id: 'srv-fullstack',
    title: 'Full Stack Development',
    description: 'End-to-end crafting of high-performance modern web apps, utilizing robust backend logic paired with responsive, breathtaking interfaces.',
    icon: 'fa-cubes',
    priceEstimate: '$1,500+'
  },
  {
    id: 'srv-laravel',
    title: 'Laravel Custom Applications',
    description: 'Developing heavy-duty business applications, subscription portals, and content systems with optimal speed and security.',
    icon: 'fa-bolt',
    priceEstimate: '$1,200+'
  },
  {
    id: 'srv-django',
    title: 'Django & Python Systems',
    description: 'Building secure background endpoints, secure REST integrations, and smart algorithmic endpoints using Python frameworks.',
    icon: 'fa-brands fa-python',
    priceEstimate: '$1,500+'
  },
  {
    id: 'srv-apis',
    title: 'REST API & Third Party Integration',
    description: 'Connecting distinct microservices, designing clean secure endpoints, database connectors and webhook architecture.',
    icon: 'fa-network-wired',
    priceEstimate: '$600+'
  },
  {
    id: 'srv-db',
    title: 'Database Architecture & Modeling',
    description: 'Auditing queries, caching tables, setting foreign key relations, and indexing MySQL/SQL Server for maximum data throughput.',
    icon: 'fa-database',
    priceEstimate: '$800+'
  },
  {
    id: 'srv-opt',
    title: 'Website Core Web Vital Optimization',
    description: 'Squeezing speed metrics to score a clean 100 on Google PageSpeed Insights, boosting SEO ranking and reducing server costs.',
    icon: 'fa-gauge-high',
    priceEstimate: '$500+'
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Sarah Jenkins',
    role: 'Director of Digital Media',
    company: 'Airmont Publishers Group',
    feedback: 'Asif has been a lifesaver. He converted our complex publication catalogs into a seamless web platform. The results speak for themselves. Sessions are up 40%!',
    rating: 5
  },
  {
    id: 't-2',
    name: 'David K.',
    role: 'Co-Founder',
    company: 'Autoboli Corporation',
    feedback: 'An exceptional developer of uncommon speed. He architected our custom vehicle lookup and instant lead system. Absolute pleasure to work with, highly recommended.',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Hamza Alvi',
    role: 'Product Lead',
    company: 'Business Mind Agency',
    feedback: 'His attention to styling detail and performance optimization is incredible. Our Google PageSpeed score is now 100 on mobile, driving hundreds of organic leads.',
    rating: 5
  }
];


