import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
  GridItem,
  Image,
  Card,
  CardBody,
  Icon,
  Flex,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Badge,
  Avatar,
  Divider,
  Stack,
  Center,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaVolleyballBall,
  FaUsers,
  FaTrophy,
  FaHeart,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaPlay,
  FaArrowRight,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaCity,
  FaHandsHelping,
  FaLeaf,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Importações das fotos do projeto
import logoftv1 from "../assets/logoftv1.png";
import foto101 from "../assets/FVDL-101.jpg";
import foto107 from "../assets/FVDL-107.jpg";
import foto111 from "../assets/FVDL-111.jpg";

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionImage = motion(Image);

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

const scaleOnHover = {
  whileHover: { scale: 1.05, transition: { duration: 0.3 } },
  whileTap: { scale: 0.95 },
};

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <MotionBox
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={staggerContainer}
    >
      {children}
    </MotionBox>
  );
};

function Home() {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  // Estado do modal para galeria
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState("");

  // Função para abrir modal com imagem selecionada
  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    onOpen();
  };

  // Cores baseadas na identidade de Cidade Ocidental
  const bgGradient = useColorModeValue(
    "linear(to-br, brand.100, sky.100, accent.100)",
    "linear(to-br, brand.900, sky.900, accent.900)"
  );
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  // Funções de navegação
  const handleCadastroClick = () => {
    navigate("/cadastro");
  };

  const handleAdminClick = () => {
    navigate("/login");
  };

  const handleSaibaMaisClick = () => {
    navigate("/saiba-mais");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setFormData({ nome: "", email: "", telefone: "", mensagem: "" });
  };

  const benefits = [
    {
      icon: FaHeart,
      title: "Saúde e Bem-estar",
      description: "Atividade física completa que fortalece corpo e mente",
      image: foto101,
    },
    {
      icon: FaUsers,
      title: "Inclusão Social",
      description: "Promovemos integração e amizades duradouras",
      image: foto107,
    },
    {
      icon: FaTrophy,
      title: "Desenvolvimento Pessoal",
      description: "Construa confiança e disciplina através do esporte",
      image: foto111,
    },
    {
      icon: FaVolleyballBall,
      title: "Técnica Profissional",
      description: "Aprenda com instrutores qualificados e experientes",
      image: foto107,
    },
  ];

  const testimonials = [
    {
      name: "Ana Silva",
      age: 28,
      text: "Transformou minha vida! Encontrei amigos incríveis e melhorei muito minha condição física.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Carlos Oliveira",
      age: 35,
      text: "Projeto social fantástico! Meus filhos adoram e eu também me divirto muito aqui.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Mariana Costa",
      age: 22,
      text: "Ambiente acolhedor e professores dedicados. Recomendo para toda a família!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Roberto Mendes",
      age: 29,
      text: "Projeto incrível! A qualidade dos treinadores e a estrutura são excepcionais.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Juliana Rocha",
      age: 26,
      text: "Aqui encontrei muito mais que um esporte, encontrei uma família que me apoia sempre.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    },
  ];

  const galleryImages = [foto101, foto107, foto111];

  return (
    <Box>
      <Header />

      {/* Adicionar padding-top para compensar o header fixo */}
      <Box pt="10px">
        {/* Hero Section */}
        <AnimatedSection>
          <Box
            minH="100vh"
            bgGradient={bgGradient}
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={{ base: 4, md: 8 }}
            py={10}
          >
            <Container maxW="1200px">
              <Grid
                templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                gap={12}
                alignItems="center"
              >
                <VStack spacing={8} align="start">
                  <MotionBox variants={fadeInUp}>
                    <Heading
                      as="h1"
                      size="2xl"
                      fontWeight="bold"
                      color="gray.800"
                      lineHeight="shorter"
                    >
                      Transforme sua vida através do{" "}
                      <Text as="span" color="yellow.500">
                        Futevôlei
                      </Text>
                    </Heading>
                  </MotionBox>

                  <MotionBox variants={fadeInUp}>
                    <Text fontSize="xl" color="gray.600" lineHeight="tall">
                      Junte-se à nossa comunidade e descubra o poder
                      transformador do esporte. Saúde, amizade e diversão em um
                      só lugar!
                    </Text>
                  </MotionBox>

                  <MotionBox variants={fadeInUp}>
                    <HStack spacing={4}>
                      <Button
                        bg="gray.900"
                        color="white"
                        size="lg"
                        colorScheme="yellow"
                        rightIcon={<FaArrowRight />}
                        onClick={handleCadastroClick}
                        {...scaleOnHover}
                      >
                        Inscreva-se Agora
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        colorScheme="gray.900"
                        leftIcon={<FaPlay />}
                        onClick={handleSaibaMaisClick}
                        {...scaleOnHover}
                      >
                        Saiba Mais
                      </Button>
                    </HStack>
                  </MotionBox>
                </VStack>

                <MotionBox variants={fadeInUp}>
                  <Image
                    src={logoftv1}
                    alt="Futevôlei do Lago - Projeto Social"
                    borderRadius="2xl"
                    boxShadow="2xl"
                    animation={`${float} 6s ease-in-out infinite`}
                    maxW="600px"
                    maxH="500px"
                    objectFit="cover"
                  />
                </MotionBox>
              </Grid>
            </Container>
          </Box>
        </AnimatedSection>

        {/* Benefits Section */}
        <AnimatedSection>
          <Box py={2} px={{ base: 4, md: 8 }} bg="white">
            <Container maxW="1200px">
              <VStack spacing={16}>
                <VStack spacing={4} textAlign="center">
                  <Heading size="xl" color="gray.800">
                    Por que escolher nossa escolinha?
                  </Heading>
                  <Text fontSize="lg" color="gray.600" maxW="600px">
                    Oferecemos muito mais que aulas de futevôlei. Criamos uma
                    experiência completa de desenvolvimento pessoal e social.
                  </Text>
                </VStack>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
                  {benefits.map((benefit, index) => (
                    <MotionCard
                      key={index}
                      variants={fadeInUp}
                      {...scaleOnHover}
                      overflow="hidden"
                      boxShadow="lg"
                      borderRadius="xl"
                    >
                      <Image
                        src={benefit.image}
                        alt={benefit.title}
                        h="200px"
                        w="full"
                        objectFit="cover"
                      />
                      <CardBody>
                        <VStack spacing={3} align="start">
                          <Icon
                            as={benefit.icon}
                            boxSize={8}
                            color="yellow.500"
                          />
                          <Heading size="md" color="gray.800">
                            {benefit.title}
                          </Heading>
                          <Text color="gray.600">{benefit.description}</Text>
                        </VStack>
                      </CardBody>
                    </MotionCard>
                  ))}
                </SimpleGrid>
              </VStack>
            </Container>
          </Box>
        </AnimatedSection>

        {/* Testimonials Section */}
        <AnimatedSection>
          <Box py={20} px={{ base: 4, md: 8 }} bgGradient={bgGradient}>
            <Container maxW="1200px">
              <VStack spacing={16}>
                <VStack spacing={4} textAlign="center">
                  <Heading size="xl" color="gray.800">
                    Depoimentos
                  </Heading>
                  <Text fontSize="lg" color="gray.600" maxW="600px">
                    Veja o que nossos alunos têm a dizer sobre sua experiência
                    conosco
                  </Text>
                </VStack>

                <Grid>
                  {/* Coluna 1 - Primeiros 5 depoimentos */}
                  <HStack spacing={6}>
                    {testimonials.slice(0, 5).map((testimonial, index) => (
                      <MotionCard
                        key={index}
                        variants={fadeInUp}
                        {...scaleOnHover}
                        w="full"
                        boxShadow="lg"
                        borderRadius="xl"
                        bg="white"
                      >
                        <CardBody>
                          <VStack spacing={4} align="start">
                            <HStack spacing={1}>
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Icon key={i} as={FaStar} color="yellow.400" />
                              ))}
                            </HStack>
                            <Text color="gray.700" fontStyle="italic">
                              "{testimonial.text}"
                            </Text>
                            <HStack spacing={3}>
                              <Avatar src={testimonial.avatar} size="sm" />
                              <VStack spacing={0} align="start">
                                <Text fontWeight="bold" color="gray.800">
                                  {testimonial.name}
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                  {testimonial.age} anos
                                </Text>
                              </VStack>
                            </HStack>
                          </VStack>
                        </CardBody>
                      </MotionCard>
                    ))}
                  </HStack>

                  {/* Coluna 2 - Últimos 5 depoimentos */}
                  <VStack spacing={6}>
                    {testimonials.slice(5, 10).map((testimonial, index) => (
                      <MotionCard
                        key={index + 5}
                        variants={fadeInUp}
                        {...scaleOnHover}
                        w="full"
                        boxShadow="lg"
                        borderRadius="xl"
                        bg="white"
                      >
                        <CardBody>
                          <VStack spacing={4} align="start">
                            <HStack spacing={1}>
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Icon key={i} as={FaStar} color="yellow.400" />
                              ))}
                            </HStack>
                            <Text color="gray.700" fontStyle="italic">
                              "{testimonial.text}"
                            </Text>
                            <HStack spacing={3}>
                              <Avatar src={testimonial.avatar} size="sm" />
                              <VStack spacing={0} align="start">
                                <Text fontWeight="bold" color="gray.800">
                                  {testimonial.name}
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                  {testimonial.age} anos
                                </Text>
                              </VStack>
                            </HStack>
                          </VStack>
                        </CardBody>
                      </MotionCard>
                    ))}
                  </VStack>
                </Grid>
              </VStack>
            </Container>
          </Box>
        </AnimatedSection>

        {/* Gallery Section */}
        <AnimatedSection>
          <Box py={20} px={{ base: 4, md: 8 }} bg="white">
            <Container maxW="1200px">
              <VStack spacing={16}>
                <VStack spacing={4} textAlign="center">
                  <Heading size="xl" color="gray.800">
                    Nossa Galeria
                  </Heading>
                  <Text fontSize="lg" color="gray.600" maxW="600px">
                    Momentos especiais capturados durante nossas atividades
                  </Text>
                </VStack>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {galleryImages.map((image, index) => (
                    <MotionImage
                      key={index}
                      src={image}
                      alt={`Galeria ${index + 1}`}
                      borderRadius="xl"
                      boxShadow="lg"
                      variants={fadeInUp}
                      {...scaleOnHover}
                      cursor="pointer"
                    />
                  ))}
                </SimpleGrid>
              </VStack>
            </Container>
          </Box>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection>
          <Box py={20} px={{ base: 4, md: 8 }} bgGradient={bgGradient}>
            <Container maxW="1200px">
              <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={12}>
                <VStack spacing={8} align="start">
                  <VStack spacing={4} align="start">
                    <Heading size="xl" color="gray.800">
                      Entre em Contato
                    </Heading>
                    <Text fontSize="lg" color="gray.600">
                      Estamos aqui para responder suas dúvidas e ajudar você a
                      começar sua jornada no futevôlei.
                    </Text>
                  </VStack>

                  <VStack spacing={4} align="start">
                    <HStack spacing={3}>
                      <Icon as={FaMapMarkerAlt} color="gray.900" boxSize={5} />
                      <Text color="gray.700">
                        quadra do lago jacob, Cidade Ocidental - GO
                      </Text>
                    </HStack>
                    <HStack spacing={3}>
                      <Icon as={FaPhone} color="gray.900" boxSize={5} />
                      <Text color="gray.700">(61) 98579-5880</Text>
                    </HStack>
                    <HStack spacing={3}>
                      <Icon as={FaEnvelope} color="gray.900" boxSize={5} />
                      <Text color="gray.700">
                        contato@futevoleidolago.com.br
                      </Text>
                    </HStack>
                  </VStack>

                  <HStack spacing={4}>
                    <Button
                      leftIcon={<FaInstagram />}
                      colorScheme="pink"
                      variant="outline"
                      size="sm"
                      as="a"
                      href="https://www.instagram.com/futevolei_dolago/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Futevôlei do Lago"
                    >
                      Instagram
                    </Button>
                    <Button
                      leftIcon={<FaFacebook />}
                      color="blue.500"
                      colorScheme="facebook"
                      variant="outline"
                      size="sm"
                      as="a"
                      href="https://www.facebook.com/profile.php?id=61578638000745"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook Futevôlei do Lago"
                    >
                      Facebook
                    </Button>
                    <Button
                      leftIcon={<FaWhatsapp />}
                      colorScheme="whatsapp"
                      color="green.500"
                      variant="outline"
                      size="sm"
                      as="a"
                      href="https://wa.me/5561985785880"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp Futevôlei do Lago"
                    >
                      WhatsApp
                    </Button>
                  </HStack>
                </VStack>

                <Box bg="white" p={8} borderRadius="xl" boxShadow="lg">
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={6}>
                      <Heading size="lg" color="gray.800" textAlign="center">
                        Envie uma Mensagem
                      </Heading>

                      <FormControl isRequired>
                        <FormLabel>Nome</FormLabel>
                        <Input
                          name="name"
                          value={formData.nome}
                          onChange={handleInputChange}
                          placeholder="Seu nome completo"
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="seu@email.com"
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel>Telefone</FormLabel>
                        <Input
                          name="phone"
                          value={formData.telefone}
                          onChange={handleInputChange}
                          placeholder="(61) 99999-9999"
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel>Mensagem</FormLabel>
                        <Textarea
                          name="message"
                          value={formData.mensagem}
                          onChange={handleInputChange}
                          placeholder="Sua mensagem..."
                          rows={4}
                        />
                      </FormControl>

                      <Button
                        type="submit"
                        bg={"gray.900"}
                        colorScheme="gray.900"
                        size="lg"
                        w="full"
                        rightIcon={<FaArrowRight />}
                      >
                        Enviar Mensagem
                      </Button>
                    </VStack>
                  </form>
                </Box>
              </Grid>
            </Container>
          </Box>
        </AnimatedSection>

        {/* CTA Final */}
        <AnimatedSection>
          <Box py={5} px={{ base: 4, md: 8 }} bg="black">
            <Container maxW="800px">
              <VStack spacing={8} textAlign="center">
                <Heading size="xl" color="white">
                  Pronto para começar sua jornada?
                </Heading>
                <Text fontSize="lg" color="yellow.100" maxW="600px">
                  Não perca mais tempo! Junte-se à nossa comunidade e transforme
                  sua vida através do futevôlei.
                </Text>
                <Button
                  size="lg"
                  bg="white"
                  color="black"
                  rightIcon={<FaArrowRight />}
                  onClick={handleCadastroClick}
                  _hover={{ bg: "gray.300" }}
                  animation={`${pulse} 2s infinite`}
                >
                  Fazer Cadastro Agora
                </Button>
              </VStack>
            </Container>
          </Box>
        </AnimatedSection>
      </Box>

      {/* Modal para visualização ampliada das fotos */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent bg="transparent" boxShadow="none" maxW="90vw" maxH="90vh">
          <ModalCloseButton
            color="white"
            size="lg"
            bg="blackAlpha.600"
            _hover={{ bg: "blackAlpha.800" }}
            borderRadius="full"
            top={4}
            right={4}
            zIndex={2}
          />
          <ModalBody
            p={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={selectedImage}
              alt="Futevôlei do Lago - Foto ampliada"
              maxW="100%"
              maxH="100%"
              objectFit="contain"
              borderRadius="lg"
              boxShadow="2xl"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Home;
