import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';
import { Spinner, Center, Box } from '@chakra-ui/react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading } = useAuth();
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (isLoading) {
    return (
      <Center minH="100vh">
        <Box textAlign="center">
          <Spinner size="xl" color="blue.500" thickness="4px" />
        </Box>
      </Center>
    );
  }

  // Se não há token, envia para login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Com token, permite acesso
  return <>{children}</>;
}

export default ProtectedRoute;