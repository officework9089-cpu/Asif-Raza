import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { supabase } from "@//admin/lib/supabase";

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
            {project.description}
          </p>

          {project.tech.length > 0 && (
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
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

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
        <button
          type="button"
          onClick={() => {
            if (isDragging?.current) return;

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

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
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
    void fetchProjects();
  }, []);

  /* =======================================================
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

  }, [projects]);

  /* =======================================================
     FILTER PROJECTS
  ======================================================= */

  const filteredProjects = useMemo(() => {

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

    let mounted = true;

    const animate = (time: number) => {

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

  /* =======================================================
     POINTER DOWN
  ======================================================= */

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {

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
      e.button !== 0
    ) {
      return;
    }

    isDragging.current = true;

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

  /* =======================================================
     POINTER MOVE
  ======================================================= */

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {

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
  };

  /* =======================================================
     POINTER UP
  ======================================================= */

  const handlePointerUp = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {

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
  };

  /* =======================================================
     POINTER CANCEL
  ======================================================= */

  const handlePointerCancel = () => {

    isDragging.current = false;

    lastTimeRef.current = 0;

    const track =
      marqueeRef.current;

    if (track) {
      track.style.cursor =
        'grab';
    }

    setTimeout(() => {
      hasDragged.current = false;
    }, 80);
  };

  /* =======================================================
     RETURN
  ======================================================= */

  return (

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
              Projects
            </span>
          </h2>

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

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

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

        )}

        {/* =================================================
            FILTER TOOLBAR
        ================================================= */}

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
                </button>
              ))}
            </div>

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

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="
          absolute right-3 top-3.5
          text-xs text-slate-400
          hover:text-slate-200
          transition-colors
        "
              >
                <i className="fas fa-times-circle" />
              </button>
            )}
          </div>

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

          </div>

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================= */

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

        )}

        {/* =================================================
            PROJECT DETAIL MODAL
        ================================================= */}

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
                            border
                            border-slate-800
                            text-cyan-400
                            text-xs
                            font-mono
                            font-semibold
                            rounded-lg
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

    </section>
  );
}
