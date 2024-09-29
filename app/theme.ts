import { createTheme } from '@aws-amplify/ui-react';

export const theme = createTheme({
  name: 'main',
  tokens: {
    fonts: {
      default: {
        variable: { value: 'Poppins, sans-serif' },
        static: { value: 'Poppins, sans-serif' },
      },
    },
    components: {
      button: {
        backgroundColor: '#00C495',
        borderWidth: '0',
        color: '#fff',
        _hover: {
          backgroundColor: '#017055',
          color: '#fff',
        },
        _active: {
          backgroundColor: '#017055',
          color: '#fff',
        },
      },
      checkbox: {
        icon: {
          backgroundColor: '#00C495',
        },
      },
      table: {
        data: {
          borderWidth: '0',
          borderColor: '#E9E9E7',
        },
      },
    },
  },
});
