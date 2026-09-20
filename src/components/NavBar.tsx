import { useState, useEffect } from 'react';

interface NavBarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function NavBar({ onNavigate, activeSection, theme, onToggleTheme }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
          ? 'py-4 bg-slate-950/80 backdrop-blur-xl border-b border-slate-900/80 shadow-lg shadow-black/10'
          : 'py-6 bg-transparent'
        }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">

        {/* Brand Developer Logo Icon */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2.5 font-black text-lg tracking-tight font-sans text-white focus:outline-none"
        >
          <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-cyan-500/20">
            AR
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-2xl font-bold text-white leading-tight">
              Asif Raza
            </span>
            <span className="self-start text-[10px] font-mono font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-500/20 px-1.5 py-0.5 rounded uppercase mt-0.5">
              Full Stack Developer
            </span>
          </div>
        </button>

        {/* Large screen menu bar */}
        <div className="hidden lg:flex items-center  bg-slate-900/30 p-1.5 rounded-full border border-slate-900/60 backdrop-blur-sm">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase  transition-all duration-300 ${activeSection === item.id
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-extrabold shadow-md shadow-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Theme and action button panel */}
        <div className="flex items-center gap-3">

          {/* Custom Theme toggle buttons */}
          <button
            onClick={onToggleTheme}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
            title={theme === 'dark' ? 'Toggle White Room' : 'Toggle Cyber Room'}
          >
            {theme === 'dark' ? (
              <i className="fas fa-sun text-sm text-yellow-400"></i>
            ) : (
              <i className="fas fa-moon text-sm text-cyan-400"></i>
            )}
          </button>

          {/* Recruiters direct hire helper button */}
          <button
            onClick={() => handleLinkClick('contact')}
            className="hidden sm:inline-flex px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:opacity-95 text-white text-xs font-bold rounded-xl space-x-1 shadow-md shadow-cyan-500/5 transition-transform active:scale-[0.98]"
          >
            <i className="fas fa-paper-plane mr-1"></i> Hire Me
          </button>

          {/* Mobile responsive drawer toggler */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center hover:text-white focus:outline-none"
            aria-label="Toggle navigation drawer menu"
          >
            {mobileMenuOpen ? (
              <i className="fas fa-times text-md"></i>
            ) : (
              <i className="fas fa-bars text-sm"></i>
            )}
          </button>

        </div>

      </div>

      {/* Responsive drawer element overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-950 border-b border-slate-900 py-6 px-4 space-y-2 shadow-2xl block text-left animate-slideDown">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold capitalize transition-all duration-200 block ${activeSection === item.id
                ? 'bg-gradient-to-r from-cyan-950/40 to-indigo-950/40 border-l-2 border-cyan-500 text-white font-bold'
                : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                }`}
            >
              <div className="flex justify-between items-center">
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                )}
              </div>
            </button>
          ))}
          <div className="pt-4 border-t border-slate-900/60 mt-4">
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:opacity-95 rounded-xl block text-center text-white text-xs font-bold shadow-lg"
            >
              Load Contact Request
            </button>
          </div>
        </div>
      )}

    </nav>
  );
}
