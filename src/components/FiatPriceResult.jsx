import React from 'react';
import {NavLink} from 'react-router-dom';
import {NumericFormat} from 'react-number-format';
import {useTranslation} from "react-i18next";

import {Box, Button, Typography, Tooltip} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {Cached as CachedIcon} from '@mui/icons-material';

import ccLogo from "../assets/cc.webp";
import coingeckoLogo from "../assets/coingecko.webp";
import coinpaprika from "../assets/coinpaprika.webp";
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
          ? <ResultComponent id={props.id} api={props.api} eur={props.eur} usd={props.usd} />
          : <ErrorOrLoadingComponent error={props.error} />
        }
      </Box>
    </Box >
  );
}

const ResultComponent = (props) => {
  return (
    <Grid container spacing={1} columns={16}>
      <Grid size={4}>
        {/* https://mui.com/material-ui/react-grid2/#interactive */}
        <Grid container direction="row" sx={{ height: "60px", justifyContent: "flex-end", alignItems: "center" }}>
          <Tooltip title={props.api ? props.api : ""} placement="bottom">
            <NavLink to="/settings">
              <CurrentApiImageComponent id={props.id} />
            </NavLink>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid size={8}>
        <PriceComponent eur={props.eur} usd={props.usd} />
      </Grid>
      <Grid size={4}>
        <div />
      </Grid>
    </Grid>
  );
};

const ErrorOrLoadingComponent = (props) => {
  const {t} = useTranslation();
  if (props.error) {
    return (
      <Typography variant="h6">
        <Box fontFamily="Monospace" fontWeight="fontWeightBold">{t("AnErrorHasOccurred")}</Box >
        <Box fontFamily="Monospace" fontWeight="fontWeightBold">{props.error}</Box >
      </Typography>
    );
  }

  return (
    <Typography variant="h6">
      <Box fontFamily="Monospace" fontWeight="fontWeightBold">{t("LoadingCurrentPrice")}</Box >
      <Box fontFamily="Monospace" fontWeight="fontWeightBold">{t("PleaseWait")}</Box >
    </Typography>
  );
};

const CurrentApiImageComponent = (props) => {
  switch (props.id) {
    case 10:
      return (<img src={ccLogo} alt="ccLogo" width="60" height="60" />);
    case 20:
      return (<img src={coingeckoLogo} alt="coingeckoLogo" width="60" height="60" />);
    case 30:
      return (<img src={coinpaprika} alt="coingeckoLogo" width="60" height="60" />);
    default:
      return (<img src={krakenLogo} alt="krakenLogo" width="60" height="60" />);
  }
};

const PriceComponent = (props) => {
  return (
    <Typography color="secondary" variant="h6">
      <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="inherit">
        <NumericFormat value={props.eur}
          displayType={'text'}
          decimalScale={2}
          fixedDecimalScale={true}
          suffix={' €'}
          thousandSeparator={'.'}
          decimalSeparator={','} />
      </Box >
      <Box fontFamily="Monospace" fontWeight="fontWeightBold">
        <NumericFormat value={props.usd}
          displayType={'text'}
          decimalScale={2}
          fixedDecimalScale={true}
          thousandSeparator={true}
          suffix={' $'} />
      </Box >
    </Typography>
  );
};
