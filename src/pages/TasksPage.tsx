import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckSquare, Clock, Plus, Filter, List, Calendar, ChevronLeft, 
  ChevronRight, MoreHorizontal, User, ShieldAlert, FileText, Fingerprint, 
  Camera, Car, Package, Users, Check, AlertCircle, X
} from 'lucide-react';
import { cn } from '../lib/utils';

interface TaskItem {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  assignedTo: {
    name: string;
    role: string;
    avatar: string;
  };
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  dueDate: string;
  status: 'IN PROGRESS' | 'COMPLETED' | 'PENDING' | 'NOT STARTED' | 'OVERDUE';
}

const initialTasks: TaskItem[] = [
  {
    id: 'tsk-1',
    title: 'Analyze CCTV footage from Museum',
    subtitle: 'Review all CCTV feeds from 14th-17th March.',
    icon: FileText,
    assignedTo: {
      name: 'Vikram Desai',
      role: 'Forensic Analyst',
      avatar: '/victor_blackwood_card.png',
    },
    priority: 'HIGH',
    dueDate: 'May 20, 2025 - 10:00 AM',
    status: 'IN PROGRESS',
  },
  {
    id: 'tsk-2',
    title: 'Fingerprint Comparison',
    subtitle: 'Match prints from the display case and window.',
    icon: Fingerprint,
    assignedTo: {
      name: 'Kabir Singh',
      role: 'Forensic Expert',
      avatar: '/unknown_suspect_card.png',
    },
    priority: 'HIGH',
    dueDate: 'May 19, 2025 - 05:00 PM',
    status: 'IN PROGRESS',
  },
  {
    id: 'tsk-3',
    title: 'Interview Museum Security Guard',
    subtitle: 'Record statements from on-duty security.',
    icon: Camera,
    assignedTo: {
      name: 'Diya Sharma',
      role: 'Investigator',
      avatar: '/clara_winters_card.png',
    },
    priority: 'MEDIUM',
    dueDate: 'May 18, 2025 - 11:00 AM',
    status: 'COMPLETED',
  },
  {
    id: 'tsk-4',
    title: 'Verify Getaway Vehicle Details',
    subtitle: 'Check vehicle records and ownership.',
    icon: Car,
    assignedTo: {
      name: 'Rohan Malhotra',
      role: 'Field Officer',
      avatar: '/getaway_vehicle.png',
    },
    priority: 'HIGH',
    dueDate: 'May 18, 2025 - 03:00 PM',
    status: 'PENDING',
  },
  {
    id: 'tsk-5',
    title: 'Examine Handwritten Note',
    subtitle: 'Send note to handwriting expert.',
    icon: FileText,
    assignedTo: {
      name: 'Meera Iyer',
      role: 'Forensic Analyst',
      avatar: '/evidence_note.png',
    },
    priority: 'MEDIUM',
    dueDate: 'May 20, 2025 - 02:00 PM',
    status: 'PENDING',
  },
  {
    id: 'tsk-6',
    title: 'Verify Shop Receipt - 17 March',
    subtitle: 'Confirm purchase details and time.',
    icon: FileText,
    assignedTo: {
      name: 'Arjun Rathore',
      role: 'You',
      avatar: '/detective_bg.png',
    },
    priority: 'LOW',
    dueDate: 'May 21, 2025 - 09:00 AM',
    status: 'NOT STARTED',
  },
  {
    id: 'tsk-7',
    title: 'Collect Museum Floor Plan',
    subtitle: 'Obtain updated floor plan and exits.',
    icon: Package,
    assignedTo: {
      name: 'Vikram Desai',
      role: 'Forensic Analyst',
      avatar: '/museum_floorplan_card.png',
    },
    priority: 'LOW',
    dueDate: 'May 22, 2025 - 12:00 PM',
    status: 'NOT STARTED',
  },
  {
    id: 'tsk-8',
    title: 'Cross-check Witness Statements',
    subtitle: 'Compare Clara Winters and James Moriarty.',
    icon: Users,
    assignedTo: {
      name: 'Diya Sharma',
      role: 'Investigator',
      avatar: '/james_moriarty_card.png',
    },
    priority: 'HIGH',
    dueDate: 'May 19, 2025 - 04:00 PM',
    status: 'OVERDUE',
  },
];

