import React from 'react';

export default function StatsPanel() {
  return (
    <div className="bg-white text-black p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Stats</h2>

      <div className="mb-6 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Username:</span>
          <span className="font-semibold">blackjack_user</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Games Played:</span>
          <span className="font-semibold">1,250</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Games Won:</span>
          <span className="font-semibold">530</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Win Rate:</span>
          <span className="font-semibold">42.4%</span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-600 mb-2">Recent Game Results:</p>
        <ul className="text-sm space-y-1">
          <li className="text-green-700">✔ Win</li>
          <li className="text-red-600">✘ Loss</li>
          <li className="text-green-700">✔ Win</li>
          <li className="text-green-700">✔ Win</li>
        </ul>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-600 mb-2">Win Rate Chart:</p>
        <div className="w-full h-20 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-400 italic">
          (Coming soon)
        </div>
      </div>
    </div>
  );
}
