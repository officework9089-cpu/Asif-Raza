import { useState, useEffect } from 'react';
import logo from '@/assets/images/logo.jpg';

interface NavBarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function NavBar({
  onNavigate,
  activeSection,
  theme,
  onToggleTheme,
}: NavBarProps) {
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

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-slate-950/80 backdrop-blur-2xl border-b border-slate-800/60 shadow-xl shadow-cyan-950/10'
            : 'py-5 bg-transparent'
        }`}
      >
        {/* Ambient Top Glow Layer */}
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 opacity-30 pointer-events-none blur-xl" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative z-10">
          
          {/* Brand / Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 group focus:outline-none touch-manipulation"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-indigo-500 rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300" />
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-950 p-0.5 overflow-hidden flex items-center justify-center">
                <img
                  src={logo}
                  alt="Asif Raza"
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col text-left">
              <span className="text-base sm:text-xl font-black text-white leading-none tracking-tight group-hover:text-cyan-400 transition-colors">
                Asif Raza
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-cyan-400/90 bg-cyan-950/60 border border-cyan-500/30 px-1.5 py-0.5 rounded-md uppercase tracking-wider mt-1 w-fit shadow-xs shadow-cyan-500/20">
                Full Stack Architect
              </span>
            </div>
          </button>

          {/* Desktop Navigation Bar (XL screens and above) */}
          <div className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md shadow-inner shadow-slate-950/50">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 touch-manipulation ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-linear-to-r from-cyan-500 to-indigo-500 rounded-full shadow-lg shadow-cyan-500/25 -z-10 animate-fade-in" />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Action Control Panel */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle visual room theme"
              className="relative group p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-white transition-all duration-300 shadow-md touch-manipulation active:scale-95"
            >
              <div className="absolute inset-0 rounded-xl bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              {theme === 'dark' ? (
                <i className="fas fa-sun text-sm text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              ) : (
                <i className="fas fa-moon text-sm text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
              )}
            </button>

            {/* Direct Hire CTA */}
            <button
              onClick={() => handleLinkClick('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-linear-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all duration-300 active:scale-95 touch-manipulation"
            >
              <i className="fas fa-paper-plane text-xs animate-pulse" />
              <span>Hire Me</span>
            </button>

            {/* Mobile / Tablet Menu Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white transition-all duration-200 focus:outline-none touch-manipulation active:scale-95"
              aria-label="Toggle navigation menu"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars-staggered'} text-base text-cyan-400`} />
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Quick-Access Horizontal ScrollBar */}
        {/* <div className="xl:hidden w-full border-t border-slate-900/80 bg-slate-950/60 backdrop-blur-md py-2 mt-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar px-4">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-300 touch-manipulation ${
                    isActive
                      ? 'bg-linear-to-r from-cyan-500 to-indigo-500 text-white font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div> */}
      </nav>

      {/* Full-Screen Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 xl:hidden bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-between pt-28 pb-8 px-6 animate-fade-in overflow-y-auto">
          
          {/* Ambient Decorative Background Effects */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Nav List */}
          <div className="space-y-2 relative z-10 max-w-md mx-auto w-full">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-4 px-2">
              Navigation Index
            </p>

            {menuItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 touch-manipulation ${
                    isActive
                      ? 'bg-linear-to-r from-cyan-500/15 via-indigo-500/15 to-transparent border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/5'
                      : 'bg-slate-900/40 border border-slate-800/50 text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-600">
                      0{index + 1}.
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {isActive ? (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/80 animate-ping" />
                  ) : (
                    <i className="fas fa-chevron-right text-xs text-slate-700" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Drawer Footer Actions */}
          <div className="pt-6 border-t border-slate-900 max-w-md mx-auto w-full relative z-10 space-y-3">
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-500/25 active:scale-95 transition-transform"
            >
              <i className="fas fa-paper-plane mr-2" /> Start a Project / Hire
            </button>

            <div className="flex justify-between items-center text-xs text-slate-500 font-mono px-2 pt-2">
              <span>Status: <span className="text-emerald-400 font-semibold">Available for hire</span></span>
              <span>v2.4.0</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}