import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, User, Folder, Clipboard, Bell, Settings as Gear, FileText, 
  Mail, Check, Filter, List, ChevronLeft, ChevronRight, ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';

interface NotificationItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  unread: boolean;
  category: 'Cases' | 'Evidence' | 'System';
  icon: any;
  evidenceId?: string;
  addedBy?: string;
  dateTime?: string;
  caseName?: string;
  itemCategory?: string;
  location?: string;
  fullDescription?: string;
  image?: string;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New evidence added',
    subtitle: 'Evidence #EV-156 has been added to case The Blackwood Heist.',
    time: '10:24 AM',
    unread: true,
    category: 'Evidence',
    icon: Camera,
    evidenceId: 'EV-156',
    addedBy: 'Detective Arjun Rathore',
    dateTime: 'May 17, 2025 - 10:24 AM',
    caseName: 'The Blackwood Heist (#47-A7)',
    itemCategory: 'Photography',
    location: 'Museum Main Hall',
    fullDescription: 'Photograph of the stolen artifact display case found near the east gallery.',
    image: '/vintage_camera.png',
  },
  {
    id: 'notif-2',
    title: 'Witness statement received',
    subtitle: 'Statement from James Moriarty has been added to the case.',
    time: '09:48 AM',
    unread: false,
    category: 'Cases',
    icon: User,
    evidenceId: 'STMT-402',
    addedBy: 'Det. Diya Sharma',
    dateTime: 'May 17, 2025 - 09:48 AM',
    caseName: 'The Blackwood Heist (#47-A7)',
    itemCategory: 'Witness Statement',
    location: 'Interview Room A',
    fullDescription: 'Formal statement recorded from night guard James Moriarty regarding the timeline of events.',
    image: '/james_moriarty_card.png',
  },
  {
    id: 'notif-3',
    title: 'Case updated',
    subtitle: 'Case The Riverfront Murders has been updated by Detective Meera Iyer.',
    time: 'Yesterday',
    unread: true,
    category: 'Cases',
    icon: Folder,
    evidenceId: 'CASE-29C',
    addedBy: 'Detective Meera Iyer',
    dateTime: 'May 16, 2025 - 04:30 PM',
    caseName: 'The Riverfront Murders (#29-C1)',
    itemCategory: 'Case Progress',
    location: 'Riverfront District',
    fullDescription: 'New suspect profile linked and location heat map updated.',
  },
  {
    id: 'notif-4',
    title: 'Task assigned',
    subtitle: 'You have been assigned a new task Review CCTV Footage.',
    time: 'Yesterday',
    unread: true,
    category: 'Cases',
    icon: Clipboard,
    evidenceId: 'TSK-108',
    addedBy: 'Bureau Chief',
    dateTime: 'May 16, 2025 - 02:15 PM',
    caseName: 'The Blackwood Heist (#47-A7)',
    itemCategory: 'Task Assignment',
    location: 'Intelligence Room',
    fullDescription: 'Examine 4 hours of dockyard surveillance footage recorded between 01:00 AM and 05:00 AM.',
  },
  {
    id: 'notif-5',
    title: 'Reminder',
    subtitle: 'Interview with Dock Worker scheduled tomorrow at 11:00 AM.',
    time: 'Yesterday',
    unread: true,
    category: 'Cases',
    icon: Bell,
    evidenceId: 'REM-88',
    addedBy: 'Calendar System',
    dateTime: 'May 16, 2025 - 11:00 AM',
    caseName: 'The Blackwood Heist (#47-A7)',
    itemCategory: 'Schedule Reminder',
    location: 'Dockyard Station',
    fullDescription: 'Follow-up interview regarding the black delivery truck seen near Warehouse #12.',
  },
  {
    id: 'notif-6',
    title: 'System notification',
    subtitle: 'System maintenance scheduled on May 20, 2025 at 02:00 AM.',
    time: 'May 16',
    unread: true,
    category: 'System',
    icon: Gear,
    evidenceId: 'SYS-901',
    addedBy: 'Bureau IT Admin',
    dateTime: 'May 16, 2025 - 10:00 AM',
    caseName: 'System Archive',
    itemCategory: 'Maintenance Alert',
    location: 'Bureau Central Server',
    fullDescription: 'Routine archive backup and security patch update.',
  },
  {
    id: 'notif-7',
    title: 'Report generated',
    subtitle: 'Investigation Summary Report for case #47-A7 is ready.',
    time: 'May 15',
    unread: true,
    category: 'Evidence',
    icon: FileText,
    evidenceId: 'REP-001',
    addedBy: 'Det. Arjun Rathore',
    dateTime: 'May 15, 2025 - 03:20 PM',
    caseName: 'The Blackwood Heist (#47-A7)',
    itemCategory: 'Investigation Report',
    location: 'Reports Archive',
    fullDescription: 'Comprehensive summary report detailing suspect leads and physical exhibits.',
  },
  {
    id: 'notif-8',
    title: 'New message',
    subtitle: 'You have a new message from Detective Vikram Desai.',
    time: 'May 15',
    unread: false,
    category: 'System',
    icon: Mail,
    evidenceId: 'MSG-304',
    addedBy: 'Det. Vikram Desai',
    dateTime: 'May 15, 2025 - 01:10 PM',
    caseName: 'Inter-Bureau Communication',
    itemCategory: 'Officer Message',
    location: 'Secure Dispatch',
    fullDescription: 'Requested ballistics comparison results have been dispatched to your bureau desk.',
  },
];

