import { Box, Flex, Heading, Button, useColorMode, Image } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/login');
  };

  return (
    <Box 
      as="header"
      bg="gray.900"
      p="8px"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      h="85px" // Altura aumentada
     >
      <Flex justify="space-between" align="center" h="100%" >
        {/* Logo à esquerda */}
        <Flex align="center" flex="1">
          <Image src="../../public/logoftv1.png" alt="Logo" boxSize="120px" />
        </Flex>
        
        {/* Nome centralizado */}
        <Flex justify="center" flex="2">
          <Heading size="lg" color="white" textAlign="center">
            Projeto Futevôlei do Lago
          </Heading>
        </Flex>
        
        {/* Botões à direita */}
        <Flex align="center" justify="flex-end" flex="1">
          {user && (
            <>
              <Box mr={4} color="white" fontSize="sm">Bem-vindo, {user.email}</Box>
              <Button onClick={logout} mr={2} variant="outline" size="sm">
                Sair
              </Button>
            </>
          )}
          {!user && (
            <Button
              bgColor="white"
              variant="outline"
              colorScheme="white"
              size="sm"
              onClick={handleAdminClick}
              mr={4}
            >
              Admin
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;