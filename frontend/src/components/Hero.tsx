import { motion } from 'framer-motion';
import { Bug } from 'lucide-react';
import { useEffect, useState } from 'react';

const StatCounter = ({ end, label, delay = 0, suffix = "+" }: { end: number; label: string; delay?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative pl-6 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-8 before:bg-brand-purple/30 before:rounded-full"
    >
      <div className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-50 tracking-tight">
        {count}{suffix}
      </div>
      <div className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-[0.2em] leading-tight">
        {label}
      </div>
    </motion.div>
  );
};

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-slate-50 leading-tight mb-2 tracking-tight">
            Precision in <span className="text-brand-purple">Quality</span>
          </h1>
          <h2 className="text-lg md:text-xl font-bold text-[#5c00e6]/70 mb-8 uppercase tracking-[0.2em]">
            Excellence in Engineering
          </h2>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
            Focused on delivering reliable software quality through detailed testing, smooth user experiences, and precision-driven validation across modern applications.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">
            <motion.a
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              href="https://www.google.com/?zx=1778657335079"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-[#5c00e6] to-[#7c22ff] text-white font-bold transition-all flex items-center gap-3 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
            >
              <span className="relative z-10">Download CV</span>
              <svg
                className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              href="/#projects"
              className="px-8 py-4 rounded-xl glass-nav border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            >
              View Projects
            </motion.a>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-14 pt-10 border-t border-slate-200/60 dark:border-slate-800/60">
            <StatCounter end={2} label="Years Experience" delay={0.2} />
            <StatCounter end={20} label="Projects Completed" delay={0.3} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden md:block"
        >
          {/* Illustration Container */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-full aspect-square flex items-center justify-center relative"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/10 to-brand-purple/10 rounded-full blur-3xl" />
              <Bug className="text-brand-purple/40 relative z-10 animate-float" size={300} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
                <h2 className="text-3xl font-black text-slate-800/80 dark:text-slate-100/80 tracking-widest uppercase">Quality<br />Assurance</h2>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
