import React, { createContext, useState, useContext } from 'react';

// Create the context
const AuthContext = createContext();

// AuthProvider component to wrap the app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Fake login/logout for now
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Optional custom hook for convenience
export function useAuth() {
  return useContext(AuthContext);
}
