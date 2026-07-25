import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Folder, Plus, Search, Filter, Grid, List, Calendar, ChevronLeft, 
  ChevronRight, MoreHorizontal, User, ShieldAlert, ArrowRight, X, Clock,
  FileText, AlertCircle, CheckCircle2, Archive
} from 'lucide-react';
import { cn } from '../lib/utils';

interface CaseItem {
  id: string;
  code: string;
  title: string;
  description: string;
  detective: string;
  updatedDate: string;
  status: 'INVESTIGATING' | 'OPEN' | 'CLOSED' | 'ARCHIVED';
  progress: number;
  image: string;
  stamp?: 'CLASSIFIED' | 'CLOSED' | 'ARCHIVED';
}

const caseList: CaseItem[] = [
  {
    id: 'case-1',
    code: '#47-A7',
    title: 'The Blackwood Heist',
    description: 'Theft of priceless ruby artifact from Blackwood Museum.',
    detective: 'Arjun Rathore',
    updatedDate: 'May 21, 2025',
    status: 'INVESTIGATING',
    progress: 72,
    image: '/blackwood_museum.png',
    stamp: 'CLASSIFIED',
  },
  {
    id: 'case-2',
    code: '#46-B3',
    title: 'Silverton Alley Murders',
    description: 'Multiple homicides in Silverton district. Victims found in abandoned alley.',
    detective: 'Diya Sharma',
    updatedDate: 'May 20, 2025',
    status: 'OPEN',
    progress: 54,
    image: '/crime_scene_card.png',
  },
  {
    id: 'case-3',
    code: '#45-C2',
    title: 'Midnight Express Robbery',
    description: 'Armed robbery on the 11:45 PM express. High-value assets stolen.',
    detective: 'Vikram Desai',
    updatedDate: 'May 19, 2025',
    status: 'INVESTIGATING',
    progress: 66,
    image: '/getaway_vehicle.png',
  },
  {
    id: 'case-4',
    code: '#44-D1',
    title: 'The Missing Will',
    description: 'Disappearance of original will of Elias Norton.',
    detective: 'Arjun Rathore',
    updatedDate: 'May 18, 2025',
    status: 'CLOSED',
    progress: 100,
    image: '/evidence_note.png',
    stamp: 'CLOSED',
  },
  {
    id: 'case-5',
    code: '#43-E8',
    title: 'Harbor Warehouse Fire',
    description: 'Suspicious fire at warehouse 7. Insurance fraud suspected.',
    detective: 'Rohan Malhotra',
    updatedDate: 'May 17, 2025',
    status: 'OPEN',
    progress: 31,
    image: '/warehouse_location.png',
  },
  {
    id: 'case-6',
    code: '#42-F4',
    title: 'Counterfeit Currency Ring',
    description: 'Illegal printing and distribution of fake currency in the city.',
    detective: 'Kabir Singh',
    updatedDate: 'May 16, 2025',
    status: 'INVESTIGATING',
    progress: 48,
    image: '/evidence_receipt.png',
  },
  {
    id: 'case-7',
    code: '#41-G6',
    title: 'Greenfield Estate Case',
    description: 'Property dispute turned violent. All suspects cleared.',
    detective: 'Meera Iyer',
    updatedDate: 'May 10, 2025',
    status: 'ARCHIVED',
    progress: 100,
    image: '/newspaper_article.png',
    stamp: 'ARCHIVED',
  },
  {
    id: 'case-8',
    code: '#40-H9',
    title: 'Diamond Necklace Theft',
    description: 'Theft during charity gala event. Recovered and suspects arrested.',
    detective: 'Vikram Desai',
    updatedDate: 'May 8, 2025',
    status: 'CLOSED',
    progress: 100,
    image: '/stolen_artifact_card.png',
    stamp: 'CLOSED',
  },
];

