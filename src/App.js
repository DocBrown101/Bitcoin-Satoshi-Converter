import React from "react";
import {QueryClient} from 'react-query';

import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from '@material-ui/core/styles';

import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

import CenteredTextAppBar from "./components/CenteredTextAppBar";
import Converter from "./components/Converter";
import FiatPriceQuery from "./components/FiatPriceQuery";
import FiatPriceSimulation from "./components/FiatPriceSimulation";
import LayoutTest from "./components/LayoutTest";

const useStyles = makeStyles(theme => ({
  tab: {
    padding: "0px",
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const appliedTheme = createTheme(isDarkTheme ? dark : light);

  React.useEffect(() => {
    setIsDarkTheme(JSON.parse(window.localStorage.getItem('isDarkTheme')));
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('isDarkTheme', isDarkTheme);
  }, [isDarkTheme]);

  const [tabValue, setTabValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const classes = useStyles();
  const showLayoutTest = false;

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />

      <Container maxWidth="md">
        <CenteredTextAppBar useStateCallback={setIsDarkTheme} isDarkTheme={isDarkTheme} />
        <TabContext value={tabValue}>
          <TabList onChange={handleChange} aria-label="Tabs" centered>
            <Tab label="Converter" value="1" />
            <Tab label="Simulation" value="2" />
          </TabList>
          <TabPanel value="1" classes={{root: classes.tab}}>
            <Converter />
            <FiatPriceQuery queryClient={queryClient} />
          </TabPanel>
          <TabPanel value="2" classes={{root: classes.tab}}>
            <FiatPriceSimulation />
          </TabPanel>
        </TabContext>
      </Container>

      {showLayoutTest ? <LayoutTest /> : null}

      <FooterComponent />

    </ThemeProvider>
  );
}

const FooterComponent = (props) => {
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
    type: 'light',
    primary: {
      main: '#FF9800',
    },
    secondary: {
      main: '#008000',
    },
  },
};
export const dark = {
  palette: {
    type: 'dark',
    primary: {
      main: '#FF9800',
    },
    secondary: {
      main: '#008000',
    },
  },
};
