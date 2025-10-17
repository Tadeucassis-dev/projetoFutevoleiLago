import { Box, Text, Flex, Heading, Image, HStack } from '@chakra-ui/react';

function Footer() {
  return (
    <Box 
      as="footer"
      bg="gray.900" 
      p="8px"
      mt="auto"
      position="relative"
      bottom={0}
      left={0}
      right={0}
      zIndex={10}
      h="85px" // Mesma altura do header
    >
      <Flex justify="space-between" align="center" h="100%" maxW="1200px" mx="auto">
        {/* Logo à esquerda */}
        <Flex align="center" flex="1">
          <Image src="/logoftv1.png" alt="Logo" boxSize="120px" />
        </Flex>
        
        {/* Nome centralizado */}
        <Flex justify="center" flex="2">
          <Heading size="lg" color="white" textAlign="center">
            Projeto Futevôlei do Lago
          </Heading>
        </Flex>
        
        {/* Copyright à direita */}
        <Flex align="center" justify="flex-end" flex="1">
          <Text color="white" fontSize="sm">
            &copy; 2025 Todos os direitos reservados
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;