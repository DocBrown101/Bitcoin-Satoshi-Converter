import React from 'react';
import NumberFormat from "react-number-format";

import {Box, Grid, Paper, Typography} from '@mui/material';

import ConverterStore from "../stores/ConverterStore";
import InputElement from './InputElement';

export default function Converter() {
  const fiatPrice = ConverterStore((state) => state.fiatPrice);
  const oneFiatSats = ConverterStore((state) => state.oneFiatSats);
  const convertedEuro = ConverterStore((state) => state.convertedEuro);
  const convertedBitcoin = ConverterStore((state) => state.convertedBitcoin);
  const convertedSatoshi = ConverterStore((state) => state.convertedSatoshi);
  const onEuroInputChange = ConverterStore((state) => state.onEuroInputChange);
  const onBitcoinInputChange = ConverterStore((state) => state.onBitcoinInputChange);
  const onSatoshiInputChange = ConverterStore((state) => state.onSatoshiInputChange);
  return (
    <Box my={2}>
      <Paper>
        <Box p={2}>
          <Box m="auto" textAlign="center">
            <Typography variant="h6">Betrag eingeben</Typography>
            <Typography color="secondary" variant="h6">
              {oneFiatSats > 0 ?
                <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="inherit" mb={2}>
                  <NumberFormat value={oneFiatSats}
                    displayType={'text'}
                    decimalScale={0}
                    fixedDecimalScale={true}
                    prefix={'1 € ≙ '}
                    suffix={' シ Satoshi'}
                    thousandSeparator={'.'}
                    decimalSeparator={','} />
                </Box>
                :
                <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="inherit" mb={2}>1 € ≙ ? Sats</Box>
              }
            </Typography>
          </Box>
          <Grid container justifyContent="center" item xs={12} spacing={0}>
            <InputElement label="€ Euro" value={convertedEuro} disabled={fiatPrice <= 0 ? true : false} onInputChange={onEuroInputChange} />
            <InputElement label="฿ Bitcoin" value={convertedBitcoin} disabled={fiatPrice <= 0 ? true : false} onInputChange={onBitcoinInputChange} />
            <InputElement label="シ Satoshi" value={convertedSatoshi} disabled={fiatPrice <= 0 ? true : false} onInputChange={onSatoshiInputChange} />
          </Grid>
        </Box>
      </Paper >
    </Box >
  );
}