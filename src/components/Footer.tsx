import { Box, Text, Flex } from '@chakra-ui/react';

function Footer() {
  return (
    <Box 
    bg="blue.100" 
    color="blue.100" 
    py={4} 
    mt="auto"
    position="relative"
    bottom={0}
    left={0}
    right={0}
    zIndex={10}
    >
      <Flex maxW="1200px" mx="auto" justify="center">
        <Text color={"black"}>&copy; 2025 Escolinha de Futevôlei. Todos os direitos reservados.</Text>
      </Flex>
    </Box>
  );
}

export default Footer;