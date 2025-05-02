import React from 'react';

export default function BlackjackGame() {
  return (
    <div className="bg-green-900 min-h-screen flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-3xl font-bold mb-8">Blackjack Royale</h1>

      {/* Dealer Section */}
      <div className="mb-10 text-center">
        <h2 className="text-lg mb-2 text-gray-300">DEALER</h2>
        <div className="flex gap-4 justify-center mb-2">
          <div className="bg-white text-black p-4 rounded-lg shadow">6♠</div>
          <div className="bg-white text-black p-4 rounded-lg shadow">J♥</div>
        </div>
        <p className="text-xl font-bold">Total: 20</p>
      </div>

      {/* Player Section */}
      <div className="mb-10 text-center">
        <h2 className="text-lg mb-2 text-gray-300">YOU</h2>
        <div className="flex gap-4 justify-center mb-2">
          <div className="bg-white text-black p-4 rounded-lg shadow">6♥</div>
          <div className="bg-white text-black p-4 rounded-lg shadow">4♣</div>
          <div className="bg-white text-black p-4 rounded-lg shadow">A♠</div>
        </div>
        <p className="text-xl font-bold">Total: 21</p>
      </div>

      {/* Chip Selection */}
      <div className="flex gap-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-bold text-sm">1</div>
        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center font-bold text-sm">5</div>
        <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center font-bold text-sm">10</div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-6">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg shadow">
          Hit
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow">
          Stand
        </button>
      </div>
    </div>
  );
}
