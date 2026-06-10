import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 'e1',
    company: "Polyxer Systems Pvt Ltd",
    role: "Junior QA Analyst",
    duration: "Dec 2024 - June 2025",
    responsibilities: [
      "Performed end-to-end testing of web applications, ensuring functionality, reliability, and a seamless user experience.",
      "Created and maintained test cases, reported defects, and verified fixes through continuous collaboration with cross-functional teams.",
      "Contributed to quality assurance processes, release validation, and test execution to deliver high-quality software products."
    ]
  },
  {
    id: 'e2',
    company: "Rayo Innovations",
    role: "QA Tester",
    duration: "Jan 2023 - Dec 2024",
    responsibilities: [
      "Execute rigorous manual tests for cross-browser web interfaces.",
      "Perform API sanity checks via Postman prior to frontend integrations.",
      "Identify, document, and track high-severity regressions within Jira.",
      "Actively transitioning into writing automated UI scripts using Playwright."
    ]
  }
];

export default function Experience() {

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

        <div className="relative border-l-0 md:border-l-2 border-slate-300 dark:border-slate-700/50 pl-0 md:pl-8 ml-0 md:ml-0">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
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
                className="hidden md:block absolute w-4 h-4 bg-brand-purple rounded-full md:-left-[41px] top-2 shadow-[0_0_10px_rgba(139,92,246,0.6)] border-2 border-slate-50 dark:border-dark-bg"
              />

              <div className="relative glass-card p-5 md:p-8 hover:border-brand-purple/50 bg-white/50 dark:bg-transparent transition-colors duration-300 overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">{exp.role}</h3>
                    <p className="text-brand-cyan font-bold text-base md:text-lg">{exp.company}</p>
                  </div>
                  <span className="flex items-center gap-1.5 self-start md:self-auto px-4 py-1.5 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    <Calendar size={14} className="text-brand-purple/70" />
                    {exp.duration}
                  </span>
                </div>

                <ul className="list-disc list-outside space-y-3 text-sm md:text-base text-slate-600 dark:text-slate-400 pl-4 mt-6">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {resp}
                    </li>
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
