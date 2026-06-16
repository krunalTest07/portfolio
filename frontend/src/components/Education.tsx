import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

const educationData = [
  {
    institution: "GLS University",
    duration: "2022 - 2024",
    degree: "Master of Computer Application",
    description: "Specialized in Software Development, AI/ML, and Cloud Computing. Worked on real-world projects involving application development, testing, and web solutions. Developed practical skills in Python, frontend development, project deployment, quality assurance, and cloud technologies.",
    location: "Ahmedabad, Gujarat"
  },
  {
    institution: "SomLalit Institute of Computer Application, Gujarat University",
    duration: "2019 - 2022",
    degree: "Bachelor of Computer Application",
    description: "Built a strong foundation in programming, databases, OOP concepts, and web development. Gained practical experience through academic projects involving PHP, SQL, and frontend development while strengthening core software development skills.",
    location: "Ahmedabad, Gujarat"
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 lg:py-32 relative overflow-hidden bg-slate-50/50 dark:bg-transparent">
      {/* Background blobs */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-blob-purple rounded-full -z-10 -translate-x-1/2" />
      <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-blob-cyan rounded-full -z-10 translate-x-1/2" />

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-slate-50 mb-6 uppercase tracking-tight">
            My <span className="text-brand-purple">Education</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-brand-cyan to-brand-purple mx-auto rounded-full mb-8" />
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            A journey of continuous learning, innovation, and technical excellence.
            My academic background has equipped me with a strong foundation in computer science and software development.
          </p>
        </motion.div>

        <div className="relative border-l-0 md:border-l-2 border-slate-200 dark:border-slate-800 ml-0 md:ml-0 pl-0 md:pl-12 space-y-10 md:space-y-16">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              {/* Timeline Point */}
              <div className="hidden md:block absolute w-5 h-5 bg-white dark:bg-slate-900 border-4 border-brand-purple rounded-full md:-left-[49px] top-1.5 z-10 shadow-lg shadow-brand-purple/20" />

              <div className="relative glass-card p-5 md:p-8 hover:border-brand-purple/50 bg-white/50 dark:bg-transparent transition-colors duration-300 group overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1 tracking-tight group-hover:text-brand-purple transition-colors flex items-center gap-2">
                      <GraduationCap className="text-brand-purple w-5 h-5 inline-block" /> {edu.degree}
                    </h3>
                    <p className="text-brand-cyan font-bold text-base md:text-lg flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      {edu.institution}
                      <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-normal text-sm sm:before:content-['|'] sm:before:mr-1 sm:before:text-slate-300 sm:dark:before:text-slate-700">
                        <MapPin size={14} />
                        {edu.location}
                      </span>
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 self-start md:self-auto px-4 py-1.5 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    <Calendar size={14} className="text-brand-purple/70" />
                    {edu.duration}
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm md:text-lg leading-relaxed font-medium">
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
