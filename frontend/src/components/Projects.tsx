import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Handles logo with clean React-state fallback, supports separate dark/light URLs
function ProjectLogo({ logoUrl, darkLogoUrl, title, size = 'card' }: { logoUrl?: string; darkLogoUrl?: string; title: string; size?: 'card' | 'modal' }) {
  const [imgError, setImgError] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Larger, more professional sizing
  const sizeClass = size === 'modal' ? 'w-36 h-18 md:w-48 md:h-24' : 'w-36 h-16 md:w-44 md:h-20';

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const resolvedUrl = isDark && darkLogoUrl ? darkLogoUrl : logoUrl;

  useEffect(() => {
    setImgError(false);
  }, [resolvedUrl]);

  if (resolvedUrl && !imgError) {
    return (
      <img
        src={resolvedUrl}
        alt={title}
        className={`${sizeClass} object-contain transition-all duration-500`}
        onError={() => setImgError(true)}
      />
    );
  }
  // Fallback: first letter initial
  return (
    <div className={`${sizeClass} flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple/30 to-brand-cyan/30`}>
      <span className={`font-black text-brand-cyan ${size === 'modal' ? 'text-6xl' : 'text-4xl'}`}>
        {title.charAt(0)}
      </span>
    </div>
  );
}

interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  logoUrl?: string;       // Used in light mode (or both if darkLogoUrl not set)
  darkLogoUrl?: string;   // Used only in dark mode
  githubLink?: string;
  demoLink?: string;
}

