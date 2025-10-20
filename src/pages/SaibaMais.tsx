import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  Icon,
  Card,
  CardBody,
  Button,
  Image,
  Badge,
  List,
  ListItem,
  ListIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaVolleyballBall,
  FaUsers,
  FaSchool,
  FaMapMarkerAlt,
  FaClock,
  FaHeart,
  FaArrowLeft,
  FaCheckCircle,
  FaChild,
  FaGraduationCap,
  FaHome,
  FaCalendarAlt,
  FaTrophy,
  FaHandsHelping,
  FaLeaf,
  FaCity,
  FaStar,
  FaChartLine,
  FaAward,
  FaBookOpen,
  FaRunning,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

function SaibaMais() {
  const navigate = useNavigate();

  // Cores baseadas no tema do projeto
  const bgGradient = useColorModeValue(
    "linear(to-br, brand.100, sky.100, accent.100)",
    "linear(to-br, brand.900, sky.900, accent.900)"
  );
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const headingColor = useColorModeValue("gray.800", "white");

  const handleBackClick = () => {
    navigate("/");
  };

  const handleCadastroClick = () => {
    navigate("/cadastro");
  };

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      <Header />

      <Box pt="50px">
        {/* Hero Section */}
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          bg="gray.900"
        >
          <Box
            bgColor={"black.900"}
            bgGradient="linear(135deg, brand.500 0%, accent.500 50%, brand.500 100%)"
            color="black"
            py={20}
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
            }}
          >
            <Container maxW="7xl" position="relative" zIndex={1}>
              <VStack spacing={10} textAlign="center">
                <MotionBox variants={fadeInUp}>
                  <HStack justify="center" mb={8}></HStack>
                  <Heading
                    size="3xl"
                    mb={6}
                    fontWeight="900"
                    textShadow="0 2px 4px rgba(0,0,0,0.3)"
                    color="white"
                  >
                    Conheça Mais Sobre o{" "}
                    <Text
                      as="span"
                      color="accent.200"
                      textShadow="0 2px 4px rgba(0,0,0,0.5)"
                    >
                      Futevôlei do Lago
                    </Text>
                  </Heading>
                  <Text
                    fontSize="2xl"
                    maxW="4xl"
                    mx="auto"
                    fontWeight="600"
                    textShadow="0 1px 2px rgba(0,0,0,0.2)"
                    color="white"
                  >
                    Um projeto social que transforma vidas através do esporte
                  </Text>
                </MotionBox>
              </VStack>
            </Container>
          </Box>
        </MotionBox>

        {/* Estatísticas do Projeto */}
        <Box
          py={10}
          bg={cardBg}
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(34, 139, 34, 0.1) 0%, transparent 50%)",
            zIndex: 0,
          }}
        >
          <Container maxW="7xl" position="relative" zIndex={1}>
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <VStack spacing={16}>
                {/* Título da Seção */}
                <MotionBox variants={fadeInUp} textAlign="center">
                  <Heading
                    size="2xl"
                    color={headingColor}
                    fontWeight="bold"
                    mb={4}
                  >
                    Impacto do{" "}
                    <Text as="span" color="brand.500">
                      Projeto
                    </Text>
                  </Heading>
                  <Text fontSize="xl" color={textColor} maxW="3xl" mx="auto">
                    Números que mostram como estamos transformando a comunidade
                  </Text>
                </MotionBox>

                {/* Estatísticas */}
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 4 }}
                  spacing={8}
                  w="full"
                >
                  <MotionCard
                    variants={fadeInUp}
                    bg={cardBg}
                    border="1px solid"
                    borderColor="brand.200"
                    _hover={{
                      boxShadow: "0 20px 40px rgba(34, 139, 34, 0.2)",
                      transform: "translateY(-5px)",
                      borderColor: "brand.400",
                    }}
                    transition="all 0.3s ease"
                  >
                    <CardBody
                      textAlign="center"
                      p={8}
                      bgColor={"yellow.300"}
                    >
                      <Icon
                        as={FaUsers}
                        boxSize={12}
                        color="brand.500"
                        mb={4}
                      />
                      <Stat>
                        <StatNumber
                          fontSize="3xl"
                          color={headingColor}
                          fontWeight="bold"
                        >
                          500+
                        </StatNumber>
                        <StatLabel color={textColor} fontSize="lg">
                          Crianças Atendidas
                        </StatLabel>
                        <StatHelpText color="brand.500">
                          Desde 2020
                        </StatHelpText>
                      </Stat>
                    </CardBody>
                  </MotionCard>

                  <MotionCard
                    variants={fadeInUp}
                    bg={cardBg}
                    border="1px solid"
                    borderColor="brand.200"
                    _hover={{
                      boxShadow: "0 20px 40px rgba(34, 139, 34, 0.2)",
                      transform: "translateY(-5px)",
                      borderColor: "brand.400",
                    }}
                    transition="all 0.3s ease"
                  >
                    <CardBody
                      textAlign="center"
                      p={8}
  
                      bgColor={"yellow.300"}
                    >
                      {" "}
                      <Icon
                        as={FaMapMarkerAlt}
                        boxSize={12}
                        color="accent.500"
                        mb={4}
                      />
                      <Stat>
                        <StatNumber
                          fontSize="3xl"
                          color={headingColor}
                          fontWeight="bold"
                        >
                          15
                        </StatNumber>
                        <StatLabel color={textColor} fontSize="lg">
                          Arenas Parceiras
                        </StatLabel>
                        <StatHelpText color="accent.500">
                          Em Cidade Ocidental
                        </StatHelpText>
                      </Stat>
                    </CardBody>
                  </MotionCard>

                  <MotionCard
                    variants={fadeInUp}
                    bg={cardBg}
                    border="1px solid"
                    borderColor="brand.200"
                    _hover={{
                      boxShadow: "0 20px 40px rgba(34, 139, 34, 0.2)",
                      transform: "translateY(-5px)",
                      borderColor: "brand.400",
                    }}
                    transition="all 0.3s ease"
                  >
                    <CardBody
                      textAlign="center"
                      p={8}
  
                      bgColor={"yellow.300"}
                    >
                      {" "}
                      <Icon as={FaTrophy} boxSize={12} color="sky.500" mb={4} />
                      <Stat>
                        <StatNumber
                          fontSize="3xl"
                          color={headingColor}
                          fontWeight="bold"
                        >
                          25
                        </StatNumber>
                        <StatLabel color={textColor} fontSize="lg">
                          Competições
                        </StatLabel>
                        <StatHelpText color="sky.500">Organizadas</StatHelpText>
                      </Stat>
                    </CardBody>
                  </MotionCard>

                  <MotionCard
                    variants={fadeInUp}
                    bg={cardBg}
                    border="1px solid"
                    borderColor="brand.200"
                    _hover={{
                      boxShadow: "0 20px 40px rgba(34, 139, 34, 0.2)",
                      transform: "translateY(-5px)",
                      borderColor: "brand.400",
                    }}
                    transition="all 0.3s ease"
                  >
                    <CardBody
                      textAlign="center"
                      p={8}
  
                      bgColor={"yellow.300"}
                    >
                      {" "}
                      <Icon
                        as={FaAward}
                        boxSize={12}
                        color="brand.500"
                        mb={4}
                      />
                      <Stat>
                        <StatNumber
                          fontSize="3xl"
                          color={headingColor}
                          fontWeight="bold"
                        >
                          95%
                        </StatNumber>
                        <StatLabel color={textColor} fontSize="lg">
                          Satisfação
                        </StatLabel>
                        <StatHelpText color="brand.500">
                          Dos participantes
                        </StatHelpText>
                      </Stat>
                    </CardBody>
                  </MotionCard>
                </SimpleGrid>

                {/* Metodologia */}
                <MotionCard
                  variants={fadeInUp}
                  w="full"
                  bg={cardBg}
                  border="1px solid"
                  borderColor="brand.200"
                  _hover={{
                    boxShadow: "0 25px 50px rgba(34, 139, 34, 0.2)",
                    transform: "translateY(-5px)",
                    borderColor: "brand.400",
                  }}
                  transition="all 0.3s ease"
                >
                  <CardBody p={12} bgColor={"yellow.300"}>
                    <VStack spacing={8}>
                      <Heading
                        size="xl"
                        color={headingColor}
                        textAlign="center"
                        fontWeight="bold"
                      >
                        Nossa{" "}
                        <Text as="span" color="brand.500">
                          Metodologia
                        </Text>
                      </Heading>

                      <Grid
                        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                        gap={12}
                        w="full"
                      >
                        <VStack spacing={6} align="start">
                          <HStack spacing={4}>
                            <Icon
                              as={FaBookOpen}
                              boxSize={8}
                              color="brand.500"
                            />
                            <Heading size="md" color={headingColor}>
                              Educação Esportiva
                            </Heading>
                          </HStack>
                          <Text color={textColor} lineHeight="tall">
                            Utilizamos o esporte como ferramenta educativa,
                            desenvolvendo não apenas habilidades físicas, mas
                            também valores como disciplina, respeito e trabalho
                            em equipe.
                          </Text>

                          <HStack spacing={4}>
                            <Icon
                              as={FaRunning}
                              boxSize={8}
                              color="accent.500"
                            />
                            <Heading size="md" color={headingColor}>
                              Desenvolvimento Integral
                            </Heading>
                          </HStack>
                          <Text color={textColor} lineHeight="tall">
                            Focamos no desenvolvimento físico, mental e social
                            das crianças, proporcionando uma formação completa
                            através do futevôlei.
                          </Text>
                        </VStack>

                        <VStack spacing={6} align="start">
                          <HStack spacing={4}>
                            <Icon
                              as={FaHandsHelping}
                              boxSize={8}
                              color="sky.500"
                            />
                            <Heading size="md" color={headingColor}>
                              Inclusão Social
                            </Heading>
                          </HStack>
                          <Text color={textColor} lineHeight="tall">
                            Promovemos a inclusão de crianças de diferentes
                            backgrounds socioeconômicos, criando um ambiente de
                            igualdade e oportunidades para todos.
                          </Text>

                          <HStack spacing={4}>
                            <Icon as={FaLeaf} boxSize={8} color="brand.500" />
                            <Heading size="md" color={headingColor}>
                              Sustentabilidade
                            </Heading>
                          </HStack>
                          <Text color={textColor} lineHeight="tall">
                            Educamos sobre consciência ambiental e
                            sustentabilidade, utilizando materiais recicláveis e
                            promovendo o cuidado com o meio ambiente.
                          </Text>
                        </VStack>
                      </Grid>
                    </VStack>
                  </CardBody>
                </MotionCard>

                {/* FAQ */}
                <MotionBox variants={fadeInUp} w="full" >
                  <Heading
                    size="xl"
                    color={headingColor}
                    textAlign="center"
                    fontWeight="bold"
                    mb={8}
                  >
                    Perguntas{" "}
                    <Text as="span" color="brand.500">
                      Frequentes
                    </Text>
                  </Heading>

                  <Accordion allowMultiple>
                    <AccordionItem
                      border="1px solid"
                      borderColor="brand.200"
                      borderRadius="lg"
                      mb={4}
                      bg={cardBg}
                    >
                      <AccordionButton
                        color="white"
                        bgColor={"yellow.300"}
                        _hover={{ bg: "brand.50" }}
                        py={4}
                      >
                        <Box flex="1" textAlign="left">
                          <Text
                            color={headingColor}
                            fontWeight="bold"
                            fontSize="lg"
                            
                          >
                            Como posso inscrever meu filho no projeto?
                          </Text>
                        </Box>
                        <AccordionIcon color="brand.500" />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <Text color={textColor} lineHeight="tall">
                          A inscrição é feita através do nosso site. Basta
                          preencher o formulário de cadastro com os dados da
                          criança. Após a análise, entraremos em contato para
                          confirmar a vaga e informar a arena mais próxima.
                        </Text>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem
                      border="1px solid"
                      borderColor="brand.200"
                      borderRadius="lg"
                      mb={4}
                      bg={cardBg}
                    >
                      <AccordionButton
                        color="white"
                        bgColor={"yellow.300"}
                        _hover={{ bg: "brand.50" }}
                        py={4}
                      >
                        <Box flex="1" textAlign="left">
                          <Text
                            color={headingColor}
                            fontWeight="bold"
                            fontSize="lg"
                            
                          >
                            Qual é a idade mínima e máxima para participar?
                          </Text>
                        </Box>
                        <AccordionIcon color="brand.500" />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <Text color={textColor} lineHeight="tall">
                          O projeto atende crianças e adolescentes de 8 a 14
                          anos, que estejam matriculados em escolas públicas de
                          Cidade Ocidental - GO.
                        </Text>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem
                      border="1px solid"
                      borderColor="brand.200"
                      borderRadius="lg"
                      mb={4}
                      bg={cardBg}
                    >
                      <AccordionButton
                        color="white"
                        bgColor={"yellow.300"}
                        _hover={{ bg: "brand.50" }}
                        py={4}
                      >
                        <Box flex="1" textAlign="left">
                          <Text
                            color={headingColor}
                            fontWeight="bold"
                            fontSize="lg"
                            
                          >
                            As aulas são gratuitas?
                          </Text>
                        </Box>
                        <AccordionIcon color="brand.500" />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <Text color={textColor} lineHeight="tall">
                          Sim! O projeto é 100% gratuito para todas as crianças
                          participantes. Nosso objetivo é democratizar o acesso
                          ao esporte e à educação através do futevôlei.
                        </Text>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem
                      border="1px solid"
                      borderColor="brand.200"
                      borderRadius="lg"
                      mb={4}
                      bg={cardBg}
                    >
                      <AccordionButton
                        color="white"
                        bgColor={"yellow.300"}
                        _hover={{ bg: "brand.50" }}
                        py={4}
                      >
                        <Box flex="1" textAlign="left">
                          <Text
                            color={headingColor}
                            fontWeight="bold"
                            fontSize="lg"
                           
                          >
                            Quais materiais são necessários?
                          </Text>
                        </Box>
                        <AccordionIcon color="brand.500" />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <Text color={textColor} lineHeight="tall">
                          Fornecemos todos os equipamentos necessários para a
                          prática do futevôlei. As crianças precisam apenas usar
                          roupas confortáveis para atividade física e trazer uma
                          garrafa de água.
                        </Text>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </MotionBox>

                {/* Call to Action */}
                <MotionBox
                  variants={fadeInUp}
                  textAlign="center"
                  borderRadius={"1px solid"}
                >
                  <VStack spacing={6}>
                    <Heading size="lg" fontWeight="bold">
                      Pronto para Fazer Parte do{" "}
                      <Text as="span" color="brand.500" >
                        Futevôlei do Lago?
                      </Text>
                    </Heading>
                    <Text
                      fontSize="lg"
                      color={textColor}
                      maxW="2xl"
                      lineHeight="tall"
                    >
                      Inscreva seu filho agora e proporcione uma experiência
                      única de crescimento através do esporte!
                    </Text>
                    <HStack spacing={4}>
                      <Button
                        size="lg"
                        bgColor={"black"}
                        color="white"
                        fontWeight="bold"
                        _hover={{
                          bgGradient: "linear(45deg, brand.600, accent.600)",
                          transform: "translateY(-3px)",
                          boxShadow: "0 10px 25px rgba(34, 139, 34, 0.3)",
                        }}
                        boxShadow="0 4px 15px rgba(34, 139, 34, 0.2)"
                        onClick={handleCadastroClick}
                        leftIcon={<FaVolleyballBall />}
                        transition="all 0.3s ease"
                      >
                        Fazer Inscrição
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        borderColor="brand.500"
                        color="brand.500"
                        fontWeight="bold"
                        _hover={{
                          bg: "brand.50",
                          transform: "translateY(-3px)",
                          borderColor: "brand.600",
                          color: "brand.600",
                          boxShadow: "0 10px 25px rgba(34, 139, 34, 0.2)",
                        }}
                        onClick={handleBackClick}
                        leftIcon={<FaArrowLeft />}
                        transition="all 0.3s ease"
                      >
                        Voltar ao Início
                      </Button>
                    </HStack>
                  </VStack>
                </MotionBox>
              </VStack>
            </MotionBox>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default SaibaMais;
