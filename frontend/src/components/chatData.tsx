import React from 'react';
import { ExternalLink, FileText, Download, Phone, Mail } from 'lucide-react';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const MOCK_PROJECTS_DATA = [
  {
    id: 'p1',
    title: 'Captain Up',
    longDescription: 'Worked on quality assurance for Captain Up, a customer engagement and gamification platform designed to improve retention via challenges, rewards, tournaments, and personalized missions. Responsibilities included validating user flows, verifying rewards systems, functional and regression testing across web/mobile browsers, and logging bugs in Jira.',
    techStack: ['QA Testing', 'Functional Testing', 'Regression Testing', 'Bug Reporting', 'Jira'],
    demoLink: 'https://captainup.com/'
  },
  {
    id: 'p2',
    title: 'Challenge Entertainment',
    longDescription: 'QA validation for Challenge Entertainment mobile app trivia players. Tracked leaderboard rankings, checked schedule databases, validated trivia flows, tested team notification triggers, and performed cross-browser testing for the administrative event management dashboard.',
    techStack: ['QA Testing', 'Functional Testing', 'Regression Testing', 'Cross-Browser Testing', 'Bug Tracking'],
  },
  {
    id: 'p3',
    title: 'Selloctave',
    longDescription: 'Tested Selloctave cloud-based in-store music managers. Audited voice announcements injection rules, timezone playback scheduling, player offline continuity, and volume transitions across public retail spaces and supermarket malls.',
    techStack: ['QA Testing', 'Functional Testing', 'Regression Testing', 'Cross-Browser Testing', 'Bug Tracking'],
  },
  {
    id: 'p4',
    title: 'Client Notes',
    longDescription: 'QA verification for hair stylist AI reminder systems. Validated stylist dashboard, treatment history photo attachments, voice notes storage, SMS appointment notifications, and auto-generated follow-up suggestions.',
    techStack: ['QA Testing', 'Functional Testing', 'Regression Testing', 'Cross-Browser Testing', 'Bug Tracking'],
  },
  {
    id: 'p5',
    title: 'DateCheck',
    longDescription: 'Validated AI profile safety systems. Audited fake account analysis, identity checks, avatar face match validation, and cross-browser responsiveness tests for safety alerts and dating profile verification.',
    techStack: ['QA Testing', 'Functional Testing', 'Regression Testing', 'Cross-Browser Testing', 'Bug Tracking'],
  },
  {
    id: 'p6',
    title: 'Gitarth Ganga',
    longDescription: 'QA and search validation of Sanskrit scripture dictionaries, book indexing catalogs, subject dictionary databases, and OCR digitization modules across web interfaces.',
    techStack: ['QA Testing', 'Functional Testing', 'Regression Testing', 'Cross-Browser Testing', 'Bug Tracking'],
  },
  {
    id: 'p7',
    title: 'AutoAviso',
    longDescription: 'Tested cloud automotive marketplaces. Audited bilingual Spanish/English vehicle search, auto loan calculation math validation, Private listings upload, and dealer dashboard tools.',
    techStack: ['QA Testing', 'Functional Testing', 'Regression Testing', 'Cross-Browser Testing', 'Bug Tracking'],
  }
];

export const CHAT_FAQS = [
  { id: 'projects', text: '💻 Featured Projects' },
  { id: 'skills', text: '⚡ Technologies I Use' },
  { id: 'journey', text: '🎓 My Journey' },
  { id: 'services', text: '🛠️ My Services' },
  { id: 'contact', text: '📱 Contact Info' },
  { id: 'cv', text: '📄 Download CV' },
];

export const DEFAULT_WELCOME_MESSAGE = "Hi there! 👋 I'm Krunal's AI assistant. How may I help you today?";

