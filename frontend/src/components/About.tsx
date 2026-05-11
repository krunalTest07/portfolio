import { motion } from 'framer-motion';
import { SearchCode, Zap, Layers } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: <SearchCode className="text-brand-cyan" size={26} />,
      title: "Exploratory Bug Finding",
      description: "Developing a deep intuition to break applications in dev sequences to prevent critical failures in production environments."
    },
    {
      icon: <Layers className="text-brand-purple" size={26} />,
      title: "API & Integration Testing",
      description: "Verifying endpoints deeply using Postman chains, validating JSON schemas, status codes, and security headers."
    },
    {
      icon: <Zap className="text-brand-cyan" size={26} />,
      title: "Test Automation Pivot",
      description: "Aggressively pursuing Test Automation with Selenium and Playwright to bridge the gap between CI/CD pipelines and QA approvals."
    }
  ];

  return (
    <section id="about" className="py-32 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-50 mb-6">
            About <span className="text-brand-cyan">Me</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed">
            I am a meticulous QA Tester transitioning rapidly into full-scale Test Automation. My philosophy is that quality isn't an afterthought—it's a continuous, integrated pipeline. I am passionate about discovering edge cases before users do, documenting precise replication steps, and scaling my technical capabilities through TypeScript, DOM manipulation, and modern test runners.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 md:p-10 text-center sm:text-left flex flex-col items-center sm:items-start group cursor-default"
            >
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-8 shadow-inner group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
