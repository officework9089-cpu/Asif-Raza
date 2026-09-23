import { useState } from 'react';
import asifAvatar from '../assets/images/asif_avatar_1781735629670.jpg';

// Define explicit types
type TabType = 'journey' | 'certifications' | 'goals';

interface TimelineItem {
  year: string;
  role: string;
  company: string;
  desc: string;
  icon: string;
}

interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
}

interface GoalItem {
  title: string;
  desc: string;
}

// Extracted static datasets outside of the component to avoid re-allocation on re-renders
const JOURNEY_TIMELINE: TimelineItem[] = [
  {
    year: '2026',
    role: 'Lead Full Stack Systems Developer',
    company: 'Karachi Freelance Group / Stallion Tech Contracts',
    desc: 'Developing modern full-stack applications using React.js, Laravel, PHP, MySQL, Supabase, REST APIs and Tailwind CSS. Building secure dashboards, authentication systems, CRUD platforms, API integrations and scalable database-driven solutions.',
    icon: 'fa-rocket'
  },

  {
    year: '2026',
    role: 'Full Stack Developer',
    company: 'Nexaura',
    desc: 'Worked on production web applications, contributing to frontend and backend development, database integration, responsive interfaces and practical full-stack solutions.',
    icon: 'fa-code'
  },

  {
    year: '2025',
    role: 'Junior Full Stack Developer',
    company: 'DA Prime Solution',
    desc: 'Developed web applications using PHP, Laravel, JavaScript, MySQL and Bootstrap, including CRUD systems, admin dashboards, authentication, APIs and responsive user interfaces.',
    icon: 'fa-layer-group'
  },

  {
    year: '2025',
    role: 'Full Stack Developer Intern',
    company: 'Salesground.ai',
    desc: 'Worked on web application development and gained practical experience with frontend interfaces, backend functionality, databases, APIs and full-stack development workflows.',
    icon: 'fa-laptop-code'
  },

  {
    year: '2024',
    role: 'Software Development & Technical Foundation',
    company: 'Academic & Personal Projects',
    desc: 'Built a strong foundation in programming, databases and web development through hands-on projects using PHP, JavaScript, Python, C#, Java, MySQL, HTML and CSS.',
    icon: 'fa-book-open'
  }
];

const CERTIFICATIONS_LIST: CertificationItem[] = [
  { title: 'Full-Stack Software Professional', issuer: 'Karachi Software Hub', date: '2025' },
  { title: 'Advanced Backend Engineering with Laravel & PHP', issuer: 'Web Technology Council', date: '2024' },
  { title: 'Information Security & Relational SQL Architecture', issuer: 'Systems Database Consortium', date: '2025' },
  { title: 'Python Machine Learning & NumPy Mathematics', issuer: 'Data Sciences Inst.', date: '2025' }
];

const GOALS_LIST: GoalItem[] = [
  {
    title: 'Full-Stack Cloud Automation',
    desc: 'Implement Dockerized environments, automated CI/CD micro pipelines, and serverless Cloud deployments for scalable product systems.'
  },
  {
    title: 'AI & Intelligent Interfaces Integration',
    desc: 'Expand Django APIs to serve advanced deep recommendation models, NLP pipelines, and automated multi-agent LLM systems reliably.'
  },
  {
    title: 'High Performance Database Sharding',
    desc: 'Pioneer advanced query structures, high-efficiency horizontal partitioning, and caching paradigms to support multi-million database reads.'
  }
];

const TABS: { id: TabType; label: string }[] = [
  { id: 'journey', label: 'Timeline Journey' },
  { id: 'certifications', label: 'Certificates' },
  { id: 'goals', label: 'Engineering Goals' }
];

