import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";

import {CssBaseline, Container, Box, Paper, Typography} from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material/styles';

import HomePage from "./components/pages/HomePage";
import TestPage from "./components/pages/TestPage";
import SettingsPage from "./components/pages/SettingsPage";
import NotFoundPage from "./components/pages/NotFoundPage";

import CenteredTextAppBar from "./CenteredTextAppBar";
import {useLocalStorage} from './services/LocalStorage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
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
          <Container maxWidth="md">
            <CenteredTextAppBar isDarkTheme={isDarkTheme} useStateCallback={setIsDarkTheme} />
          </Container>
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
  return (
    <footer>
      <Container maxWidth="md">
        <Paper>
          <Box p={2} m={2} textAlign="center">
            <Typography variant="body1" color="inherit">1 Bitcoin kann 100 Millionen Mal geteilt werden!</Typography>
            <Typography variant="body1" color="inherit">Daraufhin erhält man einen Satoshi.</Typography>
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
