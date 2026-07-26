import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{ background: '#14110f' }}
    >
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <TopBar setMobileMenuOpen={setMobileMenuOpen} />
        <main className="flex-1 overflow-auto relative z-0" style={{ scrollbarWidth: 'thin', scrollbarColor: '#5a3b1c #1a1208' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
