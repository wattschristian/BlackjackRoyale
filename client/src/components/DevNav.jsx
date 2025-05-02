import React from 'react';
import { Link } from 'react-router-dom';

export default function DevNav() {
  return (
    <div className="fixed top-4 left-4 z-50 bg-white shadow-md px-4 py-2 rounded-lg flex gap-4 text-sm">
      <Link to="/" className="text-blue-700 hover:underline">Login</Link>
      <Link to="/game" className="text-blue-700 hover:underline">Game</Link>
      <Link to="/stats" className="text-blue-700 hover:underline">Stats</Link>
    </div>
  );
}
