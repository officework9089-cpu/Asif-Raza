import { useState } from 'react';
import asifAvatar from '../assets/images/about.png';

// ============================================================
// TYPES
// ============================================================

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

// ============================================================
// DATA
// ============================================================

const JOURNEY_TIMELINE: TimelineItem[] = [
  {
    year: '2026',
    role: 'Full Stack Developer',
    company: 'Nexaura',
    desc: 'Worked on production web applications, contributing to frontend and backend development, database integration, responsive interfaces and practical full-stack solutions.',
    icon: 'fa-code',
  },

  {
    year: '2025',
    role: 'Junior Full Stack Developer',
    company: 'DA Prime Solution',
    desc: 'Developed web applications using PHP, Laravel, JavaScript, MySQL and Bootstrap, including CRUD systems, admin dashboards, authentication, APIs and responsive user interfaces.',
    icon: 'fa-layer-group',
  },

  {
    year: '2025',
    role: 'Full Stack Developer Intern',
    company: 'Salesground.ai',
    desc: 'Worked on web application development and gained practical experience with frontend interfaces, backend functionality, databases, APIs and full-stack development workflows.',
    icon: 'fa-laptop-code',
  },

  {
    year: '2024',
    role: 'Software Development & Technical Foundation',
    company: 'Academic & Personal Projects',
    desc: 'Built a strong foundation in programming, databases and web development through hands-on projects using PHP, JavaScript, Python, C#, Java, MySQL, HTML and CSS.',
    icon: 'fa-book-open',
  },
];

const CERTIFICATIONS_LIST: CertificationItem[] = [
  {
    title: 'Advanced Python Programming',
    issuer: 'Institute of Business Administration (NAVTTC)',
    date: '2025',
  },
  {
    title: 'Advanced Diploma in Software Engineering',
    issuer: 'Aptech Learning',
    date: '2023',
  },
  {
    title: 'Associate Degree Program in Cyber Security',
    issuer: 'IQRA University',
    date: '2025',
  },
];

const GOALS_LIST: GoalItem[] = [
  {
    title: 'Full-Stack Cloud Automation',
    desc: 'Implement Dockerized environments, automated CI/CD micro pipelines, and serverless Cloud deployments for scalable product systems.',
  },
  {
    title: 'AI & Intelligent Interfaces Integration',
    desc: 'Expand Django APIs to serve advanced deep recommendation models, NLP pipelines, and automated multi-agent LLM systems reliably.',
  },
  {
    title: 'High Performance Database Sharding',
    desc: 'Pioneer advanced query structures, high-efficiency horizontal partitioning, and caching paradigms to support multi-million database reads.',
  },
];

const TABS: { id: TabType; label: string }[] = [
  { id: 'journey', label: 'Timeline Journey' },
  { id: 'certifications', label: 'Certificates' },
  { id: 'goals', label: 'Engineering Goals' },
];

// ============================================================
// COMPONENT
// ============================================================

