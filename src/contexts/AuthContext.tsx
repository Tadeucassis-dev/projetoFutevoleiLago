import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const loginFn = async (username: string, password: string) => {
    try {
      const response = await login(username, password);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      const isAdmin = response.user.roles.some((role: { name: string; }) => role.name === 'ROLE_ADMIN');
      navigate(isAdmin ? '/admin' : '/');
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const registerFn = async (username: string, password: string) => {
    try {
      const response = await register(username, password);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      navigate('/');
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login: loginFn, register: registerFn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};