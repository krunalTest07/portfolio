import { motion } from 'framer-motion';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: number;
}

const skillsData: SkillItem[] = [
  { id: 's1', name: "Manual Testing", category: "Core QA", level: 95 },
  { id: 's2', name: "API Testing (Postman)", category: "Core QA", level: 90 },
  { id: 's3', name: "Selenium", category: "Automation", level: 60 },
  { id: 's4', name: "Playwright", category: "Automation", level: 75 },
  { id: 's5', name: "JavaScript", category: "Programming", level: 70 },
  { id: 's6', name: "TypeScript", category: "Programming", level: 65 },
  { id: 's7', name: "Jira / Agile", category: "Tools & Methods", level: 95 },
  { id: 's8', name: "Git / CI/CD", category: "Tools & Methods", level: 80 }
];

const techTools = [
  { name: "JIRA", domain: "atlassian.com", slug: "jira" },
  { name: "FIGMA", domain: "figma.com", slug: "figma" },
  { name: "GOOGLE SHEETS", domain: "google.com", slug: "googlesheets" },
  { name: "TRELLO", domain: "trello.com", slug: "trello" },
  { name: "POSTMAN", domain: "postman.com", slug: "postman" },
  { name: "JMETER", domain: "apache.org", slug: "apachejmeter" },
  { name: "CLICKUP", domain: "clickup.com", slug: "clickup" },
  { name: "SENTRY", domain: "sentry.io", slug: "sentry" },
  { name: "BITBUCKET", domain: "bitbucket.org", slug: "bitbucket" },
];

export default function Skills() {
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
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-50 mb-4 uppercase tracking-tighter">
            Technologies <span className="text-brand-purple">I Use</span>
          </h2>
          <div className="flex justify-center mb-12">
            <svg width="120" height="12" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-purple/50">
              <path d="M0 5C20 0 30 10 50 5C70 0 80 10 100 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          
          {/* High-End Tech Ticker - Small & Sophisticated */}
          <div className="relative w-full overflow-hidden py-8 mb-16">
            <motion.div 
              className="flex whitespace-nowrap gap-16 md:gap-36 items-center w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 70, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {[...techTools, ...techTools].map((tool, index) => (
                <div key={index} className="flex flex-col items-center gap-4 px-2 group">
                   <div className="w-12 h-12 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                      <img 
                        src={`https://logo.clearbit.com/${tool.domain}?size=128`} 
                        alt={tool.name} 
                        className="w-full h-full object-contain"
                        onError={(e) => { e.currentTarget.src = `https://cdn.simpleicons.org/${tool.slug}` }}
                      />
                   </div>
                   <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-[0.2em] uppercase transition-all duration-300 group-hover:text-brand-cyan">
                     {tool.name}
                   </span>
                </div>
              ))}
            </motion.div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            A comprehensive list of automated frameworks, testing methodologies, and analytical tools I leverage to validate high-stakes systems.
          </p>
        </motion.div>

        <motion.div 
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
                    key={skill.id}
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
      </div>
    </section>
  );
}
