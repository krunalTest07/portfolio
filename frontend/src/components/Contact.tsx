import { motion } from 'framer-motion';
import { Mail, MapPin, Globe, Code, Send } from 'lucide-react';

export default function Contact() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle form submission goes here.
    alert("Thanks for reaching out! Since this is a demo, no email was sent, but the UI logic is ready.");
  };

  return (
    <section id="contact" className="py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-purple/10 rounded-full blur-[100px] -z-10 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-50 mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Looking for a meticulous QA Automation Engineer to ensure your software is bulletproof? Let's talk test cases!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 30 : 0, x: isMobile ? 0 : -50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div className="glass-card p-8 bg-white/50 dark:bg-transparent">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Contact Information</h3>
              <ul className="flex flex-col gap-6">
                <li className="flex items-center gap-4 text-slate-600 dark:text-slate-400 group">
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800/50 flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-dark-bg transition-colors duration-300">
                    <Mail size={20} />
                  </div>
                  <span className="font-medium">contact@krunaldev.com</span>
                </li>
                <li className="flex items-center gap-4 text-slate-600 dark:text-slate-400 group">
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800/50 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors duration-300">
                    <MapPin size={20} />
                  </div>
                  <span className="font-medium">Global / Remote</span>
                </li>
              </ul>
              
              <div className="flex gap-4 mt-10 border-t border-slate-300 dark:border-slate-700/50 pt-8">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#0077b5] hover:text-white transition-colors">
                  <Globe size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#333] hover:text-white transition-colors">
                  <Code size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: isMobile ? 30 : 0, x: isMobile ? 0 : 50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="glass-card p-8 flex flex-col gap-6 bg-white/50 dark:bg-transparent"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Your Name</label>
              <input type="text" id="name" required className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-brand-cyan transition-colors" placeholder="John Doe" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Your Email</label>
              <input type="email" id="email" required className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-brand-cyan transition-colors" placeholder="john@example.com" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
              <textarea id="message" required rows={4} className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-brand-cyan transition-colors resize-none" placeholder="How can I help you?"></textarea>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-4 w-full py-4 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
            >
              Send Message <Send size={18} />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
