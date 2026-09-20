import React, { useState, useEffect, useRef } from 'react';

interface CommandPaletteProps {
  onNavigate: (sectionId: string) => void;
  onToggleTheme: () => void;
}

export default function CommandPalette({ onNavigate, onToggleTheme }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandItems = [
    { name: 'Go to Home Section', icon: 'fa-home', action: () => onNavigate('home') },
    { name: 'View Professional Skills', icon: 'fa-code', action: () => onNavigate('skills') },
    { name: 'Explore Featured Projects', icon: 'fa-cubes', action: () => onNavigate('projects') },
    { name: 'Read Career Experience', icon: 'fa-briefcase', action: () => onNavigate('experience') },
    { name: 'Discover Services Offered', icon: 'fa-cog', action: () => onNavigate('services') },
    { name: 'Read Client Testimonials', icon: 'fa-comments', action: () => onNavigate('testimonials') },
    { name: 'Browse Blog Articles', icon: 'fa-newspaper', action: () => onNavigate('blog') },
    { name: 'Get in Touch (Contact)', icon: 'fa-paper-plane', action: () => onNavigate('contact') },
    { name: 'Toggle Visual Theme Room', icon: 'fa-adjust', action: () => onToggleTheme() },
  ];

  const filteredItems = commandItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Hook command menu on Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autofocus input when modal is toggled
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleSelect = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex].action);
      }
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 left-4 z-40 hidden md:block">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 hover:border-cyan-500/50 text-slate-300 text-xs font-mono rounded-lg shadow-lg transition-all duration-300"
          title="Press Ctrl+K to trigger Command Palette"
        >
          <span className="flex items-center justify-center w-4 h-4 bg-slate-800 text-slate-400 font-sans border border-slate-700 rounded mr-0.5">⌘</span>
          <span>+</span>
          <span className="flex items-center justify-center w-4 h-4 bg-slate-800 text-slate-400 font-sans border border-slate-700 rounded">K</span>
          <span className="text-slate-400">Command Menu</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-xl bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl shadow-cyan-500/10 scale-100 transition-all duration-300">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-800 block">
          <i className="fas fa-search text-slate-400 mr-3"></i>
          <input
            ref={inputRef}
            type="text"
            className="w-full py-4 bg-transparent outline-none border-none text-slate-100 placeholder-slate-500 font-sans text-md"
            placeholder="Type a command or lookup section..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="text-xs px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-400 font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[300px] overflow-y-auto p-2">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelect(item.action)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-all duration-150 ${
                  index === selectedIndex
                    ? 'bg-gradient-to-r from-cyan-950/40 to-indigo-950/40 border-l-2 border-cyan-500 text-white'
                    : 'text-slate-300 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-7 h-7 rounded-md ${
                    index === selectedIndex ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-900 text-slate-400'
                  }`}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {index === selectedIndex && (
                  <span className="text-slate-500 text-xs font-mono mr-1">↵ ENTER</span>
                )}
              </button>
            ))
          ) : (
            <div className="py-8 text-center text-slate-500 text-sm">
              <i className="fas fa-exclamation-circle text-lg mb-2"></i>
              <p>No commands matched your query</p>
            </div>
          )}
        </div>

        {/* Palette Footer Help Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/60 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
          <div className="flex gap-4">
            <span><i className="fas fa-arrow-up-long"></i> <i className="fas fa-arrow-down-long"></i> Navigate</span>
            <span><strong className="text-slate-300">↵</strong> Select</span>
          </div>
          <span>Karachi UTC+5</span>
        </div>
      </div>
    </div>
  );
}
