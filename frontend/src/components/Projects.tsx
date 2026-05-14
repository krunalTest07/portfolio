import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, LayoutTemplate } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  githubLink?: string;
  demoLink?: string;
}

const MOCK_PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Playwright E2E Suite',
    shortDescription: 'Comprehensive end-to-end testing suite for a massive e-commerce platform using Playwright and TypeScript.',
    longDescription: 'This project involved architecting a scalable Playwright framework from scratch. It handles multi-browser testing, automated authentication state management, and parallel execution across 50+ test files. Features custom reporters, DOM snapshot comparisons, and automatic retry configuration to reduce flakiness. Integrated into GitHub actions for CI/CD.',
    techStack: ['Playwright', 'TypeScript', 'GitHub Actions', 'Allure Report'],
    githubLink: '#',
    demoLink: '#'
  },
  {
    id: 'p2',
    title: 'Selenium Data-Driven Framework',
    shortDescription: 'Robust data-driven testing framework built with Java, Selenium WebDriver, and TestNG.',
    longDescription: 'Created a highly modular data-driven framework where test data is sourced dynamically from Excel files using Apache POI. Implemented Page Object Model (POM) to separate test logic from UI mapping, drastically reducing maintenance time. Includes a custom listener for automated screenshot capture upon test failures.',
    techStack: ['Java', 'Selenium WebDriver', 'TestNG', 'Apache POI'],
    githubLink: '#'
  },
  {
    id: 'p3',
    title: 'Cypress Component Testing',
    shortDescription: 'Deep component-level testing and integration testing for a React-based CRM application.',
    longDescription: 'Migrated legacy frontend unit tests into seamless Cypress component tests. Implemented API mocking with Cypress Intercept to test various edge cases like 500 server errors and slow network delays. The suite runs under 2 minutes and runs on every Vercel preview deployment.',
    techStack: ['Cypress', 'React', 'Vercel', 'JavaScript'],
    githubLink: '#',
    demoLink: '#'
  },
  {
    id: 'p4',
    title: 'API Test Suite with RestAssured',
    shortDescription: 'Backend validation framework verifying 100+ endpoints using RestAssured and Java.',
    longDescription: 'Engineered an API testing framework validating complex JSON structures, HTTP security headers, and authentication token rotations. Handled dynamic payloads using POJO serialization and deserialization. Implemented parameterized testing for boundary value analysis on critical payment endpoints.',
    techStack: ['Java', 'RestAssured', 'JUnit 5', 'Jackson'],
    githubLink: '#'
  },
  {
    id: 'p5',
    title: 'Mobile Automations via Appium',
    shortDescription: 'Cross-platform mobile automation for iOS and Android hybrid applications.',
    longDescription: 'Setup local simulators and integrated BrowserStack to run cross-device automation suites. Overcame challenges with hybrid React Native webviews by correctly switching context layers. Managed specific gesture controls such as pull-to-refresh and multi-touch zooming.',
    techStack: ['Appium', 'Python', 'Pytest', 'BrowserStack'],
    githubLink: '#'
  },
  {
    id: 'p6',
    title: 'Gatling Load Testing',
    shortDescription: 'Performance evaluation determining server breaking points during high concurrent loads.',
    longDescription: 'Developed Scala scripts using Gatling to simulate black friday traffic levels. Tested peak loads of up to 10,000 requests per second. Identified severe memory leaks in the Node.js backend by correlating Gatling latency reports with DataDog application metrics.',
    techStack: ['Scala', 'Gatling', 'Performance Testing', 'CI/CD'],
  },
  {
    id: 'p7',
    title: 'Postman Collection CI/CD',
    shortDescription: 'Automated Postman collections executed via Newman inside Jenkins pipelines.',
    longDescription: 'Created extensive behavioral API workflows inside Postman utilizing pre-request scripts and teardown routines. Exported to Newman to run in a headless dockerized Jenkins agent. Built a Slack integration to immediately alert developers of API contract breaks.',
    techStack: ['Postman', 'Newman', 'JavaScript', 'Jenkins'],
    githubLink: '#',
    demoLink: '#'
  },
  {
    id: 'p8',
    title: 'Puppeteer Web Scraper Tests',
    shortDescription: 'Automated functional checks for heavy Canvas-based interactive elements.',
    longDescription: 'Used Puppeteer to automate clicking and verifying highly visual and interactive dashboard charts. Wrote pixel-perfect matching algorithms using Pixelmatch to ensure visual regressions did not creep into the frontend builds.',
    techStack: ['Puppeteer', 'Node.js', 'Pixelmatch', 'Jest'],
    githubLink: '#'
  },
  {
    id: 'p9',
    title: 'K6 Chaos Engineering',
    shortDescription: 'Injecting synthetic failures and load spikes to test system resilience.',
    longDescription: 'Implemented K6 inside a Kubernetes cluster to simulate node failures while simultaneously applying high transactional loads to check graceful degradation of the application gracefully. Integrated results natively into Grafana dashboards.',
    techStack: ['K6', 'Go', 'Kubernetes', 'Grafana'],
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
              <div className={`h-48 w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden relative border-b border-slate-200 dark:border-slate-800/60`}>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-brand-cyan/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <LayoutTemplate size={48} className="text-slate-400 dark:text-slate-600 group-hover:scale-110 group-hover:text-brand-cyan transition-all duration-500 z-10 drop-shadow-sm" />
                
                {/* Hover overlay text */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
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
                <div className="w-full md:w-[40%] bg-gradient-to-br from-brand-purple/20 to-brand-cyan/20 flex flex-col items-center justify-center p-8 md:p-12 relative overflow-hidden h-48 md:h-auto shrink-0">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                   <LayoutTemplate className="w-16 h-16 md:w-20 md:h-20 text-brand-purple dark:text-brand-cyan drop-shadow-xl z-10" />
                   <div className="mt-4 md:mt-8 text-center z-10 hidden md:block">
                      <div className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-widest opacity-80">
                         {selectedProject.title.split(' ')[0]}
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
