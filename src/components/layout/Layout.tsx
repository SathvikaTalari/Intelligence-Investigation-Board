import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function Layout() {
  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{ background: '#14110f' }}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#5a3b1c #1a1208' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
