import { useEffect, useState } from 'react';
import { supabase } from "@//admin/lib/supabase";

type SkillCategory =
  | 'all'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'ai'
  | 'tools';

interface Skill {
  id: string;
  name: string;
  category: Exclude<SkillCategory, 'all'>;
  level: number;
  rating: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
  created_at?: string;
}

export default function Skills() {
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategory>('all');

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { value: 'all', label: 'All Technologies' },
    { value: 'frontend', label: 'Frontend UI/UX' },
    { value: 'backend', label: 'Backend Frameworks' },
    { value: 'database', label: 'Databases Schema' },
    { value: 'ai', label: 'AI & Data Science' },
    { value: 'tools', label: 'Platforms & Tools' },
  ];

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

  const filteredSkills = skills.filter((skill) =>
    selectedCategory === 'all'
      ? true
      : skill.category === selectedCategory
  );

  return (
    <section
      id="skills"
      className="skills py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-sans tracking-tight">
            Technical{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent font-extrabold">
              Weaponry
            </span>
          </h2>

          <div className="w-12 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>

          <p className="text-slate-400 mt-4 text-md">
            Proficiency ratings across full-stack languages, core database
            architectures, framework ecosystems, and data analysis pipelines.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() =>
                setSelectedCategory(c.value as SkillCategory)
              }
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                selectedCategory === c.value
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 border-transparent text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="flex items-center gap-3 text-cyan-400">
              <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-mono">
                Loading skills...
              </span>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="max-w-xl mx-auto py-10 text-center">
            <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm">
                Failed to load skills.
              </p>

              <p className="text-red-400/70 text-xs mt-2">
                {error}
              </p>

              <button
                onClick={fetchSkills}
                className="mt-4 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm hover:bg-red-500/20 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Skills Grid */}
        {!loading && !error && (
          <>
            {filteredSkills.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-slate-500 text-sm font-mono">
                  No skills found in this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
                {filteredSkills.map((skill) => {

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
                      key={skill.id}
                      className="p-5 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 transition-all duration-300 group hover:translate-y-[-2px] flex flex-col justify-between"
                    >
                      <div className="space-y-4">

                        {/* Skill Header */}
                        <div className="flex justify-between items-start gap-4">
                          <span className="font-bold text-white text-md tracking-tight group-hover:text-cyan-300 transition-colors duration-200">
                            {skill.name}
                          </span>

                          <span
                            className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded border ${ratingColor}`}
                          >
                            {skill.rating}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="space-y-1.5 pt-2">
                          <div className="flex justify-between text-xs text-slate-500 font-mono">
                            <span>proficiency</span>

                            <span className="font-bold text-slate-300">
                              {skill.level}%
                            </span>
                          </div>

                          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900 p-[1px]">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 rounded-full shadow-lg shadow-cyan-400/40"
                              style={{
                                width: `${Math.min(
                                  Math.max(skill.level, 0),
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Other Competence Areas */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-4">
            Other Competence Areas
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {[
              'Linux CLI',
              'RESTful APIs',
              'JSON Restructures',
              'Postman Testing',
              'Git Flow',
              'MVC Design Pattern',
              'Stripe Systems',
              'AJAX',
              'SMTP Mailers',
              'Composer Packagist',
              'Pip Package Manager',
              'Eloquent ORM',
              'Relational Constraints',
            ].map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-slate-900/40 border border-slate-900 text-slate-400 text-xs rounded-lg font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}