const MOCK_PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Captain Up',
    shortDescription: 'Tested a gamification and loyalty platform featuring challenges, rewards, leaderboards, missions, and user engagement systems across web and mobile applications.',
    longDescription: 'Worked on quality assurance for Captain Up, a gamification and customer engagement platform designed to improve user retention and loyalty through rewards, challenges, tournaments, leaderboards, and personalized missions. Responsibilities included validating user flows, verifying gamification features, performing functional and regression testing, reporting defects, and ensuring a seamless user experience across multiple devices and browsers. Collaborated with developers, designers, and product teams to verify feature requirements, test new releases, and maintain platform stability and quality throughout the development lifecycle.',
    techStack: ['QA Testing', 'Functional Testing', 'Regression Testing', 'Bug Reporting', 'Jira'],
    logoUrl: '/projects/captainup-light.svg',
    darkLogoUrl: '/projects/captainup-dark.svg',
    githubLink: '#',
    demoLink: 'https://captainup.com/'
  },
  {
    id: 'p2',
    title: 'Challenge Entertainment',
    shortDescription: 'Tested an interactive entertainment and event management platform featuring trivia games, live events, user engagement, and venue-based experiences.',
    longDescription: 'Challenge Entertainment is a mobile app built for trivia enthusiasts and National Trivia League (NTL) players, offering a seamless way to discover trivia events, track leaderboard rankings, manage game schedules, and connect with teammates. The app enhances the competitive trivia experience by helping players stay informed, organized, and engaged through real-time updates, event notifications, and team collaboration features.',
    techStack: ['QA Testing', 'Functional Testing', 'Regression Testing', 'Cross-Browser Testing', 'Bug Tracking'],
    logoUrl: '/projects/challenge-entertainment.png',
    githubLink: '#'
  },
  {
    id: 'p3',
    title: 'Selloctave',
    shortDescription: 'Tested a cloud-based in-store music management platform featuring playlist scheduling, announcements, timezone support, and retail audio automation.',
    longDescription: 'Selloctave is a music management platform designed for public spaces such as supermarkets, malls, retail stores, and commercial environments. It helps businesses create the perfect atmosphere with advanced music scheduling, playlist management, voice announcements, break-time silence control, and global timezone support. The platform ensures uninterrupted music playback while allowing seamless customization for promotions, events, and brand-focused customer experiences.',
    techStack: ['QA Testing', 'Functional Testing', 'Regression Testing', 'Cross-Browser Testing', 'Bug Tracking'],
    logoUrl: '/projects/selloctave.png',
    githubLink: '#',
    demoLink: '#'
  },
  {
    id: 'p4',
    title: 'Client Notes',
    shortDescription: 'Tested an AI-powered client management platform designed for hairstylists to manage client history, appointments, reminders, and business growth.',
    longDescription: 'Worked on quality assurance for Client Notes, an AI-driven platform that helps hairstylists organize client information, treatment history, voice notes, photo records, rebooking reminders, and personalized recommendations. Performed functional, UI, regression, and cross-browser testing across client management, AI-generated summaries, appointment tracking, reminder systems, and user workflows. Validated feature requirements, reported defects, verified fixes, and collaborated with development teams to ensure a reliable and user-friendly experience.',
    techStack: ['QA Testing', 'Functional Testing', 'Regression Testing', 'Cross-Browser Testing', 'Bug Tracking'],
    logoUrl: '/projects/clientnotes-light.png',
    darkLogoUrl: '/projects/clientnotes-dark.png',
    githubLink: '#'
  },
  {
    id: 'p5',
    title: 'DateCheck',
    shortDescription: 'Tested an AI-powered dating profile verification platform designed to help users identify fake profiles, verify identities, and improve online dating safety.',
    longDescription: 'Worked on quality assurance for DateCheck, a platform that uses AI to analyze dating profiles and help users detect potential catfishing, fake accounts, and identity mismatches. Performed functional, UI, regression, and cross-browser testing across profile analysis, identity verification, social profile matching, reporting, and user account workflows. Validated feature requirements, reported defects, verified fixes, and collaborated with development teams to ensure a secure, accurate, and user-friendly experience.',
    techStack: ['QA Testing', 'Functional Testing', 'Regression Testing', 'Cross-Browser Testing', 'Bug Tracking'],
    logoUrl: '/projects/DateCheck.png',
    githubLink: '#'
  },
  {
    id: 'p6',
    title: 'Gitarth Ganga',
    shortDescription: 'Tested a digital research and knowledge management platform focused on scriptural content, subject dictionaries, digital archives, and educational resources.',
    longDescription: 'Worked on quality assurance for Gitarth Ganga, a research institute and digital knowledge platform dedicated to organizing and preserving scriptural and educational content. Performed functional, UI, regression, and cross-browser testing across content management, research resources, digital archives, subject dictionaries, book catalogs, search functionality, and user workflows. Validated feature requirements, reported defects, verified fixes, and collaborated with development teams to ensure a reliable, accessible, and user-friendly experience across web platforms.',
    techStack: ['QA Testing', 'Functional Testing', 'Regression Testing', 'Cross-Browser Testing', 'Bug Tracking'],
    logoUrl: '/projects/gg_logo.png',
  },
  {
    id: 'p7',
    title: 'AutoAviso',
    shortDescription: 'ested a multilingual automotive marketplace platform enabling users to buy, sell, compare, and finance vehicles through web and mobile applications.',
    longDescription: 'Worked on quality assurance for AutoAviso, a cloud-hosted automotive marketplace designed for English and Spanish-speaking users in the United States. Performed functional, UI, regression, and cross-browser testing across vehicle search, comparison tools, dealer listings, private vehicle postings, user account management, and auto loan calculation features. Validated multilingual content, user workflows, and mobile responsiveness while identifying and tracking defects. Collaborated with development teams to ensure a reliable, user-friendly, and high-quality experience across web and mobile platforms.',
    techStack: ['QA Testing', 'Functional Testing', 'Regression Testing', 'Cross-Browser Testing', 'Bug Tracking'],
    logoUrl: '/projects/auto-aviso.png',
    githubLink: '#',
    demoLink: '#'
  }

];

