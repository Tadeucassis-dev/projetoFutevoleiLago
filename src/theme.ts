

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    // Paleta principal - Amarelo Ocre
    brand: {
      50: '#fffbf0',
      100: '#fef3d9',
      200: '#fde8b3',
      300: '#fcdc8c',
      400: '#fbd065',
      500: '#f9c23c', // Amarelo ocre principal
      600: '#e6a82d',
      700: '#cc941f',
      800: '#b38014',
      900: '#996c0a',
    },
    // Paleta secundária - Preto e cinzas
    accent: {
      50: '#f7f7f7',
      100: '#e1e1e1',
      200: '#cfcfcf',
      300: '#b1b1b1',
      400: '#9e9e9e',
      500: '#7e7e7e',
      600: '#626262',
      700: '#515151',
      800: '#3b3b3b',
      900: '#222222', // Preto principal
    },
    // Cores de degradê personalizadas
    gradient: {
      primary: 'linear(to-r, brand.400, brand.600)',
      secondary: 'linear(to-br, accent.800, accent.900)',
      hero: 'linear(135deg, brand.500 0%, accent.800 50%, accent.900 100%)',
      card: 'linear(to-br, brand.50, brand.100)',
      dark: 'linear(to-b, accent.900, accent.800)',
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
        color: 'accent.900',
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
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.500',
            color: 'white',
          },
        },
        ghost: {
          color: 'accent.800',
          _hover: {
            bg: 'brand.100',
            color: 'accent.900',
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
        color: 'accent.900',
      },
    },
  },
});

export default theme;
