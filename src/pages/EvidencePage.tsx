import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInvestigationStore } from '../store/useInvestigationStore';
import { 
  Camera, FileText, Fingerprint, Car, Package, Grid, List, Plus, 
  Calendar, MoreHorizontal, X, Download, Printer, Share2, Eye, ShieldAlert,
  Disc, Smartphone, FileCode
} from 'lucide-react';
import { cn } from '../lib/utils';

interface EvidenceItem {
  id: string;
  title: string;
  source: string;
  addedDate: string;
  type: 'PHOTO' | 'DOCUMENT' | 'EVIDENCE' | 'PHYSICAL' | 'AUDIO' | 'DIGITAL';
  image: string;
  icon: any;
  chainOfCustody: string[];
  notes: string;
}

const evidenceList: EvidenceItem[] = [
  {
    id: 'ev-1',
    title: 'Crime Scene Photo - 01',
    source: 'Detective Unit',
    addedDate: 'May 17, 2025 - 10:24 AM',
    type: 'PHOTO',
    image: '/crime_scene_card.png',
    icon: Camera,
    chainOfCustody: ['Collected by Det. Arjun Rathore', 'Logged at Bureau Central Repository', 'Checked out for forensic review'],
    notes: 'Photograph of museum main exhibit room display case #4 after the ruby was taken.',
  },
  {
    id: 'ev-2',
    title: 'Handwritten Note',
    source: 'Found at Scene',
    addedDate: 'May 16, 2025 - 04:15 PM',
    type: 'DOCUMENT',
    image: '/evidence_note.png',
    icon: FileText,
    chainOfCustody: ['Secured by Patrol Unit 4', 'Transferred to Handwriting Analysis Dept.'],
    notes: 'Cursive ink note left near museum loading dock. Handwriting sample being cross-referenced.',
  },
  {
    id: 'ev-3',
    title: 'Fingerprint - Window',
    source: 'Forensic Lab',
    addedDate: 'May 15, 2025 - 11:30 AM',
    type: 'EVIDENCE',
    image: '/evidence_fingerprint.png',
    icon: Fingerprint,
    chainOfCustody: ['Lifted by Forensics Tech Kabir Singh', 'Processed in AFIS database'],
    notes: 'Partial right index fingerprint recovered from shattered glass frame.',
  },
  {
    id: 'ev-4',
    title: 'Getaway Vehicle Image',
    source: 'CCTV Footage',
    addedDate: 'May 14, 2025 - 09:10 PM',
    type: 'PHOTO',
    image: '/getaway_vehicle.png',
    icon: Car,
    chainOfCustody: ['Extracted from traffic surveillance tape', 'Enhanced by Intelligence Unit'],
    notes: '1950s commercial black delivery truck spotted fleeing east on Blackwood Highway.',
  },
  {
    id: 'ev-5',
    title: 'Stolen Artifact',
    source: 'Museum Record',
    addedDate: 'May 14, 2025 - 02:45 PM',
    type: 'PHYSICAL',
    image: '/stolen_artifact_card.png',
    icon: Package,
    chainOfCustody: ['Archived catalog record from Museum Curator', 'Cross-checked with Interpol database'],
    notes: 'Ancient Greek ceramic urn vase valued at $2,000,000.',
  },
  {
    id: 'ev-6',
    title: 'Museum Floor Plan',
    source: 'Museum Authority',
    addedDate: 'May 14, 2025 - 10:20 AM',
    type: 'DOCUMENT',
    image: '/museum_floorplan_card.png',
    icon: FileCode,
    chainOfCustody: ['Provided by Museum Facilities Manager', 'Annotated by Det. Meera Iyer'],
    notes: 'Blueprint diagram highlighting Entry Point #2 where security sensor was severed.',
  },
  {
    id: 'ev-7',
    title: 'Broken Window',
    source: 'Crime Scene',
    addedDate: 'May 13, 2025 - 08:05 PM',
    type: 'PHOTO',
    image: '/broken_window_card.png',
    icon: Camera,
    chainOfCustody: ['Photographed by Forensics Unit', 'Glass sample secured in Evidence Bag #402'],
    notes: 'Shattered glass pattern indicating forced entry from the exterior courtyard.',
  },
  {
    id: 'ev-8',
    title: 'Receipt - 17 March',
    source: 'Shop Near Dock',
    addedDate: 'May 13, 2025 - 01:15 PM',
    type: 'DOCUMENT',
    image: '/evidence_receipt.png',
    icon: FileText,
    chainOfCustody: ['Seized during dock shop inquiry', 'Logged as physical exhibit'],
    notes: 'Hardware store receipt for diamond-tip glass cutter purchased on day of heist.',
  },
  {
    id: 'ev-9',
    title: 'Audio Recording',
    source: 'Security Room',
    addedDate: 'May 12, 2025 - 07:40 PM',
    type: 'AUDIO',
    image: '/evidence_audio.png',
    icon: Disc,
    chainOfCustody: ['Retrieved from wire recorder', 'Duplicated for audio enhancement'],
    notes: '3-minute ambient audio clip from security desk microphone capturing footsteps.',
  },
  {
    id: 'ev-10',
    title: 'Suspect Phone',
    source: 'Seized Device',
    addedDate: 'May 12, 2025 - 05:30 PM',
    type: 'DIGITAL',
    image: '/evidence_phone.png',
    icon: Smartphone,
    chainOfCustody: ['Confiscated from Victor Blackwood upon arrest', 'Extracted by Cyber Forensics'],
    notes: 'Encrypted communication logs and contact records.',
  },
];

