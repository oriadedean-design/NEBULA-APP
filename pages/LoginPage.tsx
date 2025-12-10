import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd call an API here.
    // For now, we just call the login function from our context.
    login();
    navigate(from, { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background-light dark:bg-background-dark p-4 text-text-light dark:text-text-dark">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
            <h1 className="text-5xl font-bold tracking-tighter text-primary">Nebula</h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">The creative network for filmmakers.</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="form-input w-full rounded-lg border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-3 text-text-light dark:text-text-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="form-input w-full rounded-lg border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-3 text-text-light dark:text-text-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark focus:border-primary focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Don't have an account? <a href="#" className="font-semibold text-primary hover:underline">Sign up</a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;