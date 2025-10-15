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
  VStack,
  Box,
  Flex,
  Spacer,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { Student } from '../types';
import { approveStudent, rejectStudent, deleteStudent } from '../services/api';

interface StudentTableProps {
  students: Student[];
  onStudentUpdate: () => void;
}

function StudentTable({ students, onStudentUpdate }: StudentTableProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isDeleteAllOpen, onOpen: onDeleteAllOpen, onClose: onDeleteAllClose } = useDisclosure();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

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
      const rejectData = {
        motivoRejeicao: rejectReason,
      };
      
      await rejectStudent(selectedStudent.id, rejectData);
      toast({
        title: 'Aluno rejeitado',
        description: `${selectedStudent.nome} foi rejeitado. Motivo: ${rejectReason}`,
        status: 'info',
        duration: 4000,
        isClosable: true,
      });
      onStudentUpdate();
      onClose();
    } catch (error: any) {
      toast({
        title: 'Erro ao rejeitar aluno',
        description: error.response?.data?.error || error.response?.data?.message || 'Erro interno do servidor',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (student: Student) => {
    // Só permite deletar alunos rejeitados
    if (student.statusSolicitacao !== 'REJEITADO') {
      toast({
        title: "Ação não permitida",
        description: "Apenas alunos rejeitados podem ser deletados",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setSelectedStudent(student);
    onDeleteOpen();
  };

  const handleDeleteConfirm = async () => {
    if (!selectedStudent) return;

    setIsLoading(true);
    try {
      await deleteStudent(selectedStudent.id);
      onStudentUpdate();
      onDeleteClose();
      
      toast({
        title: "Sucesso",
        description: `Aluno ${selectedStudent.nome} foi removido com sucesso`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error('Erro ao deletar aluno:', error);
      toast({
        title: "Erro",
        description: error.response?.data?.error || error.response?.data?.message || "Erro ao remover aluno",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAllConfirm = async () => {
    setIsLoading(true);
    try {
      // Deletar apenas alunos rejeitados
      const rejectedStudents = students.filter(s => s.statusSolicitacao === 'REJEITADO');
      
      if (rejectedStudents.length === 0) {
        toast({
          title: "Aviso",
          description: "Não há alunos rejeitados para remover",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        onDeleteAllClose();
        return;
      }
      
      // Deletar cada aluno rejeitado individualmente
      let deletedCount = 0;
      const errors = [];
      
      for (const student of rejectedStudents) {
        try {
          await deleteStudent(student.id);
          deletedCount++;
        } catch (error: any) {
          console.error(`Erro ao deletar aluno ${student.nome}:`, error);
          errors.push(`${student.nome}: ${error.response?.data?.error || 'Erro desconhecido'}`);
        }
      }
      
      onStudentUpdate();
      onDeleteAllClose();
      
      if (deletedCount === rejectedStudents.length) {
        toast({
          title: "Sucesso",
          description: `${deletedCount} aluno(s) rejeitado(s) foram removidos com sucesso`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (deletedCount > 0) {
        toast({
          title: "Parcialmente concluído",
          description: `${deletedCount} de ${rejectedStudents.length} aluno(s) foram removidos. Alguns erros ocorreram.`,
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Erro",
          description: "Nenhum aluno pôde ser removido. Verifique os logs para mais detalhes.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.error('Erro ao deletar alunos rejeitados:', error);
      toast({
        title: "Erro",
        description: error.response?.data?.error || error.response?.data?.message || "Erro ao remover alunos rejeitados",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Cabeçalho com ações */}
      <Box mb={4}>
        <Flex align="center">
          <Text fontSize="lg" fontWeight="bold" color="gray.700">
            Lista de Alunos ({students.length})
          </Text>
          <Spacer />
          {students.filter(s => s.statusSolicitacao === 'REJEITADO').length > 0 && (
            <Button
              colorScheme="red"
              variant="outline"
              size="sm"
              onClick={onDeleteAllOpen}
              isLoading={isLoading}
            >
              Deletar Rejeitados ({students.filter(s => s.statusSolicitacao === 'REJEITADO').length})
            </Button>
          )}
        </Flex>
      </Box>

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
                  <VStack align="start" spacing={2}>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" color="red.600">Rejeitado</Text>
                      {student.motivoRejeicao && (
                        <Text fontSize="xs" color="gray.600">
                          Motivo: {student.motivoRejeicao}
                        </Text>
                      )}
                    </VStack>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDeleteClick(student)}
                      isLoading={isLoading}
                    >
                      Deletar
                    </Button>
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
                resize="vertical"
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



      {/* AlertDialog para deletar aluno individual */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar Aluno
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja deletar o aluno <strong>{selectedStudent?.nome}</strong>?
              Esta ação não pode ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancelar
              </Button>
              <Button 
                colorScheme="red" 
                onClick={handleDeleteConfirm} 
                ml={3}
                isLoading={isLoading}
              >
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* AlertDialog para deletar alunos rejeitados */}
      <AlertDialog
        isOpen={isDeleteAllOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteAllClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar Alunos Rejeitados
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja deletar <strong>TODOS os {students.filter(s => s.statusSolicitacao === 'REJEITADO').length} alunos rejeitados</strong>?
              Esta ação não pode ser desfeita e removerá permanentemente estes registros.
              <br /><br />
              <Text fontSize="sm" color="gray.600">
                Alunos aprovados e pendentes não serão afetados.
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteAllClose}>
                Cancelar
              </Button>
              <Button 
                colorScheme="red" 
                onClick={handleDeleteAllConfirm} 
                ml={3}
                isLoading={isLoading}
              >
                Deletar Rejeitados
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default StudentTable;