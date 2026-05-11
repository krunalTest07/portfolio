import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronLeft, Bot } from 'lucide-react';
import { CHAT_FAQS, DEFAULT_WELCOME_MESSAGE, getBotReply } from './chatData';

interface Message {
  id: string;
  text: string | React.ReactNode;
  sender: 'user' | 'bot';
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [hasOpened, setHasOpened] = useState(false); // Used to hide the red dot badge
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: DEFAULT_WELCOME_MESSAGE,
      sender: 'bot',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Show welcome popup after 3 seconds if not interacted
    const timer = setTimeout(() => {
      if (!hasOpened && !isOpen) {
        setShowWelcomePopup(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [hasOpened, isOpen]);

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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!hasOpened) setHasOpened(true);
    setShowWelcomePopup(false);
    if (!isOpen) { 
      setIsMinimized(false);
    }
  };

  const handleOptionClick = (option: { id: string; text: string }) => {
    const userMsg: Message = { id: Date.now().toString(), text: option.text, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botText = getBotReply(option.id, () => setIsOpen(false));

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: botText, sender: 'bot' },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 w-[350px] max-w-[calc(100vw-3rem)] h-[450px] max-h-[calc(100vh-8rem)] glass rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 z-[80]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-cyan to-brand-purple p-4 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold flex items-center text-[15px] shrink-0">Portfolio Bot</h3>
                  <p className="text-xs text-white/90 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 block animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 flex flex-col gap-4 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md pb-6 relative">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex max-w-[88%] ${msg.sender === 'user' ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}
                >
                  <div className={`p-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-brand-cyan to-brand-purple text-white rounded-tr-[4px]'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-[4px] border border-slate-100 dark:border-slate-700/50'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex max-w-[85%] mr-auto justify-start">
                  <div className="py-4 px-5 rounded-2xl bg-white dark:bg-slate-800 rounded-tl-[4px] border border-slate-100 dark:border-slate-700/50 shadow-sm flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input / Quick Replies Area */}
            <div className="p-3 bg-white dark:bg-[#0B1121] border-t border-slate-200 dark:border-slate-800 shrink-0">
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2.5 px-1 tracking-wider uppercase">Ask me about:</p>
              <div className="flex flex-wrap gap-2">
                {CHAT_FAQS.map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => handleOptionClick(faq)}
                    disabled={isTyping}
                    className="text-xs px-3 py-1.5 rounded-full border border-brand-cyan/20 text-brand-cyan hover:bg-brand-cyan hover:text-white dark:border-brand-cyan/40 dark:hover:bg-brand-cyan dark:hover:text-white dark:text-brand-cyan transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed bg-brand-cyan/5"
                  >
                    {faq.text}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWelcomePopup && !isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute right-[4.5rem] bottom-2 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/90 text-slate-800 dark:text-slate-100 px-4 py-2.5 rounded-2xl shadow-xl shadow-brand-cyan/10 border border-brand-cyan/20 dark:border-brand-cyan/30 whitespace-nowrap text-sm font-medium z-50 flex items-center gap-2 cursor-pointer"
            onClick={toggleChat}
          >
             <span className="text-xl">👋</span> May I help you?
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowWelcomePopup(false);
              }}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white ml-2 transition-colors focus:outline-none"
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
        <motion.button
          onClick={toggleChat}
          whileHover={{ scale: isMinimized && !isOpen ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`h-14 flex items-center justify-center text-white shadow-xl shadow-brand-cyan/20 transition-all duration-300 relative ${
            isMinimized && !isOpen 
              ? 'w-10 rounded-l-xl bg-gradient-to-r from-brand-cyan to-brand-purple hover:brightness-110 border border-r-0 border-white/20' 
              : 'w-14 rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple hover:shadow-brand-cyan/40'
          }`}
          aria-label="Toggle chat"
        >
          <AnimatePresence mode="wait">
            {isMinimized && !isOpen ? (
              <motion.div key="minimized" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ChevronLeft size={24} />
              </motion.div>
            ) : isOpen ? (
              <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                <X size={26} />
              </motion.div>
            ) : (
              <motion.div key="chat" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                <MessageCircle size={26} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Unread dot notification */}
          {!isOpen && !hasOpened && !isMinimized && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}
