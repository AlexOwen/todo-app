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
      button: {},
    },
  },
});
