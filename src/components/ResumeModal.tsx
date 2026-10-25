
import React, { useEffect } from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const skillGroups = [
  {
    name: 'Frontend Development',
    items: [
      'React.js & TypeScript',
      'JavaScript & HTML5/CSS3',
      'TanStack Router / Start',
      'Tailwind CSS & Bootstrap',
      'Responsive UI Development',
    ],
  },
  {
    name: 'Backend Development',
    items: [
      'Supabase & REST APIs',
      'PHP & Laravel',
      'Python, Django & Flask',
      'FastAPI',
      'Authentication & Authorization',
    ],
  },
  {
    name: 'Databases & Integrations',
    items: [
      'PostgreSQL / Supabase',
      'MySQL & SQLite',
      'MongoDB & Firebase',
      'Stripe & Payment Workflows',
      'Supabase Storage & Third-Party APIs',
    ],
  },
  {
    name: 'Tools & Data',
    items: [
      'Git & GitHub',
      'Vercel & VS Code',
      'API Testing & Debugging',
      'NumPy, Pandas & Matplotlib',
      'Scikit-learn, TensorFlow Basics & OpenCV Basics',
    ],
  },
];

const experiences = [
  {
    company: 'Nexaura',
    role: 'Full Stack Developer',
    period: '5 Months',
    points: [
      'Developed and maintained modern web applications with responsive interfaces, reusable components, and clean application architecture.',
      'Built frontend features using React, TypeScript, JavaScript, and Tailwind CSS for desktop and mobile experiences.',
      'Worked across backend services, APIs, authentication, database operations, and application state to deliver full-stack functionality.',
      'Implemented CRUD workflows, dashboards, forms, data-driven interfaces, and role-based application features.',
      'Used Git/GitHub for version control, debugging, code improvements, and collaborative development.',
      'Integrated third-party services and APIs and contributed to maintainable, deployment-ready solutions.',
    ],
  },
  {
    company: 'Salesground.ai',
    role: 'Full Stack Developer Intern',
    period: 'Aug – Oct 2025',
    points: [
      'Built and customized Filament PHP admin panels, tables, forms, resources, and dashboards.',
      'Designed responsive frontend components using Tailwind CSS.',
      'Implemented CRUD features, authentication, and role-based access control.',
      'Worked with SQLite, REST APIs, debugging, testing, query optimization, Git/GitHub, and deployment fundamentals.',
    ],
  },
  {
    company: 'DA Prime Solution',
    role: 'Junior Full Stack Developer',
    period: 'Jun – Aug 2025',
    points: [
      'Built an admin dashboard with CRUD operations for products, categories, orders, and users.',
      'Implemented authentication and authorization using Laravel security services.',
      'Developed responsive interfaces using HTML5, CSS3, Bootstrap, and JavaScript.',
    ],
  },
];

const projects = [
  {
    title: 'E-commerce & Business Web Applications',
    stack: 'React · TypeScript · TanStack · Supabase · Tailwind · Stripe',
    description:
      'Modern commerce and business applications featuring product management, authentication, shopping carts, checkout, admin dashboards, Supabase database and storage, and integrations.',
  },
  {
    title: 'Auto Boli',
    stack: 'Laravel 12 · PHP 8.3 · SQLite',
    description:
      'Vehicle trading application featuring an admin panel, CRUD operations, authentication, and database integration.',
  },
  {
    title: 'Airmont Library System',
    stack: 'Laravel 12 · PHP 8.3 · SQLite',
    description:
      'Library and e-commerce platform with admin management, CRUD functionality, authentication, and structured data management.',
  },
];

