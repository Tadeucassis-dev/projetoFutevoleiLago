import { Box, Flex, Heading, Button, useColorMode, Image } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { user, logout } = useAuth();

  return (
    <Box 
      as="header"
      bg="blue.400"
      p="4px"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      h="68px" // Altura fixa
     >
      <Flex justify="space-between" align="center" h="100%" >
        <Flex align="center">
          <Image src="../../public/logoftv1.png" alt="Logo" boxSize="60px"  />
          <Heading size="md" color={"white"}>Projeto Futevôlei do lago</Heading>
        </Flex>
        <Flex align="center">
          {user && (
            <>
              <Box mr={4}>Bem-vindo, {user.username}</Box>
              <Button onClick={logout} mr={2} variant="outline" >
                Sair
              </Button>
            </>
          )}
        
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;