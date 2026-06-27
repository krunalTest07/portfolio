import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';

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

export default function Contact() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult("");

    const formData = new FormData(formRef.current!);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully! I will get back to you soon.");
        setHasSentMessage(true);
        formRef.current?.reset();
      } else {
        console.error("Web3Forms submission error:", data);
        setResult(data.message || "Failed to submit. Please check your verification or try again.");
      }
    } catch (error) {
      console.error("Network error during form submission:", error);
      setResult("A network error occurred. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Ensure input stays visible when keyboard opens on mobile
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement> | React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const target = e.target as HTMLElement;
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300); // Delay allows the software keyboard to fully open
    }
  };

  return (
    <section id="contact" className="pt-8 pb-16 md:py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blob-purple rounded-full -z-10 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 30 : 0, x: isMobile ? 0 : -50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8 h-full"
          >
            <div className="flex flex-col h-full justify-center lg:pr-10">
              <p className="font-bold uppercase tracking-wider text-sm mb-3 text-slate-700 dark:text-slate-300">Contact</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 mb-6 leading-tight">
                Get in <span className="text-gradient">Touch</span><br className="hidden lg:block" /> Let’s Build Quality Digital Experiences
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-[15px] mb-10 leading-relaxed max-w-md">
                Helping businesses deliver reliable, user-friendly, and high-performing web & mobile applications through complete quality assurance and testing solutions.
              </p>
              <ul className="flex flex-col gap-6">
                <li className="flex items-center gap-4 group">
                  <div className="text-brand-purple">
                    <Mail size={20} />
                  </div>
                  <a href="mailto:krunalchaudhari1008@gmail.com" className="font-medium text-slate-800 dark:text-slate-200 hover:text-brand-purple dark:hover:text-brand-purple transition-colors">krunalchaudhari1008@gmail.com</a>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="text-brand-purple">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <a href="tel:+918000456527" className="font-medium text-slate-800 dark:text-slate-200 hover:text-brand-purple dark:hover:text-brand-purple transition-colors">+91 8000456527</a>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="text-brand-purple">
                    <MapPin size={20} />
                  </div>
                  <span className="font-medium text-slate-800 dark:text-slate-200">Ahmedabad, Gujarat</span>
                </li>
              </ul>

              <div className="flex gap-4 mt-8 pt-6">
                <a href="https://github.com/krunalchaudhari" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#333] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors" aria-label="GitHub">
                  <GithubIcon size={20} />
                </a>
                <a href="https://www.linkedin.com/in/chaudharikrunal?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#0A66C2] hover:text-white transition-colors" aria-label="LinkedIn">
                  <LinkedinIcon size={20} />
                </a>
                <a href="https://www.instagram.com/krunal8746?igsh=cDgzMDAzcGV5dGI=" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#E1306C] hover:text-white transition-colors" aria-label="Instagram">
                  <InstagramIcon size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          {hasSentMessage ? (
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 30 : 0, x: isMobile ? 0 : 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 md:p-10 flex flex-col gap-5 bg-white dark:bg-[#13111C] shadow-2xl rounded-2xl border border-slate-100 dark:border-slate-800/80 h-full justify-center items-center text-center"
            >
              <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center text-brand-purple mb-4">
                <Send size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Message Sent!</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Thank you for reaching out. I have received your message and will get back to you as soon as possible.
              </p>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-4">
                Thank you for passing the verification!
              </p>
            </motion.div>
          ) : (
            <motion.form
              ref={formRef}
              initial={{ opacity: 0, y: isMobile ? 30 : 0, x: isMobile ? 0 : 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="glass-card p-8 md:p-10 flex flex-col gap-5 bg-white dark:bg-[#13111C] shadow-2xl rounded-2xl border border-slate-100 dark:border-slate-800/80 h-full"
            >
              <input type="hidden" name="access_key" value="237edd48-a0d5-4211-8632-e3eec940f674" />
              {/* Invisible Honeypot Spam Protection */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <input type="text" name="name" id="name" required onFocus={handleFocus} onInvalid={handleFocus} className="w-full bg-slate-50 dark:bg-[#0B0914] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3.5 text-[15px] text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all" placeholder="Your Name" />

              <input type="email" name="email" id="email" required onFocus={handleFocus} onInvalid={handleFocus} className="w-full bg-slate-50 dark:bg-[#0B0914] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3.5 text-[15px] text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all" placeholder="Your Email" />

              <input type="text" name="subject" id="subject" required onFocus={handleFocus} onInvalid={handleFocus} className="w-full bg-slate-50 dark:bg-[#0B0914] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3.5 text-[15px] text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all" placeholder="Subject" />

              <textarea name="message" id="message" required onFocus={handleFocus} onInvalid={handleFocus} rows={5} className="w-full bg-slate-50 dark:bg-[#0B0914] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3.5 text-[15px] text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all resize-none" placeholder="Message"></textarea>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full py-4 rounded-lg bg-brand-purple text-white font-bold tracking-wide flex items-center justify-center hover:opacity-90 transition-all shadow-lg shadow-brand-purple/30 hover:shadow-brand-purple/50 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Submit Message"}
              </motion.button>
              {result && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-[15px] font-medium text-brand-purple mt-2 bg-brand-purple/5 py-3 rounded-lg border border-brand-purple/20"
                >
                  {result}
                </motion.p>
              )}
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
