import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

const navItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    label: 'Cases',
    path: '/cases',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path d="M3 7h18M3 12h18M3 17h12"/>
      </svg>
    ),
  },
  {
    label: 'Investigation Board',
    path: '/board',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/>
        <path d="M8 6h8M7 7l4 10M17 7l-4 10"/>
      </svg>
    ),
  },
  {
    label: 'Evidence',
    path: '/evidence',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
  },
  {
    label: 'Timeline',
    path: '/timeline',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    label: 'Maps',
    path: '/maps',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
        <line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
      </svg>
    ),
  },
  {
    label: 'Documents',
    path: '/documents',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    label: 'Tasks',
    path: '/tasks',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
  },
  {
    label: 'Reports',
    path: '/reports',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
      </svg>
    ),
  },
];

export function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (open: boolean) => void }) {
  return (
    <aside
      className={cn(
        "w-[240px] md:w-[200px] h-screen flex flex-col fixed md:relative z-50 flex-shrink-0 transition-transform duration-300 ease-in-out",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
      style={{
        background: 'linear-gradient(180deg, #1a1208 0%, #150f08 50%, #120d06 100%)',
        borderRight: '1px solid rgba(90,59,28,0.3)',
        boxShadow: '4px 0 30px rgba(0,0,0,0.7)',
      }}
    >
      {/* Leather texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* Gold left edge accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ background: 'linear-gradient(180deg, transparent, rgba(200,155,60,0.3), transparent)' }} />

      {/* === LOGO === */}
      <div
        className="px-4 py-4 flex items-center gap-3 relative z-10"
        style={{ borderBottom: '1px solid rgba(90,59,28,0.3)' }}
      >
        {/* Shield icon */}
        <div className="flex-shrink-0 w-12 h-14 relative flex items-center justify-center">
          <div
            className="w-full h-full"
            style={{
              clipPath: 'polygon(50% 0%, 100% 18%, 100% 65%, 50% 100%, 0% 65%, 0% 18%)',
              background: 'linear-gradient(180deg, #c89b3c 0%, #8b6a20 50%, #5a3b1c 100%)',
            }}
          />
          <div
            className="absolute inset-[3px] flex items-center justify-center"
            style={{ clipPath: 'polygon(50% 0%, 100% 18%, 100% 65%, 50% 100%, 0% 65%, 0% 18%)', background: '#1a1008' }}
          >
            <span className="font-cinzel text-[#c89b3c] text-xs font-bold">DB</span>
          </div>
        </div>

        <div>
          <p className="font-cinzel text-[#c89b3c]/60 text-[7px] tracking-[0.2em] uppercase">THE</p>
          <h1 className="font-cinzel text-[#c89b3c] text-[15px] font-bold leading-tight tracking-wider uppercase">
            DETECTIVE<br />BUREAU
          </h1>
          <p className="font-inter text-[#8b6a3c]/60 text-[7px] tracking-[0.15em] uppercase mt-0.5">
            TRUTH. EVIDENCE. JUSTICE.
          </p>
        </div>
      </div>

      {/* === NAV === */}
      <nav className="flex-1 overflow-y-auto py-2 relative z-10" style={{ scrollbarWidth: 'none' }}>
        {navItems.map((item, idx) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => cn(
              'flex items-center gap-3 px-4 py-2.5 text-sm font-inter transition-all duration-300 relative group overflow-hidden',
              isActive
                ? 'text-[#c89b3c]'
                : 'text-[#8b7a5a] hover:text-[#c89b3c] hover:bg-[#c89b3c]/5'
            )}
          >
            {({ isActive }) => (
              <>
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: 'linear-gradient(180deg, transparent, #c89b3c, transparent)' }} />
                )}
                {isActive && (
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(90deg, rgba(200,155,60,0.1) 0%, transparent 100%)' }}
                  />
                )}
                <span className={cn('relative z-10 flex-shrink-0', isActive ? 'text-[#c89b3c]' : 'text-[#5a4a2c] group-hover:text-[#c89b3c]')}>
                  {item.icon}
                </span>
                <span className="relative z-10 text-[13px]">{item.label}</span>
                {isActive && (
                  <svg className="ml-auto relative z-10 w-3 h-3 text-[#c89b3c]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Divider */}
        <div className="mx-4 my-2 border-t" style={{ borderColor: 'rgba(90,59,28,0.2)' }} />

        {/* Notifications */}
        <NavLink
          to="/notifications"
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) => cn('flex items-center gap-3 px-4 py-2.5 text-sm font-inter transition-all duration-300 hover:bg-[#c89b3c]/5', isActive ? 'text-[#c89b3c]' : 'text-[#8b7a5a] hover:text-[#c89b3c]')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0 text-[#5a4a2c]">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <span className="text-[13px]">Notifications</span>
          <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: '#8b2e2e' }}>
            12
          </div>
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/settings"
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) => cn('flex items-center gap-3 px-4 py-2.5 text-sm font-inter transition-all duration-300 hover:bg-[#c89b3c]/5', isActive ? 'text-[#c89b3c]' : 'text-[#8b7a5a] hover:text-[#c89b3c]')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0 text-[#5a4a2c]">
            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
          <span className="text-[13px]">Settings</span>
        </NavLink>
      </nav>

      {/* === ACTIVE CASE === */}
      <div className="relative z-10 p-3" style={{ borderTop: '1px solid rgba(90,59,28,0.3)' }}>
        <p className="text-[9px] font-mono text-[#8b7a5a] uppercase tracking-[0.2em] mb-1.5">Active Case</p>
        <div className="flex items-center gap-2">
          {/* Case folder icon */}
          <div className="w-8 h-10 flex-shrink-0 flex items-center justify-center" style={{ background: '#2a1a08', border: '1px solid rgba(200,155,60,0.2)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#c89b3c" strokeWidth="1.5" className="w-4 h-4">
              <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-[#c89b3c] font-playfair truncate">The Blackwood Heist</p>
            <p className="text-[10px] font-mono text-[#8b7a5a]">Case #47-A7</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-1 bg-[#2a1a08] rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: '68%', background: 'linear-gradient(90deg, #c89b3c, #8b6a20)' }} />
          </div>
          <span className="text-[10px] font-mono text-[#8b7a5a]">68%</span>
        </div>
      </div>

      {/* === LOGOUT / LOCK DESK BUTTON === */}
      <div className="relative z-10 p-2 text-center" style={{ borderTop: '1px solid rgba(90,59,28,0.2)' }}>
        <NavLink
          to="/login"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-[#8b2e2e]/20 hover:bg-[#8b2e2e]/40 border border-[#8b2e2e]/50 text-[#f5e6c8] text-xs font-cinzel font-bold uppercase tracking-wider rounded-xs transition-colors mb-2"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-[#8b2e2e]">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span>LOCK DESK</span>
        </NavLink>

        <div
          className="inline-block px-4 py-1 border-2 transform -rotate-1 opacity-80"
          style={{ borderColor: '#8b2e2e', color: '#8b2e2e' }}
        >
          <span className="font-cinzel text-[10px] font-bold tracking-[0.2em] uppercase">Confidential</span>
        </div>
      </div>
    </aside>
  );
}
