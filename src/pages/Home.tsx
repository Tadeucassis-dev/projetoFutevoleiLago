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
  } from '@chakra-ui/react';
  import { useState, useEffect } from 'react';
  import { getHome, registerStudent } from '../services/api';
  import Header from '../components/Header';
  import Footer from '../components/Footer';
  
  function Home() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [schoolUnit, setSchoolUnit] = useState('');
    const [identityFile, setIdentityFile] = useState<File | null>(null);
    const [attendanceFile, setAttendanceFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const toast = useToast();
  
    useEffect(() => {
      const fetchHome = async () => {
        try {
          const message = await getHome();
          setWelcomeMessage(message);
        } catch (error) {
          toast({
            title: 'Erro',
            description: 'Não foi possível carregar a mensagem de boas-vindas',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      };
      fetchHome();
    }, [toast]);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
  
      const formData = new FormData();
      formData.append('name', name);
      formData.append('age', age);
      formData.append('schoolUnit', schoolUnit);
      if (identityFile) formData.append('identityFile', identityFile);
      if (attendanceFile) formData.append('attendanceFile', attendanceFile);
  
      try {
        await registerStudent(formData);
        toast({
          title: 'Cadastro enviado',
          description: 'Seu cadastro foi enviado para aprovação',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setName('');
        setAge('');
        setSchoolUnit('');
        setIdentityFile(null);
        setAttendanceFile(null);
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Não foi possível enviar o cadastro',
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
        <Box flex="1" maxW="600px" mx="auto" p={8}>
          <Heading mb={6}>{welcomeMessage}</Heading>
          <Text mb={6}>
            Preencha o formulário abaixo para se cadastrar na Escolinha de Futevôlei.
          </Text>
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
              <FormControl id="age" isRequired>
                <FormLabel>Idade</FormLabel>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </FormControl>
              <FormControl id="schoolUnit" isRequired>
                <FormLabel>Unidade Escolar</FormLabel>
                <Input
                  type="text"
                  value={schoolUnit}
                  onChange={(e) => setSchoolUnit(e.target.value)}
                />
              </FormControl>
              <FormControl id="identityFile" isRequired>
                <FormLabel>Documento de Identidade</FormLabel>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => setIdentityFile(e.target.files?.[0] || null)}
                />
              </FormControl>
              <FormControl id="attendanceFile" isRequired>
                <FormLabel>Comprovante de Presença</FormLabel>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => setAttendanceFile(e.target.files?.[0] || null)}
                />
              </FormControl>
              <Button
              color={'black'}
                type="submit"
                colorScheme="brand"
                width="full"
                isLoading={isLoading}
              >
                Enviar Cadastro
              </Button>
            </VStack>
          </form>
        </Box>
        <Footer />
      </Box>
    );
  }
  
  export default Home;