export function Cases() {
  const navigate = useNavigate();
  const [cases, setCases] = useState<CaseItem[]>(caseList);
  const [activeTab, setActiveTab] = useState<'All' | 'Investigating' | 'Open' | 'Closed' | 'Archived'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [detectiveFilter, setDetectiveFilter] = useState('All Detectives');
  const [newCaseModalOpen, setNewCaseModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);

  const filteredCases = cases.filter((c) => {
    if (activeTab === 'Investigating' && c.status !== 'INVESTIGATING') return false;
    if (activeTab === 'Open' && c.status !== 'OPEN') return false;
    if (activeTab === 'Closed' && c.status !== 'CLOSED') return false;
    if (activeTab === 'Archived' && c.status !== 'ARCHIVED') return false;

    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase()) && !c.code.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (statusFilter !== 'All Statuses' && c.status !== statusFilter.toUpperCase()) return false;
    if (detectiveFilter !== 'All Detectives' && !c.detective.includes(detectiveFilter)) return false;

    return true;
  });

  return (
    <div className="min-h-full p-6 pb-20 relative overflow-x-hidden font-inter select-none" style={{ background: 'linear-gradient(180deg, #14110f 0%, #0d0a08 100%)' }}>
      
      {/* ── HEADER ── */}
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
        <div>
          <h1 className="font-playfair text-3xl text-[#f5e6c8] font-bold tracking-tight">CASES</h1>
          <p className="font-inter text-xs text-[#8b7a5a] mt-0.5">View and manage all investigation cases.</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Case Archive Tag */}
          <div className="px-4 py-2 bg-[#d4b896] border border-[#5a3b1c] rounded-xs shadow-md flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#8b2e2e]">CASE ARCHIVE</span>
            <span className="font-playfair text-xs font-bold text-[#2a1505]">Restricted Access</span>
          </div>

          <button
            onClick={() => setNewCaseModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest rounded-xs border border-[#5a3b1c] shadow-lg hover:bg-[#28180a] transition-colors"
          >
            <Plus className="w-4 h-4 text-[#c89b3c]" />
            <span>+ New Case</span>
          </button>
        </div>
      </div>

      {/* ── FILTER TABS BAR ── */}
      <div className="max-w-[1440px] mx-auto p-3 bg-[#1a1208] border border-[#5a3b1c]/30 rounded-sm flex items-center justify-between shadow-md mb-5">
        <div className="flex items-center gap-2">
          {/* All Cases */}
          <button
            onClick={() => setActiveTab('All')}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-xs flex items-center gap-2 transition-colors",
              activeTab === 'All' ? "bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c]" : "text-[#8b7a5a] hover:text-[#c89b3c]"
            )}
          >
            <span>All Cases</span>
            <span className="w-4 h-4 rounded-full bg-[#8b2e2e] text-[#f5e6c8] text-[9px] flex items-center justify-center font-mono">
              24
            </span>
          </button>

          {/* Investigating */}
          <button
            onClick={() => setActiveTab('Investigating')}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-xs flex items-center gap-2 transition-colors",
              activeTab === 'Investigating' ? "bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c]" : "text-[#8b7a5a] hover:text-[#c89b3c]"
            )}
          >
            <span>Investigating</span>
            <span className="w-4 h-4 rounded-full bg-[#8b2e2e] text-[#f5e6c8] text-[9px] flex items-center justify-center font-mono">
              12
            </span>
          </button>

          {/* Open */}
          <button
            onClick={() => setActiveTab('Open')}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-xs flex items-center gap-2 transition-colors",
              activeTab === 'Open' ? "bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c]" : "text-[#8b7a5a] hover:text-[#c89b3c]"
            )}
          >
            <span>Open</span>
            <span className="w-4 h-4 rounded-full bg-[#c89b3c] text-[#1a1008] text-[9px] flex items-center justify-center font-mono">
              6
            </span>
          </button>

          {/* Closed */}
          <button
            onClick={() => setActiveTab('Closed')}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-xs flex items-center gap-2 transition-colors",
              activeTab === 'Closed' ? "bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c]" : "text-[#8b7a5a] hover:text-[#c89b3c]"
            )}
          >
            <span>Closed</span>
            <span className="w-4 h-4 rounded-full bg-[#3B5323] text-[#f5e6c8] text-[9px] flex items-center justify-center font-mono">
              5
            </span>
          </button>

          {/* Archived */}
          <button
            onClick={() => setActiveTab('Archived')}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-xs flex items-center gap-2 transition-colors",
              activeTab === 'Archived' ? "bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c]" : "text-[#8b7a5a] hover:text-[#c89b3c]"
            )}
          >
            <span>Archived</span>
            <span className="w-4 h-4 rounded-full bg-gray-600 text-[#f5e6c8] text-[9px] flex items-center justify-center font-mono">
              1
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <select className="bg-[#120b04] border border-[#5a3b1c]/40 text-[#c89b3c] text-xs p-2 rounded-xs font-medium focus:outline-none">
            <option>Sort by: Recently Updated</option>
            <option>Sort by: Case Code</option>
          </select>

          <div className="flex items-center gap-1 p-1 bg-[#120b04] border border-[#5a3b1c]/30 rounded-xs">
            <button className="p-1.5 rounded-xs bg-[#c89b3c] text-[#1a1008]">
              <Grid className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-xs text-[#8b7a5a] hover:text-[#c89b3c]">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN WORKSPACE GRID (2 COLUMNS) ── */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ── LEFT COLUMN: 8 CASE DOSSIER CARDS (8 COLUMNS SPAN) ── */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {filteredCases.map((c) => (
              <motion.div
                key={c.id}
                whileHover={{ scale: 1.02, y: -3 }}
                onClick={() => {
                  if (c.code === '#47-A7') {
                    navigate('/board');
                  } else {
                    setSelectedCase(c);
                  }
                }}
                className="p-3 rounded-xs border shadow-2xl relative cursor-pointer transition-all overflow-hidden flex flex-col justify-between"
                style={{
                  background: 'linear-gradient(150deg, #e8d9b5 0%, #dfcea3 50%, #d4c090 100%)',
                  borderColor: '#5a3b1c',
                }}
              >
                {/* Red Pushpin at Top Center */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#8b2e2e] border-2 border-[#3a0808] shadow-md z-10" />

                {/* Paper Clip at Top Right */}
                <div className="absolute top-2 right-2 w-4 h-7 border-2 border-gray-400 rounded-full rotate-45 opacity-60 pointer-events-none" />

                <div>
                  {/* Top Header Tag & Status */}
                  <div className="flex justify-between items-center mb-2 pr-4">
                    <span className="font-mono text-[10px] font-bold text-[#5a3b1c]">{c.code}</span>
                    <span className={cn(
                      "text-[8px] font-extrabold font-mono tracking-wider px-1.5 py-0.5 rounded-xs uppercase",
                      c.status === 'INVESTIGATING' ? "border border-[#8b2e2e] text-[#8b2e2e] bg-red-900/10" :
                      c.status === 'OPEN' ? "border border-amber-800 text-amber-800 bg-amber-500/10" :
                      c.status === 'CLOSED' ? "border border-emerald-800 text-emerald-800 bg-emerald-500/10" :
                      "border border-gray-600 text-gray-700 bg-gray-500/10"
                    )}>
                      {c.status}
                    </span>
                  </div>

                  {/* Thumbnail Photo / Polaroid */}
                  <div className="w-full h-28 bg-[#1a0f05] rounded-xs overflow-hidden border border-[#5a3b1c]/30 mb-2 relative">
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover grayscale contrast-125 sepia-[0.3]" />
                    
                    {/* Stamp Overlay */}
                    {c.stamp && (
                      <div className={cn(
                        "absolute bottom-1 right-1 border-2 text-[8px] font-extrabold tracking-widest px-1 py-0.5 transform rotate-[-8deg] uppercase",
                        c.stamp === 'CLASSIFIED' ? "border-[#8b2e2e] text-[#8b2e2e]" :
                        c.stamp === 'CLOSED' ? "border-emerald-800 text-emerald-800" :
                        "border-gray-700 text-gray-700"
                      )}>
                        {c.stamp}
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-playfair text-xs font-extrabold text-[#2a1505] leading-tight mb-1 truncate">{c.title}</h3>
                  <p className="font-inter text-[10px] text-[#4a2e14] leading-tight line-clamp-2 mb-2">{c.description}</p>

                  <p className="font-inter text-[9.5px] text-[#5a3b1c]"><span className="font-bold">Detective:</span> {c.detective}</p>
                  <p className="font-mono text-[9px] text-[#5a3b1c]/70 mb-2">Updated: {c.updatedDate}</p>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="w-full h-1 bg-[#5a3b1c]/20 rounded-full overflow-hidden mb-1">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        c.status === 'CLOSED' ? "bg-emerald-700" :
                        c.status === 'ARCHIVED' ? "bg-gray-600" :
                        "bg-[#8b2e2e]"
                      )}
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-end text-[9px] font-mono font-bold text-[#5a3b1c]">
                    <span>{c.progress}%</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center text-xs font-mono text-[#8b7a5a] pt-3">
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 border border-[#5a3b1c]/30 cursor-pointer">‹</span>
              <span className="px-2.5 py-0.5 bg-[#c89b3c] text-[#1a1008] font-bold">1</span>
              <span className="px-2.5 py-0.5 bg-[#1a1208] border border-[#5a3b1c]/30 cursor-pointer">2</span>
              <span className="px-2.5 py-0.5 bg-[#1a1208] border border-[#5a3b1c]/30 cursor-pointer">3</span>
              <span className="px-1 text-[#8b7a5a]">...</span>
              <span className="px-2 py-0.5 border border-[#5a3b1c]/30 cursor-pointer">›</span>
            </div>

            <span>Showing 1 to 8 of 24 cases</span>
          </div>
        </div>

        {/* ── RIGHT COLUMN: 3 STACKED CARDS (4 COLUMNS SPAN) ── */}
        <div className="lg:col-span-4 space-y-5">

          {/* CARD 1: FILTERS */}
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
              FILTERS
            </p>

            <div className="space-y-3 font-inter text-xs">
              <div>
                <label className="block font-bold text-[#5a3b1c] uppercase text-[10px] mb-1">Search Cases</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or keyword..."
                    className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 pr-7 text-xs text-[#2a1505] focus:outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-[#5a3b1c] absolute right-2.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#5a3b1c] uppercase text-[10px] mb-1">Case Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] font-bold focus:outline-none"
                >
                  <option>All Statuses</option>
                  <option value="Investigating">Investigating</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#5a3b1c] uppercase text-[10px] mb-1">Assigned To</label>
                <select
                  value={detectiveFilter}
                  onChange={(e) => setDetectiveFilter(e.target.value)}
                  className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] font-bold focus:outline-none"
                >
                  <option>All Detectives</option>
                  <option>Arjun Rathore</option>
                  <option>Diya Sharma</option>
                  <option>Vikram Desai</option>
                  <option>Rohan Malhotra</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('All Statuses');
                    setDetectiveFilter('All Detectives');
                  }}
                  className="flex-1 py-2 bg-[#1c1309] text-[#8b7a5a] font-cinzel font-bold text-[10px] uppercase border border-[#5a3b1c]"
                >
                  Reset Filters
                </button>
                <button className="flex-1 py-2 bg-[#5a3b1c] text-[#e8d9b5] font-cinzel font-bold text-[10px] uppercase border border-[#8b6a3c]">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* CARD 2: CASE OVERVIEW */}
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
              CASE OVERVIEW
            </p>

            <div className="flex items-center gap-4 my-3">
              {/* Donut Chart SVG */}
              <div className="w-24 h-24 relative flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#8b2e2e" strokeWidth="4" strokeDasharray="50 100" />
                  <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#c89b3c" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-50" />
                  <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#3B5323" strokeWidth="4" strokeDasharray="20.8 100" strokeDashoffset="-75" />
                  <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#4a5568" strokeWidth="4" strokeDasharray="4.2 100" strokeDashoffset="-95.8" />
                </svg>
              </div>

              {/* Legend Percentages */}
              <div className="space-y-1 text-[11px] font-inter text-[#3a220f]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8b2e2e]" />
                  <span>Investigating: <strong className="font-mono">12 (50%)</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c89b3c]" />
                  <span>Open: <strong className="font-mono">6 (25%)</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#3B5323]" />
                  <span>Closed: <strong className="font-mono">5 (20.8%)</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gray-600" />
                  <span>Archived: <strong className="font-mono">1 (4.2%)</strong></span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-[#5a3b1c]/20 pt-2 text-xs font-inter font-bold text-[#2a1505]">
              <span>Total Cases</span>
              <span className="font-mono text-sm">24</span>
            </div>
          </div>

          {/* CARD 3: RECENT ACTIVITY */}
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
              RECENT ACTIVITY
            </p>

            <div className="space-y-3 font-inter text-xs">
              <div>
                <p className="font-bold text-[#2a1505] text-xs">Case #47-A7 updated</p>
                <p className="font-mono text-[10px] text-[#5a3b1c]">May 21, 2025 - 10:24 AM</p>
              </div>
              <div>
                <p className="font-bold text-[#2a1505] text-xs">New evidence added to #46-B3</p>
                <p className="font-mono text-[10px] text-[#5a3b1c]">May 20, 2025 - 04:15 PM</p>
              </div>
              <div>
                <p className="font-bold text-[#2a1505] text-xs">Case #44-D1 closed</p>
                <p className="font-mono text-[10px] text-[#5a3b1c]">May 18, 2025 - 02:30 PM</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ── NEW CASE MODAL ── */}
      <AnimatePresence>
        {newCaseModalOpen && (
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
                onClick={() => setNewCaseModalOpen(false)}
                className="absolute top-4 right-4 text-[#5a3b1c] hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-cinzel text-xl font-bold text-[#2a1505] mb-4">Create New Case File</h3>

              <div className="space-y-4 font-inter text-xs">
                <div>
                  <label className="block font-bold text-[#5a3b1c] uppercase mb-1">Case Title</label>
                  <input
                    type="text"
                    placeholder="e.g. The Silverton Robbery"
                    className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#5a3b1c] uppercase mb-1">Lead Detective</label>
                  <select className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] font-bold focus:outline-none">
                    <option>Arjun Rathore</option>
                    <option>Diya Sharma</option>
                    <option>Vikram Desai</option>
                  </select>
                </div>

                <button
                  onClick={() => setNewCaseModalOpen(false)}
                  className="w-full py-3 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest border border-[#5a3b1c] shadow-lg hover:bg-[#28180a] transition-colors mt-2"
                >
                  Create & Initialize Case
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
