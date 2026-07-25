import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInvestigationStore } from '../store/useInvestigationStore';
import { 
  Clock, Filter, Calendar, Folder, User, FileText, CheckSquare, 
  Search, Plus, Minus, Paperclip, Grid, List, GitBranch, ChevronDown, Check
} from 'lucide-react';
import { cn } from '../lib/utils';

interface TimelineEventItem {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  officer: string;
  type: 'case' | 'evidence' | 'interview' | 'document' | 'location' | 'arrest';
  image: string;
  stamp?: { text: string; color: 'red' | 'green' | 'blue' };
  location?: string;
  reportedBy?: string;
  value?: string;
  nodeColor: 'green' | 'gold' | 'red';
}

const timelineEvents: TimelineEventItem[] = [
  {
    id: 'evt-1',
    date: 'MAR 17, 1952',
    time: '08:30 AM',
    title: 'Case Opened',
    description: 'The Blackwood Museum reported the theft of the Blackwood Ruby — a priceless artifact valued at over $2 million.',
    officer: 'Det. Arjun Rathore',
    type: 'case',
    image: '/blackwood_museum.png',
    stamp: { text: 'INITIAL REPORT', color: 'green' },
    location: 'Blackwood Museum',
    reportedBy: 'Museum Director',
    value: '$2,000,000',
    nodeColor: 'green',
  },
  {
    id: 'evt-2',
    date: 'MAR 17, 1952',
    time: '10:15 AM',
    title: 'Crime Scene Secured',
    description: 'Museum was secured and initial examination conducted. No signs of forced entry on primary gates.',
    officer: 'Det. Meera Iyer',
    type: 'location',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop',
    location: 'Museum Grand Hall',
    reportedBy: 'Security Lead',
    nodeColor: 'gold',
  },
  {
    id: 'evt-3',
    date: 'MAR 17, 1952',
    time: '12:40 PM',
    title: 'Fingerprints Collected',
    description: 'Partial fingerprints recovered from the display case and nearby window frame.',
    officer: 'Det. Kabir Singh',
    type: 'evidence',
    image: '/fingerprint_collected.png',
    stamp: { text: 'EVIDENCE', color: 'red' },
    location: 'Display Case #4',
    reportedBy: 'Forensics Unit',
    nodeColor: 'gold',
  },
  {
    id: 'evt-4',
    date: 'MAR 18, 1952',
    time: '09:20 AM',
    title: 'Witness Interviewed',
    description: 'Interviewed museum night guard James Moriarty. Claims he was knocked out from behind.',
    officer: 'Det. Diya Sharma',
    type: 'interview',
    image: '/james_moriarty_card.png',
    location: 'Bureau Interview Room B',
    reportedBy: 'James Moriarty',
    nodeColor: 'gold',
  },
  {
    id: 'evt-5',
    date: 'MAR 19, 1952',
    time: '11:05 AM',
    title: 'Note Found',
    description: 'Mysterious note found near the loading dock. Possible clue left by the suspect.',
    officer: 'Det. Vikram Desai',
    type: 'document',
    image: '/stolen_artifact.png',
    stamp: { text: 'POSSIBLE CLUE', color: 'blue' },
    location: 'Loading Dock Alley',
    reportedBy: 'Patrol Officer',
    nodeColor: 'gold',
  },
  {
    id: 'evt-6',
    date: 'MAR 20, 1952',
    time: '04:45 PM',
    title: 'Getaway Vehicle Identified',
    description: 'Surveillance captured a suspicious black truck near the museum at the time of the heist.',
    officer: 'Det. Rohan Malhotra',
    type: 'evidence',
    image: '/getaway_vehicle.png',
    location: 'Dockyard Highway',
    reportedBy: 'Traffic Camera',
    nodeColor: 'gold',
  },
  {
    id: 'evt-7',
    date: 'MAR 22, 1952',
    time: '07:30 PM',
    title: 'Suspect Arrested',
    description: 'Primary suspect, Victor Blackwood, arrested based on evidence and witness statements.',
    officer: 'Det. Arjun Rathore',
    type: 'arrest',
    image: '/suspect_silhouette.png',
    stamp: { text: 'ARREST MADE', color: 'red' },
    location: 'South End Apartment #4B',
    reportedBy: 'Tactical Squad',
    nodeColor: 'red',
  },
];

