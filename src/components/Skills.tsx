import { useEffect, useState } from 'react';
import { supabase } from "@//admin/lib/supabase";

type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'ai'
  | 'tools';

interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
  rating: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
  created_at?: string;
}

const CATEGORY_CONFIG: { id: SkillCategory; label: string; icon: string }[] = [
  { id: 'frontend', label: 'Frontend Technologies', icon: 'fa-code' },
  { id: 'backend', label: 'Backend Engineering', icon: 'fa-server' },
  { id: 'database', label: 'Databases & Architecture', icon: 'fa-database' },
  { id: 'ai', label: 'AI & Data Science', icon: 'fa-brain' },
  { id: 'tools', label: 'DevOps & Tooling', icon: 'fa-wrench' },
];

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('skills')
        .select('id, name, category, level, rating, created_at')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Failed to load skills:', error);
        setError(error.message);
        return;
      }

      setSkills((data || []) as Skill[]);
    } catch (err) {
      console.error('Unexpected error loading skills:', err);
      setError('Failed to load skills.');
    } finally {
      setLoading(false);
    }
  };

  // Group skills by category
  const skillsByCategory = CATEGORY_CONFIG.reduce((acc, cat) => {
    acc[cat.id] = skills.filter((s) => s.category === cat.id);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  return (
    <section
      id="skills"
      className="skills py-12 sm:py-20 lg:py-24 relative overflow-hidden bg-slate-950"
    >
      {/* Dynamic Keyframes for Marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 35s linear infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-16">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Technical{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent font-extrabold">
              Weaponry
            </span>
          </h2>

          <div className="w-10 sm:w-12 h-1 bg-cyan-400 mx-auto mt-2.5 sm:mt-4 rounded"></div>

          <p className="text-slate-400 mt-2.5 sm:mt-4 text-xs sm:text-base leading-relaxed">
            Proficiency ratings across full-stack languages, core database
            architectures, framework ecosystems, and data analysis pipelines.
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="flex items-center gap-3 text-cyan-400">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs sm:text-sm font-mono">Loading technical stack...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="max-w-xl mx-auto py-8 text-center px-4">
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-xs sm:text-sm font-medium">Failed to load skills.</p>
            <p className="text-red-400/70 text-[11px] sm:text-xs mt-1">{error}</p>
            <button
              onClick={fetchSkills}
              className="mt-3 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs hover:bg-red-500/20 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Skill Rows */}
      {!loading && !error && (
        <div className="space-y-10 sm:space-y-14">
          {CATEGORY_CONFIG.map((category, catIdx) => {
            const categorySkills = skillsByCategory[category.id] || [];
            if (categorySkills.length === 0) return null;

            // Duplicate array to guarantee smooth 100% infinite scroll seamless connection
            const duplicatedSkills = [...categorySkills, ...categorySkills, ...categorySkills];
            const isEven = catIdx % 2 === 0;

            return (
              <div key={category.id} className="space-y-3 sm:space-y-4">
                {/* Row Header */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 text-xs">
                    <i className={`fas ${category.icon}`} aria-hidden="true"></i>
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-slate-200 font-mono tracking-tight">
                    {category.label}
                  </h3>
                  <span className="text-xs font-mono text-slate-500 ml-auto">
                    {categorySkills.length} items
                  </span>
                </div>

                {/* Auto Scrollable Row Container */}
                <div className="relative w-full overflow-hidden group py-2">
                  {/* Left & Right Gradient Mask Overlays */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

                  {/* Marquee Track */}
                  <div
                    className={`flex gap-3 sm:gap-5 w-max ${
                      isEven ? 'animate-marquee' : 'animate-marquee-reverse'
                    } group-hover:[animation-play-state:paused]`}
                  >
                    {duplicatedSkills.map((skill, index) => {
                      const ratingColor =
                        skill.rating === 'Expert'
                          ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                          : skill.rating === 'Advanced'
                          ? 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20'
                          : skill.rating === 'Intermediate'
                          ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
                          : 'text-red-400 bg-red-400/10 border-red-400/20';

                      return (
                        <div
                          key={`${skill.id}-${index}`}
                          className="w-56 sm:w-64 shrink-0 p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between shadow-lg shadow-black/20"
                        >
                          <div className="space-y-3">
                            {/* Card Header */}
                            <div className="flex justify-between items-center gap-2">
                              <div className="flex items-center gap-2 truncate">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                                <span className="font-bold text-white text-xs sm:text-sm tracking-tight truncate">
                                  {skill.name}
                                </span>
                              </div>

                              <span
                                className={`shrink-0 text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider uppercase px-2 py-0.5 rounded border ${ratingColor}`}
                              >
                                {skill.rating}
                              </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] sm:text-xs text-slate-400 font-mono">
                                <span className="text-slate-500">proficiency</span>
                                <span className="font-bold text-slate-300">
                                  {skill.level}%
                                </span>
                              </div>

                              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900/80 p-px">
                                <div
                                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full shadow-sm shadow-cyan-400/30 transition-all duration-500"
                                  style={{
                                    width: `${Math.min(Math.max(skill.level, 0), 100)}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}