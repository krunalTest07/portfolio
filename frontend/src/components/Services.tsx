import { motion } from 'framer-motion';
import { ClipboardCheck, Layout, FileEdit, Bug, RefreshCcw, Smartphone } from 'lucide-react';

const services = [
  {
    title: "Functional Testing",
    description: "Verifying software functionality as per requirements and ensuring it works as expected.",
    icon: <ClipboardCheck className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" />,
    color: "from-purple-500/20 to-brand-purple/20",
    accent: "text-brand-purple",
    hoverBg: "group-hover:bg-brand-purple/10"
  },
  {
    title: "UI/UX Testing",
    description: "Ensuring the application's interface is user-friendly, responsive, and consistent across devices and browsers.",
    icon: <Layout className="w-8 h-8 transition-transform duration-500 group-hover:rotate-12" />,
    color: "from-blue-500/20 to-cyan-500/20",
    accent: "text-blue-500",
    hoverBg: "group-hover:bg-blue-500/10"
  },
  {
    title: "Requirement Analysis",
    description: "Reviewing and understanding requirements to define test coverage, identify risks, and ensure accurate validation of functionality.",
    icon: <FileEdit className="w-8 h-8 transition-transform duration-500 group-hover:-translate-y-1" />,
    color: "from-emerald-500/20 to-teal-500/20",
    accent: "text-emerald-500",
    hoverBg: "group-hover:bg-emerald-500/10"
  },
  {
    title: "Bug Reporting",
    description: "Identifying, documenting, and tracking bugs with detailed steps, screenshots, and reproduction steps.",
    icon: <Bug className="w-8 h-8 transition-transform duration-500 group-hover:scale-125" />,
    color: "from-rose-500/20 to-orange-500/20",
    accent: "text-rose-500",
    hoverBg: "group-hover:bg-rose-500/10"
  },
  {
    title: "Regression Testing",
    description: "Ensuring that new changes or updates do not affect existing functionality and everything works as expected.",
    icon: <RefreshCcw className="w-8 h-8 transition-transform duration-700 group-hover:rotate-180" />,
    color: "from-amber-500/20 to-yellow-500/20",
    accent: "text-amber-500",
    hoverBg: "group-hover:bg-amber-500/10"
  },
  {
    title: "Cross Browser & Device Testing",
    description: "Testing applications across various browsers and devices to ensure compatibility and seamless performance.",
    icon: <Smartphone className="w-8 h-8 transition-transform duration-500 group-hover:scale-125" />,
    color: "from-indigo-500/20 to-blue-500/20",
    accent: "text-indigo-500",
    hoverBg: "group-hover:bg-indigo-500/10"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden bg-slate-50 dark:bg-black/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">
            My <span className="text-brand-purple">Services</span>
          </h2>
          <div className="flex justify-center my-6">
            <svg width="100" height="10" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-purple/40">
              <path d="M0 5C20 0 30 10 50 5C70 0 80 10 100 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Focused on delivering secure, stable, and user-friendly digital experiences through expert QA practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{
                y: -15,
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group glass-card p-10 relative overflow-hidden transition-all duration-500 ${service.hoverBg}`}
            >
              {/* Decorative Gradient Background */}
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${service.color} blur-[60px] -z-10 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-70`}></div>

              <div className={`mb-8 p-4 bg-white dark:bg-slate-800 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-700 group-hover:border-transparent group-hover:shadow-xl transition-all duration-300 ${service.accent}`}>
                {service.icon}
              </div>

              <h3 className="text-xl font-black text-slate-800 dark:text-white mb-4 uppercase tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                {service.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base font-medium group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                {service.description}
              </p>

              {/* <div className={`mt-8 flex items-center gap-2 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-500 ${service.accent}`}>
                Explore Details <span>→</span>
              </div> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
