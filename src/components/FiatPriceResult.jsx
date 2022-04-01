import React from 'react';
import NumberFormat from 'react-number-format';

import {Box, Grid, Button, Typography, Tooltip} from '@mui/material';
import {Cached as CachedIcon} from '@mui/icons-material';

export default function FiatPriceResult(props) {
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
        <Tooltip title={props.api ? props.api : ""} placement="top">
          <Grid container direction="row" alignItems="center">
            <Typography variant="h6">
              Aktueller Preis für einen Bitcoin
            </Typography>
            {props.loadingButton
              ? props.loadingButton
              : <Button color="primary" size="small" disabled><CachedIcon /></Button>
            }
          </Grid>
        </Tooltip>
        {props.eur && props.usd
          ? <PriceComponent eur={props.eur} usd={props.usd} />
          : (props.error
            ? <ErrorComponent error={props.error} />
            : <LoadingComponent />
          )
        }
      </Box>
    </Box >
  );
}

const LoadingComponent = () => {
  return (
    <React.Fragment>
      <Typography variant="h6">
        <Box fontFamily="Monospace" fontWeight="fontWeightBold">
          Lade aktuellen Preis ...
        </Box >
      </Typography>
      <Typography variant="h6">
        <Box fontFamily="Monospace" fontWeight="fontWeightBold">
          Bitte warten!
        </Box >
      </Typography>
    </React.Fragment>
  );
};

const ErrorComponent = (props) => {
  return (
    <React.Fragment>
      <Typography variant="h6">
        <Box fontFamily="Monospace" fontWeight="fontWeightBold">
          Es ist ein Fehler aufgetreten:
        </Box >
      </Typography>
      <Typography color="error" variant="h6">
        <Box fontFamily="Monospace" fontWeight="fontWeightBold">
          {props.error}
        </Box >
      </Typography>
    </React.Fragment>
  );
};

const PriceComponent = (props) => {
  return (
    <React.Fragment>
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
      </Typography>
      <Typography color="secondary" variant="h6">
        <Box fontFamily="Monospace" fontWeight="fontWeightBold">
          <NumberFormat value={props.usd}
            displayType={'text'}
            decimalScale={2}
            fixedDecimalScale={true}
            thousandSeparator={true}
            suffix={' $'} />
        </Box >
      </Typography>
    </React.Fragment>
  );
};
