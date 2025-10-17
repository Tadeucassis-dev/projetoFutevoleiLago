import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    // Paleta principal - Verde (matas de Goiás)
    brand: {
      50: '#f0f9f0',
      100: '#d9f2d9',
      200: '#b3e6b3',
      300: '#8cd98c',
      400: '#66cc66',
      500: '#228B22', // Verde principal (Forest Green)
      600: '#1e7a1e',
      700: '#1a6b1a',
      800: '#165c16',
      900: '#124d12',
    },
    // Paleta secundária - Amarelo (ouro/riquezas)
    accent: {
      50: '#fffbf0',
      100: '#fef3d9',
      200: '#fde8b3',
      300: '#fcdc8c',
      400: '#fbd065',
      500: '#FFD700', // Dourado principal
      600: '#e6c200',
      700: '#ccad00',
      800: '#b39900',
      900: '#998500',
    },
    // Azul (céu de Goiás)
    sky: {
      50: '#f0f8ff',
      100: '#e0f0ff',
      200: '#b3d9ff',
      300: '#80c2ff',
      400: '#4dabff',
      500: '#1E90FF', // Azul céu principal
      600: '#1a7de6',
      700: '#166acc',
      800: '#1257b3',
      900: '#0e4499',
    },
    // Cores de degradê personalizadas
    gradient: {
      primary: 'linear(to-r, brand.400, brand.600)',
      secondary: 'linear(to-br, accent.400, accent.600)',
      hero: 'linear(135deg, brand.500 0%, sky.500 50%, accent.500 100%)',
      card: 'linear(to-br, brand.50, sky.50)',
      municipal: 'linear(to-r, brand.500, accent.500, sky.500)',
    },
  },
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'brand.50',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'lg',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: { 
            bg: 'brand.600',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
        accent: {
          bg: 'accent.500',
          color: 'gray.800',
          _hover: { 
            bg: 'accent.600',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.500',
            color: 'white',
          },
        },
        ghost: {
          color: 'gray.700',
          _hover: {
            bg: 'brand.100',
            color: 'brand.800',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          boxShadow: 'md',
          _hover: {
            boxShadow: 'lg',
            transform: 'translateY(-4px)',
          },
          transition: 'all 0.3s ease',
        },
      },
    },
    Heading: {
      baseStyle: {
        color: 'gray.800',
      },
    },
  },
  breakpoints: {
    xs: '20em',  // 320px (celulares pequenos)
    sm: '30em',  // 480px
    md: '48em',  // 768px (tablets)
    lg: '62em',  // 992px
    xl: '80em',  // 1280px
    '2xl': '96em'
  },
});

export default theme;