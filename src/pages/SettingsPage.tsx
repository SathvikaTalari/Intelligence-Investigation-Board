import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings as SettingsIcon, Globe, Calendar, Clock, Hash, Home, Layers, 
  Command, Download, Upload, Trash2, Shield, Check, X, ArrowRight, Eye
} from 'lucide-react';
import { cn } from '../lib/utils';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'General' | 'Profile' | 'Preferences' | 'Appearance' | 'Security' | 'Notifications' | 'System'>('General');
  const [language, setLanguage] = useState('English');
  const [dateFormat, setDateFormat] = useState('May 17, 2025');
  const [timeFormat, setTimeFormat] = useState('12 Hour (AM/PM)');
  const [caseIdFormat, setCaseIdFormat] = useState('#47-A7');
  const [defaultDashboard, setDefaultDashboard] = useState('Dashboard');
  const [itemsPerPage, setItemsPerPage] = useState('10');
  const [shortcutsEnabled, setShortcutsEnabled] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState('gold');
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const [saveNotification, setSaveNotification] = useState(false);

  const handleSaveChanges = () => {
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3000);
  };

  const handleSimulateExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ language, dateFormat, timeFormat, caseIdFormat, selectedTheme }));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "detective_bureau_settings.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-full p-6 pb-20 relative overflow-x-hidden font-inter select-none" style={{ background: 'linear-gradient(180deg, #14110f 0%, #0d0a08 100%)' }}>
      
      {/* ── HEADER ── */}
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
        <div>
          <h1 className="font-playfair text-3xl text-[#f5e6c8] font-bold tracking-tight">SETTINGS</h1>
          <p className="font-inter text-xs text-[#8b7a5a] mt-0.5">Customize your experience and manage preferences.</p>
        </div>
      </div>

      {/* ── SETTINGS TABS BAR ── */}
      <div className="max-w-[1440px] mx-auto p-2.5 bg-[#1a1208] border border-[#5a3b1c]/30 rounded-sm flex items-center gap-2 overflow-x-auto shadow-md mb-5">
        {[
          'General', 'Profile', 'Preferences', 'Appearance', 'Security', 'Notifications', 'System'
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-xs transition-colors whitespace-nowrap",
              activeTab === tab ? "bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c] shadow-sm" : "text-[#8b7a5a] hover:text-[#c89b3c]"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── MAIN WORKSPACE GRID (2 COLUMNS) ── */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ── LEFT COLUMN: GENERAL SETTINGS & SHORTCUTS (8 COLUMNS SPAN) ── */}
        <div className="lg:col-span-8 space-y-5">
          
          <div
            className="p-6 rounded-sm border shadow-2xl relative space-y-6"
            style={{
              background: 'linear-gradient(150deg, #e8d9b5 0%, #dfcea3 50%, #d4c090 100%)',
              borderColor: '#5a3b1c',
            }}
          >
            {/* Fine Paper Noise Overlay */}
            <div
              className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundSize: '120px',
              }}
            />

            {/* SECTION 1: GENERAL SETTINGS */}
            <div>
              <p className="font-cinzel text-xs font-extrabold text-[#2a1505] tracking-widest uppercase border-b border-[#5a3b1c]/30 pb-2 mb-4">
                GENERAL SETTINGS
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Language */}
                <div>
                  <label className="font-inter text-xs font-bold text-[#2a1505] block mb-0.5">Language</label>
                  <p className="font-inter text-[10px] text-[#5a3b1c] mb-1.5">Choose your preferred language.</p>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2.5 text-xs text-[#2a1505] font-bold focus:outline-none rounded-xs"
                  >
                    <option>English</option>
                    <option>French</option>
                    <option>Spanish</option>
                    <option>German</option>
                  </select>
                </div>

                {/* Date Format */}
                <div>
                  <label className="font-inter text-xs font-bold text-[#2a1505] block mb-0.5">Date Format</label>
                  <p className="font-inter text-[10px] text-[#5a3b1c] mb-1.5">Choose your preferred date format.</p>
                  <select
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2.5 text-xs text-[#2a1505] font-bold focus:outline-none rounded-xs"
                  >
                    <option>May 17, 2025</option>
                    <option>17 May 2025</option>
                    <option>2025-05-17</option>
                  </select>
                </div>

                {/* Time Format */}
                <div>
                  <label className="font-inter text-xs font-bold text-[#2a1505] block mb-0.5">Time Format</label>
                  <p className="font-inter text-[10px] text-[#5a3b1c] mb-1.5">Choose your preferred time format.</p>
                  <select
                    value={timeFormat}
                    onChange={(e) => setTimeFormat(e.target.value)}
                    className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2.5 text-xs text-[#2a1505] font-bold focus:outline-none rounded-xs"
                  >
                    <option>12 Hour (AM/PM)</option>
                    <option>24 Hour</option>
                  </select>
                </div>

                {/* Case ID Format */}
                <div>
                  <label className="font-inter text-xs font-bold text-[#2a1505] block mb-0.5">Case ID Format</label>
                  <p className="font-inter text-[10px] text-[#5a3b1c] mb-1.5">Choose how case IDs are displayed.</p>
                  <select
                    value={caseIdFormat}
                    onChange={(e) => setCaseIdFormat(e.target.value)}
                    className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2.5 text-xs text-[#2a1505] font-bold focus:outline-none rounded-xs"
                  >
                    <option>#47-A7</option>
                    <option>CASE-2025-47</option>
                    <option>47/A7</option>
                  </select>
                </div>

                {/* Default Dashboard */}
                <div>
                  <label className="font-inter text-xs font-bold text-[#2a1505] block mb-0.5">Default Dashboard</label>
                  <p className="font-inter text-[10px] text-[#5a3b1c] mb-1.5">Choose your default landing page.</p>
                  <select
                    value={defaultDashboard}
                    onChange={(e) => setDefaultDashboard(e.target.value)}
                    className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2.5 text-xs text-[#2a1505] font-bold focus:outline-none rounded-xs"
                  >
                    <option>Dashboard</option>
                    <option>Investigation Board</option>
                    <option>Evidence</option>
                    <option>Maps</option>
                  </select>
                </div>

                {/* Items per page */}
                <div>
                  <label className="font-inter text-xs font-bold text-[#2a1505] block mb-0.5">Items per page</label>
                  <p className="font-inter text-[10px] text-[#5a3b1c] mb-1.5">Number of items to display per page.</p>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(e.target.value)}
                    className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2.5 text-xs text-[#2a1505] font-bold focus:outline-none rounded-xs"
                  >
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                </div>

              </div>
            </div>

            {/* SECTION 2: KEYBOARD SHORTCUTS */}
            <div className="border-t border-[#5a3b1c]/30 pt-5">
              <p className="font-cinzel text-xs font-extrabold text-[#2a1505] tracking-widest uppercase mb-4">
                KEYBOARD SHORTCUTS
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-inter text-xs font-bold text-[#2a1505] block">Enable Shortcuts</span>
                    <span className="font-inter text-[10px] text-[#5a3b1c]">Use keyboard shortcuts for faster navigation.</span>
                  </div>
                  
                  {/* Toggle Switch */}
                  <button
                    onClick={() => setShortcutsEnabled(!shortcutsEnabled)}
                    className={cn(
                      "w-12 h-6 rounded-full p-1 transition-colors relative flex items-center",
                      shortcutsEnabled ? "bg-[#3B5323]" : "bg-[#5a3b1c]/40"
                    )}
                  >
                    <motion.div
                      animate={{ x: shortcutsEnabled ? 24 : 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="w-4 h-4 rounded-full bg-[#f5e6c8] shadow-md"
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="font-inter text-xs font-bold text-[#2a1505] block">View Shortcuts</span>
                    <span className="font-inter text-[10px] text-[#5a3b1c]">See all available keyboard shortcuts.</span>
                  </div>

                  <button
                    onClick={() => setShortcutsModalOpen(true)}
                    className="px-4 py-2 bg-[#1c1309] text-[#f5e6c8] font-inter text-xs font-bold rounded-xs border border-[#5a3b1c] hover:bg-[#281b0c] flex items-center gap-2"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#c89b3c]" />
                  </button>
                </div>
              </div>
            </div>

            {/* BOTTOM ACTION BUTTONS */}
            <div className="flex justify-start gap-4 pt-6 border-t border-[#5a3b1c]/30">
              <button
                onClick={() => {
                  setLanguage('English');
                  setDateFormat('May 17, 2025');
                  setTimeFormat('12 Hour (AM/PM)');
                  setCaseIdFormat('#47-A7');
                  setSelectedTheme('gold');
                }}
                className="px-5 py-2.5 bg-[#1c1309] text-[#8b7a5a] font-cinzel font-bold text-xs uppercase tracking-wider rounded-xs border border-[#5a3b1c] hover:text-white"
              >
                Reset to Default
              </button>

              <button
                onClick={handleSaveChanges}
                className="px-6 py-2.5 bg-[#5a3b1c] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest rounded-xs border border-[#8b6a3c] shadow-lg hover:bg-[#4a2e14] transition-colors"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>

        {/* ── RIGHT COLUMN: 3 STACKED CARDS (4 COLUMNS SPAN) ── */}
        <div className="lg:col-span-4 space-y-5">

          {/* CARD 1: THEME PREVIEW */}
          <div
            className="p-5 rounded-sm shadow-2xl border relative"
            style={{
              background: 'linear-gradient(150deg, #e8d9b5 0%, #dfcea3 50%, #d4c090 100%)',
              borderColor: '#5a3b1c',
            }}
          >
            {/* Red Pushpin */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#8b2e2e] border-2 border-[#3a0808] shadow-md z-10" />

            <p className="font-cinzel text-xs font-bold text-[#2a1505] tracking-widest border-b border-[#5a3b1c]/30 pb-1 mb-3 text-center">
              THEME PREVIEW
            </p>

            {/* Dashboard Thumbnail Preview Frame */}
            <div className="p-1.5 bg-[#1a1208] border border-[#5a3b1c]/40 rounded-xs shadow-md mb-4">
              <img
                src="/theme_preview.png"
                alt="Theme Preview"
                className="w-full h-32 object-cover rounded-xs filter brightness-[0.9] contrast-[1.1]"
              />
            </div>

            {/* Color Swatches */}
            <div className="flex justify-center gap-3">
              {[
                { id: 'gold', color: '#5a3b1c' },
                { id: 'wood', color: '#3a220f' },
                { id: 'noir', color: '#1c1c1c' },
                { id: 'charcoal', color: '#0d0d0d' },
                { id: 'parchment', color: '#d4b896' },
              ].map((swatch) => (
                <button
                  key={swatch.id}
                  onClick={() => setSelectedTheme(swatch.id)}
                  className={cn(
                    "w-8 h-8 rounded-full shadow-md border-2 transition-transform flex items-center justify-center relative",
                    selectedTheme === swatch.id ? "scale-110 border-emerald-500 ring-2 ring-emerald-500/50" : "border-[#3d2612]"
                  )}
                  style={{ background: swatch.color }}
                >
                  {selectedTheme === swatch.id && (
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* CARD 2: QUICK ACTIONS */}
          <div
            className="p-5 rounded-sm shadow-2xl border relative"
            style={{
              background: 'linear-gradient(150deg, #e8d9b5 0%, #dfcea3 50%, #d4c090 100%)',
              borderColor: '#5a3b1c',
            }}
          >
            {/* Red Pushpin */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#8b2e2e] border-2 border-[#3a0808] shadow-md z-10" />

            <p className="font-cinzel text-xs font-bold text-[#2a1505] tracking-widest border-b border-[#5a3b1c]/30 pb-1 mb-3">
              QUICK ACTIONS
            </p>

            <div className="space-y-3 font-inter text-xs">
              
              {/* Export Settings */}
              <div
                onClick={handleSimulateExport}
                className="flex items-center justify-between p-2.5 rounded-xs bg-[#5a3b1c]/10 border border-[#5a3b1c]/20 hover:bg-[#5a3b1c]/20 cursor-pointer transition-colors"
              >
                <div>
                  <span className="font-bold text-[#2a1505] block">Export Settings</span>
                  <span className="text-[10px] text-[#5a3b1c]">Download your settings backup.</span>
                </div>
                <Download className="w-4 h-4 text-[#8b2e2e]" />
              </div>

              {/* Import Settings */}
              <div className="flex items-center justify-between p-2.5 rounded-xs bg-[#5a3b1c]/10 border border-[#5a3b1c]/20 hover:bg-[#5a3b1c]/20 cursor-pointer transition-colors">
                <div>
                  <span className="font-bold text-[#2a1505] block">Import Settings</span>
                  <span className="text-[10px] text-[#5a3b1c]">Import settings from a backup file.</span>
                </div>
                <Upload className="w-4 h-4 text-[#8b2e2e]" />
              </div>

              {/* Clear Cache */}
              <div className="flex items-center justify-between p-2.5 rounded-xs bg-[#5a3b1c]/10 border border-[#5a3b1c]/20 hover:bg-[#5a3b1c]/20 cursor-pointer transition-colors">
                <div>
                  <span className="font-bold text-[#2a1505] block">Clear Cache</span>
                  <span className="text-[10px] text-[#5a3b1c]">Clear application cache and data.</span>
                </div>
                <Trash2 className="w-4 h-4 text-[#8b2e2e]" />
              </div>

              {/* Privacy Policy */}
              <div className="flex items-center justify-between p-2.5 rounded-xs bg-[#5a3b1c]/10 border border-[#5a3b1c]/20 hover:bg-[#5a3b1c]/20 cursor-pointer transition-colors">
                <div>
                  <span className="font-bold text-[#2a1505] block">Privacy Policy</span>
                  <span className="text-[10px] text-[#5a3b1c]">Read our privacy policy.</span>
                </div>
                <Shield className="w-4 h-4 text-[#8b2e2e]" />
              </div>

            </div>
          </div>

          {/* CARD 3: NOTE STICKY NOTE */}
          <div
            className="p-4 shadow-xl transform rotate-[2deg] rounded-xs border relative"
            style={{
              background: 'linear-gradient(135deg, #fffab3 0%, #fef08a 100%)',
              borderColor: 'rgba(180,140,40,0.4)',
            }}
          >
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#8b2e2e] border-2 border-[#3a0808]" />
            <p className="font-inter text-[10px] font-extrabold text-[#4a3500] uppercase tracking-wider mb-1">
              NOTE
            </p>
            <p className="font-cormorant italic text-xs font-bold text-[#2a1505] leading-snug">
              Changes to some settings may require a page reload to take effect.
            </p>

            {/* Bureau Watermark Seal */}
            <div className="absolute bottom-2 right-2 w-10 h-10 border border-[#5a3b1c]/20 rounded-full flex items-center justify-center pointer-events-none">
              <span className="font-cinzel text-[8px] font-bold text-[#5a3b1c]/30">DB</span>
            </div>
          </div>

        </div>

      </div>

      {/* ── SAVE NOTIFICATION TOAST ── */}
      <AnimatePresence>
        {saveNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 p-4 bg-[#1a1208] border-2 border-[#c89b3c] text-[#f5e6c8] shadow-2xl rounded-xs flex items-center gap-3"
          >
            <Check className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="font-cinzel text-xs font-bold text-[#c89b3c]">SETTINGS SAVED</p>
              <p className="font-mono text-[10px] text-[#8b7a5a]">Your preferences have been updated.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SHORTCUTS MODAL ── */}
      <AnimatePresence>
        {shortcutsModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md p-6 rounded-sm border shadow-2xl relative"
              style={{
                background: 'linear-gradient(160deg, #e8d9b5 0%, #d8be99 100%)',
                borderColor: '#5a3b1c',
              }}
            >
              <button
                onClick={() => setShortcutsModalOpen(false)}
                className="absolute top-4 right-4 text-[#5a3b1c] hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-cinzel text-xl font-bold text-[#2a1505] mb-4">Bureau Keyboard Shortcuts</h3>

              <div className="space-y-2.5 font-inter text-xs text-[#2a1505]">
                {[
                  { keys: 'Ctrl + K', action: 'Global Search Palette' },
                  { keys: 'Ctrl + B', action: 'Toggle Investigation Board' },
                  { keys: 'Ctrl + D', action: 'Navigate to Dashboard' },
                  { keys: 'Ctrl + M', action: 'Open Investigation Map' },
                  { keys: 'Ctrl + E', action: 'Open Evidence Library' },
                ].map((s) => (
                  <div key={s.keys} className="flex justify-between items-center p-2 rounded-xs bg-[#f5e6c8] border border-[#5a3b1c]/30">
                    <span>{s.action}</span>
                    <span className="font-mono text-[10px] font-bold bg-[#3d2612] text-[#e8d9b5] px-2 py-0.5 rounded-xs">{s.keys}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShortcutsModalOpen(false)}
                className="w-full mt-5 py-2.5 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest border border-[#5a3b1c] rounded-xs shadow-lg hover:bg-[#28180a]"
              >
                Close Shortcuts
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
