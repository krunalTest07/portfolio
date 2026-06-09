import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, RotateCcw, Sliders, Sparkles } from 'lucide-react';

interface ThemePreset {
  id: string;
  name: string;
  cyan: string;
  purple: string;
  bg: string;
  gradient: string;
}

const PRESETS: ThemePreset[] = [
  {
    id: 'ocean',
    name: 'Ocean Vibe (Original)',
    cyan: '#06b6d4',
    purple: '#8b5cf6',
    bg: '#09090b',
    gradient: 'from-[#06b6d4] to-[#8b5cf6]'
  },
  {
    id: 'hacker',
    name: 'Awwa Hacker',
    cyan: '#d6ff00',
    purple: '#9acd32',
    bg: '#111111',
    gradient: 'from-[#d6ff00] to-[#9acd32]'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    cyan: '#ff007f',
    purple: '#ff5e00',
    bg: '#0c0714',
    gradient: 'from-[#ff007f] to-[#ff5e00]'
  },
  {
    id: 'sunset',
    name: 'Sunset Gold',
    cyan: '#f59e0b',
    purple: '#ef4444',
    bg: '#0f0f12',
    gradient: 'from-[#f59e0b] to-[#ef4444]'
  },
  {
    id: 'nebula',
    name: 'Aura Nebula',
    cyan: '#a855f7',
    purple: '#ec4899',
    bg: '#09050d',
    gradient: 'from-[#a855f7] to-[#ec4899]'
  },
  {
    id: 'mint',
    name: 'Emerald Mint',
    cyan: '#10b981',
    purple: '#047857',
    bg: '#060b09',
    gradient: 'from-[#10b981] to-[#047857]'
  },
  {
    id: 'oled',
    name: 'OLED Stealth',
    cyan: '#ffffff',
    purple: '#64748b',
    bg: '#000000',
    gradient: 'from-[#ffffff] to-[#64748b]'
  }
];

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [themeId, setThemeId] = useState('ocean');
  const [cyanColor, setCyanColor] = useState('#06b6d4');
  const [purpleColor, setPurpleColor] = useState('#8b5cf6');
  const [bgColor, setBgColor] = useState('#09090b');
  const panelRef = useRef<HTMLDivElement>(null);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedThemeId = localStorage.getItem('portfolio-theme-id') || 'ocean';
    const savedCyan = localStorage.getItem('portfolio-brand-cyan');
    const savedPurple = localStorage.getItem('portfolio-brand-purple');
    const savedBg = localStorage.getItem('portfolio-dark-bg');

    setThemeId(savedThemeId);

    if (savedThemeId === 'custom') {
      if (savedCyan) setCyanColor(savedCyan);
      if (savedPurple) setPurpleColor(savedPurple);
      if (savedBg) setBgColor(savedBg);
      applyColors(savedCyan || '#06b6d4', savedPurple || '#8b5cf6', savedBg || '#09090b');
    } else {
      const preset = PRESETS.find(p => p.id === savedThemeId) || PRESETS[0];
      setCyanColor(preset.cyan);
      setPurpleColor(preset.purple);
      setBgColor(preset.bg);
      applyColors(preset.cyan, preset.purple, preset.bg);
    }
  }, []);

  // Close panel on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        // Only close if we are not clicking the floating trigger button
        const trigger = document.getElementById('theme-trigger');
        if (trigger && !trigger.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const applyColors = (cyan: string, purple: string, bg: string) => {
    document.documentElement.style.setProperty('--brand-cyan', cyan);
    document.documentElement.style.setProperty('--brand-purple', purple);
    document.documentElement.style.setProperty('--dark-bg', bg);
  };

  const selectPreset = (preset: ThemePreset) => {
    setThemeId(preset.id);
    setCyanColor(preset.cyan);
    setPurpleColor(preset.purple);
    setBgColor(preset.bg);

    localStorage.setItem('portfolio-theme-id', preset.id);
    localStorage.setItem('portfolio-brand-cyan', preset.cyan);
    localStorage.setItem('portfolio-brand-purple', preset.purple);
    localStorage.setItem('portfolio-dark-bg', preset.bg);

    applyColors(preset.cyan, preset.purple, preset.bg);
  };

  const handleCustomColorChange = (type: 'cyan' | 'purple' | 'bg', value: string) => {
    setThemeId('custom');
    localStorage.setItem('portfolio-theme-id', 'custom');

    let newCyan = cyanColor;
    let newPurple = purpleColor;
    let newBg = bgColor;

    if (type === 'cyan') {
      newCyan = value;
      setCyanColor(value);
      localStorage.setItem('portfolio-brand-cyan', value);
    } else if (type === 'purple') {
      newPurple = value;
      setPurpleColor(value);
      localStorage.setItem('portfolio-brand-purple', value);
    } else if (type === 'bg') {
      newBg = value;
      setBgColor(value);
      localStorage.setItem('portfolio-dark-bg', value);
    }

    applyColors(newCyan, newPurple, newBg);
  };

  const handleHexInputChange = (type: 'cyan' | 'purple' | 'bg', value: string) => {
    const cleanVal = value.trim();
    
    if (type === 'cyan') {
      setCyanColor(cleanVal);
    } else if (type === 'purple') {
      setPurpleColor(cleanVal);
    } else if (type === 'bg') {
      setBgColor(cleanVal);
    }

    const hexRegex = /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/;
    if (hexRegex.test(cleanVal)) {
      let formattedVal = cleanVal;
      if (!formattedVal.startsWith('#')) {
        formattedVal = '#' + formattedVal;
      }
      
      setThemeId('custom');
      localStorage.setItem('portfolio-theme-id', 'custom');

      let newCyan = cyanColor;
      let newPurple = purpleColor;
      let newBg = bgColor;

      if (type === 'cyan') {
        newCyan = formattedVal;
        localStorage.setItem('portfolio-brand-cyan', formattedVal);
      } else if (type === 'purple') {
        newPurple = formattedVal;
        localStorage.setItem('portfolio-brand-purple', formattedVal);
      } else if (type === 'bg') {
        newBg = formattedVal;
        localStorage.setItem('portfolio-dark-bg', formattedVal);
      }

      applyColors(newCyan, newPurple, newBg);
    }
  };

  const resetToDefault = () => {
    const defaultPreset = PRESETS[0];
    selectPreset(defaultPreset);
  };

  return (
    <>
      {/* Floating Toggle Button (Bottom-Left) */}
      <div className="fixed left-4 bottom-4 sm:left-6 sm:bottom-6 z-[80]">
        <motion.button
          id="theme-trigger"
          whileHover={{ scale: 1.08, rotate: 15 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center text-white shadow-xl shadow-brand-purple/20 border border-white/10 cursor-pointer focus:outline-none hover:shadow-brand-purple/40 hover:brightness-110 transition-all"
        >
          <Palette size={22} className="animate-pulse" />
        </motion.button>
      </div>

      {/* Slide-out Customizer Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-20 left-4 bottom-20 sm:left-6 w-[310px] sm:w-[340px] glass-nav-dark rounded-3xl z-[79] p-6 flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-160px)] shadow-2xl border border-white/10 text-white select-none"
          >
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-brand-cyan" />
                  <h3 className="font-mono text-md font-bold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-brand-purple">
                    Theme Customizer
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Theme Presets */}
              <div className="mb-6">
                <span className="text-[10px] font-bold font-mono tracking-widest text-slate-400 uppercase block mb-3">
                  Select Theme Vibe
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {PRESETS.map((preset) => {
                    const isActive = themeId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => selectPreset(preset)}
                        className={`group flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isActive
                            ? 'bg-white/10 border-brand-cyan/60 shadow-[0_0_12px_-3px_var(--color-brand-cyan)]'
                            : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full ${preset.gradient} shrink-0`} />
                        <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                          {preset.name.split(' ')[0] + ' ' + (preset.name.split(' ')[1] || '')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Color Pickers */}
              <div className="border-t border-white/5 pt-5 mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sliders size={14} className="text-brand-purple" />
                  <span className="text-[10px] font-bold font-mono tracking-widest text-slate-400 uppercase">
                    Bespoke Colors
                  </span>
                </div>
                <div className="flex flex-col gap-3.5">
                  {/* Primary Color Picker */}
                  <div className="flex flex-col gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-200">Primary Color</span>
                      <div className="relative w-8 h-8 rounded-full border border-white/20 overflow-hidden cursor-pointer">
                        <input
                          type="color"
                          value={cyanColor.startsWith('#') && (cyanColor.length === 4 || cyanColor.length === 7) ? cyanColor : '#06b6d4'}
                          onChange={(e) => handleCustomColorChange('cyan', e.target.value)}
                          className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] bg-transparent border-0 cursor-pointer p-0"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      value={cyanColor}
                      onChange={(e) => handleHexInputChange('cyan', e.target.value)}
                      placeholder="#06b6d4"
                      className="w-full bg-black/35 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-brand-cyan/50"
                    />
                  </div>

                  {/* Secondary Color Picker */}
                  <div className="flex flex-col gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-200">Secondary Color</span>
                      <div className="relative w-8 h-8 rounded-full border border-white/20 overflow-hidden cursor-pointer">
                        <input
                          type="color"
                          value={purpleColor.startsWith('#') && (purpleColor.length === 4 || purpleColor.length === 7) ? purpleColor : '#8b5cf6'}
                          onChange={(e) => handleCustomColorChange('purple', e.target.value)}
                          className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] bg-transparent border-0 cursor-pointer p-0"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      value={purpleColor}
                      onChange={(e) => handleHexInputChange('purple', e.target.value)}
                      placeholder="#8b5cf6"
                      className="w-full bg-black/35 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-brand-purple/50"
                    />
                  </div>

                  {/* Background Color Picker */}
                  <div className="flex flex-col gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-200">Background Color</span>
                      <div className="relative w-8 h-8 rounded-full border border-white/20 overflow-hidden cursor-pointer">
                        <input
                          type="color"
                          value={bgColor.startsWith('#') && (bgColor.length === 4 || bgColor.length === 7) ? bgColor : '#09090b'}
                          onChange={(e) => handleCustomColorChange('bg', e.target.value)}
                          className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] bg-transparent border-0 cursor-pointer p-0"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => handleHexInputChange('bg', e.target.value)}
                      placeholder="#09090b"
                      className="w-full bg-black/35 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-brand-cyan/50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Footer */}
            <div className="border-t border-white/5 pt-4 flex gap-3">
              <button
                onClick={resetToDefault}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-bold transition-all cursor-pointer"
              >
                <RotateCcw size={12} />
                Restore Defaults
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