export function EvidencePage() {
  const [selectedEvd, setSelectedEvd] = useState<EvidenceItem | null>(null);
  const [selectedType, setSelectedType] = useState<string>('All Evidence Types');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [addEvidenceModalOpen, setAddEvidenceModalOpen] = useState(false);

  const filteredEvidence = evidenceList.filter((e) => {
    if (selectedType === 'All Evidence Types') return true;
    return e.type === selectedType.toUpperCase();
  });

  return (
    <div className="min-h-full p-6 pb-20 relative overflow-x-hidden font-inter select-none" style={{ background: 'linear-gradient(180deg, #14110f 0%, #0d0a08 100%)' }}>
      
      {/* ── HEADER ── */}
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
        <div>
          <h1 className="font-playfair text-3xl text-[#f5e6c8] font-bold tracking-tight">EVIDENCE</h1>
          <p className="font-inter text-xs text-[#8b7a5a] mt-0.5">Manage and analyze all collected evidence in this case.</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Case Folder Tag */}
          <div className="px-4 py-2 bg-[#d4b896] border border-[#5a3b1c] rounded-xs shadow-md flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#8b2e2e]">CASE #47-A7</span>
            <span className="font-playfair text-xs font-bold text-[#2a1505]">The Blackwood Heist</span>
          </div>

          <button
            onClick={() => setAddEvidenceModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest rounded-xs border border-[#5a3b1c] shadow-lg hover:bg-[#28180a] transition-colors"
          >
            <Plus className="w-4 h-4 text-[#c89b3c]" />
            <span>+ Add Evidence</span>
          </button>
        </div>
      </div>

      {/* ── TOP FILTER TOOLBAR ── */}
      <div className="max-w-[1440px] mx-auto p-3 bg-[#1a1208] border border-[#5a3b1c]/30 rounded-sm flex flex-wrap items-center justify-between gap-3 shadow-md mb-5">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-[#120b04] border border-[#5a3b1c]/40 text-[#c89b3c] text-xs p-2 rounded-xs font-medium focus:outline-none"
          >
            <option>All Evidence Types</option>
            <option value="PHOTO">Photos</option>
            <option value="DOCUMENT">Documents</option>
            <option value="EVIDENCE">Evidence</option>
            <option value="PHYSICAL">Physical</option>
            <option value="AUDIO">Audio</option>
            <option value="DIGITAL">Digital</option>
          </select>

          <select className="bg-[#120b04] border border-[#5a3b1c]/40 text-[#c89b3c] text-xs p-2 rounded-xs font-medium focus:outline-none">
            <option>All Sources</option>
            <option>Detective Unit</option>
            <option>Forensic Lab</option>
            <option>CCTV Footage</option>
          </select>

          <select className="bg-[#120b04] border border-[#5a3b1c]/40 text-[#c89b3c] text-xs p-2 rounded-xs font-medium focus:outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Under Review</option>
          </select>

          <button className="flex items-center gap-1.5 px-3 py-2 bg-[#120b04] border border-[#5a3b1c]/40 text-xs text-[#8b7a5a] hover:text-[#c89b3c] rounded-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>Date Added</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Grid / List Toggle */}
          <div className="flex items-center gap-1 p-1 bg-[#120b04] border border-[#5a3b1c]/30 rounded-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={cn("p-1.5 rounded-xs transition-colors", viewMode === 'grid' ? "bg-[#c89b3c] text-[#1a1008]" : "text-[#8b7a5a] hover:text-[#c89b3c]")}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn("p-1.5 rounded-xs transition-colors", viewMode === 'list' ? "bg-[#c89b3c] text-[#1a1008]" : "text-[#8b7a5a] hover:text-[#c89b3c]")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <select className="bg-[#120b04] border border-[#5a3b1c]/40 text-[#8b7a5a] text-xs p-2 rounded-xs font-medium focus:outline-none">
            <option>Sort by: Date Added</option>
            <option>Sort by: Title</option>
          </select>
        </div>
      </div>

      {/* ── EVIDENCE CARDS GRID (5 COLUMNS x 2 ROWS) ── */}
      <div className="max-w-[1440px] mx-auto">
        <div className={cn(
          viewMode === 'grid'
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            : "space-y-3"
        )}>
          {filteredEvidence.map((evd) => (
            <motion.div
              key={evd.id}
              whileHover={{ scale: 1.02, y: -3 }}
              onClick={() => setSelectedEvd(evd)}
              className={cn(
                "p-3 rounded-sm border shadow-vintage-soft relative cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between",
                viewMode === 'list' ? "flex-row items-center p-4" : ""
              )}
              style={{
                background: 'linear-gradient(150deg, #e8d9b5 0%, #dfcea3 50%, #d4c090 100%)',
                borderColor: '#5a3b1c',
              }}
            >
              {/* Red Pushpin at Top Center */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#8b2e2e] border-2 border-[#3a0808] shadow-md z-10" />

              <div>
                {/* Header Icon + Title */}
                <div className="flex justify-between items-start mb-2">
                  <div className="w-6 h-6 rounded-xs bg-[#5a3b1c]/20 border border-[#5a3b1c]/40 flex items-center justify-center text-[#5a3b1c]">
                    <evd.icon className="w-3.5 h-3.5" />
                  </div>
                  <button className="text-[#5a3b1c]/60 hover:text-[#2a1505]">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Thumbnail Photo / Graphic */}
                <div className="w-full h-32 bg-[#1a0f05] rounded-xs overflow-hidden border border-[#5a3b1c]/30 mb-2.5 relative">
                  <img src={evd.image} alt={evd.title} className="w-full h-full object-cover grayscale contrast-125 sepia-[0.3]" />
                </div>

                {/* Title & Metadata */}
                <h3 className="font-playfair text-xs font-extrabold text-[#2a1505] truncate mb-1">{evd.title}</h3>
                <p className="font-inter text-[10px] text-[#5a3b1c]"><span className="font-bold">Source:</span> {evd.source}</p>
                <p className="font-mono text-[9px] text-[#5a3b1c]/70 mb-3"><span className="font-bold">Added:</span> {evd.addedDate}</p>
              </div>

              {/* Bottom Badge Tag */}
              <div className="flex justify-between items-center border-t border-[#5a3b1c]/20 pt-2">
                <div className={cn(
                  "border px-1.5 py-0.5 text-[8px] font-inter font-extrabold tracking-wider rounded-xs uppercase",
                  evd.type === 'PHOTO' ? "border-amber-800 text-amber-800 bg-amber-500/10" :
                  evd.type === 'DOCUMENT' ? "border-emerald-800 text-emerald-800 bg-emerald-500/10" :
                  evd.type === 'PHYSICAL' ? "border-amber-900 text-amber-900 bg-amber-700/10" :
                  evd.type === 'AUDIO' ? "border-red-800 text-red-800 bg-red-500/10" :
                  evd.type === 'DIGITAL' ? "border-blue-800 text-blue-800 bg-blue-500/10" :
                  "border-[#8b2e2e] text-[#8b2e2e] bg-red-900/10"
                )}>
                  {evd.type}
                </div>
                <span className="font-mono text-[10px] text-[#5a3b1c]/60">•••</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── DETAILED EVIDENCE INSPECTOR MODAL ── */}
      <AnimatePresence>
        {selectedEvd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvd(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl p-6 rounded-sm border shadow-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #e8d9b5 0%, #dfcea3 50%, #d4c090 100%)',
                borderColor: '#5a3b1c',
              }}
            >
              <button
                onClick={() => setSelectedEvd(null)}
                className="absolute top-4 right-4 text-[#5a3b1c] hover:text-black"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Left Photo View */}
                <div className="w-full md:w-1/2">
                  <div className="p-2 bg-[#f5e6c8] border border-gray-300 shadow-xl rounded-xs">
                    <div className="w-full h-56 bg-[#1a0f05] overflow-hidden mb-2">
                      <img src={selectedEvd.image} alt={selectedEvd.title} className="w-full h-full object-cover grayscale contrast-125 sepia-[0.3]" />
                    </div>
                    <p className="font-playfair text-sm font-extrabold text-[#2a1505] text-center">{selectedEvd.title}</p>
                  </div>
                </div>

                {/* Right Metadata & Chain of Custody */}
                <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-center border-b border-[#5a3b1c]/30 pb-2 mb-3">
                      <span className="font-mono text-xs font-bold text-[#8b2e2e]">EVID-{selectedEvd.id.toUpperCase()}</span>
                      <span className="font-inter text-xs font-bold text-[#5a3b1c]">{selectedEvd.type}</span>
                    </div>

                    <div className="space-y-2 text-xs font-inter text-[#3a220f] mb-3">
                      <p><span className="font-bold text-[#5a3b1c]">Source:</span> {selectedEvd.source}</p>
                      <p><span className="font-bold text-[#5a3b1c]">Date Logged:</span> {selectedEvd.addedDate}</p>
                      <p><span className="font-bold text-[#5a3b1c]">Notes:</span> {selectedEvd.notes}</p>
                    </div>

                    {/* Chain of Custody Log */}
                    <div className="border-t border-[#5a3b1c]/20 pt-3">
                      <span className="font-cinzel text-xs font-bold text-[#8b2e2e] block mb-2">CHAIN OF CUSTODY LOG</span>
                      <div className="space-y-1.5 font-inter text-[11px] text-[#4a2e14]">
                        {selectedEvd.chainOfCustody.map((log, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-[#8b2e2e]">•</span>
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-[#5a3b1c]/30">
                    <button className="flex-1 py-2.5 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest border border-[#5a3b1c] rounded-xs hover:bg-[#28180a]">
                      Download File
                    </button>
                    <button className="px-4 py-2.5 bg-[#120b04] text-[#c89b3c] font-cinzel font-bold text-xs uppercase border border-[#5a3b1c] rounded-xs">
                      Print Exhibit
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ADD EVIDENCE MODAL ── */}
      <AnimatePresence>
        {addEvidenceModalOpen && (
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
                onClick={() => setAddEvidenceModalOpen(false)}
                className="absolute top-4 right-4 text-[#5a3b1c] hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-cinzel text-xl font-bold text-[#2a1505] mb-4">Log New Case Evidence</h3>

              <div className="space-y-4 font-inter text-xs">
                <div>
                  <label className="block font-bold text-[#5a3b1c] uppercase mb-1">Evidence Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Broken Glass Shard"
                    className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#5a3b1c] uppercase mb-1">Evidence Type</label>
                  <select className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] font-bold focus:outline-none">
                    <option>PHOTO</option>
                    <option>DOCUMENT</option>
                    <option>EVIDENCE</option>
                    <option>PHYSICAL</option>
                    <option>AUDIO</option>
                    <option>DIGITAL</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#5a3b1c] uppercase mb-1">Source / Origin</label>
                  <input
                    type="text"
                    placeholder="e.g. Crime Scene"
                    className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => setAddEvidenceModalOpen(false)}
                  className="w-full py-3 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest border border-[#5a3b1c] shadow-lg hover:bg-[#28180a] transition-colors mt-2"
                >
                  Log Evidence Exhibit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
