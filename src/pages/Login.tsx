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
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
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
    setIsLoading(true);
    try {
      await login(username, password);
      toast({
        title: "Login bem-sucedido",
        description: "Você foi redirecionado para a página inicial",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Erro de login",
        description: error.response?.data?.message || "Credenciais inválidas",
        status: "error",
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
              bgColor={"brand.600"}
              type="submit"
              width="full"
              isLoading={isLoading}
              color={"black"}
            >
              Entrar
            </Button>
            <Link as={RouterLink} to="/register" color="brand.500">
              Não tem uma conta? Registre-se
            </Link>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
