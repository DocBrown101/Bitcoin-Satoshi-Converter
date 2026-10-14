import React from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import useMediaQuery from '@mui/material/useMediaQuery';

import Converter from '../components/Converter';
import FiatPriceQuery from '../components/FiatPriceQuery';
import LoadingSpinner from '../components/LoadingSpinner';
const Simulation = React.lazy(() => import('../components/Simulation'));
const MempoolWsComponent = React.lazy(() => import('../components/MempoolWs'));

export default function HomePage() {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = React.useState(0);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth='md'>
      <Tabs value={tabValue} onChange={handleChange} aria-label={t('Sections')} variant={isSmallScreen ? 'scrollable' : 'standard'} centered={!isSmallScreen} allowScrollButtonsMobile>
        <Tab label={t('converter')} id='tab-0' aria-controls='panel-0' />
        <Tab label={t('Simulation')} id='tab-1' aria-controls='panel-1' />
        <Tab label={t('Blockchain')} id='tab-2' aria-controls='panel-2' />
      </Tabs>
      {[0, 1, 2].map((index) => (
        <Box key={index} role='tabpanel' id={`panel-${index}`} aria-labelledby={`tab-${index}`} hidden={tabValue !== index} tabIndex={0}>
          {tabValue === index && (
            <React.Suspense fallback={<LoadingSpinner />}>
              {index === 0 && (
                <>
                  <Converter />
                  <FiatPriceQuery />
                </>
              )}
              {index === 1 && <Simulation />}
              {index === 2 && <MempoolWsComponent />}
            </React.Suspense>
          )}
        </Box>
      ))}
    </Container>
  );
}
