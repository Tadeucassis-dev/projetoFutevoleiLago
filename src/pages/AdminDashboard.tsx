import { Box, Heading, useColorModeValue, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getStudents } from '../services/api';
import StudentTable from '../components/StudentTable';
import { Student } from '../types';

function AdminDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const toast = useToast();

   // Definir cores baseadas no modo claro/escuro
    const bgGradient = useColorModeValue(
      "linear(to-b, blue.100, orange.100)",
      "linear(to-b, blue.900, orange.900)"
    );
    const textColor = useColorModeValue("gray.800", "white");
    const buttonBg = useColorModeValue("Yellow.700", "Yellow.600");
    const buttonHoverBg = useColorModeValue("Yellow.500", "Yellow.400");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar a lista de alunos',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchStudents();
  }, [toast]);

  const handleApprove = (id: number) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, approved: true } : student,
      ),
    );
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
      
      <Box flex="1" maxW="1200px" mx="auto" p={8}>
        <Heading mb={6}>Painel do Administrador</Heading>
        <StudentTable students={students} onApprove={handleApprove} />
      </Box>
      
    </Box>
  );
}

export default AdminDashboard;