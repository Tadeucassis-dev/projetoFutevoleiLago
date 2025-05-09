

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f0ff',
      100: '#b3d4ff',
      200: '#80b8ff',
      300: '#4d9bff',
      400: '#1a7fff',
      500: '#0066ff',
      600: '#0052cc',
      700: '#003d99',
      800: '#002966',
      900: '#001433',
    },
    accent: {
      50: '#fff7e6',
      100: '#ffe7b3',
      200: '#ffd780',
      300: '#ffc74d',
      400: '#ffb71a',
      500: '#ffaa00',
      600: '#cc8800',
      700: '#996600',
      800: '#664400',
      900: '#332200',
    },
  },
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: { bg: 'brand.600' },
        },
      },
    },
  },
});

export default theme;

function extendTheme(arg0: { colors: { brand: { 50: string; 100: string; 200: string; 300: string; 400: string; 500: string; 600: string; 700: string; 800: string; 900: string; }; accent: { 50: string; 100: string; 200: string; 300: string; 400: string; 500: string; 600: string; 700: string; 800: string; 900: string; }; }; fonts: { heading: string; body: string; }; components: { Button: { baseStyle: { fontWeight: string; }; variants: { solid: { bg: string; color: string; _hover: { bg: string; }; }; }; }; }; }) {
    throw new Error("Function not implemented.");
}
