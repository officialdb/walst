import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GiftCard, CheckCircle, Clock, Upload, DollarSign, AlertCircle } from 'lucide-react';

const TaskEarner = () => {
  const { user } = useAuth();
  const [selectedTask, setSelectedTask] = useState(null);
  const [proofImage, setProofImage] = useState(null);

  // Mock task data
  const tasks = [
    {
      id: 1,
      title: 'Purchase $50 Amazon Gift Card',
      description: 'Buy a $50 Amazon gift card and earn 5 USDT reward',
      reward: 5,
      rewardAsset: 'USDT',
      estimatedTime: '5-10 mins',
      slots: 45,
      totalSlots: 100,
      expiry: '2025-07-20',
      instructions: [
        'Click the link to visit our partner store',
        'Purchase a $50 Amazon gift card',
        'Save the receipt or confirmation screenshot',
        'Upload proof below to claim your reward'
      ]
    },
    {
      id: 2,
      title: 'Purchase $100 iTunes Gift Card',
      description: 'Buy a $100 iTunes gift card and earn 12 USDT reward',
      reward: 12,
      rewardAsset: 'USDT',
      estimatedTime: '5-10 mins',
      slots: 23,
      totalSlots: 50,
      expiry: '2025-07-18',
      instructions: [
        'Visit the partnered iTunes store',
        'Complete purchase of $100 gift card',
        'Capture receipt or order confirmation',
        'Submit for verification'
      ]
    },
    {
      id: 3,
      title: 'Purchase $200 Steam Gift Card',
      description: 'Buy a $200 Steam gift card and earn 25 USDT reward',
      reward: 25,
      rewardAsset: 'USDT',
      estimatedTime: '10-15 mins',
      slots: 8,
      totalSlots: 25,
      expiry: '2025-07-22',
      instructions: [
        'Navigate to Steam store via partner link',
        'Purchase $200 worth of gift cards',
        'Keep transaction receipt',
        'Upload for instant verification'
      ]
    }
  ];

  const completedTasks = [
    { id: 101, title: 'Purchase $50 Amazon Gift Card', reward: 5, asset: 'USDT', date: '2025-07-10', status: 'completed' },
    { id: 102, title: 'Purchase $30 Google Play Gift Card', reward: 3, asset: 'USDT', date: '2025-07-08', status: 'completed' },
    { id: 103, title: 'Purchase $75 Walmart Gift Card', reward: 8, asset: 'USDT', date: '2025-07-05', status: 'pending' },
  ];

  const totalEarned = completedTasks
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.reward, 0);

  const handleProofUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofImage(file);
    }
  };

  const handleSubmitProof = () => {
    alert('Proof submitted! Your task will be verified within 24 hours. You will receive a congratulatory email once approved.');
    setSelectedTask(null);
    setProofImage(null);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Earnings Summary */}
      <div className="card bg-gradient-to-br from-green-600 to-green-800 text-white">
        <p className="text-sm opacity-90">Total Earned</p>
        <h2 className="text-4xl font-bold mt-2">{totalEarned} USDT</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs opacity-75">Pending Rewards</p>
            <p className="text-xl font-semibold">8 USDT</p>
          </div>
          <div>
            <p className="text-xs opacity-75">Available Tasks</p>
            <p className="text-xl font-semibold">{tasks.length}</p>
          </div>
        </div>
      </div>

      {/* Available Tasks */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Available Tasks</h3>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              onClick={() => setSelectedTask(task)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <GiftCard size={20} className="text-green-600" />
                    <h4 className="font-medium text-gray-900 dark:text-white">{task.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <span className="text-sm font-semibold text-green-600">
                      +{task.reward} {task.rewardAsset}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {task.estimatedTime}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {task.slots}/{task.totalSlots} slots
                  </div>
                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                    <div 
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${(task.slots / task.totalSlots) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Completions</h3>
        <div className="space-y-3">
          {completedTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  task.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {task.status === 'completed' ? <CheckCircle size={16} /> : <Clock size={16} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{task.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-green-600">+{task.reward} {task.asset}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedTask.title}</h3>
                <button 
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedTask.description}</p>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-800 dark:text-green-200">Reward</span>
                    <span className="text-lg font-bold text-green-600">+{selectedTask.reward} {selectedTask.rewardAsset}</span>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Instructions:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {selectedTask.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>

                <div className="mt-4 space-y-2 text-xs text-gray-500 dark:text-gray-400">
                  <p>⏱️ Estimated time: {selectedTask.estimatedTime}</p>
                  <p>📅 Expires: {selectedTask.expiry}</p>
                  <p>🎯 Slots remaining: {selectedTask.slots}/{selectedTask.totalSlots}</p>
                </div>
              </div>

              {!proofImage ? (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload size={40} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Upload proof of purchase</p>
                  <label className="btn-primary inline-block cursor-pointer">
                    Choose File
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleProofUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="mb-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={20} className="text-green-600" />
                      <span className="text-sm text-green-800 dark:text-green-200">{proofImage.name}</span>
                    </div>
                    <button 
                      onClick={() => setProofImage(null)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <button 
                    onClick={handleSubmitProof}
                    className="btn-primary w-full mt-4"
                  >
                    Submit for Verification
                  </button>
                </div>
              )}

              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle size={16} className="text-yellow-600 mt-0.5" />
                  <p className="text-xs text-yellow-800 dark:text-yellow-200">
                    <strong>Risk Disclosure:</strong> Rewards are subject to verification. False submissions may result in account suspension. Past earnings do not guarantee future rewards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskEarner;
