import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/api';
import { LoginRequest, User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Verificar se há token salvo ao carregar a aplicação
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Aqui você pode fazer uma chamada para validar o token
          // Por enquanto, vamos apenas verificar se existe
          // Em uma implementação real, você faria uma chamada para /me ou similar
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        localStorage.removeItem('token');
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const loginFn = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const credentials: LoginRequest = { email, password };
      const response = await login(credentials);

      localStorage.setItem('token', response.token);
      setUser(response.user ?? null);

      // Redireciona para página de validação de alunos
      navigate('/admin');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Falha no login');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const registerFn = useCallback(async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await register({ name, email, password });
      
      // Após registro bem-sucedido, redirecionar para login
      navigate('/login', { 
        state: { 
          message: 'Cadastro realizado com sucesso! Faça login para continuar.' 
        } 
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Falha no registro');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  }, [navigate]);

  const isAuthenticated = !!user;

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login: loginFn,
    register: registerFn,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
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