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
import { useState, useEffect } from "react";
import { getHome, registerStudent } from "../services/api";

function Form() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [schoolUnit, setSchoolUnit] = useState("");
  const [fone, setFone] = useState("");
  const [email, setEmail] = useState("");
  const [identityFile, setIdentityFile] = useState<File | null>(null);
  const [attendanceFile, setAttendanceFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // Definir cores baseadas no modo claro/escuro
  const bgGradient = useColorModeValue(
    "linear(to-b, blue.100, orange.100)",
    "linear(to-b, blue.900, orange.900)"
  );
  const textColor = useColorModeValue("gray.800", "white");
  const buttonBg = useColorModeValue("yellow.700", "yellow.600");
  const buttonHoverBg = useColorModeValue("yellow.500", "yellow.400");

  useEffect(() => {
    const fetchHome = async () => {
      // Função mantida vazia conforme o original
    };
    fetchHome();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("schoolUnit", schoolUnit);
    formData.append("fone", fone);
    formData.append("email", email);
    if (identityFile) formData.append("identityFile", identityFile);
    if (attendanceFile) formData.append("attendanceFile", attendanceFile);

    console.log("FormData:", {
      name,
      age,
      schoolUnit,
      identityFile: identityFile?.name,
      attendanceFile: attendanceFile?.name,
    });

    try {
      await registerStudent(formData);
      toast({
        title: "Cadastro enviado",
        description: "Seu cadastro foi enviado para aprovação!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setName("");
      setAge("");
      setSchoolUnit("");
      setIdentityFile(null);
      setAttendanceFile(null);
    } catch (error: any) {
      console.error(
        "Erro na requisição:",
        error.response?.data || error.message
      );
      toast({
        title: "Erro",
        description:
          error.response?.data?.message || "Não foi possível enviar o cadastro.",
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
      minHeight="100vh"
      bgGradient={bgGradient}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{ base: 4, md: 8 }}
      py={12}
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
            aquele futevôleicom a gente! 🚀
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
            Cadastro
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <FormControl id="name" isRequired>
                <FormLabel fontWeight="medium">Nome Completo</FormLabel>
                <Input
                  type="text"
                  value={name}
                  placeholder="Digite seu nome"
                  border="1px solid"
                  borderColor="gray.300"
                  focusBorderColor="yellow.500"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <FormControl id="age" isRequired>
                <FormLabel fontWeight="medium">Idade</FormLabel>
                <Input
                  type="number"
                  placeholder="Digite sua idade"
                  border="1px solid"
                  borderColor="gray.300"
                  focusBorderColor="yellow.500"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </FormControl>

              <FormControl id="schoolUnit" isRequired>
                <FormLabel fontWeight="medium">Unidade Escolar</FormLabel>
                <Input
                  type="text"
                  placeholder="Nome da escola"
                  border="1px solid"
                  borderColor="gray.300"
                  focusBorderColor="yellow.500"
                  value={schoolUnit}
                  onChange={(e) => setSchoolUnit(e.target.value)}
                />
                
              </FormControl>
              <FormControl id="fone" isRequired>
                <FormLabel fontWeight="medium">Telefone</FormLabel>
                <Input
                  type="text"
                  placeholder="telefone"
                  border="1px solid"
                  borderColor="gray.300"
                  focusBorderColor="yellow.500"
                  value={fone}
                  onChange={(e) => setFone(e.target.value)}
                />
              </FormControl>
              
              <FormControl id="email" isRequired>
                <FormLabel fontWeight="medium">Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Digite seu email"
                  border="1px solid"
                  borderColor="gray.300"
                  focusBorderColor="yellow.500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="identityFile" isRequired>
                <FormLabel fontWeight="medium">Documento de Identidade</FormLabel>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  border="1px solid"
                  borderColor="gray.300"
                  p={1}
                  onChange={(e) => setIdentityFile(e.target.files?.[0] || null)}
                />
              </FormControl>

              <FormControl id="attendanceFile" isRequired>
                <FormLabel fontWeight="medium">
                  Comprovante de Presença Escolar
                </FormLabel>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  border="1px solid"
                  borderColor="gray.300"
                  p={1}
                  onChange={(e) => setAttendanceFile(e.target.files?.[0] || null)}
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
  );
}

export default Form;