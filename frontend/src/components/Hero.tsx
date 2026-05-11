import { motion } from 'framer-motion';
import { Bug } from 'lucide-react';
import { useEffect, useState } from 'react';

const StatCounter = ({ end, label, delay = 0 }: { end: number; label: string; delay?: number }) => {
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
      className="flex flex-col items-center md:items-start"
    >
      <span className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-50 leading-none">
        {count}+
      </span>
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-wider">
        {label}
      </span>
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
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 dark:text-slate-50 leading-tight mb-4">
            Hi all, I'm Krunal <span className="inline-block animate-wave">👋</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
            A passionate QA Automation Engineer 🚀 having an experience of building robust testing suites with modern tools like Playwright and Selenium.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-8">
            <motion.a
              whileHover={{ scale: 1.05, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="px-10 py-4 rounded-2xl bg-[#5c00e6] text-white font-bold transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20"
            >
              Download CV
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              href="/#projects"
              className="px-10 py-4 rounded-2xl border-2 border-brand-purple/30 text-brand-purple font-bold transition-all shadow-md"
            >
              Projects
            </motion.a>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-10 border-t border-slate-200 dark:border-slate-800">
            <StatCounter end={2} label="Years Experience" delay={0.2} />
            <StatCounter end={8} label="Projects Completed" delay={0.3} />
            <StatCounter end={6} label="Happy Clients" delay={0.4} />
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
                  <h2 className="text-3xl font-black text-slate-800/80 dark:text-slate-100/80 tracking-widest uppercase">Quality<br/>Assurance</h2>
                </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
