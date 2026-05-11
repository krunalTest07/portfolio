import { motion } from 'framer-motion';
import { Bug, Mail, Globe, Info, MessageSquare, ExternalLink, SearchCode, Zap } from 'lucide-react';

export default function Hero() {
  const socialLinks = [
    { icon: SearchCode, color: 'bg-[#333]', link: '#' },
    { icon: Zap, color: 'bg-[#0077b5]', link: '#' },
    { icon: Globe, color: 'bg-[#ea4335]', link: '#' },
    { icon: Mail, color: 'bg-[#c71610]', link: '#' },
    { icon: MessageSquare, color: 'bg-[#1da1f2]', link: '#' },
    { icon: ExternalLink, color: 'bg-[#3b5998]', link: '#' },
    { icon: Info, color: 'bg-[#e4405f]', link: '#' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 dark:text-slate-50 leading-tight mb-4">
            Hi all, I'm Krunal <span className="inline-block animate-wave">👋</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
            A passionate QA Automation Engineer 🚀 having an experience of building robust testing suites with modern tools like Playwright and Selenium.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap gap-2 mb-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                whileHover={{ y: -5 }}
                className={`w-10 h-10 rounded-full ${social.color} text-white flex items-center justify-center transition-transform shadow-md`}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4 mt-8">
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: '#5c2d91' }}
              whileTap={{ scale: 0.95 }}
              href="/#contact"
              className="px-8 py-3.5 rounded bg-[#6f42c1] text-white font-semibold transition-colors flex items-center gap-2 shadow-lg uppercase tracking-wider"
            >
              Contact Me
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: '#5c2d91' }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="px-8 py-3.5 rounded bg-[#6f42c1] text-white font-semibold transition-colors shadow-lg uppercase tracking-wider"
            >
              See My Resume
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden md:block"
        >
          {/* Illustration Container */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-full aspect-square flex items-center justify-center relative"
          >
             {/* Using a simpler animation to match the "Illustration" feel */}
             <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/10 to-brand-purple/10 rounded-full blur-3xl" />
                <Bug className="text-brand-purple/40 relative z-10 animate-float" size={300} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
                  <h2 className="text-3xl font-black text-slate-800/80 dark:text-slate-100/80 tracking-widest uppercase">Quality<br/>Assurance</h2>
                </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
