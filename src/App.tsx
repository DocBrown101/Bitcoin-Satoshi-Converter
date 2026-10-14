import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme, type ThemeOptions } from '@mui/material/styles';

import LoadingSpinner from './components/LoadingSpinner';
import HeaderToolbar from './components/HeaderToolbar';
import { useLocalStorage } from './services/LocalStorage';
import './translation/i18n';

import HomePage from './pages/HomePage';
const TestPage = React.lazy(() => import('./pages/TestPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
import NotFoundPage from './pages/NotFoundPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 2 * 60 * 1000,
      staleTime: 2 * 60 * 1000,
    },
  },
});

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage('isDarkTheme', prefersDarkMode);
  const appliedTheme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <Router>
          <HeaderToolbar isDarkTheme={isDarkTheme} onThemeChange={setIsDarkTheme} />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/test' element={<TestPage />} />
              <Route path='/settings' element={<SettingsPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <FooterComponent />
          {import.meta.env.DEV && <ReactQueryDevtools />}
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const FooterComponent = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <Container maxWidth='md'>
        <Paper>
          <Box sx={{ p: 2, m: 2, textAlign: 'center' }}>
            <Typography variant='body1' color='inherit'>
              {t('footer.line1')}
            </Typography>
            <Typography variant='body1' color='inherit'>
              {t('footer.line2')}
            </Typography>
          </Box>
        </Paper>
        <Box sx={{ textAlign: 'center' }}>
          <Tooltip title='GitHub'>
            <IconButton component='a' color='inherit' aria-label='GitHub' href='https://github.com/DocBrown101/Bitcoin-Satoshi-Converter' target='_blank' rel='noopener noreferrer'>
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Container>
    </footer>
  );
};

export const light: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#FF9800',
      contrastText: '#121212',
    },
    secondary: {
      main: '#008000',
    },
  },
};
export const dark: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF9800',
      contrastText: '#121212',
    },
    secondary: {
      main: '#00a600',
    },
  },
};

const lightTheme = createTheme(light);
const darkTheme = createTheme(dark);
