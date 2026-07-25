import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInvestigationStore } from '../store/useInvestigationStore';
import { 
  FileText, Folder, FileCode, Car, Package, Camera, Newspaper, 
  Receipt, Edit3, ShieldAlert, Plus, Grid, List, Calendar, Filter, 
  Download, Printer, Share2, Eye, X, MoreHorizontal
} from 'lucide-react';
import { cn } from '../lib/utils';

interface DocumentFileItem {
  id: string;
  title: string;
  type: string;
  source: string;
  addedDate: string;
  badge: 'PDF' | 'JPG' | 'MP4';
  badgeColor: string;
  image: string;
  icon: any;
  contentSnippet?: string;
}

const documentsList: DocumentFileItem[] = [
  {
    id: 'doc-1',
    title: 'Initial Report',
    type: 'Report',
    source: 'Detective Arjun Rathore',
    addedDate: 'May 17, 2025 - 08:30 AM',
    badge: 'PDF',
    badgeColor: 'border-[#8b2e2e] text-[#8b2e2e] bg-red-900/10',
    image: '/detective_bg.png',
    icon: Folder,
    contentSnippet: 'Official initial bureau incident report filed for Case #47-A7.',
  },
  {
    id: 'doc-2',
    title: 'Museum Security Log',
    type: 'Log',
    source: 'Museum Authority',
    addedDate: 'May 17, 2025 - 10:15 AM',
    badge: 'PDF',
    badgeColor: 'border-[#8b2e2e] text-[#8b2e2e] bg-red-900/10',
    image: '/evidence_note.png',
    icon: FileText,
    contentSnippet: 'Shift logging entries for security personnel between 00:00 and 08:00.',
  },
  {
    id: 'doc-3',
    title: 'Museum Floor Plan',
    type: 'Document',
    source: 'Museum Authority',
    addedDate: 'May 17, 2025 - 12:40 PM',
    badge: 'JPG',
    badgeColor: 'border-emerald-800 text-emerald-800 bg-emerald-500/10',
    image: '/museum_floorplan_card.png',
    icon: FileCode,
    contentSnippet: 'Blueprint architecture diagram highlighting Entry Point #2.',
  },
  {
    id: 'doc-4',
    title: 'Vehicle Registration',
    type: 'Record',
    source: 'RTO Records',
    addedDate: 'May 18, 2025 - 09:20 AM',
    badge: 'PDF',
    badgeColor: 'border-[#8b2e2e] text-[#8b2e2e] bg-red-900/10',
    image: '/getaway_vehicle.png',
    icon: Car,
    contentSnippet: 'Registration and ownership deed records for commercial van.',
  },
  {
    id: 'doc-5',
    title: 'Witness Statement - Clara',
    type: 'Statement',
    source: 'Clara Winters',
    addedDate: 'May 18, 2025 - 11:05 AM',
    badge: 'PDF',
    badgeColor: 'border-[#8b2e2e] text-[#8b2e2e] bg-red-900/10',
    image: '/clara_winters_card.png',
    icon: FileText,
    contentSnippet: 'Handwritten witness statement sworn before Detective Diya Sharma.',
  },
  {
    id: 'doc-6',
    title: 'CCTV Footage - 02:15 AM',
    type: 'Video',
    source: 'Museum Security',
    addedDate: 'May 19, 2025 - 11:05 AM',
    badge: 'MP4',
    badgeColor: 'border-purple-800 text-purple-800 bg-purple-500/10',
    image: '/crime_scene_card.png',
    icon: Camera,
    contentSnippet: 'Surveillance video clip capturing east corridor shadow movement.',
  },
  {
    id: 'doc-7',
    title: 'Newspaper Article',
    type: 'News',
    source: 'Daily Herald',
    addedDate: 'May 19, 2025 - 01:30 PM',
    badge: 'PDF',
    badgeColor: 'border-[#8b2e2e] text-[#8b2e2e] bg-red-900/10',
    image: '/newspaper_article.png',
    icon: Newspaper,
    contentSnippet: 'Front-page news clipping covering the Blackwood Museum robbery.',
  },
  {
    id: 'doc-8',
    title: 'Shop Receipt - 17 March',
    type: 'Receipt',
    source: 'Museum Shop',
    addedDate: 'May 19, 2025 - 03:45 PM',
    badge: 'JPG',
    badgeColor: 'border-emerald-800 text-emerald-800 bg-emerald-500/10',
    image: '/evidence_receipt.png',
    icon: Receipt,
    contentSnippet: 'Itemized purchase receipt for glass-cutting tools.',
  },
  {
    id: 'doc-9',
    title: 'Suspect Sketch',
    type: 'Document',
    source: 'Detective Vikram Desai',
    addedDate: 'May 20, 2025 - 04:45 PM',
    badge: 'PDF',
    badgeColor: 'border-[#8b2e2e] text-[#8b2e2e] bg-red-900/10',
    image: '/victor_blackwood_card.png',
    icon: Edit3,
    contentSnippet: 'Pencil composite sketch drawn from eyewitness descriptions.',
  },
  {
    id: 'doc-10',
    title: 'Forensic Report',
    type: 'Report',
    source: 'Forensic Lab',
    addedDate: 'May 21, 2025 - 09:10 AM',
    badge: 'PDF',
    badgeColor: 'border-[#8b2e2e] text-[#8b2e2e] bg-red-900/10',
    image: '/evidence_fingerprint.png',
    icon: ShieldAlert,
    contentSnippet: 'Chemical analysis report on liquid lubricant traces.',
  },
];

