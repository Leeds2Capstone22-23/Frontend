import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#dddddf',
    },
    secondary: {
      main: '#6b6b6b',
    },
    background: {
      default: '#1c1b21',
      paper: '#26262e',
    },
    text: {
      primary: '#DDDDDF',
      disabled: '#646464',
      secondary: '#66666C',
    },
    divider: '#34343B',
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Helvetica',
  },

});
