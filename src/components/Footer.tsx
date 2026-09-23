import { useEffect, useState } from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (window.scrollY > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop, { passive: true });
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/officework9089-cpu',
      icon: 'fab fa-github',
      hoverColor: 'hover:text-white hover:border-slate-700',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/razaasif/',
      icon: 'fab fa-linkedin-in',
      hoverColor: 'hover:text-cyan-400 hover:border-cyan-500/40',
    },
    {
      name: 'Email',
      href: 'mailto:razaasif7997@gmail.com',
      icon: 'fas fa-envelope',
      hoverColor: 'hover:text-indigo-400 hover:border-indigo-500/40',
    },
  ];

  return (
    <footer className="footer bg-slate-950 border-t border-slate-900/80 pt-12 sm:pt-16 pb-8 relative overflow-hidden">
      {/* Ambient Radial Glowing Effects */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[120px] bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-10 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 sm:pb-12 border-b border-slate-900/80">
          
          {/* Brand Info Section */}
          <div className="lg:col-span-5 space-y-4 text-center md:text-left">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-3 group focus:outline-none touch-manipulation"
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl blur-xs opacity-70 group-hover:opacity-100 transition duration-300" />
                <div className="relative w-8 h-8 rounded-lg bg-slate-950 p-0.5 flex items-center justify-center text-cyan-400 font-mono font-black text-xs border border-slate-800">
                  AR
                </div>
              </div>

              <span className="text-lg font-black text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                Asif Raza
              </span>
            </button>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mx-auto md:mx-0">
              Senior Full-Stack Architect delivering scalable, high-performance web applications, robust database systems, and modern visual UI ecosystems.
            </p>

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for freelance & full-time roles
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-4 text-center md:text-left">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-4">
              Quick Navigation
            </p>
            <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto md:mx-0">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="text-left text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors py-1 touch-manipulation flex items-center gap-1.5 group"
                >
                  <i className="fas fa-chevron-right text-[9px] text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Social & Connect Section */}
          <div className="lg:col-span-3 text-center md:text-left space-y-4">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              Developer Hub
            </p>

            <div className="flex items-center justify-center md:justify-start gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className={`w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-800/80 text-slate-400 flex items-center justify-center text-sm transition-all duration-300 active:scale-95 touch-manipulation ${social.hoverColor}`}
                  title={social.name}
                >
                  <i className={social.icon} />
                </a>
              ))}
            </div>

            <p className="text-[11px] font-mono text-slate-500">
              Direct Contact:{' '}
              <a
                href="mailto:razaasif7997@gmail.com"
                className="text-cyan-400 hover:underline block sm:inline mt-1 sm:mt-0"
              >
                razaasif7997@gmail.com
              </a>
            </p>
          </div>

        </div>

        {/* Bottom Copyright & Telemetry Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-500">
          <div>
            <p>© {new Date().getFullYear()} Asif Raza. All Rights Reserved.</p>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono text-slate-600">
            <span>Built with React & Tailwind CSS</span>
            <span>•</span>
            <span className="text-cyan-500/80">v2.4.0</span>
          </div>
        </div>

      </div>

      {/* Floating Glassmorphic Back-To-Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className={`fixed bottom-6 right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-900/90 border border-slate-800 text-cyan-400 hover:text-white hover:bg-slate-800/90 hover:border-cyan-500/40 flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-300 touch-manipulation active:scale-95 group ${
          showScroll
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 rounded-xl bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <i className="fas fa-arrow-up text-sm sm:text-base group-hover:-translate-y-0.5 transition-transform" />
      </button>

    </footer>
  );
}