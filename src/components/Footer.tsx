import { useEffect, useState } from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 400) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer bg-slate-950 border-t border-slate-900 py-12 relative overflow-hidden">
      
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-cyan-500/5 rounded-full filter blur-[50px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Info */}
          <div className="text-center md:text-left space-y-1.5 flex flex-col md:items-start items-center">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 font-black text-md tracking-tight text-white mb-2"
            >
              <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center text-white text-xs font-black">AR</div>
              <span>Asif Raza</span>
            </button>
            <p className="text-xs text-slate-500">© 2026 Asif Raza. All Rights Reserved.</p>
            <p className="text-[10px] font-mono text-slate-600">Built in Cloud Workspaces with premium assets & layout telemetry systems.</p>
          </div>

          {/* Quick navigational links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-400">
            {['home', 'about', 'skills', 'projects', 'services', 'contact'].map((id) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className="hover:text-cyan-400 transition-colors uppercase tracking-wider font-mono text-[10px]"
              >
                {id}
              </button>
            ))}
          </div>

          {/* Developer Coordinates Social Row */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/officework9089-cpu" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-550 hover:text-white transition-colors text-lg"
              title="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a 
              href="https://www.linkedin.com/in/razaasif/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-550 hover:text-white transition-colors text-lg"
              title="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a 
              href="mailto:AsifRaza7997@gmail.com" 
              className="text-slate-550 hover:text-cyan-400 transition-colors text-lg"
              title="Email"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>

        </div>
      </div>

      {/* Floating BACK TO TOP Button widget */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-slate-900 border border-slate-800 text-cyan-400 hover:text-white hover:bg-slate-800 rounded-xl flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 animate-fadeIn"
          title="Scroll Back To Top"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}

    </footer>
  );
}
