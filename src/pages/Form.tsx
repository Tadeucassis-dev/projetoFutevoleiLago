import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../services/api";
import { StudentCreateRequest } from "../types";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Form() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [idade, setIdade] = useState("");
  const [instituicaoEnsino, setInstituicaoEnsino] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // Definir cores baseadas no modo claro/escuro
  const bgGradient = useColorModeValue(
    "linear(to-b, blue.100, orange.100)",
    "linear(to-b, blue.900, orange.900)"
  );
  const textColor = useColorModeValue("gray.800", "white");
  const buttonBg = useColorModeValue("yellow.700", "yellow.600");
  const buttonHoverBg = useColorModeValue("yellow.500", "yellow.400");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const studentData: StudentCreateRequest = {
        nome,
        email,
        telefone,
        dataNascimento,
        idade: parseInt(idade),
        instituicaoEnsino,
      };

      await createStudent(studentData);

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Sua solicitação foi enviada e está aguardando aprovação.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Limpar formulário
      setNome("");
      setEmail("");
      setTelefone("");
      setDataNascimento("");
      setIdade("");
      setInstituicaoEnsino("");

      // Redirecionar para a página Home após 2 segundos
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.response?.data?.error || "Ocorreu um erro ao processar seu cadastro.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Header />
      <Box
        minHeight="100vh"
        bgGradient={bgGradient}
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={{ base: 4, md: 8 }}
        py={12}
        pt="105px" // Adicionar padding-top para compensar o header fixo
      >
      <Flex
        direction={{ base: "column", md: "row" }}
        maxW="1200px"
        w="full"
        gap={8}
      >
        {/* Seção de Boas-Vindas */}
        <Box
          flex="1"
          maxW={{ base: "full", md: "600px" }}
          p={8}
          bg="white"
          borderRadius="lg"
          boxShadow="lg"
          textAlign="center"
        >
          <Heading
            as="h1"
            size="xl"
            mb={4}
            color={textColor}
            fontWeight="bold"
          >
            Bem-vindos à Escolinha de Futevôlei do Lago!
          </Heading>
          <Text fontSize="lg" color="gray.600" lineHeight="tall" marginTop={10}>
            E aí, galera! Preparados para se jogar futevôlei e curtir momentos
            incríveis na areia? 🌊⚽ A Escolinha de Futevôlei do Lago tá chegando
            com tudo pra trazer diversão, esporte e amizade pra criançada! 😎
            <br />
            <br />
            Pra fazer parte dessa vibe, é só preencher o formulário ao lado com
            seus dados. Capricha, hein? Assim, você garante sua vaga pra jogar
            aquele futevôlei com a gente! 🚀
          </Text>
        </Box>

        {/* Formulário */}
        <Box
          flex="1"
          maxW={{ base: "full", md: "600px" }}
          p={8}
          bg="white"
          borderRadius="lg"
          boxShadow="lg"
        >
          <Heading as="h2" size="lg" mb={6} color={textColor}>
            Cadastro de Aluno
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <FormControl id="nome" isRequired>
                <FormLabel fontWeight="medium">Nome Completo</FormLabel>
                <Input
                  type="text"
                  value={nome}
                  placeholder="Digite seu nome completo"
                  border="1px solid"
                  borderColor="gray.300"
                  focusBorderColor="yellow.500"
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel fontWeight="medium">Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  placeholder="Digite seu email"
                  border="1px solid"
                  borderColor="gray.300"
                  focusBorderColor="yellow.500"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="telefone" isRequired>
                <FormLabel fontWeight="medium">Telefone</FormLabel>
                <Input
                  type="tel"
                  value={telefone}
                  placeholder="(11) 99999-9999"
                  border="1px solid"
                  borderColor="gray.300"
                  focusBorderColor="yellow.500"
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </FormControl>

              <FormControl id="dataNascimento" isRequired>
                <FormLabel fontWeight="medium">Data de Nascimento</FormLabel>
                <Input
                  type="date"
                  value={dataNascimento}
                  border="1px solid"
                  borderColor="gray.300"
                  focusBorderColor="yellow.500"
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </FormControl>

              <FormControl id="instituicaoEnsino" isRequired>
                <FormLabel fontWeight="medium">Instituição de Ensino</FormLabel>
                <Input
                  type="text"
                  value={instituicaoEnsino}
                  placeholder="Nome da escola"
                  border="1px solid"
                  borderColor="gray.300"
                  focusBorderColor="yellow.500"
                  onChange={(e) => setInstituicaoEnsino(e.target.value)}
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="yellow"
                bg={buttonBg}
                color="white"
                width="full"
                isLoading={isLoading}
                _hover={{ bg: buttonHoverBg }}
                fontWeight="bold"
              >
                Enviar Cadastro
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
      
    </Box>
     </Box>
  );
}

export default Form;