import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInvestigationStore } from '../store/useInvestigationStore';
import { 
  Search, Bell, Folder, Hand, MousePointer, Pin, Link, BoxSelect, 
  Type, MapPin, RotateCcw, Plus, Minus, Share2, PlusCircle, X, 
  FileText, Users, Clock, Map as MapIcon, ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

// ─── TYPES & INITIAL BOARD NODES ─────────────────────────────────────────────

interface BoardNode {
  id: string;
  type: 'photo' | 'document' | 'note' | 'suspect';
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  tag?: string;
  tagColor?: string;
  stamp?: string;
  x: number;
  y: number;
  rotate: number;
  width?: number;
}

interface Connection {
  from: string;
  to: string;
}

const initialNodes: BoardNode[] = [
  // 1. Central Suspect Silhouette
  {
    id: 'center-unknown',
    type: 'suspect',
    title: 'UNKNOWN SUSPECT',
    image: '/unknown_suspect_card.png',
    x: 480,
    y: 240,
    rotate: -1,
    width: 165,
  },

  // 2. Top Left Case Summary Document
  {
    id: 'case-summary',
    type: 'document',
    title: 'CASE SUMMARY',
    content: 'The Blackwood Heist occurred on March 17, 1952 at the Blackwood Museum. Multiple high-value artifacts were stolen. Investigation ongoing to identify suspects and recover stolen items.',
    x: 210,
    y: 110,
    rotate: -2,
    width: 210,
  },

  // 3. Top Center Crime Scene Photo
  {
    id: 'crime-scene',
    type: 'photo',
    title: 'CRIME SCENE',
    image: '/crime_scene_card.png',
    x: 480,
    y: 100,
    rotate: 3,
    width: 175,
  },

  // 4. Top Center Important Note
  {
    id: 'note-important',
    type: 'note',
    title: 'IMPORTANT',
    content: 'Security system was disabled 10 mins before the heist.',
    x: 700,
    y: 105,
    rotate: -3,
    width: 150,
  },

  // 5. Top Right Suspect - Victor H. Blackwood
  {
    id: 'suspect-victor',
    type: 'suspect',
    title: 'VICTOR H. BLACKWOOD',
    image: '/victor_blackwood_card.png',
    x: 880,
    y: 110,
    rotate: 2,
    width: 165,
  },

  // 6. Top Far Right Motive Note
  {
    id: 'note-motive',
    type: 'note',
    title: 'MOTIVE',
    content: 'Financial troubles? Insurance fraud? Personal vendetta?',
    x: 1070,
    y: 160,
    rotate: 4,
    width: 140,
  },

  // 7. Middle Left Suspect - James Moriarty
  {
    id: 'suspect-james',
    type: 'suspect',
    title: 'JAMES MORIARTY',
    image: '/james_moriarty_card.png',
    tag: 'PERSON OF INTEREST',
    tagColor: 'red',
    x: 240,
    y: 350,
    rotate: -4,
    width: 165,
  },

  // 8. Middle Left Guard Note
  {
    id: 'note-guard',
    type: 'note',
    content: 'Guard on duty was found unconscious.',
    x: 390,
    y: 320,
    rotate: 5,
    width: 130,
  },

  // 9. Middle Right Suspect - Clara Winters
  {
    id: 'suspect-clara',
    type: 'suspect',
    title: 'CLARA WINTERS',
    image: '/clara_winters_card.png',
    x: 900,
    y: 360,
    rotate: -2,
    width: 165,
  },

  // 10. Middle Right Note - Last Seen
  {
    id: 'note-dock',
    type: 'note',
    content: 'Last seen near the loading dock.',
    x: 1080,
    y: 390,
    rotate: 3,
    width: 135,
  },

  // 11. Lower Left Connection Document
  {
    id: 'doc-connection',
    type: 'document',
    title: 'POSSIBLE CONNECTION',
    content: 'Both James and Clara were seen together 2 days before the heist.',
    x: 230,
    y: 530,
    rotate: 2,
    width: 200,
  },

  // 12. Lower Center Getaway Vehicle Photo
  {
    id: 'photo-vehicle',
    type: 'photo',
    title: 'GETAWAY VEHICLE',
    image: '/getaway_vehicle.png',
    x: 610,
    y: 510,
    rotate: -2,
    width: 180,
  },

  // 13. Lower Center Van Note
  {
    id: 'note-van',
    type: 'note',
    content: 'Witness reported a black van leaving the area.',
    x: 810,
    y: 540,
    rotate: -4,
    width: 145,
  },

  // 14. Bottom Left Museum Floor Plan Document
  {
    id: 'doc-floorplan',
    type: 'document',
    title: 'MUSEUM FLOOR PLAN',
    image: '/museum_floorplan_card.png',
    x: 240,
    y: 690,
    rotate: -3,
    width: 175,
  },

  // 15. Bottom Center Broken Window Photo
  {
    id: 'photo-window',
    type: 'photo',
    title: 'BROKEN WINDOW',
    image: '/broken_window_card.png',
    x: 520,
    y: 710,
    rotate: 3,
    width: 175,
  },

  // 16. Bottom Center Evidence Note
  {
    id: 'note-gloves',
    type: 'note',
    title: 'EVIDENCE NOTE',
    content: 'No fingerprints found. Thief used gloves.',
    x: 720,
    y: 725,
    rotate: -2,
    width: 140,
  },

  // 17. Bottom Right Stolen Artifact Document
  {
    id: 'doc-artifact',
    type: 'document',
    title: 'STOLEN ARTIFACT',
    image: '/stolen_artifact_card.png',
    stamp: 'MISSING',
    x: 880,
    y: 680,
    rotate: 2,
    width: 175,
  },
];

const initialConnections: Connection[] = [
  { from: 'center-unknown', to: 'crime-scene' },
  { from: 'center-unknown', to: 'note-important' },
  { from: 'center-unknown', to: 'suspect-victor' },
  { from: 'center-unknown', to: 'suspect-james' },
  { from: 'center-unknown', to: 'suspect-clara' },
  { from: 'center-unknown', to: 'photo-vehicle' },
  { from: 'center-unknown', to: 'photo-window' },
  { from: 'center-unknown', to: 'doc-artifact' },
  { from: 'center-unknown', to: 'case-summary' },

  { from: 'suspect-james', to: 'doc-connection' },
  { from: 'suspect-james', to: 'note-guard' },
  { from: 'suspect-clara', to: 'doc-connection' },
  { from: 'suspect-clara', to: 'note-dock' },
  { from: 'suspect-victor', to: 'note-motive' },
  { from: 'photo-vehicle', to: 'note-van' },
  { from: 'photo-window', to: 'note-gloves' },
];

// ─── DYNAMIC SVG RED EVIDENCE STRING COMPONENT ────────────────────────────────

function CurvedRedString({ fromPos, toPos }: { fromPos: { x: number; y: number }; toPos: { x: number; y: number } }) {
  const dx = toPos.x - fromPos.x;
  const dy = toPos.y - fromPos.y;
  
  // Calculate sag for natural string weight
  const cx = fromPos.x + dx / 2;
  const cy = fromPos.y + dy / 2 + Math.min(Math.abs(dx) * 0.15, 35);

  const d = `M ${fromPos.x} ${fromPos.y} Q ${cx} ${cy} ${toPos.x} ${toPos.y}`;

  return (
    <g>
      {/* String Drop Shadow */}
      <path
        d={d}
        fill="none"
        stroke="rgba(0,0,0,0.5)"
        strokeWidth="3.5"
        className="blur-[2px]"
        transform="translate(1, 4)"
      />
      {/* Outer Crimson Thread */}
      <path
        d={d}
        fill="none"
        stroke="#8b2e2e"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Inner Highlight Thread Texture */}
      <path
        d={d}
        fill="none"
        stroke="#c0392b"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      {/* Small Pin Knots at Ends */}
      <circle cx={fromPos.x} cy={fromPos.y} r="2.5" fill="#4a0808" />
      <circle cx={toPos.x} cy={toPos.y} r="2.5" fill="#4a0808" />
    </g>
  );
}

