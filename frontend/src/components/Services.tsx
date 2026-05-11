import { motion } from 'framer-motion';
import { ClipboardCheck, Layout, FileEdit, Bug, RefreshCcw, Smartphone } from 'lucide-react';

const services = [
  {
    title: "Functional Testing",
    description: "Verifying software functionality as per requirements and ensuring it works as expected.",
    icon: <ClipboardCheck className="w-8 h-8 text-brand-purple" />,
    color: "from-purple-500/10 to-brand-purple/10"
  },
  {
    title: "UI/UX Testing",
    description: "Ensuring the application's interface is user-friendly, responsive, and consistent across devices and browsers.",
    icon: <Layout className="w-8 h-8 text-blue-500" />,
    color: "from-blue-500/10 to-cyan-500/10"
  },
  {
    title: "Test Case Design",
    description: "Creating clear, comprehensive, and reusable test cases and test scenarios based on requirements.",
    icon: <FileEdit className="w-8 h-8 text-emerald-500" />,
    color: "from-emerald-500/10 to-teal-500/10"
  },
  {
    title: "Bug Reporting",
    description: "Identifying, documenting, and tracking bugs with detailed steps, screenshots, and reproduction steps.",
    icon: <Bug className="w-8 h-8 text-rose-500" />,
    color: "from-rose-500/10 to-orange-500/10"
  },
  {
    title: "Regression Testing",
    description: "Ensuring that new changes or updates do not affect existing functionality and everything works as expected.",
    icon: <RefreshCcw className="w-8 h-8 text-amber-500" />,
    color: "from-amber-500/10 to-yellow-500/10"
  },
  {
    title: "Cross Browser & Device Testing",
    description: "Testing applications across various browsers and devices to ensure compatibility and seamless performance.",
    icon: <Smartphone className="w-8 h-8 text-indigo-500" />,
    color: "from-indigo-500/10 to-blue-500/10"
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
            My <span className="text-[#5c00e6]">Services</span>
          </h2>
          <div className="flex justify-center my-6">
            <svg width="100" height="10" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#5c00e6]/40">
              <path d="M0 5C20 0 30 10 50 5C70 0 80 10 100 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Providing high-quality Manual QA Testing services to ensure reliable, bug-free, and user-friendly software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass-card p-10 relative overflow-hidden"
            >
              {/* Decorative Gradient Background */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} blur-[50px] -z-10 group-hover:scale-150 transition-transform duration-700 opacity-50`}></div>
              
              <div className="mb-8 p-4 bg-white dark:bg-slate-800 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-700 group-hover:border-brand-cyan/40 transition-colors">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-black text-slate-800 dark:text-white mb-4 uppercase tracking-tight">
                {service.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base font-medium">
                {service.description}
              </p>
              
              <div className="mt-8 flex items-center gap-2 text-brand-purple font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300">
                Learn more <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
