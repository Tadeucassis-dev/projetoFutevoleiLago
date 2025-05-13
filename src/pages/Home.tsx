import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Presumindo que você usa react-router para navegação
import React from "react";

export function Home() {
  // Definir cores baseadas no modo claro/escuro
  const bgGradient = useColorModeValue(
    "linear(to-b, blue.100, orange.100)",
    "linear(to-b, blue.900, orange.900)"
  );
  const textColor = useColorModeValue("gray.800", "white");
  const buttonBg = useColorModeValue("Yellow.700", "Yellow.600");
  const buttonHoverBg = useColorModeValue("Yellow.500", "Yellow.400");

  return (
    <Box
      height="100vh"
      bgGradient={bgGradient}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{ base: 4, md: 8 }}
      py={12}
    >
      <VStack spacing={6} textAlign="center" maxW="600px">
        {/* Título */}
        <Heading
          as="h1"
          size={{ base: "2xl", md: "3xl" }}
          color={textColor}
          fontWeight="bold"
          mt={4}
        >
          Bem-vindo ao Projeto Social Futevôlei do Lago
        </Heading>

        <Text
          fontSize={{ base: "md", md: "lg" }}
          color={textColor}
          lineHeight="1.6"
        >
          O Projeto Social Futevôlei do Lago promove inclusão, saúde e diversão
          através do esporte! Junte-se a nós para transformar vidas e fortalecer
          a comunidade ao redor do lago com a energia do futevôlei.
        </Text>

        <Image
          src="../../public/logoftv1.png"
          alt="Futevôlei do Lago"
          mt={2}
          maxW={{ base: "100%", sm: "300px" }}
        />
        <Button
          bgColor={"yellow.500"}
          as={Link}
          to="/register"
          bg={buttonBg}
          color="white"
          size="lg"
          fontWeight="bold"
          _hover={{ bg: buttonHoverBg }}
          px={8}
          py={6}
        >
          Inscreva-se Agora
        </Button>
      </VStack>
    </Box>
  );
}