export default function About() {
  const [activeTab, setActiveTab] = useState<TabType>('journey');

  return (
    <section id="about" className="about py-24 bg-slate-950/40 relative">
      <div className="container mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-sans tracking-tight">
            About <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-12 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>
          <p className="text-slate-400 mt-4 text-md">
            Delve into the chronological evolution, core standards, and professional motivations driving my work.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column Profile Showcase */}
          <div className="col-span-1 lg:col-span-5 space-y-6">
            <div className="relative group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-300 hover:border-cyan-500/30">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-950">
                <img 
                  src={asifAvatar} 
                  alt="Asif Raza - Senior Developer Profile" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-4 rounded-xl border border-slate-800">
                  <div className="font-bold text-white text-md">Asif Raza</div>
                  <div className="text-xs text-cyan-400 mb-1">Karachi, Pakistan (GMT +5)</div>
                  <p className="text-xs text-slate-400">Available for remote contracts, team collaborations, and on-site engineering roles.</p>
                </div>
              </div>
            </div>

            {/* Micro Details Panel */}
            <div className="grid grid-cols-2 gap-4 bg-slate-900/40 p-5 rounded-2xl border border-slate-900">
              <div className="space-y-1">
                <span className="text-xs text-slate-500 font-mono">LOCATION</span>
                <p className="text-sm font-semibold text-white">Karachi, PK</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-500 font-mono">EXPERIENCE</span>
                <p className="text-sm font-semibold text-white">1+ Years Professional</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-500 font-mono mr-2">STATUS</span>
                <p className="text-sm font-semibold text-green-400 inline-flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Open to Contract
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-500 font-mono">EMAIL</span>
                <a 
                  href="mailto:razaasif7997@gmail.com" 
                  className="text-xs font-semibold text-slate-300 hover:text-cyan-400 transition-colors block truncate"
                >
                  razaasif7997@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Column Context Tabulation */}
          <div className="col-span-1 lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white tracking-tight">Architecting Scalable and Intelligent Digital Solutions</h3>
              <p className="text-slate-300 leading-relaxed text-md">
                I am a passionate, results-driven software engineer with academic and professional exposure in high-concurrency web design. Building websites is not just about writing code; it is about creating efficient engines that simplify task workflows, enhance conversion pipelines, and scale effortlessly.
              </p>
              <p className="text-slate-400 leading-relaxed text-md">
                Equipped with extensive background in database structures (MS SQL Server, MySQL, SQLite) and programming abstractions (PHP/Laravel, Python/Django, TypeScript), I help clients achieve performance optimization that ranks as gold-standards.
              </p>
            </div>

            {/* Professional Tabs Buttons */}
            <div 
              role="tablist" 
              aria-label="About sections"
              className="flex overflow-x-auto scrollbar-hide border-b border-slate-800 -mx-4 px-4 sm:mx-0 sm:px-0 whitespace-nowrap"
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-6 text-sm font-semibold border-b-2 transition-all duration-300 capitalize shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      isActive 
                        ? 'border-cyan-400 text-white font-bold' 
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Tab Contents */}
            <div className="bg-slate-900/20 p-6 rounded-2xl border border-slate-900 min-h-75 flex flex-col justify-start">
              
              {/* Journey Tab */}
              <div
                id="panel-journey"
                role="tabpanel"
                aria-labelledby="tab-journey"
                hidden={activeTab !== 'journey'}
                className="space-y-6 animate-fadeIn"
              >
                {JOURNEY_TIMELINE.map((item, idx) => (
                  <div key={idx} className="flex gap-4 relative group">
                    {idx !== JOURNEY_TIMELINE.length - 1 && (
                      <div className="absolute left-6 top-8 -bottom-6 w-0.5 bg-slate-800"></div>
                    )}
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-400/50 flex items-center justify-center text-cyan-400 text-sm transition-all duration-300">
                      <i className={`fas ${item.icon}`} aria-hidden="true"></i>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold text-cyan-400">{item.year}</span>
                      <h4 className="text-md font-bold text-white group-hover:text-cyan-300 transition-colors duration-200">{item.role}</h4>
                      <p className="text-xs text-slate-500 font-semibold">{item.company}</p>
                      <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Certifications Tab */}
              <div
                id="panel-certifications"
                role="tabpanel"
                aria-labelledby="tab-certifications"
                hidden={activeTab !== 'certifications'}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn"
              >
                {CERTIFICATIONS_LIST.map((cert, idx) => (
                  <div key={idx} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-200 text-left">
                    <div className="font-mono text-xs text-cyan-400 font-bold mb-1">{cert.date}</div>
                    <h4 className="text-sm font-bold text-white leading-snug mb-1">{cert.title}</h4>
                    <p className="text-xs text-slate-500">{cert.issuer}</p>
                  </div>
                ))}
              </div>

              {/* Goals Tab */}
              <div
                id="panel-goals"
                role="tabpanel"
                aria-labelledby="tab-goals"
                hidden={activeTab !== 'goals'}
                className="space-y-4 animate-fadeIn"
              >
                {GOALS_LIST.map((goal, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-cyan-400/10 text-cyan-400 flex items-center justify-center mt-0.5 shrink-0">
                      <i className="fas fa-check text-[10px]" aria-hidden="true"></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{goal.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{goal.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}