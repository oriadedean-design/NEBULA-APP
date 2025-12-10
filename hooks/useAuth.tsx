import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const AUTH_KEY = 'nebula-auth-token';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved auth state on initial load
    try {
      const storedAuth = localStorage.getItem(AUTH_KEY);
      if (storedAuth) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Could not read from local storage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = () => {
    localStorage.setItem(AUTH_KEY, 'true'); // In a real app, this would be a JWT
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
