import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const loginFn = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      const isAdmin = response.user.roles.some((role: { name: string }) => role.name === 'ROLE_ADMIN');
      navigate('/form');
    } catch (error) {
      throw new Error('Falha no login');
    }
  };

  const registerFn = async (name: string, email: string, password: string) => {
    try {
      const response = await register(name, email, password);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      navigate('/login'); // Redireciona para login após registro
    } catch (error) {
      throw error; // Propaga o erro para o componente lidar
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
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};