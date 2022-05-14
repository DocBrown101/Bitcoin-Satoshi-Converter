import React from 'react';
import {NavLink} from 'react-router-dom';
import NumberFormat from 'react-number-format';
import {useTranslation} from "react-i18next";

import {Box, Grid, Button, Typography, Tooltip} from '@mui/material';
import {Cached as CachedIcon} from '@mui/icons-material';

import ccLogo from "../assets/cc.webp";
import coingeckoLogo from "../assets/coingecko.webp";
import krakenLogo from "../assets/kraken.webp";

export default function FiatPriceResult(props) {
  const {t} = useTranslation();
  return (
    <Box display="flex">
      <Box textAlign="center"
        border={1}
        borderColor="primary.main"
        borderRadius={1}
        bgcolor="background.paper"
        pt={2}
        pb={2}
        pl={2}
        mx="auto">
        <Grid container direction="row" alignItems="center">
          <Typography variant="h6">{t("CurrentPrice")}</Typography>
          {props.loadingButton
            ? props.loadingButton
            : <Button color="primary" size="small" disabled><CachedIcon /></Button>
          }
        </Grid>

        {props.eur && props.usd
          ?
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs>
              <Grid container justifyContent="flex-end" style={{height: "100%"}}>
                <Tooltip title={props.api ? props.api : ""} placement="bottom">
                  <NavLink to="/settings" style={{height: "60px"}}>
                    <CurrentApiImageComponent id={props.id} />
                  </NavLink>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <PriceComponent eur={props.eur} usd={props.usd} />
            </Grid>
            <Grid item xs>
              <div />
            </Grid>
          </Grid>
          : (props.error
            ? <ErrorComponent error={props.error} />
            : <LoadingComponent />
          )
        }
      </Box>
    </Box >
  );
}

const CurrentApiImageComponent = (props) => {
  switch (props.id) {
    case 10:
      return (<img src={ccLogo} alt="ccLogo" width="60" height="60" />);
    case 20:
      return (<img src={coingeckoLogo} alt="coingeckoLogo" width="60" height="60" />);
    default:
      return (<img src={krakenLogo} alt="krakenLogo" width="60" height="60" />);
  }
};

const LoadingComponent = () => {
  const {t} = useTranslation();
  return (
    <Typography variant="h6">
      <Box fontFamily="Monospace" fontWeight="fontWeightBold">{t("LoadingCurrentPrice")}</Box >
      <Box fontFamily="Monospace" fontWeight="fontWeightBold">{t("PleaseWait")}</Box >
    </Typography>
  );
};

const ErrorComponent = (props) => {
  const {t} = useTranslation();
  return (
    <Typography variant="h6">
      <Box fontFamily="Monospace" fontWeight="fontWeightBold">{t("AnErrorHasOccurred")}</Box >
      <Box fontFamily="Monospace" fontWeight="fontWeightBold">{props.error}</Box >
    </Typography>
  );
};

const PriceComponent = (props) => {
  return (
    <Typography color="secondary" variant="h6">
      <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="inherit">
        <NumberFormat value={props.eur}
          displayType={'text'}
          decimalScale={2}
          fixedDecimalScale={true}
          suffix={' €'}
          thousandSeparator={'.'}
          decimalSeparator={','} />
      </Box >
      <Box fontFamily="Monospace" fontWeight="fontWeightBold">
        <NumberFormat value={props.usd}
          displayType={'text'}
          decimalScale={2}
          fixedDecimalScale={true}
          thousandSeparator={true}
          suffix={' $'} />
      </Box >
    </Typography>
  );
};
