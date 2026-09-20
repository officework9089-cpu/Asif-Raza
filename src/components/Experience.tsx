import { useEffect, useState } from 'react';
import { supabase } from '@//admin/lib/supabase';

interface ExperienceBlock {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string[];
  skills: string[];
  created_at?: string;
}

interface Accomplishment {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  created_at?: string;
}

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceBlock[]>([]);
  const [accomplishments, setAccomplishments] = useState<Accomplishment[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExperienceData();
  }, []);

  const fetchExperienceData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [experienceResult, accomplishmentResult] =
        await Promise.all([
          supabase
            .from('experiences')
            .select(
              'id, period, role, company, location, description, skills, created_at'
            )
            .order('created_at', { ascending: false }),

          supabase
            .from('accomplishments')
            .select('id, number, title, subtitle, created_at')
            .order('created_at', { ascending: true }),
        ]);

      if (experienceResult.error) {
        console.error(
          'Failed to load experiences:',
          experienceResult.error
        );

        setError(experienceResult.error.message);
        return;
      }

      if (accomplishmentResult.error) {
        console.error(
          'Failed to load accomplishments:',
          accomplishmentResult.error
        );

        setError(accomplishmentResult.error.message);
        return;
      }

      setExperiences(experienceResult.data || []);
      setAccomplishments(accomplishmentResult.data || []);
    } catch (err) {
      console.error('Unexpected error loading experience:', err);
      setError('Failed to load experience data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="experience"
      className="experience py-24 bg-slate-950/40 relative"
    >
      <div className="container mx-auto px-4">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-sans tracking-tight">
            Professional{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent font-extrabold">
              Chronicle
            </span>
          </h2>

          <div className="w-12 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>

          <p className="text-slate-400 mt-4 text-md">
            Milestones of professional assignments, major system operations,
            hackathons, and software deliverables.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex items-center gap-3 text-cyan-400">
              <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

              <span className="text-sm font-mono">
                Loading experience...
              </span>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="max-w-xl mx-auto py-10 text-center">
            <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm">
                Failed to load experience data.
              </p>

              <p className="text-red-400/70 text-xs mt-2">
                {error}
              </p>

              <button
                onClick={fetchExperienceData}
                className="mt-4 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm hover:bg-red-500/20 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!loading && !error && (
          <>
            {/* Timeline */}
            <div className="max-w-4xl mx-auto space-y-12 text-left relative">

              {/* Vertical central spine */}
              <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-slate-900"></div>

              {experiences.map((exp, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={exp.id}
                    className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start ${
                      isEven
                        ? 'md:flex-row'
                        : 'md:flex-row-reverse'
                    }`}
                  >

                    {/* Central node */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-[7px] md:-translate-x-1.5 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-slate-950 z-10 shadow-lg shadow-cyan-400/40"></div>

                    {/* Date / Location */}
                    <div className="w-full md:w-1/2 pl-10 md:pl-0 md:text-right hidden md:block">
                      <div className="sticky top-24 pr-4">
                        <span className="text-sm font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                          {exp.period}
                        </span>

                        <h4 className="text-md font-bold text-slate-500 mt-2">
                          {exp.location}
                        </h4>
                      </div>
                    </div>

                    {/* Experience Card */}
                    <div className="w-full md:w-1/2 pl-10 md:pl-0">
                      <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl hover:border-slate-800/80 transition-all duration-300 space-y-4">

                        {/* Header */}
                        <div>
                          {/* Mobile date */}
                          <span className="inline-block md:hidden text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded mb-2 border border-cyan-500/25">
                            {exp.period}
                          </span>

                          <h3 className="text-lg font-bold text-white tracking-tight">
                            {exp.role}
                          </h3>

                          <p className="text-sm text-slate-400 font-semibold mt-0.5">
                            {exp.company}
                          </p>

                          <p className="text-xs text-slate-500 mt-1 md:hidden">
                            {exp.location}
                          </p>
                        </div>

                        {/* Description */}
                        <ul className="space-y-2.5">
                          {exp.description.map((bullet, index) => (
                            <li
                              key={index}
                              className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-400 leading-relaxed"
                            >
                              <i className="fas fa-angles-right text-cyan-500 text-[10px] mt-1 flex-shrink-0"></i>

                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {exp.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-400 text-xs font-mono rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Accomplishments */}
            {accomplishments.length > 0 && (
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left">
                {accomplishments.map((acc) => (
                  <div
                    key={acc.id}
                    className="p-6 bg-slate-900/20 border border-slate-900 rounded-2xl flex flex-col justify-between"
                  >
                    <div className="text-4xl font-extrabold text-white font-mono tracking-tight bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
                      {acc.number}
                    </div>

                    <h4 className="text-md font-bold text-white mt-3">
                      {acc.title}
                    </h4>

                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {acc.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}