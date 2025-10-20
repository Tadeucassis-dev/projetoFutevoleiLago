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
      p={{ base: 2, md: '8px' }}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      h={{ base: '64px', md: '85px' }}
     >
      <Flex justify="space-between" align="center" h="100%" direction="row">
        {/* Logo à esquerda */}
        <Flex align="center" flex="1">
          <Image src="/logoftv1.png" alt="Logo" boxSize={{ base: '48px', md: '120px' }} />
        </Flex>
        
        {/* Nome centralizado */}
        <Flex justify="center" flex="2" minW={0}>
          <Heading color="white" textAlign="center" fontSize={{ base: 'sm', sm: 'md', md: '2xl' }} noOfLines={1}>
            Projeto Futevôlei do Lago
          </Heading>
        </Flex>
        
        {/* Botões à direita */}
        <Flex align="center" justify="flex-end" flex="1">
          {user && (
            <>
              <Box mr={4} color="white" fontSize={{ base: 'xs', md: 'sm' }}>
                Bem-vindo, {user.name ?? user.email}
              </Box>
              <Button onClick={logout} mr={2} variant="outline" size={{ base: 'xs', md: 'sm' }}>
                Sair
              </Button>
            </>
          )}
          {!user && (
            <Button
              bgColor="white"
              variant="outline"
              colorScheme="white"
              size={{ base: 'xs', md: 'sm' }}
              onClick={handleAdminClick}
              mr={{ base: 0, md: 4 }}
              display={{ base: 'none', md: 'inline-flex' }}
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