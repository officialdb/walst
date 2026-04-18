import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Wallet, TrendingUp, PiggyBank, Shield, LogOut, User, Bell } from 'lucide-react';

const Navigation = ({ currentView, onViewChange }) => {
  const { user, hasRole, logout } = useAuth();

  const getNavItems = () => {
    const items = [];

    if (hasRole('earner')) {
      items.push({
        id: 'tasks',
        label: 'Tasks',
        icon: Wallet,
        color: 'text-green-600'
      });
    }

    if (hasRole('swapper')) {
      items.push({
        id: 'swap',
        label: 'Swap',
        icon: TrendingUp,
        color: 'text-blue-600'
      });
    }

    if (hasRole('saver')) {
      items.push({
        id: 'savings',
        label: 'Savings',
        icon: PiggyBank,
        color: 'text-purple-600'
      });
    }

    if (hasRole('admin')) {
      items.push({
        id: 'admin',
        label: 'Admin',
        icon: Shield,
        color: 'text-red-600'
      });
    }

    // Dashboard is always available
    items.unshift({
      id: 'dashboard',
      label: 'Dashboard',
      icon: Wallet,
      color: 'text-primary-600'
    });

    return items;
  };

  const navItems = getNavItems();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg">
      {/* Top Bar */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Wstrt</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <Bell size={20} />
            </button>
            <button 
              onClick={logout}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Role Badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          {user?.roles.map((role) => (
            <span key={role} className={`role-badge role-${role}`}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary-50 dark:bg-primary-900/20' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Icon 
                size={20} 
                className={`${isActive ? item.color : 'text-gray-500 dark:text-gray-400'}`} 
              />
              <span className={`text-xs mt-1 ${
                isActive 
                  ? 'text-primary-600 dark:text-primary-400 font-medium' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Navigation;
