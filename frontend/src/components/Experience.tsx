import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperienceItem {
  _id: string;
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
}

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/experience')
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching experience data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section id="experience" className="py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[100px] -z-10 translate-x-1/2" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-50 mb-4">
            Professional <span className="text-brand-purple">Journey</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            A look back at my experience optimizing software quality and preventing defects.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
             <motion.div
               key="skeleton"
               exit={{ opacity: 0 }}
               className="relative pl-8 ml-4 md:ml-0 space-y-12"
             >
                {[1, 2].map(n => (
                  <motion.div 
                    key={n}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="glass-card h-48 bg-slate-200 dark:bg-slate-800/40 rounded-2xl"
                  />
                ))}
             </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative border-l-2 border-slate-300 dark:border-slate-700/50 pl-8 ml-4 md:ml-0"
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="mb-12 relative cursor-default"
                >
                  {/* Timeline Node */}
                  <motion.div 
                    whileHover={{ scale: 1.5 }}
                    className="absolute w-4 h-4 bg-brand-purple rounded-full -left-[41px] top-2 shadow-[0_0_10px_rgba(139,92,246,0.6)] border-2 border-slate-50 dark:border-dark-bg" 
                  />
                  
                  <div className="glass-card p-6 md:p-8 hover:border-brand-purple/50 bg-white/50 dark:bg-transparent transition-colors duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{exp.role}</h3>
                        <p className="text-brand-cyan font-bold text-lg">{exp.company}</p>
                      </div>
                      <span className="inline-block mt-2 md:mt-0 px-4 py-1.5 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {exp.duration}
                      </span>
                    </div>
                    
                    <ul className="list-disc list-outside space-y-3 text-slate-600 dark:text-slate-400 pl-4 mt-6">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
