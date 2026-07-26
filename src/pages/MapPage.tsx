import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInvestigationStore } from '../store/useInvestigationStore';
import {
  MapPin, Filter, Plus, Minus, Target, Layers, ChevronLeft, ChevronRight,
  Eye, FileText, CheckCircle2, ShieldAlert, X, Navigation
} from 'lucide-react';
import { cn } from '../lib/utils';

interface MapLocation {
  id: string;
  pinNumber?: number;
  type: 'crime' | 'evidence' | 'witness' | 'suspect' | 'safehouse';
  name: string;
  district: string;
  reported: string;
  status: string;
  notes: string;
  evidenceCount: number;
  image: string;
  x: number; // percentage
  y: number; // percentage
}

const locations: MapLocation[] = [
  {
    id: 'loc-1',
    pinNumber: 1,
    type: 'crime',
    name: 'Old Town Entry',
    district: 'Old Town',
    reported: 'Mar 17, 1952 - 08:00 AM',
    status: 'Investigated',
    notes: 'Primary entry point into Old Town district. Suspect vehicle first identified here.',
    evidenceCount: 4,
    image: '/crime_scene_card.png',
    x: 37,
    y: 48,
  },
  {
    id: 'loc-2',
    pinNumber: 2,
    type: 'crime',
    name: 'Blackwood Museum',
    district: 'Riverside District',
    reported: 'Mar 17, 1952 - 08:30 AM',
    status: 'Primary Crime Scene',
    notes: 'Main heist location. Multiple high-value artifacts stolen. Security system disabled.',
    evidenceCount: 18,
    image: '/blackwood_museum.png',
    x: 45,
    y: 28,
  },
  {
    id: 'loc-3',
    pinNumber: 3,
    type: 'crime',
    name: 'Blackwood Bridge',
    district: 'Dockyard Entry',
    reported: 'Mar 17, 1952 - 10:45 AM',
    status: 'Under Investigation',
    notes: 'Getaway vehicle crossed bridge heading east towards Dockyard.',
    evidenceCount: 6,
    image: '/getaway_vehicle.png',
    x: 54,
    y: 42,
  },
  {
    id: 'loc-4',
    pinNumber: 4,
    type: 'crime',
    name: 'Old Warehouse #12',
    district: 'Warehouse District',
    reported: 'Mar 17, 1952 - 01:20 PM',
    status: 'Active Search',
    notes: 'Security system was found disabled. Possible entry point through the east gate.',
    evidenceCount: 14,
    image: '/warehouse_location.png',
    x: 72,
    y: 32,
  },
  {
    id: 'loc-5',
    pinNumber: 5,
    type: 'crime',
    name: 'South End Hideout',
    district: 'South End',
    reported: 'Mar 17, 1952 - 02:10 PM',
    status: 'Suspected Hideout',
    notes: 'Abandoned apartment building where James Moriarty was reportedly seen.',
    evidenceCount: 8,
    image: '/james_moriarty_card.png',
    x: 66,
    y: 52,
  },
  {
    id: 'loc-6',
    type: 'evidence',
    name: 'Broken Window Glass',
    district: 'Old Town Docks',
    reported: 'Mar 17, 1952 - 09:15 AM',
    status: 'Recovered',
    notes: 'Shattered glass samples with trace glove fiber.',
    evidenceCount: 3,
    image: '/broken_window_card.png',
    x: 41,
    y: 52,
  },
  {
    id: 'loc-7',
    type: 'evidence',
    name: 'Witness Dock Worker',
    district: 'Dockyard',
    reported: 'Mar 17, 1952 - 11:30 AM',
    status: 'Statement Logged',
    notes: 'Dock worker reported seeing black delivery van parked near Warehouse #12.',
    evidenceCount: 2,
    image: '/victor_blackwood_card.png',
    x: 62,
    y: 38,
  },
  {
    id: 'loc-8',
    type: 'safehouse',
    name: 'Safe House Visit',
    district: 'Hillside',
    reported: 'Mar 17, 1952 - 04:30 PM',
    status: 'Secured',
    notes: 'Bureau safe house established for witness protection.',
    evidenceCount: 5,
    image: '/clara_winters_card.png',
    x: 78,
    y: 65,
  },
];

