
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db', // Customize the primary color
      light: '#6ec6ff', // Optional: lighter shade of primary
      dark: '#0069c0',  // Optional: darker shade of primary
    },
    secondary: {
      main: '#777777',  // Customize the secondary color
      light: '#999999', // Optional: lighter shade of secondary
      dark: '#555555',  // Optional: darker shade of secondary
    },
    background: {
      default: '#f4f6f8',  // Background color for the app
      paper: '#ffffff',    // Background color for Paper components
    },
    text: {
      primary: '#333333',   // Default text color
      secondary: '#666666', // Secondary text color
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      color: '#333333',
    },
  },
  spacing: 8, // Default spacing (can be accessed as multiples of 8)
  shape: {
    borderRadius: 3, // Default border radius
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            boxShadow: '0px 4px 9px rgba(0, 0, 0, 0.1)', // Custom drop shadow for Paper
          },
        },
      },
  },
});

export default theme;
