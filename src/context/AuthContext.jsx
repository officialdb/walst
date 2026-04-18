import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data for prototype
  const mockUsers = {
    earner: {
      id: '1',
      email: 'earner@wstrt.com',
      name: 'Task Earner',
      roles: ['earner'],
      kycStatus: 'verified',
      balances: {
        NGN: 50000,
        BTC: 0.0025,
        ETH: 0.15,
        USDT: 250
      }
    },
    swapper: {
      id: '2',
      email: 'swapper@wstrt.com',
      name: 'Currency Swapper',
      roles: ['swapper'],
      kycStatus: 'verified',
      balances: {
        NGN: 150000,
        BTC: 0.05,
        ETH: 1.2,
        USDT: 5000
      }
    },
    saver: {
      id: '3',
      email: 'saver@wstrt.com',
      name: 'Recurring Saver',
      roles: ['saver'],
      kycStatus: 'verified',
      balances: {
        NGN: 200000,
        BTC: 0.1,
        ETH: 2.5,
        USDT: 10000
      },
      savingsPlan: {
        active: true,
        amount: 50000,
        frequency: 'monthly',
        asset: 'BTC',
        nextDate: '2025-08-01'
      }
    },
    admin: {
      id: '4',
      email: 'admin@wstrt.com',
      name: 'Administrator',
      roles: ['admin'],
      kycStatus: 'verified',
      balances: {
        NGN: 500000,
        BTC: 0.5,
        ETH: 5.0,
        USDT: 25000
      }
    },
    multi: {
      id: '5',
      email: 'multi@wstrt.com',
      name: 'Multi Role User',
      roles: ['earner', 'swapper', 'saver'],
      kycStatus: 'verified',
      balances: {
        NGN: 100000,
        BTC: 0.08,
        ETH: 1.8,
        USDT: 7500
      },
      savingsPlan: {
        active: true,
        amount: 30000,
        frequency: 'quarterly',
        asset: 'ETH',
        nextDate: '2025-09-01'
      }
    }
  };

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('wstrt_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email) => {
    const userKey = Object.keys(mockUsers).find(key => 
      mockUsers[key].email === email.toLowerCase()
    );
    
    if (userKey) {
      const userData = mockUsers[userKey];
      setUser(userData);
      localStorage.setItem('wstrt_user', JSON.stringify(userData));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wstrt_user');
  };

  const hasRole = (role) => {
    return user?.roles?.includes(role) || false;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasRole,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
