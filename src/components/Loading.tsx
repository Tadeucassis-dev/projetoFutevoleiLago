import { 
  Spinner, 
  Center, 
  Box, 
  Text, 
  VStack,
  useColorModeValue 
} from '@chakra-ui/react';

interface LoadingProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  fullScreen?: boolean;
}

function Loading({ 
  size = 'xl', 
  message = 'Carregando...', 
  fullScreen = false 
}: LoadingProps) {
  const textColor = useColorModeValue('gray.600', 'gray.300');
  
  const content = (
    <VStack spacing={4}>
      <Spinner 
        size={size} 
        color="blue.500" 
        thickness="4px"
        speed="0.65s"
      />
      {message && (
        <Text color={textColor} fontSize="sm">
          {message}
        </Text>
      )}
    </VStack>
  );

  if (fullScreen) {
    return (
      <Center minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
        {content}
      </Center>
    );
  }

  return (
    <Center p={8}>
      {content}
    </Center>
  );
}

export default Loading;