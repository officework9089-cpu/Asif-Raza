import { useState } from 'react';
import { timelineData } from '../data';
import asifAvatar from '../assets/images/asif_avatar_1781735629670.jpg';

export default function About() {
  const [activeTab, setActiveTab] = useState<'journey' | 'certifications' | 'goals'>('journey');

  const journeyTimeline = [
    {
      year: '2026',
      role: 'Full Stack Engineer (Enterprise Level)',
      company: 'Karachi Freelance Network',
      desc: 'Developing fully customized database wrappers, API microservices and secure consumer dashboards. Scaling legacy codebases for international optimization.',
      icon: 'fa-rocket'
    },
    {
      year: '2025',
      role: 'Software Web Developer Specialist',
      company: 'Client Base & Agencies',
      desc: 'Built production-ready platforms including Autoboli Vehicle marketplace (handling direct consumer listings) and Airmont Publishing portal (optimized database search arrays).',
      icon: 'fa-layer-group'
    },
    {
      year: '2024',
      role: 'Foundational Studies & Early Engineering',
      company: 'Academic Coding Systems',
      desc: 'Mastered standard software loops, dynamic MySQL schemes, C# classes, Java APIs, and structural CSS. Delivered 10 client products before launching professional career.',
      icon: 'fa-book-open'
    }
  ];

  const certificationsList = [
    { title: 'Full-Stack Software Professional', issuer: 'Karachi Software Hub', date: '2025' },
    { title: 'Advanced Backend Engineering with Laravel & PHP', issuer: 'Web Technology Council', date: '2024' },
    { title: 'Information Security & Relational SQL Architecture', issuer: 'Systems Database Consortium', date: '2025' },
    { title: 'Python Machine Learning & NumPy Mathematics', issuer: 'Data Sciences Inst.', date: '2025' }
  ];

  return (
    <section id="about" className="about py-24 bg-slate-950/40 relative">
      <div className="container mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-sans tracking-tight">
            About <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
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
                  alt="Asif Raza Senior Developer Render" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-4 rounded-xl border border-slate-800">
                  <div className="font-bold text-white text-md">Asif Raza</div>
                  <div className="text-xs text-cyan-400 mb-1">Karachi, Pakistan (GMT +5)</div>
                  <p className="text-xs text-slate-400">Available for remote contracts, team collaborations, and on-site engineering roles.</p>
                </div>
              </div>
            </div>

            {/* Micro details panel */}
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
                <span className="text-xs text-slate-500 font-mono">STATUS</span>
                <p className="text-sm font-semibold text-green-400 inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span> Open to Contract
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-500 font-mono">EMAIL</span>
                <p className="text-xs font-semibold text-slate-300">AsifRaza7997@gmail.com</p>
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
            <div className="flex overflow-x-auto scrollbar-hide border-b border-slate-800 -mx-4 px-4 sm:mx-0 sm:px-0 whitespace-nowrap">
              {(['journey', 'certifications', 'goals'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-6 text-sm font-semibold border-b-2 transition-all duration-300 capitalize flex-shrink-0 ${
                    activeTab === tab 
                      ? 'border-cyan-400 text-white font-bold' 
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab === 'journey' ? 'Timeline Journey' : tab === 'certifications' ? 'Certificates' : 'Engineering Goals'}
                </button>
              ))}
            </div>

            {/* Dynamic Tab Contents */}
            <div className="bg-slate-900/20 p-6 rounded-2xl border border-slate-900 min-h-[300px] flex flex-col justify-start">
              
              {activeTab === 'journey' && (
                <div className="space-y-6">
                  {journeyTimeline.map((item, idx) => (
                    <div key={idx} className="flex gap-4 relative group">
                      {idx !== journeyTimeline.length - 1 && (
                        <div className="absolute left-6 top-8 bottom-[-24px] w-0.5 bg-slate-800"></div>
                      )}
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-400/50 flex items-center justify-center text-cyan-400 text-sm transition-all duration-300">
                        <i className={`fas ${item.icon}`}></i>
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
              )}

              {activeTab === 'certifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificationsList.map((cert, idx) => (
                    <div key={idx} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-200 text-left">
                      <div className="font-mono text-xs text-cyan-400 font-bold mb-1">{cert.date}</div>
                      <h4 className="text-sm font-bold text-white leading-snug mb-1">{cert.title}</h4>
                      <p className="text-xs text-slate-500">{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'goals' && (
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-cyan-400/10 text-cyan-400 flex items-center justify-center mt-0.5"><i className="fas fa-check text-[10px]"></i></div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Full-Stack Cloud Automation</h4>
                      <p className="text-xs text-slate-400">Implement Dockerized environments, automated CI/CD micro pipelines, and serverless Cloud deployments for scalable product systems.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-cyan-400/10 text-cyan-400 flex items-center justify-center mt-0.5"><i className="fas fa-check text-[10px]"></i></div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-sans">AI & Intelligent Interfaces Integration</h4>
                      <p className="text-xs text-slate-400">Expand Django APIs to serve advanced deep recommendation models, NLP pipelines, and automated multi-agent LLM systems reliably.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-cyan-400/10 text-cyan-400 flex items-center justify-center mt-0.5"><i className="fas fa-check text-[10px]"></i></div>
                    <div>
                      <h4 className="text-sm font-bold text-white">High Performance Database Sharding</h4>
                      <p className="text-xs text-slate-400">Pioneer advanced query structures, high-efficiency horizontal partitioning, and caching paradigms to support multi-million database reads.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
