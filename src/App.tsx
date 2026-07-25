import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { InvestigationBoard } from './pages/InvestigationBoard';
import { Cases } from './pages/Cases';
import { Login } from './pages/Login';
import { Landing } from './pages/Landing';
import { MapPage } from './pages/MapPage';
import { TimelinePage } from './pages/TimelinePage';
import { ReportsPage } from './pages/ReportsPage';
import { EvidencePage } from './pages/EvidencePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { TasksPage } from './pages/TasksPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/board" element={<InvestigationBoard />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/maps" element={<MapPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          {/* Add other routes here */}
          <Route path="*" element={<div className="p-8 text-txt-muted font-mono">CLASSIFIED: THIS SECTION IS CURRENTLY UNDER CONSTRUCTION.</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
