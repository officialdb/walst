import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [cryptoPrices, setCryptoPrices] = useState({
    BTC: { price: 67500, change: 2.5 },
    ETH: { price: 3800, change: -1.2 },
    USDT: { price: 1.00, change: 0.01 }
  });

  // Simulate real-time price updates via WebSocket
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoPrices(prev => ({
        BTC: { 
          price: prev.BTC.price * (1 + (Math.random() - 0.5) * 0.002),
          change: prev.BTC.change + (Math.random() - 0.5) * 0.1
        },
        ETH: { 
          price: prev.ETH.price * (1 + (Math.random() - 0.5) * 0.003),
          change: prev.ETH.change + (Math.random() - 0.5) * 0.15
        },
        USDT: { 
          price: 1.00,
          change: 0.01
        }
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const totalBalanceUSD = Object.entries(user?.balances || {}).reduce((total, [asset, amount]) => {
    if (asset === 'NGN') {
      return total + (amount / 1600); // Approximate NGN to USD
    }
    const price = cryptoPrices[asset]?.price || 0;
    return total + (amount * price);
  }, 0);

  const recentTransactions = [
    { id: 1, type: 'deposit', asset: 'NGN', amount: 50000, status: 'completed', date: '2025-07-15' },
    { id: 2, type: 'swap', asset: 'BTC', amount: 0.005, status: 'completed', date: '2025-07-14' },
    { id: 3, type: 'task_reward', asset: 'USDT', amount: 25, status: 'completed', date: '2025-07-13' },
    { id: 4, type: 'savings', asset: 'ETH', amount: 0.1, status: 'pending', date: '2025-07-12' },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Total Balance Card */}
      <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <p className="text-sm opacity-90">Total Balance (USD)</p>
        <h2 className="text-4xl font-bold mt-2">
          ${totalBalanceUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h2>
        <div className="flex items-center mt-4 space-x-4">
          <div className="flex items-center text-green-300">
            <TrendingUp size={16} className="mr-1" />
            <span className="text-sm font-medium">+2.5% today</span>
          </div>
        </div>
      </div>

      {/* Asset Balances */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Assets</h3>
        <div className="space-y-3">
          {Object.entries(user?.balances || {}).map(([asset, amount]) => (
            <div key={asset} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  asset === 'BTC' ? 'bg-orange-100 text-orange-600' :
                  asset === 'ETH' ? 'bg-blue-100 text-blue-600' :
                  asset === 'USDT' ? 'bg-green-100 text-green-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  <span className="font-bold text-sm">{asset.slice(0, 3)}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{asset}</p>
                  {cryptoPrices[asset] && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ${cryptoPrices[asset].price.toLocaleString()} 
                      <span className={`ml-1 ${cryptoPrices[asset].change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {cryptoPrices[asset].change >= 0 ? '+' : ''}{cryptoPrices[asset].change.toFixed(2)}%
                      </span>
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-white">{amount.toLocaleString()}</p>
                {asset !== 'NGN' && cryptoPrices[asset] && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ≈ ${(amount * cryptoPrices[asset].price).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'deposit' ? 'bg-green-100 text-green-600' :
                  tx.type === 'swap' ? 'bg-blue-100 text-blue-600' :
                  tx.type === 'task_reward' ? 'bg-purple-100 text-purple-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {tx.type === 'deposit' ? <ArrowDownRight size={20} /> :
                   tx.type === 'swap' ? <TrendingUp size={20} /> :
                   tx.type === 'task_reward' ? <CheckCircle size={20} /> :
                   <Clock size={20} />}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                    {tx.type.replace('_', ' ')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${tx.type === 'deposit' || tx.type === 'task_reward' ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                  {tx.type === 'deposit' || tx.type === 'task_reward' ? '+' : '-'}{tx.amount} {tx.asset}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  tx.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="card flex flex-col items-center justify-center py-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <ArrowUpRight size={24} className="text-primary-600 mb-2" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">Send</span>
        </button>
        <button className="card flex flex-col items-center justify-center py-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <ArrowDownRight size={24} className="text-green-600 mb-2" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">Receive</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
