import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const toggle = () => {
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
        setIsDark(false);
      } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
        setIsDark(true);
      }
    };

    if (!(document as any).startViewTransition) {
      toggle();
      return;
    }

    (document as any).startViewTransition(() => {
      toggle();
    });
  };

  // If we are on a project detail page, hash links need to act differently or we point to generic paths.
  // We'll use standard /#hash paths because React Router handles them natively from Home, and from details it will redirect back.
  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Journey', href: '/#resume' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 pointer-events-none ${isScrolled ? 'pt-4 px-4 sm:px-6' : 'pt-0 px-0'
      }`}>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative w-full transition-all duration-500 pointer-events-auto ${isScrolled
          ? 'max-w-5xl glass-nav py-3 px-6 sm:px-8 shadow-2xl rounded-full translate-y-2'
          : 'max-w-7xl bg-transparent py-6 px-6 sm:px-12 border border-transparent rounded-none'
          }`}
      >
        <div className="flex justify-between items-center">
          <Link
            to="/"
            onClick={(e) => {
              if (window.location.pathname === '/' || window.location.pathname === '') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.pushState('', document.title, window.location.pathname);
              }
            }}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl font-black text-[#5c00e6] tracking-tighter group-hover:scale-105 transition-transform duration-300">
              Krunal
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center bg-white/0 px-2 rounded-full">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors group py-2"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-cyan to-brand-purple group-hover:w-full transition-all duration-300 rounded-full"></span>
              </a>
            ))}

            <div className="flex items-center gap-4 pl-6 ml-2 border-l border-slate-300 dark:border-slate-700">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-brand-cyan/50 dark:hover:border-brand-cyan/50 transition-all shadow-sm overflow-hidden"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={isDark ? 'sun' : 'moon'}
                    initial={{ y: 22, opacity: 0, rotate: -45, scale: 0.7 }}
                    animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ y: 22, opacity: 0, rotate: 45, scale: 0.7 }}
                    transition={{ duration: 0.3, ease: 'backOut' }}
                    className="flex items-center justify-center"
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              <a
                href="/#contact"
                className="px-6 py-2.5 text-sm font-bold bg-gradient-to-r from-brand-cyan to-brand-purple text-white rounded-full hover:shadow-lg hover:shadow-brand-purple/30 transition-all hover:-translate-y-[2px]"
              >
                Hire Me
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all overflow-hidden"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={isDark ? 'sun' : 'moon'}
                  initial={{ y: 22, opacity: 0, rotate: -45, scale: 0.7 }}
                  animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ y: 22, opacity: 0, rotate: 45, scale: 0.7 }}
                  transition={{ duration: 0.3, ease: 'backOut' }}
                  className="flex items-center justify-center"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
            <button
              className="text-slate-700 dark:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? 'close' : 'menu'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`md:hidden absolute left-0 right-0 bg-white/95 dark:bg-zinc-950/95 border border-slate-200/80 dark:border-zinc-800/80 backdrop-blur-2xl p-4 flex flex-col gap-2 shadow-2xl ${isScrolled ? 'top-[calc(100%+12px)] rounded-3xl' : 'top-full rounded-2xl mx-4 mt-2'
                }`}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-cyan dark:hover:text-brand-cyan py-3 px-4 rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 pb-1 px-4 mt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex justify-center">
                <a
                  href="/#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center px-6 py-3 text-sm font-bold bg-gradient-to-r from-brand-cyan to-brand-purple text-white rounded-full shadow-md shadow-brand-purple/20"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
