import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: number;
}

const skillsData: SkillItem[] = [
  // Quality Assurance
  { id: 's1', name: "Test Planning", category: "Quality Assurance", level: 95 },
  { id: 's2', name: "Test Design", category: "Quality Assurance", level: 90 },
  { id: 's3', name: "API Testing", category: "Quality Assurance", level: 92 },

  // Quality Validation
  { id: 's4', name: "Functional Testing", category: "Quality Validation", level: 95 },
  { id: 's5', name: "Regression Testing", category: "Quality Validation", level: 90 },
  { id: 's6', name: "Cross-Browser Testing", category: "Quality Validation", level: 85 },

  // Product Understanding
  { id: 's7', name: "Requirement Analysis", category: "Product Understanding", level: 90 },
  { id: 's8', name: "Defect Tracking", category: "Product Understanding", level: 95 },
  { id: 's9', name: "Risk Assessment", category: "Product Understanding", level: 80 },

  // Delivery & Collaboration
  { id: 's10', name: "Agile", category: "Delivery & Collaboration", level: 95 },
  { id: 's11', name: "Jira", category: "Delivery & Collaboration", level: 95 },
  { id: 's12', name: "Git", category: "Delivery & Collaboration", level: 85 },
  { id: 's13', name: "CI/CD", category: "Delivery & Collaboration", level: 75 }
];

interface TechTool {
  name: string;
  icon: string;
  darkIcon?: string;
}

const techTools: TechTool[] = [
  { name: "BROWSERSTACK", icon: "/tech/browserstack-light.svg", darkIcon: "/tech/browserstack-dark.svg" },
  { name: "KATALON", icon: "/tech/katalon-light.svg", darkIcon: "/tech/katalon-dark.svg" },
  { name: "JIRA", icon: "/tech/jira.svg" },
  { name: "FIGMA", icon: "/tech/figma.svg" },
  { name: "GOOGLE SHEETS", icon: "/tech/googlesheets.svg" },
  { name: "TRELLO", icon: "/tech/trello.svg" },
  { name: "POSTMAN", icon: "/tech/postman.svg" },
  { name: "JMETER", icon: "/tech/jmeter.svg" },
  { name: "CLICKUP", icon: "/tech/clickup.svg" },
  { name: "SENTRY", icon: "/tech/sentry.svg" },
  { name: "BITBUCKET", icon: "/tech/bitbucket.svg" },
];

export default function Skills() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const groupedSkills = skillsData.reduce((acc, skill) => {
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
          className="mb-24 text-center"
        >
          <h2 className="text-2xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-50 mb-4 uppercase tracking-tighter">
            Technologies <span className="text-brand-purple">I Use</span>
          </h2>
          <div className="flex justify-center mb-8 md:mb-12">
            <svg width="120" height="12" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-purple/50">
              <path d="M0 5C20 0 30 10 50 5C70 0 80 10 100 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          {/* High-End Tech Ticker - Small & Sophisticated */}
          <div className="relative w-full overflow-hidden py-4 md:py-8 mb-10 md:mb-16">
            <motion.div
              className="flex whitespace-nowrap gap-10 md:gap-36 items-center w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 70,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...techTools, ...techTools].map((tool, index) => (
                <div key={index} className="flex flex-col items-center gap-3 px-2 group">
                  <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                    <img
                      src={isDark && tool.darkIcon ? tool.darkIcon : tool.icon}
                      alt={tool.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-[0.2em] uppercase transition-all duration-300 group-hover:text-brand-cyan">
                    {tool.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Technical skills and tools that support software excellence,Committed to delivering stable, reliable, and user-friendly products.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6 lg:gap-8">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: catIndex * 0.1 }}
              className="glass p-5 md:p-7 rounded-[1.5rem] md:rounded-[2rem] flex flex-col h-full border border-slate-200/50 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-brand-cyan/10 dark:bg-brand-cyan/5 flex items-center justify-center mb-4 md:mb-5 text-brand-cyan group-hover:scale-110 transition-transform duration-500">
                  {category === "Quality Assurance" && (
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  )}
                  {category === "Quality Validation" && (
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                  )}
                  {category === "Product Understanding" && (
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                    </svg>
                  )}
                  {category === "Delivery & Collaboration" && (
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  )}
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight tracking-tight min-h-0 md:min-h-[3rem] flex items-center">
                  {category}
                </h3>
              </div>

              <div className="flex-grow">
                <ul className="flex flex-wrap gap-1.5 md:gap-2.5">
                  {groupedSkills[category].map((skill) => (
                    <motion.li
                      key={skill.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 md:px-4 py-1.5 md:py-2 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-lg md:rounded-xl text-[10px] sm:text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300 transition-all duration-300 hover:bg-brand-cyan hover:text-slate-900 hover:border-brand-cyan hover:shadow-md hover:shadow-brand-cyan/10 cursor-default"
                    >
                      {skill.name}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
