import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInvestigationStore } from '../store/useInvestigationStore';
import { 
  FileText, Search, Plus, Filter, Download, Printer, Share2, Eye, Edit3, 
  ArrowLeft, Paperclip, ChevronRight, X, Calendar, User, ShieldAlert, Check
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ReportItem {
  id: string;
  title: string;
  type: string;
  caseName: string;
  caseId: string;
  officer: string;
  date: string;
  stamp?: { text: string; color: 'red' | 'orange' | 'green' };
  summary: string;
  location: string;
  incidentType: string;
  status: string;
  priority: string;
  officersCount: number;
  evidenceCount: number;
  keyFindings: string[];
  image: string;
}

const reportsList: ReportItem[] = [
  {
    id: 'rep-1',
    title: 'INVESTIGATION SUMMARY REPORT',
    type: 'Investigation Summary',
    caseName: 'The Blackwood Heist',
    caseId: '#47-A7',
    officer: 'Detective Arjun Rathore',
    date: 'May 18, 1952',
    stamp: { text: 'TOP SECRET', color: 'red' },
    summary: 'This report summarizes the investigation into the theft of the Blackwood Ruby, a priceless artifact stolen from the Blackwood Museum on March 17, 1952. The investigation has identified key suspects, recovered critical evidence, and established a clear timeline of events.',
    location: 'Blackwood Museum',
    incidentType: 'Artifact Theft',
    status: 'Under Investigation',
    priority: 'HIGH',
    officersCount: 5,
    evidenceCount: 156,
    keyFindings: [
      'Forced entry at the east gallery window.',
      'Security system was disabled 15 minutes before the theft.',
      'Footprints match primary suspect Victor Blackwood.',
      'Witness saw a suspicious black delivery vehicle near the docks.',
    ],
    image: '/blackwood_museum.png',
  },
  {
    id: 'rep-2',
    title: 'EVIDENCE ANALYSIS REPORT',
    type: 'Evidence Analysis',
    caseName: 'The Blackwood Heist',
    caseId: '#47-A7',
    officer: 'Det. Meera Iyer',
    date: 'May 16, 1952',
    stamp: { text: 'CONFIDENTIAL', color: 'red' },
    summary: 'Detailed lab analysis of physical items recovered from crime scene including glass shards, fiber threads, and tire tread impressions.',
    location: 'Forensics Lab B',
    incidentType: 'Forensic Evaluation',
    status: 'Completed',
    priority: 'HIGH',
    officersCount: 3,
    evidenceCount: 42,
    keyFindings: [
      'Glass shards confirmed shattered from inside out.',
      'Glove fiber matched high-grade leather material.',
      'Tire treads indicate 1950 commercial van.',
    ],
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'rep-3',
    title: 'WITNESS STATEMENTS REPORT',
    type: 'Witness Statements',
    caseName: 'The Blackwood Heist',
    caseId: '#47-A7',
    officer: 'Det. Diya Sharma',
    date: 'May 15, 1952',
    summary: 'Compilation of formal interviews conducted with museum night guard James Moriarty and dock worker witnesses.',
    location: 'Interview Room A',
    incidentType: 'Witness Interview',
    status: 'Logged',
    priority: 'MEDIUM',
    officersCount: 2,
    evidenceCount: 12,
    keyFindings: [
      'Guard claims he was ambushed from behind.',
      'Dock worker spotted black van parked near Warehouse #12.',
    ],
    image: 'https://i.pravatar.cc/300?u=james',
  },
  {
    id: 'rep-4',
    title: 'SUSPECT PROFILE REPORT',
    type: 'Suspect Profile',
    caseName: 'Victor Blackwood',
    caseId: '#47-A7',
    officer: 'Det. Kabir Singh',
    date: 'May 14, 1952',
    stamp: { text: 'CLASSIFIED', color: 'orange' },
    summary: 'Criminal background history, financial debts, and known associates profile for primary suspect Victor H. Blackwood.',
    location: 'Bureau Intelligence',
    incidentType: 'Background Check',
    status: 'Under Review',
    priority: 'HIGH',
    officersCount: 4,
    evidenceCount: 28,
    keyFindings: [
      'Heavy gambling debts reported at casino.',
      'Direct motive tied to insurance payout claim.',
    ],
    image: '/suspect_silhouette.png',
  },
  {
    id: 'rep-5',
    title: 'CRIME SCENE REPORT',
    type: 'Crime Scene Report',
    caseName: 'The Blackwood Museum',
    caseId: '#47-A7',
    officer: 'Det. Rohan Malhotra',
    date: 'May 10, 1952',
    summary: 'Initial walkthrough observations and spatial mapping of the museum grand hall and display case #4.',
    location: 'Grand Gallery Hall',
    incidentType: 'Scene Walkthrough',
    status: 'Secured',
    priority: 'HIGH',
    officersCount: 6,
    evidenceCount: 60,
    keyFindings: [
      'Display case glass cut with diamond cutter.',
      'Alarm wiring severed cleanly.',
    ],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'rep-6',
    title: 'FORENSIC ANALYSIS REPORT',
    type: 'Forensic Report',
    caseName: 'The Blackwood Heist',
    caseId: '#47-A7',
    officer: 'Forensic Unit',
    date: 'May 09, 1952',
    stamp: { text: 'EVIDENCE', color: 'red' },
    summary: 'Chemical composition report on liquid residues found near east corridor entry.',
    location: 'Chemistry Unit',
    incidentType: 'Chemical Trace',
    status: 'Completed',
    priority: 'MEDIUM',
    officersCount: 2,
    evidenceCount: 8,
    keyFindings: [
      'Industrial lubricant detected on lock mechanism.',
    ],
    image: '/stolen_artifact.png',
  },
];

export function ReportsPage() {
  const [selectedRep, setSelectedRep] = useState<ReportItem>(reportsList[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newReportModalOpen, setNewReportModalOpen] = useState(false);
  const [downloadNotification, setDownloadNotification] = useState(false);

  const filteredReports = reportsList.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSimulateDownload = () => {
    setDownloadNotification(true);
    setTimeout(() => setDownloadNotification(false), 3000);
  };

  return (
    <div className="min-h-full p-6 pb-20 relative overflow-x-hidden font-inter select-none" style={{ background: 'linear-gradient(180deg, #14110f 0%, #0d0a08 100%)' }}>
      
      {/* ── HEADER ── */}
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="font-playfair text-3xl text-[#f5e6c8] font-bold tracking-tight">REPORTS</h1>
            <p className="font-inter text-xs text-[#8b7a5a] mt-0.5">Generate, view and analyze investigation reports.</p>
          </div>
          {/* CONFIDENTIAL Rubber Stamp */}
          <div className="border-2 border-[#8b2e2e] text-[#8b2e2e] px-2.5 py-0.5 transform rotate-[-4deg]">
            <span className="font-cinzel text-xs font-extrabold tracking-widest uppercase">CONFIDENTIAL</span>
          </div>
        </div>

        <button
          onClick={() => setNewReportModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest rounded-xs border border-[#5a3b1c] shadow-lg hover:bg-[#28180a] transition-colors"
        >
          <Plus className="w-4 h-4 text-[#c89b3c]" />
          <span>+ New Report</span>
        </button>
      </div>

      {/* ── TOP FILTER TOOLBAR ── */}
      <div className="max-w-[1440px] mx-auto p-3 bg-[#1a1208] border border-[#5a3b1c]/30 rounded-sm flex flex-wrap items-center justify-between gap-3 shadow-md mb-5">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b7a5a]" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#120b04] border border-[#5a3b1c]/40 text-xs text-[#f5e6c8] placeholder-[#8b7a5a] focus:outline-none focus:border-[#c89b3c]"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-inter">
          <select className="bg-[#120b04] border border-[#5a3b1c]/40 text-[#c89b3c] p-1.5 rounded-xs font-medium focus:outline-none">
            <option>All Types</option>
            <option>Investigation Summary</option>
            <option>Evidence Analysis</option>
          </select>

          <select className="bg-[#120b04] border border-[#5a3b1c]/40 text-[#c89b3c] p-1.5 rounded-xs font-medium focus:outline-none">
            <option>All Cases</option>
            <option>The Blackwood Heist</option>
          </select>

          <select className="bg-[#120b04] border border-[#5a3b1c]/40 text-[#c89b3c] p-1.5 rounded-xs font-medium focus:outline-none">
            <option>All Officers</option>
            <option>Det. Arjun Rathore</option>
          </select>

          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#120b04] border border-[#5a3b1c]/40 text-[#8b7a5a] hover:text-[#c89b3c] rounded-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>Date Range</span>
          </button>

          <select className="bg-[#120b04] border border-[#5a3b1c]/40 text-[#8b7a5a] p-1.5 rounded-xs font-medium focus:outline-none">
            <option>Sort: Newest First</option>
            <option>Sort: Oldest First</option>
          </select>
        </div>
      </div>

      {/* ── MAIN WORKSPACE GRID (3 COLUMNS) ── */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ── COLUMN 1: ALL REPORTS LIST (3 COLUMNS SPAN) ── */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="font-mono text-xs font-bold text-[#8b7a5a] uppercase">ALL REPORTS</span>
            <span className="font-mono text-[10px] text-[#5a3b1c]">6 Reports Available</span>
          </div>

          <div className="space-y-3">
            {filteredReports.map((rep) => {
              const isSelected = selectedRep.id === rep.id;

              return (
                <motion.div
                  key={rep.id}
                  whileHover={{ scale: 1.02, x: 2 }}
                  onClick={() => setSelectedRep(rep)}
                  className={cn(
                    "p-4 rounded-xs border shadow-xl relative cursor-pointer transition-all overflow-hidden",
                    isSelected ? "ring-2 ring-[#c89b3c]" : ""
                  )}
                  style={{
                    background: 'linear-gradient(150deg, #e8d9b5 0%, #dfcea3 50%, #d4c090 100%)',
                    borderColor: '#5a3b1c',
                  }}
                >
                  {/* Paper Clip at Top Right */}
                  <Paperclip className="absolute top-2 right-3 w-5 h-5 text-[#5a3b1c]/60 transform rotate-45 pointer-events-none" />

                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-[#8b2e2e] flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0 pr-6">
                      <h3 className="font-playfair text-sm font-extrabold text-[#2a1505] leading-tight mb-0.5">
                        {rep.title}
                      </h3>
                      <p className="font-playfair text-xs font-bold text-[#8b2e2e] truncate">{rep.caseName}</p>
                      <p className="font-mono text-[9px] text-[#5a3b1c] mb-2">{rep.caseId}</p>

                      <div className="flex justify-between items-end border-t border-[#5a3b1c]/20 pt-2">
                        <span className="font-inter text-[10px] text-[#5a3b1c] italic">By {rep.officer} • {rep.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stamp Badge */}
                  {rep.stamp && (
                    <div className={cn(
                      "absolute bottom-2.5 right-3 border-2 px-1.5 py-0.5 text-[8px] font-cinzel font-extrabold tracking-widest uppercase transform rotate-[-5deg]",
                      rep.stamp.color === 'red' ? "border-[#8b2e2e] text-[#8b2e2e]" : "border-amber-700 text-amber-700"
                    )}>
                      {rep.stamp.text}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between text-xs font-mono text-[#8b7a5a] pt-2 px-1">
            <span>Showing 1 to 6 of 24 reports</span>
            <div className="flex gap-1">
              <span className="px-2 py-0.5 bg-[#c89b3c] text-[#1a1008] font-bold">1</span>
              <span className="px-2 py-0.5 bg-[#1a1208] border border-[#5a3b1c]/30 text-[#8b7a5a]">2</span>
              <span className="px-2 py-0.5 bg-[#1a1208] border border-[#5a3b1c]/30 text-[#8b7a5a]">3</span>
            </div>
          </div>
        </div>

        {/* ── COLUMN 2: OFFICIAL REPORT READER / PREVIEW (5 COLUMNS SPAN) ── */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          
          {/* Action Toolbar */}
          <div className="p-2.5 bg-[#1a1208] border border-[#5a3b1c]/30 rounded-sm flex flex-wrap items-center justify-between gap-2 shadow-md">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 px-2.5 py-1 bg-[#120b04] border border-[#5a3b1c]/40 text-xs text-[#8b7a5a] hover:text-[#c89b3c] rounded-xs">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1 bg-[#120b04] border border-[#5a3b1c]/40 text-xs text-[#8b7a5a] hover:text-[#c89b3c] rounded-xs">
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1 bg-[#120b04] border border-[#5a3b1c]/40 text-xs text-[#8b7a5a] hover:text-[#c89b3c] rounded-xs">
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulateDownload}
                className="flex items-center gap-1 px-2.5 py-1 bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c] text-xs font-bold rounded-xs hover:bg-[#28180a] transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#c89b3c]" /> Download
              </button>
              <button onClick={() => window.print()} className="flex items-center gap-1 px-2.5 py-1 bg-[#120b04] border border-[#5a3b1c]/40 text-xs text-[#8b7a5a] hover:text-[#c89b3c] rounded-xs">
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1 bg-[#120b04] border border-[#5a3b1c]/40 text-xs text-[#8b7a5a] hover:text-[#c89b3c] rounded-xs">
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>
          </div>

          {/* Official Document Sheet */}
          <div
            className="p-6 rounded-sm shadow-2xl border relative flex-1 min-h-[620px] overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #f0e2c5 0%, #e6d3af 40%, #dcc79e 100%)',
              borderColor: '#5a3b1c',
            }}
          >
            {/* Fine Paper Noise & Vignette Overlay */}
            <div
              className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundSize: '120px',
              }}
            />

            {/* Official Bureau Seal Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-[#5a3b1c]/10 rounded-full flex items-center justify-center pointer-events-none">
              <span className="font-cinzel text-5xl font-extrabold text-[#5a3b1c]/10">DB</span>
            </div>

            {/* TOP SECRET Stamp */}
            {selectedRep.stamp && (
              <div className="absolute top-6 right-6 border-2 border-[#8b2e2e] text-[#8b2e2e] px-2.5 py-1 transform rotate-[8deg] pointer-events-none">
                <span className="font-cinzel text-sm font-extrabold tracking-widest uppercase">{selectedRep.stamp.text}</span>
              </div>
            )}

            <div className="relative z-10 space-y-5">
              {/* Document Header */}
              <div className="flex justify-between items-start border-b border-[#5a3b1c]/30 pb-4">
                <div>
                  <h2 className="font-cinzel text-xl font-extrabold text-[#2a1505]">{selectedRep.title}</h2>
                  <div className="space-y-1 mt-2 text-xs font-inter text-[#4a2e14]">
                    <p><span className="font-bold text-[#5a3b1c]">Case Title:</span> {selectedRep.caseName}</p>
                    <p><span className="font-bold text-[#5a3b1c]">Case Number:</span> {selectedRep.caseId}</p>
                    <p><span className="font-bold text-[#5a3b1c]">Investigating Officer:</span> {selectedRep.officer}</p>
                    <p><span className="font-bold text-[#5a3b1c]">Date:</span> {selectedRep.date}</p>
                  </div>
                </div>

                {/* Bureau Shield Seal */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-14 border border-[#5a3b1c] rounded-xs flex items-center justify-center p-1">
                    <span className="font-cinzel text-xs font-bold text-[#5a3b1c]">DB</span>
                  </div>
                  <span className="font-cinzel text-[7px] text-[#5a3b1c] tracking-widest mt-1">EST. 1947</span>
                </div>
              </div>

              {/* EXECUTIVE SUMMARY */}
              <div>
                <h3 className="font-cinzel text-xs font-bold text-[#8b2e2e] tracking-widest uppercase mb-1">
                  EXECUTIVE SUMMARY
                </h3>
                <p className="font-inter text-xs text-[#2a1505] leading-relaxed">
                  {selectedRep.summary}
                </p>
              </div>

              {/* Polaroid Photo Pinned on Right */}
              <div className="relative flex justify-end my-2">
                <div className="p-2 pb-4 bg-[#f5e6c8] border border-gray-300 shadow-xl rounded-xs transform rotate-[-4deg] w-48 relative">
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#8b2e2e] border-2 border-[#3a0808]" />
                  <div className="w-full h-24 bg-[#1a0f05] overflow-hidden mb-1">
                    <img src={selectedRep.image} alt="" className="w-full h-full object-cover grayscale contrast-125 sepia-[0.3]" />
                  </div>
                </div>
              </div>

              {/* 3-COLUMN REPORT SUMMARY BOX */}
              <div className="grid grid-cols-3 gap-3 p-3 rounded-xs border border-[#5a3b1c]/30 bg-black/5 text-[11px] font-inter text-[#2a1505]">
                
                {/* Column 1: CASE OVERVIEW */}
                <div className="space-y-1.5 border-r border-[#5a3b1c]/20 pr-2">
                  <p className="font-cinzel text-[10px] font-bold text-[#8b2e2e] uppercase">CASE OVERVIEW</p>
                  <p><span className="text-[#5a3b1c] font-bold">Date Opened:</span> Mar 17, 1952</p>
                  <p><span className="text-[#5a3b1c] font-bold">Location:</span> {selectedRep.location}</p>
                  <p><span className="text-[#5a3b1c] font-bold">Incident:</span> {selectedRep.incidentType}</p>
                  <p><span className="text-[#5a3b1c] font-bold">Status:</span> {selectedRep.status}</p>
                  <p><span className="text-[#5a3b1c] font-bold">Priority:</span> <span className="font-bold text-[#8b2e2e]">{selectedRep.priority}</span></p>
                </div>

                {/* Column 2: EVIDENCE OVERVIEW */}
                <div className="space-y-1.5 border-r border-[#5a3b1c]/20 pr-2">
                  <p className="font-cinzel text-[10px] font-bold text-[#8b2e2e] uppercase">EVIDENCE OVERVIEW</p>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border-4 border-[#c89b3c] border-t-[#8b2e2e]" />
                    <div className="text-[9px]">
                      <p>Docs: 56 (36%)</p>
                      <p>Photos: 42 (27%)</p>
                    </div>
                  </div>
                  <p className="font-bold">Total: {selectedRep.evidenceCount}</p>
                </div>

                {/* Column 3: KEY FINDINGS */}
                <div className="space-y-1">
                  <p className="font-cinzel text-[10px] font-bold text-[#8b2e2e] uppercase">KEY FINDINGS</p>
                  {selectedRep.keyFindings.map((kf, idx) => (
                    <p key={idx} className="text-[9.5px] leading-tight">• {kf}</p>
                  ))}
                </div>

              </div>

              {/* Bottom 3D Red Wax Seal */}
              <div className="absolute bottom-4 right-6 w-16 h-16 pointer-events-none">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#6b1414] via-[#b82828] to-[#e74c3c] border-2 border-[#3d0a0a] shadow-2xl flex items-center justify-center relative">
                  <span className="font-cinzel text-xs font-bold text-[#f5e6c8]">DB</span>
                </div>
              </div>

              {/* Coffee Ring Stain */}
              <div className="absolute bottom-6 right-20 w-16 h-16 rounded-full border-4 border-[#5a3b1c]/15 pointer-events-none" />

            </div>
          </div>
        </div>

        {/* ── COLUMN 3: REPORT TEMPLATES & RECENT (3 COLUMNS SPAN) ── */}
        <div className="lg:col-span-3 space-y-4">

          {/* TEMPLATES CARD */}
          <div
            className="p-4 rounded-sm shadow-2xl border relative"
            style={{
              background: 'linear-gradient(150deg, #e8d9b5 0%, #dfcea3 50%, #d4c090 100%)',
              borderColor: '#5a3b1c',
            }}
          >
            {/* Red Pushpin & Paperclip */}
            <div className="absolute -top-1.5 right-6 w-4 h-4 rounded-full bg-[#8b2e2e] border-2 border-[#3a0808] shadow-md z-10" />
            <Paperclip className="absolute top-2 right-2 w-5 h-5 text-[#5a3b1c]/60 transform rotate-45" />

            <p className="font-cinzel text-xs font-bold text-[#2a1505] tracking-widest border-b border-[#5a3b1c]/30 pb-1 mb-3">
              REPORT TEMPLATES
            </p>

            <div className="space-y-1.5 font-inter text-xs text-[#2a1505]">
              {[
                'Investigation Summary',
                'Evidence Analysis',
                'Witness Statements',
                'Suspect Profile',
                'Crime Scene Report',
                'Forensic Report',
                'Intelligence Report',
                'Case Closure Report',
              ].map((tmpl) => (
                <button
                  key={tmpl}
                  onClick={() => setNewReportModalOpen(true)}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xs hover:bg-[#5a3b1c]/15 transition-colors text-left font-medium"
                >
                  <FileText className="w-3.5 h-3.5 text-[#8b2e2e]" />
                  <span>{tmpl}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setNewReportModalOpen(true)}
              className="w-full mt-3 py-2 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest rounded-sm border border-[#5a3b1c] shadow-lg hover:bg-[#28180a] transition-colors"
            >
              View All Templates
            </button>
          </div>

          {/* RECENT REPORTS CARD */}
          <div
            className="p-4 rounded-sm shadow-2xl border relative"
            style={{
              background: 'linear-gradient(150deg, #e8d9b5 0%, #dfcea3 50%, #d4c090 100%)',
              borderColor: '#5a3b1c',
            }}
          >
            <p className="font-cinzel text-xs font-bold text-[#2a1505] tracking-widest border-b border-[#5a3b1c]/30 pb-1 mb-3">
              RECENT REPORTS
            </p>

            <div className="space-y-2">
              {reportsList.slice(0, 5).map((r) => (
                <div
                  key={r.id}
                  onClick={() => setSelectedRep(r)}
                  className="flex items-center justify-between p-2 rounded-xs bg-[#5a3b1c]/10 border border-[#5a3b1c]/20 hover:bg-[#5a3b1c]/20 cursor-pointer"
                >
                  <div>
                    <p className="font-playfair text-xs font-bold text-[#2a1505] leading-tight">{r.type}</p>
                    <span className="font-mono text-[9px] text-[#5a3b1c]">{r.date}</span>
                  </div>
                  <Eye className="w-3.5 h-3.5 text-[#8b2e2e]" />
                </div>
              ))}
            </div>
          </div>

          {/* SHERLOCK HOLMES STICKY NOTE */}
          <div
            className="p-3.5 shadow-xl transform rotate-[2deg] rounded-xs border"
            style={{
              background: 'linear-gradient(135deg, #fffab3 0%, #fef08a 100%)',
              borderColor: 'rgba(180,140,40,0.4)',
            }}
          >
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#8b2e2e] border-2 border-[#3a0808]" />
            <p className="font-cormorant italic text-xs font-bold text-[#2a1505] leading-snug">
              "Every report brings us closer to the truth."
            </p>
            <p className="text-right text-[9px] font-inter text-[#5a3b1c] mt-1">— Sherlock Holmes</p>
          </div>

        </div>

      </div>

      {/* ── SIMULATED DOWNLOAD NOTIFICATION ── */}
      <AnimatePresence>
        {downloadNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 p-4 bg-[#1a1208] border-2 border-[#c89b3c] text-[#f5e6c8] shadow-2xl rounded-xs flex items-center gap-3"
          >
            <Check className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="font-cinzel text-xs font-bold text-[#c89b3c]">DOWNLOAD COMPLETE</p>
              <p className="font-mono text-[10px] text-[#8b7a5a]">Report downloaded as PDF archive.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NEW REPORT MODAL (FRONTEND ONLY) ── */}
      <AnimatePresence>
        {newReportModalOpen && (
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
                onClick={() => setNewReportModalOpen(false)}
                className="absolute top-4 right-4 text-[#5a3b1c] hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-cinzel text-xl font-bold text-[#2a1505] mb-4">Generate Official Bureau Report</h3>

              <div className="space-y-4 font-inter text-xs">
                <div>
                  <label className="block font-bold text-[#5a3b1c] uppercase mb-1">Select Report Template</label>
                  <select className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] font-bold focus:outline-none">
                    <option>Investigation Summary Report</option>
                    <option>Evidence Analysis Report</option>
                    <option>Witness Statements Report</option>
                    <option>Suspect Profile Report</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#5a3b1c] uppercase mb-1">Report Title</label>
                  <input
                    type="text"
                    placeholder="e.g. SPECIAL FORENSIC SUMMARY"
                    className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#5a3b1c] uppercase mb-1">Executive Summary</label>
                  <textarea
                    rows={3}
                    placeholder="Compose report findings..."
                    className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => setNewReportModalOpen(false)}
                  className="w-full py-3 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest border border-[#5a3b1c] shadow-lg hover:bg-[#28180a] transition-colors mt-2"
                >
                  Generate Official Report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
