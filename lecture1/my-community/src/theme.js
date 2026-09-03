import { createTheme } from '@mui/material/styles';

/**
 * DEVIGN 커뮤니티 테마
 * 개발(인디고) + 디자인(바이올렛) 을 잇는 전문적이면서 친근한 톤
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#5B4BE8',
      light: '#8A7DF2',
      dark: '#3A2DB5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F26DA8',
      light: '#FF9CC6',
      dark: '#C04680',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F6F5FC',
      paper: '#ffffff',
    },
    text: {
      primary: '#1C1830',
      secondary: '#6B6480',
    },
    divider: 'rgba(28, 24, 48, 0.08)',
  },
  typography: {
    fontFamily: '"Pretendard", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 14,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingTop: 10,
          paddingBottom: 10,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});

export default theme;
