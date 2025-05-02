// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import StatsPage from './pages/StatsPage';
import DevNav from './components/DevNav';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <DevNav />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