export default function ResumeModal({
  isOpen,
  onClose,
}: ResumeModalProps) {
  // Prevent background scrolling while the modal is open.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Support closing the modal with the Escape key.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6 print:static print:block print:overflow-visible print:bg-white print:p-0">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md print:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Asif Raza professional resume"
        className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-white shadow-2xl print:static print:max-h-none print:max-w-none print:overflow-visible print:rounded-none print:border-0 print:bg-white print:text-black print:shadow-none"
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/60 px-5 py-4 print:hidden sm:px-6">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
              Professional Resume
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-cyan-400"
              title="Print resume or save as PDF"
            >
              <i className="fas fa-print" aria-hidden="true" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 transition-colors hover:text-white"
              aria-label="Close resume"
            >
              <i className="fas fa-times" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Resume content */}
        <div className="resume-content flex-1 space-y-8 overflow-y-auto p-6 text-left sm:p-10 print:overflow-visible print:p-0 print:text-black">
          <style>{`
            @page {
              size: A4;
              margin: 12mm;
            }

            @media print {
              html,
              body {
                background: #fff !important;
                color: #111827 !important;
              }

              body * {
                visibility: visible !important;
              }

              .resume-content {
                overflow: visible !important;
                padding: 0 !important;
                color: #111827 !important;
              }

              .resume-content h1,
              .resume-content h4,
              .resume-content h3 {
                color: #111827 !important;
              }

              .resume-content p,
              .resume-content li,
              .resume-content span,
              .resume-content a {
                color: #374151 !important;
              }

              .resume-content .resume-panel {
                background: #f8fafc !important;
                border-color: #e2e8f0 !important;
              }

              .resume-content .resume-accent {
                color: #0e7490 !important;
              }

              .resume-content .resume-section {
                break-inside: avoid;
              }

              .resume-content .resume-experience {
                break-inside: avoid;
              }

              .resume-content a {
                text-decoration: none !important;
              }

              .resume-content .resume-divider {
                border-color: #cbd5e1 !important;
              }
            }
          `}</style>

          {/* Header */}
          <header className="resume-section flex flex-col justify-between gap-6 border-b border-slate-800 pb-7 print:pb-4 md:flex-row">
            <div className="max-w-xl space-y-3">
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl print:text-3xl">
                ASIF RAZA
              </h1>

              <h2 className="resume-accent text-sm font-bold uppercase leading-relaxed tracking-wider text-cyan-400 sm:text-base">
                Full Stack Developer
              </h2>

              <p className="text-sm leading-7 text-slate-300 print:text-xs print:leading-5">
                Modern Web Systems · Scalable Applications · API Integration
                · Cloud Development
              </p>

              <p className="max-w-lg text-sm leading-6 text-slate-400 print:text-xs print:leading-5">
                Full Stack Developer experienced in building modern,
                responsive web applications and e-commerce platforms.
                Focused on frontend architecture, backend services,
                authentication, database design, payment workflows,
                third-party integrations, debugging, and deployment.
              </p>
            </div>

            {/* Contact details */}
            <div className="resume-panel space-y-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-300 print:min-w-[220px] print:p-3">
              <div className="flex items-start gap-3">
                <i
                  className="fas fa-envelope resume-accent mt-0.5 w-4 text-cyan-400"
                  aria-hidden="true"
                />
                <a
                  href="mailto:Razaasif7997@gmail.com"
                  className="break-all hover:underline"
                >
                  Razaasif7997@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <i
                  className="fas fa-phone-alt resume-accent mt-0.5 w-4 text-cyan-400"
                  aria-hidden="true"
                />
                <a
                  href="whatsapp://send?phone=923102388463"
                  className="hover:underline"
                >
                  +92-310-2388463
                </a>
              </div>

              <div className="flex items-start gap-3">
                <i
                  className="fas fa-globe resume-accent mt-0.5 w-4 text-cyan-400"
                  aria-hidden="true"
                />
                <a
                  href="https://asif-raza.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="break-all hover:underline"
                >
                  Portfolio Website
                </a>
              </div>

              <div className="flex items-start gap-3">
                <i
                  className="fab fa-github resume-accent mt-0.5 w-4 text-cyan-400"
                  aria-hidden="true"
                />
                <a
                  href="https://github.com/officework9089-cpu"
                  target="_blank"
                  rel="noreferrer"
                  className="break-all hover:underline"
                >
                  GitHub Profile
                </a>
              </div>

              <div className="flex items-start gap-3">
                <i
                  className="fab fa-linkedin resume-accent mt-0.5 w-4 text-cyan-400"
                  aria-hidden="true"
                />
                <a
                  href="https://www.linkedin.com/in/razaasif/"
                  target="_blank"
                  rel="noreferrer"
                  className="break-all hover:underline"
                >
                  LinkedIn Profile
                </a>
              </div>

              <div className="flex items-start gap-3">
                <i
                  className="fas fa-map-marker-alt resume-accent mt-0.5 w-4 text-cyan-400"
                  aria-hidden="true"
                />
                <span>Karachi, Pakistan</span>
              </div>
            </div>
          </header>

          {/* Professional experience */}
          <section className="resume-section space-y-5">
            <SectionHeading>Professional Experience</SectionHeading>

            {experiences.map((experience) => (
              <article
                key={experience.company}
                className="resume-experience space-y-2"
              >
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {experience.role}
                    </h4>
                    <p className="text-sm font-semibold text-slate-400">
                      {experience.company}
                    </p>
                  </div>

                  <span className="resume-accent w-fit shrink-0 rounded border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-xs font-semibold text-cyan-300">
                    {experience.period}
                  </span>
                </div>

                <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-slate-300 marker:text-cyan-400 print:text-xs print:leading-5">
                  {experience.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          {/* Technical skills */}
          <section className="resume-section space-y-4">
            <SectionHeading>Core Technology Stack</SectionHeading>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <div
                  key={group.name}
                  className="resume-panel rounded-xl border border-slate-800 bg-slate-900/40 p-4"
                >
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
                    {group.name}
                  </h4>

                  <ul className="space-y-2 text-xs leading-5 text-slate-400">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="resume-accent mt-0.5 text-cyan-400">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="resume-section space-y-4">
            <SectionHeading>Selected Projects</SectionHeading>

            <div className="space-y-4">
              {projects.map((project) => (
                <article key={project.title} className="space-y-1.5">
                  <h4 className="text-sm font-bold text-white">
                    {project.title}
                  </h4>

                  <p className="resume-accent text-xs font-semibold text-cyan-300">
                    {project.stack}
                  </p>

                  <p className="text-sm leading-6 text-slate-400 print:text-xs print:leading-5">
                    {project.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="resume-section space-y-4">
            <SectionHeading>Education & Training</SectionHeading>

            <EducationItem
              title="Associate Degree Program in Cyber Security"
              institution="Iqra University"
              period="2023 – 2025"
            />

            <EducationItem
              title="Advanced Python Programming"
              institution="Institute of Business Administration (NAVTCC)"
              period="Sep – Dec 2025"
            />

            <EducationItem
              title="Advanced Diploma in Software Engineering"
              institution="Aptech Learning"
              period="2021 – 2023"
            />
          </section>

          {/* Languages */}
          <section className="resume-section space-y-3">
            <SectionHeading>Languages</SectionHeading>

            <p className="text-sm text-slate-300">
              English — Intermediate
              <span className="mx-3 text-slate-600">•</span>
              Russian — Basic
            </p>
          </section>

          {/* Footer */}
          <footer className="resume-divider border-t border-slate-800 pt-4 text-center text-xs text-slate-500">
            Asif Raza · Full Stack Developer · Karachi, Pakistan
          </footer>
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-800 bg-slate-950 px-6 py-4 print:hidden">
          <p className="text-xs text-slate-500">
            Print or save your resume as a PDF.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            Close Resume
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h3 className="resume-divider border-b border-slate-800 pb-2 text-sm font-bold uppercase tracking-widest text-cyan-400 print:text-xs">
      {children}
    </h3>
  );
}

function EducationItem({
  title,
  institution,
  period,
}: {
  title: string;
  institution: string;
  period: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
      <div>
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="text-xs text-slate-400">{institution}</p>
      </div>

      <span className="shrink-0 text-xs text-slate-400">{period}</span>
    </div>
  );
}