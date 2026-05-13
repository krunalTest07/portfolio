import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

interface ExperienceItem {
  _id: string;
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
}

const educationData = [
  {
    institution: "GLS University",
    duration: "2022 - 2024",
    degree: "Master of Computer Application",
    description: "Specialized in software development, AI/ML, and cloud computing. Developed real-world projects, including AI-powered applications and full-stack web solutions.",
    location: "Ahmedabad, Gujarat"
  },
  {
    institution: "Gujarat University",
    duration: "2019 - 2022",
    degree: "Bachelor of Computer Application",
    description: "Laid a strong foundation in programming, databases, and web development. Gained hands-on experience in Python, SQL, and front-end technologies.",
    location: "Ahmedabad, Gujarat"
  }
];

export default function Resume() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/experience')
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching experience data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section id="resume" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-purple/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-slate-50 mb-6 uppercase tracking-tight">
            Professional <span className="text-brand-purple">Journey</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            A journey of continuous learning, professional growth, and technical excellence.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">

          {/* Experience Sub-section */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 rounded-2xl bg-brand-purple/10 text-brand-purple shadow-inner">
                <Briefcase size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight leading-none mb-1">
                  Experience
                </h3>
                <div className="h-1 w-12 bg-brand-purple rounded-full" />
              </div>
            </div>

            <div className="relative border-l-2 border-slate-200 dark:border-slate-800/50 ml-6 pl-8 md:pl-10 space-y-12">
              <AnimatePresence mode="wait">
                {loading ? (
                  [1, 2].map(n => (
                    <div key={n} className="glass-card h-40 animate-pulse bg-slate-100 dark:bg-slate-800/20" />
                  ))
                ) : (
                  experiences.map((exp, idx) => (
                    <motion.div
                      key={exp._id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="relative"
                    >
                      <div className="absolute w-5 h-5 bg-white dark:bg-slate-900 border-4 border-brand-purple rounded-full -left-[42.5px] md:-left-[52.5px] top-1.5 z-10 shadow-lg shadow-brand-purple/20" />

                      <div className="glass-card p-8 hover:border-brand-purple/30 transition-all duration-500 group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                          <div>
                            <h4 className="text-2xl font-black text-slate-800 dark:text-white group-hover:text-brand-purple transition-colors">
                              {exp.role}
                            </h4>
                            <p className="text-brand-cyan font-bold text-lg mt-1">{exp.company}</p>
                          </div>
                          <span className="self-start md:self-center text-sm font-bold px-5 py-2 bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            {exp.duration}
                          </span>
                        </div>
                        <ul className="space-y-4">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="text-base text-slate-600 dark:text-slate-400 flex gap-3 leading-relaxed">
                              <ChevronRight size={18} className="mt-1 shrink-0 text-brand-purple opacity-70" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Divider with Icon
          <div className="flex items-center gap-4 my-20">
            <div className="h-[2px] grow bg-gradient-to-r from-transparent to-slate-200 dark:to-slate-800" />
            <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" />
            <div className="h-[2px] grow bg-gradient-to-l from-transparent to-slate-200 dark:to-slate-800" />
          </div> */}

          {/* Education Sub-section */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 rounded-2xl bg-brand-cyan/10 text-brand-cyan shadow-inner">
                <GraduationCap size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight leading-none mb-1">
                  Education
                </h3>
                <div className="h-1 w-12 bg-brand-cyan rounded-full" />
              </div>
            </div>

            <div className="relative border-l-2 border-slate-200 dark:border-slate-800/50 ml-6 pl-8 md:pl-10 space-y-12">
              {educationData.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="absolute w-5 h-5 bg-white dark:bg-slate-900 border-4 border-brand-cyan rounded-full -left-[42.5px] md:-left-[52.5px] top-1.5 z-10 shadow-lg shadow-brand-cyan/20" />

                  <div className="glass-card p-8 hover:border-brand-cyan/30 transition-all duration-500 group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <h4 className="text-2xl font-black text-slate-800 dark:text-white group-hover:text-brand-cyan transition-colors">
                          {edu.degree}
                        </h4>
                        <p className="text-brand-purple font-bold text-lg mt-1">{edu.institution}</p>
                      </div>
                      <span className="self-start md:self-center text-sm font-bold px-5 py-2 bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        {edu.duration}
                      </span>
                    </div>
                    <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-6">
                      {edu.description}
                    </p>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest font-bold">
                      <MapPin size={14} className="text-brand-cyan" /> {edu.location}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
