import React from 'react';
import {NumericFormat} from 'react-number-format';
import {useTranslation} from "react-i18next";

import {Grid, Box, Paper, Typography, Slider, Input, Container, Stack} from '@mui/material';
import {Euro as EuroIcon} from '@mui/icons-material';

import SimulationStore from "../stores/SimulationStore";
import InputElement from './InputElement';

export default function FiatPriceSimulation() {
  const minPrice = 5000;
  const maxPrice = 250000;

  const sats = SimulationStore((state) => state.sats);
  const oneFiatSats = SimulationStore((state) => state.oneFiatSats);
  const fiatPrice = SimulationStore((state) => state.fiatPrice);
  const sliderPrice = SimulationStore((state) => state.sliderPrice);
  const onFiatPriceChange = SimulationStore((state) => state.onFiatPriceChange);
  const onBtcPriceChange = SimulationStore((state) => state.onBtcPriceChange);

  const handleBlur = () => {
    if (sliderPrice < minPrice) {
      onBtcPriceChange(minPrice);
    } else if (sliderPrice > maxPrice) {
      onBtcPriceChange(maxPrice);
    }
  };

  const {t} = useTranslation();
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Paper>
          <Box m={2} p={2} textAlign="center">
            <Typography variant="h6">{t("PriceSimulation")}</Typography>
            <Typography color="secondary" variant="h6">
              <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="inherit" mb={2}>
                <NumericFormat value={oneFiatSats}
                  displayType={'text'}
                  decimalScale={0}
                  fixedDecimalScale={true}
                  prefix={'1 € ≙ '}
                  suffix={' シ Satoshi'}
                  thousandSeparator={'.'}
                  decimalSeparator={','} />
              </Box >
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid size="auto">
                <EuroIcon />
              </Grid>
              <Grid size="grow">
                <Slider
                  value={sliderPrice}
                  step={500}
                  min={minPrice}
                  max={maxPrice}
                  onChange={(event, value) => onBtcPriceChange(value)}
                />
              </Grid>
              <Grid size="auto">
                <Input
                  value={sliderPrice}
                  onChange={(event) => onBtcPriceChange(event.target.value)}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 100,
                    min: minPrice,
                    max: maxPrice,
                    type: 'number',
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>

      <Container maxWidth="sm">
        <Paper>
          <Stack alignItems="center" sx={{p: 3}}>
            <InputElement label="€ Euro" endLabel="EUR" value={fiatPrice} onInputChange={(values) => onFiatPriceChange(values.value)} />
            <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="inherit" sx={{pt: 1}}>
              <Typography color="secondary" variant="h6">
                <NumericFormat
                  value={sats}
                  displayType={'text'}
                  decimalScale={0}
                  fixedDecimalScale={true}
                  suffix={' シ Satoshi'}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                />
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
