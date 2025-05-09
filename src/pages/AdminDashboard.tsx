import { Box, Heading, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getStudents } from '../services/api';
import StudentTable from '../components/StudentTable';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Student } from '../types';

function AdminDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const toast = useToast();

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
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box flex="1" maxW="1200px" mx="auto" p={8}>
        <Heading mb={6}>Painel do Administrador</Heading>
        <StudentTable students={students} onApprove={handleApprove} />
      </Box>
      <Footer />
    </Box>
  );
}

export default AdminDashboard;