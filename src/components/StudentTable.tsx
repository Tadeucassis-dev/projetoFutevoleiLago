import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Button, 
  useToast, 
  Badge,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  FormControl,
  FormLabel,
  Text,
  VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { Student } from '../types';
import { approveStudent, rejectStudent, processStudent } from '../services/api';

interface StudentTableProps {
  students: Student[];
  onStudentUpdate: () => void;
}

function StudentTable({ students, onStudentUpdate }: StudentTableProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APROVADO':
        return 'green';
      case 'REJEITADO':
        return 'red';
      case 'PENDENTE':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleApprove = async (student: Student) => {
    setIsLoading(true);
    try {
      await approveStudent(student.id);
      toast({
        title: 'Aluno aprovado',
        description: `${student.nome} foi aprovado com sucesso!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onStudentUpdate();
    } catch (error: any) {
      toast({
        title: 'Erro ao aprovar aluno',
        description: error.response?.data?.error || 'Erro interno do servidor',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectClick = (student: Student) => {
    setSelectedStudent(student);
    setRejectReason('');
    onOpen();
  };

  const handleRejectConfirm = async () => {
    if (!selectedStudent || !rejectReason.trim()) {
      toast({
        title: 'Erro',
        description: 'Por favor, informe o motivo da rejeição',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      await rejectStudent(selectedStudent.id, { motivoRejeicao: rejectReason });
      toast({
        title: 'Aluno rejeitado',
        description: `${selectedStudent.nome} foi rejeitado.`,
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      onStudentUpdate();
      onClose();
    } catch (error: any) {
      toast({
        title: 'Erro ao rejeitar aluno',
        description: error.response?.data?.error || 'Erro interno do servidor',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Table variant="simple" bg="white" borderRadius="lg" overflow="hidden">
        <Thead bg="gray.50">
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Telefone</Th>
            <Th>Idade</Th>
            <Th>Instituição</Th>
            <Th>Status</Th>
            <Th>Data Solicitação</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student) => (
            <Tr key={student.id}>
              <Td fontWeight="medium">{student.nome}</Td>
              <Td>{student.email}</Td>
              <Td>{student.telefone}</Td>
              <Td>{student.idade}</Td>
              <Td>{student.instituicaoEnsino}</Td>
              <Td>
                <Badge colorScheme={getStatusColor(student.statusSolicitacao)}>
                  {student.statusSolicitacao}
                </Badge>
              </Td>
              <Td>{formatDate(student.dataSolicitacao)}</Td>
              <Td>
                {student.statusSolicitacao === 'PENDENTE' && (
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      colorScheme="green"
                      onClick={() => handleApprove(student)}
                      isLoading={isLoading}
                    >
                      Aprovar
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      onClick={() => handleRejectClick(student)}
                      isLoading={isLoading}
                    >
                      Rejeitar
                    </Button>
                  </HStack>
                )}
                {student.statusSolicitacao === 'APROVADO' && (
                  <Text fontSize="sm" color="green.600">
                    Aprovado em {student.dataAprovacao ? formatDate(student.dataAprovacao) : 'N/A'}
                  </Text>
                )}
                {student.statusSolicitacao === 'REJEITADO' && (
                  <VStack align="start" spacing={1}>
                    <Text fontSize="sm" color="red.600">Rejeitado</Text>
                    {student.motivoRejeicao && (
                      <Text fontSize="xs" color="gray.600">
                        Motivo: {student.motivoRejeicao}
                      </Text>
                    )}
                  </VStack>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal de Rejeição */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rejeitar Solicitação</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>
              Você está prestes a rejeitar a solicitação de <strong>{selectedStudent?.nome}</strong>.
            </Text>
            <FormControl isRequired>
              <FormLabel>Motivo da rejeição</FormLabel>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Informe o motivo da rejeição..."
                rows={4}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              colorScheme="red" 
              onClick={handleRejectConfirm}
              isLoading={isLoading}
            >
              Confirmar Rejeição
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default StudentTable;