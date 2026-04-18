import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowUpDown, TrendingUp, Bell, Clock, AlertCircle, Info } from 'lucide-react';

const CurrencySwapper = () => {
  const { user } = useAuth();
  const [fromAsset, setFromAsset] = useState('BTC');
  const [toAsset, setToAsset] = useState('USDT');
  const [amount, setAmount] = useState('');
  const [orderType, setOrderType] = useState('market');
  const [limitPrice, setLimitPrice] = useState('');
  const [slippage, setSlippage] = useState(0.5);

  // Mock prices
  const [prices, setPrices] = useState({
    BTC: 67500,
    ETH: 3800,
    USDT: 1.00,
    NGN: 0.000625
  });

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => ({
        BTC: prev.BTC * (1 + (Math.random() - 0.5) * 0.002),
        ETH: prev.ETH * (1 + (Math.random() - 0.5) * 0.003),
        USDT: 1.00,
        NGN: 0.000625
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const assets = ['BTC', 'ETH', 'USDT', 'NGN'];
  
  const fromPrice = prices[fromAsset];
  const toPrice = prices[toAsset];
  const exchangeRate = fromPrice / toPrice;
  const receiveAmount = amount ? (parseFloat(amount) * exchangeRate).toFixed(6) : '0.00';
  
  const estimatedFee = amount ? (parseFloat(amount) * fromPrice * 0.001).toFixed(2) : '0.00';
  const slippageAmount = amount ? (parseFloat(receiveAmount) * (slippage / 100)).toFixed(6) : '0.00';
  const minimumReceived = amount ? (parseFloat(receiveAmount) - parseFloat(slippageAmount)).toFixed(6) : '0.00';

  const recentOrders = [
    { id: 1, type: 'swap', from: 'BTC', to: 'USDT', fromAmount: 0.01, toAmount: 675, date: '2025-07-15', status: 'filled' },
    { id: 2, type: 'swap', from: 'ETH', to: 'BTC', fromAmount: 0.5, toAmount: 0.028, date: '2025-07-14', status: 'filled' },
    { id: 3, type: 'limit', from: 'BTC', to: 'USDT', fromAmount: 0.005, toAmount: 340, date: '2025-07-13', status: 'pending' },
  ];

  const handleSwap = () => {
    alert(`Swap executed!\n\nSold: ${amount} ${fromAsset}\nReceived: ${receiveAmount} ${toAsset}\nFee: $${estimatedFee}\n\nOrder confirmation sent to your email.`);
    setAmount('');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Price Ticker */}
      <div className="card bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <h3 className="text-sm opacity-90 mb-3">Live Market Prices</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(prices).map(([asset, price]) => (
            <div key={asset} className="bg-white/10 rounded-lg p-3">
              <p className="text-xs opacity-75">{asset}/USD</p>
              <p className="text-lg font-bold">${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: asset === 'USDT' || asset === 'NGN' ? 4 : 2 })}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Swap Interface */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Swap Crypto</h3>
          <button className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
            <Bell size={16} className="mr-1" />
            Set Alert
          </button>
        </div>

        {/* Order Type */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setOrderType('market')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              orderType === 'market' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            Market
          </button>
          <button
            onClick={() => setOrderType('limit')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              orderType === 'limit' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            Limit
          </button>
        </div>

        {/* From Asset */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            From
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="input-field flex-1"
            />
            <select
              value={fromAsset}
              onChange={(e) => setFromAsset(e.target.value)}
              className="input-field w-32"
            >
              {assets.map(asset => (
                <option key={asset} value={asset}>{asset}</option>
              ))}
            </select>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Available: {user?.balances?.[fromAsset]?.toLocaleString() || '0'} {fromAsset}
          </p>
        </div>

        {/* Swap Direction */}
        <div className="flex justify-center -my-2 relative z-10">
          <button 
            onClick={() => {
              setFromAsset(toAsset);
              setToAsset(fromAsset);
            }}
            className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowUpDown size={20} className="text-primary-600" />
          </button>
        </div>

        {/* To Asset */}
        <div className="mb-4 mt-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            To
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={receiveAmount}
              readOnly
              placeholder="0.00"
              className="input-field flex-1 bg-gray-50 dark:bg-gray-800"
            />
            <select
              value={toAsset}
              onChange={(e) => setToAsset(e.target.value)}
              className="input-field w-32"
            >
              {assets.map(asset => (
                <option key={asset} value={asset}>{asset}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Exchange Rate */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Exchange Rate</span>
            <span className="font-medium text-gray-900 dark:text-white">
              1 {fromAsset} = {exchangeRate.toFixed(6)} {toAsset}
            </span>
          </div>
        </div>

        {/* Advanced Options */}
        {orderType === 'limit' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Limit Price (USD)
            </label>
            <input
              type="number"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              placeholder="Enter target price"
              className="input-field"
            />
          </div>
        )}

        {/* Slippage Tolerance */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Slippage Tolerance
          </label>
          <div className="flex space-x-2">
            {[0.1, 0.5, 1.0].map((val) => (
              <button
                key={val}
                onClick={() => setSlippage(val)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  slippage === val 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                {val}%
              </button>
            ))}
            <input
              type="number"
              value={slippage}
              onChange={(e) => setSlippage(parseFloat(e.target.value))}
              placeholder="Custom"
              className="input-field w-24"
            />
          </div>
        </div>

        {/* Order Summary */}
        {amount && parseFloat(amount) > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Estimated Fee</span>
              <span className="font-medium text-gray-900 dark:text-white">${estimatedFee}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Slippage ({slippage}%)</span>
              <span className="font-medium text-gray-900 dark:text-white">{slippageAmount} {toAsset}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-blue-200 dark:border-blue-800">
              <span className="text-gray-600 dark:text-gray-400">Minimum Received</span>
              <span className="font-bold text-gray-900 dark:text-white">{minimumReceived} {toAsset}</span>
            </div>
          </div>
        )}

        {/* Execute Button */}
        <button
          onClick={handleSwap}
          disabled={!amount || parseFloat(amount) <= 0}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {orderType === 'market' ? 'Execute Swap' : 'Place Limit Order'}
        </button>

        {/* Risk Disclosure */}
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle size={16} className="text-yellow-600 mt-0.5" />
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              <strong>Risk Warning:</strong> Cryptocurrency trading involves significant risk. Prices are volatile and can change rapidly. Only trade what you can afford to lose. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h3>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  order.type === 'limit' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {order.type === 'limit' ? <Clock size={20} /> : <TrendingUp size={20} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {order.from} → {order.to}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{order.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {order.fromAmount} {order.from}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  order.status === 'filled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencySwapper;
