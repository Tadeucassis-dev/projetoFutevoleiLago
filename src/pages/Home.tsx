import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaEnvelope, FaMapMarkerAlt, FaPhone, FaWhatsapp } from "react-icons/fa";
import React, { useEffect } from "react";

export function Home() {
  // Definir cores baseadas no modo claro/escuro
  const bgGradient = useColorModeValue(
    "linear(to-b, blue.100, orange.100)",
    "linear(to-b, blue.900, orange.900)"
  );
  const sectionBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const accentColor = useColorModeValue("yellow.500", "yellow.400");
  const buttonBg = useColorModeValue("yellow.500", "yellow.400");
  const buttonHoverBg = useColorModeValue("yellow.600", "yellow.500");
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const inputBg = useColorModeValue("white", "gray.800");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");

  // Efeito de scroll suave para as âncoras
  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        const targetElement = document.querySelector(targetId!);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <Box>
      {/* Seção Hero */}
      <Box
        id="home"
        height="100vh"
        bgGradient={bgGradient}
        display="flex"
        alignItems="center"
        position="relative"
        overflow="hidden"
      >
        <Container maxW="container.xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            pt={{ base: "20", md: "0" }}
          >
            <VStack
              spacing={6}
              textAlign={{ base: "center", md: "left" }}
              align={{ base: "center", md: "flex-start" }}
              maxW={{ base: "100%", md: "50%" }}
              mb={{ base: 12, md: 0 }}
            >
              <Heading
                as="h1"
                size={{ base: "2xl", md: "3xl", lg: "4xl" }}
                color={textColor}
                fontWeight="bold"
                lineHeight="1.2"
              >
                Projeto Social Futevôlei do Lago
              </Heading>

              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color={textColor}
                lineHeight="1.8"
              >
                Promovendo inclusão, saúde e diversão através do esporte! Junte-se a nós para transformar vidas e fortalecer a comunidade ao redor do lago com a energia do futevôlei.
              </Text>

              <HStack spacing={4} pt={4}>
                <Button
                  as={Link}
                  to="/form"
                  bg={buttonBg}
                  color="white"
                  size="lg"
                  fontWeight="bold"
                  _hover={{ bg: buttonHoverBg }}
                  px={8}
                  py={6}
                  rounded="md"
                >
                  Inscreva-se Agora
                </Button>
                <Button
                  as={ChakraLink}
                  href="#sobre"
                  variant="outline"
                  size="lg"
                  fontWeight="bold"
                  borderColor={accentColor}
                  color={textColor}
                  _hover={{ bg: "rgba(255,255,255,0.1)" }}
                  px={8}
                  py={6}
                  rounded="md"
                >
                  Saiba Mais
                </Button>
              </HStack>
            </VStack>

            <Box
              maxW={{ base: "300px", md: "450px" }}
              w="full"
              overflow="hidden"
              borderRadius="xl"
              boxShadow="2xl"
            >
              <Image
                src="/logoftv1.png"
                alt="Futevôlei do Lago"
                w="full"
                h="full"
                objectFit="cover"
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Seção Sobre */}
      <Box id="sobre" py={20} bg={sectionBg}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
              <Heading
                as="h2"
                size="2xl"
                color={textColor}
                fontWeight="bold"
              >
                Sobre o Projeto
              </Heading>
              <Text fontSize="lg" color={textColor} opacity={0.8}>
                Conheça mais sobre nossa iniciativa e como estamos transformando vidas através do esporte
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="full">
              <Box>
                <Image
                  src="/logoftv1.png"
                  alt="Futevôlei na prática"
                  borderRadius="lg"
                  boxShadow="lg"
                  w="full"
                  h="auto"
                />
              </Box>
              <VStack align="flex-start" spacing={6} justifyContent="center">
                <Heading as="h3" size="lg" color={textColor}>
                  Nossa Missão
                </Heading>
                <Text fontSize="md" color={textColor}>
                  O Projeto Social Futevôlei do Lago nasceu da paixão pelo esporte e do desejo de criar oportunidades para crianças e jovens da nossa comunidade. Nosso objetivo é utilizar o futevôlei como ferramenta de transformação social, promovendo valores como disciplina, trabalho em equipe, respeito e superação.
                </Text>
                <Text fontSize="md" color={textColor}>
                  Através de aulas regulares, eventos e competições, buscamos não apenas formar atletas, mas cidadãos conscientes e preparados para os desafios da vida. Acreditamos que o esporte tem o poder de mudar trajetórias e construir um futuro melhor para todos.
                </Text>
                <VStack spacing={4} align="flex-start" pt={2}>
                  <HStack spacing={4}>
                    <Icon as={FaCheckCircle} color={accentColor} boxSize={5} />
                    <Text fontWeight="bold">Aulas gratuitas para a comunidade</Text>
                  </HStack>
                  <HStack spacing={4}>
                    <Icon as={FaCheckCircle} color={accentColor} boxSize={5} />
                    <Text fontWeight="bold">Professores qualificados</Text>
                  </HStack>
                  <HStack spacing={4}>
                    <Icon as={FaCheckCircle} color={accentColor} boxSize={5} />
                    <Text fontWeight="bold">Equipamentos de qualidade</Text>
                  </HStack>
                </VStack>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Seção Benefícios */}
      <Box py={20} bgGradient={bgGradient}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
              <Heading
                as="h2"
                size="2xl"
                color={textColor}
                fontWeight="bold"
              >
                Benefícios do Futevôlei
              </Heading>
              <Text fontSize="lg" color={textColor} opacity={0.8}>
                Descubra como o futevôlei pode transformar sua vida e saúde
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
              {[
                {
                  title: "Saúde Física",
                  description: "Melhora o condicionamento cardiovascular, fortalece músculos e aumenta a resistência física."
                },
                {
                  title: "Coordenação Motora",
                  description: "Desenvolve reflexos, equilíbrio e coordenação motora através de movimentos dinâmicos."
                },
                {
                  title: "Socialização",
                  description: "Promove a interação social, criando novas amizades e fortalecendo o senso de comunidade."
                },
                {
                  title: "Saúde Mental",
                  description: "Reduz o estresse e a ansiedade, melhorando o bem-estar mental e emocional."
                },
                {
                  title: "Disciplina",
                  description: "Ensina valores como comprometimento, pontualidade e respeito às regras."
                },
                {
                  title: "Diversão",
                  description: "Proporciona momentos de alegria e descontração em um ambiente saudável e estimulante."
                }
              ].map((benefit, index) => (
                <Box
                  key={index}
                  bg={cardBg}
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                  border="1px"
                  borderColor={borderColor}
                  transition="transform 0.3s ease"
                  _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
                >
                  <VStack spacing={4} align="flex-start">
                    <Heading as="h3" size="md" color={textColor}>
                      {benefit.title}
                    </Heading>
                    <Text color={textColor}>{benefit.description}</Text>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Seção Galeria */}
      <Box py={20} bg={sectionBg}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
              <Heading
                as="h2"
                size="2xl"
                color={textColor}
                fontWeight="bold"
              >
                Galeria
              </Heading>
              <Text fontSize="lg" color={textColor} opacity={0.8}>
                Momentos especiais do nosso projeto
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Box
                  key={item}
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="md"
                  transition="transform 0.3s ease"
                  _hover={{ transform: "scale(1.03)", zIndex: 1 }}
                >
                  <Image
                    src="/logoftv1.png"
                    alt={`Galeria ${item}`}
                    w="full"
                    h="250px"
                    objectFit="cover"
                  />
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Seção Depoimentos */}
      <Box py={20} bgGradient={bgGradient}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
              <Heading
                as="h2"
                size="2xl"
                color={textColor}
                fontWeight="bold"
              >
                Depoimentos
              </Heading>
              <Text fontSize="lg" color={textColor} opacity={0.8}>
                O que dizem sobre nosso projeto
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {[
                {
                  name: "Maria Silva",
                  role: "Mãe de aluno",
                  text: "O projeto transformou a vida do meu filho. Ele está mais disciplinado, fez novos amigos e melhorou até na escola!"
                },
                {
                  name: "João Pedro",
                  role: "Aluno, 14 anos",
                  text: "Eu amo as aulas de futevôlei! Os professores são muito legais e aprendi muitas coisas novas. É o melhor dia da semana!"
                },
                {
                  name: "Carlos Mendes",
                  role: "Voluntário",
                  text: "Participar deste projeto como voluntário tem sido uma experiência incrível. Ver o desenvolvimento das crianças é muito gratificante."
                }
              ].map((testimonial, index) => (
                <Box
                  key={index}
                  bg={cardBg}
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                  border="1px"
                  borderColor={borderColor}
                >
                  <VStack spacing={4} align="flex-start">
                    <Text fontSize="md" fontStyle="italic" color={textColor}>
                      "{testimonial.text}"
                    </Text>
                    <HStack spacing={2}>
                      <Box
                        w="40px"
                        h="40px"
                        borderRadius="full"
                        bg={accentColor}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontWeight="bold"
                      >
                        {testimonial.name.charAt(0)}
                      </Box>
                      <VStack spacing={0} align="flex-start">
                        <Text fontWeight="bold" color={textColor}>
                          {testimonial.name}
                        </Text>
                        <Text fontSize="sm" color={textColor} opacity={0.8}>
                          {testimonial.role}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Seção Contato */}
      <Box id="contato" py={20} bg={sectionBg}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
              <Heading
                as="h2"
                size="2xl"
                color={textColor}
                fontWeight="bold"
              >
                Entre em Contato
              </Heading>
              <Text fontSize="lg" color={textColor} opacity={0.8}>
                Estamos à disposição para esclarecer suas dúvidas
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <VStack spacing={6} align="flex-start">
                <Heading as="h3" size="lg" color={textColor}>
                  Informações de Contato
                </Heading>
                <Text color={textColor}>
                  Entre em contato conosco para mais informações sobre o projeto, inscrições ou parcerias. Estamos sempre à disposição para atender você!
                </Text>

                <HStack spacing={4}>
                  <Icon as={FaPhone} color={accentColor} boxSize={5} />
                  <Text color={textColor}>(61) 98765-4321</Text>
                </HStack>
                <HStack spacing={4}>
                  <Icon as={FaWhatsapp} color={accentColor} boxSize={5} />
                  <Text color={textColor}>(61) 98765-4321</Text>
                </HStack>
                <HStack spacing={4}>
                  <Icon as={FaEnvelope} color={accentColor} boxSize={5} />
                  <Text color={textColor}>contato@futevoleidolago.com.br</Text>
                </HStack>
                <HStack spacing={4}>
                  <Icon as={FaMapMarkerAlt} color={accentColor} boxSize={5} />
                  <Text color={textColor}>Lago Norte, Brasília - DF</Text>
                </HStack>
              </VStack>

              <Box
                bg={cardBg}
                p={8}
                borderRadius="lg"
                boxShadow="md"
                border="1px"
                borderColor={borderColor}
              >
                <VStack as="form" spacing={6}>
                  <FormField label="Nome" placeholder="Seu nome completo" />
                  <FormField label="Email" placeholder="seu@email.com" type="email" />
                  <FormField label="Telefone" placeholder="(00) 00000-0000" />
                  <FormField
                    label="Mensagem"
                    placeholder="Escreva sua mensagem aqui..."
                    textarea
                  />
                  <Button
                    type="submit"
                    bg={buttonBg}
                    color="white"
                    size="lg"
                    fontWeight="bold"
                    _hover={{ bg: buttonHoverBg }}
                    w="full"
                  >
                    Enviar Mensagem
                  </Button>
                </VStack>
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Seção CTA Final */}
      <Box py={16} bgGradient={bgGradient} textAlign="center">
        <Container maxW="container.md">
          <VStack spacing={8}>
            <Heading
              as="h2"
              size="xl"
              color={textColor}
              fontWeight="bold"
            >
              Faça Parte Dessa História!
            </Heading>
            <Text fontSize="lg" color={textColor} maxW="600px" mx="auto">
              Inscreva-se agora mesmo e venha transformar sua vida através do futevôlei. Vagas limitadas!
            </Text>
            <Button
              as={Link}
              to="/form"
              bg={buttonBg}
              color="white"
              size="lg"
              fontWeight="bold"
              _hover={{ bg: buttonHoverBg }}
              px={10}
              py={7}
              rounded="md"
            >
              Inscreva-se Agora
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}

// Componente auxiliar para campos de formulário
function FormField({ 
  label, 
  placeholder, 
  type = "text", 
  textarea = false 
}: {
  label: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
}) {
  const inputBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  
  return (
    <Box w="full">
      <Text mb={2} fontWeight="medium">{label}</Text>
      {textarea ? (
        <Box
          as="textarea"
          placeholder={placeholder}
          p={3}
          borderRadius="md"
          border="1px"
          borderColor={borderColor}
          bg={inputBg}
          rows={4}
          w="full"
          _focus={{
            borderColor: "yellow.500",
            boxShadow: "0 0 0 1px yellow.500",
          }}
        />
      ) : (
        <Box
          as="input"
          type={type}
          placeholder={placeholder}
          p={3}
          borderRadius="md"
          border="1px"
          borderColor={borderColor}
          bg={inputBg}
          w="full"
          _focus={{
            borderColor: "yellow.500",
            boxShadow: "0 0 0 1px yellow.500",
          }}
        />
      )}
    </Box>
  );
}
