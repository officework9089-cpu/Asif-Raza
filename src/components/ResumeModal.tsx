import React, { useEffect } from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const skillGroups = [
    { name: 'Backend Mastery', items: ['PHP & Laravel (90%)', 'Python & Django (80%)', 'REST APIs', 'Authentication Systems', 'Microservices'] },
    { name: 'Frontend Architecture', items: ['React.js & Hooks', 'TypeScript', 'Tailwind CSS', 'Next.js (Base)', 'Responsive layouts'] },
    { name: 'Databases & Servers', items: ['MS SQL Server', 'MySQL', 'SQLite', 'XAMPP / Laragon', 'Database Query Tuning'] },
    { name: 'Tools & Workflows', items: ['Git / GitHub / CI-CD', 'Vite / npm / Composer', 'Linux Systems', 'Agile / Scrum boards'] }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto print:absolute print:inset-0 print:bg-white print:p-0 print:z-0">
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 print:hidden"
        onClick={onClose}
      />

      {/* Main Modal container */}
      <div className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10 print:static print:max-h-full print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-900 bg-slate-900/40 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">Interactive Professional CV</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5 shadow-lg shadow-cyan-500/10 transition-transform active:scale-[0.97]"
              title="Print CV or save as PDF"
            >
              <i className="fas fa-print"></i> Print or Save PDF
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close CV Viewer"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* CV Scrollable Content */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-8 text-left print:overflow-visible print:p-0 print:text-black print:space-y-6">
          
          {/* Printable custom CSS */}
          <style dangerouslySetInnerHTML={{__html: `
            @media print {
              body, html {
                background: white !important;
                color: black !important;
              }
              .print-dark-text {
                color: #000000 !important;
              }
              .print-gray-text {
                color: #4a5568 !important;
              }
              .print-border {
                border-color: #cbd5e1 !important;
              }
              .print-bg-gray {
                background-color: #f1f5f9 !important;
              }
            }
          `}} />

          {/* Header section */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-slate-900 pb-8 print:border-slate-300 print:pb-4">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight print:text-black">
                ASIF RAZA
              </h1>
              <h2 className="text-lg font-bold text-cyan-400 uppercase tracking-wider print:text-cyan-600">
                Full Stack Software Engineer
              </h2>
              <p className="text-slate-400 text-sm max-w-xl leading-relaxed print:text-slate-700">
                Performance-driven and highly technical Full Stack Engineer based in Karachi, Pakistan. 
                Expertise lies in engineering high-quality backends using Laravel, Django, and PHP, alongside crafting scalable databases and modular interfaces in React.
              </p>
            </div>
            
            {/* Quick Contact info */}
            <div className="space-y-2.5 text-xs font-mono text-slate-400 print:text-slate-800 bg-slate-900/30 p-4 rounded-xl border border-slate-900 print:bg-slate-100 print:border-slate-200">
              <div className="flex items-center gap-2">
                <i className="fas fa-envelope text-cyan-400 w-4"></i>
                <a href="mailto:razaasif7997@gmail.com" className="hover:underline">razaasif7997@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-phone-alt text-cyan-400 w-4"></i>
                <a href="tel:+923102388463" className="hover:underline">+92 310 2388463</a>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-cyan-400 w-4"></i>
                <span>Karachi, Pakistan (GMT +5)</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fab fa-github text-cyan-400 w-4"></i>
                <a href="https://github.com/officework9089-cpu" target="_blank" rel="noreferrer" className="hover:underline">github.com/officework9089-cpu</a>
              </div>
              <div className="flex items-center gap-2">
                <i className="fab fa-linkedin text-cyan-400 w-4"></i>
                <a href="https://www.linkedin.com/in/razaasif/" target="_blank" rel="noreferrer" className="hover:underline">linkedin.com/in/razaasif</a>
              </div>
            </div>
          </div>

          {/* Chronological professional experiences */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-900 pb-2 print:border-slate-300 print:text-cyan-600">
              Professional Work History
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <h4 className="text-md font-bold text-white print:text-black">Lead Full Stack Systems Developer</h4>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded border border-cyan-400/20 print:bg-slate-100 print:text-slate-800 print:border-slate-350">2026 - Present</span>
                </div>
                <p className="text-xs font-semibold text-slate-400 print:text-slate-600">Karachi Freelance Network / Stallion Tech Contracts — Karachi, Pakistan</p>
                <ul className="list-disc list-outside text-xs text-slate-300 space-y-1.5 pl-4 print:text-slate-850">
                  <li>Formulate robust backend logic, controller architectures, and database triggers utilizing PHP Laravel 11.</li>
                  <li>Develop rich and responsive user interfaces in React.js styled with Tailwind utility nodes, achieving optimal performance.</li>
                  <li>Audit local database configurations (MS SQL & MySQL Server), resolving deadlock parameters and optimizing heavy index lists.</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <h4 className="text-md font-bold text-white print:text-black">Mid-Level Software Developer Specialist</h4>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded border border-cyan-400/20 print:bg-slate-100 print:text-slate-800 print:border-slate-350">2025 - 2026</span>
                </div>
                <p className="text-xs font-semibold text-slate-400 print:text-slate-600">Business Mind Digital Agency — Karachi, Pakistan</p>
                <ul className="list-disc list-outside text-xs text-slate-300 space-y-1.5 pl-4 print:text-slate-850">
                  <li>Architected and engineered Autoboli Vehicles Marketplace client portal, mapping consumer automotive classifications.</li>
                  <li>Integrated lightweight SQLite and MySQL transactional query systems to capture leads, speeding up inquiry retrieval times by 50%.</li>
                  <li>Crafted custom web dashboard telemetry displays, boosting client acquisition rates and professional conversion levels.</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <h4 className="text-md font-bold text-white print:text-black">Web Engineering Associate (Academic & Contractual)</h4>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded border border-cyan-400/20 print:bg-slate-100 print:text-slate-800 print:border-slate-350">2024 - 2025</span>
                </div>
                <p className="text-xs font-semibold text-slate-400 print:text-slate-600">Systems & Applet Consortium — Karachi, Pakistan</p>
                <ul className="list-disc list-outside text-xs text-slate-300 space-y-1.5 pl-4 print:text-slate-850">
                  <li>Developed over 15 client prototypes including localized book publishing platforms (Airmont Publishing) and directories.</li>
                  <li>Wrote custom data modules utilizing Python Django, NumPy, Scikit-learn, and Seaborn libraries for statistics visualizations.</li>
                  <li>Won prizes at regional technology competitions for high-concurrency database designs.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Categorized skills breakdown */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-900 pb-2 print:border-slate-300 print:text-cyan-600">
              Technical Skill Matrix
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 print:grid-cols-4">
              {skillGroups.map((group, gIdx) => (
                <div key={gIdx} className="p-4 bg-slate-900/40 border border-slate-900 rounded-xl print:bg-slate-100 print:border-slate-200">
                  <h4 className="text-xs font-mono font-bold text-white mb-2 uppercase tracking-wide print:text-black">{group.name}</h4>
                  <ul className="space-y-1 text-xs text-slate-400 print:text-slate-800">
                    {group.items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Academic details */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-900 pb-2 print:border-slate-300 print:text-cyan-600">
              Education & Academic Foundation
            </h3>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h4 className="text-sm font-bold text-white print:text-black">Bachelor of Science in Computer Science (BSCS)</h4>
                <p className="text-xs text-slate-400 print:text-slate-650">Karachi University / Affiliated Computing Center — Karachi, PK</p>
              </div>
              <span className="text-xs font-mono text-slate-400 print:text-slate-700">Graduation expected: 2027</span>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-slate-900 bg-slate-950 flex items-center justify-between text-xs print:hidden">
          <p className="text-slate-500 font-mono text-[10px]">Verify details securely via razaasif7997@gmail.com</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-lg text-slate-300 font-semibold"
          >
            Exit Document
          </button>
        </div>

      </div>
    </div>
  );
}
