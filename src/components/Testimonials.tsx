"use client";

import { useEffect, useState } from "react";
import { supabase } from "@//admin/lib/supabase";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  rating: number;
  created_at?: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  /*
  ============================================================
  FETCH TESTIMONIALS
  ============================================================
  */

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("testimonials")
        .select(`
          id,
          name,
          role,
          company,
          feedback,
          rating,
          created_at
        `)
        .order("created_at", { ascending: true });

      if (error) {
        console.error(
          "Failed to load testimonials:",
          error
        );

        setError(error.message);
        return;
      }

      setTestimonials(data || []);
      setCurrentIndex(0);
    } catch (err) {
      console.error(
        "Unexpected error loading testimonials:",
        err
      );

      setError(
        "Failed to load testimonials."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  ============================================================
  NAVIGATION
  ============================================================
  */

  const prevSlide = () => {
    if (testimonials.length <= 1) return;

    setCurrentIndex((prev) =>
      prev === 0
        ? testimonials.length - 1
        : prev - 1
    );
  };

  const nextSlide = () => {
    if (testimonials.length <= 1) return;

    setCurrentIndex((prev) =>
      prev === testimonials.length - 1
        ? 0
        : prev + 1
    );
  };

  /*
  ============================================================
  AUTO PLAY
  ============================================================
  */

  useEffect(() => {
    if (
      loading ||
      testimonials.length <= 1 ||
      isPaused
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1
          ? 0
          : prev + 1
      );
    }, 6000);

    return () => {
      window.clearInterval(interval);
    };
  }, [
    loading,
    testimonials.length,
    isPaused,
  ]);

  const currentTestimonial =
    testimonials[currentIndex];

  /*
  ============================================================
  HELPERS
  ============================================================
  */

  const getInitials = (name: string) => {
    if (!name) return "?";

    const parts = name
      .trim()
      .split(/\s+/);

    if (parts.length === 1) {
      return parts[0]
        .charAt(0)
        .toUpperCase();
    }

    return (
      parts[0].charAt(0) +
      parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  const randomRotateY = () => {
    return Math.floor(Math.random() * 16) - 8;
  };

  /*
  ============================================================
  RENDER
  ============================================================
  */

  return (
    <section
      id="testimonials"
      className="
        testimonials
        relative
        overflow-hidden
        py-24
        sm:py-28
        bg-slate-950/40
      "
    >
      {/* ====================================================
          ANIMATED BACKGROUND
      ==================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Cyan glow */}
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -top-40
            -left-40
            w-[420px]
            h-[420px]
            rounded-full
            bg-cyan-500/10
            blur-[120px]
          "
        />

        {/* Indigo glow */}
        <motion.div
          animate={{
            x: [0, -70, 0],
            y: [0, 50, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -bottom-40
            -right-40
            w-[480px]
            h-[480px]
            rounded-full
            bg-indigo-500/10
            blur-[130px]
          "
        />

        {/* Grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            bg-[linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
            bg-[size:55px_55px]
          "
        />

        {/* Floating particles */}
        {[...Array(14)].map((_, index) => (
          <motion.span
            key={index}
            className="
              absolute
              w-1
              h-1
              rounded-full
              bg-cyan-400/40
            "
            style={{
              left: `${(index * 73) % 100}%`,
              top: `${(index * 47) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.15, 0.8, 0.15],
              scale: [0.8, 1.5, 0.8],
            }}
            transition={{
              duration:
                3 + (index % 4),
              repeat: Infinity,
              delay: index * 0.25,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* ====================================================
            HEADING
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            text-center
            max-w-3xl
            mx-auto
            mb-14
            sm:mb-20
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1.5
              mb-5
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-400/5
              text-cyan-400
              text-xs
              font-mono
              uppercase
              tracking-[0.2em]
            "
          >
            <Sparkles
              size={13}
              className="animate-pulse"
            />

            Client Feedback
          </motion.div>

          <h2
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-black
              text-white
              font-sans
              tracking-tight
            "
          >
            Client{" "}
            <span
              className="
                bg-gradient-to-r
                from-cyan-400
                via-blue-400
                to-indigo-500
                bg-clip-text
                text-transparent
                font-extrabold
              "
            >
              Endorsements
            </span>
          </h2>

          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: 48,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="
              h-1
              bg-gradient-to-r
              from-cyan-400
              to-indigo-500
              mx-auto
              mt-5
              rounded-full
            "
          />

          <p
            className="
              text-slate-400
              mt-5
              text-sm
              sm:text-base
              leading-relaxed
            "
          >
            Real feedback from clients, collaborators,
            developers, and business partners.
          </p>
        </motion.div>

        {/* ====================================================
            LOADING
        ==================================================== */}

        {loading && (
          <div className="flex justify-center items-center py-20">

            <div className="relative">

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  w-10
                  h-10
                  rounded-full
                  border-2
                  border-cyan-400/20
                  border-t-cyan-400
                "
              />

              <motion.div
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-cyan-400/10
                  blur-md
                "
              />
            </div>

            <span
              className="
                ml-4
                text-sm
                font-mono
                text-cyan-400
              "
            >
              Loading testimonials...
            </span>

          </div>
        )}

        {/* ====================================================
            ERROR
        ==================================================== */}

        {!loading && error && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              max-w-xl
              mx-auto
              py-10
              text-center
            "
          >
            <div
              className="
                p-6
                rounded-2xl
                bg-red-500/5
                border
                border-red-500/20
                backdrop-blur-xl
              "
            >
              <p className="text-red-400 text-sm">
                Failed to load testimonials.
              </p>

              <p className="text-red-400/60 text-xs mt-2">
                {error}
              </p>

              <button
                onClick={fetchTestimonials}
                className="
                  mt-5
                  px-5
                  py-2.5
                  rounded-xl
                  bg-red-500/10
                  border
                  border-red-500/30
                  text-red-300
                  text-sm
                  hover:bg-red-500/20
                  transition-all
                "
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        {/* ====================================================
            EMPTY
        ==================================================== */}

        {!loading &&
          !error &&
          testimonials.length === 0 && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="
                text-center
                py-20
              "
            >
              <p
                className="
                  text-slate-500
                  text-sm
                  font-mono
                "
              >
                No testimonials available yet.
              </p>
            </motion.div>
          )}

        {/* ====================================================
            MAIN TESTIMONIAL
        ==================================================== */}

        {!loading &&
          !error &&
          currentTestimonial && (
            <div
              className="
                max-w-5xl
                mx-auto
              "
              onMouseEnter={() =>
                setIsPaused(true)
              }
              onMouseLeave={() =>
                setIsPaused(false)
              }
            >

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-12
                  gap-8
                  lg:gap-12
                  items-center
                "
              >

                {/* =================================================
                    LEFT — 3D TESTIMONIAL VISUAL
                ================================================= */}

                <div
                  className="
                    md:col-span-5
                    relative
                    h-[300px]
                    sm:h-[350px]
                    perspective-[1200px]
                  "
                >

                  {/* Back card */}
                  <motion.div
                    animate={{
                      rotate: -6,
                      x: -18,
                      y: 18,
                      scale: 0.92,
                      opacity: 0.25,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    className="
                      absolute
                      inset-4
                      rounded-3xl
                      bg-gradient-to-br
                      from-indigo-500/20
                      to-cyan-500/10
                      border
                      border-indigo-400/10
                      blur-[1px]
                    "
                  />

                  {/* Middle card */}
                  <motion.div
                    animate={{
                      rotate: 4,
                      x: 12,
                      y: 10,
                      scale: 0.96,
                      opacity: 0.4,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    className="
                      absolute
                      inset-2
                      rounded-3xl
                      bg-slate-900
                      border
                      border-cyan-400/10
                    "
                  />

                  {/* Main visual card */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial.id}
                      initial={{
                        opacity: 0,
                        scale: 0.82,
                        rotateY: randomRotateY(),
                        rotateX: 5,
                        x: 35,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotateY: 0,
                        rotateX: 0,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.88,
                        rotateY: -10,
                        x: -35,
                      }}
                      transition={{
                        duration: 0.55,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      className="
                        absolute
                        inset-0
                        rounded-3xl
                        overflow-hidden
                        border
                        border-cyan-400/20
                        bg-slate-900
                        shadow-2xl
                        shadow-cyan-500/10
                      "
                    >

                      {/* Animated gradient */}
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 12,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="
                          absolute
                          -inset-[50%]
                          bg-[conic-gradient(from_0deg,transparent_0deg,rgba(34,211,238,.15)_80deg,transparent_140deg,rgba(99,102,241,.15)_220deg,transparent_300deg)]
                        "
                      />

                      <div
                        className="
                          absolute
                          inset-[1px]
                          rounded-[23px]
                          bg-slate-950
                          overflow-hidden
                        "
                      >

                        {/* Big quote */}
                        <Quote
                          className="
                            absolute
                            top-7
                            left-7
                            text-cyan-400/10
                          "
                          size={100}
                          strokeWidth={1}
                        />

                        {/* Avatar */}
                        <div
                          className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <motion.div
                            animate={{
                              y: [0, -8, 0],
                              scale: [1, 1.03, 1],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="
                              relative
                              w-28
                              h-28
                              sm:w-32
                              sm:h-32
                              rounded-full
                              flex
                              items-center
                              justify-center
                              text-3xl
                              sm:text-4xl
                              font-black
                              text-white
                              bg-gradient-to-br
                              from-cyan-400
                              via-blue-500
                              to-indigo-600
                              shadow-2xl
                              shadow-cyan-500/20
                            "
                          >
                            {getInitials(
                              currentTestimonial.name
                            )}

                            {/* Ring */}
                            <motion.div
                              animate={{
                                rotate: 360,
                              }}
                              transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="
                                absolute
                                -inset-3
                                rounded-full
                                border
                                border-dashed
                                border-cyan-400/30
                              "
                            />

                            {/* Glow */}
                            <div
                              className="
                                absolute
                                -inset-8
                                rounded-full
                                bg-cyan-400/10
                                blur-2xl
                                -z-10
                              "
                            />
                          </motion.div>
                        </div>

                        {/* Bottom identity */}
                        <div
                          className="
                            absolute
                            bottom-0
                            left-0
                            right-0
                            p-6
                            bg-gradient-to-t
                            from-slate-950
                            via-slate-950/90
                            to-transparent
                            pt-16
                          "
                        >
                          <p
                            className="
                              text-white
                              font-bold
                              text-lg
                            "
                          >
                            {currentTestimonial.name}
                          </p>

                          <p
                            className="
                              text-slate-500
                              text-xs
                              font-mono
                            "
                          >
                            {currentTestimonial.company}
                          </p>
                        </div>

                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Floating spark */}
                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                      rotate: [0, 20, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
                      absolute
                      -top-4
                      -right-3
                      w-10
                      h-10
                      rounded-xl
                      bg-cyan-400/10
                      border
                      border-cyan-400/20
                      backdrop-blur-md
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Sparkles
                      size={18}
                      className="text-cyan-400"
                    />
                  </motion.div>

                </div>

                {/* =================================================
                    RIGHT — TESTIMONIAL CONTENT
                ================================================= */}

                <div
                  className="
                    md:col-span-7
                    min-w-0
                  "
                >

                  <AnimatePresence
                    mode="wait"
                  >
                    <motion.div
                      key={currentTestimonial.id}
                      initial={{
                        opacity: 0,
                        y: 25,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -20,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                    >

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-5">

                        {[
                          0,
                          1,
                          2,
                          3,
                          4,
                        ].map((star) => {
                          const active =
                            star <
                            Math.min(
                              Math.max(
                                Number(
                                  currentTestimonial.rating
                                ) || 0,
                                0
                              ),
                              5
                            );

                          return (
                            <motion.div
                              key={star}
                              initial={{
                                opacity: 0,
                                scale: 0.5,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              transition={{
                                delay:
                                  star * 0.06,
                                duration: 0.25,
                              }}
                            >
                              <Star
                                size={17}
                                fill={
                                  active
                                    ? "currentColor"
                                    : "transparent"
                                }
                                className={
                                  active
                                    ? "text-yellow-400"
                                    : "text-slate-700"
                                }
                              />
                            </motion.div>
                          );
                        })}

                        <span
                          className="
                            ml-2
                            text-xs
                            font-mono
                            text-slate-500
                          "
                        >
                          {currentTestimonial.rating}/5
                        </span>

                      </div>

                      {/* Feedback */}
                      <div className="relative">

                        <Quote
                          size={34}
                          className="
                            absolute
                            -left-2
                            -top-5
                            text-cyan-400/20
                          "
                        />

                        <p
                          className="
                            text-xl
                            sm:text-2xl
                            lg:text-[27px]
                            leading-relaxed
                            font-medium
                            text-slate-200
                            tracking-tight
                            pl-6
                          "
                        >
                          {currentTestimonial.feedback
                            .split(" ")
                            .map(
                              (word, index) => (
                                <motion.span
                                  key={`${currentTestimonial.id}-${index}`}
                                  initial={{
                                    opacity: 0,
                                    filter:
                                      "blur(8px)",
                                    y: 8,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    filter:
                                      "blur(0px)",
                                    y: 0,
                                  }}
                                  transition={{
                                    duration: 0.25,
                                    delay:
                                      0.018 *
                                      index,
                                    ease:
                                      "easeOut",
                                  }}
                                  className="
                                    inline-block
                                    mr-1.5
                                  "
                                >
                                  {word}
                                </motion.span>
                              )
                            )}
                        </p>
                      </div>

                      {/* Person */}
                      <div
                        className="
                          mt-8
                          pt-6
                          border-t
                          border-slate-800/80
                        "
                      >

                        <div className="flex items-center gap-4">

                          <div
                            className="
                              w-12
                              h-12
                              rounded-full
                              bg-gradient-to-br
                              from-cyan-400
                              to-indigo-600
                              flex
                              items-center
                              justify-center
                              text-white
                              font-black
                              text-sm
                              shadow-lg
                              shadow-cyan-500/10
                            "
                          >
                            {getInitials(
                              currentTestimonial.name
                            )}
                          </div>

                          <div>
                            <h4
                              className="
                                text-white
                                font-bold
                                text-base
                              "
                            >
                              {currentTestimonial.name}
                            </h4>

                            <p
                              className="
                                text-slate-500
                                text-xs
                                font-mono
                                mt-0.5
                              "
                            >
                              {currentTestimonial.role}
                              {currentTestimonial.company
                                ? ` — ${currentTestimonial.company}`
                                : ""}
                            </p>
                          </div>

                        </div>

                      </div>

                    </motion.div>
                  </AnimatePresence>

                  {/* =================================================
                      CONTROLS
                  ================================================= */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mt-8
                    "
                  >

                    {/* Progress */}
                    <div className="flex items-center gap-2">

                      {testimonials.map(
                        (testimonial, index) => (
                          <button
                            key={testimonial.id}
                            onClick={() =>
                              setCurrentIndex(
                                index
                              )
                            }
                            aria-label={`Go to testimonial ${
                              index + 1
                            }`}
                            className="group"
                          >
                            <motion.div
                              animate={{
                                width:
                                  currentIndex ===
                                  index
                                    ? 32
                                    : 8,
                                opacity:
                                  currentIndex ===
                                  index
                                    ? 1
                                    : 0.4,
                              }}
                              transition={{
                                duration: 0.3,
                              }}
                              className="
                                h-1.5
                                rounded-full
                                bg-cyan-400
                              "
                            />
                          </button>
                        )
                      )}

                    </div>

                    {/* Arrows */}
                    {testimonials.length > 1 && (
                      <div className="flex gap-3">

                        <motion.button
                          whileHover={{
                            scale: 1.08,
                            x: -2,
                          }}
                          whileTap={{
                            scale: 0.92,
                          }}
                          onClick={prevSlide}
                          className="
                            w-11
                            h-11
                            rounded-full
                            bg-slate-900
                            border
                            border-slate-800
                            hover:border-cyan-400/40
                            hover:bg-cyan-400/5
                            text-slate-400
                            hover:text-cyan-400
                            flex
                            items-center
                            justify-center
                            transition-colors
                            shadow-lg
                          "
                          aria-label="Previous testimonial"
                        >
                          <ArrowLeft
                            size={17}
                          />
                        </motion.button>

                        <motion.button
                          whileHover={{
                            scale: 1.08,
                            x: 2,
                          }}
                          whileTap={{
                            scale: 0.92,
                          }}
                          onClick={nextSlide}
                          className="
                            w-11
                            h-11
                            rounded-full
                            bg-cyan-400
                            text-slate-950
                            hover:bg-cyan-300
                            flex
                            items-center
                            justify-center
                            transition-colors
                            shadow-lg
                            shadow-cyan-500/20
                          "
                          aria-label="Next testimonial"
                        >
                          <ArrowRight
                            size={17}
                          />
                        </motion.button>

                      </div>
                    )}

                  </div>

                  {/* Auto play indicator */}
                  {testimonials.length > 1 && (
                    <div className="mt-5">

                      <div
                        className="
                          h-[2px]
                          w-full
                          bg-slate-800
                          overflow-hidden
                          rounded-full
                        "
                      >
                        {!isPaused && (
                          <motion.div
                            key={currentIndex}
                            initial={{
                              width: "0%",
                            }}
                            animate={{
                              width: "100%",
                            }}
                            transition={{
                              duration: 6,
                              ease: "linear",
                            }}
                            className="
                              h-full
                              bg-gradient-to-r
                              from-cyan-400
                              to-indigo-500
                            "
                          />
                        )}
                      </div>

                      <p
                        className="
                          text-[10px]
                          font-mono
                          text-slate-600
                          mt-2
                        "
                      >
                        {isPaused
                          ? "PAUSED"
                          : "AUTO PLAY"}
                      </p>

                    </div>
                  )}

                </div>

              </div>
            </div>
          )}

      </div>
    </section>
  );
}
