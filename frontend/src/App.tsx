import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Bug } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';
import ChatBot from './components/ChatBot';
import ScrollToTop from './components/ScrollToTop';
import Resume from './components/Resume';
import Footer from './components/Footer';


// We wrap animations in an inner component so we can use useLocation
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <Hero />
            <About />
            <Resume />
            <Skills />
            <Projects />
            <Services />
            <Contact />
          </motion.div>
        } />
        <Route path="/project/:id" element={
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <ProjectDetail />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  // Theme Setup
  useEffect(() => {
    // Default to light theme on first visit (resets after tab close)
    if (!('theme' in sessionStorage)) {
      sessionStorage.theme = 'light';
    }
    const isDark = sessionStorage.theme === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Simulate initial loading
    const timer = setTimeout(() => setInitialLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll progress bar hook
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <Router>
      <div className="relative">
        <AnimatePresence>
          {initialLoading && (
            <motion.div
              key="preloader"
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed inset-0 z-[100] bg-slate-50 dark:bg-dark-bg flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Minimalist QA Scanner */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                {/* Inner Bug Icon */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10 text-brand-purple"
                >
                  <Bug size={48} className="md:w-16 md:h-16" />
                </motion.div>

                {/* Vertical Scanning Laser */}
                <motion.div
                  animate={{ y: [-30, 30, -30] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-12 md:w-20 h-[2px] bg-brand-cyan shadow-[0_0_8px_var(--color-brand-cyan)] z-20"
                ></motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <p className="text-brand-cyan font-mono font-semibold tracking-[0.2em] uppercase text-xs md:text-sm animate-pulse">
                  Loading...
                </p>

                {/* Slim Progress Bar */}
                <div className="w-48 md:w-56 h-[3px] bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {!initialLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            {/* Global Smooth Scroll Progress Bar */}
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple z-[60] origin-left"
              style={{ scaleX }}
            />
            <Navbar />

            <main>
              <AnimatedRoutes />
            </main>

            <Footer />


            <ChatBot />
            <ScrollToTop />
          </motion.div>
        )}
      </div>
    </Router>
  );
}