export function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [selectedNotif, setSelectedNotif] = useState<NotificationItem>(initialNotifications[0]);
  const [activeTab, setActiveTab] = useState<'All' | 'Unread' | 'Cases' | 'Evidence' | 'System'>('All');

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Unread') return n.unread;
    return n.category === activeTab;
  });

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-full p-6 pb-20 relative overflow-x-hidden font-inter select-none" style={{ background: 'linear-gradient(180deg, #14110f 0%, #0d0a08 100%)' }}>
      
      {/* ── HEADER ── */}
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
        <div>
          <h1 className="font-playfair text-3xl text-[#f5e6c8] font-bold tracking-tight">NOTIFICATIONS</h1>
          <p className="font-inter text-xs text-[#8b7a5a] mt-0.5">Stay updated with case activities and alerts.</p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#1e1408] border border-[#5a3b1c]/40 text-xs font-bold text-[#c89b3c] rounded-xs hover:bg-[#281b0b] transition-colors"
        >
          <Check className="w-4 h-4" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* ── FILTER TABS BAR ── */}
      <div className="max-w-[1440px] mx-auto p-3 bg-[#1a1208] border border-[#5a3b1c]/30 rounded-sm flex items-center justify-between shadow-md mb-5">
        <div className="flex items-center gap-2">
          {/* All */}
          <button
            onClick={() => setActiveTab('All')}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-xs flex items-center gap-2 transition-colors",
              activeTab === 'All' ? "bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c]" : "text-[#8b7a5a] hover:text-[#c89b3c]"
            )}
          >
            <span>All</span>
            <span className="w-4 h-4 rounded-full bg-[#8b2e2e] text-[#f5e6c8] text-[9px] flex items-center justify-center font-mono">
              {notifications.length}
            </span>
          </button>

          {/* Unread */}
          <button
            onClick={() => setActiveTab('Unread')}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-xs flex items-center gap-2 transition-colors",
              activeTab === 'Unread' ? "bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c]" : "text-[#8b7a5a] hover:text-[#c89b3c]"
            )}
          >
            <span>Unread</span>
            <span className="w-4 h-4 rounded-full bg-[#8b2e2e] text-[#f5e6c8] text-[9px] flex items-center justify-center font-mono">
              {unreadCount}
            </span>
          </button>

          {/* Cases */}
          <button
            onClick={() => setActiveTab('Cases')}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-xs transition-colors",
              activeTab === 'Cases' ? "bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c]" : "text-[#8b7a5a] hover:text-[#c89b3c]"
            )}
          >
            Cases
          </button>

          {/* Evidence */}
          <button
            onClick={() => setActiveTab('Evidence')}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-xs transition-colors",
              activeTab === 'Evidence' ? "bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c]" : "text-[#8b7a5a] hover:text-[#c89b3c]"
            )}
          >
            Evidence
          </button>

          {/* System */}
          <button
            onClick={() => setActiveTab('System')}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-xs transition-colors",
              activeTab === 'System' ? "bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c]" : "text-[#8b7a5a] hover:text-[#c89b3c]"
            )}
          >
            System
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-[#120b04] border border-[#5a3b1c]/40 text-xs text-[#8b7a5a] hover:text-[#c89b3c] rounded-xs">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
          <button className="p-1.5 bg-[#120b04] border border-[#5a3b1c]/40 text-[#8b7a5a] hover:text-[#c89b3c] rounded-xs">
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── MAIN WORKSPACE GRID (2 COLUMNS) ── */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ── LEFT COLUMN: NOTIFICATIONS LIST (7 COLUMNS SPAN) ── */}
        <div className="lg:col-span-7 space-y-3">
          <div
            className="p-4 rounded-sm border shadow-2xl space-y-2 relative min-h-[560px]"
            style={{
              background: 'linear-gradient(150deg, #e8d9b5 0%, #dfcea3 50%, #d4c090 100%)',
              borderColor: '#5a3b1c',
            }}
          >
            {filteredNotifications.map((n) => {
              const isSelected = selectedNotif.id === n.id;

              return (
                <motion.div
                  key={n.id}
                  whileHover={{ scale: 1.01, x: 2 }}
                  onClick={() => {
                    setSelectedNotif(n);
                    setNotifications((prev) =>
                      prev.map((item) => (item.id === n.id ? { ...item, unread: false } : item))
                    );
                  }}
                  className={cn(
                    "p-3.5 rounded-xs border transition-all cursor-pointer flex items-center justify-between gap-4",
                    isSelected ? "bg-[#d4b896] border-[#8b2e2e] shadow-md" : "bg-[#f0e2c5]/80 border-[#5a3b1c]/20 hover:bg-[#e6d3af]"
                  )}
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-xs bg-[#5a3b1c]/20 border border-[#5a3b1c]/40 flex items-center justify-center text-[#5a3b1c] flex-shrink-0">
                      <n.icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-playfair text-xs font-extrabold text-[#2a1505] leading-tight truncate">
                        {n.title}
                      </h3>
                      <p className="font-inter text-[11px] text-[#4a2e14] leading-tight truncate mt-0.5">
                        {n.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-mono text-[9.5px] text-[#5a3b1c]">{n.time}</span>
                    {/* Unread Status Dot */}
                    <div className={cn(
                      "w-2.5 h-2.5 rounded-full",
                      n.unread ? "bg-[#8b2e2e] shadow-[0_0_6px_rgba(139,46,46,0.8)]" : "bg-gray-400/50"
                    )} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-1 text-xs font-mono text-[#8b7a5a]">
            <button className="p-1 border border-[#5a3b1c]/30 rounded-xs hover:text-[#c89b3c]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 bg-[#c89b3c] text-[#1a1008] font-bold rounded-xs">1</span>
            <span className="px-3 py-1 bg-[#1a1208] border border-[#5a3b1c]/30 text-[#8b7a5a] rounded-xs">2</span>
            <button className="p-1 border border-[#5a3b1c]/30 rounded-xs hover:text-[#c89b3c]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── RIGHT COLUMN: DETAILED NOTIFICATION INSPECTOR CARD (5 COLUMNS SPAN) ── */}
        <div className="lg:col-span-5">
          <div
            className="p-6 rounded-sm shadow-2xl border relative flex flex-col justify-between min-h-[580px]"
            style={{
              background: 'linear-gradient(150deg, #e8d9b5 0%, #dfcea3 50%, #d4c090 100%)',
              borderColor: '#5a3b1c',
            }}
          >
            {/* Red Pushpin at Top Center */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#8b2e2e] border-2 border-[#3a0808] shadow-md z-10" />

            {/* UNREAD Rubber Stamp */}
            {selectedNotif.unread && (
              <div className="absolute top-6 right-6 border-2 border-[#8b2e2e] text-[#8b2e2e] px-2 py-0.5 transform rotate-[6deg] pointer-events-none">
                <span className="font-cinzel text-xs font-extrabold tracking-widest uppercase">UNREAD</span>
              </div>
            )}

            <div>
              {/* Illustration Header */}
              <div className="flex justify-center my-2">
                <div className="w-40 h-28 p-1 bg-[#f5e6c8] border border-gray-300 shadow-md rounded-xs">
                  <div className="w-full h-full bg-[#1a0f05] overflow-hidden">
                    <img
                      src={selectedNotif.image || '/vintage_camera.png'}
                      alt=""
                      className="w-full h-full object-cover grayscale contrast-125 sepia-[0.3]"
                    />
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="text-center mb-4">
                <h2 className="font-playfair text-xl font-extrabold text-[#2a1505]">{selectedNotif.title}</h2>
                <p className="font-inter text-xs text-[#4a2e14] mt-1">{selectedNotif.subtitle}</p>
              </div>

              {/* Details List */}
              <div className="space-y-2 text-xs font-inter text-[#3a220f] border-t border-b border-[#5a3b1c]/20 py-3 mb-3">
                {selectedNotif.evidenceId && (
                  <div className="flex justify-between">
                    <span className="text-[#5a3b1c] font-bold text-[10px] uppercase">Evidence ID:</span>
                    <span className="font-mono font-bold text-[#8b2e2e]">{selectedNotif.evidenceId}</span>
                  </div>
                )}
                {selectedNotif.addedBy && (
                  <div className="flex justify-between">
                    <span className="text-[#5a3b1c] font-bold text-[10px] uppercase">Added by:</span>
                    <span className="font-medium">{selectedNotif.addedBy}</span>
                  </div>
                )}
                {selectedNotif.dateTime && (
                  <div className="flex justify-between">
                    <span className="text-[#5a3b1c] font-bold text-[10px] uppercase">Date & Time:</span>
                    <span className="font-mono text-[10px]">{selectedNotif.dateTime}</span>
                  </div>
                )}
                {selectedNotif.caseName && (
                  <div className="flex justify-between">
                    <span className="text-[#5a3b1c] font-bold text-[10px] uppercase">Case:</span>
                    <span className="font-playfair font-bold text-[#2a1505]">{selectedNotif.caseName}</span>
                  </div>
                )}
                {selectedNotif.itemCategory && (
                  <div className="flex justify-between">
                    <span className="text-[#5a3b1c] font-bold text-[10px] uppercase">Category:</span>
                    <span className="font-medium">{selectedNotif.itemCategory}</span>
                  </div>
                )}
                {selectedNotif.location && (
                  <div className="flex justify-between">
                    <span className="text-[#5a3b1c] font-bold text-[10px] uppercase">Location:</span>
                    <span className="font-medium">{selectedNotif.location}</span>
                  </div>
                )}
              </div>

              {/* Full Description */}
              {selectedNotif.fullDescription && (
                <div>
                  <span className="font-inter text-[10px] font-bold text-[#5a3b1c] uppercase tracking-wider block mb-1">Description:</span>
                  <p className="font-inter text-xs text-[#2a1505] leading-relaxed italic">
                    "{selectedNotif.fullDescription}"
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Action Button & Watermark Seal */}
            <div className="pt-4 relative">
              <button
                onClick={() => navigate('/evidence')}
                className="w-full py-3 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest rounded-sm border border-[#5a3b1c] shadow-lg hover:bg-[#28180a] transition-colors flex items-center justify-center gap-2"
              >
                <span>View Evidence</span>
                <ArrowRight className="w-4 h-4 text-[#c89b3c]" />
              </button>

              {/* Official Bureau Seal Watermark */}
              <div className="absolute -top-10 right-2 w-16 h-16 border-2 border-[#5a3b1c]/15 rounded-full flex items-center justify-center pointer-events-none">
                <span className="font-cinzel text-xs font-bold text-[#5a3b1c]/20">DB</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
