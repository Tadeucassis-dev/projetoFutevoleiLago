import { Box, Flex, Heading, Button, useColorMode, Image } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logoftv.jpg';

function Header() {
  const { user, logout } = useAuth();
  const { toggleColorMode } = useColorMode();

  return (
    <Box bg="brand.500" p={4} color="white">
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
        <Flex align="center">
          <Image src={logo} alt="Logo" boxSize="40px" mr={2} />
          <Heading size="md">Escolinha de Futevôlei</Heading>
        </Flex>
        <Flex align="center">
          {user && (
            <>
              <Box mr={4}>Bem-vindo, {user.username}</Box>
              <Button onClick={logout} mr={2} variant="outline" colorScheme="whiteAlpha">
                Sair
              </Button>
            </>
          )}
          <Button onClick={toggleColorMode} variant="outline" colorScheme="whiteAlpha">
            Alternar Modo
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;