export function TimelinePage() {
  const [selectedEvt, setSelectedEvt] = useState<TimelineEventItem>(timelineEvents[0]);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'tree'>('list');
  const [zoom, setZoom] = useState(100);
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: boolean }>({
    case: true,
    evidence: true,
    interview: true,
    document: true,
    location: true,
    arrest: true,
  });

  const toggleFilter = (type: string) => {
    setActiveFilters((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const filteredEvents = timelineEvents.filter((e) => activeFilters[e.type]);

  return (
    <div className="min-h-full p-6 pb-20 relative overflow-x-hidden font-inter select-none" style={{ background: 'linear-gradient(180deg, #14110f 0%, #0d0a08 100%)' }}>
      
      {/* ── HEADER ── */}
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
        <div>
          <h1 className="font-playfair text-3xl text-[#f5e6c8] font-bold tracking-tight">CASE TIMELINE</h1>
          <p className="font-inter text-xs text-[#8b7a5a] mt-0.5">Chronological events and investigation progress</p>
        </div>

        {/* Case Folder Tag */}
        <div className="px-4 py-2 bg-[#d4b896] border border-[#5a3b1c] rounded-xs shadow-md flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[#8b2e2e]">CASE #47-A7</span>
          <span className="font-playfair text-xs font-bold text-[#2a1505]">The Blackwood Heist</span>
        </div>
      </div>

      {/* ── MAIN WORKSPACE GRID ── */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">

        {/* ── LEFT & CENTER: TIMELINE WORKSPACE (3 COLUMNS) ── */}
        <div className="lg:col-span-3 flex flex-col space-y-4">

          {/* Timeline View Controls Bar */}
          <div className="p-3 bg-[#1a1208] border border-[#5a3b1c]/30 rounded-sm flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              {/* Event Filter Dropdown */}
              <div className="relative">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-[#120b04] border border-[#5a3b1c]/40 text-xs text-[#c89b3c] font-medium rounded-xs">
                  <span>All Events</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* View Switcher Icons */}
              <div className="flex items-center gap-1 p-1 bg-[#120b04] border border-[#5a3b1c]/30 rounded-xs">
                <button
                  onClick={() => setViewMode('list')}
                  className={cn("p-1.5 rounded-xs transition-colors", viewMode === 'list' ? "bg-[#c89b3c] text-[#1a1008]" : "text-[#8b7a5a] hover:text-[#c89b3c]")}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn("p-1.5 rounded-xs transition-colors", viewMode === 'grid' ? "bg-[#c89b3c] text-[#1a1008]" : "text-[#8b7a5a] hover:text-[#c89b3c]")}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('tree')}
                  className={cn("p-1.5 rounded-xs transition-colors", viewMode === 'tree' ? "bg-[#c89b3c] text-[#1a1008]" : "text-[#8b7a5a] hover:text-[#c89b3c]")}
                  title="Flow Tree View"
                >
                  <GitBranch className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2 text-xs text-[#8b7a5a]">
              <span>Zoom</span>
              <button onClick={() => setZoom((z) => Math.max(z - 10, 80))} className="p-1 text-[#8b7a5a] hover:text-[#c89b3c]">
                <Minus className="w-4 h-4" />
              </button>
              <button onClick={() => setZoom((z) => Math.min(z + 10, 130))} className="p-1 text-[#8b7a5a] hover:text-[#c89b3c]">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Vertical Timeline Track Container */}
          <div
            className="p-6 bg-[#160e06] border border-[#5a3b1c]/40 rounded-sm shadow-2xl relative min-h-[600px] overflow-hidden"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
          >
            {/* Dark Wood Background Texture */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                backgroundSize: '200px',
              }}
            />

            {/* Central Vertical Brass Timeline Line */}
            <div className="absolute left-[200px] top-8 bottom-8 w-1 bg-gradient-to-b from-[#8b6a20] via-[#c89b3c] to-[#5a3b1c] shadow-[0_0_8px_rgba(200,155,60,0.4)]" />

            {/* List of Events */}
            <div className="space-y-6 relative z-10">
              {filteredEvents.map((evt) => {
                const isSelected = selectedEvt.id === evt.id;

                return (
                  <div key={evt.id} className="flex items-center gap-6 group cursor-pointer" onClick={() => setSelectedEvt(evt)}>

                    {/* 1. Left Date Badge Card */}
                    <motion.div
                      whileHover={{ scale: 1.03, x: -2 }}
                      className={cn(
                        "w-40 p-3 rounded-xs shadow-xl border relative flex flex-col items-center text-center transition-all",
                        isSelected ? "bg-[#d4b896] border-[#8b2e2e]" : "bg-[#e8d9b5]/90 border-[#5a3b1c]/50"
                      )}
                    >
                      {/* Red Pushpin */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#8b2e2e] border-2 border-[#3a0808] shadow-md" />

                      <span className="font-mono text-xs font-extrabold text-[#8b2e2e] uppercase tracking-wider mt-1">{evt.date}</span>
                      <span className="font-mono text-[10px] text-[#5a3b1c] font-bold mt-0.5">{evt.time}</span>
                      
                      <div className="mt-2 text-[#5a3b1c]/80">
                        {evt.type === 'case' && <Folder className="w-4 h-4" />}
                        {evt.type === 'location' && <Calendar className="w-4 h-4" />}
                        {evt.type === 'evidence' && <FileText className="w-4 h-4" />}
                        {evt.type === 'interview' && <User className="w-4 h-4" />}
                        {evt.type === 'document' && <FileText className="w-4 h-4" />}
                        {evt.type === 'arrest' && <CheckSquare className="w-4 h-4" />}
                      </div>
                    </motion.div>

                    {/* 2. Center Timeline Node Ring Marker */}
                    <div className="relative flex items-center justify-center w-8 h-8 flex-shrink-0 z-20">
                      <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-125 shadow-lg",
                        evt.nodeColor === 'green' ? "bg-emerald-950 border-emerald-500" :
                        evt.nodeColor === 'red' ? "bg-red-950 border-red-500" :
                        "bg-[#3a2810] border-[#c89b3c]"
                      )}>
                        <div className={cn(
                          "w-2.5 h-2.5 rounded-full",
                          evt.nodeColor === 'green' ? "bg-emerald-400" :
                          evt.nodeColor === 'red' ? "bg-red-500" :
                          "bg-[#c89b3c]"
                        )} />
                      </div>
                    </div>

                    {/* 3. Right Aged Paper Event Card */}
                    <motion.div
                      whileHover={{ scale: 1.01, x: 4 }}
                      className={cn(
                        "flex-1 p-4 rounded-xs shadow-2xl border relative flex items-center gap-5 transition-all overflow-hidden",
                        isSelected ? "ring-2 ring-[#c89b3c]" : ""
                      )}
                      style={{
                        background: 'linear-gradient(150deg, #e8d9b5 0%, #dfcea3 50%, #d4c090 100%)',
                        borderColor: '#5a3b1c',
                      }}
                    >
                      {/* Paper Clip at Top Right */}
                      <Paperclip className="absolute top-2 right-3 w-5 h-5 text-[#5a3b1c]/60 transform rotate-45 pointer-events-none" />

                      {/* Photo on Left of Card */}
                      <div className="w-28 h-24 rounded-xs border border-[#5a3b1c]/30 overflow-hidden flex-shrink-0 bg-black/20">
                        <img src={evt.image} alt={evt.title} className="w-full h-full object-cover grayscale contrast-125 sepia-[0.3]" />
                      </div>

                      {/* Content on Right of Card */}
                      <div className="flex-1 min-w-0 pr-6">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-playfair text-lg font-extrabold text-[#2a1505]">{evt.title}</h3>
                          {evt.stamp && (
                            <div className={cn(
                              "border-2 px-1.5 py-0.5 text-[8px] font-cinzel font-extrabold tracking-widest uppercase transform rotate-[-3deg]",
                              evt.stamp.color === 'green' ? "border-[#5B6E43] text-[#5B6E43]" :
                              evt.stamp.color === 'red' ? "border-[#8b2e2e] text-[#8b2e2e]" :
                              "border-blue-800 text-blue-800"
                            )}>
                              {evt.stamp.text}
                            </div>
                          )}
                        </div>

                        <p className="font-inter text-xs text-[#4a2e14] leading-relaxed mb-3">
                          {evt.description}
                        </p>

                        <p className="font-cormorant italic text-xs text-[#5a3b1c] font-semibold text-right">
                          By {evt.officer}
                        </p>
                      </div>
                    </motion.div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ── RIGHT SIDEBAR: 2 INSPECTOR PANELS ── */}
        <div className="lg:col-span-1 space-y-4">

          {/* PANEL 1: FILTER EVENTS */}
          <div
            className="p-5 rounded-sm shadow-2xl border relative"
            style={{
              background: 'linear-gradient(150deg, #e8d9b5 0%, #dfcea3 50%, #d4c090 100%)',
              borderColor: '#5a3b1c',
            }}
          >
            {/* Red Pushpin */}
            <div className="absolute -top-1.5 right-6 w-4 h-4 rounded-full bg-[#8b2e2e] border-2 border-[#3a0808] shadow-md z-10" />

            <p className="font-cinzel text-xs font-bold text-[#2a1505] tracking-widest border-b border-[#5a3b1c]/30 pb-1 mb-3">
              FILTER EVENTS
            </p>

            <div className="space-y-3">
              <div>
                <label className="font-inter text-[10px] font-bold text-[#5a3b1c] uppercase tracking-wider block mb-1">EVENT TYPE</label>
                <select className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] font-bold focus:outline-none rounded-xs">
                  <option>All Types</option>
                  <option>Case Events</option>
                  <option>Evidence</option>
                  <option>Interviews</option>
                </select>
              </div>

              {/* Checkboxes List */}
              <div className="space-y-2 pt-1 font-inter text-xs text-[#2a1505]">
                {[
                  { key: 'case', label: 'Case Events' },
                  { key: 'evidence', label: 'Evidence' },
                  { key: 'interview', label: 'Interviews' },
                  { key: 'document', label: 'Documents' },
                  { key: 'location', label: 'Locations' },
                  { key: 'arrest', label: 'Arrests' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => toggleFilter(item.key)}
                      className={cn(
                        "w-4 h-4 rounded-xs border flex items-center justify-center transition-colors",
                        activeFilters[item.key] ? "bg-[#8b2e2e] border-[#3a0808] text-white" : "border-[#5a3b1c] bg-transparent"
                      )}
                    >
                      {activeFilters[item.key] && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </label>
                ))}
              </div>

              {/* Date Range Picker */}
              <div className="pt-2 border-t border-[#5a3b1c]/20">
                <label className="font-inter text-[10px] font-bold text-[#5a3b1c] uppercase tracking-wider block mb-1">DATE RANGE</label>
                <div className="flex items-center gap-2">
                  <select className="flex-1 bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] font-bold focus:outline-none rounded-xs">
                    <option>All Time</option>
                    <option>Last 7 Days</option>
                    <option>March 1952</option>
                  </select>
                  <button className="p-2 bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c] rounded-xs">
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 2: DETAILED EVENT INSPECTOR */}
          <div
            className="p-5 rounded-sm shadow-2xl border relative flex flex-col justify-between"
            style={{
              background: 'linear-gradient(150deg, #e8d9b5 0%, #dfcea3 50%, #d4c090 100%)',
              borderColor: '#5a3b1c',
            }}
          >
            {/* Red Pushpin */}
            <div className="absolute -top-1.5 right-6 w-4 h-4 rounded-full bg-[#8b2e2e] border-2 border-[#3a0808] shadow-md z-10" />
            <Paperclip className="absolute top-3 left-3 w-5 h-5 text-[#5a3b1c]/60 transform -rotate-45" />

            <div>
              <p className="font-cinzel text-xs font-extrabold text-[#8b2e2e] tracking-widest border-b border-[#5a3b1c]/30 pb-1 mb-3 pt-2">
                {selectedEvt.title.toUpperCase()}
              </p>

              {/* Event Polaroid Photo */}
              <div className="p-2 pb-4 bg-[#f5e6c8] border border-gray-300 shadow-md rounded-xs mb-3">
                <div className="w-full h-36 bg-[#1a0f05] overflow-hidden mb-2">
                  <img src={selectedEvt.image} alt={selectedEvt.title} className="w-full h-full object-cover grayscale contrast-125 sepia-[0.3]" />
                </div>
              </div>

              {/* Event Description */}
              <p className="font-inter text-xs text-[#2a1505] leading-relaxed mb-4">
                {selectedEvt.description}
              </p>

              {/* Meta Details List */}
              <div className="space-y-2 text-xs font-inter text-[#3a220f] border-t border-[#5a3b1c]/20 pt-3">
                {selectedEvt.location && (
                  <div className="flex justify-between">
                    <span className="text-[#5a3b1c] font-bold text-[10px] uppercase">Location:</span>
                    <span className="font-medium">{selectedEvt.location}</span>
                  </div>
                )}
                {selectedEvt.reportedBy && (
                  <div className="flex justify-between">
                    <span className="text-[#5a3b1c] font-bold text-[10px] uppercase">Reported By:</span>
                    <span className="font-medium">{selectedEvt.reportedBy}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#5a3b1c] font-bold text-[10px] uppercase">Case Officer:</span>
                  <span className="font-bold text-[#8b2e2e]">{selectedEvt.officer}</span>
                </div>
              </div>
            </div>

            {/* Coffee Ring Watermark */}
            <div className="absolute bottom-4 right-4 w-14 h-14 rounded-full border-4 border-[#5a3b1c]/15 pointer-events-none" />
          </div>

        </div>

      </div>

    </div>
  );
}
