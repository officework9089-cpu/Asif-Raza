import { useState, useEffect } from 'react';
import asifAvatar from '../assets/images/asif_avatar_1781735629670.jpg';
import cyberCode from '../assets/images/cyber_code_1781735646624.jpg';
import neuralBrain from '../assets/images/neural_brain_1781735667609.jpg';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenResume?: () => void;
}

export default function Hero({ onNavigate, onOpenResume }: HeroProps) {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const words = [
    'Full Stack Developer & Software Engineer',
    'Laravel & PHP Expert Developer',
    'Python AI & Django System Architect',
    'React & Tailwind UI/UX Specialist',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const i = loopNum % words.length;
      const fullText = words[i];

      if (!isDeleting) {
        setTypedText(fullText.substring(0, typedText.length + 1));
        if (typedText === fullText) {
          setTypingSpeed(2500);
          setIsDeleting(true);
        } else {
          setTypingSpeed(60);
        }
      } else {
        setTypedText(fullText.substring(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setLoopNum((prev) => prev + 1);
          setTypingSpeed(500);
        } else {
          setTypingSpeed(30);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed, words]);

  const stats = [
    { value: '60+', label: 'Projects Completed' },
    { value: '2+', label: 'Years Experience' },
    { value: '100%', label: 'Positive Feedback' },
    { value: '24/7', label: 'Architecture Support' },
  ];

  

  return (
    <section id="home" className="hero min-h-screen flex items-center pt-28 pb-16 relative overflow-hidden bg-slate-950">
      
      {/* ----------------- MODERN ANIMATED BACKGROUND ----------------- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Cyber perspective grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] animate-pulse" />

        {/* Ambient Pulsing Glow Orbs */}
        <div className="absolute -top-24 -left-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 right-0 w-125 h-125 bg-indigo-600/15 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />

        {/* Floating cyber light particles */}
        <div className="absolute top-1/4 left-1/6 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8] animate-ping duration-1000" />
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8] animate-ping duration-700" />
      </div>

      {/* ----------------- MAIN HERO CONTENT ----------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Operational Status Badge */}
            {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-cyan-400 text-xs font-mono font-semibold shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <i className="fas fa-satellite-dish text-[10px] text-cyan-400" />
              <span>System Status: Online & Ready</span>
            </div> */}

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">
                Asif Raza <br />
                <span className="bg-linear-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  Full Stack Engineer & <br />Web Systems Architect
                </span>
              </h1>
              
              {/* Typewriter text subtitle container */}
              <div className="min-h-8 flex items-center justify-center lg:justify-start">
                <p className="text-base sm:text-xl text-slate-300 font-mono font-medium">
                  <span className="text-cyan-400">&gt; {typedText}</span>
                  <span className="w-2 h-5 bg-cyan-400 inline-block align-middle ml-1 animate-pulse" />
                </p>
              </div>

              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Architecting high-performance web applications, scalable REST APIs, and modern responsive user interfaces. Specialized in enterprise solutions built on Laravel, React, and Python Django layers.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('projects');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-6 py-2 bg-linear-to-r from-cyan-500 to-indigo-500 rounded-xl font-bold text-white text-xs sm:text-sm shadow-xl shadow-cyan-500/10 hover:shadow-cyan-400/25 transition-all duration-300 hover:scale-[1.02] active:scale-95 touch-manipulation"
              >
                <span className="flex items-center gap-2">
                  Explore Projects <i className="fas fa-arrow-right-long group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-2 bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 rounded-xl text-white text-xs sm:text-sm font-semibold transition-all duration-300 backdrop-blur-md active:scale-95 touch-manipulation"
              >
                <span className="flex items-center gap-2">
                  <i className="fas fa-envelope text-slate-400" /> Get In Touch
                </span>
              </button>

              {onOpenResume && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenResume();
                  }}
                  className="px-5 py-2 bg-cyan-950/20 hover:bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-500/60 rounded-xl text-cyan-400 text-xs sm:text-sm font-semibold transition-all duration-300 inline-flex items-center gap-2 backdrop-blur-md active:scale-95 touch-manipulation"
                >
                  <i className="fas fa-file-pdf" /> Resume
                </button>
              )}
            </div>

           
            {/* Statistics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-900/90 mt-8">
              {stats.map((s, idx) => (
                <div key={idx} className="space-y-0.5 text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight bg-linear-to-r from-cyan-400 to-indigo-400 bg-clip-text">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Visual Column - 3D Cube Visual Feature */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-xs sm:max-w-sm">
              
              {/* Outer Ambient Glowing Aura */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-linear-to-tr from-cyan-500/20 via-sky-500/10 to-indigo-500/20 blur-3xl animate-pulse" />

              {/* 3D Rotating Cube Container */}
              <div className="cube-wrapper p-4 relative z-10">
                <div className="floating-cube">
                  <div className="cube-face front">
                    <img src={asifAvatar} alt="Asif Raza Profile Render" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-slate-950/80 backdrop-blur-md rounded text-[9px] font-mono text-cyan-400 border border-cyan-500/30">
                      FACE_01 // ACTIVE_DEV
                    </div>
                  </div>
                  <div className="cube-face back">
                    <img src={cyberCode} alt="Cyberspace Code Pattern" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-slate-950/80 backdrop-blur-md rounded text-[9px] font-mono text-cyan-400 border border-cyan-500/30">
                      FACE_02 // SYSTEM_NODE
                    </div>
                  </div>
                  <div className="cube-face right">
                    <img src={neuralBrain} alt="Neural Network Prediction Brain" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-slate-950/80 backdrop-blur-md rounded text-[9px] font-mono text-cyan-400 border border-cyan-500/30">
                      FACE_03 // INTELLIGENT_AI
                    </div>
                  </div>
                  <div className="cube-face left">
                    <img src={cyberCode} alt="Cyberspace Binary Pattern" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-slate-950/80 backdrop-blur-md rounded text-[9px] font-mono text-indigo-400 border border-indigo-500/30">
                      FACE_04 // SECURITY_CORE
                    </div>
                  </div>
                  <div className="cube-face bottom">
                    <img src={neuralBrain} alt="Matrix Logic Systems" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-slate-950/80 backdrop-blur-md rounded text-[9px] font-mono text-indigo-400 border border-indigo-500/30">
                      FACE_05 // CORE_DB
                    </div>
                  </div>
                </div>
              </div>

            {/* Micro Tech Stack Badges */}
             {/* <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="text-lg font-mono font-semibold uppercase text-cyan-500 mr-1">Stack:</span>
              {technologies.map((t, idx) => (
                <span
                  key={idx}
                  className={` items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-mono font-semibold border ${t.color}`}
                >
                  <i className={`fab ${t.icon}`} />
                  {t.name}
                </span>
              ))}
            </div> */}

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Subtle Transition Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}