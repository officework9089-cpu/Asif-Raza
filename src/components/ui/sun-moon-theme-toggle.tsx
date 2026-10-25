
import * as React from "react";

interface SunMoonThemeToggleProps {
  isDark?: boolean;
  onToggle?: () => void;
  size?: number;
  duration?: number;
  sky?: boolean;
}

export const SunMoonThemeToggle = React.forwardRef<
  HTMLButtonElement,
  SunMoonThemeToggleProps
>(function SunMoonThemeToggle(
  {
    isDark = true,
    onToggle,
    size = 46,
    duration = 700,
    sky = true,
  },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={`
        group relative isolate flex shrink-0 items-center justify-center
        overflow-hidden rounded-2xl border
        transition-all ease-in-out active:scale-95
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-cyan-400 focus-visible:ring-offset-2
        ${
          isDark
            ? "border-slate-700 bg-gradient-to-br from-slate-800 via-slate-900 to-black"
            : "border-indigo-200 bg-gradient-to-br from-white via-indigo-50 to-sky-100"
        }
      `}
      style={{
        width: size,
        height: size,
        transitionDuration: `${duration}ms`,
        // boxShadow: isDark
        //   ? "0 4px 0 #020617, 0 7px 18px rgba(0,0,0,.3)"
        //   : "0 4px 0 #c7d2fe, 0 7px 18px rgba(99,102,241,.16)",
      }}
    >
      {/* Atmospheric background */}
      <span
        aria-hidden="true"
        className={`
          absolute inset-0 transition-opacity
          ${isDark ? "bg-indigo-500/10" : "bg-sky-300/30"}
        `}
        style={{ transitionDuration: `${duration}ms` }}
      />

      {sky && (
        <span
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-500 ${
            isDark ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* <span className="absolute left-[20%] top-[20%] h-1 w-1 rounded-full bg-white shadow-[0_0_5px_white]" /> */}
          {/* <span className="absolute right-[22%] top-[32%] h-0.5 w-0.5 rounded-full bg-cyan-200" /> */}
          {/* <span className="absolute bottom-[27%] left-[30%] h-0.5 w-0.5 rounded-full bg-white" /> */}
        </span>
      )}

      {/* 3D sun */}
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className={`absolute h-[72%] w-[72%] overflow-visible transition-all ease-in-out ${
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
        style={{
          transitionDuration: `${duration}ms`,
          filter: "drop-shadow(0 3px 2px rgba(0,0,0,.35))",
        }}
      >
        <defs>
          <radialGradient id="themeSunGradient" cx="30%" cy="25%" r="75%">
            <stop offset="0%" stopColor="#FFF7AD" />
            <stop offset="45%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#EA580C" />
          </radialGradient>
        </defs>

        <g
          stroke="#FBBF24"
          strokeWidth="2.8"
          strokeLinecap="round"
        >
          <path d="M24 3.5v5" />
          <path d="M24 39.5v5" />
          <path d="M3.5 24h5" />
          <path d="M39.5 24h5" />
          <path d="m9.5 9.5 3.6 3.6" />
          <path d="m34.9 34.9 3.6 3.6" />
          <path d="m38.5 9.5-3.6 3.6" />
          <path d="m13.1 34.9-3.6 3.6" />
        </g>

        <circle
          cx="24"
          cy="24"
          r="12.5"
          fill="url(#themeSunGradient)"
          stroke="#FDE68A"
          strokeWidth="1"
        />
        <ellipse
          cx="20"
          cy="17.5"
          rx="5.5"
          ry="3"
          fill="#FFFFFF"
          opacity=".4"
          transform="rotate(-30 20 17.5)"
        />
      </svg>

      {/* 3D crescent moon */}
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className={`absolute h-[72%] w-[72%] overflow-visible transition-all ease-in-out ${
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
        style={{
          transitionDuration: `${duration}ms`,
          filter: "drop-shadow(0 3px 2px rgba(49,46,129,.3))",
        }}
      >
        <defs>
          <linearGradient id="themeMoonGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#C7D2FE" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
        </defs>

        <path
          d="M34 31.5A17 17 0 0 1 16.5 5.8 17.5 17.5 0 1 0 40 27.8a16 16 0 0 1-6 3.7Z"
          fill="url(#themeMoonGradient)"
          stroke="#A5B4FC"
          strokeWidth=".8"
        />

        <ellipse
          cx="15.5"
          cy="28"
          rx="3"
          ry="5"
          fill="#6366F1"
          opacity=".18"
          transform="rotate(-35 15.5 28)"
        />
        <circle cx="13" cy="19" r="1.3" fill="#FFFFFF" opacity=".9" />
      </svg>

      {/* Glass highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[18%] top-[7%] h-[22%] w-[45%] -rotate-45 rounded-full bg-white/20 blur-[2px]"
      />
    </button>
  );
});

SunMoonThemeToggle.displayName = "SunMoonThemeToggle";
