import { useEffect, useState, useRef } from 'react';
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
  const [accomplishments, setAccomplishments] = useState<Accomplishment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const isClickScrolling = useRef(false);

  useEffect(() => {
    fetchExperienceData();
  }, []);

  /*
  ============================================================
  SCROLL-BASED SINGLE CARD CONTROLLER
  ============================================================
  */

  useEffect(() => {
    if (loading || experiences.length === 0) return;

    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const scrollArea = scrollAreaRef.current;

      if (!scrollArea) return;

      const rect = scrollArea.getBoundingClientRect();

      /*
       * The sticky card occupies one viewport.
       *
       * scrollArea height is:
       * experiences.length * viewport height
       *
       * We calculate which "page" of the scroll track
       * the user is currently viewing.
       */

      const viewportHeight = window.innerHeight;

      const scrollDistance = Math.max(
        0,
        Math.min(
          experiences.length * viewportHeight - viewportHeight,
          -rect.top
        )
      );

      const progress =
        experiences.length > 1
          ? scrollDistance /
            ((experiences.length - 1) * viewportHeight)
          : 0;

      const index = Math.min(
        experiences.length - 1,
        Math.max(
          0,
          Math.round(progress * (experiences.length - 1))
        )
      );

      setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    window.addEventListener('resize', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [loading, experiences]);

  /*
  ============================================================
  FETCH DATA
  ============================================================
  */

  const fetchExperienceData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        experienceResult,
        accomplishmentResult,
      ] = await Promise.all([
        supabase
          .from('experiences')
          .select(
            'id, period, role, company, location, description, skills, created_at'
          )
          .order('created_at', {
            ascending: false,
          }),

        supabase
          .from('accomplishments')
          .select(
            'id, number, title, subtitle, created_at'
          )
          .order('created_at', {
            ascending: true,
          }),
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

      setExperiences(
        experienceResult.data || []
      );

      setAccomplishments(
        accomplishmentResult.data || []
      );
    } catch (err) {
      console.error(
        'Unexpected error loading experience:',
        err
      );

      setError(
        'Failed to load experience data.'
      );
    } finally {
      setLoading(false);
    }
  };

  const activeExp = experiences[activeIndex];

  /*
  ============================================================
  GO TO EXPERIENCE
  ============================================================
  */

  const goToExperience = (index: number) => {
    const scrollArea = scrollAreaRef.current;

    if (!scrollArea || experiences.length <= 1) {
      setActiveIndex(index);
      return;
    }

    const rect =
      scrollArea.getBoundingClientRect();

    const currentScroll =
      window.scrollY;

    const areaTop =
      currentScroll + rect.top;

    const viewportHeight =
      window.innerHeight;

    const targetScroll =
      areaTop +
      index * viewportHeight;

    isClickScrolling.current = true;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });

    setActiveIndex(index);

    /*
     * Re-enable normal scroll detection after
     * smooth scrolling has finished.
     */
    window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  };

  return (
    <section
      id="experience"
      className="experience relative bg-slate-950/40"
    >
      <style>{`
        @keyframes experienceCardEnter {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.985);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .experience-card-content {
          animation: experienceCardEnter 0.45s
            cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .experience-dot {
          transition:
            background-color 300ms ease,
            border-color 300ms ease,
            transform 300ms ease,
            box-shadow 300ms ease;
        }

        .experience-timeline-line {
          background: linear-gradient(
            to bottom,
            rgba(30, 41, 59, 0.2),
            rgba(30, 41, 59, 1),
            rgba(30, 41, 59, 0.2)
          );
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ====================================================
            SECTION HEADING
        ==================================================== */}

        <div className="text-center max-w-3xl mx-auto pt-20 pb-12 sm:pb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-sans tracking-tight">
            Professional{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent font-extrabold">
              Chronicle
            </span>
          </h2>

          <div className="w-12 h-1 bg-cyan-400 mx-auto mt-4 rounded" />

          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            Milestones of professional assignments,
            major system operations, hackathons,
            and software deliverables.
          </p>
        </div>

        {/* ====================================================
            LOADING
        ==================================================== */}

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex items-center gap-3 text-cyan-400">
              <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />

              <span className="text-sm font-mono">
                Loading experience...
              </span>
            </div>
          </div>
        )}

        {/* ====================================================
            ERROR
        ==================================================== */}

        {!loading && error && (
          <div className="max-w-xl mx-auto pb-20 text-center">
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

        {/* ====================================================
            EXPERIENCE SCROLL AREA
        ==================================================== */}

        {!loading &&
          !error &&
          experiences.length > 0 && (
            <div
              ref={scrollAreaRef}
              className="relative"
              style={{
                height: `${experiences.length * 100}vh`,
              }}
            >

              {/* =================================================
                  STICKY VIEWPORT

                  ONLY ONE CARD EXISTS HERE.
              ================================================= */}

              <div
                className="
                  sticky
                  top-0
                  h-screen
                  flex
                  items-center
                  py-8
                "
              >

                <div className="w-full max-w-5xl mx-auto">

                  <div
                    className="
                      grid
                      grid-cols-1
                      md:grid-cols-12
                      gap-6
                      sm:gap-8
                      items-center
                    "
                  >

                    {/* ==========================================
                        LEFT TIMELINE
                    ========================================== */}

                    <div
                      className="
                        md:col-span-4
                        bg-slate-900/80
                        border
                        border-slate-800/90
                        p-5
                        sm:p-6
                        rounded-2xl
                        backdrop-blur-md
                        shadow-xl
                      "
                    >

                      <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-5 font-semibold">
                        Timeline Navigation
                      </div>

                      <div className="text-xs text-slate-500 font-mono mb-5">
                        {activeIndex + 1} / {experiences.length}
                      </div>

                      <div className="relative pl-6">

                        {/* Timeline vertical line */}
                        <div
                          className="
                            experience-timeline-line
                            absolute
                            left-[5px]
                            top-2
                            bottom-2
                            w-[2px]
                          "
                        />

                        <div className="space-y-5">

                          {experiences.map(
                            (exp, idx) => {
                              const isActive =
                                idx === activeIndex;

                              return (
                                <button
                                  key={exp.id}
                                  onClick={() =>
                                    goToExperience(idx)
                                  }
                                  className="
                                    group
                                    relative
                                    w-full
                                    text-left
                                    flex
                                    items-center
                                    gap-3
                                    outline-none
                                  "
                                >

                                  {/* Dot */}
                                  <span
                                    className={`
                                      experience-dot
                                      absolute
                                      -left-[25px]
                                      w-3
                                      h-3
                                      rounded-full
                                      border-2
                                      z-10

                                      ${
                                        isActive
                                          ? `
                                            bg-cyan-400
                                            border-cyan-300
                                            scale-125
                                            shadow-lg
                                            shadow-cyan-400/50
                                          `
                                          : `
                                            bg-slate-950
                                            border-slate-700
                                            group-hover:border-slate-500
                                          `
                                      }
                                    `}
                                  />

                                  <div className="min-w-0">
                                    <p
                                      className={`
                                        text-xs
                                        font-mono
                                        transition-colors
                                        duration-300

                                        ${
                                          isActive
                                            ? 'text-cyan-400 font-bold'
                                            : 'text-slate-500'
                                        }
                                      `}
                                    >
                                      {exp.period}
                                    </p>

                                    <p
                                      className={`
                                        text-sm
                                        font-semibold
                                        truncate
                                        transition-colors
                                        duration-300

                                        ${
                                          isActive
                                            ? 'text-white'
                                            : 'text-slate-400 group-hover:text-slate-300'
                                        }
                                      `}
                                    >
                                      {exp.company}
                                    </p>
                                  </div>
                                </button>
                              );
                            }
                          )}

                        </div>
                      </div>
                    </div>

                    {/* ==========================================
                        RIGHT — ONE SINGLE EXPERIENCE CARD
                    ========================================== */}

                    <div className="md:col-span-8">

                      <div
                        className="
                          relative
                          min-h-[430px]
                          p-6
                          sm:p-8
                          bg-slate-900/90
                          border
                          border-slate-800
                          rounded-2xl
                          shadow-2xl
                          backdrop-blur-xl
                          overflow-hidden
                        "
                      >

                        {/* Decorative glow */}
                        <div
                          className="
                            pointer-events-none
                            absolute
                            -top-24
                            -right-24
                            w-48
                            h-48
                            bg-cyan-500/10
                            rounded-full
                            blur-3xl
                          "
                        />

                        {activeExp && (
                          <div
                            key={activeExp.id}
                            className="
                              experience-card-content
                              relative
                              z-10
                              space-y-6
                            "
                          >

                            {/* =================================
                                HEADER
                            ================================= */}

                            <div
                              className="
                                flex
                                flex-wrap
                                items-center
                                justify-between
                                gap-3
                                border-b
                                border-slate-800/80
                                pb-4
                              "
                            >

                              <div>

                                <span
                                  className="
                                    inline-block
                                    text-xs
                                    font-mono
                                    font-bold
                                    text-cyan-400
                                    bg-cyan-500/10
                                    px-3
                                    py-1
                                    rounded-full
                                    border
                                    border-cyan-500/20
                                    mb-2
                                  "
                                >
                                  {activeExp.period}
                                </span>

                                <h3
                                  className="
                                    text-xl
                                    sm:text-2xl
                                    font-bold
                                    text-white
                                    tracking-tight
                                  "
                                >
                                  {activeExp.role}
                                </h3>

                                <p
                                  className="
                                    text-sm
                                    sm:text-base
                                    text-slate-300
                                    font-semibold
                                    mt-0.5
                                  "
                                >
                                  {activeExp.company}
                                </p>

                              </div>

                              <span
                                className="
                                  text-xs
                                  font-mono
                                  text-slate-400
                                  bg-slate-950/80
                                  px-3
                                  py-1.5
                                  rounded-lg
                                  border
                                  border-slate-800
                                "
                              >
                                <i className="fas fa-location-dot text-cyan-400 mr-1.5" />

                                {activeExp.location}
                              </span>

                            </div>

                            {/* =================================
                                DESCRIPTION
                            ================================= */}

                            <div className="space-y-3">

                              <h4
                                className="
                                  text-xs
                                  font-mono
                                  uppercase
                                  tracking-wider
                                  text-slate-500
                                "
                              >
                                Key Responsibilities & Deliverables
                              </h4>

                              <ul className="space-y-2.5">

                                {activeExp.description.map(
                                  (bullet, index) => (
                                    <li
                                      key={index}
                                      className="
                                        flex
                                        gap-3
                                        items-start
                                        text-xs
                                        sm:text-sm
                                        text-slate-300
                                        leading-relaxed
                                      "
                                    >
                                      <i
                                        className="
                                          fas
                                          fa-angles-right
                                          text-cyan-400
                                          text-[10px]
                                          mt-1
                                          shrink-0
                                        "
                                      />

                                      <span>
                                        {bullet}
                                      </span>
                                    </li>
                                  )
                                )}

                              </ul>
                            </div>

                            {/* =================================
                                SKILLS
                            ================================= */}

                            <div>

                              <h4
                                className="
                                  text-xs
                                  font-mono
                                  uppercase
                                  tracking-wider
                                  text-slate-500
                                  mb-2.5
                                "
                              >
                                Technologies Used
                              </h4>

                              <div className="flex flex-wrap gap-2">

                                {activeExp.skills.map(
                                  (skill, index) => (
                                    <span
                                      key={index}
                                      className="
                                        px-2.5
                                        py-1
                                        bg-slate-950
                                        border
                                        border-slate-800
                                        text-cyan-300
                                        text-xs
                                        font-mono
                                        rounded-md
                                        shadow-inner
                                      "
                                    >
                                      {skill}
                                    </span>
                                  )
                                )}

                              </div>
                            </div>

                          </div>
                        )}

                        {/* =====================================
                            CARD PROGRESS
                        ===================================== */}

                        <div
                          className="
                            absolute
                            bottom-0
                            left-0
                            right-0
                            h-[2px]
                            bg-slate-800
                          "
                        >
                          <div
                            className="
                              h-full
                              bg-gradient-to-r
                              from-cyan-400
                              to-indigo-400
                              transition-all
                              duration-300
                            "
                            style={{
                              width: `${
                                experiences.length > 1
                                  ? (activeIndex /
                                      (experiences.length - 1)) *
                                    100
                                  : 100
                              }%`,
                            }}
                          />
                        </div>

                      </div>

                      {/* Scroll instruction */}
                      <div className="text-center mt-4">

                        <span className="text-[10px] sm:text-xs text-slate-600 font-mono">
                          {activeIndex <
                          experiences.length - 1
                            ? 'SCROLL TO CONTINUE'
                            : 'TIMELINE COMPLETE'}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>
              </div>
            </div>
          )}

        {/* ====================================================
            ACCOMPLISHMENTS
        ==================================================== */}

        {!loading &&
          !error &&
          accomplishments.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 text-left">

              {accomplishments.map((acc) => (
                <div
                  key={acc.id}
                  className="
                    p-4
                    bg-slate-900/40
                    border
                    border-slate-800/80
                    rounded-2xl
                    flex
                    flex-col
                    justify-between
                    hover:border-cyan-500/30
                    transition-all
                    duration-300
                  "
                >

                  <div
                    className="
                      text-4xl
                      font-extrabold
                      font-mono
                      tracking-tight
                      bg-gradient-to-r
                      from-cyan-400
                      via-teal-400
                      to-indigo-400
                      bg-clip-text
                      text-transparent
                    "
                  >
                    {acc.number}
                  </div>

                  <h4 className="text-md font-bold text-white  mt-3">
                    {acc.title}
                  </h4>

                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {acc.subtitle}
                  </p>

                </div>
              ))}

            </div>
          )}
          

      </div>

    </section>
  );
}

