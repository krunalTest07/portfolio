import React from 'react';
import { ExternalLink } from 'lucide-react';

export const CHAT_FAQS = [
  { id: 'linkedin', text: 'LinkedIn Profile' },
  { id: 'github', text: 'GitHub Profile' },
  { id: 'projects', text: 'Key Projects' },
  { id: 'skills', text: 'Tech Stack' },
  { id: 'contact', text: 'Contact Info' },
  { id: 'cv', text: 'Download CV' },
];

export const DEFAULT_WELCOME_MESSAGE = "Hi there! 👋 I'm Krunal's AI assistant. How may I help you today?";

export const getBotReply = (id: string, closeChat?: () => void): React.ReactNode | string => {
  switch (id) {
    case 'linkedin':
      return (
        <span>
          You can connect with Krunal professionally on LinkedIn here: <br />
          <a href="https://www.linkedin.com/in/chaudharikrunal?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="font-semibold text-brand-cyan hover:underline inline-flex items-center gap-1 mt-2 mb-1">
            LinkedIn Profile <ExternalLink size={14} />
          </a>
        </span>
      );
    case 'github':
      return (
        <span>
          Check out his repositories and code quality on GitHub: <br />
          <a href="https://github.com/krunalchaudhari" target="_blank" rel="noreferrer" className="font-semibold text-brand-cyan hover:underline inline-flex items-center gap-1 mt-2 mb-1">
            GitHub Profile <ExternalLink size={14} />
          </a>
        </span>
      );
    case 'projects':
      return (
        <div className="flex flex-col gap-2 mt-1 mb-1">
          <span>Here are some of Krunal's featured QA Automation projects:</span>
          <a href="#projects" onClick={() => closeChat?.()} className="p-2 mt-1 border border-brand-cyan/20 rounded-md bg-white dark:bg-slate-800 text-brand-cyan hover:bg-brand-cyan/10 transition-colors text-sm font-semibold flex items-center justify-between">
            E2E E-Commerce Suite <ExternalLink size={14} />
          </a>
          <a href="#projects" onClick={() => closeChat?.()} className="p-2 border border-brand-cyan/20 rounded-md bg-white dark:bg-slate-800 text-brand-cyan hover:bg-brand-cyan/10 transition-colors text-sm font-semibold flex items-center justify-between">
            API Regressions Hub <ExternalLink size={14} />
          </a>
          <a href="#projects" onClick={() => closeChat?.()} className="p-2 mb-1 border border-brand-cyan/20 rounded-md bg-white dark:bg-slate-800 text-brand-cyan hover:bg-brand-cyan/10 transition-colors text-sm font-semibold flex items-center justify-between">
            Defect Management Tracker <ExternalLink size={14} />
          </a>
        </div>
      );
    case 'contact':
      return (
        <div className="flex flex-col gap-2 mt-1 mb-1">
          <span>You can reach Krunal through any of these channels:</span>
          <ul className="text-sm space-y-2 mt-2">
            <li className="flex items-center gap-2">📱 <a href="tel:+918000456527" className="text-brand-cyan hover:underline font-semibold">+91 8000456527</a></li>
            <li className="flex items-center gap-2">📧 <a href="mailto:krunalchaudhari1008@gmail.com" className="text-brand-cyan hover:underline font-semibold w-full overflow-hidden text-ellipsis">krunalchaudhari1008@gmail.com</a></li>
            <li className="flex items-center gap-2">📸 <a href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=yykwwq" target="_blank" rel="noreferrer" className="text-brand-cyan hover:underline font-semibold flex items-center gap-1">Instagram <ExternalLink size={12} /></a></li>
          </ul>
        </div>
      );
    case 'cv':
      return (
        <div className="flex flex-col gap-2 mt-1 mb-1">
          <span>Certainly! You can download Krunal's latest CV below:</span>
          <a href="/Krunal_Chaudhari_CV.pdf" target="_blank" download className="mt-2 text-center inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-cyan to-brand-purple text-white rounded-lg font-bold shadow-md hover:opacity-90 transition-opacity">
            Download CV 📄
          </a>
        </div>
      );
    case 'skills':
      return "His core stack includes Playwright, Cypress, Selenium for QA Automation, alongside React, Node.js, and Java Spring Boot for Full-Stack Development. He's also proficient in Docker and CI/CD tools like Jenkins/GitHub Actions.";
    default:
      return "I'm not sure about that! But Krunal would love to answer that personally.";
  }
};

export const processUserMessage = (
  message: string, 
  closeChat: () => void,
  onOptionClick: (option: { id: string; text: string }) => void
): React.ReactNode | string => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi ') || lowerMsg === 'hi' || lowerMsg.includes('hey')) {
    return "Hi there! 👋 How can I help you learn more about Krunal?";
  }
  
  if (lowerMsg.includes('cv') || lowerMsg.includes('resume') || lowerMsg.includes('download')) {
    return getBotReply('cv', closeChat);
  }
  
  if (lowerMsg.includes('project') || lowerMsg.includes('work') || lowerMsg.includes('portfolio')) {
    return getBotReply('projects', closeChat);
  }
  
  if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('phone') || lowerMsg.includes('call') || lowerMsg.includes('reach')) {
    return getBotReply('contact', closeChat);
  }
  
  if (lowerMsg.includes('skill') || lowerMsg.includes('tech') || lowerMsg.includes('stack') || lowerMsg.includes('tool') || lowerMsg.includes('language')) {
    return getBotReply('skills', closeChat);
  }
  
  if (lowerMsg.includes('github') || lowerMsg.includes('git') || lowerMsg.includes('repo')) {
    return getBotReply('github', closeChat);
  }
  
  if (lowerMsg.includes('linkedin') || lowerMsg.includes('linkdin') || lowerMsg.includes('profile') || lowerMsg.includes('link') || lowerMsg.includes('social')) {
    return getBotReply('linkedin', closeChat);
  }

  // Fallback response for unhandled textual questions
  return (
    <div className="flex flex-col gap-2 mt-1 mb-1">
      <span className="text-sm">I'm not exactly sure what you mean. Are you looking for one of these? 👇</span>
      <div className="flex flex-wrap gap-2 mt-1">
        {CHAT_FAQS.map((faq) => (
          <button
            key={faq.id}
            onClick={() => onOptionClick(faq)}
            className="text-[12px] px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/10 transition-colors font-semibold shadow-sm"
          >
             {faq.text}
          </button>
        ))}
      </div>
      <span className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Or <a href="mailto:krunalchaudhari1008@gmail.com" className="text-brand-cyan hover:underline font-semibold underline">Email Krunal</a> directly!
      </span>
    </div>
  );
};