const timelineSteps = [
  { id: 'loc-1', step: 'Case Opened', time: '08:00 AM', title: 'Case Opened' },
  { id: 'loc-1', pin: 1, step: '1. Crime Scene Discovered', time: '08:30 AM', title: 'Old Town Entry', type: 'crime' },
  { id: 'loc-6', pin: 2, step: '2. Evidence Found', time: '09:15 AM', title: 'Broken Window', type: 'evidence' },
  { id: 'loc-3', pin: 3, step: '3. Witness Interview', time: '10:45 AM', title: 'Blackwood Bridge', type: 'crime' },
  { id: 'loc-4', pin: 4, step: '4. Vehicle Spotted', time: '01:20 PM', title: 'Warehouse #12', type: 'crime' },
  { id: 'loc-5', pin: 5, step: '5. Suspect Last Seen', time: '02:10 PM', title: 'South End Hideout', type: 'crime' },
  { id: 'loc-8', step: 'Safe House Visit', time: '04:30 PM', title: 'Hillside House', type: 'safehouse' },
];

export function MapPage() {
  const [selectedLoc, setSelectedLoc] = useState<MapLocation>(locations[3]); // Warehouse #12 default
  const [zoom, setZoom] = useState(100);
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="min-h-full p-6 pb-20 relative overflow-x-hidden font-inter select-none" style={{ background: 'linear-gradient(180deg, #14110f 0%, #0d0a08 100%)' }}>

      {/* ── HEADER ── */}
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
        <div>
          <h1 className="font-playfair text-3xl text-[#f5e6c8] font-bold tracking-tight">INVESTIGATION MAP</h1>
          <p className="font-inter text-xs text-[#8b7a5a] mt-0.5">Crime locations, evidence points and investigation routes.</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Case Folder Tag */}
          <div className="px-4 py-2 bg-[#d4b896] border border-[#5a3b1c] rounded-xs shadow-md flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#8b2e2e]">CASE #47-A7</span>
            <span className="font-playfair text-xs font-bold text-[#2a1505]">The Blackwood Heist</span>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1e1408] border border-[#5a3b1c]/40 text-xs font-bold text-[#c89b3c] rounded-xs hover:bg-[#281b0b] transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* ── MAIN MAP WORKSPACE GRID ── */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 mb-5">

        {/* ── LEFT & CENTER: MAP CANVAS (3 COLUMNS) ── */}
        <div className="lg:col-span-3 h-[580px] relative rounded-sm border border-[#5a3b1c]/40 overflow-auto custom-scrollbar shadow-2xl bg-[#1c1308]">

          {/* Zoom Container */}
          <div
            className="w-[1600px] h-[1000px] relative transition-transform duration-200"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
          >
            {/* Vintage Parchment City Map Background */}
            <img
              src="/vintage_map.png"
              alt="Blackwood City Map"
              className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.25] sepia-[0.3]"
            />

            {/* Map Noise Texture */}
            <div
              className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundSize: '120px',
              }}
            />

            {/* Compass Rose (Top Left) */}
            <div className="absolute top-6 left-6 text-[#5a3b1c]/60 pointer-events-none z-10">
              <div className="flex flex-col items-center">
                <span className="font-cinzel text-xs font-bold text-[#c89b3c]">N</span>
                <div className="w-14 h-14 border border-[#5a3b1c]/40 rounded-full flex items-center justify-center my-1 relative">
                  <div className="w-10 h-10 border border-[#c89b3c]/30 rounded-full flex items-center justify-center">
                    <Navigation className="w-6 h-6 text-[#c89b3c]/80 transform rotate-45" />
                  </div>
                </div>
                <p className="font-cinzel text-[10px] font-bold text-[#c89b3c] tracking-widest mt-1">BLACKWOOD CITY</p>
                <p className="font-inter text-[8px] text-[#8b7a5a]">Est. 1872</p>
              </div>
            </div>

            {/* District Text Overlay Labels */}
            <span className="absolute top-[26%] left-[42%] font-cinzel text-xs font-extrabold text-[#5a3b1c]/70 tracking-widest pointer-events-none">RIVERSIDE DISTRICT</span>
            <span className="absolute top-[40%] left-[32%] font-cinzel text-xs font-extrabold text-[#5a3b1c]/70 tracking-widest pointer-events-none">OLD TOWN</span>
            <span className="absolute top-[40%] left-[58%] font-cinzel text-xs font-extrabold text-[#5a3b1c]/70 tracking-widest pointer-events-none">DOCKYARD</span>
            <span className="absolute top-[30%] left-[70%] font-cinzel text-xs font-extrabold text-[#5a3b1c]/70 tracking-widest pointer-events-none">WAREHOUSE DISTRICT</span>
            <span className="absolute top-[55%] left-[50%] font-cinzel text-xs font-extrabold text-[#5a3b1c]/70 tracking-widest pointer-events-none">SOUTH END</span>
            <span className="absolute top-[68%] left-[75%] font-cinzel text-xs font-extrabold text-[#5a3b1c]/70 tracking-widest pointer-events-none">HILLSIDE</span>

            {/* ── SVG ROUTE LINES ── */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Main Red Investigation Route (1 ➔ 2 ➔ 3 ➔ 4 ➔ 5) */}
              <path
                d="M 37% 48% Q 41% 38% 45% 28% Q 50% 35% 54% 42% Q 63% 37% 72% 32% Q 69% 42% 66% 52%"
                fill="none"
                stroke="#8b2e2e"
                strokeWidth="3"
                filter="url(#glow)"
              />
              <path
                d="M 37% 48% Q 41% 38% 45% 28% Q 50% 35% 54% 42% Q 63% 37% 72% 32% Q 69% 42% 66% 52%"
                fill="none"
                stroke="#c0392b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Branch Route to Evidence */}
              <path
                d="M 37% 48% L 41% 52%"
                fill="none"
                stroke="#b06a2c"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <path
                d="M 54% 42% L 62% 38%"
                fill="none"
                stroke="#b06a2c"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <path
                d="M 66% 52% L 78% 65%"
                fill="none"
                stroke="#3498db"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
            </svg>

            {/* ── MAP LOCATION PINS ── */}
            {locations.map((loc) => {
              const isSelected = selectedLoc.id === loc.id;
              return (
                <motion.div
                  key={loc.id}
                  onClick={() => setSelectedLoc(loc)}
                  whileHover={{ scale: 1.25, zIndex: 40 }}
                  className="absolute z-20 cursor-pointer -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                >
                  {/* Pin Graphic */}
                  {loc.pinNumber ? (
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center shadow-2xl border-2 transition-transform",
                      isSelected ? "scale-125 border-yellow-300 ring-4 ring-red-500/40" : "border-[#3d0a0a]",
                      "bg-gradient-to-tr from-[#6b1414] via-[#b82828] to-[#e74c3c] text-white"
                    )}>
                      <span className="font-mono text-xs font-extrabold">{loc.pinNumber}</span>
                    </div>
                  ) : (
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2",
                      loc.type === 'evidence' ? "bg-amber-600 border-amber-900 text-white" :
                        loc.type === 'safehouse' ? "bg-blue-600 border-blue-900 text-white" :
                          "bg-emerald-600 border-emerald-900 text-white"
                    )}>
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {/* Location Label Badge on Hover / Selected */}
                  <div className={cn(
                    "mt-1 px-2 py-0.5 rounded-xs bg-[#1a1208]/90 border border-[#5a3b1c] shadow-md whitespace-nowrap transition-opacity",
                    isSelected ? "opacity-100 scale-105" : "opacity-80 group-hover:opacity-100"
                  )}>
                    <span className="font-playfair text-[10px] font-bold text-[#c89b3c]">{loc.name}</span>
                  </div>
                </motion.div>
              );
            })}

            {/* Pinned Legend Card (Top Left Map Overlay) */}
            <div
              className="absolute top-6 left-28 p-3 w-48 rounded-xs shadow-2xl border pointer-events-auto z-20"
              style={{
                background: 'linear-gradient(145deg, #e8d9b5 0%, #dfcea3 100%)',
                borderColor: '#5a3b1c',
              }}
            >
              {/* Red Pushpin */}
              <div className="absolute -top-1.5 left-3 w-3.5 h-3.5 rounded-full bg-[#8b2e2e] border-2 border-[#3a0808] shadow-md" />

              <p className="font-cinzel text-xs font-bold text-[#2a1505] tracking-widest border-b border-[#5a3b1c]/30 pb-1 mb-2">
                LEGEND
              </p>

              <div className="space-y-1.5 text-[10px] font-inter font-medium text-[#3a220f]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#b82828] border border-[#3d0a0a]" />
                  <span>Crime Scene</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-600 border border-amber-900" />
                  <span>Evidence Found</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-600 border border-emerald-900" />
                  <span>Witness Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-600 border border-purple-900" />
                  <span>Suspect Last Seen</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-600 border border-blue-900" />
                  <span>Safe House</span>
                </div>

                <div className="pt-1 border-t border-[#5a3b1c]/20 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[#8b2e2e]" />
                    <span>Investigation Route</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[#b06a2c] border-b border-dashed" />
                    <span>Possible Route</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Map Controls Stack (Top Right Overlay - Fixed to viewport) */}
          <div className="sticky top-4 float-right mr-4 mt-4 z-30 flex flex-col rounded-sm border border-[#5a3b1c]/40 bg-[#1a1208]/90 backdrop-blur-md shadow-2xl divide-y divide-[#5a3b1c]/30">
            <button onClick={() => setZoom((z) => Math.min(z + 15, 160))} className="p-2 text-[#8b7a5a] hover:text-[#c89b3c]">
              <Plus className="w-4 h-4" />
            </button>
            <button onClick={() => setZoom((z) => Math.max(z - 15, 75))} className="p-2 text-[#8b7a5a] hover:text-[#c89b3c]">
              <Minus className="w-4 h-4" />
            </button>
            <button onClick={() => setZoom(100)} className="p-2 text-[#8b7a5a] hover:text-[#c89b3c]" title="Recenter">
              <Target className="w-4 h-4" />
            </button>
            <button className="p-2 text-[#8b7a5a] hover:text-[#c89b3c]" title="Layers">
              <Layers className="w-4 h-4" />
            </button>
          </div>

          {/* Radar Mini Map (Bottom Right Overlay) */}
          <div className="absolute bottom-4 right-4 z-30 w-44 h-28 rounded-sm border border-[#5a3b1c]/40 bg-[#1a1208]/90 backdrop-blur-md p-1.5 shadow-2xl flex flex-col">
            <span className="font-mono text-[8px] text-[#8b7a5a] mb-1">RADAR MINI MAP</span>
            <div className="flex-1 bg-black/40 border border-[#5a3b1c]/20 relative overflow-hidden">
              <div className="absolute inset-2 border border-[#c89b3c]/60 rounded-xs" />
            </div>
          </div>
        </div>

        {/* ── RIGHT INSPECTOR PANEL: LOCATION DETAILS ── */}
        <div
          className="lg:col-span-1 p-5 rounded-sm shadow-2xl border relative flex flex-col justify-between"
          style={{
            background: 'linear-gradient(150deg, #e8d9b5 0%, #dfcea3 50%, #d4c090 100%)',
            borderColor: '#5a3b1c',
          }}
        >
          {/* Red Pushpin at Top Right */}
          <div className="absolute -top-1.5 right-6 w-4 h-4 rounded-full bg-[#8b2e2e] border-2 border-[#3a0808] shadow-md z-10" />

          <div>
            <p className="font-cinzel text-xs font-bold text-[#2a1505] tracking-widest border-b border-[#5a3b1c]/30 pb-1 mb-3">
              LOCATION DETAILS
            </p>

            {/* B&W Polaroid Photo */}
            <div className="p-2 pb-4 bg-[#f5e6c8] border border-gray-300 shadow-lg rounded-xs mb-3">
              <div className="w-full h-32 bg-[#1a0f05] overflow-hidden mb-2">
                <img src={selectedLoc.image} alt={selectedLoc.name} className="w-full h-full object-cover grayscale contrast-125 sepia-[0.3]" />
              </div>
              <p className="font-playfair text-sm font-extrabold text-[#2a1505] text-center">{selectedLoc.name}</p>
            </div>

            {/* Stamp Badge */}
            <div className="inline-block border-2 border-[#8b2e2e] text-[#8b2e2e] px-2 py-0.5 mb-3 transform rotate-[-4deg]">
              <span className="font-cinzel text-[9px] font-extrabold tracking-widest uppercase">{selectedLoc.status}</span>
            </div>

            {/* Details List */}
            <div className="space-y-2 text-xs font-inter text-[#3a220f] border-t border-b border-[#5a3b1c]/20 py-3 mb-3">
              <div className="flex justify-between">
                <span className="text-[#5a3b1c] font-bold text-[10px] uppercase">Location:</span>
                <span className="font-medium">{selectedLoc.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a3b1c] font-bold text-[10px] uppercase">Reported:</span>
                <span className="font-mono text-[10px]">{selectedLoc.reported}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a3b1c] font-bold text-[10px] uppercase">Case:</span>
                <span className="font-playfair font-bold text-[#8b2e2e]">The Blackwood Heist</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a3b1c] font-bold text-[10px] uppercase">Officer:</span>
                <span className="font-medium">Det. Arjun Rathore</span>
              </div>
            </div>

            {/* Notes */}
            <div>
              <span className="font-inter text-[10px] font-bold text-[#5a3b1c] uppercase tracking-wider block mb-1">Notes:</span>
              <p className="font-cormorant italic text-xs font-semibold text-[#2a1505] leading-relaxed">
                "{selectedLoc.notes}"
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setEvidenceModalOpen(true)}
            className="w-full mt-4 py-3 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest rounded-sm border border-[#5a3b1c] shadow-lg hover:bg-[#28180a] transition-colors"
          >
            View Evidence ({selectedLoc.evidenceCount})
          </button>
        </div>

      </div>

      {/* ── BOTTOM PANEL: INVESTIGATION ROUTE TIMELINE ── */}
      <div className="max-w-[1440px] mx-auto p-4 rounded-sm border border-[#5a3b1c]/40 bg-[#1c1308] shadow-2xl relative">
        <p className="font-inter text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8b7a5a] mb-3">
          INVESTIGATION ROUTE TIMELINE
        </p>

        <div className="flex items-center gap-3">
          <button className="p-2 text-[#8b7a5a] hover:text-[#c89b3c] border border-[#5a3b1c]/40 rounded-xs">
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Timeline Cards Container */}
          <div className="flex-1 flex gap-3 overflow-x-auto custom-scrollbar pb-1">
            {timelineSteps.map((step, idx) => {
              const matchedLoc = locations.find(l => l.id === step.id);
              const isSelected = selectedLoc.id === step.id;

              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03, y: -2 }}
                  onClick={() => matchedLoc && setSelectedLoc(matchedLoc)}
                  className={cn(
                    "p-3 rounded-xs border flex-shrink-0 w-44 cursor-pointer transition-all relative",
                    isSelected ? "bg-[#d4b896] border-[#8b2e2e] shadow-xl" : "bg-[#140c04] border-[#5a3b1c]/30 hover:bg-[#1f1308]"
                  )}
                >
                  {/* Pushpin */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#8b2e2e] border-2 border-[#3a0808]" />

                  <p className={cn("font-inter text-[9px] font-extrabold uppercase tracking-wider mb-1", isSelected ? "text-[#8b2e2e]" : "text-[#8b7a5a]")}>
                    {step.step}
                  </p>
                  <p className={cn("font-playfair text-xs font-bold truncate", isSelected ? "text-[#2a1505]" : "text-[#f5e6c8]")}>
                    {step.title}
                  </p>
                  <span className={cn("font-mono text-[9px] block mt-1", isSelected ? "text-[#5a3b1c]" : "text-[#8b7a5a]")}>
                    {step.time}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <button className="p-2 text-[#8b7a5a] hover:text-[#c89b3c] border border-[#5a3b1c]/40 rounded-xs">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── VIEW EVIDENCE MODAL (FRONTEND ONLY) ── */}
      <AnimatePresence>
        {evidenceModalOpen && (
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
              className="w-full max-w-lg p-6 rounded-sm border shadow-2xl relative"
              style={{
                background: 'linear-gradient(160deg, #e8d9b5 0%, #d8be99 100%)',
                borderColor: '#5a3b1c',
              }}
            >
              <button
                onClick={() => setEvidenceModalOpen(false)}
                className="absolute top-4 right-4 text-[#5a3b1c] hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-cinzel text-xl font-bold text-[#2a1505] mb-2">Evidence Recovered at {selectedLoc.name}</h3>
              <p className="font-mono text-xs text-[#8b2e2e] mb-4">Case #47-A7 // Clearance Level 3</p>

              <div className="space-y-3">
                <div className="p-3 bg-[#f5e6c8] border border-[#5a3b1c]/40 rounded-xs">
                  <span className="font-mono text-[10px] font-bold text-[#8b2e2e]">EVID-5001</span>
                  <p className="font-playfair text-xs font-bold text-[#2a1505]">Shattered Glass Fragment</p>
                  <p className="font-inter text-[11px] text-[#5a3b1c]">Found near east entrance gate with red fiber trace.</p>
                </div>
                <div className="p-3 bg-[#f5e6c8] border border-[#5a3b1c]/40 rounded-xs">
                  <span className="font-mono text-[10px] font-bold text-[#8b2e2e]">EVID-5002</span>
                  <p className="font-playfair text-xs font-bold text-[#2a1505]">Tire Tread Impression Copy</p>
                  <p className="font-inter text-[11px] text-[#5a3b1c]">Matches 1950s commercial black delivery truck.</p>
                </div>
              </div>

              <button
                onClick={() => setEvidenceModalOpen(false)}
                className="w-full mt-5 py-2.5 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest border border-[#5a3b1c] shadow-lg hover:bg-[#28180a] transition-colors"
              >
                Close Evidence Report
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
