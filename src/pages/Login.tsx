import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        await login(username, password);
        toast({
            title: 'Login bem-sucedido',
            description: 'Você foi redirecionado para a página inicial',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    } catch (error: any) {
        toast({
            title: 'Erro de login',
            description: error.response?.data?.message || 'Credenciais inválidas',
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    } finally {
        setIsLoading(false);
    }
};

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box flex="1" maxW="400px" mx="auto" p={8}>
        <Heading mb={6}>Login</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Usuário</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="brand"
              width="full"
              isLoading={isLoading}
            >
              Entrar
            </Button>
            <Link as={RouterLink} to="/register" color="brand.500">
              Não tem uma conta? Registre-se
            </Link>
          </VStack>
        </form>
      </Box>
      <Footer />
    </Box>
  );
}

export default Login;