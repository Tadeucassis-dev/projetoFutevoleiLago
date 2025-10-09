import { 
  Box, 
  Heading, 
  useColorModeValue, 
  useToast, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  VStack,
  Text,
  Spinner,
  Center
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getAllStudents, getPendingStudents, getActiveStudents } from '../services/api';
import StudentTable from '../components/StudentTable';
import { Student } from '../types';

function AdminDashboard() {
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [pendingStudents, setPendingStudents] = useState<Student[]>([]);
  const [activeStudents, setActiveStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  // Definir cores baseadas no modo claro/escuro
  const bgGradient = useColorModeValue(
    "linear(to-b, blue.100, orange.100)",
    "linear(to-b, blue.900, orange.900)"
  );
  const textColor = useColorModeValue("gray.800", "white");

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [allData, pendingData, activeData] = await Promise.all([
        getAllStudents(),
        getPendingStudents(),
        getActiveStudents()
      ]);
      
      setAllStudents(allData);
      setPendingStudents(pendingData);
      setActiveStudents(activeData);
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os dados dos alunos',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleStudentUpdate = () => {
    fetchAllData();
  };

  if (isLoading) {
    return (
      <Box 
        height="100vh"
        bgGradient={bgGradient}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Center>
          <VStack spacing={4}>
            <Spinner size="xl" color="yellow.500" />
            <Text color={textColor}>Carregando dados...</Text>
          </VStack>
        </Center>
      </Box>
    );
  }

  return (
    <Box 
      minHeight="100vh"
      bgGradient={bgGradient}
      py={8}
      px={{ base: 4, md: 8 }}
    >
      <Box maxW="1400px" mx="auto">
        <VStack spacing={6} align="stretch">
          <Heading color={textColor} textAlign="center">
            Painel Administrativo - Escolinha de Futevôlei
          </Heading>
          
          <Box bg="white" borderRadius="lg" p={6} boxShadow="lg">
            <Tabs variant="enclosed" colorScheme="yellow">
              <TabList>
                <Tab>
                  Todos os Alunos ({allStudents.length})
                </Tab>
                <Tab>
                  Solicitações Pendentes ({pendingStudents.length})
                </Tab>
                <Tab>
                  Alunos Ativos ({activeStudents.length})
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel px={0}>
                  <VStack spacing={4} align="stretch">
                    <Text fontSize="lg" fontWeight="medium" color="gray.700">
                      Lista completa de todos os alunos cadastrados
                    </Text>
                    {allStudents.length > 0 ? (
                      <StudentTable 
                        students={allStudents} 
                        onStudentUpdate={handleStudentUpdate}
                      />
                    ) : (
                      <Text textAlign="center" color="gray.500" py={8}>
                        Nenhum aluno cadastrado ainda.
                      </Text>
                    )}
                  </VStack>
                </TabPanel>

                <TabPanel px={0}>
                  <VStack spacing={4} align="stretch">
                    <Text fontSize="lg" fontWeight="medium" color="gray.700">
                      Solicitações aguardando aprovação
                    </Text>
                    {pendingStudents.length > 0 ? (
                      <StudentTable 
                        students={pendingStudents} 
                        onStudentUpdate={handleStudentUpdate}
                      />
                    ) : (
                      <Text textAlign="center" color="gray.500" py={8}>
                        Não há solicitações pendentes no momento.
                      </Text>
                    )}
                  </VStack>
                </TabPanel>

                <TabPanel px={0}>
                  <VStack spacing={4} align="stretch">
                    <Text fontSize="lg" fontWeight="medium" color="gray.700">
                      Alunos aprovados e ativos na escolinha
                    </Text>
                    {activeStudents.length > 0 ? (
                      <StudentTable 
                        students={activeStudents} 
                        onStudentUpdate={handleStudentUpdate}
                      />
                    ) : (
                      <Text textAlign="center" color="gray.500" py={8}>
                        Nenhum aluno ativo ainda.
                      </Text>
                    )}
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

export default AdminDashboard;