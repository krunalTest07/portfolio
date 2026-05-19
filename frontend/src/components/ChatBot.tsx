import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronLeft, Bot, Send } from 'lucide-react';
import { CHAT_FAQS, DEFAULT_WELCOME_MESSAGE, getBotReply, processUserMessage } from './chatData';

interface Message {
  id: string;
  text: string | React.ReactNode;
  sender: 'user' | 'bot';
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [hasOpened, setHasOpened] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolioChatHasOpened') === 'true';
    }
    return false;
  }); // Used to hide the red dot badge & popup
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolioChatMessages');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse saved chat messages", e);
        }
      }
    }
    return [
      {
        id: 'welcome',
        text: DEFAULT_WELCOME_MESSAGE,
        sender: 'bot',
      },
    ];
  });
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
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

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolioChatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolioChatHasOpened', hasOpened.toString());
    }
  }, [hasOpened]);

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

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: inputText, sender: 'user' };
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[80] flex flex-col items-end">
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
                  <div className={`p-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${msg.sender === 'user'
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
              {/* Quick Replies (Wrapped) */}
              {!isTyping && messages[messages.length - 1]?.sender === 'bot' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 w-full max-w-[90%]">
                  <div className="flex flex-wrap gap-2">
                    {CHAT_FAQS.map((faq) => (
                      <button
                        key={faq.id}
                        onClick={() => handleOptionClick(faq)}
                        className="text-[12px] px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/10 transition-colors font-semibold shadow-sm"
                      >
                         {faq.text}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>
            
            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700/50 flex items-center gap-2 shrink-0 relative z-10 w-full">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-brand-cyan/50 dark:focus:border-brand-cyan/50 text-slate-700 dark:text-slate-200"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple flex items-center justify-center text-white shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:shadow-md"
              >
                <Send size={18} className="ml-0.5" />
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
          className={`flex items-center justify-center text-white shadow-xl shadow-brand-cyan/20 transition-all duration-300 relative ${isMinimized && !isOpen
              ? 'h-10 sm:h-14 w-8 sm:w-10 rounded-l-xl bg-gradient-to-r from-brand-cyan to-brand-purple hover:brightness-110 border border-r-0 border-white/20'
              : 'h-12 sm:h-14 w-12 sm:w-14 rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple hover:shadow-brand-cyan/40'
            }`}
          aria-label="Toggle chat"
        >
          <AnimatePresence mode="wait">
            {isMinimized && !isOpen ? (
              <motion.div key="minimized" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
            ) : isOpen ? (
              <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                <X className="w-5 h-5 sm:w-[26px] sm:h-[26px]" />
              </motion.div>
            ) : (
              <motion.div key="chat" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                <MessageCircle className="w-5 h-5 sm:w-[26px] sm:h-[26px]" />
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