export default function About() {
  const [activeTab, setActiveTab] = useState<TabType>('journey');

  return (
    <section
      id="about"
      className="about relative overflow-hidden bg-slate-950/40 py-24"
    >
      {/* =====================================================
          BACKGROUND ENERGY EFFECTS
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Cyan glow */}
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/[0.06] blur-[120px]" />

        {/* Violet glow */}
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-violet-500/[0.06] blur-[120px]" />

        {/* Bottom blue glow */}
        <div className="absolute bottom-0 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-blue-500/[0.04] blur-[120px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(34,211,238,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.8) 1px, transparent 1px)',
            backgroundSize: '45px 45px',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">

        {/* =====================================================
            SECTION HEADING
        ===================================================== */}

        <div className="mx-auto mb-16 max-w-3xl text-center">

          {/* <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.04] px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
            </span>

            {/* <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400">
              System Profile // 01
            </span> 
          </div> */}

          <h2 className="font-sans text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            About{' '}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          <div className="mx-auto mt-5 flex items-center justify-center gap-2">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400" />
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
            <div className="h-px w-16 bg-cyan-400" />
            <div className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.9)]" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-violet-400" />
          </div>

          <p className="mt-5 text-sm leading-relaxed text-slate-400 sm:text-base">
            Delve into the chronological evolution, core standards, and
            professional motivations driving my work.
          </p>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">

          {/* =================================================
              LEFT PROFILE
          ================================================= */}

          <div className="col-span-1 space-y-5 lg:col-span-5">

            {/* Profile card */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 p-3 shadow-2xl shadow-black/20 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_20px_60px_rgba(34,211,238,0.08)]">

              {/* Card glow */}
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/[0.08] blur-[80px] transition-all duration-700 group-hover:bg-cyan-400/[0.14]" />

              {/* Top energy line */}
              <div className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent opacity-60" />


              <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-950">

                <img
                  src={asifAvatar}
                  alt="Asif Raza - Senior Developer Profile"
                  className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-95"
                  loading="lazy"
                />
                <div className="absolute top-0 right-0 mb-2 flex items-center gap-2 backdrop-blur-sm rounded-full bg-slate-950/40 border border-slate-800/80 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-300 group-hover:bg-slate-950/60 group-hover:text-cyan-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />

                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-green-400">
                    Developer Online
                  </span>
                </div>

                {/* Image overlays */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" /> */}

                <div className="absolute inset-0 bg-linear-to-br from-cyan-400/4 via-transparent to-violet-500/8" />

                {/* Corner decorations */}
                {/* <div className="absolute left-4 top-4 h-8 w-8 border-l border-t border-cyan-400/50" />
                <div className="absolute right-4 top-4 h-8 w-8 border-r border-t border-cyan-400/50" />
                <div className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-cyan-400/30" />
                <div className="absolute bottom-4 right-4 h-8 w-8 border-b border-r border-cyan-400/30" /> */}

                {/* Profile information */}
                <div className="absolute bottom-0 left-0 right-0 p-5">



                  <div className="text-lg font-black text-white">
                    Asif Raza
                  </div>

                  <div className="mt-1 text-xs font-medium text-cyan-400">
                    Karachi, Pakistan (GMT +5)
                  </div>

                  <p className="mt-2 max-w-md text-xs leading-relaxed tex-white/80 transition-colors duration-300 group-hover:text-white/90 ">
                    Available for remote contracts, team collaborations, and
                    on-site engineering roles.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                MICRO DETAILS
            ================================================= */}

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cyan-400/30 bg-slate-950/60 shadow-[0_0_20px_rgba(34,211,238,0.04)] backdrop-blur-sm">

              {/* Location */}
              <div className="group bg-slate-950/70 p-4 transition-all duration-300 hover:bg-cyan-400/4">
                <span className="font-mono text-[9px] font-bold tracking-[0.18em] text-slate-600">
                  LOCATION
                </span>

                <p className="mt-1 text-sm font-bold text-white transition-colors group-hover:text-cyan-300">
                  Karachi, PK
                </p>
              </div>

              {/* Experience */}
              <div className="group bg-slate-950/70 p-4 transition-all duration-300 hover:bg-cyan-400/[0.04]">
                <span className="font-mono text-[9px] font-bold tracking-[0.18em] text-slate-600">
                  EXPERIENCE
                </span>

                <p className="mt-1 text-sm font-bold text-white transition-colors group-hover:text-cyan-300">
                  2+ Years
                </p>
              </div>

              {/* Status */}
              <div className="group bg-slate-950/70 p-4 transition-all duration-300 hover:bg-green-400/[0.04]">
                <span className="font-mono text-[9px] font-bold tracking-[0.18em] text-slate-600">
                  STATUS
                </span>
                <br />

                <p className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-green-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>

                  Open to Contract
                </p>
              </div>

              {/* Email */}
              <div className="group min-w-0 bg-slate-950/70 p-4 transition-all duration-300 hover:bg-cyan-400/[0.04]">
                <span className="font-mono text-[9px] font-bold tracking-[0.18em] text-slate-600">
                  EMAIL
                </span>

                <a
                  href="mailto:razaasif7997@gmail.com"
                  className="mt-1 block truncate text-xs font-bold text-white transition-colors hover:text-cyan-400"
                >
                  razaasif7997@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT CONTENT
          ================================================= */}

          <div className="col-span-1 space-y-7 text-left lg:col-span-7">

            {/* Intro */}
            <div className="relative">

              <div className="absolute -left-5 top-1 h-12 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-violet-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />

              <h3 className="text-xl font-black leading-tight text-white sm:text-2xl">
                Building{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Scalable
                </span>
                , High-Performance Digital Solutions
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                I am a passionate, results-driven Software Engineer with
                academic and professional experience in designing and
                developing high-performance, scalable web applications. I
                focus on building reliable software solutions that streamline
                workflows, improve operational efficiency, and support
                business growth.
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                With strong expertise in database architecture and management,
                including MS SQL Server, MySQL, and SQLite, along with
                experience in PHP/Laravel, Python/Django, and TypeScript, I
                develop robust and maintainable applications with performance,
                scalability, and user experience in mind.
              </p>
            </div>

            {/* =================================================
                TABS
            ================================================= */}

            <div
              role="tablist"
              aria-label="About sections"
              className="relative flex overflow-x-auto rounded-2xl border border-slate-800/80 bg-slate-950/60 p-1.5 scrollbar-hide backdrop-blur-sm"
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
                    className={`
                      group relative flex min-w-max flex-1 items-center justify-center gap-2
                      rounded-xl px-4 py-3
                      text-[10px] font-bold uppercase tracking-[0.12em]
                      transition-all duration-300
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-cyan-400/60
                      ${isActive
                        ? 'bg-cyan-400/[0.08] text-white shadow-[inset_0_0_20px_rgba(34,211,238,0.04)]'
                        : 'text-slate-500 hover:bg-white/[0.02] hover:text-slate-200'
                      }
                    `}
                  >
                    {/* Dot */}
                    <span
                      className={`
                        h-1.5 w-1.5 rounded-full transition-all duration-300
                        ${isActive
                          ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]'
                          : 'bg-slate-700 group-hover:bg-cyan-500/70'
                        }
                      `}
                    />

                    <span className="relative z-10">
                      {tab.label}
                    </span>

                    {/* Active bottom glow */}
                    {isActive && (
                      <span className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* =================================================
                TAB CONTENT CONTAINER
            ================================================= */}

            <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/50 p-5 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-6">

              {/* Background glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/[0.04] blur-[80px]" />

              {/* =================================================
                  JOURNEY
              ================================================= */}

              <div
                id="panel-journey"
                role="tabpanel"
                aria-labelledby="tab-journey"
                hidden={activeTab !== 'journey'}
                className="space-y-7 animate-fadeIn"
              >
                {JOURNEY_TIMELINE.map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative flex gap-4"
                  >
                    {/* Connecting line */}
                    {idx !== JOURNEY_TIMELINE.length - 1 && (
                      <div className="absolute left-[23px] top-12 -bottom-7 w-px bg-gradient-to-b from-cyan-400/40 via-slate-800 to-transparent" />
                    )}

                    {/* Timeline node */}
                    <div className="relative z-10 shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-cyan-400 shadow-lg shadow-black/20 transition-all duration-300 group-hover:border-cyan-400/60 group-hover:bg-cyan-400/[0.06] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]">
                        <i
                          className={`fas ${item.icon} text-sm`}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Glow ring */}
                      <div className="absolute inset-0 rounded-2xl border border-cyan-400/0 transition-all duration-500 group-hover:scale-125 group-hover:border-cyan-400/20" />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1 pb-1">

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] px-2 py-1 font-mono text-[9px] font-bold tracking-widest text-cyan-400">
                          {item.year}
                        </span>

                        <span className="h-1 w-1 rounded-full bg-slate-700" />

                        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-600">
                          Experience
                        </span>
                      </div>

                      <h4 className="mt-2 text-sm font-black text-white transition-colors duration-300 group-hover:text-cyan-300">
                        {item.role}
                      </h4>

                      <p className="mt-0.5 text-xs font-semibold text-slate-500">
                        {item.company}
                      </p>

                      <p className="mt-2 text-xs leading-relaxed text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* =================================================
                  CERTIFICATIONS
              ================================================= */}

              <div
                id="panel-certifications"
                role="tabpanel"
                aria-labelledby="tab-certifications"
                hidden={activeTab !== 'certifications'}
                className="grid grid-cols-1 gap-4 md:grid-cols-2 animate-fadeIn"
              >
                {CERTIFICATIONS_LIST.map((cert, idx) => (
                  <div
                    key={idx}
                    className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/70 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(34,211,238,0.12)]"
                  >
                    {/* Glow */}
                    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-500/[0.07] blur-3xl transition-all duration-500 group-hover:bg-cyan-400/[0.16]" />

                    {/* Scan line */}
                    <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent transition-all duration-500 group-hover:via-cyan-400/80" />

                    <div className="relative z-10">

                      {/* Icon */}
                      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.04] text-cyan-400 transition-all duration-300 group-hover:border-cyan-400/60 group-hover:bg-cyan-400/[0.08] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]">
                        <i className="fas fa-certificate text-sm" />
                      </div>

                      {/* Date */}
                      <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

                        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                          Certified // {cert.date}
                        </span>
                      </div>

                      <h4 className="text-sm font-black leading-snug text-white transition-colors duration-300 group-hover:text-cyan-100">
                        {cert.title}
                      </h4>

                      <p className="mt-2 text-xs leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
                        {cert.issuer}
                      </p>
                    </div>

                    {/* Energy bar */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-all duration-700 group-hover:w-full" />
                  </div>
                ))}
              </div>

              {/* =================================================
                  GOALS
              ================================================= */}

              <div
                id="panel-goals"
                role="tabpanel"
                aria-labelledby="tab-goals"
                hidden={activeTab !== 'goals'}
                className="space-y-4 animate-fadeIn"
              >
                {GOALS_LIST.map((goal, idx) => (
                  <div
                    key={idx}
                    className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/70 hover:shadow-[0_0_30px_rgba(34,211,238,0.10)]"
                  >
                    {/* Glow */}
                    <div className="absolute -left-16 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-cyan-500/[0.04] blur-3xl transition-all duration-500 group-hover:bg-cyan-400/[0.14]" />

                    {/* Scan line */}
                    <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent transition-all duration-500 group-hover:via-cyan-400/70" />

                    <div className="relative z-10 flex items-start gap-4">

                      {/* Number */}
                      <div className="relative shrink-0">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.04] font-mono text-xs font-black text-cyan-400 transition-all duration-300 group-hover:border-cyan-400/60 group-hover:bg-cyan-400/[0.09] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]">
                          {String(idx + 1).padStart(2, '0')}
                        </div>

                        <div className="absolute inset-0 rounded-xl border border-cyan-400/0 transition-all duration-500 group-hover:scale-125 group-hover:border-cyan-400/20" />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">

                        <div className="mb-1 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] transition-transform duration-300 group-hover:scale-150" />

                          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-slate-600 transition-colors duration-300 group-hover:text-cyan-500">
                            OBJECTIVE_{String(idx + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <h4 className="text-sm font-black leading-snug text-white transition-colors duration-300 group-hover:text-cyan-100">
                          {goal.title}
                        </h4>

                        <p className="mt-1.5 text-xs leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
                          {goal.desc}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="mt-1 hidden text-lg text-slate-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400 sm:block">
                        →
                      </div>
                    </div>

                    {/* Energy/progress line */}
                    <div className="relative mt-4 h-[2px] overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full w-1/4 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 opacity-50 transition-all duration-700 group-hover:w-full group-hover:opacity-100" />
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