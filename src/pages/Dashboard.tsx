import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInvestigationStore } from '../store/useInvestigationStore';
import { Search, Bell, Folder, Eye, X, Filter, ChevronRight, MapPin, User, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Case } from '../types';

// ─── STYLES & TEXTURES ────────────────────────────────────────────────────────

const paperTextureStyle = {
  background: 'linear-gradient(145deg, #e4cdad 0%, #d8be99 30%, #ceb086 70%, #c4a274 100%)',
  border: '1px solid rgba(90,59,28,0.5)',
};

const cardDarkStyle = {
  background: 'linear-gradient(150deg, #1c1309 0%, #150d05 50%, #100a03 100%)',
  border: '1px solid rgba(90,59,28,0.3)',
};

function FinePaperNoise() {
  return (
    <div
      className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none rounded-inherit"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '120px',
      }}
    />
  );
}

// ─── RUBBER STAMP COMPONENT ──────────────────────────────────────────────────

function RubberStamp({ text, type }: { text: string; type: 'red' | 'green' | 'amber' }) {
  const styles = {
    red: 'border-[#8b2e2e] text-[#8b2e2e]',
    green: 'border-[#5B6E43] text-[#5B6E43]',
    amber: 'border-[#b06a2c] text-[#b06a2c]',
  };
  return (
    <div
      className={cn(
        "absolute bottom-2.5 right-3 px-2 py-0.5 border-2 transform rotate-[-7deg] pointer-events-none select-none",
        styles[type]
      )}
    >
      <span className="font-cinzel text-[9px] font-extrabold tracking-[0.2em] uppercase opacity-90">{text}</span>
    </div>
  );
}

// ─── STAT FILE FOLDER CARD ────────────────────────────────────────────────────

function StatFolderCard({
  title, count, subtitle, icon, stamp, onClick
}: {
  title: string; count: number; subtitle: string;
  icon: React.ReactNode; stamp?: { text: string; type: 'red' | 'green' | 'amber' };
  onClick?: () => void;
}) {
  const [displayNum, setDisplayNum] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / count), 20);
    const timer = setInterval(() => {
      start += Math.ceil(count / 20);
      if (start >= count) {
        setDisplayNum(count);
        clearInterval(timer);
      } else {
        setDisplayNum(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onClick}
      className="relative overflow-hidden rounded-sm cursor-pointer group shadow-vintage-soft"
      style={paperTextureStyle}
    >
      <FinePaperNoise />

      {/* Paper Clip at Top */}
      <div className="absolute -top-2 left-6 w-3 h-7 border-2 border-[#5a3b1c]/60 rounded-full z-20 pointer-events-none" />

      {/* Corner Bracket Rivets */}
      <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-[#5a3b1c]/30" />
      <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#5a3b1c]/30" />

      <div className="relative z-10 p-4 pt-3">
        <p className="font-inter text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-[#4a2e14]/80 mb-2">
          {title}
        </p>

        <div className="flex items-end justify-between">
          <div>
            <span className="font-cormorant text-4xl font-extrabold text-[#2a1505] leading-none tracking-tight">
              {displayNum}
            </span>
            <p className="font-inter text-[10px] text-[#5a3b1c] font-semibold mt-1.5 flex items-center gap-1">
              <span className="text-[#8b2e2e]">↗</span> {subtitle}
            </p>
          </div>
          <div className="text-[#5a3b1c]/40 group-hover:text-[#4a2e14] transition-colors mb-0.5">
            {icon}
          </div>
        </div>
      </div>

      {stamp && <RubberStamp text={stamp.text} type={stamp.type} />}
    </motion.div>
  );
}

// ─── INTERACTIVE CASE OVERVIEW LINE CHART ────────────────────────────────────

function CaseOverviewLineChart() {
  const data = [
    { month: 'Jan', val: 20 },
    { month: 'Feb', val: 32 },
    { month: 'Mar', val: 26 },
    { month: 'Apr', val: 48 },
    { month: 'May', val: 40 },
    { month: 'Jun', val: 56 },
    { month: 'Jul', val: 50 },
    { month: 'Aug', val: 68 },
    { month: 'Sep', val: 62 },
    { month: 'Oct', val: 76 },
    { month: 'Nov', val: 70 },
    { month: 'Dec', val: 84 },
  ];
  const [activePt, setActivePt] = useState<{ month: string; val: number } | null>(null);

  const w = 260;
  const h = 95;
  const max = 90;
  const pointsString = data.map((d, i) => `${(i / (data.length - 1)) * w},${h - (d.val / max) * h}`).join(' ');

  return (
    <div className="relative h-full flex flex-col justify-between pt-1">
      <svg viewBox={`0 0 ${w} ${h + 24}`} className="w-full h-40 overflow-visible">
        <defs>
          <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c89b3c" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#c89b3c" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <line key={v} x1="0" y1={h - v * h} x2={w} y2={h - v * h} stroke="rgba(90,59,28,0.18)" strokeDasharray="2 2" />
        ))}

        {/* Area fill */}
        <polygon points={`0,${h} ${pointsString} ${w},${h}`} fill="url(#lineAreaGrad)" />

        {/* Curved Path Line */}
        <polyline points={pointsString} fill="none" stroke="#c89b3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Interactive Data Points */}
        {data.map((d, i) => {
          const cx = (i / (data.length - 1)) * w;
          const cy = h - (d.val / max) * h;
          return (
            <g key={d.month} className="cursor-pointer group" onMouseEnter={() => setActivePt(d)}>
              <circle cx={cx} cy={cy} r="4" fill="#8b2e2e" stroke="#c89b3c" strokeWidth="1.5" className="transition-transform group-hover:scale-150" />
            </g>
          );
        })}

        {/* Month Labels */}
        {data.map((d, i) => (
          <text key={d.month} x={(i / (data.length - 1)) * w} y={h + 16} fill="rgba(200,155,60,0.6)" fontSize="7" fontStyle="mono" textAnchor="middle">
            {d.month}
          </text>
        ))}
      </svg>

      {/* Pinned Yellow Sticky Note */}
      <motion.div
        whileHover={{ rotate: 0, scale: 1.05 }}
        className="absolute top-2 right-2 p-2.5 w-28 shadow-xl transform rotate-[7deg] cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #fffab3 0%, #fef08a 100%)',
          border: '1px solid rgba(180,140,40,0.4)',
        }}
      >
        {/* Red Push Pin */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#8b2e2e] border-2 border-[#4a0808] shadow-md z-10" />
        <p className="font-cormorant italic text-xs text-[#2a1a08] font-bold leading-tight mt-1">
          {activePt ? `${activePt.month}: ${activePt.val} active cases recorded.` : 'Cases are increasing this quarter.'}
        </p>
      </motion.div>
    </div>
  );
}

