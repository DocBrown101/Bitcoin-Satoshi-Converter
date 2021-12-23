import React from 'react';
import NumberFormat from "react-number-format";

import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import EuroIcon from '@material-ui/icons/Euro';
import Container from '@material-ui/core/Container';

import SimulationStore from "../stores/SimulationStore";
import InputElement from './InputElement';

export default function FiatPriceSimulation() {
  const minPrice = 5000;
  const maxPrice = 250000;

  const sats = SimulationStore((state) => state.sats);
  const oneFiatSats = SimulationStore((state) => state.oneFiatSats);
  const fiatPrice = SimulationStore((state) => state.fiatPrice);
  const sliderPrice = SimulationStore((state) => state.sliderPrice);
  const onInputChange = SimulationStore((state) => state.onInputChange);
  const onFiatPriceChange = SimulationStore((state) => state.onFiatPriceChange);
  const onSliderPriceChange = SimulationStore((state) => state.onSliderPriceChange);

  const handleBlur = () => {
    if (sliderPrice < minPrice) {
      onSliderPriceChange(null, minPrice);
    } else if (sliderPrice > maxPrice) {
      onSliderPriceChange(null, maxPrice);
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Paper>
          <Box m={2} p={2} textAlign="center">
            <Typography variant="h6">Preis Simulation für EINEN Bitcoin</Typography>
            <Typography color="secondary" variant="h6">
              <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="inherit" mb={2}>
                <NumberFormat value={oneFiatSats}
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
              <Grid item>
                <EuroIcon />
              </Grid>
              <Grid item xs>
                <Slider
                  value={sliderPrice}
                  step={500}
                  min={minPrice}
                  max={maxPrice}
                  onChange={onSliderPriceChange}
                />
              </Grid>
              <Grid item>
                <Input
                  value={sliderPrice}
                  onChange={onInputChange}
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
          <Box m={2} p={2}>
            <Grid container justifyContent="center">
              <InputElement label="€ Euro" value={fiatPrice} onInputChange={onFiatPriceChange} />
              <Typography color="secondary" variant="h6">
                <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="inherit">
                  <NumberFormat value={sats}
                    displayType={'text'}
                    decimalScale={0}
                    fixedDecimalScale={true}
                    suffix={' シ Satoshi'}
                    thousandSeparator={'.'}
                    decimalSeparator={','} />
                </Box >
              </Typography>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
