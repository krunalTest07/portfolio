import React from 'react';
import { ExternalLink } from 'lucide-react';

export const CHAT_FAQS = [
  { id: 'linkedin', text: 'LinkedIn Profile' },
  { id: 'github', text: 'GitHub Profile' },
  { id: 'projects', text: 'Key Projects' },
  { id: 'contact', text: 'Contact Info' },
  { id: 'skills', text: 'Tech Stack' },
];

export const DEFAULT_WELCOME_MESSAGE = "Hi there! 👋 I'm Krunal's AI assistant. May I help you learn more about his portfolio today?";

export const getBotReply = (id: string, closeChat?: () => void): React.ReactNode | string => {
  switch (id) {
    case 'linkedin':
      return (
        <span>
          You can connect with Krunal professionally on LinkedIn here: <br />
          <a href="https://linkedin.com/in/krunal-chaudhari" target="_blank" rel="noreferrer" className="font-semibold text-brand-cyan hover:underline inline-flex items-center gap-1 mt-2">
            LinkedIn Profile <ExternalLink size={14} />
          </a>
        </span>
      );
    case 'github':
      return (
        <span>
          Check out his repositories and code quality on GitHub: <br />
          <a href="https://github.com/krunal-chaudhari" target="_blank" rel="noreferrer" className="font-semibold text-brand-cyan hover:underline inline-flex items-center gap-1 mt-2">
            GitHub Profile <ExternalLink size={14} />
          </a>
        </span>
      );
    case 'projects':
      return "Krunal specializes in QA Automation and Full-Stack development. He has built automated testing frameworks for eCommerce platforms, a comprehensive Clinic Management CRM, and various CI/CD pipelines. Check the 'Featured Projects' section above for details!";
    case 'contact':
      return (
        <span>
          The best way to reach Krunal is via the <a href="#contact" onClick={() => {
            if (closeChat) closeChat();
          }} className="text-brand-cyan hover:underline font-semibold cursor-pointer">Contact Form</a> on this site, or directly through LinkedIn. He's always open to discussing QA Automation roles and tech collaborations.
        </span>
      );
    case 'skills':
      return "His core stack includes Playwright, Cypress, Selenium for QA Automation, alongside React, Node.js, and Java Spring Boot for Full-Stack Development. He's also proficient in Docker and CI/CD tools like Jenkins/GitHub Actions.";
    default:
      return "I'm not sure about that! But Krunal would love to answer that personally.";
  }
};
