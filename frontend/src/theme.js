import { createTheme } from '@mui/material/styles';

// Create a theme with custom typography
const theme = createTheme({
  typography: {
    fontSize: 16, // Default font size
    h4: {
      fontSize: '32px', // Custom size for h4
    },
    body1: {
      fontSize: '20px', // Custom size for body text
    },
    button: {
      fontSize: '15px', // Custom size for buttons
    },
    tableHead: {
      fontSize: '40px',
    }
  },
});

export default theme;
