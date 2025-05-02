import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Replace with real login logic
    navigate('/game');
  };

  return (
    <div className="bg-white shadow-xl p-10 rounded-2xl w-full max-w-md border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Log In</h2>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-md text-lg font-semibold transition-colors"
        >
          Log In
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?{' '}
        <button className="text-green-700 font-semibold hover:underline">Sign up</button>
      </p>
    </div>
  );
}
