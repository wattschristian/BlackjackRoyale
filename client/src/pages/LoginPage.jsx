import React from 'react';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4">
      <LoginForm />
    </div>
  );
}
