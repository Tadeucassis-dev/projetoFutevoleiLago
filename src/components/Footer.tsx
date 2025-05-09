import { Box, Text, Flex } from '@chakra-ui/react';

function Footer() {
  return (
    <Box bg="brand.500" color="white" py={4} mt="auto">
      <Flex maxW="1200px" mx="auto" justify="center">
        <Text>&copy; 2025 Escolinha de Futevôlei. Todos os direitos reservados.</Text>
      </Flex>
    </Box>
  );
}

export default Footer;