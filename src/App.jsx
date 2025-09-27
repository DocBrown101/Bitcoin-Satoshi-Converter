import React, {Suspense} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {useTranslation} from "react-i18next";

import GitHubIcon from '@mui/icons-material/GitHub';
import {ThemeProvider, createTheme, CssBaseline, Container, Box, Paper, Typography, IconButton, Tooltip} from '@mui/material';

import LoadingSpinner from "./components/LoadingSpinner"
import HeaderToolbar from "./components/HeaderToolbar";
import {useLocalStorage} from './services/LocalStorage';
import "./translation/i18n";

import HomePage from "./pages/HomePage";
const TestPage = React.lazy(() => import("./pages/TestPage"));
const SettingsPage = React.lazy(() => import("./pages/SettingsPage"));
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 2 * 60 * 1000,
      staleTime: 2 * 60 * 1000,
    },
  },
});

const openInNewTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage("isDarkTheme", false);

  const appliedTheme = createTheme(isDarkTheme ? dark : light);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <Router>
          <HeaderToolbar isDarkTheme={isDarkTheme} useStateCallback={setIsDarkTheme} />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/test' element={<TestPage />} />
              <Route path='/settings' element={<SettingsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
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
        <Box textAlign="center">
          <Tooltip title="GitHub">
            <IconButton color="inherit" aria-label="Theme" role="link" onClick={() => openInNewTab("https://github.com/DocBrown101/Bitcoin-Satoshi-Converter")}>
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Box>
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
