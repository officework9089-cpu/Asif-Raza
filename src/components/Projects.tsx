import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@//admin/lib/supabase";
import { AnimatePresence, motion } from "motion/react";

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

const PROJECTS_BUCKET = "projects";
const CARD_GAP = 32;
const SCROLL_SPEED = 40;

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
            {project.description}
          </p>

          {project.tech.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tech.map((tech, index) => (
                <span
                  key={`${project.id}-${tech}-${index}`}
                  className="rounded-lg bg-slate-800/80 px-2.5 py-1 text-xs font-semibold text-cyan-400/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-900/60 p-4 sm:p-5 md:p-6 md:pt-4">
        <button
          type="button"
          onClick={() => {
            if (isDragging?.current) return;
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
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                if (isDragging?.current) e.preventDefault();
              }}
              className="
                rounded-lg bg-slate-950 p-2 text-sm text-slate-400
                transition-colors hover:bg-slate-900 hover:text-white
              "
              title="View GitHub Repository"
              aria-label={`View ${project.title} GitHub repository`}
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
                if (isDragging?.current) e.preventDefault();
              }}
              className="
                rounded-lg bg-cyan-500/10 p-2 text-sm text-cyan-400
                transition-colors hover:bg-cyan-500/40 hover:text-white
              "
              title="View Live Demo"
              aria-label={`View ${project.title} live demo`}
            >
              <i className="fas fa-globe" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
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

    void fetchProjects();
  }, []);

  /* =======================================================
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
  }, [projects]);

  /* =======================================================
     FILTER PROJECTS
  ======================================================= */

  const filteredProjects = useMemo(() => {
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

    let mounted = true;

    const animate = (time: number) => {
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

  /* =======================================================
     POINTER DOWN
  ======================================================= */

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
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
      e.button !== 0
    ) {
      return;
    }

    isDragging.current = true;
    hasDragged.current = false;

    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;

    lastTimeRef.current = 0;

    track.style.cursor = "grabbing";

    track.setPointerCapture(e.pointerId);
  };



  /* =======================================================
     POINTER MOVE
  ======================================================= */

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
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
  };

  /* =======================================================
     POINTER UP
  ======================================================= */

  const handlePointerUp = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
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
  };

  /* =======================================================
     POINTER CANCEL
  ======================================================= */

  const handlePointerCancel = () => {
    isDragging.current = false;
    lastTimeRef.current = 0;

    if (trackRef.current) {
      trackRef.current.style.cursor = "grab";
    }

    setTimeout(() => {
      hasDragged.current = false;
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
     RETURN
  ======================================================= */

  return (
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
              Projects
            </span>
          </h2>

          <div className="mx-auto mt-4 h-1 w-12 rounded bg-cyan-400" />

          <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
            Enterprise solutions, customized publishing ecosystems,
            and responsive web systems delivered with optimized
            parameters.
          </p>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mx-auto mb-8 max-w-6xl rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* =================================================
            FILTER TOOLBAR
        ================================================= */}

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
                </button>
              ))}
            </div>

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

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3.5 text-xs text-slate-400 transition-colors hover:text-slate-200"
                aria-label="Clear search"
              >
                <i className="fas fa-times-circle" />
              </button>
            )}
          </div>
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
          </div>

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================= */

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
        )}

        {/* =================================================
            PROJECT DETAIL MODAL
        ================================================= */}

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
                            border
                            border-slate-800
                            text-cyan-400
                            text-xs
                            font-mono
                            font-semibold
                            rounded-lg
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
                      px-4
                      py-2
                      bg-slate-900
                      hover:bg-slate-800
                      border
                      border-slate-800
                      rounded-lg
                      text-xs
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
    </section>
  );
}
