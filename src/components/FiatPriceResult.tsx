import {ReactNode} from 'react';
import {NavLink} from 'react-router-dom';
import {NumericFormat} from 'react-number-format';
import {useTranslation} from "react-i18next";

import {Grid, Box, Button, Typography, Tooltip} from '@mui/material';
import {Cached as CachedIcon} from '@mui/icons-material';

import ccLogo from "../assets/cc.webp";
import coingeckoLogo from "../assets/coingecko.webp";
import coinpaprika from "../assets/coinpaprika.webp";
import krakenLogo from "../assets/kraken.webp";

interface FiatPriceResultProps {
  readonly api?: string;
  readonly error?: string;
  readonly eur?: number;
  readonly id?: number;
  readonly loadingButton?: ReactNode;
  readonly usd?: number;
}

export default function FiatPriceResult({api, error, eur, id, loadingButton, usd}: FiatPriceResultProps) {
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
          {loadingButton ?? <Button color="primary" size="small" disabled><CachedIcon /></Button>}
        </Grid>

        {eur && usd
          ? <ResultComponent id={id} api={api} eur={eur} usd={usd} />
          : <ErrorOrLoadingComponent error={error} />
        }
      </Box>
    </Box >
  );
}

interface ResultComponentProps {
  id?: number;
  api?: string;
  eur: number;
  usd: number;
}

const ResultComponent = ({id, api, eur, usd}: ResultComponentProps) => {
  return (
    <Grid container spacing={1} columns={16}>
      <Grid size={4}>
        {/* https://mui.com/material-ui/react-grid2/#interactive */}
        <Grid container direction="row" sx={{height: "60px", justifyContent: "flex-end", alignItems: "center"}}>
          <Tooltip title={api} placement="bottom">
            <NavLink to="/settings">
              <CurrentApiImageComponent id={id} />
            </NavLink>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid size={8}>
        <PriceComponent eur={eur} usd={usd} />
      </Grid>
      <Grid size={4}>
        <div />
      </Grid>
    </Grid>
  );
};

const ErrorOrLoadingComponent = ({error}: { error?: string }) => {
  const {t} = useTranslation();
  if (error) {
    return (
      <Typography variant="h6">
        <Box fontFamily="Monospace" fontWeight="fontWeightBold">{t("AnErrorHasOccurred")}</Box >
        <Box fontFamily="Monospace" fontWeight="fontWeightBold">{error}</Box >
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

const CurrentApiImageComponent = ({id}: { id?: number }) => {
  switch (id) {
    case 10:
      return (<img src={ccLogo} alt="ccLogo" width="60" height="60" />);
    case 20:
      return (<img src={coingeckoLogo} alt="coingeckoLogo" width="60" height="60" />);
    case 30:
      return (<img src={coinpaprika} alt="coinpaprika logo" width="60" height="60" />);
    default:
      return (<img src={krakenLogo} alt="krakenLogo" width="60" height="60" />);
  }
};

const PriceComponent = ({eur, usd}: { eur: number; usd: number }) => {
  return (
    <Typography color="secondary" variant="h6">
      <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="inherit">
        <NumericFormat value={eur}
          displayType={'text'}
          decimalScale={2}
          fixedDecimalScale={true}
          suffix={' €'}
          thousandSeparator={'.'}
          decimalSeparator={','} />
      </Box >
      <Box fontFamily="Monospace" fontWeight="fontWeightBold">
        <NumericFormat value={usd}
          displayType={'text'}
          decimalScale={2}
          fixedDecimalScale={true}
          thousandSeparator={true}
          suffix={' $'} />
      </Box >
    </Typography>
  );
};
