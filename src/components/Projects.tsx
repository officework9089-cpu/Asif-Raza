<<<<<<< HEAD
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@//admin/lib/supabase";
import { AnimatePresence, motion } from "motion/react";
=======
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { supabase } from "@//admin/lib/supabase";
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7

/* =========================================================
   TYPES
========================================================= */

interface SupabaseProject {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  tech: string[] | null;
  challenges: string | null;
  results: string | null;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  github: string | null;
  demo: string | null;
  tech: string[];
  features: string[];
  challenges: string;
  results: string;
}

<<<<<<< HEAD
const PROJECTS_BUCKET = "projects";
const CARD_GAP = 32;
const SCROLL_SPEED = 40;

=======
const PROJECTS_BUCKET = 'projects';

/*
 * Normal automatic scrolling speed.
 * Increase to 55/60 for faster movement.
 * Decrease to 30/35 for slower movement.
 */
const SCROLL_SPEED = 40;

/*
 * Gap between project cards.
 * Tailwind gap-8 = 2rem = 32px.
 */
const CARD_GAP = 32;

>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  onDetails,
  isDragging,
}: {
  project: Project;
  onDetails: (project: Project) => void;
  isDragging?: React.MutableRefObject<boolean>;
}) {
  return (
    <article
<<<<<<< HEAD
      data-project-card
      className="
        group relative flex shrink-0 flex-col justify-between overflow-hidden
        w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px] xl:w-[390px]
        rounded-2xl border border-slate-900 bg-slate-900/40
        transition-all duration-300
        hover:border-cyan-500/30 hover:bg-slate-900/60
      "
    >
      {/* Image */}
      <div className="relative aspect-16/10 overflow-hidden border-b border-slate-900 bg-slate-950">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            draggable={false}
            referrerPolicy="no-referrer"
            className="
              pointer-events-none h-full w-full object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-600">
            <i className="fas fa-image text-4xl" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-slate-950/20 transition-all duration-300 group-hover:bg-transparent" />

        <span
          className="
            absolute right-3 top-3 rounded-full border border-cyan-500/10
            bg-slate-950/80 px-3 py-1 text-[10px] font-mono
            uppercase tracking-widest text-cyan-400 backdrop-blur-md
            sm:right-4 sm:top-4
          "
        >
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
        <div className="space-y-3">
          <h3 className="text-lg font-bold leading-snug tracking-tight text-white transition-colors duration-200 group-hover:text-cyan-400 sm:text-xl">
            {project.title}
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-slate-400">
=======
      className="
        group
        relative
        flex
        flex-col
        justify-between
        bg-slate-900/40
        rounded-2xl
        border
        border-slate-900
        overflow-hidden
        w-75
        sm:w-85
        md:w-90
        lg:w-95
        shrink-0
        hover:border-cyan-500/30
        hover:bg-slate-900/60
        transition-all
        duration-300
      "
    >
      <div>

        {/* =================================================
            IMAGE
        ================================================= */}

        <div
          className="
            relative
            aspect-[16/10]
            overflow-hidden
            bg-slate-950
            border-b
            border-slate-900
          "
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              draggable={false}
              className="
                w-full
                h-full
                object-cover
                group-hover:scale-105
                transition-transform
                duration-500
                pointer-events-none
              "
              referrerPolicy="no-referrer"
            />
          ) : (
            <div
              className="
                w-full
                h-full
                flex
                items-center
                justify-center
                text-slate-600
              "
            >
              <i className="fas fa-image text-4xl" />
            </div>
          )}

          <div
            className="
              absolute
              inset-0
              bg-slate-950/20
              group-hover:bg-transparent
              transition-all
              duration-300
              pointer-events-none
            "
          />

          <span
            className="
              absolute
              top-4
              right-4
              bg-slate-950/80
              backdrop-blur-md
              px-3
              py-1
              rounded-full
              text-[10px]
              font-mono
              text-cyan-400
              border
              border-cyan-500/10
              uppercase
              tracking-widest
            "
          >
            {project.category}
          </span>
        </div>

        {/* =================================================
            BODY
        ================================================= */}

        <div className="p-6 space-y-4">

          <h3
            className="
              text-xl
              font-bold
              text-white
              tracking-tight
              leading-snug
              group-hover:text-cyan-400
              transition-colors
              duration-200
            "
          >
            {project.title}
          </h3>

          <p
            className="
              text-sm
              text-slate-400
              leading-relaxed
              line-clamp-3
            "
          >
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
            {project.description}
          </p>

          {project.tech.length > 0 && (
<<<<<<< HEAD
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tech.map((tech, index) => (
                <span
                  key={`${project.id}-${tech}-${index}`}
                  className="rounded-lg bg-slate-800/80 px-2.5 py-1 text-xs font-semibold text-cyan-400/90"
=======
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.tech.map((tech, index) => (
                <span
                  key={`${project.id}-${tech}-${index}`}
                  className="
                    px-2.5
                    py-1
                    bg-slate-800/80
                    text-cyan-400/90
                    text-xs
                    font-semibold
                    rounded-lg
                    font-mono
                  "
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

<<<<<<< HEAD
      {/* Actions */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-900/60 p-4 sm:p-5 md:p-6 md:pt-4">
=======
      {/* =================================================
          ACTIONS
      ================================================= */}

      <div
        className="
          p-6
          pt-0
          border-t
          border-slate-900/60
          mt-4
          flex
          items-center
          justify-between
          gap-4
        "
      >
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
        <button
          type="button"
          onClick={() => {
            if (isDragging?.current) return;
<<<<<<< HEAD
            onDetails(project);
          }}
          className="
            inline-flex items-center gap-1.5 rounded-lg border border-slate-800
            bg-slate-900 px-3 py-2 text-xs font-semibold text-cyan-400
            transition-colors hover:bg-slate-800 hover:text-cyan-300
          "
        >
          Details & Results
          <i className="fas fa-arrow-up-right-from-square text-[9px]" />
        </button>

        <div className="flex shrink-0 gap-2">
=======

            onDetails(project);
          }}
          className="
            text-xs
            font-semibold
            text-cyan-400
            hover:text-cyan-300
            inline-flex
            items-center
            gap-1
            bg-slate-900
            hover:bg-slate-800
            px-3
            py-2
            rounded-lg
            border
            border-slate-800
            transition-colors
          "
        >
          Details & Results

          <i className="fas fa-arrow-up-right-from-square text-[10px]" />
        </button>

        <div className="flex gap-2">

>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
<<<<<<< HEAD
                if (isDragging?.current) e.preventDefault();
              }}
              className="
                rounded-lg bg-slate-950 p-2 text-sm text-slate-400
                transition-colors hover:bg-slate-900 hover:text-white
              "
              title="View GitHub Repository"
              aria-label={`View ${project.title} GitHub repository`}
=======
                if (isDragging?.current) {
                  e.preventDefault();
                }
              }}
              className="
                text-slate-400
                hover:text-white
                p-2
                text-sm
                bg-slate-950
                rounded-lg
                hover:bg-slate-900
                transition-colors
              "
              title="View GitHub Repository"
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
            >
              <i className="fab fa-github" />
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
<<<<<<< HEAD
                if (isDragging?.current) e.preventDefault();
              }}
              className="
                rounded-lg bg-cyan-500/10 p-2 text-sm text-cyan-400
                transition-colors hover:bg-cyan-500/40 hover:text-white
              "
              title="View Live Demo"
              aria-label={`View ${project.title} live demo`}
