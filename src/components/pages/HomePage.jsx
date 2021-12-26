import React from "react";

import {Container, Tab} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';

import Converter from "../Converter";
import FiatPriceQuery from "../FiatPriceQuery";
import FiatPriceSimulation from "../FiatPriceSimulation";

export default function HomePage() {
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
        <TabPanel value="1" sx={{padding: '0px'}}>
          <Converter />
          <FiatPriceQuery />
        </TabPanel>
        <TabPanel value="2" sx={{padding: '0px'}}>
          <FiatPriceSimulation />
        </TabPanel>
      </TabContext>
    </Container>
  );
}