// ─── RED PUSH PIN GRAPHIC ─────────────────────────────────────────────────────

function PushPin() {
  return (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-40 pointer-events-none drop-shadow-md">
      <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#6b1414] via-[#b82828] to-[#e74c3c] border-2 border-[#3d0a0a] shadow-lg relative flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
      </div>
      <div className="w-0.5 h-2 bg-[#2d1808] mx-auto -mt-0.5 shadow-sm" />
    </div>
  );
}

// ─── MAIN INVESTIGATION BOARD COMPONENT ───────────────────────────────────────

export function InvestigationBoard() {
  const [nodes, setNodes] = useState<BoardNode[]>(initialNodes);
  const [connections, setConnections] = useState<Connection[]>(initialConnections);
  const [activeTool, setActiveTool] = useState<'pan' | 'select' | 'pin' | 'string' | 'box' | 'text' | 'location'>('pan');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemType, setNewItemType] = useState<'note' | 'photo' | 'document'>('note');
  const [newItemContent, setNewItemContent] = useState('');
  const [newItemImage, setNewItemImage] = useState('');

  // Interactive Tools State
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [sourceNodeId, setSourceNodeId] = useState<string | null>(null);
  const [history, setHistory] = useState<{type: 'node' | 'connection', data: any}[]>([]);

  // Panning Handlers
  const handleBoardMouseDown = (e: React.MouseEvent) => {
    if (activeTool === 'pan') {
      setIsPanning(true);
    }
  };

  const handleBoardMouseMove = (e: React.MouseEvent) => {
    if (isPanning && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= e.movementX;
      scrollContainerRef.current.scrollTop -= e.movementY;
    }
  };

  const handleBoardMouseUp = (e: React.MouseEvent) => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    // Click-to-add functionality for Note, Pin, Text, Location tools
    if (activeTool !== 'select' && activeTool !== 'pan' && activeTool !== 'string' && activeTool !== 'box') {
      if (scrollContainerRef.current && boardRef.current) {
        const rect = boardRef.current.getBoundingClientRect();
        // Calculate coordinates relative to the board, factoring in zoom
        const x = (e.clientX - rect.left) / (zoomLevel / 100);
        const y = (e.clientY - rect.top) / (zoomLevel / 100);

        const newNode: BoardNode = {
          id: `custom-${Date.now()}`,
          type: 'note',
          title: activeTool === 'location' ? 'LOCATION NOTE' : 'NEW NOTE',
          content: 'Click to edit...',
          x: x - 85, // center the node (170 width / 2)
          y: y - 65, // approx center height
          rotate: (Math.random() * 6 - 3),
          width: 170,
        };

        setNodes(prev => [...prev, newNode]);
        setHistory(prev => [...prev, { type: 'node', data: newNode }]);
        setActiveTool('select'); // revert back to select
      }
    }
  };

  // Node Interaction Handler
  const handleNodeClick = (e: React.MouseEvent, id: string) => {
    if (activeTool === 'string') {
      e.stopPropagation();
      if (!sourceNodeId) {
        setSourceNodeId(id);
      } else {
        if (sourceNodeId !== id) {
          const newConn = { from: sourceNodeId, to: id };
          setConnections(prev => [...prev, newConn]);
          setHistory(prev => [...prev, { type: 'connection', data: newConn }]);
        }
        setSourceNodeId(null);
      }
    }
  };

  // Undo Handler
  const handleUndo = () => {
    if (history.length === 0) return;
    const lastAction = history[history.length - 1];
    if (lastAction.type === 'node') {
      setNodes(prev => prev.filter(n => n.id !== lastAction.data.id));
    } else if (lastAction.type === 'connection') {
      setConnections(prev => prev.filter(c => !(c.from === lastAction.data.from && c.to === lastAction.data.to)));
    }
    setHistory(prev => prev.slice(0, -1));
  };

  // Update Node position on drag
  const handleDrag = (id: string, info: any) => {
    setNodes((prevNodes) =>
      prevNodes.map((n) => {
        if (n.id === id) {
          return {
            ...n,
            x: n.x + info.delta.x,
            y: n.y + info.delta.y,
          };
        }
        return n;
      })
    );
  };

  // Add new item to board
  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle && !newItemContent) return;

    const newNode: BoardNode = {
      id: `custom-${Date.now()}`,
      type: newItemType,
      title: newItemTitle.toUpperCase() || 'NEW EVIDENCE',
      content: newItemContent,
      image: newItemType === 'photo' ? newItemImage : undefined,
      x: 500 + (Math.random() * 100 - 50),
      y: 350 + (Math.random() * 100 - 50),
      rotate: (Math.random() * 6 - 3),
      width: 170,
    };

    setNodes((prev) => [...prev, newNode]);
    setHistory(prev => [...prev, { type: 'node', data: newNode }]);
    setAddItemModalOpen(false);
    setNewItemTitle('');
    setNewItemContent('');
    setNewItemImage('');
  };

  // Map of Node Center Positions for dynamic SVG red strings
  const nodeCenters: Record<string, { x: number; y: number }> = {};
  nodes.forEach((n) => {
    const w = n.width || 170;
    const h = n.type === 'photo' ? 190 : n.type === 'suspect' ? 180 : 130;
    nodeCenters[n.id] = {
      x: n.x + w / 2,
      y: n.y + h / 2,
    };
  });

  return (
    <div className="h-full w-full flex flex-col bg-[#120d07] select-none overflow-hidden font-inter">
      
      {/* ── TOP SECONDARY NAV TABS ── */}
      <div className="h-12 bg-[#1a1208] border-b border-[#5a3b1c]/30 flex items-center justify-between px-6 z-20 flex-shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-[#c89b3c]" />
            <span className="font-mono text-xs text-[#8b7a5a]">Case #47-A7</span>
            <h2 className="font-playfair text-base font-bold text-[#f5e6c8] ml-1">The Blackwood Heist</h2>
            <div className="border border-[#8b2e2e] text-[#8b2e2e] text-[9px] font-extrabold px-1.5 py-0.5 rounded-xs ml-2 uppercase">
              HIGH PRIORITY
            </div>
          </div>
        </div>

        {/* Sub-Nav Route Tabs */}
        <div className="flex items-center gap-1 h-full">
          {[
            { label: 'INVESTIGATION BOARD', active: true },
            { label: 'TIMELINE', active: false },
            { label: 'EVIDENCE', active: false },
            { label: 'PEOPLE', active: false },
            { label: 'DOCUMENTS', active: false },
            { label: 'REPORTS', active: false },
            { label: 'ANALYTICS', active: false },
          ].map((tab) => (
            <button
              key={tab.label}
              className={cn(
                "h-full px-3 text-[11px] font-inter font-bold tracking-wider transition-colors relative flex items-center",
                tab.active ? "text-[#c89b3c]" : "text-[#8b7a5a] hover:text-[#c89b3c]"
              )}
            >
              {tab.label}
              {tab.active && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c89b3c]" />
              )}
            </button>
          ))}
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[#5a3b1c]/40 text-xs text-[#8b7a5a] hover:text-[#c89b3c] transition-colors">
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Case</span>
          </button>
          <button
            onClick={() => setAddItemModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#c89b3c] text-[#1a1008] font-bold text-xs hover:bg-[#dfb04d] transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* ── MAIN CORKBOARD WORKSPACE CONTAINER ── */}
      <div className="flex-1 flex relative overflow-hidden">

        {/* ── LEFT FLOATING BRASS TOOLBAR ── */}
        <div className="absolute top-6 left-6 z-30 flex flex-col items-stretch p-1.5 rounded-md border border-[#5a3b1c]/40 bg-[#1a1208]/90 backdrop-blur-md shadow-2xl space-y-1 w-28">
          <button
            onClick={() => setActiveTool('pan')}
            title="Pan Tool"
            className={cn("p-2 flex items-center gap-2 rounded-sm transition-colors text-left", activeTool === 'pan' ? "bg-[#c89b3c] text-[#1a1008]" : "text-[#8b7a5a] hover:text-[#c89b3c]")}
          >
            <Hand className="w-4 h-4 shrink-0" />
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Pan</span>
          </button>
          <button
            onClick={() => setActiveTool('select')}
            title="Select Tool"
            className={cn("p-2 flex items-center gap-2 rounded-sm transition-colors text-left", activeTool === 'select' ? "bg-[#c89b3c] text-[#1a1008]" : "text-[#8b7a5a] hover:text-[#c89b3c]")}
          >
            <MousePointer className="w-4 h-4 shrink-0" />
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Select</span>
          </button>
          <button
            onClick={() => setActiveTool('pin')}
            title="Pin Tool"
            className={cn("p-2 flex items-center gap-2 rounded-sm transition-colors text-left", activeTool === 'pin' ? "bg-[#c89b3c] text-[#1a1008]" : "text-[#8b7a5a] hover:text-[#c89b3c]")}
          >
            <Pin className="w-4 h-4 shrink-0" />
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Add Pin</span>
          </button>
          <button
            onClick={() => setActiveTool('string')}
            title="Connect String Tool"
            className={cn("p-2 flex items-center gap-2 rounded-sm transition-colors text-left", activeTool === 'string' ? "bg-[#c89b3c] text-[#1a1008]" : "text-[#8b7a5a] hover:text-[#c89b3c]")}
          >
            <Link className="w-4 h-4 shrink-0" />
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Connect</span>
          </button>
          <button
            onClick={() => setActiveTool('box')}
            title="Select Box"
            className={cn("p-2 flex items-center gap-2 rounded-sm transition-colors text-left", activeTool === 'box' ? "bg-[#c89b3c] text-[#1a1008]" : "text-[#8b7a5a] hover:text-[#c89b3c]")}
          >
            <BoxSelect className="w-4 h-4 shrink-0" />
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Area</span>
          </button>
          <button
            onClick={() => setActiveTool('text')}
            title="Text Note"
            className={cn("p-2 flex items-center gap-2 rounded-sm transition-colors text-left", activeTool === 'text' ? "bg-[#c89b3c] text-[#1a1008]" : "text-[#8b7a5a] hover:text-[#c89b3c]")}
          >
            <Type className="w-4 h-4 shrink-0" />
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Note</span>
          </button>
          <button
            onClick={() => setActiveTool('location')}
            title="Location Pin"
            className={cn("p-2 flex items-center gap-2 rounded-sm transition-colors text-left", activeTool === 'location' ? "bg-[#c89b3c] text-[#1a1008]" : "text-[#8b7a5a] hover:text-[#c89b3c]")}
          >
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Location</span>
          </button>
          <button 
            onClick={handleUndo} 
            title="Undo" 
            className={cn("p-2 flex items-center gap-2 rounded-sm transition-colors text-left", history.length > 0 ? "text-[#8b7a5a] hover:text-[#c89b3c]" : "text-[#5a3b1c] opacity-50 cursor-not-allowed")}
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Undo</span>
          </button>

          <div className="w-full h-[1px] bg-[#5a3b1c]/30 my-2" />

          {/* Zoom Controls */}
          <div className="flex items-center justify-between px-1 pb-1">
            <button onClick={() => setZoomLevel((z) => Math.max(z - 10, 70))} title="Zoom Out" className="text-[#8b7a5a] hover:text-[#c89b3c]">
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono text-[9px] text-[#c89b3c] font-bold">{zoomLevel}%</span>
            <button onClick={() => setZoomLevel((z) => Math.min(z + 10, 150))} title="Zoom In" className="text-[#8b7a5a] hover:text-[#c89b3c]">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── REALISTIC CORK WALL CANVAS AREA ── */}
        <div 
          ref={scrollContainerRef}
          className={cn(
            "flex-1 h-full relative overflow-auto custom-scrollbar",
            activeTool === 'pan' ? "cursor-grab active:cursor-grabbing" :
            activeTool === 'string' ? "cursor-crosshair" :
            (activeTool !== 'select' && activeTool !== 'box') ? "cursor-copy" : ""
          )}
          onMouseDown={handleBoardMouseDown}
          onMouseMove={handleBoardMouseMove}
          onMouseUp={handleBoardMouseUp}
          onMouseLeave={handleBoardMouseUp}
        >
          <div
            ref={boardRef}
            className="w-[2000px] h-[1200px] relative"
            style={{
              background: 'radial-gradient(circle at 50% 50%, #3a2818 0%, #25170b 60%, #150a03 100%)',
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top left',
              transition: 'transform 0.2s ease-out',
            }}
          >
          {/* Cork Surface Texture Overlay */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cork'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cork)'/%3E%3C/svg%3E")`,
              backgroundSize: '256px',
            }}
          />

          {/* Vintage City Parchment Map Backdrop */}
          <img
            src="/vintage_map.png"
            alt="City Map Background"
            className="absolute inset-8 w-[calc(100%-64px)] h-[calc(100%-64px)] object-cover filter brightness-[0.4] contrast-[1.2] sepia-[0.4] opacity-50 pointer-events-none rounded-sm border border-[#5a3b1c]/40"
          />

          {/* Vignette Shadow Frame */}
          <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.95)] pointer-events-none" />

          {/* ── SVG DYNAMIC RED STRINGS OVERLAY LAYER ── */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {connections.map((conn, idx) => {
              const fromCenter = nodeCenters[conn.from];
              const toCenter = nodeCenters[conn.to];
              if (!fromCenter || !toCenter) return null;
              return <CurvedRedString key={idx} fromPos={fromCenter} toPos={toCenter} />;
            })}
          </svg>

          {/* ── DRAGGABLE CORKBOARD NODES ── */}
          {nodes.map((node, idx) => (
            <motion.div
              key={node.id}
              drag={activeTool === 'select'}
              dragMomentum={false}
              dragElastic={0.05}
              onClick={(e) => handleNodeClick(e, node.id)}
              onDrag={(_, info) => handleDrag(node.id, info)}
              initial={{ opacity: 0, scale: 0.8, x: node.x, y: node.y, rotate: node.rotate - 10 }}
              animate={{ opacity: 1, scale: 1, x: node.x, y: node.y, rotate: node.rotate }}
              transition={{ type: 'spring', stiffness: 300, damping: 24, delay: idx * 0.05 }}
              whileHover={{ scale: 1.04, zIndex: 50 }}
              whileDrag={{ scale: 1.08, zIndex: 100 }}
              className={cn(
                "absolute z-20 origin-top-left group",
                activeTool === 'select' ? "cursor-grab active:cursor-grabbing" :
                activeTool === 'string' ? "cursor-pointer" : "",
                sourceNodeId === node.id ? "ring-4 ring-[#8b2e2e] shadow-2xl scale-105" : ""
              )}
              style={{ width: node.width || 170 }}
            >
              {/* Pushpin at Node Top Center */}
              <PushPin />

              {/* === SPECIAL HANDLER FOR USER-PROVIDED CARD IMAGES === */}
              {node.image && node.image.endsWith('_card.png') ? (
                <div className="relative drop-shadow-2xl">
                  <img src={node.image} alt={node.title || ''} className="w-full h-auto object-contain pointer-events-none drop-shadow-xl" />
                  {node.tag && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#8b2e2e] text-[#f5e6c8] text-[8px] font-extrabold tracking-widest px-2 py-0.5 transform rotate-[2deg] shadow-md uppercase whitespace-nowrap z-30">
                      {node.tag}
                    </div>
                  )}
                  {node.stamp && (
                    <div className="absolute bottom-2 right-2 border-2 border-[#8b2e2e] text-[#8b2e2e] text-[8px] font-extrabold tracking-widest px-1.5 py-0.5 transform rotate-[-10deg] z-30">
                      {node.stamp}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* === NODE TYPE 1: PHOTO / POLAROID === */}
                  {node.type === 'photo' && (
                    <div className="p-2 pb-5 bg-[#f5e6c8] shadow-2xl rounded-xs border border-gray-300">
                      <div className="w-full h-32 bg-[#2a1a08] overflow-hidden mb-2 relative">
                        {node.image && (
                          <img src={node.image} alt={node.title} className="w-full h-full object-cover grayscale contrast-125 sepia-[0.3]" />
                        )}
                      </div>
                      {node.title && (
                        <p className="font-playfair text-xs font-bold text-[#2a1505] text-center leading-tight">
                          {node.title}
                        </p>
                      )}
                    </div>
                  )}

                  {/* === NODE TYPE 2: SUSPECT PORTRAIT === */}
                  {node.type === 'suspect' && (
                    <div className="p-2.5 pb-6 bg-[#e8d9b5] shadow-2xl rounded-xs border border-[#5a3b1c]/30 relative">
                      <div className="w-full h-36 bg-[#1a0f05] overflow-hidden mb-2 relative">
                        {node.image && (
                          <img src={node.image} alt={node.title} className="w-full h-full object-cover grayscale contrast-125 sepia-[0.25]" />
                        )}
                      </div>
                      {node.title && (
                        <p className="font-playfair text-xs font-extrabold text-[#2a1505] text-center leading-tight">
                          {node.title}
                        </p>
                      )}
                      {node.tag && (
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#8b2e2e] text-[#f5e6c8] text-[8px] font-extrabold tracking-widest px-2 py-0.5 transform rotate-[2deg] shadow-md uppercase whitespace-nowrap">
                          {node.tag}
                        </div>
                      )}
                    </div>
                  )}

                  {/* === NODE TYPE 3: TYPEWRITTEN DOCUMENT === */}
                  {node.type === 'document' && (
                    <div
                      className="p-3.5 shadow-2xl rounded-xs relative border"
                      style={{
                        background: 'linear-gradient(145deg, #e8d9b5 0%, #dfcea3 100%)',
                        borderColor: 'rgba(90,59,28,0.4)',
                      }}
                    >
                      {node.stamp && (
                        <div className="absolute bottom-2 right-2 border-2 border-[#8b2e2e] text-[#8b2e2e] text-[8px] font-extrabold tracking-widest px-1.5 py-0.5 transform rotate-[-10deg]">
                          {node.stamp}
                        </div>
                      )}
                      {node.title && (
                        <p className="font-mono text-[10px] font-bold text-[#8b2e2e] uppercase tracking-wider mb-1.5 border-b border-[#5a3b1c]/20 pb-1">
                          {node.title}
                        </p>
                      )}
                      {node.image && (
                        <div className="w-full h-24 mb-2 overflow-hidden bg-black/10">
                          <img src={node.image} alt="" className="w-full h-full object-contain" />
                        </div>
                      )}
                      {node.content && (
                        <p className="font-cormorant text-xs font-semibold text-[#2a1505] leading-relaxed italic">
                          {node.content}
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* === NODE TYPE 4: YELLOW STICKY NOTE === */}
              {node.type === 'note' && (
                <div
                  className="p-3 shadow-xl rounded-xs relative border"
                  style={{
                    background: 'linear-gradient(135deg, #fffab3 0%, #fef08a 100%)',
                    borderColor: 'rgba(180,140,40,0.4)',
                  }}
                >
                  {node.title && (
                    <p className="font-inter text-[9px] font-extrabold text-[#4a3500] uppercase tracking-wider mb-1 border-b border-[#4a3500]/20 pb-0.5">
                      {node.title}
                    </p>
                  )}
                  {node.content && (
                    <p className="font-cormorant italic font-bold text-xs text-[#2a1a08] leading-snug">
                      {node.content}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ))}

          {/* Floating Bottom-Left Radar Mini Map */}
          <div className="absolute bottom-4 left-6 z-30 w-44 h-28 hidden sm:flex rounded-md border border-[#5a3b1c]/40 bg-[#1a1208]/90 backdrop-blur-md p-2 shadow-2xl flex-col justify-between">
            <div className="flex justify-between items-center text-[9px] font-mono text-[#8b7a5a]">
              <span>CORKBOARD RADAR</span>
              <span className="text-[#c89b3c]">17 NODES</span>
            </div>
            <div className="flex-1 bg-black/40 border border-[#5a3b1c]/20 rounded-xs my-1 relative overflow-hidden">
              {nodes.map((n) => (
                <div
                  key={n.id}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#c89b3c]"
                  style={{
                    left: `${(n.x / 2000) * 100}%`,
                    top: `${(n.y / 1200) * 100}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        </div>

        {/* ── RIGHT FLOATING INSPECTOR PANEL ── */}
        <div
          className="w-80 h-full hidden lg:flex flex-col z-20 flex-shrink-0 p-4 space-y-4 overflow-y-auto"
          style={{
            background: 'linear-gradient(180deg, #181108 0%, #120b04 100%)',
            borderLeft: '1px solid rgba(90,59,28,0.4)',
          }}
        >
          {/* 1. CASE DETAILS */}
          <div className="p-4 rounded-sm border border-[#5a3b1c]/30 bg-black/30 relative overflow-hidden">
            {/* Rubber Stamp */}
            <div className="absolute bottom-3 right-3 border-2 border-[#8b2e2e] text-[#8b2e2e] text-[9px] font-extrabold tracking-widest px-2 py-0.5 transform rotate-[-8deg]">
              CLASSIFIED
            </div>

            <p className="font-inter text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8b7a5a] mb-3">
              Case Details
            </p>

            <div className="space-y-2 text-xs font-inter">
              <div className="flex justify-between">
                <span className="text-[#8b7a5a]">Case ID</span>
                <span className="font-mono font-bold text-[#c89b3c]">47-A7</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8b7a5a]">Status</span>
                <span className="font-bold text-[#c89b3c] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> In Progress
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8b7a5a]">Priority</span>
                <span className="font-bold text-[#8b2e2e]">🔴 High</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b7a5a]">Assigned To</span>
                <span className="font-medium text-[#f5e6c8]">Det. Arjun Rathore</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b7a5a]">Start Date</span>
                <span className="font-mono text-[#8b7a5a]">Mar 17, 1952</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b7a5a]">Last Update</span>
                <span className="font-mono text-[#8b7a5a]">2 hours ago</span>
              </div>
            </div>
          </div>

          {/* 2. NOTES */}
          <div className="p-4 rounded-sm border border-[#5a3b1c]/30 bg-black/30">
            <div className="flex justify-between items-center mb-3">
              <p className="font-inter text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8b7a5a]">
                Notes
              </p>
              <button
                onClick={() => setAddItemModalOpen(true)}
                className="text-[#c89b3c] hover:text-white transition-colors"
                title="Add Note"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="p-2.5 rounded-sm bg-[#5a3b1c]/20 border border-[#5a3b1c]/30">
                <p className="font-inter text-xs text-[#f5e6c8] leading-snug">
                  New lead discovered in warehouse district.
                </p>
                <span className="font-mono text-[9px] text-[#8b7a5a] mt-1 block">2h ago</span>
              </div>
              <div className="p-2.5 rounded-sm bg-[#5a3b1c]/20 border border-[#5a3b1c]/30">
                <p className="font-inter text-xs text-[#f5e6c8] leading-snug">
                  Interview with museum curator scheduled.
                </p>
                <span className="font-mono text-[9px] text-[#8b7a5a] mt-1 block">5h ago</span>
              </div>
            </div>
          </div>

          {/* 3. QUICK LINKS */}
          <div className="p-4 rounded-sm border border-[#5a3b1c]/30 bg-black/30">
            <p className="font-inter text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8b7a5a] mb-3">
              Quick Links
            </p>
            <div className="space-y-1.5 font-inter text-xs">
              {[
                { label: 'All Evidence', icon: FileText },
                { label: 'All People', icon: Users },
                { label: 'Timeline View', icon: Clock },
                { label: 'Crime Map', icon: MapIcon },
                { label: 'Generate Report', icon: FileText },
              ].map((link) => (
                <button
                  key={link.label}
                  className="w-full flex items-center gap-3 p-2 rounded-sm text-[#8b7a5a] hover:text-[#c89b3c] hover:bg-[#5a3b1c]/20 transition-colors"
                >
                  <link.icon className="w-4 h-4 text-[#c89b3c]" />
                  <span>{link.label}</span>
                  <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ── ADD ITEM MODAL (FRONTEND ONLY) ── */}
      <AnimatePresence>
        {addItemModalOpen && (
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
                onClick={() => setAddItemModalOpen(false)}
                className="absolute top-4 right-4 text-[#5a3b1c] hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-cinzel text-xl font-bold text-[#2a1505] mb-4">Add Item to Corkboard</h3>

              <form onSubmit={handleAddNewItem} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#5a3b1c] uppercase mb-1">Item Type</label>
                  <select
                    value={newItemType}
                    onChange={(e) => setNewItemType(e.target.value as any)}
                    className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] font-bold focus:outline-none"
                  >
                    <option value="note">Yellow Sticky Note</option>
                    <option value="photo">Evidence Photo</option>
                    <option value="document">Typewritten Document</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5a3b1c] uppercase mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. SUSPECT LEAD"
                    value={newItemTitle}
                    onChange={(e) => setNewItemTitle(e.target.value)}
                    className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] focus:outline-none"
                  />
                </div>

                {newItemType === 'photo' && (
                  <div>
                    <label className="block text-xs font-bold text-[#5a3b1c] uppercase mb-1">Image URL</label>
                    <input
                      type="text"
                      placeholder="e.g. https://example.com/photo.jpg"
                      value={newItemImage}
                      onChange={(e) => setNewItemImage(e.target.value)}
                      className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#5a3b1c] uppercase mb-1">Content / Details</label>
                  <textarea
                    rows={3}
                    placeholder="Enter evidence notes or clues..."
                    value={newItemContent}
                    onChange={(e) => setNewItemContent(e.target.value)}
                    className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest border border-[#5a3b1c] shadow-lg hover:bg-[#28180a] transition-colors mt-2"
                >
                  Pin Item to Corkboard
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