=======
                if (isDragging?.current) {
                  e.preventDefault();
                }
              }}
              className="
                text-cyan-400
                hover:text-white
                p-2
                text-sm
                bg-cyan-500/10
                rounded-lg
                hover:bg-cyan-500/40
                transition-colors
              "
              title="View Live Demo Page"
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
            >
              <i className="fas fa-globe" />
            </a>
          )}
<<<<<<< HEAD
=======

>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
        </div>
      </div>
    </article>
  );
}

/* =========================================================
<<<<<<< HEAD
   PROJECTS
========================================================= */

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     CAROUSEL REFS
  ======================================================= */

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);

  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);

  const offsetRef = useRef(0);
  const anchorOffsetRef = useRef(0);
  const groupStepRef = useRef(0);

  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);

  /* =======================================================
     IMAGE URL
  ======================================================= */

  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) return "";

    if (
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://")
=======
   PROJECTS COMPONENT
========================================================= */

export default function Projects() {

  const [projects, setProjects] = useState<Project[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState<string>('All');

  const [searchQuery, setSearchQuery] = useState('');

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  /* =======================================================
     CIRCULAR MARQUEE REFS
  ======================================================= */

  const marqueeWrapperRef =
    useRef<HTMLDivElement | null>(null);

  const marqueeRef =
    useRef<HTMLDivElement | null>(null);

  const animationFrameRef =
    useRef<number | null>(null);

  const lastTimeRef =
    useRef<number>(0);

  const offsetRef =
    useRef<number>(0);

  const initialOffsetRef =
    useRef<number>(0);

  const isDragging =
    useRef<boolean>(false);

  const hasDragged =
    useRef<boolean>(false);

  const dragStartX =
    useRef<number>(0);

  const dragStartOffset =
    useRef<number>(0);

  const currentOrderRef =
    useRef<Project[]>([]);

  /* =======================================================
     CONVERT STORAGE PATH TO PUBLIC URL
  ======================================================= */

  const getImageUrl = (imagePath: string | null) => {

    if (!imagePath) {
      return '';
    }

    if (
      imagePath.startsWith('http://') ||
      imagePath.startsWith('https://')
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
    ) {
      return imagePath;
    }

    const { data } = supabase.storage
      .from(PROJECTS_BUCKET)
      .getPublicUrl(imagePath);

    return data.publicUrl;
  };

  /* =======================================================
     FETCH PROJECTS
  ======================================================= */

<<<<<<< HEAD
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError("");

      try {
        const { data, error: dbError } = await supabase
          .from("projects")
          .select(`
            id,
            title,
            description,
            category,
            image_url,
            github_url,
            demo_url,
            tech,
            challenges,
            results
          `)
          .order("created_at", { ascending: false });

        if (dbError) throw dbError;

        const mappedProjects: Project[] =
          ((data as SupabaseProject[]) ?? []).map((project) => ({
            id: project.id,
            title: project.title,
            description: project.description,
            category: project.category,
            image: getImageUrl(project.image_url),
            github: project.github_url,
            demo: project.demo_url,
            features: [],
            tech: Array.isArray(project.tech) ? project.tech : [],
            challenges:
              project.challenges ||
              "No engineering challenge information provided.",
            results:
              project.results ||
              "No business outcome information provided.",
          }));

        setProjects(mappedProjects);
      } catch (err) {
        console.error("Failed to load projects:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load projects."
        );

        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

=======
  const fetchProjects = async () => {

    setLoading(true);
    setError('');

    try {

      const { data, error: dbError } =
        await supabase
          .from('projects')
          .select(
            `
              id,
              title,
              description,
              category,
              image_url,
              github_url,
              demo_url,
              tech,
              challenges,
              results
            `
          )
          .order('created_at', {
            ascending: false,
          });

      if (dbError) {
        throw dbError;
      }

      const mappedProjects: Project[] =
        ((data as SupabaseProject[]) ?? [])
          .map((project) => ({
            id: project.id,

            title: project.title,

            description: project.description,

            category: project.category,

            image: getImageUrl(project.image_url),

            github: project.github_url,

            demo: project.demo_url,

            features: [],

            tech: Array.isArray(project.tech)
              ? project.tech
              : [],

            challenges:
              project.challenges ||
              'No engineering challenge information provided.',

            results:
              project.results ||
              'No business outcome information provided.',
          }));

      setProjects(mappedProjects);

    } catch (err) {

      console.error(
        'Failed to load projects:',
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load projects.'
      );

      setProjects([]);

    } finally {

      setLoading(false);
    }
  };

  /* =======================================================
     LOAD PROJECTS
  ======================================================= */

  useEffect(() => {
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
    void fetchProjects();
  }, []);

  /* =======================================================
<<<<<<< HEAD
     CATEGORIES
  ======================================================= */

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        projects
          .map((project) => project.category)
          .filter(Boolean)
      )
    );

    return ["All", ...uniqueCategories];
=======
     BUILD CATEGORIES
  ======================================================= */

  const categories = useMemo(() => {

    const uniqueCategories =
      Array.from(
        new Set(
          projects
            .map(
              (project) =>
                project.category
            )
            .filter(Boolean)
        )
      );

    return [
      'All',
      ...uniqueCategories,
    ];

>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
  }, [projects]);

  /* =======================================================
     FILTER PROJECTS
  ======================================================= */

  const filteredProjects = useMemo(() => {
<<<<<<< HEAD
    const query = searchQuery.toLowerCase().trim();

    return projects.filter((project) => {
      const matchCategory =
        selectedCategory === "All" ||
        project.category === selectedCategory;

      const matchQuery =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.tech.some((tech) =>
          tech.toLowerCase().includes(query)
        );

      return matchCategory && matchQuery;
    });
  }, [projects, selectedCategory, searchQuery]);

  /* =======================================================
     APPLY TRANSFORM
  ======================================================= */

  const applyTransform = () => {
    if (!trackRef.current) return;

    trackRef.current.style.transform =
      `translate3d(${offsetRef.current}px, 0, 0)`;
  };

  /* =======================================================
     NORMALIZE INFINITE POSITION
  ======================================================= */

  const normalizeOffset = (value: number) => {
    const step = groupStepRef.current;
    const anchor = anchorOffsetRef.current;

    if (!step) return value;

    while (value < anchor - step) {
      value += step;
    }

    while (value > anchor + step) {
      value -= step;
    }

    return value;
  };

  /* =======================================================
     INITIALIZE CAROUSEL
  ======================================================= */

  useEffect(() => {
    if (!filteredProjects.length) return;

    const initializeCarousel = () => {
      const wrapper = wrapperRef.current;
      const group = groupRef.current;
      const track = trackRef.current;

      if (!wrapper || !group || !track) return;

      const firstCard =
        group.querySelector<HTMLElement>("[data-project-card]");

      if (!firstCard) return;

      const cardWidth = firstCard.getBoundingClientRect().width;
      const groupWidth = group.getBoundingClientRect().width;

      /*
       * Track has a 32px gap between each group.
       */
      const groupStep = groupWidth + CARD_GAP;

      /*
       * The middle group contains the real
       * first project.
       *
       * Center that first project.
       */
      const anchor =
        wrapper.clientWidth / 2 -
        cardWidth / 2 -
        groupStep;

      groupStepRef.current = groupStep;
      anchorOffsetRef.current = anchor;
      offsetRef.current = anchor;

      applyTransform();
    };

    const frame = requestAnimationFrame(initializeCarousel);

    const resizeObserver = new ResizeObserver(() => {
      initializeCarousel();
    });

    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
    }

    if (groupRef.current) {
      resizeObserver.observe(groupRef.current);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [filteredProjects]);

  /* =======================================================
     AUTO SCROLL
  ======================================================= */

  useEffect(() => {
    if (filteredProjects.length <= 1) return;
=======

    const query =
      searchQuery
        .toLowerCase()
        .trim();

    return projects.filter(
      (project) => {

        const matchCategory =
          selectedCategory === 'All' ||
          project.category ===
          selectedCategory;

        const matchQuery =
          !query ||
          project.title
            .toLowerCase()
            .includes(query) ||
          project.description
            .toLowerCase()
            .includes(query) ||
          project.tech.some(
            (tech) =>
              tech
                .toLowerCase()
                .includes(query)
          ) ||
          project.category
            .toLowerCase()
            .includes(query);

        return (
          matchCategory &&
          matchQuery
        );
      }
    );

  }, [
    projects,
    selectedCategory,
    searchQuery,
  ]);


  useEffect(() => {

    if (
      filteredProjects.length === 0
    ) {
      currentOrderRef.current = [];
      return;
    }

    const lastProject =
      filteredProjects[
      filteredProjects.length - 1
      ];

    const firstProject =
      filteredProjects[0];

    const remainingProjects =
      filteredProjects.slice(1);

    const circularOrder = [
      lastProject,
      firstProject,
      ...remainingProjects,
    ];

    currentOrderRef.current =
      circularOrder;

    offsetRef.current = 0;

    initialOffsetRef.current = 0;

    lastTimeRef.current = 0;

    /*
     * Wait until cards have rendered.
     */
    requestAnimationFrame(() => {

      const wrapper =
        marqueeWrapperRef.current;

      const track =
        marqueeRef.current;

      if (
        !wrapper ||
        !track ||
        track.children.length < 2
      ) {
        return;
      }

      const firstCard =
        track.children[0] as HTMLElement;

      const secondCard =
        track.children[1] as HTMLElement;

      if (
        !firstCard ||
        !secondCard
      ) {
        return;
      }

      const cardWidth =
        firstCard.offsetWidth;

      /*
       * First project is the SECOND card.
       *
       * We position it at the center:
       *
       * wrapper center
       * -
       * half card
       * -
       * first card
       * -
       * gap
       */
      const firstProjectOffset =
        wrapper.clientWidth / 2 -
        cardWidth / 2 -
        cardWidth -
        CARD_GAP;

      offsetRef.current =
        firstProjectOffset;

      initialOffsetRef.current =
        firstProjectOffset;

      track.style.transform =
        `translate3d(${firstProjectOffset}px, 0, 0)`;
    });

  }, [filteredProjects]);

  /* =======================================================
     CIRCULAR AUTO SCROLL
  ======================================================= */

  useEffect(() => {

    if (
      filteredProjects.length <= 1
    ) {
      return;
    }
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7

    let mounted = true;

    const animate = (time: number) => {
<<<<<<< HEAD
      if (!mounted) return;

      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }

      const delta = Math.min(
        (time - lastTimeRef.current) / 1000,
        0.05
      );

      lastTimeRef.current = time;

      if (!isDragging.current) {
        offsetRef.current -= SCROLL_SPEED * delta;
        offsetRef.current = normalizeOffset(offsetRef.current);
        applyTransform();
      }

      animationFrameRef.current =
        requestAnimationFrame(animate);
    };

    animationFrameRef.current =
      requestAnimationFrame(animate);

    return () => {
      mounted = false;

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = null;
      lastTimeRef.current = 0;
    };
  }, [filteredProjects.length]);
=======

      if (!mounted) {
        return;
      }

      if (!lastTimeRef.current) {
        lastTimeRef.current =
          time;
      }

      const delta =
        Math.min(
          (time -
            lastTimeRef.current) /
          1000,
          0.05
        );

      lastTimeRef.current =
        time;

      /*
       * Don't auto-scroll while
       * user is dragging.
       */
      if (!isDragging.current) {

        offsetRef.current -=
          SCROLL_SPEED * delta;

        const track =
          marqueeRef.current;

        if (
          track &&
          track.children.length > 1
        ) {

          const firstCard =
            track.children[0] as HTMLElement;

          if (firstCard) {

            const cardWidth =
              firstCard.offsetWidth;

            const itemWidth =
              cardWidth +
              CARD_GAP;

            /*
             * Once the first card has
             * completely moved left,
             * move it to the end.
             */
            if (
              offsetRef.current <=
              initialOffsetRef.current -
              itemWidth
            ) {

              const currentFirst =
                currentOrderRef.current.shift();

              if (currentFirst) {

                currentOrderRef.current.push(
                  currentFirst
                );

                /*
                 * Move first DOM card
                 * to the end.
                 */
                track.appendChild(
                  firstCard
                );

                /*
                 * Compensate for the
                 * removed card so the
                 * movement remains
                 * completely seamless.
                 */
                offsetRef.current +=
                  itemWidth;

                initialOffsetRef.current +=
                  itemWidth;
              }
            }
          }
        }
      }

      const track =
        marqueeRef.current;

      if (track) {

        track.style.transform =
          `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      animationFrameRef.current =
        requestAnimationFrame(
          animate
        );
    };

    animationFrameRef.current =
      requestAnimationFrame(
        animate
      );

    return () => {

      mounted = false;

      if (
        animationFrameRef.current
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      animationFrameRef.current =
        null;

      lastTimeRef.current = 0;
    };

  }, [filteredProjects]);
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7

  /* =======================================================
     POINTER DOWN
  ======================================================= */

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
<<<<<<< HEAD
    const track = trackRef.current;

    if (!track) return;

    // Don't start carousel dragging from buttons or links.
    const target = e.target as HTMLElement;

    if (
      target.closest("a") ||
      target.closest("button") ||
      target.closest("input") ||
      target.closest("textarea") ||
      target.closest("select")
    ) {
      return;
    }

    // Only allow left mouse button.
    if (
      e.pointerType === "mouse" &&
=======

    const track =
      marqueeRef.current;

    if (!track) {
      return;
    }

    /*
     * Only left mouse button.
     * Touch still works naturally.
     */
    if (
      e.pointerType === 'mouse' &&
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
      e.button !== 0
    ) {
      return;
    }

    isDragging.current = true;
<<<<<<< HEAD
    hasDragged.current = false;

    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;

    lastTimeRef.current = 0;

    track.style.cursor = "grabbing";

    track.setPointerCapture(e.pointerId);
  };



=======

    hasDragged.current = false;

    dragStartX.current =
      e.clientX;

    dragStartOffset.current =
      offsetRef.current;

    lastTimeRef.current = 0;

    track.style.cursor =
      'grabbing';

    track.setPointerCapture(
      e.pointerId
    );
  };

>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
  /* =======================================================
     POINTER MOVE
  ======================================================= */

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
<<<<<<< HEAD
    if (!isDragging.current) return;

    const distance =
      e.clientX - dragStartX.current;

    if (Math.abs(distance) > 5) {
      hasDragged.current = true;
    }

    offsetRef.current =
      dragStartOffset.current + distance;

    offsetRef.current =
      normalizeOffset(offsetRef.current);

    applyTransform();
=======

    if (!isDragging.current) {
      return;
    }

    const distance =
      e.clientX -
      dragStartX.current;

    if (
      Math.abs(distance) > 5
    ) {
      hasDragged.current =
        true;
    }

    offsetRef.current =
      dragStartOffset.current +
      distance;

    const track =
      marqueeRef.current;

    if (track) {

      track.style.transform =
        `translate3d(${offsetRef.current}px, 0, 0)`;
    }
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
  };

  /* =======================================================
     POINTER UP
  ======================================================= */

  const handlePointerUp = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
<<<<<<< HEAD
    if (!isDragging.current) return;

    isDragging.current = false;
    lastTimeRef.current = 0;

    const track = trackRef.current;

    if (
      track &&
      track.hasPointerCapture(e.pointerId)
    ) {
      track.releasePointerCapture(e.pointerId);
      track.style.cursor = "grab";
    }

    /*
     * Prevent Details/GitHub/Demo from
     * activating immediately after dragging.
     */
    setTimeout(() => {
      hasDragged.current = false;
    }, 100);
=======

    if (!isDragging.current) {
      return;
    }

    isDragging.current = false;

    lastTimeRef.current = 0;

    const track =
      marqueeRef.current;

    if (
      track &&
      track.hasPointerCapture(
        e.pointerId
      )
    ) {
      track.releasePointerCapture(
        e.pointerId
      );
    }

    if (track) {
      track.style.cursor =
        'grab';
    }

    /*
     * Prevent buttons/links from
     * activating immediately after
     * a drag.
     */
    setTimeout(() => {
      hasDragged.current = false;
    }, 80);
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
  };

  /* =======================================================
     POINTER CANCEL
  ======================================================= */

  const handlePointerCancel = () => {
<<<<<<< HEAD
    isDragging.current = false;
    lastTimeRef.current = 0;

    if (trackRef.current) {
      trackRef.current.style.cursor = "grab";
=======

    isDragging.current = false;

    lastTimeRef.current = 0;

    const track =
      marqueeRef.current;

    if (track) {
      track.style.cursor =
        'grab';
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
    }

    setTimeout(() => {
      hasDragged.current = false;
<<<<<<< HEAD
    }, 100);
  };

  /* =======================================================
     RENDER CARD GROUP
  ======================================================= */

  const renderGroup = (
    groupIndex: number,
    attachRef = false
  ) => (
    <div
      key={`group-${groupIndex}`}
      ref={attachRef ? groupRef : undefined}
      className="flex shrink-0 gap-8"
      aria-hidden={groupIndex !== 1}
    >
      {filteredProjects.map((project) => (
        <ProjectCard
          key={`group-${groupIndex}-${project.id}`}
          project={project}
          onDetails={setSelectedProject}
          isDragging={hasDragged}
        />
      ))}
    </div>
  );

  /* =======================================================
=======
    }, 80);
  };

  /* =======================================================
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
     RETURN
  ======================================================= */

  return (
<<<<<<< HEAD
    <section
      id="projects"
      className="relative bg-slate-950/20 py-16 sm:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-16">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
=======

    <section
      id="projects"
      className="
        projects
        py-24
        bg-slate-950/20
        relative
      "
    >

      <div
        className="
          container
          mx-auto
          px-4
        "
      >

        {/* =================================================
            SECTION HEADING
        ================================================= */}

        <div
          className="
            text-center
            max-w-3xl
            mx-auto
            mb-16
          "
        >

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
            Featured{' '}

            <span
              className="
                bg-gradient-to-r
                from-cyan-400
                via-teal-400
                to-indigo-400
                bg-clip-text
                text-transparent
                font-extrabold
              "
            >
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
              Projects
            </span>
          </h2>

<<<<<<< HEAD
          <div className="mx-auto mt-4 h-1 w-12 rounded bg-cyan-400" />

          <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
            Enterprise solutions, customized publishing ecosystems,
            and responsive web systems delivered with optimized
            parameters.
          </p>
=======
          <div
            className="
              w-12
              h-1
              bg-cyan-400
              mx-auto
              mt-4
              rounded
            "
          />

          <p
            className="
              text-slate-400
              mt-4
              text-md
            "
          >
            Enterprise solutions, customized
            publishing ecosystems, and
            responsive web systems delivered
            with optimized parameters.
          </p>

>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
<<<<<<< HEAD
          <div className="mx-auto mb-8 max-w-6xl rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
=======

          <div
            className="
              max-w-6xl
              mx-auto
              mb-8
              p-4
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              text-red-400
              text-sm
            "
          >
            {error}
          </div>

>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
        )}

        {/* =================================================
            FILTER TOOLBAR
        ================================================= */}

<<<<<<< HEAD
        <div className="mx-auto mb-10 flex max-w-6xl flex-col gap-3 rounded-2xl border border-slate-900 bg-slate-900/40 p-3 sm:p-4 lg:mb-12 lg:flex-row lg:items-center lg:gap-4">

          {/* Categories */}

          <div className="relative min-w-0 flex-1">
            <div
              className="
                flex items-center gap-1.5 overflow-x-auto whitespace-nowrap
                pr-8 scroll-smooth
                [scrollbar-width:none]
                [-ms-overflow-style:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={`
                    shrink-0 rounded-xl border px-3.5 py-2 text-xs
                    font-semibold transition-all duration-300 sm:px-4 sm:text-sm
                    ${selectedCategory === category
                      ? "border-cyan-400 bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                      : "border-transparent bg-slate-950/30 text-slate-400 hover:bg-slate-800/70 hover:text-slate-200"
                    }
                  `}
                >
                  {category}
=======
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between max-w-6xl mx-auto mb-12 bg-slate-900/40 p-3 sm:p-4 rounded-2xl border border-slate-900">

          {/* Categories */}
          <div className="relative flex-1 min-w-0">
            <div
              className="
        flex items-center gap-1.5 sm:gap-2
        overflow-x-auto
        whitespace-nowrap
        scrollbar-hide
        scroll-smooth
        pr-2
        [scrollbar-width:none]
        [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden
      "
            >
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
            shrink-0
            px-3.5 sm:px-4
            py-2
            rounded-xl
            text-xs sm:text-sm
            font-semibold
            transition-all
            duration-300
            border
            ${selectedCategory === cat
                      ? 'bg-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-950/30 text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/70'
                    }
          `}
                >
                  {cat}
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
                </button>
              ))}
            </div>