export function DocumentsPage() {
  const [selectedDoc, setSelectedDoc] = useState<DocumentFileItem | null>(null);
  const [selectedType, setSelectedType] = useState<string>('All Document Types');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const filteredDocuments = documentsList.filter((d) => {
    if (selectedType === 'All Document Types') return true;
    return d.type.toLowerCase().includes(selectedType.toLowerCase());
  });

  return (
    <div className="min-h-full p-6 pb-20 relative overflow-x-hidden font-inter select-none" style={{ background: 'linear-gradient(180deg, #14110f 0%, #0d0a08 100%)' }}>
      
      {/* ── HEADER ── */}
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
        <div>
          <h1 className="font-playfair text-3xl text-[#f5e6c8] font-bold tracking-tight">DOCUMENTS</h1>
          <p className="font-inter text-xs text-[#8b7a5a] mt-0.5">All case related documents and files.</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Case Folder Tag */}
          <div className="px-4 py-2 bg-[#d4b896] border border-[#5a3b1c] rounded-xs shadow-md flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#8b2e2e]">CASE #47-A7</span>
            <span className="font-playfair text-xs font-bold text-[#2a1505]">The Blackwood Heist</span>
          </div>

          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest rounded-xs border border-[#5a3b1c] shadow-lg hover:bg-[#28180a] transition-colors"
          >
            <Plus className="w-4 h-4 text-[#c89b3c]" />
            <span>+ Upload Document</span>
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
            <option>All Document Types</option>
            <option value="Report">Reports</option>
            <option value="Log">Logs</option>
            <option value="Statement">Statements</option>
            <option value="Record">Records</option>
            <option value="News">News</option>
          </select>

          <select className="bg-[#120b04] border border-[#5a3b1c]/40 text-[#c89b3c] text-xs p-2 rounded-xs font-medium focus:outline-none">
            <option>All Sources</option>
            <option>Museum Authority</option>
            <option>Detective Arjun Rathore</option>
            <option>Forensic Lab</option>
          </select>

          <select className="bg-[#120b04] border border-[#5a3b1c]/40 text-[#c89b3c] text-xs p-2 rounded-xs font-medium focus:outline-none">
            <option>All Added By</option>
            <option>Det. Arjun Rathore</option>
            <option>Det. Meera Iyer</option>
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

      {/* ── DOCUMENTS CARDS GRID (5 COLUMNS x 2 ROWS) ── */}
      <div className="max-w-[1440px] mx-auto">
        <div className={cn(
          viewMode === 'grid'
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            : "space-y-3"
        )}>
          {filteredDocuments.map((doc) => (
            <motion.div
              key={doc.id}
              whileHover={{ scale: 1.02, y: -3 }}
              onClick={() => setSelectedDoc(doc)}
              className={cn(
                "p-3 rounded-xs border shadow-2xl relative cursor-pointer transition-all overflow-hidden flex flex-col justify-between",
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
                    <doc.icon className="w-3.5 h-3.5" />
                  </div>
                  <button className="text-[#5a3b1c]/60 hover:text-[#2a1505]">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Thumbnail Photo / Graphic */}
                <div className="w-full h-32 bg-[#1a0f05] rounded-xs overflow-hidden border border-[#5a3b1c]/30 mb-2.5 relative">
                  <img src={doc.image} alt={doc.title} className="w-full h-full object-cover grayscale contrast-125 sepia-[0.3]" />
                </div>

                {/* Title & Metadata */}
                <h3 className="font-playfair text-xs font-extrabold text-[#2a1505] truncate mb-1">{doc.title}</h3>
                <p className="font-inter text-[10px] text-[#5a3b1c]"><span className="font-bold">Type:</span> {doc.type}</p>
                <p className="font-inter text-[10px] text-[#5a3b1c] truncate"><span className="font-bold">Source:</span> {doc.source}</p>
                <p className="font-mono text-[9px] text-[#5a3b1c]/70 mb-3"><span className="font-bold">Added:</span> {doc.addedDate}</p>
              </div>

              {/* Bottom File Badge Tag */}
              <div className="flex justify-between items-center border-t border-[#5a3b1c]/20 pt-2">
                <div className={cn(
                  "border px-2 py-0.5 text-[8px] font-mono font-extrabold rounded-xs uppercase",
                  doc.badgeColor
                )}>
                  {doc.badge}
                </div>
                <span className="font-mono text-[10px] text-[#5a3b1c]/60">•••</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Pagination */}
        <div className="flex justify-between items-center text-xs font-mono text-[#8b7a5a] mt-6 px-1">
          <div className="flex items-center gap-1">
            <span className="px-2 py-0.5 border border-[#5a3b1c]/30 cursor-pointer">‹</span>
            <span className="px-2.5 py-0.5 bg-[#c89b3c] text-[#1a1008] font-bold">1</span>
            <span className="px-2.5 py-0.5 bg-[#1a1208] border border-[#5a3b1c]/30 cursor-pointer">2</span>
            <span className="px-2.5 py-0.5 bg-[#1a1208] border border-[#5a3b1c]/30 cursor-pointer">3</span>
            <span className="px-1 text-[#8b7a5a]">...</span>
            <span className="px-2.5 py-0.5 bg-[#1a1208] border border-[#5a3b1c]/30 cursor-pointer">8</span>
            <span className="px-2 py-0.5 border border-[#5a3b1c]/30 cursor-pointer">›</span>
          </div>

          <span>Showing 1 to 10 of 78 documents</span>
        </div>
      </div>

      {/* ── DETAILED DOCUMENT VIEWER MODAL ── */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDoc(null)}
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
                onClick={() => setSelectedDoc(null)}
                className="absolute top-4 right-4 text-[#5a3b1c] hover:text-black"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Left Photo View */}
                <div className="w-full md:w-1/2">
                  <div className="p-2 bg-[#f5e6c8] border border-gray-300 shadow-xl rounded-xs">
                    <div className="w-full h-56 bg-[#1a0f05] overflow-hidden mb-2">
                      <img src={selectedDoc.image} alt={selectedDoc.title} className="w-full h-full object-cover grayscale contrast-125 sepia-[0.3]" />
                    </div>
                    <p className="font-playfair text-sm font-extrabold text-[#2a1505] text-center">{selectedDoc.title}</p>
                  </div>
                </div>

                {/* Right Metadata */}
                <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-center border-b border-[#5a3b1c]/30 pb-2 mb-3">
                      <span className="font-mono text-xs font-bold text-[#8b2e2e]">DOC-{selectedDoc.id.toUpperCase()}</span>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#3d2612] text-[#e8d9b5] rounded-xs">{selectedDoc.badge}</span>
                    </div>

                    <div className="space-y-2 text-xs font-inter text-[#3a220f] mb-3">
                      <p><span className="font-bold text-[#5a3b1c]">Document Type:</span> {selectedDoc.type}</p>
                      <p><span className="font-bold text-[#5a3b1c]">Source:</span> {selectedDoc.source}</p>
                      <p><span className="font-bold text-[#5a3b1c]">Date Logged:</span> {selectedDoc.addedDate}</p>
                      <p><span className="font-bold text-[#5a3b1c]">Snippet:</span> "{selectedDoc.contentSnippet}"</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-[#5a3b1c]/30">
                    <button className="flex-1 py-2.5 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest border border-[#5a3b1c] rounded-xs hover:bg-[#28180a]">
                      Download PDF
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

      {/* ── UPLOAD DOCUMENT MODAL ── */}
      <AnimatePresence>
        {uploadModalOpen && (
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
                onClick={() => setUploadModalOpen(false)}
                className="absolute top-4 right-4 text-[#5a3b1c] hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-cinzel text-xl font-bold text-[#2a1505] mb-4">Upload Case Document</h3>

              <div className="space-y-4 font-inter text-xs">
                <div>
                  <label className="block font-bold text-[#5a3b1c] uppercase mb-1">Document Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Surveillance Report"
                    className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#5a3b1c] uppercase mb-1">Document Type</label>
                  <select className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] font-bold focus:outline-none">
                    <option>Report</option>
                    <option>Log</option>
                    <option>Statement</option>
                    <option>Record</option>
                    <option>News</option>
                  </select>
                </div>

                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="w-full py-3 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest border border-[#5a3b1c] shadow-lg hover:bg-[#28180a] transition-colors mt-2"
                >
                  Upload & Archive Document
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
