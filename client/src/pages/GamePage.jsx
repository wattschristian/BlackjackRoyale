// pages/GamePage.jsx
import React from 'react';
import BlackjackGame from '../components/BlackjackGame';

export default function GamePage() {
  return (
    <div className="h-screen bg-green-900 flex items-center justify-center">
      <BlackjackGame />
    </div>
  );
}
