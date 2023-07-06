import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";
import {useTranslation} from "react-i18next";

import {CssBaseline, Container, Box, Paper, Typography} from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material/styles';

import "./translation/i18n";

import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";

import HeaderToolbar from "./components/HeaderToolbar";
import {useLocalStorage} from './services/LocalStorage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 2 * 60 * 1000,
      staleTime: 2 * 60 * 1000,
    },
  },
});

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage("isDarkTheme", false);

  const appliedTheme = createTheme(isDarkTheme ? dark : light);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <Router>
          <HeaderToolbar isDarkTheme={isDarkTheme} useStateCallback={setIsDarkTheme} />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/test' element={<TestPage />} />
            <Route path='/settings' element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <FooterComponent />
          <ReactQueryDevtools />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const FooterComponent = () => {
  const {t} = useTranslation();
  return (
    <footer>
      <Container maxWidth="md">
        <Paper>
          <Box p={2} m={2} textAlign="center">
            <Typography variant="body1" color="inherit">{t("footer.line1")}</Typography>
            <Typography variant="body1" color="inherit">{t("footer.line2")}</Typography>
          </Box>
        </Paper>
      </Container>
    </footer>
  );
};

export const light = {
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
export const dark = {
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
