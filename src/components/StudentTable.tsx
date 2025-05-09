import { Table, Thead, Tbody, Tr, Th, Td, Button, useToast } from '@chakra-ui/react';
import { Student } from '../types';
import { approveStudent } from '../services/api';

interface StudentTableProps {
  students: Student[];
  onApprove: (id: number) => void;
}

function StudentTable({ students, onApprove }: StudentTableProps) {
  const toast = useToast();

  const handleApprove = async (id: number) => {
    try {
      await approveStudent(id);
      onApprove(id);
      toast({
        title: 'Aluno aprovado',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro ao aprovar aluno',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Idade</Th>
          <Th>Unidade Escolar</Th>
          <Th>Status</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {students.map((student) => (
          <Tr key={student.id}>
            <Td>{student.name}</Td>
            <Td>{student.age}</Td>
            <Td>{student.schoolUnit}</Td>
            <Td>{student.approved ? 'Aprovado' : 'Pendente'}</Td>
            <Td>
              {!student.approved && (
                <Button colorScheme="green" onClick={() => handleApprove(student.id)}>
                  Aprovar
                </Button>
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default StudentTable;