import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';

// Inline SVG Brand Icons (lucide-react v1.x dropped brand icons)
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  {
    icon: GithubIcon,
    href: 'https://github.com/krunalchaudhari',
    label: 'GitHub',
    color: 'hover:text-white',
  },
  {
    icon: LinkedinIcon,
    href: 'https://www.linkedin.com/in/chaudharikrunal?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    label: 'LinkedIn',
    color: 'hover:text-[#0A66C2]',
  },
  {
    icon: InstagramIcon,
    href: 'https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=yykwwq',
    label: 'Instagram',
    color: 'hover:text-[#E1306C]',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Footer() {
  const year = new Date().getFullYear();
  const name = 'Krunal Chaudhari';

  return (
    <footer className="relative bg-slate-900 dark:bg-[#060612] border-t border-slate-800 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-brand-purple/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[200px] bg-brand-cyan/5 blur-[100px] pointer-events-none" />

      {/* Gradient top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center shadow-lg shadow-brand-purple/30">
                <span className="text-white font-black text-lg">KC</span>
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-none">{name}</p>
                <p className="text-brand-cyan text-xs font-mono tracking-widest uppercase mt-0.5">QA Analyst</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Crafting reliable software through precision testing, automation, and a passion for quality assurance.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className={`w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 ${social.color} transition-all duration-300 hover:border-brand-purple/50 hover:shadow-md hover:shadow-brand-purple/10`}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-white font-semibold text-sm uppercase tracking-widest">Quick Links</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-brand-cyan text-sm transition-all duration-300 w-full inline-block group"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact / Status Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-white font-semibold text-sm uppercase tracking-widest">Get In Touch</p>
            <div className="space-y-3">
              <a
                href="mailto:krunalchaudhari1008@gmail.com"
                className="flex items-center gap-3 text-slate-400 hover:text-brand-cyan text-sm transition-colors duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-brand-cyan/50 transition-colors">
                  <Mail size={14} />
                </div>
                krunalchaudhari1008@gmail.com
              </a>

              {/* Availability badge */}
              <div className="flex items-center gap-2 mt-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-green-400 text-xs font-medium">Available for opportunities</span>
              </div>

              {/* Tech Stack */}
              <div className="pt-4">
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">Built With</p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Tailwind', 'Framer Motion'].map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-400 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8" />

        {/* Bottom Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500"
        >
          <p className="flex items-center gap-1.5">
            <span>© {year}</span>
            <span className="text-slate-300 font-semibold">{name}</span>
            <span>· All rights reserved.</span>
          </p>
          <p className="flex items-center gap-1.5">
            Crafted by
            <span className="text-brand-purple font-semibold uppercase tracking-wider">{name}</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart size={13} className="text-red-500 fill-red-500" />
            </motion.span>

          </p>
        </motion.div>
      </div>
    </footer>
  );
}