export default function Projects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobileDevice(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const modalVariants: any = isMobileDevice
    ? {
      hidden: {
        opacity: 0,
        scale: 0.95,
        y: 15
      },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.25,
          ease: "easeOut"
        }
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        y: 15,
        transition: {
          duration: 0.2,
          ease: "easeIn"
        }
      }
    }
    : {
      hidden: {
        opacity: 0,
        scale: 0.95,
        y: -50
      },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 300
        }
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        y: 50,
        transition: {
          duration: 0.25,
          ease: "easeInOut"
        }
      }
    };

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section id="projects" className="py-32 lg:py-40 relative overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-50 mb-4">
              Featured <span className="text-brand-cyan">Projects</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
              A robust portfolio of scalable QA architectures and automation solutions. Swipe through to discover case studies.
            </p>
          </div>

          {/* Navigation Buttons for Carousel */}
          <div className="flex gap-4">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full border transition-all backdrop-blur-sm z-10 shadow-sm ${canScrollLeft
                ? "border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:bg-brand-cyan hover:text-white hover:border-brand-cyan dark:hover:bg-brand-cyan cursor-pointer"
                : "border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-50"
                }`}
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`p-3 rounded-full border transition-all backdrop-blur-sm z-10 shadow-sm ${canScrollRight
                ? "border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:bg-brand-cyan hover:text-white hover:border-brand-cyan dark:hover:bg-brand-cyan cursor-pointer"
                : "border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-50"
                }`}
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </motion.div>

        {/* Carousel: full-bleed scroll so no card is ever clipped */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 hide-scrollbar -mx-6 md:-mx-12 px-6 md:px-12 pr-12 md:pr-24"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {MOCK_PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 30 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="snap-center shrink-0 w-[85vw] md:w-[24rem] lg:w-[28rem] glass-card flex flex-col overflow-hidden shadow-lg cursor-pointer bg-white dark:bg-slate-900/40 relative group border border-slate-200 dark:border-slate-800 hover:border-brand-cyan/50 dark:hover:border-brand-cyan/50 transition-all duration-300 h-[28rem]"
              onClick={() => setSelectedProject(project)}
            >
              {/* Card visual header */}
              <div className="h-48 w-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center overflow-hidden relative border-b border-slate-200 dark:border-slate-800/60">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-brand-cyan/10 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="z-10 group-hover:scale-110 transition-transform duration-500">
                  <ProjectLogo logoUrl={project.logoUrl} darkLogoUrl={project.darkLogoUrl} title={project.title} size="card" />
                </div>
                {/* Hover overlay text */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <div className="bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-brand-cyan px-6 py-3 rounded-full font-bold text-sm translate-y-8 group-hover:translate-y-0 transition-all duration-300 shadow-xl flex items-center gap-2">
                    View Details
                  </div>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-brand-cyan transition-colors line-clamp-1">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Tech tags - limit to 3 strictly for card view */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs font-semibold text-brand-cyan bg-brand-cyan/5 dark:bg-brand-cyan/10 border border-brand-cyan/20 px-2.5 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm md:backdrop-blur-md z-[100] grid place-items-center p-3 md:p-12 overflow-y-auto"
            >
              {/* Modal Card */}
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-4xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden relative my-auto flex flex-col md:flex-row max-h-[90vh]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full transition-colors z-20"
                >
                  <X size={20} />
                </button>

                {/* Left side: Visuals */}
                <div className="w-full md:w-[40%] bg-gradient-to-br from-brand-purple/20 to-brand-cyan/20 flex flex-col items-center justify-center p-5 md:p-12 relative overflow-hidden h-44 md:h-auto shrink-0">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="absolute w-40 h-40 rounded-full bg-brand-cyan/10 blur-2xl z-0" />
                  <div className="relative z-10 bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl p-3 md:p-5 shadow-2xl border border-white/20 dark:border-slate-700">
                    <ProjectLogo logoUrl={selectedProject.logoUrl} darkLogoUrl={selectedProject.darkLogoUrl} title={selectedProject.title} size={isMobileDevice ? 'card' : 'modal'} />
                  </div>
                  <div className="mt-4 text-center z-10">
                    <div className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                      {selectedProject.title}
                    </div>
                  </div>
                </div>

                {/* Right side: Information */}
                <div className="w-full md:w-[60%] p-5 md:p-12 overflow-y-auto hide-scrollbar flex flex-col">
                  <h2 className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4 pr-10">
                    {selectedProject.title}
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                    {selectedProject.techStack.map((tech) => (
                      <span key={tech} className="text-xs md:text-sm font-semibold text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-2.5 md:px-3 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">Project Overview</h4>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-5 md:mb-6">
                    {selectedProject.longDescription}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
