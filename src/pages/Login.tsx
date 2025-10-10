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
  Text,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  // Definir cores baseadas no modo claro/escuro
  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, orange.50)",
    "linear(to-br, blue.900, orange.900)"
  );
  
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  // Mensagem de sucesso do registro
  const successMessage = location.state?.message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message || "Credenciais inválidas",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Box 
      minHeight="100vh"
      bgGradient={bgGradient}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{ base: 4, md: 8 }}
      py={12}
      position="relative"
    >
      {/* Botão Voltar */}
      <IconButton
        aria-label="Voltar para home"
        icon={<FaArrowLeft />}
        position="absolute"
        top={4}
        left={4}
        onClick={handleBackToHome}
        variant="ghost"
        size="lg"
      />

      <Card maxW="400px" w="full" bg={cardBg} shadow="xl">
        <CardBody p={8}>
          <VStack spacing={6}>
            <Heading size="lg" textAlign="center">
              Acesso Administrativo
            </Heading>
            
            <Text color={textColor} textAlign="center">
              Faça login para acessar o painel administrativo
            </Text>

            {successMessage && (
              <Alert status="success" borderRadius="md">
                <AlertIcon />
                {successMessage}
              </Alert>
            )}

            <Box w="full">
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      placeholder="Digite seu email"
                      onChange={(e) => setEmail(e.target.value)}
                      focusBorderColor="blue.500"
                      size="lg"
                    />
                  </FormControl>

                  <FormControl id="password" isRequired>
                    <FormLabel>Senha</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        placeholder="Digite sua senha"
                        onChange={(e) => setPassword(e.target.value)}
                        focusBorderColor="blue.500"
                        size="lg"
                      />
                      <InputRightElement h="full">
                        <IconButton
                          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                          icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                          onClick={() => setShowPassword(!showPassword)}
                          variant="ghost"
                          size="sm"
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <Button
                    type="submit"
                    width="full"
                    size="lg"
                    colorScheme="blue"
                    isLoading={isLoading}
                    loadingText="Entrando..."
                    mt={4}
                  >
                    Entrar
                  </Button>
                </VStack>
              </form>
            </Box>

            <Divider />

            <Text color={textColor} fontSize="sm" textAlign="center">
              Não tem uma conta?{" "}
              <Link as={RouterLink} to="/register" color="blue.500" fontWeight="medium">
                Cadastre-se aqui
              </Link>
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}

export default Login;
