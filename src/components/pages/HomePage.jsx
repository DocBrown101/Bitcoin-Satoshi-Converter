import React from "react";
import {QueryClient} from 'react-query';

import Container from '@material-ui/core/Container';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

import Converter from "../Converter";
import FiatPriceQuery from "../FiatPriceQuery";
import FiatPriceSimulation from "../FiatPriceSimulation";

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  tab: {
    padding: "0px",
  },
}));

export default function HomePage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 5 * 60 * 1000,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  const classes = useStyles();

  const [tabValue, setTabValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="md">
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
  );
}