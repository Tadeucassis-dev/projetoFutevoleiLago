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
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const toast = useToast();

    // Definir cores baseadas no modo claro/escuro
    const bgGradient = useColorModeValue(
      "linear(to-b, blue.100, orange.100)",
      "linear(to-b, blue.900, orange.900)"
    );
    const textColor = useColorModeValue("gray.800", "white");
    const buttonBg = useColorModeValue("Yellow.700", "Yellow.600");
    const buttonHoverBg = useColorModeValue("Yellow.500", "Yellow.400");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      toast({
        title: 'Erro',
        description: 'Por favor, insira um email válido',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: 'Erro',
        description: 'A senha deve ter pelo menos 6 caracteres',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    try {
      await register(name, email, password);
      toast({
        title: 'Registro bem-sucedido',
        description: 'Conta criada com sucesso! Faça login para continuar.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Não foi possível criar a conta';
      toast({
        title: 'Erro de registro',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
    height="100vh"
      bgGradient={bgGradient}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{ base: 4, md: 8 }}
      py={12}
    >
      <Box flex="1" maxW="400px" mx="auto" p={8}>
        <Heading mb={6} color="black">Registrar</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              color="black"
            >
              Criar Conta
            </Button>
            <Link as={RouterLink} to="/login" color="brand.500">
              Já tem uma conta? Faça login
            </Link>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}

export default Register;