import React from 'react';
import {NumericFormat} from 'react-number-format';
import {useTranslation} from 'react-i18next';

import {Grid, Box, Paper, Typography, IconButton} from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

import ConverterStore from '../stores/ConverterStore';
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
  const resetConvertedState = ConverterStore((state) => state.resetConvertedState);
  const {t} = useTranslation();
  const copyToClipboard = (text) => {
    if ('clipboard' in navigator) {
      navigator.clipboard.writeText(text);
    }
  };
  return (
    <Box my={2}>
      <Paper>
        <Box p={2}>
          <Box m="auto" textAlign="center">
            <Typography color="secondary" variant="h6">
              {oneFiatSats > 0 ?
                <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="inherit" mb={2}>
                  <NumericFormat value={oneFiatSats}
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
          <Grid container justifyContent="center" size={{xs: 12}} spacing={0}>
            <GridRowComponent
              input={
                <InputElement label="€ Euro" endLabel="EUR" value={convertedEuro} disabled={eurFiatPrice <= 0 ? true : false} onInputChange={onEuroInputChange} />
              }
              button={
                <IconButton sx={{mt: 1, ml: 1}} aria-label="Copy" onClick={() => resetConvertedState()}>
                  <BackspaceOutlinedIcon />
                </IconButton>
              } />

            <GridRowComponent
              input={
                <InputElement label="฿ Bitcoin" endLabel="BTC" value={convertedBitcoin} disabled={eurFiatPrice <= 0 ? true : false} onInputChange={onBitcoinInputChange} />
              }
              button={
                <IconButton sx={{mt: 1, ml: 1}} aria-label="Copy" disabled={!convertedBitcoin} onClick={() => copyToClipboard(convertedBitcoin)}>
                  <ContentCopyIcon />
                </IconButton>
              } />

            <GridRowComponent
              input={
                <InputElement label="シ Satoshi" endLabel="sat" value={convertedSatoshi} disabled={eurFiatPrice <= 0 ? true : false} onInputChange={onSatoshiInputChange} />
              }
              button={
                <IconButton sx={{mt: 1, ml: 1}} aria-label="Copy" disabled={!convertedSatoshi} onClick={() => copyToClipboard(convertedSatoshi)}>
                  <ContentCopyIcon />
                </IconButton>
              } />
          </Grid>
        </Box>
      </Paper >
    </Box >
  );
}

const GridRowComponent = ({input, button}) => (
  <React.Fragment>
    <Grid size={{xs: 2, sm: 3, md: 4}} />
    <Grid size={{xs: 8, sm: 6, md: 4}} sx={{maxWidth: "300px", mb: 2}}>
      {input}
    </Grid>
    <Grid size={{xs: 2, sm: 3, md: 4}}>
      {button}
    </Grid>
  </React.Fragment>
);
