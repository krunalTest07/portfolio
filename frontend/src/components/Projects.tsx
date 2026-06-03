import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Handles logo with clean React-state fallback, supports separate dark/light URLs
function ProjectLogo({ logoUrl, darkLogoUrl, title, size = 'card' }: { logoUrl?: string; darkLogoUrl?: string; title: string; size?: 'card' | 'modal' }) {
  const [imgError, setImgError] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const sizeClass = size === 'modal' ? 'w-24 h-24 md:w-32 md:h-32' : 'w-20 h-20';

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    // Watch for theme changes via MutationObserver
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Pick the right URL based on current theme
  const resolvedUrl = isDark && darkLogoUrl ? darkLogoUrl : logoUrl;

  // Reset error state whenever URL changes (e.g. theme switch)
  useEffect(() => {
    setImgError(false);
  }, [resolvedUrl]);

  if (resolvedUrl && !imgError) {
    return (
      <img
        src={resolvedUrl}
        alt={title}
        className={`${sizeClass} object-contain drop-shadow-lg`}
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
    logoUrl: 'https://captainup.com/wp-content/uploads/2025/08/Frame.svg', // light mode logo
    darkLogoUrl: 'https://captainup.com/wp-content/uploads/2025/08/Frame-4.svg',                          // dark mode logo
    githubLink: '#',
    demoLink: 'https://captainup.com/'
  },
  {
    id: 'p2',
    title: 'Selenium Data-Driven Framework',
    shortDescription: 'Robust data-driven testing framework built with Java, Selenium WebDriver, and TestNG.',
    longDescription: 'Created a highly modular data-driven framework where test data is sourced dynamically from Excel files using Apache POI. Implemented Page Object Model (POM) to separate test logic from UI mapping, drastically reducing maintenance time. Includes a custom listener for automated screenshot capture upon test failures.',
    techStack: ['Java', 'Selenium WebDriver', 'TestNG', 'Apache POI'],
    logoUrl: 'https://cdn.simpleicons.org/selenium',
    githubLink: '#'
  },
  {
    id: 'p3',
    title: 'Cypress Component Testing',
    shortDescription: 'Deep component-level testing and integration testing for a React-based CRM application.',
    longDescription: 'Migrated legacy frontend unit tests into seamless Cypress component tests. Implemented API mocking with Cypress Intercept to test various edge cases like 500 server errors and slow network delays. The suite runs under 2 minutes and runs on every Vercel preview deployment.',
    techStack: ['Cypress', 'React', 'Vercel', 'JavaScript'],
    logoUrl: 'https://cdn.simpleicons.org/cypress',
    githubLink: '#',
    demoLink: '#'
  },
  {
    id: 'p4',
    title: 'API Test Suite with RestAssured',
    shortDescription: 'Backend validation framework verifying 100+ endpoints using RestAssured and Java.',
    longDescription: 'Engineered an API testing framework validating complex JSON structures, HTTP security headers, and authentication token rotations. Handled dynamic payloads using POJO serialization and deserialization. Implemented parameterized testing for boundary value analysis on critical payment endpoints.',
    techStack: ['Java', 'RestAssured', 'JUnit 5', 'Jackson'],
    logoUrl: 'https://cdn.simpleicons.org/java',
    githubLink: '#'
  },
  {
    id: 'p5',
    title: 'Mobile Automations via Appium',
    shortDescription: 'Cross-platform mobile automation for iOS and Android hybrid applications.',
    longDescription: 'Setup local simulators and integrated BrowserStack to run cross-device automation suites. Overcame challenges with hybrid React Native webviews by correctly switching context layers. Managed specific gesture controls such as pull-to-refresh and multi-touch zooming.',
    techStack: ['Appium', 'Python', 'Pytest', 'BrowserStack'],
    logoUrl: 'https://cdn.simpleicons.org/appium',
    githubLink: '#'
  },
  {
    id: 'p6',
    title: 'Gatling Load Testing',
    shortDescription: 'Performance evaluation determining server breaking points during high concurrent loads.',
    longDescription: 'Developed Scala scripts using Gatling to simulate black friday traffic levels. Tested peak loads of up to 10,000 requests per second. Identified severe memory leaks in the Node.js backend by correlating Gatling latency reports with DataDog application metrics.',
    techStack: ['Scala', 'Gatling', 'Performance Testing', 'CI/CD'],
    logoUrl: 'https://cdn.simpleicons.org/gatling',
  },
  {
    id: 'p7',
    title: 'Postman Collection CI/CD',
    shortDescription: 'Automated Postman collections executed via Newman inside Jenkins pipelines.',
    longDescription: 'Created extensive behavioral API workflows inside Postman utilizing pre-request scripts and teardown routines. Exported to Newman to run in a headless dockerized Jenkins agent. Built a Slack integration to immediately alert developers of API contract breaks.',
    techStack: ['Postman', 'Newman', 'JavaScript', 'Jenkins'],
    logoUrl: 'https://cdn.simpleicons.org/postman',
    githubLink: '#',
    demoLink: '#'
  },
  {
    id: 'p8',
    title: 'Puppeteer Web Scraper Tests',
    shortDescription: 'Automated functional checks for heavy Canvas-based interactive elements.',
    longDescription: 'Used Puppeteer to automate clicking and verifying highly visual and interactive dashboard charts. Wrote pixel-perfect matching algorithms using Pixelmatch to ensure visual regressions did not creep into the frontend builds.',
    techStack: ['Puppeteer', 'Node.js', 'Pixelmatch', 'Jest'],
    logoUrl: 'https://cdn.simpleicons.org/puppeteer',
    githubLink: '#'
  },
  {
    id: 'p9',
    title: 'K6 Chaos Engineering',
    shortDescription: 'Injecting synthetic failures and load spikes to test system resilience.',
    longDescription: 'Implemented K6 inside a Kubernetes cluster to simulate node failures while simultaneously applying high transactional loads to check graceful degradation of the application gracefully. Integrated results natively into Grafana dashboards.',
    techStack: ['K6', 'Go', 'Kubernetes', 'Grafana'],
    logoUrl: 'https://cdn.simpleicons.org/k6',
    githubLink: '#'
  }
];

export default function Projects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

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

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      // scroll by approximately one card width (card + gap)
      // card is w-80 or w-96 roughly, we'll scroll a fixed pixel amount or offsetWidth
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth : 400;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section id="projects" className="py-32 lg:py-40 relative">
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
              className="p-3 rounded-full border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:bg-brand-cyan hover:text-white hover:border-brand-cyan dark:hover:bg-brand-cyan transition-all backdrop-blur-sm z-10 shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 rounded-full border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:bg-brand-cyan hover:text-white hover:border-brand-cyan dark:hover:bg-brand-cyan transition-all backdrop-blur-sm z-10 shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </motion.div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {MOCK_PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 30 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="snap-start shrink-0 w-[85vw] md:w-[24rem] lg:w-[28rem] glass-card flex flex-col overflow-hidden shadow-lg cursor-pointer bg-white dark:bg-slate-900/40 relative group border border-slate-200 dark:border-slate-800 hover:border-brand-cyan/50 dark:hover:border-brand-cyan/50 transition-all duration-300 h-[28rem]"
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
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] grid place-items-center p-4 md:p-12 overflow-y-auto"
            >
              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative my-auto flex flex-col md:flex-row max-h-[90vh]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full transition-colors z-20"
                >
                  <X size={20} />
                </button>

                {/* Left side: Visuals */}
                <div className="w-full md:w-[40%] bg-gradient-to-br from-brand-purple/20 to-brand-cyan/20 flex flex-col items-center justify-center p-8 md:p-12 relative overflow-hidden h-56 md:h-auto shrink-0">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="absolute w-40 h-40 rounded-full bg-brand-cyan/10 blur-2xl z-0" />
                  <div className="relative z-10 bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-2xl border border-white/20 dark:border-slate-700">
                    <ProjectLogo logoUrl={selectedProject.logoUrl} darkLogoUrl={selectedProject.darkLogoUrl} title={selectedProject.title} size="modal" />
                  </div>
                  <div className="mt-5 text-center z-10">
                    <div className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                      {selectedProject.title}
                    </div>
                  </div>
                </div>

                {/* Right side: Information */}
                <div className="w-full md:w-[60%] p-8 md:p-12 overflow-y-auto hide-scrollbar flex flex-col">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4 pr-10">
                    {selectedProject.title}
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.techStack.map((tech) => (
                      <span key={tech} className="text-sm font-semibold text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">Project Overview</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
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
