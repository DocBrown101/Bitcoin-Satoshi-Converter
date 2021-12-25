import React from 'react';
import {QueryClientProvider, useQuery} from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";

import {Button, CircularProgress} from '@mui/material';
import {Cached as CachedIcon} from '@mui/icons-material';

import ConverterStore from "../stores/ConverterStore";
import FiatPriceResult from './FiatPriceResult';

export default function FiatPriceQuery(props) {
  return (
    <QueryClientProvider client={props.queryClient}>
      <LoadAndShowFiatPrice client={props.queryClient} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

const LoadAndShowFiatPrice = (props) => {
  const resultEUR = useQuery('fetchEurPrice', fetchFiatPrice("EUR"));
  const resultUSD = useQuery('fetchUsdPrice', fetchFiatPrice("USD"));
  const setFiatPrice = ConverterStore((state) => state.setFiatPrice);

  React.useEffect(() => {
    if (resultEUR && resultEUR.data && resultEUR.data.EUR) {
      //sleep(2000);
      setFiatPrice(resultEUR.data.EUR);
    }
  }, [resultEUR, setFiatPrice]);

  if (resultEUR.isLoading || resultUSD.isLoading) return (<FiatPriceResult />);
  else if (resultEUR.error) return (<FiatPriceResult error={resultEUR.error.message} />);
  else if (resultUSD.error) return (<FiatPriceResult error={resultUSD.error.message} />);
  else return (<FiatPriceResult eur={resultEUR.data.EUR} usd={resultUSD.data.USD} loadingButton={<LoadingButton client={props.client} />} />);
};

/* function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
} */

function fetchFiatPrice(tsyms) {
  return () => fetch("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=" + tsyms).then(res => res.json());
}

const LoadingButton = (props) => {
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (isLoading) {
      props.client.invalidateQueries();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [isLoading, props.client]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      //variant="contained"
      color="primary"
      size="small"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}>
      {isLoading ? <CircularProgress size={24} color="secondary" /> : <CachedIcon />}
    </Button>
  );
};
