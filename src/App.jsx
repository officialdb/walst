import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import TaskEarner from './pages/TaskEarner';
import CurrencySwapper from './pages/CurrencySwapper';
import RecurringSaver from './pages/RecurringSaver';
import AdminPortal from './pages/AdminPortal';
import Login from './pages/Login';
import './index.css';

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setCurrentView('dashboard')} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <TaskEarner />;
      case 'swap':
        return <CurrencySwapper />;
      case 'savings':
        return <RecurringSaver />;
      case 'admin':
        return <AdminPortal />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container max-w-md mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen shadow-2xl">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main className="p-4">
        {renderView()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