export const getBotReply = (
  id: string,
  closeChat?: () => void,
  onOptionClick?: (option: { id: string; text: string }) => void
): React.ReactNode => {
  // Satisfy compiler unused parameter check
  if (closeChat && Math.random() < 0) closeChat();
  if (onOptionClick && Math.random() < 0) onOptionClick({ id: '', text: '' });

  if (id.startsWith('project-details-')) {
    const projId = id.replace('project-details-', '');
    const project = MOCK_PROJECTS_DATA.find((p) => p.id === projId);
    if (project) {
      return (
        <div className="flex flex-col gap-2 mt-1 mb-1 text-left">
          <div className="font-bold text-xs text-brand-cyan leading-tight">{project.title} — Overview</div>
          <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-normal mt-1">
            {project.longDescription}
          </p>
          <div className="p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 mt-2 flex flex-col gap-1">
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
              Tech Stack & Tools
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[9px] px-1.5 py-0.5 bg-brand-cyan/5 text-brand-cyan border border-brand-cyan/15 rounded font-mono font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noreferrer"
              className="mt-1.5 text-[11px] font-semibold text-brand-cyan hover:underline inline-flex items-center gap-1 w-fit cursor-pointer"
            >
              Visit Official Website <ExternalLink size={12} />
            </a>
          )}
        </div>
      );
    }
  }

  switch (id) {
    case 'linkedin':
      return (
        <span>
          You can connect with Krunal professionally on LinkedIn here:
          <a
            href="https://www.linkedin.com/in/chaudharikrunal?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3 mt-2 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 hover:border-brand-cyan/40 dark:hover:border-brand-cyan/30 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0077B5]/10 text-[#0077B5] flex items-center justify-center font-bold text-sm shrink-0">
              in
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-cyan transition-colors">
                Krunal Chaudhari
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                QA Automation & Software Engineer
              </div>
            </div>
            <ExternalLink size={14} className="text-slate-400 group-hover:text-brand-cyan transition-colors shrink-0" />
          </a>
        </span>
      );
    case 'github':
      return (
        <span>
          Check out his repositories and code quality on GitHub:
          <a
            href="https://github.com/krunalchaudhari"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3 mt-2 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 hover:border-brand-cyan/40 dark:hover:border-brand-cyan/30 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/10 text-slate-800 dark:text-slate-200 flex items-center justify-center shrink-0">
              <GithubIcon size={20} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-cyan transition-colors">
                krunalchaudhari
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                Repositories, Frameworks & CI/CD Pipelines
              </div>
            </div>
            <ExternalLink size={14} className="text-slate-400 group-hover:text-brand-cyan transition-colors shrink-0" />
          </a>
        </span>
      );
    case 'projects':
      const handleProjClick = (e: React.MouseEvent, projectId: string) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-project-details', { detail: { projectId } }));
        closeChat?.();
      };

      const handleSeeAllClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById('projects');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        closeChat?.();
      };

      return (
        <div className="flex flex-col gap-2.5 mt-2 w-full">
          <span className="text-xs">Here are Krunal's featured QA Automation projects:</span>
          {[
            {
              id: 'p1',
              title: 'Captain Up',
              tech: 'QA • Functional • Regression',
              desc: 'Tested customer engagement and loyalty platforms featuring challenges, tournaments, and reward mechanisms across web and mobile systems.',
            },
            {
              id: 'p2',
              title: 'Challenge Entertainment',
              tech: 'QA Testing • Mobile Trivia',
              desc: 'Rigorous validation of mobile event schedules and interactive trivia platforms used in National Trivia League events.',
            },
            {
              id: 'p3',
              title: 'Selloctave',
              tech: 'Retail Audio Automation',
              desc: 'Verified public-space audio playlist management, voice announcements, and timezone scheduling rules.',
            },
          ].map((proj, idx) => (
            <button
              key={idx}
              onClick={(e) => handleProjClick(e, proj.id)}
              className="flex flex-col gap-1 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-cyan/40 dark:hover:border-brand-cyan/30 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all group text-left cursor-pointer w-full"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-cyan transition-colors">
                  {proj.title}
                </span>
                <ExternalLink size={12} className="text-slate-400 group-hover:text-brand-cyan transition-colors" />
              </div>
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">{proj.tech}</span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-normal mt-0.5">{proj.desc}</p>
            </button>
          ))}

          <button
            onClick={handleSeeAllClick}
            className="mt-1 py-2 rounded-xl border border-brand-cyan/20 bg-brand-cyan/5 hover:bg-brand-cyan/15 text-brand-cyan font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer w-full"
          >
            See All Projects 📁
          </button>
        </div>
      );
    case 'journey':
      return (
        <div className="flex flex-col gap-2.5 mt-2">
          <span className="text-xs">Here is Krunal's professional QA journey:</span>
          {[
            {
              role: 'Junior QA Analyst',
              company: 'Polyxer Systems Pvt Ltd',
              period: 'Dec 2024 - June 2025',
              desc: 'E2E testing of web apps, manual test case designs, defect tracking and release checks.',
            },
            {
              role: 'QA Tester',
              company: 'Rayo Innovations',
              period: 'Jan 2023 - Dec 2024',
              desc: 'Cross-browser testing, API validation in Postman, tracking regressions in Jira, and scripting UI tests in Playwright.',
            },
          ].map((exp, idx) => (
            <div key={idx} className="flex flex-col p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 text-left">
              <div className="flex justify-between items-start gap-1">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 leading-tight">{exp.role}</span>
                <span className="text-[9px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full font-semibold shrink-0">
                  {exp.period}
                </span>
              </div>
              <span className="text-[10px] text-brand-purple font-bold mt-0.5">{exp.company}</span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">{exp.desc}</p>
            </div>
          ))}
        </div>
      );
    case 'services':
      return (
        <div className="flex flex-col gap-2 mt-2">
          <span className="text-xs">Krunal offers these professional software testing services:</span>
          <div className="grid grid-cols-1 gap-2 mt-1">
            {[
              { title: 'Functional Testing', desc: 'Verifying core features work according to functional requirements.' },
              { title: 'UI/UX & Responsiveness', desc: 'Validating layout alignment, cross-device consistency, and typography.' },
              { title: 'Regression Testing', desc: 'Ensuring recent patches do not break pre-existing stability.' },
              { title: 'Bug Reporting & Tracking', desc: 'Logging clean reproduction steps, system details, and capturing assets.' },
              { title: 'Cross Browser Testing', desc: 'Compatibility testing across Chrome, Safari, Firefox, Edge, and iOS/Android.' }
            ].map((srv, idx) => (
              <div key={idx} className="p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 text-left">
                <div className="font-bold text-[11px] text-slate-800 dark:text-slate-200 leading-none">{srv.title}</div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'contact':
      return (
        <div className="flex flex-col gap-2 mt-2 w-full">
          <span className="text-xs">You can reach Krunal through these direct channels:</span>
          <div className="grid grid-cols-1 gap-2 mt-1 w-full">
            <a
              href="tel:+918000456527"
              className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:border-brand-cyan/40 dark:hover:border-brand-cyan/30 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all"
            >
              <span className="w-7 h-7 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
                <Phone size={14} />
              </span>
              <div className="text-left min-w-0">
                <div className="text-[9px] text-slate-400 dark:text-slate-500">Phone</div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">+91 8000456527</div>
              </div>
            </a>
            <a
              href="mailto:krunalchaudhari1008@gmail.com"
              className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:border-brand-cyan/40 dark:hover:border-brand-cyan/30 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all"
            >
              <span className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                <Mail size={14} />
              </span>
              <div className="text-left min-w-0">
                <div className="text-[9px] text-slate-400 dark:text-slate-500">Email</div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate block">
                  krunalchaudhari1008@gmail.com
                </div>
              </div>
            </a>
            <a
              href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=yykwwq"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:border-brand-cyan/40 dark:hover:border-brand-cyan/30 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all"
            >
              <span className="w-7 h-7 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center shrink-0">
                <InstagramIcon size={14} />
              </span>
              <div className="text-left min-w-0">
                <div className="text-[9px] text-slate-400 dark:text-slate-500">Instagram</div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">Connect on IG</div>
              </div>
            </a>
          </div>
        </div>
      );
    case 'cv':
      return (
        <div className="flex flex-col gap-2.5 mt-2">
          <span className="text-xs">Certainly! Download Krunal's latest CV:</span>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
              <FileText size={20} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="font-semibold text-xs text-slate-800 dark:text-slate-200 truncate">
                Krunal_Chaudhari_CV.pdf
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">PDF Document • 120 KB</div>
            </div>
            <a
              href="/Krunal_Chaudhari_CV.pdf"
              target="_blank"
              className="w-8 h-8 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-purple hover:brightness-110 text-white flex items-center justify-center shadow-sm transition-all shrink-0 cursor-pointer"
              aria-label="Download CV"
            >
              <Download size={14} />
            </a>
          </div>
        </div>
      );
    case 'skills':
      return (
        <div className="flex flex-col gap-2.5 mt-2">
          <span className="text-xs">Technologies and QA tools Krunal specializes in:</span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {["Postman", "BrowserStack", "Katalon", "Jira", "JMeter", "Figma", "Sentry", "Bitbucket", "Trello", "ClickUp", "Git"].map((tech) => (
              <span key={tech} className="text-[10px] px-2 py-1 bg-brand-cyan/5 text-brand-cyan border border-brand-cyan/20 rounded-md font-semibold font-mono">
                {tech}
              </span>
            ))}
          </div>
          <div className="p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 text-left flex flex-col gap-1">
            <span className="font-bold text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-wide">Key QA Core Areas</span>
            <ul className="text-[11px] text-slate-600 dark:text-slate-400 grid grid-cols-2 gap-x-3 gap-y-1 list-disc pl-3 mt-1">
              <li>Test Planning & Design</li>
              <li>API Verification</li>
              <li>Functional Testing</li>
              <li>Regression Validation</li>
              <li>Cross-Browser Testing</li>
              <li>Defect Tracking</li>
            </ul>
          </div>
        </div>
      );
    default:
      return "I'm not sure about that! But Krunal would love to answer that personally.";
  }
};

export const processUserMessage = (
  message: string,
  closeChat: () => void,
  onOptionClick: (option: { id: string; text: string }) => void
): React.ReactNode => {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes('hello') || lowerMsg.includes('hi ') || lowerMsg === 'hi' || lowerMsg.includes('hey')) {
    return "Hi there! 👋 How can I help you learn more about Krunal?";
  }

  if (lowerMsg.includes('cv') || lowerMsg.includes('resume') || lowerMsg.includes('download')) {
    return getBotReply('cv', closeChat);
  }

  if (lowerMsg.includes('journey') || lowerMsg.includes('experience') || lowerMsg.includes('history') || lowerMsg.includes('career') || lowerMsg.includes('background')) {
    return getBotReply('journey', closeChat);
  }

  if (lowerMsg.includes('project') || lowerMsg.includes('work') || lowerMsg.includes('portfolio') || lowerMsg.includes('captain up') || lowerMsg.includes('selloctave')) {
    return getBotReply('projects', closeChat);
  }

  if (lowerMsg.includes('service') || lowerMsg.includes('offer') || lowerMsg.includes('what you do') || lowerMsg.includes('testing services')) {
    return getBotReply('services', closeChat);
  }

  if (
    lowerMsg.includes('skill') ||
    lowerMsg.includes('tech') ||
    lowerMsg.includes('stack') ||
    lowerMsg.includes('tool') ||
    lowerMsg.includes('language') ||
    lowerMsg.includes('postman') ||
    lowerMsg.includes('jira')
  ) {
    return getBotReply('skills', closeChat);
  }

  if (lowerMsg.includes('github') || lowerMsg.includes('git') || lowerMsg.includes('repo')) {
    return getBotReply('github', closeChat);
  }

  if (
    lowerMsg.includes('linkedin') ||
    lowerMsg.includes('linkdin') ||
    lowerMsg.includes('profile') ||
    lowerMsg.includes('link') ||
    lowerMsg.includes('social')
  ) {
    return getBotReply('linkedin', closeChat);
  }

  // Fallback response for unhandled textual questions
  return (
    <div className="flex flex-col gap-2 mt-1 mb-1">
      <span className="text-xs">I'm not exactly sure what you mean. Are you looking for one of these? 👇</span>
      <div className="flex flex-wrap gap-2 mt-1">
        {CHAT_FAQS.map((faq) => (
          <button
            key={faq.id}
            onClick={() => onOptionClick(faq)}
            className="text-[11px] px-2.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-brand-cyan/20 text-brand-cyan hover:bg-brand-cyan/5 transition-all font-semibold shadow-sm cursor-pointer"
          >
            {faq.text}
          </button>
        ))}
      </div>
      <span className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
        Or{' '}
        <a href="mailto:krunalchaudhari1008@gmail.com" className="text-brand-cyan hover:underline font-semibold underline">
          Email Krunal
        </a>{' '}
        directly!
      </span>
    </div>
  );
};

