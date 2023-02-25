import React from 'react';
import NumberFormat from "react-number-format";
import {useTranslation} from "react-i18next";

import {Box, Grid, Paper, Typography} from '@mui/material';

import ConverterStore from "../stores/ConverterStore";
import InputElement from './InputElement';

export default function Converter() {
  const eurFiatPrice = ConverterStore((state) => state.eurFiatPrice);
  const oneFiatSats = ConverterStore((state) => state.oneFiatSats);
  const convertedEuro = ConverterStore((state) => state.convertedEuro);
  const convertedBitcoin = ConverterStore((state) => state.convertedBitcoin);
  const convertedSatoshi = ConverterStore((state) => state.convertedSatoshi);
  const onEuroInputChange = ConverterStore((state) => state.onEuroInputChange);
  const onBitcoinInputChange = ConverterStore((state) => state.onBitcoinInputChange);
  const onSatoshiInputChange = ConverterStore((state) => state.onSatoshiInputChange);
  const {t} = useTranslation();
  return (
    <Box my={2}>
      <Paper>
        <Box p={2}>
          <Box m="auto" textAlign="center">
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
                <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="inherit" mb={2}>1 € ≙ ? Satoshi</Box>
              }
            </Typography>
            <Typography variant="h6">{t("EnterAmount")}</Typography>
          </Box>
          <Grid container justifyContent="center" item xs={12} spacing={0}>
            <InputElement label="€ Euro" endLabel="EUR" value={convertedEuro} disabled={eurFiatPrice <= 0 ? true : false} onInputChange={onEuroInputChange} />
            <InputElement label="฿ Bitcoin" endLabel="BTC" value={convertedBitcoin} disabled={eurFiatPrice <= 0 ? true : false} onInputChange={onBitcoinInputChange} />
            <InputElement label="シ Satoshi" endLabel="sat" value={convertedSatoshi} disabled={eurFiatPrice <= 0 ? true : false} onInputChange={onSatoshiInputChange} />
          </Grid>
        </Box>
      </Paper >
    </Box >
  );
}