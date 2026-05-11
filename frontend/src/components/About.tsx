import { motion } from 'framer-motion';

export default function About() {
  const personalInfo = [
    { label: "Name", value: "Krunal" },
    { label: "Phone", value: "+91 8000456527" },
    { label: "Age", value: "25 Years" }, // Added age based on common portfolio patterns or screenshot
    { label: "Email", value: "krunalchaudhari@gmail.com" }, // Placeholder email
    { label: "Occupation", value: "QA Analyst" },
    { label: "Nationality", value: "India" },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden bg-slate-50 dark:bg-black/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="section-title mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-50 uppercase tracking-tighter">
            About
          </h2>
          <div className="title-shape">
            <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" strokeWidth="2"></path>
            </svg>
          </div>
          <p className="mt-6 text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            I build the digital bridges of tomorrow — ensuring quality, stability, and speed in every software release.
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_1.2fr] gap-12 lg:gap-20 items-center">
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-500">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                alt="Krunal"
                className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Decorative background for image */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-cyan/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-purple/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-purple font-bold text-sm uppercase tracking-widest block mb-3">About Me</span>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6 tracking-tight">
              QA Analyst & Automation Expert
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-base">
              I transform manual processes into precise, automated testing pipelines using tools like Playwright and Selenium. My mission is to deliver flawless software through continuous integration and deep technical validation.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-base">
              Delivering end-to-end automation solutions that power modern development cycles with efficiency and innovation.
            </p>

            {/* Personal Info Grid Card - Refined Size */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-12">
                {personalInfo.map((info) => (
                  <div key={info.label} className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{info.label}</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-white break-words">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <span className="text-xl font-black text-[#5c00e6] uppercase tracking-tighter">Krunal</span>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Ensuring Quality at Every Step</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
