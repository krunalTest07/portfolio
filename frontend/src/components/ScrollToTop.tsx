import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-[calc(4rem+16px)] right-4 sm:bottom-24 sm:right-8 z-[60] flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/20 dark:bg-slate-800/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-lg text-brand-purple dark:text-brand-cyan hover:bg-white/30 dark:hover:bg-slate-800/60 transition-colors group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce-short" />
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-brand-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
