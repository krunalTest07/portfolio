import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillItem {
  _id: string;
  name: string;
  category: string;
  level: number;
}

export default function Skills() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
        setLoading(false);
      });
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, SkillItem[]>);

  const categories = Object.keys(groupedSkills);

  return (
    <section id="skills" className="py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-50 mb-4">
            Technical <span className="text-brand-purple">Arsenal</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
            A comprehensive list of automated frameworks, testing methodologies, and analytical tools I leverage to validate high-stakes systems.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
             <motion.div
               key="skeleton"
               exit={{ opacity: 0 }}
               className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
             >
                {[1, 2, 3, 4].map((n) => (
                  <motion.div 
                    key={n}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="glass h-48 bg-slate-200 dark:bg-slate-800/40 rounded-2xl p-6"
                  />
                ))}
             </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {categories.map((category, catIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: catIndex * 0.1 }}
                  className="glass p-6 rounded-2xl bg-white/50 dark:bg-transparent"
                >
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                    {category}
                  </h3>
                  <ul className="flex flex-wrap gap-3">
                    {groupedSkills[category].map((skill, skillIndex) => (
                      <motion.li
                        key={skill._id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1, backgroundColor: "var(--color-brand-cyan)", borderColor: "var(--color-brand-cyan)", color: "#1e293b" }}
                        transition={{ duration: 0.2, delay: (catIndex * 0.05) + (skillIndex * 0.02) }}
                        className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm relative group overflow-hidden cursor-default transition-colors duration-300"
                      >
                        <span className="relative z-10">{skill.name}</span>
                        {/* Progress bar */}
                        <div 
                          className="absolute bottom-0 left-0 h-1 bg-brand-cyan/50 dark:bg-brand-cyan/20 -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
