import React from "react";
import {useTranslation} from "react-i18next";

import {Container, Tab} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';

import Converter from "../components/Converter";
import Simulation from "../components/Simulation";
import FiatPriceQuery from "../components/FiatPriceQuery";
import MempoolWsComponent from "../components/MempoolWs";

export default function HomePage() {
  const [tabValue, setTabValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const {t} = useTranslation();
  return (
    <Container maxWidth="md">
      <TabContext value={tabValue}>
        <TabList onChange={handleChange} aria-label="Tabs" centered>
          <Tab label={t("converter")} value="1" />
          <Tab label="Simulation" value="2" />
          <Tab label="Blockchain" value="3" />
        </TabList>
        <TabPanel value="1" sx={{padding: '0px'}}>
          <Converter />
          <FiatPriceQuery />
        </TabPanel>
        <TabPanel value="2" sx={{padding: '0px'}}>
          <Simulation />
        </TabPanel>
        <TabPanel value="3" sx={{padding: '0px'}}>
          <MempoolWsComponent />
        </TabPanel>
      </TabContext>
    </Container>
  );
}