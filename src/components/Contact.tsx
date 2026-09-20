import React, { useState, useEffect } from 'react';

export default function Contact() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [companyProject, setCompanyProject] = useState('');
  const [projectMessage, setProjectMessage] = useState('');

  // Status handlers
  const [isSending, setIsSending] = useState(false);
  const [sendingDone, setSendingDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Karachi UTC+5 Dynamic running clock
  const [karachiTime, setKarachiTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to Karachi time specifically
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setKarachiTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim() || !projectMessage.trim()) {
      setErrorMessage('Please completely fill out name, email, and description fields.');
      return;
    }

    setErrorMessage('');
    setIsSending(true);

    // Simulate Google Apps Script / EmailJS / Contact API intake endpoint processing
    setTimeout(() => {
      setIsSending(false);
      setSendingDone(true);
      
      // Clear inputs
      setUserName('');
      setUserEmail('');
      setCompanyProject('');
      setProjectMessage('');
    }, 1800);
  };

  return (
    <section id="contact" className="contact py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-sans tracking-tight">
            Secure <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-500 bg-clip-text text-transparent font-extrabold font-sans">Connection</span>
          </h2>
          <div className="w-12 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>
          <p className="text-slate-400 mt-4 text-md">
            Transmit custom specs, contract briefs, or standard greetings securely to Karachi central repository.
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Left panel coordinates info lists */}
          <div className="col-span-1 lg:col-span-5 space-y-6 text-left">
            <div className="p-6 sm:p-8 bg-slate-900/40 border border-slate-900 rounded-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full filter blur-[30px]"></div>

              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">HQ Core Coordinates</span>
                <h3 className="text-xl font-bold text-white tracking-tight">Let's build something exceptional together</h3>
              </div>

              {/* Status block with live running clocks */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500">Local Karachi Time:</span>
                  <span className="text-cyan-400 font-bold">{karachiTime || 'Loading...'} PKT</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500">Weekly Availability:</span>
                  <span className="text-emerald-400 font-bold">Open for Assignments</span>
                </div>
              </div>

              {/* Coordinates block lines */}
              <div className="space-y-4">
                {/* Email line */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 flex items-center justify-center text-sm flex-shrink-0">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Transmit Enquiries</span>
                    <a href="mailto:RazaAsif7997@gmail.com" className="text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors">RazaAsif7997@gmail.com</a>
                  </div>
                </div>

                {/* Phone line */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 flex items-center justify-center text-sm flex-shrink-0">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Direct Hotline</span>
                    <a href="tel:+923102388463" className="text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors">+92 310 2388463</a>
                  </div>
                </div>

                {/* Location line */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 flex items-center justify-center text-sm flex-shrink-0">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Geographic Center</span>
                    <span className="text-sm font-semibold text-slate-300 block">Karachi, Pakistan</span>
                  </div>
                </div>
              </div>

              {/* Social Channels profiles */}
              <div className="pt-6 border-t border-slate-900/60 flex gap-2">
                <a 
                  href="https://github.com/officework9089-cpu" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/35 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a 
                  href="https://www.linkedin.com/in/razaasif/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/35 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/35 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </div>

            </div>
          </div>

          {/* Right panel Contact Form Inputs */}
          <div className="col-span-1 lg:col-span-7">
            <div className="p-6 sm:p-8 bg-slate-900/40 border border-slate-900 rounded-2xl relative text-left">
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                {/* Visual success alert banner */}
                {sendingDone && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-550/30 text-emerald-400 rounded-xl text-xs space-y-1 animate-pulse">
                    <p className="font-bold flex items-center gap-1.5"><i className="fas fa-check-circle"></i> Pipeline connection established!</p>
                    <p>Transmit success! Thank you. Asif Raza will review your specifications and contact you shortly.</p>
                    <button 
                      type="button" 
                      onClick={() => setSendingDone(false)} 
                      className="text-[10px] font-mono text-slate-400 hover:text-white block mt-2 underline"
                    >
                      Send another message
                    </button>
                  </div>
                )}

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-semibold">
                    <i className="fas fa-triangle-exclamation mr-1.5"></i> {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Your Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Jenkins Alvi" 
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-cyan-500 transition-colors"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      disabled={isSending || sendingDone}
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Your Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. client@brand.com" 
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-cyan-500 transition-colors"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      disabled={isSending || sendingDone}
                    />
                  </div>
                </div>

                {/* Company / Inquiry details */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Subject / Product Intent (Optional)</label>
                  <input 
                    id="companyProject"
                    type="text" 
                    placeholder="e.g. Autoboli Upgrade / General Inquiry" 
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-cyan-500 transition-colors"
                    value={companyProject}
                    onChange={(e) => setCompanyProject(e.target.value)}
                    disabled={isSending || sendingDone}
                  />
                </div>

                {/* Form Message */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Specification Description / Message *</label>
                  <textarea 
                    id="projectMessage"
                    required
                    rows={5}
                    placeholder="What digital solution, enterprise flow or custom system audit are we collaborating on today?" 
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-cyan-500 transition-colors resize-none"
                    value={projectMessage}
                    onChange={(e) => setProjectMessage(e.target.value)}
                    disabled={isSending || sendingDone}
                  />
                </div>

                {/* Action deliver triggers */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:opacity-95 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 transition-transform active:scale-[0.98]"
                  disabled={isSending || sendingDone}
                >
                  {isSending ? (
                    <>
                      <i className="fas fa-circle-notch animate-spin"></i> Establishing Stream Connection...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i> Deliver Specifications Securely
                    </>
                  )}
                </button>

                {/* Instant WhatsApp alternative integration */}
                <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-900/60 mt-4 text-xs">
                  <span className="text-slate-400 font-mono text-[11px] text-center sm:text-left">Need an immediate quote or call?</span>
                  <a
                    href="https://wa.me/923102388463?text=Hi%20Asif,%20I%20just%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-4.5 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl inline-flex items-center justify-center gap-1.5 shadow-lg shadow-[#25D366]/10 transition-transform active:scale-[0.97]"
                  >
                    <i className="fab fa-whatsapp text-sm"></i> Connect on WhatsApp
                  </a>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