// ─── INTERACTIVE DONUT CHART ─────────────────────────────────────────────────

function CaseStatusDonutChart() {
  const segments = [
    { label: 'In Progress', count: 24, pct: 48, color: '#c89b3c' },
    { label: 'Under Review', count: 12, pct: 24, color: '#8b2e2e' },
    { label: 'On Hold', count: 8, pct: 16, color: '#b06a2c' },
    { label: 'Closed', count: 16, pct: 12, color: '#5B6E43' },
  ];
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-5 h-full pt-1">
      {/* SVG Donut */}
      <div className="relative w-32 h-32 flex-shrink-0">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(90,59,28,0.2)" strokeWidth="4.2" />
          {/* Segments */}
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#c89b3c" strokeWidth="4.2" strokeDasharray="48 52" strokeDashoffset="0" className="transition-all hover:stroke-width-[5.5] cursor-pointer" onMouseEnter={() => setHovered('In Progress')} onMouseLeave={() => setHovered(null)} />
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#8b2e2e" strokeWidth="4.2" strokeDasharray="24 76" strokeDashoffset="-48" className="transition-all hover:stroke-width-[5.5] cursor-pointer" onMouseEnter={() => setHovered('Under Review')} onMouseLeave={() => setHovered(null)} />
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#b06a2c" strokeWidth="4.2" strokeDasharray="16 84" strokeDashoffset="-72" className="transition-all hover:stroke-width-[5.5] cursor-pointer" onMouseEnter={() => setHovered('On Hold')} onMouseLeave={() => setHovered(null)} />
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#5B6E43" strokeWidth="4.2" strokeDasharray="12 88" strokeDashoffset="-88" className="transition-all hover:stroke-width-[5.5] cursor-pointer" onMouseEnter={() => setHovered('Closed')} onMouseLeave={() => setHovered(null)} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-cormorant text-2xl font-bold text-[#c89b3c]">60</span>
          <span className="font-inter text-[8px] uppercase tracking-wider text-[#8b7a5a]">Cases</span>
        </div>
      </div>

      {/* Legend List */}
      <div className="space-y-2 text-xs font-inter flex-1">
        {segments.map((seg) => (
          <div
            key={seg.label}
            onMouseEnter={() => setHovered(seg.label)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "flex items-center justify-between p-1 rounded-sm transition-colors cursor-pointer",
              hovered === seg.label ? "bg-[#c89b3c]/15 text-[#c89b3c]" : "text-[#8b7a5a]"
            )}
          >
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: seg.color }} />
              <span className="text-[11px] font-medium">{seg.label}</span>
            </div>
            <span className="font-mono text-[10px] font-bold text-[#c89b3c]">{seg.count} ({seg.pct}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD COMPONENT ─────────────────────────────────────────────────

export function Dashboard() {
  const { cases, evidence, people, setActiveCase } = useInvestigationStore();
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const priorityCasesList = [
    { title: 'The Blackwood Heist', id: 'Case #47-A7', tag: 'HIGH', color: '#8b2e2e' },
    { title: 'Museum Artifact Theft', id: 'Case #39-B2', tag: 'HIGH', color: '#8b2e2e' },
    { title: 'Riverfront Murders', id: 'Case #29-C1', tag: 'MEDIUM', color: '#b06a2c' },
    { title: 'The Missing Developer', id: 'Case #18-D4', tag: 'MEDIUM', color: '#b06a2c' },
    { title: 'Corporate Espionage', id: 'Case #11-E3', tag: 'LOW', color: '#5B6E43' },
  ];

  return (
    <div
      className="min-h-full p-6 pb-20 relative overflow-x-hidden font-inter"
      style={{ background: 'linear-gradient(180deg, #14110f 0%, #0d0a08 100%)' }}
    >
      {/* Search Keyboard Shortcut Listener */}
      <div className="max-w-[1440px] mx-auto space-y-5 relative z-10">

        {/* ── PAGE HEADER ── */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-playfair text-3xl text-[#f5e6c8] font-bold tracking-tight">Dashboard</h1>
            <p className="font-inter text-xs text-[#8b7a5a] mt-0.5">Overview of all investigations and bureau activities</p>
          </div>
        </div>

        {/* ── 6 TOP STAT FILE FOLDERS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <StatFolderCard
            title="Open Cases"
            count={24}
            subtitle="3 this week"
            stamp={{ text: 'ACTIVE', type: 'red' }}
            icon={<Folder className="w-8 h-8" />}
          />
          <StatFolderCard
            title="Solved Cases"
            count={16}
            subtitle="2 this week"
            stamp={{ text: 'CLOSED', type: 'green' }}
            icon={<CheckCircle2 className="w-8 h-8" />}
          />
          <StatFolderCard
            title="Evidence Items"
            count={156}
            subtitle="14 this week"
            stamp={{ text: 'CLASSIFIED', type: 'red' }}
            icon={<FileText className="w-8 h-8" />}
          />
          <StatFolderCard
            title="Suspects"
            count={89}
            subtitle="5 this week"
            icon={<User className="w-8 h-8" />}
          />
          <StatFolderCard
            title="Witnesses"
            count={42}
            subtitle="1 this week"
            icon={<Eye className="w-8 h-8" />}
          />
          <StatFolderCard
            title="Pending Tasks"
            count={18}
            subtitle="6 this week"
            stamp={{ text: 'PENDING', type: 'amber' }}
            icon={<ShieldAlert className="w-8 h-8" />}
          />
        </div>

        {/* ── MIDDLE ROW: 4 MAIN CHARTS / PANELS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* 1. CASE OVERVIEW */}
          <div className="relative overflow-hidden p-4 rounded-sm shadow-vintage-deep transition-all duration-300 hover:-translate-y-1" style={cardDarkStyle}>
            <p className="font-inter text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8b7a5a] mb-2">
              Case Overview
            </p>
            <CaseOverviewLineChart />
          </div>

          {/* 2. CASE STATUS */}
          <div className="relative overflow-hidden p-4 rounded-sm shadow-vintage-deep transition-all duration-300 hover:-translate-y-1" style={cardDarkStyle}>
            <p className="font-inter text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8b7a5a] mb-2">
              Case Status
            </p>
            <CaseStatusDonutChart />
          </div>

          {/* 3. EVIDENCE CATEGORIES */}
          <div className="relative overflow-hidden p-4 rounded-sm shadow-vintage-deep transition-all duration-300 hover:-translate-y-1" style={cardDarkStyle}>
            <p className="font-inter text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8b7a5a] mb-3">
              Evidence Categories
            </p>
            <div className="space-y-3">
              {[
                { name: 'Documents', val: 56, max: 60 },
                { name: 'Photos', val: 42, max: 60 },
                { name: 'Videos', val: 28, max: 60 },
                { name: 'Audio', val: 12, max: 60 },
                { name: 'Fingerprints', val: 10, max: 60 },
                { name: 'Others', val: 8, max: 60 },
              ].map((ev) => (
                <div key={ev.name} className="flex items-center gap-3">
                  <span className="font-inter text-xs text-[#8b7a5a] w-24 truncate">{ev.name}</span>
                  <div className="flex-1 h-2 rounded-sm bg-black/40 overflow-hidden border border-[#5a3b1c]/30">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(ev.val / ev.max) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full rounded-sm"
                      style={{ background: 'linear-gradient(90deg, #c89b3c, #8b6a20)' }}
                    />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#c89b3c] w-6 text-right">{ev.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. PRIORITY CASES (Aged Paper Folder Document) */}
          <div className="relative overflow-hidden p-4 rounded-sm shadow-vintage-soft transition-all duration-300 hover:-translate-y-1" style={paperTextureStyle}>
            <FinePaperNoise />
            {/* Red Pushpin at Top */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#8b2e2e] border-2 border-[#3a0808] shadow-md z-20" />
            
            <div className="relative z-10 flex justify-between items-start mb-3">
              <p className="font-inter text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#4a2e14]">
                Priority Cases
              </p>
              {/* TOP SECRET Rubber Stamp */}
              <div className="border-2 border-[#8b2e2e] text-[#8b2e2e] px-1.5 py-0.5 transform rotate-[-6deg]">
                <span className="font-cinzel text-[8px] font-extrabold tracking-widest uppercase">TOP SECRET</span>
              </div>
            </div>

            <div className="relative z-10 space-y-2">
              {priorityCasesList.map((pc) => (
                <motion.div
                  key={pc.id}
                  whileHover={{ scale: 1.02, x: 2 }}
                  onClick={() => {
                    const found = cases.find(c => c.id === pc.id || c.title === pc.title);
                    if (found) setSelectedCase(found);
                  }}
                  className="flex items-center justify-between p-2 rounded-sm border cursor-pointer transition-colors"
                  style={{
                    background: 'rgba(60,35,14,0.08)',
                    borderColor: 'rgba(90,59,28,0.3)',
                  }}
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-playfair text-xs font-bold text-[#2a1505] truncate">{pc.title}</p>
                    <p className="font-mono text-[9px] text-[#5a3b1c]">{pc.id}</p>
                  </div>
                  <div className="border px-1.5 py-0.5 rounded-xs flex-shrink-0" style={{ borderColor: pc.color, color: pc.color }}>
                    <span className="font-inter text-[8px] font-extrabold tracking-wider">{pc.tag}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* ── BOTTOM ROW: 4 PANELS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* 1. RECENT ACTIVITY */}
          <div className="relative overflow-hidden p-4 rounded-sm shadow-vintage-deep transition-all duration-300 hover:-translate-y-1" style={cardDarkStyle}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#8b2e2e] animate-ping" />
              <p className="font-inter text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8b7a5a]">
                Recent Activity
              </p>
            </div>
            <div className="space-y-3">
              {[
                { text: 'New evidence added in', case: 'The Blackwood Heist', time: '2h ago' },
                { text: 'Witness statement recorded in', case: 'Riverfront Murders', time: '5h ago' },
                { text: 'Suspect profile updated', case: 'James Moriarty', time: '8h ago' },
                { text: 'Crime scene marked on map', case: 'Warehouse District', time: '10h ago' },
                { text: 'Task completed', case: 'Analyze fingerprints', time: '12h ago' },
              ].map((act, i) => (
                <div key={i} className="flex gap-2.5 items-start relative pl-3 border-l border-[#5a3b1c]/40">
                  <div className="absolute -left-1 top-1.5 w-2 h-2 rounded-full bg-[#c89b3c]" />
                  <div className="flex-1 min-w-0">
                    <p className="font-inter text-xs text-[#8b7a5a] leading-snug">{act.text}</p>
                    <p className="font-playfair text-xs text-[#c89b3c] font-semibold truncate">{act.case}</p>
                  </div>
                  <span className="font-mono text-[9px] text-[#5a4a2c] flex-shrink-0">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. CASE HEAT MAP */}
          <div className="relative overflow-hidden p-4 rounded-sm shadow-vintage-deep transition-all duration-300 hover:-translate-y-1" style={cardDarkStyle}>
            <p className="font-inter text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8b7a5a] mb-3">
              Case Heat Map
            </p>
            <div className="relative h-44 rounded-sm overflow-hidden border border-[#5a3b1c]/40 group">
              {/* Vintage Map Background */}
              <img src="/vintage_map.png" alt="City Map" className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.2] sepia-[0.3]" />

              {/* Pulsing Radar Heat Points */}
              <div className="absolute top-[30%] left-[40%] flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-[#8b2e2e]/40 animate-ping absolute" />
                <div className="w-3 h-3 rounded-full bg-[#8b2e2e] border border-white" />
              </div>
              <div className="absolute top-[60%] left-[65%] flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-[#8b2e2e]/40 animate-ping absolute" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#8b2e2e] border border-white" />
              </div>
              <div className="absolute top-[45%] left-[25%] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#c89b3c] drop-shadow-md animate-bounce" />
              </div>

              {/* Polaroid Photo Pinned at Bottom Right */}
              <motion.div
                whileHover={{ scale: 1.3, rotate: 0, zIndex: 50 }}
                className="absolute bottom-2 right-2 p-1 pb-4 bg-[#f5e6c8] shadow-xl border border-gray-300 transform rotate-[-8deg] cursor-pointer"
                style={{ width: 56 }}
              >
                <div className="w-full h-10 bg-[#2a1808] flex items-center justify-center">
                  <span className="text-[7px] font-mono text-[#c89b3c]/60">SCENE</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 3. INVESTIGATOR PERFORMANCE */}
          <div className="relative overflow-hidden p-4 rounded-sm shadow-vintage-deep transition-all duration-300 hover:-translate-y-1" style={cardDarkStyle}>
            <p className="font-inter text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8b7a5a] mb-2">
              Investigator Performance
            </p>
            <div className="flex justify-between text-[9px] font-mono text-[#5a4a2c] uppercase tracking-wider mb-2">
              <span>Investigator</span>
              <span className="flex gap-4"><span>Cases</span><span>Solved</span></span>
            </div>
            <div className="space-y-2.5">
              {[
                { name: 'Arjun Rathore', cases: 12, solved: 8, pct: 67 },
                { name: 'Meera Iyer', cases: 10, solved: 6, pct: 60 },
                { name: 'Rohan Malhotra', cases: 8, solved: 5, pct: 63 },
                { name: 'Kabir Singh', cases: 6, solved: 3, pct: 50 },
                { name: 'Diya Sharma', cases: 4, solved: 2, pct: 50 },
              ].map((inv) => (
                <div key={inv.name} className="flex items-center gap-2.5">
                  <img src={`https://i.pravatar.cc/40?u=${inv.name}`} alt={inv.name} className="w-6 h-6 rounded-full grayscale flex-shrink-0 border border-[#5a3b1c]" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-inter text-xs text-[#c89b3c] font-medium truncate">{inv.name}</span>
                      <span className="font-mono text-[10px] text-[#8b7a5a] flex gap-4 ml-2">
                        <span>{inv.cases}</span>
                        <span className="text-[#c89b3c] font-bold">{inv.solved}</span>
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-black/40 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${inv.pct}%`, background: 'linear-gradient(90deg, #c89b3c, #8b6a20)' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. TASK OVERVIEW (Aged Paper Card) */}
          <div className="relative overflow-hidden p-4 rounded-sm shadow-vintage-soft transition-all duration-300 hover:-translate-y-1" style={paperTextureStyle}>
            <FinePaperNoise />
            <p className="font-inter text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#4a2e14] mb-3">
              Task Overview
            </p>
            <div className="flex items-center gap-3">
              {/* Pie Chart SVG */}
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#8b2e2e" strokeWidth="15.9" strokeDasharray="30 70" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#c89b3c" strokeWidth="15.9" strokeDasharray="23 77" strokeDashoffset="-30" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#b06a2c" strokeWidth="15.9" strokeDasharray="12 88" strokeDashoffset="-53" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#5B6E43" strokeWidth="15.9" strokeDasharray="35 65" strokeDashoffset="-65" />
                </svg>
              </div>

              {/* Legend List */}
              <div className="space-y-1.5 text-[11px] font-inter flex-1">
                {[
                  { color: '#8b2e2e', label: 'Pending', count: 8 },
                  { color: '#c89b3c', label: 'In Progress', count: 6 },
                  { color: '#b06a2c', label: 'Review', count: 3 },
                  { color: '#5B6E43', label: 'Completed', count: 9 },
                ].map((t) => (
                  <div key={t.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-sm" style={{ background: t.color }} />
                      <span className="text-[#3a220f] font-medium">{t.label}</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#2a1505]">{t.count}</span>
                  </div>
                ))}
                <div className="pt-1 border-t border-[#5a3b1c]/30 flex justify-between">
                  <span className="font-bold text-[#4a2e14]">Total</span>
                  <span className="font-mono font-extrabold text-[#2a1505]">26</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* === DESK METAPHOR BOTTOM PROPS === */}
      <div className="mt-8 pt-6 border-t border-[#5a3b1c]/20 flex flex-wrap items-center justify-center gap-12 opacity-80 pointer-events-none select-none">
        {/* Stamped Confidential Folder Stack */}
        <div className="border-2 border-[#8b2e2e] px-6 py-2 transform rotate-[-2deg]">
          <span className="font-cinzel text-[#8b2e2e] text-sm font-extrabold tracking-[0.3em] uppercase">
            CONFIDENTIAL ARCHIVE
          </span>
        </div>
        {/* Brass Magnifying Glass Symbol */}
        <div className="flex items-center gap-2 text-[#c89b3c]/60">
          <span className="font-cormorant italic text-xs">Detective Bureau Investigation Desk</span>
        </div>
        {/* Pocket Watch Label */}
        <div className="border-2 border-[#5B6E43] px-4 py-1 transform rotate-[3deg]">
          <span className="font-cinzel text-[#5B6E43] text-xs font-bold tracking-[0.2em] uppercase">
            CLASSIFIED FILE 1947
          </span>
        </div>
      </div>

      {/* === INTERACTIVE CASE INSPECTION DRAWER === */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex justify-end"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg h-full p-6 relative overflow-y-auto"
              style={paperTextureStyle}
            >
              <FinePaperNoise />
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 p-2 text-[#4a2e14] hover:text-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative z-10 space-y-6 pt-4">
                <div className="border-b border-[#5a3b1c]/30 pb-4">
                  <span className="font-mono text-xs font-bold text-[#8b2e2e] uppercase tracking-widest">{selectedCase.id}</span>
                  <h2 className="font-playfair text-2xl font-extrabold text-[#2a1505] mt-1">{selectedCase.title}</h2>
                  <p className="font-inter text-xs text-[#5a3b1c] mt-2">{selectedCase.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-inter">
                  <div>
                    <span className="text-[#5a3b1c] block text-[10px] uppercase font-bold">Assigned Officer</span>
                    <span className="font-bold text-[#2a1505]">{selectedCase.assignedTo}</span>
                  </div>
                  <div>
                    <span className="text-[#5a3b1c] block text-[10px] uppercase font-bold">Priority</span>
                    <span className="font-bold text-[#8b2e2e]">{selectedCase.priority}</span>
                  </div>
                  <div>
                    <span className="text-[#5a3b1c] block text-[10px] uppercase font-bold">Status</span>
                    <span className="font-bold text-[#5B6E43]">{selectedCase.status}</span>
                  </div>
                  <div>
                    <span className="text-[#5a3b1c] block text-[10px] uppercase font-bold">Progress</span>
                    <span className="font-mono font-bold text-[#2a1505]">{selectedCase.progress}%</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveCase(selectedCase.id);
                    setSelectedCase(null);
                  }}
                  className="w-full py-3 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest rounded-sm border border-[#5a3b1c] shadow-lg hover:bg-[#28180a] transition-colors"
                >
                  Set as Active Case on Board
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
