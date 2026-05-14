import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';

const educationData = [
  {
    institution: "GLS University",
    duration: "2022 - 2024",
    degree: "Master of Computer Application",
    description: "Specialized in software development, AI/ML, and cloud computing. Developed real-world projects, including AI-powered applications and full-stack web solutions. Strengthened my expertise in Python, Django, and cloud technologies.",
    location: "Ahmedabad, Gujarat"
  },
  {
    institution: "Gujarat University",
    duration: "2019 - 2022",
    degree: "Bachelor of Computer Application",
    description: "Laid a strong foundation in programming, databases, and web development. Developed various academic projects, gaining hands-on experience in Python, SQL, and front-end technologies.",
    location: "Ahmedabad, Gujarat"
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 lg:py-32 relative overflow-hidden bg-slate-50/50 dark:bg-transparent">
      {/* Background blobs */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-brand-purple/5 rounded-full blur-[100px] -z-10 -translate-x-1/2" />
      <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-brand-cyan/5 rounded-full blur-[100px] -z-10 translate-x-1/2" />

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

        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-0 pl-8 md:pl-12 space-y-16">
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
              <div className="absolute w-5 h-5 bg-white dark:bg-slate-900 border-4 border-brand-purple rounded-full -left-[41px] md:-left-[49px] top-1.5 z-10 shadow-lg shadow-brand-purple/20" />
              
              <div className="glass-card p-6 md:p-8 hover:border-brand-purple/50 bg-white/50 dark:bg-transparent transition-colors duration-300 group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1 tracking-tight group-hover:text-brand-purple transition-colors flex items-center gap-2">
                       <GraduationCap className="text-brand-purple w-5 h-5 inline-block" /> {edu.degree}
                    </h3>
                    <p className="text-brand-cyan font-bold text-lg inline-flex items-center gap-2">
                      {edu.institution}
                      <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-normal text-sm ml-1 before:content-['|'] before:mr-1 before:text-slate-300 dark:before:text-slate-700">
                        <MapPin size={14} />
                        {edu.location}
                      </span>
                    </p>
                  </div>
                  <span className="inline-block mt-2 md:mt-0 px-4 py-1.5 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    {edu.duration}
                  </span>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
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
