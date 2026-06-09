import { motion } from 'framer-motion';

export default function About() {
  const personalInfo = [
    { label: "Name", value: "Krunal" },
    { label: "Phone", value: "+91 8000456527" },
    { label: "Age", value: "25 Years" },
    { label: "Email", value: "krunalchaudhari1008@gmail.com" },
    { label: "Occupation", value: "QA Analyst" },
    { label: "Nationality", value: "India" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="py-20 lg:py-24 relative overflow-hidden bg-slate-50 dark:bg-black/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="section-title mb-12"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-50 uppercase tracking-tighter">
            About
          </motion.h2>
          <motion.div variants={itemVariants} className="title-shape">
            <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" strokeWidth="2"></path>
            </svg>
          </motion.div>
          <motion.p variants={itemVariants} className="mt-4 text-slate-600 dark:text-slate-400 text-base max-w-2xl mx-auto font-medium">
            I build the digital bridges of tomorrow - ensuring quality, stability, and speed in every software release.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-center">
          {/* Left Column: Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={imageVariants}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.01] duration-500 bg-white p-1.5">
              <img
                src="./My_image.png"
                alt="Krunal"
                className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-xl"
              />
            </div>
            {/* Decorative background for image */}
            <div className="absolute -top-4 -left-4 w-28 h-28 bg-brand-cyan/20 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-4 -right-4 w-36 h-36 bg-brand-purple/20 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.span variants={itemVariants} className="text-brand-purple font-bold text-xs uppercase tracking-[0.2em] block mb-2">Professional Profile</motion.span>
            <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-5 tracking-tighter leading-tight">
              QA Automation <span className="text-brand-cyan"> Specialist</span>
            </motion.h3>

            <motion.p variants={itemVariants} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5 text-base font-medium">
              I am a dedicated<span className="text-slate-800 dark:text-slate-200">Quality Assurance professional</span> with a deep passion for delivering reliable and high-quality digital experiences. By combining structured testing approaches with <span className="text-brand-cyan">modern quality practices</span>, I help ensure applications perform <span className="text-brand-purple">seamlessly</span> across every stage of development.
            </motion.p>

            {/* <motion.p variants={itemVariants} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5 text-base font-medium">
              I am a dedicated <span className="text-slate-800 dark:text-slate-200">QA Automation Professional</span> with a deep passion for building high-integrity testing architectures. By integrating modern solutions like <span className="text-brand-cyan">Playwright</span> and <span className="text-brand-purple">Selenium</span>, I provide the technical depth required to deliver flawless digital experiences.
            </motion.p> */}
            <motion.p variants={itemVariants} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-sm opacity-80">
              My mission is to transform complex quality requirements into scalable automation strategies that power modern development lifecycles with precision and reliability.
            </motion.p>



            {/* Personal Info Grid Card - Refined Staggered Entrance */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-lg shadow-slate-200/30 dark:shadow-none border border-slate-100 dark:border-slate-800 max-w-xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {personalInfo.map((info, idx) => (
                  <motion.div
                    key={info.label}
                    variants={{
                      hidden: { opacity: 0, x: -5 },
                      visible: { opacity: 1, x: 0, transition: { delay: idx * 0.04 } }
                    }}
                    className="flex flex-col gap-0 min-w-0"
                  >
                    <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">{info.label}</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-white break-words">{info.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 flex items-center gap-6">
              <div>
                <span className="text-xl font-black text-brand-purple uppercase tracking-tighter">Your Vision, My Expertise</span>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ensuring Quality from Concept to Perfection</div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}



