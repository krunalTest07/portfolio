import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronLeft, Bot, Send, Sparkles, RefreshCw, FileText, FolderGit2, Mail } from 'lucide-react';
import { CHAT_FAQS, DEFAULT_WELCOME_MESSAGE, getBotReply, processUserMessage } from './chatData';

interface Message {
  id: string;
  text: string | React.ReactNode;
  sender: 'user' | 'bot';
}

function StreamedMessage({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 12);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'chat'>('home');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: DEFAULT_WELCOME_MESSAGE,
      sender: 'bot',
    },
  ]);
  const [streamedMessageIds, setStreamedMessageIds] = useState<Record<string, boolean>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Show welcome popup after 500ms if not interacted
    const timer = setTimeout(() => {
      if (!hasOpened && !isOpen) {
        setShowWelcomePopup(true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [hasOpened, isOpen]);

  useEffect(() => {
    // Clear previously saved corrupted chat messages from localStorage if any
    if (typeof window !== 'undefined') {
      localStorage.removeItem('portfolioChatMessages');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) return; // Don't minimize if chat open
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) > 20) {
        setIsMinimized(true);
        lastScrollY.current = currentScrollY;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    if (currentView === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, currentView]);

  const toggleChat = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    if (nextOpen) {
      if (!hasOpened) setHasOpened(true);
      setShowWelcomePopup(false);
      setIsMinimized(false);
      // If we have messages beyond the welcome message, open in chat view directly
      if (messages.length > 1) {
        setCurrentView('chat');
      } else {
        setCurrentView('home');
      }
    }
  };

  const handleOptionClick = (option: { id: string; text: string }) => {
    const userMsg: Message = { id: Date.now().toString(), text: option.text, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botText = getBotReply(option.id, () => setIsOpen(false), handleOptionClick);

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: botText, sender: 'bot' },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleQuickAction = (option: { id: string; text: string }) => {
    setCurrentView('chat');
    handleOptionClick(option);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setCurrentView('chat');
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botText = processUserMessage(
        userMsg.text as string,
        () => setIsOpen(false),
        handleOptionClick
      );
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: botText, sender: 'bot' },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[80] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-3 w-[320px] sm:w-[360px] max-w-[calc(100vw-1.5rem)] h-[430px] sm:h-[480px] max-h-[calc(100vh-5rem)] sm:max-h-[calc(100vh-8rem)] glass rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 z-[80]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-cyan to-brand-purple p-3.5 sm:p-4 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                {currentView === 'chat' && (
                  <button
                    onClick={() => setCurrentView('home')}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors cursor-pointer mr-0.5 shrink-0"
                    title="Back to Hub"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30 shrink-0">
                  <div className="absolute inset-0 rounded-full border border-white/30 animate-pulse" />
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-slate-900 rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold flex items-center text-xs sm:text-[14px] shrink-0 leading-tight">
                    {currentView === 'home' ? 'AI Assistant Hub' : 'Portfolio Bot'}
                  </h3>
                  <p className="text-[9px] sm:text-[10px] text-white/95 flex items-center gap-1 mt-0.5 leading-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 block animate-pulse"></span>
                    Online & Active
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {currentView === 'chat' && (
                  <button
                    onClick={() => {
                      setMessages([
                        {
                          id: 'welcome',
                          text: DEFAULT_WELCOME_MESSAGE,
                          sender: 'bot',
                        },
                      ]);
                      setStreamedMessageIds({});
                      setCurrentView('home');
                    }}
                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors cursor-pointer shrink-0"
                    title="Reset Conversation"
                  >
                    <RefreshCw className="w-4 h-4 text-white" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors cursor-pointer shrink-0"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Chat/Dashboard Area */}
            <AnimatePresence mode="wait">
              {currentView === 'home' ? (
                <motion.div
                  key="home-view"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 overflow-y-auto overscroll-contain p-4 flex flex-col gap-4 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md pb-6 relative scrollbar-thin"
                >
                  {/* Intro Greeting Card */}
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/50 shadow-sm text-left flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-brand-cyan animate-pulse" />
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs tracking-wide uppercase">
                        Welcome to Portfolio AI
                      </h4>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs leading-relaxed">
                      Hi, I'm Krunal's AI assistant. Ask me anything about his automation expertise, key coding skills,
                      project repositories, or let's connect directly!
                    </p>
                  </div>

                  {/* Quick Hub Grid */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-left">
                      Quick Shortcuts
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleQuickAction({ id: 'projects', text: '💻 Featured Projects' })}
                        className="flex flex-col items-start gap-1 p-2 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 hover:border-brand-cyan/40 dark:hover:border-brand-cyan/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all text-left shadow-sm group cursor-pointer"
                      >
                        <span className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                          <FolderGit2 size={15} />
                        </span>
                        <div>
                          <div className="text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-brand-cyan transition-colors leading-tight">
                            Key Projects
                          </div>
                          <div className="text-[8px] sm:text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">QA & Dev Work</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleQuickAction({ id: 'skills', text: '⚡ Technologies I Use' })}
                        className="flex flex-col items-start gap-1 p-2 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 hover:border-brand-cyan/40 dark:hover:border-brand-cyan/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all text-left shadow-sm group cursor-pointer"
                      >
                        <span className="w-7 h-7 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 flex items-center justify-center shrink-0">
                          <Sparkles size={15} />
                        </span>
                        <div>
                          <div className="text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-brand-cyan transition-colors leading-tight">
                            Tech Stack
                          </div>
                          <div className="text-[8px] sm:text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">Tools & Skills</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleQuickAction({ id: 'journey', text: '🎓 My Journey' })}
                        className="flex flex-col items-start gap-1 p-2 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 hover:border-brand-cyan/40 dark:hover:border-brand-cyan/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all text-left shadow-sm group cursor-pointer"
                      >
                        <span className="w-7 h-7 rounded-lg bg-purple-500/10 text-brand-purple flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </span>
                        <div>
                          <div className="text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-brand-cyan transition-colors leading-tight">
                            My Journey
                          </div>
                          <div className="text-[8px] sm:text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">QA Experience</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleQuickAction({ id: 'services', text: '🛠️ My Services' })}
                        className="flex flex-col items-start gap-1 p-2 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 hover:border-brand-cyan/40 dark:hover:border-brand-cyan/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all text-left shadow-sm group cursor-pointer"
                      >
                        <span className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                        </span>
                        <div>
                          <div className="text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-brand-cyan transition-colors leading-tight">
                            My Services
                          </div>
                          <div className="text-[8px] sm:text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">What I Offer</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleQuickAction({ id: 'contact', text: '📱 Contact Info' })}
                        className="flex flex-col items-start gap-1 p-2 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 hover:border-brand-cyan/40 dark:hover:border-brand-cyan/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all text-left shadow-sm group cursor-pointer"
                      >
                        <span className="w-7 h-7 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
                          <Mail size={15} />
                        </span>
                        <div>
                          <div className="text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-brand-cyan transition-colors leading-tight">
                            Contact Info
                          </div>
                          <div className="text-[8px] sm:text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">Get in Touch</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleQuickAction({ id: 'cv', text: '📄 Download CV' })}
                        className="flex flex-col items-start gap-1 p-2 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 hover:border-brand-cyan/40 dark:hover:border-brand-cyan/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all text-left shadow-sm group cursor-pointer"
                      >
                        <span className="w-7 h-7 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                          <FileText size={15} />
                        </span>
                        <div>
                          <div className="text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-brand-cyan transition-colors leading-tight">
                            Download CV
                          </div>
                          <div className="text-[8px] sm:text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">PDF • 120 KB</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Primary Start Chat CTA */}
                  <button
                    onClick={() => setCurrentView('chat')}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer mt-auto"
                  >
                    <MessageCircle size={15} />
                    Start Live Conversation
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="chat-view"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md pb-6 relative scrollbar-thin"
                >
                  {messages.map((msg, idx) => {
                    const isLatestBotMessage = msg.sender === 'bot' && idx === messages.length - 1;
                    const isStringText = typeof msg.text === 'string';
                    const shouldStream = isLatestBotMessage && isStringText && !streamedMessageIds[msg.id];

                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex max-w-[88%] ${msg.sender === 'user' ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}
                      >
                        <div
                          className={`p-2.5 sm:p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                              ? 'bg-gradient-to-r from-brand-cyan to-brand-purple text-white rounded-tr-[4px]'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-[4px] border border-slate-100 dark:border-slate-700/50'
                            }`}
                        >
                          {shouldStream ? (
                            <StreamedMessage
                              text={msg.text as string}
                              onComplete={() => setStreamedMessageIds((prev) => ({ ...prev, [msg.id]: true }))}
                            />
                          ) : (
                            msg.text
                          )}
                        </div>
                      </motion.div>
                    );
                  })}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex max-w-[85%] mr-auto justify-start"
                    >
                      <div className="py-2.5 px-4 rounded-2xl bg-white dark:bg-slate-800 rounded-tl-[4px] border border-slate-100 dark:border-slate-700/50 shadow-sm flex gap-1.5 items-center">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce"
                          style={{ animationDuration: '1s' }}
                        ></span>
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce"
                          style={{ animationDelay: '0.2s', animationDuration: '1s' }}
                        ></span>
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce"
                          style={{ animationDelay: '0.4s', animationDuration: '1s' }}
                        ></span>
                      </div>
                    </motion.div>
                  )}

                  {/* Quick Replies (Wrapped) */}
                  {!isTyping && messages[messages.length - 1]?.sender === 'bot' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 w-full max-w-[95%] sm:max-w-[90%]"
                    >
                      <div className="flex flex-wrap gap-2">
                        {CHAT_FAQS.map((faq) => (
                          <button
                            key={faq.id}
                            onClick={() => handleOptionClick(faq)}
                            className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white dark:bg-slate-800 border border-brand-cyan/20 text-brand-cyan hover:bg-brand-cyan/5 transition-all font-semibold shadow-sm cursor-pointer"
                          >
                            {faq.text}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} className="h-4" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-2 sm:p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700/50 flex items-center gap-2 shrink-0 relative z-10 w-full"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onFocus={() => {
                  if (currentView === 'home') {
                    setCurrentView('chat');
                  }
                }}
                placeholder={currentView === 'home' ? 'Ask a custom question...' : 'Type a message...'}
                className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:border-brand-cyan/50 dark:focus:border-brand-cyan/50 text-slate-700 dark:text-slate-200"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple flex items-center justify-center text-white shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWelcomePopup && !isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute right-[3rem] sm:right-[4.5rem] bottom-2 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/90 text-slate-800 dark:text-slate-100 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-2xl shadow-xl shadow-brand-cyan/10 border border-brand-cyan/20 dark:border-brand-cyan/30 text-xs sm:text-sm font-medium z-50 flex items-center gap-2 cursor-pointer w-max whitespace-nowrap"
            onClick={toggleChat}
          >
            <span className="text-xl">👋</span> May I help you?
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowWelcomePopup(false);
              }}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white ml-2 transition-colors focus:outline-none cursor-pointer"
            >
              <X size={14} />
            </button>
            {/* Pointer arrow */}
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-slate-50 dark:bg-slate-800 rotate-45 border-r border-t border-brand-cyan/20 dark:border-brand-cyan/30"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ x: isMinimized && !isOpen ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative"
      >
        {/* Glowing Halo Ring behind button when closed */}
        {!isOpen && !isMinimized && (
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple opacity-40 blur-md animate-pulse z-[-1]" />
        )}
        <button
          onClick={toggleChat}
          className={`flex items-center justify-center text-white shadow-xl shadow-brand-cyan/20 transition-all duration-300 relative cursor-pointer ${isMinimized && !isOpen
              ? 'h-10 sm:h-14 w-8 sm:w-10 rounded-l-xl bg-gradient-to-r from-brand-cyan to-brand-purple hover:brightness-110 border border-r-0 border-white/20'
              : isOpen
                ? 'h-12 sm:h-14 w-12 sm:w-14 rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple hover:brightness-105 hover:scale-105 active:scale-95'
                : 'h-12 sm:h-14 px-4 sm:px-5 rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple hover:shadow-brand-cyan/40 hover:brightness-105 hover:scale-[1.04] active:scale-95'
            }`}
          aria-label="Toggle chat"
        >
          <AnimatePresence mode="wait">
            {isMinimized && !isOpen ? (
              <motion.div key="minimized" className="flex items-center justify-center w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
            ) : isOpen ? (
              <motion.div
                key="close"
                className="flex items-center justify-center w-full h-full"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
              >
                <X className="w-5 h-5 sm:w-[26px] sm:h-[26px]" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                className="flex items-center justify-center gap-1.5 w-full h-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs font-black tracking-wider uppercase hidden sm:inline-block">Ask AI</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unread dot notification (Red bubble with "1") */}
          {!isOpen && !hasOpened && !isMinimized && (
            <span className="absolute -top-1 -left-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center animate-pulse z-10 shadow-md">
              1
            </span>
          )}
        </button>
      </motion.div>
    </div>
  );
}

