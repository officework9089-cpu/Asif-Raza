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
    'React & Tailwind UI/UX Specialist'
  ];

  useEffect(() => {
    let timer = setTimeout(() => {
      const i = loopNum % words.length;
      const fullText = words[i];

      if (!isDeleting) {
        setTypedText(fullText.substring(0, typedText.length + 1));
        if (typedText === fullText) {
          // Pause before deleting
          setTypingSpeed(2500);
          setIsDeleting(true);
        } else {
          setTypingSpeed(60);
        }
      } else {
        setTypedText(fullText.substring(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setTypingSpeed(500);
        } else {
          setTypingSpeed(30);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed]);

  const stats = [
    { value: '60+', label: 'Projects Completed' },
    { value: '2+', label: 'Years Experience' },
    { value: '100%', label: 'Positive Feedback' },
    // { value: '25+', label: 'Tech Stack Mastery' }
  ];

  const technologies = [
    { name: 'Laravel', icon: 'fa-laravel', color: 'text-red-500 bg-red-500/10 border-red-500/20' },
    { name: 'React.js', icon: 'fa-react', color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' },
    { name: 'Django', icon: 'fa-code', color: 'text-green-500 bg-green-500/10 border-green-500/20' },
    { name: 'Python', icon: 'fa-brands fa-python', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
    { name: 'JavaScript', icon: 'fa-js', color: 'text-yellow-300 bg-yellow-300/10 border-yellow-300/20' },
    { name: 'MySQL', icon: 'fa-database', color: 'text-sky-400 bg-sky-400/10 border-sky-400/20' },
    { name: 'Tailwind CSS', icon: 'fa-css3-alt', color: 'text-teal-400 bg-teal-400/10 border-teal-400/20' },
  ];

  return (
    <section id="home" className="hero min-h-screen flex items-center pt-28 pb-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content Column */}
          <div className="col-span-1 lg:col-span-7 space-y-6 text-left">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <i className="fas fa-satellite-dish mr-1 tracking-widest"></i> Operational Status: Active
            </div> */}

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black tracking-tight leading-none text-white font-sans">
                Asif Raza <br />
                <span className="bg-linear-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  Full Stack Engineer & <br />Web Systems Architect
                </span>
              </h1>
              
              {/* Typewriter text subtitle container */}
              <div className="min-h-10 flex items-center">
                <p className="text-lg sm:text-xl text-slate-300 font-serif font-medium">
                  <span className="text-cyan-400">{typedText}</span>
                  <span className="w-2.5 h-5 bg-cyan-400 inline-block align-middle ml-1 animate-blink"></span>
                </p>
              </div>

              <p className="text-slate-400 text-md sm:text-lg max-w-xl leading-relaxed">
                Building highly secure, blazing-fast web applications, database modules, and beautiful user-centric software nodes for global clients. Specialize in Laravel, React, and Python Django layers.
              </p>
            </div>

            {/* Micro Call To Action Blocks */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('projects');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl font-bold text-white text-sm shadow-xl shadow-cyan-500/15 hover:shadow-cyan-400/25 transition-all duration-300 hover:scale-[1.03]"
              >
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="flex items-center gap-2">
                  Explore Projects <i className="fas fa-arrow-right-long group-hover:translate-x-1.5 transition-transform duration-300"></i>
                </span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 rounded-xl text-white text-sm font-semibold transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <i className="fas fa-envelope text-slate-400 group-hover:text-cyan-400"></i> Get In Touch
                </span>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenResume) {
                    onOpenResume();
                  }
                }}
                className="px-5 py-3.5 bg-cyan-900/10 hover:bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/40 rounded-xl text-cyan-400 text-sm font-semibold transition-all duration-300 inline-flex items-center"
              >
                <i className="fas fa-file-pdf mr-1.5"></i> View & Print Resume
              </button>
            </div>

            {/* Dynamic Numeric Statistics Counter */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-t border-slate-800/80 mt-8">
              {stats.map((s, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-3xl font-extrabold text-white font-mono tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Right Visual Column - Premium 3D Cube */}
          <div className="col-span-1 lg:col-span-5 flex justify-center items-center">
            <div className="relative">
              {/* Pulsing neon space backdrop circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-linear-to-tr from-cyan-500/10 to-indigo-500/1 filter blur-[60px] animate-pulse"></div>

              {/* 3D Rotating Cube Wrapper */}
              <div className="cube-wrapper p-4">
                <div className="floating-cube">
                  <div className="cube-face front">
                    <img src={asifAvatar} alt="Asif Raza Profile Render" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded text-[9px] font-mono text-cyan-400 border border-cyan-500/20">FACE_01 // ACTIVE_DEV</div>
                  </div>
                  <div className="cube-face back">
                    <img src={cyberCode} alt="Cyberspace Code Pattern" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded text-[9px] font-mono text-cyan-400 border border-cyan-500/20">FACE_02 // SYSTEM_NODE</div>
                  </div>
                  <div className="cube-face right">
                    <img src={neuralBrain} alt="Neural Network Prediction Brain" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded text-[9px] font-mono text-cyan-400 border border-cyan-500/20">FACE_03 // INTELLIGENT_AI</div>
                  </div>
                  <div className="cube-face left">
                    <img src={cyberCode} alt="Cyberspace Binary Pattern" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded text-[9px] font-mono text-indigo-400 border border-indigo-500/20">FACE_04 // SECURITY_CORE</div>
                  </div>
                  <div className="cube-face bottom">
                    <img src={neuralBrain} alt="Matrix Logic Systems" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded text-[9px] font-mono text-indigo-400 border border-indigo-500/20">FACE_05 // CORE_DB</div>
                  </div>
                </div>
              </div>

              {/* Tech Stack Horizontal Badge Pill Overlay floating in bottom */}
              {/* <div className="absolute -bottom-8 -left-8 right-0 max-w-sm hidden sm:block">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950/90 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-2xl shadow-cyan-500/5">
                  <span className="text-[10px] font-mono font-bold text-slate-500 w-full mb-1">STABLE INTEGRATIONS :</span>
                  {technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold border ${t.color}`}
                    >
                      <i className={`fab ${t.icon}`}></i>
                      {t.name}
                    </span>
                  ))}
                </div>
              </div> */}
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Neon grid overlay lines */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </section>
  );
}
