import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#74412d',
    },
    secondary: {
      main: '#fce8a9',
    },
    error: {
      main: red.A400,
    },
    black: {
      main: '#2d2d2d',
    },
    font: {
      main: '#868585',
    },
  },
});

export default theme;