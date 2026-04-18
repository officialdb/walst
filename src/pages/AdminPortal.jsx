import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, DollarSign, AlertTriangle, CheckCircle, Clock, Search, Filter, Download } from 'lucide-react';

const AdminPortal = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('transactions');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock pending transactions for approval
  const pendingTransactions = [
    { id: 'TXN-001', user: 'john@example.com', type: 'withdrawal', amount: 5000, asset: 'USDT', date: '2025-07-15', status: 'pending', reason: 'High value withdrawal' },
    { id: 'TXN-002', user: 'sarah@example.com', type: 'deposit', amount: 15000, asset: 'NGN', date: '2025-07-15', status: 'pending', reason: 'AML flag - manual review' },
    { id: 'TXN-003', user: 'mike@example.com', type: 'swap', amount: 2.5, asset: 'ETH', date: '2025-07-14', status: 'pending', reason: 'Unusual pattern detected' },
  ];

  // Mock users
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', roles: ['earner', 'swapper'], kycStatus: 'verified', joinedDate: '2025-06-01', status: 'active' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', roles: ['saver'], kycStatus: 'pending', joinedDate: '2025-07-10', status: 'active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', roles: ['earner', 'swapper', 'saver'], kycStatus: 'verified', joinedDate: '2025-05-15', status: 'suspended' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', roles: ['earner'], kycStatus: 'rejected', joinedDate: '2025-07-12', status: 'restricted' },
  ];

  // Mock system stats
  const systemStats = {
    totalUsers: 1247,
    activeUsers: 892,
    pendingKYC: 45,
    flaggedTransactions: 12,
    platformVolume24h: 458000,
    apiHealth: 'healthy',
    websocketConnections: 1523
  };

  const handleApprove = (txnId) => {
    alert(`Transaction ${txnId} approved. Funds will be processed within 24 hours.`);
  };

  const handleReject = (txnId) => {
    alert(`Transaction ${txnId} rejected. User has been notified.`);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="card bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Shield size={32} />
            <div>
              <h2 className="text-2xl font-bold">Admin Portal</h2>
              <p className="text-sm opacity-75">Compliance & System Management</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
            {user?.email}
          </span>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-xs opacity-75">Total Users</p>
            <p className="text-xl font-bold">{systemStats.totalUsers}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-xs opacity-75">Active Now</p>
            <p className="text-xl font-bold">{systemStats.activeUsers}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-xs opacity-75">Pending KYC</p>
            <p className="text-xl font-bold">{systemStats.pendingKYC}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-xs opacity-75">Flagged Txns</p>
            <p className="text-xl font-bold">{systemStats.flaggedTransactions}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 overflow-x-auto">
        {[
          { id: 'transactions', label: 'Transactions', icon: DollarSign },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'compliance', label: 'Compliance', icon: AlertTriangle },
          { id: 'system', label: 'System', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Icon size={18} className="mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div className="space-y-6">
          {/* Pending Approvals */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Clock size={20} className="mr-2 text-yellow-600" />
                Pending Approvals
              </h3>
              <button className="btn-secondary text-sm flex items-center">
                <Download size={16} className="mr-2" />
                Export
              </button>
            </div>
            <div className="space-y-3">
              {pendingTransactions.map((txn) => (
                <div key={txn.id} className="border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">{txn.id}</span>
                        <span className="px-2 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded text-xs font-medium">
                          {txn.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">User: {txn.user}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">Type: {txn.type} | Amount: {txn.amount} {txn.asset}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                        <AlertTriangle size={12} className="inline mr-1" />
                        Reason: {txn.reason}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button 
                        onClick={() => handleApprove(txn.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(txn.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10 w-64"
                  />
                </div>
                <button className="btn-secondary">
                  <Filter size={18} />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">User</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'TXN-100', user: 'alice@example.com', type: 'deposit', amount: '10,000 NGN', status: 'completed', date: '2025-07-15' },
                    { id: 'TXN-099', user: 'bob@example.com', type: 'withdrawal', amount: '500 USDT', status: 'completed', date: '2025-07-15' },
                    { id: 'TXN-098', user: 'carol@example.com', type: 'swap', amount: '0.5 ETH', status: 'completed', date: '2025-07-14' },
                  ].map((txn) => (
                    <tr key={txn.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <td className="py-3 px-4 text-sm font-mono text-gray-900 dark:text-white">{txn.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{txn.user}</td>
                      <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300 capitalize">{txn.type}</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">{txn.amount}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {txn.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{txn.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h3>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="input-field pl-10 w-64"
              />
            </div>
          </div>
          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary-600 dark:text-primary-400">{u.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{u.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{u.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {u.roles.map(role => (
                          <span key={role} className={`role-badge role-${role}`}>{role}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      u.kycStatus === 'verified' ? 'bg-green-100 text-green-800' :
                      u.kycStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      KYC: {u.kycStatus}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Joined: {u.joinedDate}</p>
                    <div className="flex space-x-2 mt-2">
                      <button className="text-primary-600 hover:text-primary-700 text-xs font-medium">View</button>
                      <button className="text-red-600 hover:text-red-700 text-xs font-medium">
                        {u.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compliance Tab */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AML Monitoring</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">High-Risk Transactions</span>
                  <AlertTriangle size={20} className="text-red-600" />
                </div>
                <p className="text-2xl font-bold text-red-600">12</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Requires immediate review</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Cleared Today</span>
                  <CheckCircle size={20} className="text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">87</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Automated clearance</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compliance Reports</h3>
            <div className="space-y-3">
              {[
                { name: 'Monthly AML Report - July 2025', date: '2025-07-15', type: 'PDF' },
                { name: 'KYC Status Summary Q2 2025', date: '2025-07-01', type: 'PDF' },
                { name: 'Suspicious Activity Report #2025-07', date: '2025-07-10', type: 'SAR' },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{report.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{report.date} • {report.type}</p>
                  </div>
                  <button className="btn-secondary text-sm">Download</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* System Tab */}
      {activeTab === 'system' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Health</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">API Status</p>
                <p className="text-xl font-bold text-green-600 flex items-center">
                  <CheckCircle size={20} className="mr-2" />
                  {systemStats.apiHealth.toUpperCase()}
                </p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">WebSocket Connections</p>
                <p className="text-xl font-bold text-blue-600">{systemStats.websocketConnections.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">24h Volume (USD)</p>
                <p className="text-xl font-bold text-purple-600">${systemStats.platformVolume24h.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Platform Metrics</h3>
            <div className="space-y-4">
              {[
                { label: 'Total Registered Users', value: '1,247', change: '+12% this week' },
                { label: 'Daily Active Users', value: '892', change: '+5% today' },
                { label: 'Total Transactions', value: '15,432', change: '+23% this month' },
                { label: 'Average Transaction Value', value: '$287', change: '-2% this week' },
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{metric.value}</p>
                  </div>
                  <span className={`text-sm font-medium ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
