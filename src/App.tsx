import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Evaluation from './pages/Evaluation';
import Attendance from './pages/Attendance';
import AIStudio from './pages/AIStudio';
import Reports from './pages/Reports';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import StudentDetail from './pages/StudentDetail';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="students/:id" element={<StudentDetail />} />
            <Route path="evaluation" element={<Evaluation />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="ai-studio" element={<AIStudio />} />
            <Route path="reports" element={<Reports />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