<<<<<<< HEAD
            <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-slate-900/90 to-transparent" />
          </div>

          {/* Search */}

          <div className="relative w-full shrink-0 lg:w-72 xl:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              placeholder="Search projects or technology..."
              className="
                w-full rounded-xl border border-slate-800 bg-slate-950
                py-2.5 pl-10 pr-10 text-sm text-slate-100 outline-none
                transition-all placeholder:text-slate-500
                focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30
              "
            />

            <i className="fas fa-search absolute left-3.5 top-3.5 text-xs text-slate-500" />
=======
            {/* Right fade when categories overflow */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-slate-900/80 to-transparent md:hidden" />
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80 shrink-0">
            <input
              type="text"
              placeholder="Search by keywords or technology..."
              className="
        w-full
        pl-10 pr-10
        py-2.5
        bg-slate-950
        border border-slate-800
        rounded-xl
        outline-none
        focus:border-cyan-500
        focus:ring-1
        focus:ring-cyan-500/30
        text-sm
        text-slate-100
        placeholder-slate-500
        transition-all
      "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <i
              className="
        fas fa-search
        absolute left-3.5 top-3.5
        text-xs text-slate-500
      "
            />
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7

            {searchQuery && (
              <button
                type="button"
<<<<<<< HEAD
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3.5 text-xs text-slate-400 transition-colors hover:text-slate-200"
                aria-label="Clear search"
=======
                onClick={() => setSearchQuery('')}
                className="
          absolute right-3 top-3.5
          text-xs text-slate-400
          hover:text-slate-200
          transition-colors
        "
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
              >
                <i className="fas fa-times-circle" />
              </button>
            )}
          </div>
<<<<<<< HEAD
        </div>

        {/* =================================================
            PROJECTS
        ================================================= */}

        {loading ? (
          <div className="mx-auto flex max-w-6xl gap-8 overflow-hidden">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  w-[280px] shrink-0 animate-pulse overflow-hidden rounded-2xl
                  border border-slate-900 bg-slate-900/40
                  sm:w-[320px] md:w-[360px] lg:w-[380px]
                "
              >
                <div className="aspect-[16/10] bg-slate-900" />

                <div className="space-y-4 p-5 sm:p-6">
                  <div className="h-5 w-3/4 rounded bg-slate-800" />
                  <div className="h-4 w-full rounded bg-slate-800" />
                  <div className="h-4 w-5/6 rounded bg-slate-800" />

                  <div className="flex gap-2">
                    <div className="h-6 w-16 rounded bg-slate-800" />
                    <div className="h-6 w-20 rounded bg-slate-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (

          /* =================================================
             INFINITE CIRCULAR CAROUSEL
          ================================================= */

          <div
            ref={wrapperRef}
            className="
              relative mx-auto max-w-6xl overflow-hidden
              touch-pan-y
            "
          >
            {/* Fade edges */}

            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent sm:w-16 lg:w-24" />

            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-slate-950 via-slate-950/70 to-transparent sm:w-16 lg:w-24" />

            {/* Track */}

            <div
              ref={trackRef}
              className="flex w-max select-none gap-8 py-2"
              style={{
                cursor: "grab",
                willChange: "transform",
                touchAction: "pan-y",
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            >
              {renderGroup(0)}
              {renderGroup(1, true)}
              {renderGroup(2)}
            </div>
=======

        </div>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div
            className="
              flex
              gap-8
              max-w-6xl
              mx-auto
              overflow-hidden
            "
          >

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="
                  bg-slate-900/40
                  rounded-2xl
                  border
                  border-slate-900
                  overflow-hidden
                  animate-pulse
                  w-75
                  sm:w-85
                  md:w-90
                  lg:w-95
                  shrink-0
                "
              >

                <div
                  className="
                    aspect-[16/10]
                    bg-slate-900
                  "
                />

                <div
                  className="
                    p-6
                    space-y-4
                  "
                >

                  <div
                    className="
                      h-5
                      bg-slate-800
                      rounded
                      w-3/4
                    "
                  />

                  <div
                    className="
                      h-4
                      bg-slate-800
                      rounded
                      w-full
                    "
                  />

                  <div
                    className="
                      h-4
                      bg-slate-800
                      rounded
                      w-5/6
                    "
                  />

                  <div
                    className="
                      flex
                      gap-2
                    "
                  >

                    <div
                      className="
                        h-6
                        w-16
                        bg-slate-800
                        rounded
                      "
                    />

                    <div
                      className="
                        h-6
                        w-20
                        bg-slate-800
                        rounded
                      "
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : filteredProjects.length > 0 ? (

          /* =================================================
             TRUE CIRCULAR PROJECT SCROLLER
          ================================================= */

          <div
            ref={marqueeWrapperRef}
            className="
              project-marquee-wrapper
              max-w-6xl
              mx-auto
            "
          >

            {/* Left fade */}

            <div
              className="
                project-fade-left
              "
            />

            {/* Right fade */}

            <div
              className="
                project-fade-right
              "
            />

            {/* Circular track */}

            <div
              ref={marqueeRef}
              className="
                project-marquee
                flex
                gap-8
                select-none
                touch-pan-y
                cursor-grab
              "
              onPointerDown={
                handlePointerDown
              }
              onPointerMove={
                handlePointerMove
              }
              onPointerUp={
                handlePointerUp
              }
              onPointerCancel={
                handlePointerCancel
              }
            >


              {filteredProjects.length > 0 && (

                <ProjectCard
                  key={
                    currentOrderRef
                      .current[0]?.id ||
                    filteredProjects[
                      filteredProjects.length - 1
                    ].id
                  }
                  project={
                    currentOrderRef
                      .current[0] ||
                    filteredProjects[
                    filteredProjects.length - 1
                    ]
                  }
                  onDetails={
                    setSelectedProject
                  }
                  isDragging={
                    hasDragged
                  }
                />

              )}

              {filteredProjects.length > 1 && (

                filteredProjects.map(
                  (project) => (

                    <ProjectCard
                      key={project.id}
                      project={project}
                      onDetails={
                        setSelectedProject
                      }
                      isDragging={
                        hasDragged
                      }
                    />

                  )
                )

              )}

            </div>

>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
          </div>

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================= */

<<<<<<< HEAD
          <div className="mx-auto max-w-md py-16 text-center sm:py-24">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-2xl text-slate-500">
              <i className="fas fa-folder-open" />
            </div>

            <h4 className="mb-1 text-lg font-bold text-white">
              No Projects Found
            </h4>

            <p className="text-sm leading-relaxed text-slate-500">
              No matching projects were found for the selected
              category or search query.
            </p>
          </div>
=======
          <div
            className="
              py-24
              text-center
              max-w-md
              mx-auto
            "
          >

            <div
              className="
                w-16
                h-16
                rounded-full
                bg-slate-900
                flex
                items-center
                justify-center
                text-slate-500
                text-2xl
                mx-auto
                mb-4
              "
            >
              <i className="fas fa-folder-open" />
            </div>

            <h4
              className="
                text-white
                font-bold
                text-lg
                mb-1
              "
            >
              No Projects Found
            </h4>

            <p
              className="
                text-slate-500
                text-sm
                leading-relaxed
              "
            >
              No matching projects were found
              for the selected category or
              search query.
            </p>

          </div>

>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
        )}

        {/* =================================================
            PROJECT DETAIL MODAL
        ================================================= */}

<<<<<<< HEAD
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl"
                onClick={() => setSelectedProject(null)}
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
                className="
              relative
              w-full
              max-w-3xl
              max-h-[90vh]
              flex
              flex-col
              bg-slate-950/90
              border
              border-slate-800/80
              rounded-2xl
              shadow-2xl
              shadow-cyan-500/5
              overflow-hidden
              z-10
              text-left
            "
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close modal"
                  className="
                absolute
                top-4
                right-4
                z-20
                w-9
                h-9
                rounded-full
                bg-slate-900/80
                border
                border-slate-700/50
                text-slate-400
                hover:text-white
                hover:border-slate-500
                hover:bg-slate-800
                flex
                items-center
                justify-center
                transition-all
                duration-200
                backdrop-blur-md
                shadow-lg
              "
                >
                  <i className="fas fa-times text-sm" />
                </button>

                {/* Scrollable Container (Holds Banner & Body) */}
                <div className="overflow-y-auto custom-scrollbar flex-1">

                  {/* MODAL BANNER */}
                  <div className="relative aspect-[16/9] w-full bg-slate-900/50 overflow-hidden">
                    {selectedProject.image ? (
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-700">
                        <i className="fas fa-image text-5xl mb-2" />
                        <span className="text-xs font-mono uppercase tracking-wider">No Preview Available</span>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Banner Content */}
                    <div className="absolute bottom-6 left-6 right-6">
                      {selectedProject.category && (
                        <span
                          className="
                        inline-block
                        bg-cyan-500/10
                        text-cyan-400
                        text-[10px]
                        font-mono
                        font-bold
                        px-3
                        py-1
                        rounded-full
                        uppercase
                        tracking-wider
                        border
                        border-cyan-500/20
                        backdrop-blur-md
                      "
                        >
                          {selectedProject.category}
                        </span>
                      )}

                      <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 leading-tight tracking-tight">
                        {selectedProject.title}
                      </h3>
                    </div>
                  </div>

                  {/* MODAL BODY */}
                  <div className="p-6 sm:p-8 space-y-6">

                    {/* Overview */}
                    <div className="space-y-2">
                      <h4 className="text-xs uppercase text-slate-500 font-mono tracking-widest font-bold">
                        Project Overview
                      </h4>
                      <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    {selectedProject.tech?.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase text-slate-500 font-mono tracking-widest font-bold">
                          Technologies Integrated
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map((tech, index) => (
                            <span
                              key={`${tech}-${index}`}
                              className="
                            px-3
                            py-1
                            bg-slate-900/90
=======
        {selectedProject && (

          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              p-4
              sm:p-6
              overflow-y-auto
            "
          >

            {/* Backdrop */}

            <div
              className="
                fixed
                inset-0
                bg-black/80
                backdrop-blur-md
              "
              onClick={() =>
                setSelectedProject(null)
              }
            />

            {/* Modal */}

            <div
              className="
                relative
                w-full
                max-w-3xl
                bg-slate-950
                border
                border-slate-800
                rounded-2xl
                overflow-hidden
                shadow-2xl
                max-h-[85vh]
                overflow-y-auto
                text-left
              "
            >

              {/* Close */}

              <button
                type="button"
                onClick={() =>
                  setSelectedProject(null)
                }
                className="
                  absolute
                  top-4
                  right-4
                  z-10
                  w-9
                  h-9
                  rounded-full
                  bg-slate-900/90
                  border
                  border-slate-800
                  text-slate-400
                  hover:text-white
                  flex
                  items-center
                  justify-center
                  transition-colors
                  shadow-lg
                "
              >
                <i className="fas fa-times" />
              </button>

              {/* =================================================
                  MODAL BANNER
              ================================================= */}

              <div
                className="
                  relative
                  aspect-[16/9]
                  w-full
                  bg-slate-950
                "
              >

                {selectedProject.image ? (

                  <img
                    src={selectedProject.image}
                    alt={
                      selectedProject.title
                    }
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                    referrerPolicy="no-referrer"
                  />

                ) : (

                  <div
                    className="
                      w-full
                      h-full
                      flex
                      items-center
                      justify-center
                      text-slate-600
                    "
                  >
                    <i className="fas fa-image text-5xl" />
                  </div>

                )}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-slate-950
                    to-transparent
                  "
                />

                <div
                  className="
                    absolute
                    bottom-6
                    left-6
                    right-6
                  "
                >

                  <span
                    className="
                      bg-cyan-500/20
                      text-cyan-400
                      text-[10px]
                      font-mono
                      font-bold
                      px-2.5
                      py-1
                      rounded
                      uppercase
                      tracking-wider
                      border
                      border-cyan-500/20
                    "
                  >
                    {selectedProject.category}
                  </span>

                  <h3
                    className="
                      text-2xl
                      sm:text-3xl
                      font-black
                      text-white
                      mt-2
                      leading-none
                      font-sans
                    "
                  >
                    {selectedProject.title}
                  </h3>

                </div>

              </div>

              {/* =================================================
                  MODAL CONTENT
              ================================================= */}

              <div
                className="
                  p-6
                  sm:p-8
                  space-y-6
                "
              >

                {/* Overview */}

                <div className="space-y-2">

                  <h4
                    className="
                      text-xs
                      uppercase
                      text-slate-500
                      font-mono
                      tracking-widest
                      font-bold
                    "
                  >
                    Project Overview
                  </h4>

                  <p
                    className="
                      text-slate-300
                      leading-relaxed
                      text-sm
                    "
                  >
                    {selectedProject.description}
                  </p>

                </div>

                {/* Technologies */}

                <div className="space-y-2">

                  <h4
                    className="
                      text-xs
                      uppercase
                      text-slate-500
                      font-mono
                      tracking-widest
                      font-bold
                    "
                  >
                    Technologies Integrated
                  </h4>

                  <div
                    className="
                      flex
                      flex-wrap
                      gap-2
                    "
                  >

                    {selectedProject.tech.map(
                      (tech, index) => (

                        <span
                          key={`${tech}-${index}`}
                          className="
                            px-3
                            py-1
                            bg-slate-900
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
                            border
                            border-slate-800
                            text-cyan-400
                            text-xs
                            font-mono
                            font-semibold
                            rounded-lg
<<<<<<< HEAD
                            shadow-inner
                          "
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    {selectedProject.features?.length > 0 && (
                      <div className="space-y-3 bg-slate-900/30 p-5 rounded-xl border border-slate-800/60 backdrop-blur-sm">
                        <h4 className="text-xs uppercase text-slate-400 font-mono tracking-widest font-bold">
                          Core Features Implemented
                        </h4>
                        <ul className="grid grid-cols-1 gap-2.5 text-slate-300 text-sm">
                          {selectedProject.features.map((feature, index) => (
                            <li key={index} className="flex gap-3 items-start text-xs sm:text-sm">
                              <i className="fas fa-check-circle text-cyan-400 text-sm mt-0.5 shrink-0" />
                              <span className="leading-snug">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Challenges & Results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProject.challenges && (
                        <div className="p-4 bg-red-950/10 border border-red-900/20 rounded-xl space-y-1.5">
                          <h5 className="text-xs font-bold uppercase font-mono text-red-400 tracking-wider flex items-center gap-2">
                            <i className="fas fa-exclamation-triangle" />
                            Engineering Challenge
                          </h5>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {selectedProject.challenges}
                          </p>
                        </div>
                      )}

                      {selectedProject.results && (
                        <div className="p-4 bg-teal-950/10 border border-teal-900/20 rounded-xl space-y-1.5">
                          <h5 className="text-xs font-bold uppercase font-mono text-teal-400 tracking-wider flex items-center gap-2">
                            <i className="fas fa-chart-line" />
                            Business Outcome
                          </h5>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {selectedProject.results}
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

                {/* MODAL FOOTER (Sticky at bottom) */}
                <div className="p-4 sm:px-8 border-t border-slate-800/80 bg-slate-950/90 flex items-center justify-between gap-4 shrink-0 backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="
                  px-4
                  py-2
                  bg-slate-900
                  hover:bg-slate-800
                  border
                  border-slate-800
                  rounded-lg
                  text-xs
                  font-semibold
                  text-slate-400
                  hover:text-white
                  transition-colors
                "
                  >
                    Close
                  </button>

                  <div className="flex items-center gap-3">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="
=======
                          "
                        >
                          {tech}
                        </span>

                      )
                    )}

                  </div>

                </div>

                {/* Features */}

                {selectedProject.features.length > 0 && (

                  <div
                    className="
                      space-y-3
                      bg-slate-900/40
                      p-5
                      rounded-xl
                      border
                      border-slate-900
                    "
                  >

                    <h4
                      className="
                        text-xs
                        uppercase
                        text-slate-500
                        font-mono
                        tracking-widest
                        font-semibold
                      "
                    >
                      Core Features Implemented
                    </h4>

                    <ul
                      className="
                        space-y-2
                        text-slate-300
                        text-sm
                      "
                    >

                      {selectedProject.features.map(
                        (feature, index) => (

                          <li
                            key={index}
                            className="
                              flex
                              gap-2
                              items-start
                              text-xs
                            "
                          >

                            <i
                              className="
                                fas
                                fa-check-circle
                                text-cyan-400
                                text-xs
                                mt-1
                                shrink-0
                              "
                            />

                            <span>
                              {feature}
                            </span>

                          </li>

                        )
                      )}

                    </ul>

                  </div>

                )}

                {/* Challenges & Results */}

                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-4
                  "
                >

                  <div
                    className="
                      p-4
                      bg-slate-900/20
                      border
                      border-slate-900
                      rounded-xl
                      space-y-1
                    "
                  >

                    <h5
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        font-mono
                        text-red-400
                      "
                    >
                      Engineering Challenge
                    </h5>

                    <p
                      className="
                        text-xs
                        text-slate-400
                        leading-relaxed
                      "
                    >
                      {selectedProject.challenges}
                    </p>

                  </div>

                  <div
                    className="
                      p-4
                      bg-slate-900/20
                      border
                      border-slate-900
                      rounded-xl
                      space-y-1
                    "
                  >

                    <h5
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        font-mono
                        text-teal-400
                      "
                    >
                      Business Outcome
                    </h5>

                    <p
                      className="
                        text-xs
                        text-slate-400
                        leading-relaxed
                      "
                    >
                      {selectedProject.results}
                    </p>

                  </div>

                </div>

                {/* =================================================
                    MODAL FOOTER
                ================================================= */}

                <div
                  className="
                    pt-4
                    border-t
                    border-slate-900
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedProject(null)
                    }
                    className="
>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
                      px-4
                      py-2
                      bg-slate-900
                      hover:bg-slate-800
                      border
                      border-slate-800
                      rounded-lg
                      text-xs
<<<<<<< HEAD
                      font-bold
                      text-slate-200
                      inline-flex
                      items-center
                      gap-2
                      transition-colors
                    "
                      >
                        <i className="fab fa-github text-sm" />
                        <span>Repository</span>
                      </a>
                    )}

                    {selectedProject.demo && (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="
                      px-4
                      py-2
                      bg-gradient-to-r
                      from-cyan-500
                      to-blue-600
                      hover:from-cyan-400
                      hover:to-blue-500
                      rounded-lg
                      text-xs
                      font-bold
                      text-white
                      inline-flex
                      items-center
                      gap-2
                      shadow-lg
                      shadow-cyan-500/20
                      transition-all
                    "
                      >
                        <i className="fas fa-external-link-alt text-xs" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
=======
                      font-semibold
                      text-slate-400
                      hover:text-white
                    "
                  >
                    Close
                  </button>

                  <div
                    className="
                      flex
                      gap-3
                    "
                  >

                    {selectedProject.github && (

                      <a
                        href={
                          selectedProject.github
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="
                          px-4
                          py-2
                          bg-slate-950
                          hover:bg-slate-900
                          border
                          border-slate-800
                          rounded-lg
                          text-xs
                          font-bold
                          text-slate-300
                          inline-flex
                          items-center
                          gap-1.5
                        "
                      >
                        <i className="fab fa-github" />
                        Repository Code
                      </a>

                    )}

                    {selectedProject.demo && (

                      <a
                        href={
                          selectedProject.demo
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="
                          px-4
                          py-2
                          bg-cyan-500
                          hover:bg-cyan-400
                          rounded-lg
                          text-xs
                          font-bold
                          text-white
                          inline-flex
                          items-center
                          gap-1.5
                          shadow-lg
                          shadow-cyan-500/10
                        "
                      >
                        <i className="fas fa-external-link-alt" />
                        External Demo
                      </a>

                    )}

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

>>>>>>> e0b66196c289ca26206af72a55e67959e28008a7
    </section>
  );
}