export function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [activeTab, setActiveTab] = useState<'All' | 'My Tasks' | 'Assigned By Me' | 'Completed' | 'Overdue'>('All');
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);

  const filteredTasks = tasks.filter((t) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'My Tasks') return t.assignedTo.name === 'Arjun Rathore';
    if (activeTab === 'Completed') return t.status === 'COMPLETED';
    if (activeTab === 'Overdue') return t.status === 'OVERDUE';
    return true;
  });

  return (
    <div className="min-h-full p-6 pb-20 relative overflow-x-hidden font-inter select-none" style={{ background: 'linear-gradient(180deg, #14110f 0%, #0d0a08 100%)' }}>
      
      {/* ── HEADER ── */}
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
        <div>
          <h1 className="font-playfair text-3xl text-[#f5e6c8] font-bold tracking-tight">TASKS</h1>
          <p className="font-inter text-xs text-[#8b7a5a] mt-0.5">Manage and track all investigation tasks and assignments.</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Case Tag */}
          <div className="px-4 py-2 bg-[#d4b896] border border-[#5a3b1c] rounded-xs shadow-md flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#8b2e2e]">CASE #47-A7</span>
            <span className="font-playfair text-xs font-bold text-[#2a1505]">The Blackwood Heist</span>
          </div>

          <button
            onClick={() => setNewTaskModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest rounded-xs border border-[#5a3b1c] shadow-lg hover:bg-[#28180a] transition-colors"
          >
            <Plus className="w-4 h-4 text-[#c89b3c]" />
            <span>+ New Task</span>
          </button>
        </div>
      </div>

      {/* ── FILTER TABS BAR ── */}
      <div className="max-w-[1440px] mx-auto p-3 bg-[#1a1208] border border-[#5a3b1c]/30 rounded-sm flex items-center justify-between shadow-md mb-5">
        <div className="flex items-center gap-2">
          {/* All Tasks */}
          <button
            onClick={() => setActiveTab('All')}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-xs flex items-center gap-2 transition-colors",
              activeTab === 'All' ? "bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c]" : "text-[#8b7a5a] hover:text-[#c89b3c]"
            )}
          >
            <span>All Tasks</span>
            <span className="w-4 h-4 rounded-full bg-[#8b2e2e] text-[#f5e6c8] text-[9px] flex items-center justify-center font-mono">
              24
            </span>
          </button>

          {/* My Tasks */}
          <button
            onClick={() => setActiveTab('My Tasks')}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-xs flex items-center gap-2 transition-colors",
              activeTab === 'My Tasks' ? "bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c]" : "text-[#8b7a5a] hover:text-[#c89b3c]"
            )}
          >
            <span>My Tasks</span>
            <span className="w-4 h-4 rounded-full bg-[#8b2e2e] text-[#f5e6c8] text-[9px] flex items-center justify-center font-mono">
              8
            </span>
          </button>

          {/* Assigned By Me */}
          <button
            onClick={() => setActiveTab('Assigned By Me')}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-xs flex items-center gap-2 transition-colors",
              activeTab === 'Assigned By Me' ? "bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c]" : "text-[#8b7a5a] hover:text-[#c89b3c]"
            )}
          >
            <span>Assigned By Me</span>
            <span className="w-4 h-4 rounded-full bg-[#5a3b1c] text-[#f5e6c8] text-[9px] flex items-center justify-center font-mono">
              6
            </span>
          </button>

          {/* Completed */}
          <button
            onClick={() => setActiveTab('Completed')}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-xs flex items-center gap-2 transition-colors",
              activeTab === 'Completed' ? "bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c]" : "text-[#8b7a5a] hover:text-[#c89b3c]"
            )}
          >
            <span>Completed</span>
            <span className="w-4 h-4 rounded-full bg-[#3B5323] text-[#f5e6c8] text-[9px] flex items-center justify-center font-mono">
              10
            </span>
          </button>

          {/* Overdue */}
          <button
            onClick={() => setActiveTab('Overdue')}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-xs flex items-center gap-2 transition-colors",
              activeTab === 'Overdue' ? "bg-[#3d2612] text-[#e8d9b5] border border-[#5a3b1c]" : "text-[#8b7a5a] hover:text-[#c89b3c]"
            )}
          >
            <span>Overdue</span>
            <span className="w-4 h-4 rounded-full bg-[#8b2e2e] text-[#f5e6c8] text-[9px] flex items-center justify-center font-mono">
              4
            </span>
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

        {/* ── LEFT COLUMN: TASKS TABLE (8 COLUMNS SPAN) ── */}
        <div className="lg:col-span-8 space-y-3">
          <div
            className="p-4 rounded-sm border shadow-2xl overflow-x-auto relative"
            style={{
              background: 'linear-gradient(150deg, #e8d9b5 0%, #dfcea3 50%, #d4c090 100%)',
              borderColor: '#5a3b1c',
            }}
          >
            <table className="w-full text-left font-inter text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#5a3b1c]/30 text-[10px] font-bold text-[#5a3b1c] uppercase tracking-wider">
                  <th className="py-2 px-3">TASK</th>
                  <th className="py-2 px-3">ASSIGNED TO</th>
                  <th className="py-2 px-3">PRIORITY</th>
                  <th className="py-2 px-3">DUE DATE</th>
                  <th className="py-2 px-3">STATUS</th>
                  <th className="py-2 px-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#5a3b1c]/15">
                {filteredTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-[#d4b896]/40 transition-colors">
                    
                    {/* Task Title + Subtitle */}
                    <td className="py-3 px-3">
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-xs bg-[#5a3b1c]/20 border border-[#5a3b1c]/40 flex items-center justify-center text-[#5a3b1c] flex-shrink-0 mt-0.5">
                          <t.icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="font-playfair text-xs font-extrabold text-[#2a1505] leading-tight">{t.title}</h4>
                          <p className="font-inter text-[10.5px] text-[#4a2e14] leading-tight mt-0.5">{t.subtitle}</p>
                        </div>
                      </div>
                    </td>

                    {/* Assigned Officer */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <img src={t.assignedTo.avatar} alt={t.assignedTo.name} className="w-6 h-6 rounded-full object-cover border border-[#5a3b1c]" />
                        <div>
                          <p className="font-bold text-[#2a1505] text-xs leading-none">{t.assignedTo.name}</p>
                          <p className="text-[9.5px] text-[#5a3b1c] leading-tight">{t.assignedTo.role}</p>
                        </div>
                      </div>
                    </td>

                    {/* Priority Badge */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={cn(
                        "px-2 py-0.5 text-[8.5px] font-mono font-extrabold border rounded-xs uppercase tracking-wider",
                        t.priority === 'HIGH' ? "border-[#8b2e2e] text-[#8b2e2e] bg-red-900/10" :
                        t.priority === 'MEDIUM' ? "border-amber-800 text-amber-800 bg-amber-500/10" :
                        "border-emerald-800 text-emerald-800 bg-emerald-500/10"
                      )}>
                        {t.priority}
                      </span>
                    </td>

                    {/* Due Date */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-[10.5px] text-[#3a220f]">
                        <Calendar className="w-3.5 h-3.5 text-[#5a3b1c]" />
                        <span className="font-mono">{t.dueDate}</span>
                      </div>
                    </td>

                    {/* Status Badge Tag */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={cn(
                        "px-2 py-0.5 text-[8.5px] font-inter font-extrabold border rounded-xs uppercase tracking-wider",
                        t.status === 'IN PROGRESS' ? "border-amber-800 text-amber-800 bg-amber-500/10" :
                        t.status === 'COMPLETED' ? "border-emerald-800 text-emerald-800 bg-emerald-500/10" :
                        t.status === 'OVERDUE' ? "border-red-900 text-red-900 bg-red-900/15" :
                        "border-gray-700 text-gray-800 bg-gray-500/10"
                      )}>
                        {t.status}
                      </span>
                    </td>

                    <td className="py-3 px-2 text-right">
                      <button className="text-[#5a3b1c]/60 hover:text-black">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center text-xs font-mono text-[#8b7a5a] pt-2">
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 border border-[#5a3b1c]/30 cursor-pointer">‹</span>
              <span className="px-2.5 py-0.5 bg-[#c89b3c] text-[#1a1008] font-bold">1</span>
              <span className="px-2.5 py-0.5 bg-[#1a1208] border border-[#5a3b1c]/30 cursor-pointer">2</span>
              <span className="px-2.5 py-0.5 bg-[#1a1208] border border-[#5a3b1c]/30 cursor-pointer">3</span>
              <span className="px-1 text-[#8b7a5a]">...</span>
              <span className="px-2.5 py-0.5 bg-[#1a1208] border border-[#5a3b1c]/30 cursor-pointer">6</span>
              <span className="px-2 py-0.5 border border-[#5a3b1c]/30 cursor-pointer">›</span>
            </div>

            <span>Showing 1 to 8 of 24 tasks</span>
          </div>
        </div>

        {/* ── RIGHT COLUMN: 3 STACKED CARDS (4 COLUMNS SPAN) ── */}
        <div className="lg:col-span-4 space-y-5">

          {/* CARD 1: TASK OVERVIEW */}
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
              TASK OVERVIEW
            </p>

            <div className="flex items-center gap-4 my-3">
              {/* Donut Chart SVG */}
              <div className="w-24 h-24 relative flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#5a3b1c" strokeWidth="4" strokeDasharray="41.7 100" />
                  <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#c89b3c" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-41.7" />
                  <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#3a220f" strokeWidth="4" strokeDasharray="16.7 100" strokeDashoffset="-66.7" />
                  <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#8b2e2e" strokeWidth="4" strokeDasharray="16.7 100" strokeDashoffset="-83.4" />
                </svg>
              </div>

              {/* Legend Percentages */}
              <div className="space-y-1 text-[11px] font-inter text-[#3a220f]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#5a3b1c]" />
                  <span>Completed: <strong className="font-mono">10 (41.7%)</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c89b3c]" />
                  <span>In Progress: <strong className="font-mono">6 (25.0%)</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#3a220f]" />
                  <span>Pending: <strong className="font-mono">4 (16.7%)</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gray-600" />
                  <span>Not Started: <strong className="font-mono">2 (8.3%)</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8b2e2e]" />
                  <span>Overdue: <strong className="font-mono">4 (16.7%)</strong></span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-[#5a3b1c]/20 pt-2 text-xs font-inter font-bold text-[#2a1505]">
              <span>Total Tasks</span>
              <span className="font-mono text-sm">24</span>
            </div>
          </div>

          {/* CARD 2: UPCOMING DEADLINES */}
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
              UPCOMING DEADLINES
            </p>

            <div className="space-y-3 font-inter text-xs">
              {[
                { time: 'May 18, 2025 - 11:00 AM', task: 'Interview Museum Security Guard', officer: 'Diya Sharma' },
                { time: 'May 18, 2025 - 03:00 PM', task: 'Verify Getaway Vehicle Details', officer: 'Rohan Malhotra' },
                { time: 'May 19, 2025 - 05:00 PM', task: 'Fingerprint Comparison', officer: 'Kabir Singh' },
                { time: 'May 20, 2025 - 10:00 AM', task: 'Analyze CCTV footage from Museum', officer: 'Vikram Desai' },
              ].map((d, idx) => (
                <div key={idx} className="border-b border-[#5a3b1c]/15 pb-2 last:border-0 last:pb-0">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8b2e2e] font-bold">
                    <Calendar className="w-3 h-3" />
                    <span>{d.time}</span>
                  </div>
                  <p className="font-bold text-[#2a1505] text-xs leading-tight mt-0.5">{d.task}</p>
                  <p className="text-[10px] text-[#5a3b1c]">{d.officer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 3: QUICK ACTIONS */}
          <div
            className="p-5 rounded-sm shadow-2xl border relative"
            style={{
              background: 'linear-gradient(150deg, #e8d9b5 0%, #dfcea3 50%, #d4c090 100%)',
              borderColor: '#5a3b1c',
            }}
          >
            {/* Paper Clip */}
            <div className="absolute top-2 right-3 w-5 h-8 border-2 border-gray-400 rounded-full rotate-45 opacity-60 pointer-events-none" />

            <p className="font-cinzel text-xs font-bold text-[#2a1505] tracking-widest border-b border-[#5a3b1c]/30 pb-1 mb-3">
              QUICK ACTIONS
            </p>

            <div className="space-y-2 font-inter text-xs">
              <button
                onClick={() => setNewTaskModalOpen(true)}
                className="w-full p-2 rounded-xs bg-[#5a3b1c]/10 border border-[#5a3b1c]/20 hover:bg-[#5a3b1c]/20 font-bold text-[#2a1505] flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-[#8b2e2e]" />
                <span>Create New Task</span>
              </button>

              <button
                onClick={() => setActiveTab('My Tasks')}
                className="w-full p-2 rounded-xs bg-[#5a3b1c]/10 border border-[#5a3b1c]/20 hover:bg-[#5a3b1c]/20 font-bold text-[#2a1505] flex items-center gap-2"
              >
                <User className="w-4 h-4 text-[#8b2e2e]" />
                <span>View My Tasks</span>
              </button>

              <button
                onClick={() => setActiveTab('Overdue')}
                className="w-full p-2 rounded-xs bg-[#5a3b1c]/10 border border-[#5a3b1c]/20 hover:bg-[#5a3b1c]/20 font-bold text-[#2a1505] flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-[#8b2e2e]" />
                <span>View Overdue Tasks</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ── NEW TASK MODAL ── */}
      <AnimatePresence>
        {newTaskModalOpen && (
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
                onClick={() => setNewTaskModalOpen(false)}
                className="absolute top-4 right-4 text-[#5a3b1c] hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-cinzel text-xl font-bold text-[#2a1505] mb-4">Create New Task</h3>

              <div className="space-y-4 font-inter text-xs">
                <div>
                  <label className="block font-bold text-[#5a3b1c] uppercase mb-1">Task Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Interview Museum Security Guard"
                    className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#5a3b1c] uppercase mb-1">Assigned Officer</label>
                  <select className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] font-bold focus:outline-none">
                    <option>Vikram Desai (Forensic Analyst)</option>
                    <option>Kabir Singh (Forensic Expert)</option>
                    <option>Diya Sharma (Investigator)</option>
                    <option>Rohan Malhotra (Field Officer)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#5a3b1c] uppercase mb-1">Priority</label>
                  <select className="w-full bg-[#f5e6c8] border border-[#5a3b1c] p-2 text-xs text-[#2a1505] font-bold focus:outline-none">
                    <option>HIGH</option>
                    <option>MEDIUM</option>
                    <option>LOW</option>
                  </select>
                </div>

                <button
                  onClick={() => setNewTaskModalOpen(false)}
                  className="w-full py-3 bg-[#3d2612] text-[#e8d9b5] font-cinzel font-bold text-xs uppercase tracking-widest border border-[#5a3b1c] shadow-lg hover:bg-[#28180a] transition-colors mt-2"
                >
                  Create & Assign Task
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
