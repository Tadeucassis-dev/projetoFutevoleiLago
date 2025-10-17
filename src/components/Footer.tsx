import { Box, Text, Flex, Heading, Image, HStack } from '@chakra-ui/react';

function Footer() {
  return (
    <Box 
      as="footer"
      bg="gray.900" 
      p={{ base: 3, md: '8px' }}
      mt="auto"
      position="relative"
      bottom={0}
      left={0}
      right={0}
      zIndex={10}
      h={{ base: 'auto', md: '85px' }}
    >
      <Flex justify="space-between" align="center" h="100%" maxW="1200px" mx="auto" direction={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 0 }}>
        {/* Logo à esquerda */}
        <Flex align="center" flex={{ base: 'none', md: 1 }}>
          <Image src="/logoftv1.png" alt="Logo" boxSize={{ base: '80px', md: '120px' }} />
        </Flex>
        
        {/* Nome centralizado */}
        <Flex justify="center" flex={{ base: 'none', md: 2 }} mt={{ base: 2, md: 0 }}>
          <Heading color="white" textAlign="center" fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}>
            Projeto Futevôlei do Lago
          </Heading>
        </Flex>
        
        {/* Copyright à direita */}
        <Flex align="center" justify={{ base: 'center', md: 'flex-end' }} flex={{ base: 'none', md: 1 }} mt={{ base: 2, md: 0 }}>
          <Text color="white" fontSize={{ base: 'xs', md: 'sm' }}>
            &copy; 2025 Todos os direitos reservados
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;