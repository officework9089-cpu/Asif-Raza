import { useEffect, useState } from 'react';
import logo from '../assets/images/logo.jpg';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      setShowScroll(window.scrollY > 400);
    };

    window.addEventListener('scroll', checkScrollTop, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
      href: 'https://github.com/Asif7997',
      icon: 'fab fa-github',
      hoverColor:
        'hover:bg-slate-800 hover:text-white hover:border-slate-500 hover:shadow-[0_0_25px_rgba(255,255,255,0.16)]',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/asifraza7997',
      icon: 'fab fa-linkedin-in',
      hoverColor:
        'hover:bg-blue-600 hover:text-white hover:border-blue-400 hover:shadow-[0_0_25px_rgba(37,99,235,0.45)]',
    },
    {
      name: 'Email',
      href: 'mailto:razaasif7997@gmail.com',
      icon: 'fas fa-envelope',
      hoverColor:
        'hover:bg-indigo-600 hover:text-white hover:border-indigo-400 hover:shadow-[0_0_25px_rgba(99,102,241,0.45)]',
    },
  ];

  return (
    <footer
      id="footer"
      className="
        relative
        overflow-hidden
        bg-slate-950
        
        border-slate-900
        pt-16
        sm:pt-20
        pb-8
      "
    >
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================= */}

      {/* Main bottom glow */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-[-120px]
          left-1/2
          -translate-x-1/2
          w-[320px]
          sm:w-[600px]
          lg:w-[850px]
          h-[260px]
          rounded-full
          bg-gradient-to-r
          from-cyan-500/10
          via-indigo-500/10
          to-purple-500/10
          blur-3xl
        "
      />

      {/* Cyan orb */}
      <div
        className="
          pointer-events-none
          absolute
          top-0
          right-[-80px]
          w-64
          h-64
          rounded-full
          bg-cyan-500/5
          blur-3xl
        "
      />

      {/* Purple orb */}
      {/* <div
        className="
          pointer-events-none
          absolute
          bottom-20
          left-[-100px]
          w-72
          h-72
          rounded-full
          bg-purple-500/5
          blur-3xl
        "
      /> */}

      {/* Futuristic grid */}
      {/* <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          bg-[linear-gradient(rgba(34,211,238,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.8)_1px,transparent_1px)]
          bg-[size:45px_45px]
        "
      /> */}

      {/* Top scan line */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================================================
            FOOTER HEADER / SYSTEM STATUS
        ========================================================= */}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
            </span>

            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-cyan-400">
              System Online
            </span>
          </div>

        </div>

        {/* =========================================================
            MAIN FOOTER GRID
        ========================================================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-12
            gap-10
            lg:gap-12
            pb-12
            border-b
            border-slate-900
          "
        >

          {/* =======================================================
              BRAND
          ======================================================= */}

          <div className="lg:col-span-5">
            <button
              onClick={() => onNavigate('home')}
              className="
                group
                inline-flex
                items-center
                gap-3
                focus:outline-none
                touch-manipulation
              "
            >
              {/* Logo */}
              <div className="relative">
                <div
                  className="
                    absolute
                    -inset-1
                    rounded-xl
                    bg-linear-to-r
                    from-cyan-500
                    via-indigo-500
                    to-purple-500
                    opacity-40
                    blur-md
                    group-hover:opacity-80
                    transition-all
                    duration-500
                  "
                />

                <div
                  className="
                    relative
                    w-10
                    h-10
                    rounded-xl
                    bg-slate-950
                    border
                    border-slate-800
                    group-hover:border-cyan-500/50
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                    transition-all
                    duration-300
                  "
                >
                  {/* Logo scan */}
                  <div
                    className="
                      absolute
                      inset-x-0
                      top-0
                      h-px
                      bg-cyan-400/70
                      opacity-60
                    "
                  />
                  <img src={logo} alt="Asif Raza Logo" className="w-full h-full object-cover" />

                </div>
              </div>

              <div className="text-left">
                <span
                  className="
                    block
                    text-lg
                    sm:text-xl
                    font-black
                    tracking-tight
                    text-white
                    group-hover:text-cyan-400
                    transition-colors
                    duration-300
                  "
                >
                  Asif Raza
                </span>

                <span className="block text-[9px] font-mono uppercase tracking-[0.2em] text-slate-600 group-hover:text-slate-500">
                  Full-Stack Architect
                </span>
              </div>
            </button>

            <p className="mt-5 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Senior Full-Stack Architect delivering scalable, high-performance
              web applications, robust database systems, and modern visual UI
              ecosystems.
            </p>

            {/* Availability */}
            <div
              className="
                mt-5
                inline-flex
                items-center
                gap-2.5
                px-3.5
                py-2
                rounded-xl
                bg-emerald-500/5
                border
                border-emerald-500/20
                text-emerald-400
              "
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span className="text-[10px] sm:text-[11px] font-mono font-semibold">
                Available for freelance & full-time roles
              </span>
            </div>

            
          </div>

          {/* =======================================================
              NAVIGATION
          ======================================================= */}

          <div className="lg:col-span-4">
            {/* <div className="flex items-center gap-2 mb-5">
              <span className="text-[10px] font-mono text-cyan-400">
                01.
              </span>

              <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-slate-300">
                Quick Navigation
              </p>
            </div> */}

            <div className="grid grid-cols-2 gap-x-5 gap-y-1">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="
                    group
                    relative
                    flex
                    items-center
                    gap-2
                    py-2
                    text-left
                    text-xs
                    font-semibold
                    text-slate-500
                    hover:text-cyan-400
                    transition-all
                    duration-300
                    touch-manipulation
                  "
                >
                  <span
                    className="
                      w-1
                      h-1
                      rounded-full
                      bg-slate-700
                      group-hover:bg-cyan-400
                      group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)]
                      group-hover:scale-125
                      transition-all
                    "
                  />

                  <span>{item.label}</span>

                  <i
                    className="
                      fas
                      fa-arrow-right
                      text-[8px]
                      opacity-0
                      -translate-x-2
                      group-hover:opacity-100
                      group-hover:translate-x-0
                      transition-all
                    "
                  />
                </button>
              ))}
            </div>
          </div>

          {/* =======================================================
              DEVELOPER HUB
          ======================================================= */}

          <div className="lg:col-span-3">
            {/* <div className="flex items-center gap-2 mb-5">
              <span className="text-[10px] font-mono text-indigo-400">
                02.
              </span>

              <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-slate-300">
                Developer Hub
              </p>
            </div> */}

            {/* Social buttons */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.name === 'Email' ? undefined : '_blank'}
                  rel={social.name === 'Email' ? undefined : 'noreferrer'}
                  aria-label={social.name}
                  title={social.name}
                  className={`
                    group
                    relative
                    w-11
                    h-11
                    rounded-xl
                    bg-slate-950
                    border
                    border-slate-800
                    text-slate-500
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    ${social.hoverColor}
                  `}
                >
                  <span
                    className="
                      absolute
                      inset-0
                      rounded-xl
                      bg-white/5
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                    "
                  />

                  <i
                    className={`
                      ${social.icon}
                      relative
                      text-sm
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    `}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div
              className="
                mt-5
                rounded-xl
                border
                border-slate-900
                bg-slate-900/20
                p-3.5
              "
            >
              <span className="block text-[9px] uppercase tracking-[0.2em] font-mono text-slate-600">
                Direct Contact
              </span>

              <a
                href="tel:+923102388463"
                className="
                  mt-1.5
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-mono
                  text-cyan-400
                  hover:text-cyan-300
                  transition-colors
                "
              >
                <i className="fas fa-phone text-[9px]" />
                +92 310 23 88 463
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================
            TELEMETRY BAR
        ========================================================= */}

        <div
          className="
            mt-6
            rounded-xl
            border
            border-slate-900
            bg-slate-900/20
            px-4
            py-3
            overflow-hidden
          "
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
             <p className="text-[10px] sm:text-xs text-slate-600 font-mono">
            © {new Date().getFullYear()}{' '}
            <span className="text-cyan-400">Asif Raza</span>
            <span className="mx-2 text-slate-800">/</span>
            All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-mono text-slate-600">
            <span>
              Built with{' '}
              <span className="text-slate-400">
                React Js
              </span>
            </span>

            <span className="text-slate-800">•</span>

            <span>
              <span className="text-slate-400">
                node js
              </span>
            </span>
            <span className="text-slate-800">•</span>

            <span>
              <span className="text-slate-400">
                Tailwind CSS
              </span>
            </span>

            <span className="text-slate-800">•</span>

            <span className="text-cyan-400">
              v2.4.0
            </span>
          </div>
        
            
          </div>
        </div>

        {/* =========================================================
            BOTTOM COPYRIGHT
        ========================================================= */}

        
      </div>

      {/* ===========================================================
          FLOATING BACK TO TOP
      =========================================================== */}

      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        title="Back to top"
        className={`
          fixed
          bottom-2
          right-5
          sm:bottom-2
          sm:right-7
          z-40
          w-11
          h-11
          sm:w-12
          sm:h-12
          rounded-xl
          bg-slate-900/90
          border
          border-slate-800
          text-cyan-400
          flex
          items-center
          justify-center
          backdrop-blur-xl
          shadow-2xl
          transition-all
          duration-500
          touch-manipulation
          group
          ${
            showScroll
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }
        `}
      >
        {/* Glow */}
        <span
          className="
            absolute
            -inset-px
            rounded-xl
            bg-gradient-to-r
            from-cyan-500/20
            to-indigo-500/20
            opacity-0
            group-hover:opacity-100
            transition-opacity
          "
        />

        {/* Inner highlight */}
        <span
          className="
            absolute
            inset-0
            rounded-xl
            bg-cyan-500/5
            group-hover:bg-cyan-500/10
            transition-colors
          "
        />

        <i
          className="
            fas
            fa-arrow-up
            relative
            z-10
            text-sm
            group-hover:-translate-y-1
            transition-transform
            duration-300
          "
        />
      </button>
    </footer>
  );
}