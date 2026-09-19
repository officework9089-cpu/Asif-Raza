import { useState, useEffect, useRef } from 'react';

// Custom subcomponents
import CommandPalette from './components/CommandPalette';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadStatus, setLoadStatus] = useState('Initializing Cyber Room...');
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Page Load State cycles
  useEffect(() => {
    const statuses = [
      'Establishing Security Tunnel...',
      'Mapping Relational MySQL Nodes...',
      'Caching Laravel Configuration Matrix...',
      'Computing Python AI Model Weights...',
      'Spawning Interactive 3D Vectors...'
    ];

    let count = 0;
    const interval = setInterval(() => {
      if (count < statuses.length) {
        setLoadStatus(statuses[count]);
        count++;
      } else {
        clearInterval(interval);
        setLoading(false);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  // Theme variable sync on body
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-mode');
      root.classList.remove('dark-theme');
    } else {
      root.classList.remove('light-mode');
      root.classList.add('dark-theme');
    }
  }, [theme]);

  // Scroll Position & Section highlighters
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // 1. Check if we are at the very top of the page (immediate home focus)
      if (window.scrollY < 80) {
        setActiveSection('home');
        return;
      }

      // 2. Check if we have scrolled right to the very bottom (immediate contact focus)
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
        setActiveSection('contact');
        return;
      }

      // 3. Otherwise, check which section takes up the most screen real estate
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'services', 'testimonials', 'blog', 'contact'];
      let currentSection = 'home';
      let maxVisibleHeight = 0;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Find overlap between section boundary and viewport boundary
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(window.innerHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          
          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            currentSection = section;
          }
        }
      }
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center space-y-6 text-center">
        
        {/* Glowing visual backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-[50px]"></div>

        <div className="space-y-4 z-10">
          {/* Spinner element */}
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-slate-900"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-indigo-500 animate-spin"></div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-white font-mono text-xs uppercase tracking-widest font-bold">Asif Raza Matrix</h3>
            <p className="text-slate-400 font-mono text-[11px] h-4 animate-pulse">{loadStatus}</p>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#050816] text-[#CBD5E1]' : 'bg-[#f8fafc] text-[#1e293b]'
    }`}>
      
      {/* Scroll Progress indicator line in header top */}
      <div 
        className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating ambient glowing elements inside background layer */}
      <div className="absolute top-[10%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-cyan-500/5 filter blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[50%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/5 filter blur-[110px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[25%] w-[30vw] h-[30vw] rounded-full bg-teal-500/5 filter blur-[90px] pointer-events-none"></div>

      {/* Navigation Header */}
      <NavBar 
        onNavigate={handleNavigate}
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Pages content wrappers */}
      <main className="relative z-10">
        
        {/* Core Sections */}
        <Hero onNavigate={handleNavigate} onOpenResume={() => setIsResumeOpen(true)} />
        
        <About />
        
        <Skills />
        
        <Projects />
        
        <Experience />
        
        <Services />
        
        <Testimonials />
        
        {/* <Blog /> */}
        
        <Contact />

      </main>

      {/* Footer link systems & quick sliders */}
      <Footer onNavigate={handleNavigate} />

      {/* Vercel style accessibility Keyboard Command Palette shortcut menu (Trigger on Command+K) */}
      <CommandPalette 
        onNavigate={handleNavigate} 
        onToggleTheme={handleToggleTheme} 
      />

      {/* Interactive Printable CV Viewer */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

    </div>
  );
}
