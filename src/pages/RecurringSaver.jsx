import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { PiggyBank, TrendingUp, Calendar, DollarSign, AlertCircle, Play, Pause, Edit2, Trash2 } from 'lucide-react';

const RecurringSaver = () => {
  const { user } = useAuth();
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [compoundingValue, setCompoundingValue] = useState(0);

  // Mock savings plan data
  const savingsPlan = user?.savingsPlan || {
    active: false,
    amount: 0,
    frequency: 'monthly',
    asset: 'BTC',
    nextDate: null,
    targetAmount: 0,
    startDate: null
  };

  // Mock savings history
  const savingsHistory = [
    { id: 1, date: '2025-07-01', amount: 50000, asset: 'NGN', purchasedAsset: 'BTC', purchasedAmount: 0.00074, status: 'completed' },
    { id: 2, date: '2025-06-01', amount: 50000, asset: 'NGN', purchasedAsset: 'BTC', purchasedAmount: 0.00078, status: 'completed' },
    { id: 3, date: '2025-05-01', amount: 50000, asset: 'NGN', purchasedAsset: 'BTC', purchasedAmount: 0.00081, status: 'completed' },
    { id: 4, date: '2025-04-01', amount: 50000, asset: 'NGN', purchasedAsset: 'BTC', purchasedAmount: 0.00079, status: 'completed' },
  ];

  // Simulate real-time compounding growth animation
  useEffect(() => {
    const baseValue = 4500; // Base USD value
    const interval = setInterval(() => {
      // Add small random growth to simulate compounding
      setCompoundingValue(prev => {
        const growth = (Math.random() - 0.3) * 0.5; // Slight upward bias
        return baseValue + growth;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const totalInvested = savingsHistory.reduce((sum, item) => sum + item.amount, 0);
  const currentProjectedValue = compoundingValue;
  const totalGain = currentProjectedValue - (totalInvested / 1600); // Convert NGN to USD approx
  const gainPercentage = totalInvested > 0 ? (totalGain / (totalInvested / 1600)) * 100 : 0;

  // Projected growth data for chart (mock)
  const projectedGrowth = [
    { month: 'Month 1', value: 4200 },
    { month: 'Month 3', value: 4350 },
    { month: 'Month 6', value: 4500 },
    { month: 'Month 12', value: 5100 },
    { month: 'Month 24', value: 6200 },
    { month: 'Month 36', value: 7500 },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Compounding Growth Card */}
      <div className="card bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm opacity-90">Projected Growth</p>
          <PiggyBank size={20} className="opacity-75" />
        </div>
        <h2 className="text-4xl font-bold mt-2">
          ${currentProjectedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h2>
        <div className="flex items-center mt-4 space-x-2">
          <TrendingUp size={16} className="text-green-300" />
          <span className="text-sm font-medium text-green-300">
            +{gainPercentage.toFixed(2)}% (${totalGain.toFixed(2)})
          </span>
        </div>
        
        {/* Animated counter */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-xs opacity-75 mb-1">Live Compounding</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-mono font-bold">
              ${currentProjectedValue.toFixed(2)}
            </span>
            <span className="text-xs text-green-300 animate-pulse">↑ growing</span>
          </div>
        </div>
      </div>

      {/* Active Plan Status */}
      {savingsPlan.active ? (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Savings Plan</h3>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              Active
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Investment</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                ₦{savingsPlan.amount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Buying</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{savingsPlan.asset}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Next Purchase</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Calendar size={16} className="mr-1" />
                {savingsPlan.nextDate}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Target Goal</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${savingsPlan.targetAmount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="btn-secondary flex-1 flex items-center justify-center">
              <Pause size={18} className="mr-2" />
              Pause
            </button>
            <button className="btn-secondary flex-1 flex items-center justify-center">
              <Edit2 size={18} className="mr-2" />
              Modify
            </button>
            <button className="bg-red-100 hover:bg-red-200 text-red-700 flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition-colors">
              <Trash2 size={18} className="mr-2" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="card text-center py-8">
          <PiggyBank size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Active Savings Plan</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Set up automated recurring purchases to build your crypto portfolio</p>
          <button 
            onClick={() => setShowSetupModal(true)}
            className="btn-primary inline-flex items-center"
          >
            <Play size={20} className="mr-2" />
            Create Savings Plan
          </button>
        </div>
      )}

      {/* Projected Growth Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Growth Projection</h3>
        <div className="h-48 flex items-end justify-between space-x-2">
          {projectedGrowth.map((point, index) => {
            const maxValue = Math.max(...projectedGrowth.map(p => p.value));
            const height = (point.value / maxValue) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg transition-all duration-500"
                  style={{ height: `${height}%` }}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">{point.month}</p>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">${point.value}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle size={16} className="text-blue-600 mt-0.5" />
            <p className="text-xs text-blue-800 dark:text-blue-200">
              <strong>Projection Disclaimer:</strong> This projection is based on historical performance and assumed compounding rates. Actual results may vary significantly. Cryptocurrency investments are volatile and past performance does not guarantee future returns.
            </p>
          </div>
        </div>
      </div>

      {/* Savings History */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Purchase History</h3>
        <div className="space-y-3">
          {savingsHistory.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.date}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ₦{item.amount.toLocaleString()} → {item.purchasedAmount} {item.purchasedAsset}
                  </p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Setup Modal */}
      {showSetupModal && (
        <SetupSavingsModal 
          onClose={() => setShowSetupModal(false)}
          onSave={(plan) => {
            alert('Savings plan created! Your first automated purchase will occur on the scheduled date.');
            setShowSetupModal(false);
          }}
        />
      )}
    </div>
  );
};

// Setup Savings Plan Modal Component
const SetupSavingsModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    amount: '',
    frequency: 'monthly',
    asset: 'BTC',
    targetAmount: '',
    startDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Create Savings Plan</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">✕</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Investment Amount (NGN)
              </label>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="50000"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Frequency
              </label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                className="input-field"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Asset to Purchase
              </label>
              <select
                value={formData.asset}
                onChange={(e) => setFormData({...formData, asset: e.target.value})}
                className="input-field"
              >
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="USDT">Tether (USDT)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Goal (USD)
              </label>
              <input
                type="number"
                required
                value={formData.targetAmount}
                onChange={(e) => setFormData({...formData, targetAmount: e.target.value})}
                placeholder="10000"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="input-field"
              />
            </div>

            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle size={16} className="text-yellow-600 mt-0.5" />
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  <strong>Risk Disclosure:</strong> Automated purchases do not guarantee profits. Dollar-cost averaging reduces timing risk but does not eliminate market volatility. You may lose money on your investment.
                </p>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full">
              Create Plan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecurringSaver;
