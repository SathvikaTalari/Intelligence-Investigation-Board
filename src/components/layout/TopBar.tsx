import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Folder, ChevronDown, X, ArrowRight, FileText, Camera, Fingerprint, MapPin } from 'lucide-react';

const searchDatabase = [
  { title: 'The Blackwood Heist', category: 'Case', path: '/board', code: '#47-A7' },
  { title: 'Silverton Alley Murders', category: 'Case', path: '/cases', code: '#46-B3' },
  { title: 'Victor H. Blackwood', category: 'Suspect', path: '/board', code: 'SUSPECT-01' },
  { title: 'James Moriarty', category: 'Witness', path: '/timeline', code: 'WITNESS-02' },
  { title: 'Clara Winters', category: 'Witness', path: '/timeline', code: 'WITNESS-03' },
  { title: 'Broken Window Photo', category: 'Evidence', path: '/evidence', code: 'EV-402' },
  { title: 'Stolen Ceramic Artifact', category: 'Evidence', path: '/evidence', code: 'EV-156' },
  { title: 'Museum Floor Plan', category: 'Document', path: '/documents', code: 'DOC-102' },
  { title: 'Fingerprints Collected', category: 'Evidence', path: '/evidence', code: 'EV-88' },
  { title: 'Investigation Summary Report', category: 'Report', path: '/reports', code: 'REP-001' },
  { title: 'Blackwood City Parchment Map', category: 'Map', path: '/maps', code: 'MAP-01' },
];

export function TopBar() {
  const navigate = useNavigate();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const searchResults = searchDatabase.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header
      className="h-[64px] flex items-center justify-between px-6 flex-shrink-0 relative z-10"
      style={{
        background: 'linear-gradient(180deg, #1a1208 0%, #150f08 100%)',
        borderBottom: '1px solid rgba(90,59,28,0.3)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.5)',
      }}
    >
      {/* Leather texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* LEFT: Page title area */}
      <div className="relative z-10" />

      {/* CENTER: Quote sticky note */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-6 py-2.5 max-w-[380px] w-full hidden md:flex flex-col items-center justify-center z-10 transform rotate-[0.5deg] rounded-xs border border-[#5a3b1c]/40 shadow-xl"
        style={{
          background: 'linear-gradient(145deg, #f0dfb3 0%, #e5cf9d 100%)',
          boxShadow: '0 6px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(90,59,28,0.4)',
        }}
      >
        {/* Brass pushpin at top */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#8b2e2e] border border-[#3a0808] shadow-md" />
        
        <p className="font-playfair italic text-xs md:text-sm font-bold text-[#2a1708] leading-tight text-center tracking-wide">
          "Every clue, no matter how small, brings us closer to the truth."
        </p>
        <p className="text-right w-full text-[10px] font-mono font-bold text-[#8b2e2e] mt-0.5 pr-1">
          — Sherlock Holmes
        </p>
      </div>

      {/* RIGHT: Search + actions + avatar */}
      <div className="flex items-center gap-4 relative z-10 ml-auto">
        
        {/* Search Input Trigger */}
        <div
          onClick={() => setSearchModalOpen(true)}
          className="relative cursor-pointer"
        >
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5a4a2c]" />
          <input
            type="text"
            readOnly
            placeholder="Search cases, evidence, persons..."
            className="pl-9 pr-14 py-2 text-xs font-inter text-[#c89b3c] placeholder-[#5a4a2c] focus:outline-none w-60 cursor-pointer"
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(90,59,28,0.4)',
            }}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#5a4a2c]">Ctrl / K</span>
        </div>

        {/* Bell Button */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative text-[#5a4a2c] hover:text-[#c89b3c] transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <div
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
            style={{ background: '#8b2e2e' }}
          >
            12
          </div>
        </button>

        {/* Folder Button */}
        <button
          onClick={() => navigate('/cases')}
          className="text-[#5a4a2c] hover:text-[#c89b3c] transition-colors"
          title="Cases Archive"
        >
          <Folder className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-[#5a3b1c]/30" />

        {/* Detective profile */}
        <div className="relative">
          <div
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div
              className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0"
              style={{ border: '2px solid rgba(200,155,60,0.3)' }}
            >
              <img
                src="/detective_bg.png"
                alt="Detective"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
            <div>
              <p className="text-[9px] font-inter text-[#5a4a2c] uppercase tracking-wider">Detective</p>
              <p className="text-[13px] font-inter text-[#c89b3c] font-medium leading-none">Arjun Rathore</p>
            </div>
            <ChevronDown className="w-3 h-3 text-[#5a4a2c] group-hover:text-[#c89b3c]" />
          </div>

          {/* Profile Dropdown Menu */}
          <AnimatePresence>
            {profileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-12 w-48 bg-[#1e140a] border border-[#5a3b1c] rounded-xs shadow-2xl z-50 p-2 space-y-1 font-inter text-xs"
              >
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    navigate('/settings');
                  }}
                  className="w-full flex items-center gap-2 p-2 text-[#f5e6c8] hover:bg-[#3d2612] rounded-xs transition-colors"
                >
                  <span>⚙️</span>
                  <span>Bureau Settings</span>
                </button>

                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-2 p-2 text-[#8b2e2e] hover:bg-red-900/20 rounded-xs transition-colors font-bold"
                >
                  <span>🔒</span>
                  <span>Lock Desk (Logout)</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── GLOBAL SEARCH COMMAND PALETTE MODAL ── */}
      <AnimatePresence>
        {searchModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 z-50 flex items-start justify-center pt-20 p-4"
            onClick={() => setSearchModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl p-4 rounded-sm border shadow-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #1e140a 0%, #150d06 100%)',
                borderColor: '#5a3b1c',
              }}
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 pb-3 border-b border-[#5a3b1c]/40">
                <Search className="w-5 h-5 text-[#c89b3c]" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to search cases, suspects, evidence, or documents..."
                  className="flex-1 bg-transparent text-sm text-[#f5e6c8] placeholder-[#8b7a5a] focus:outline-none font-inter"
                />
                <button
                  onClick={() => setSearchModalOpen(false)}
                  className="text-[#8b7a5a] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results Feed */}
              <div className="max-h-80 overflow-y-auto py-2 divide-y divide-[#5a3b1c]/20">
                {searchResults.length > 0 ? (
                  searchResults.map((res, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSearchModalOpen(false);
                        navigate(res.path);
                      }}
                      className="p-3 hover:bg-[#3d2612]/40 rounded-xs cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-playfair text-sm font-bold text-[#f5e6c8]">{res.title}</span>
                          <span className="font-mono text-[9px] text-[#8b2e2e] bg-red-900/20 px-1.5 py-0.5 rounded-xs border border-red-900/40">
                            {res.code}
                          </span>
                        </div>
                        <p className="font-inter text-xs text-[#8b7a5a] mt-0.5">{res.category}</p>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-[#c89b3c] font-cinzel font-bold">
                        <span>Open</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs font-mono text-[#8b7a5a]">
                    No matching case records found. Try "Blackwood", "Evidence", or "Floor Plan".
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-[#5a3b1c]/30 flex justify-between items-center text-[10px] font-mono text-[#8b7a5a]">
                <span>Navigation: Click or press ESC to close</span>
                <span>Press Ctrl+K anytime</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

