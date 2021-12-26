import React from 'react';
import {useQuery, useQueryClient} from 'react-query';

import {Button, CircularProgress} from '@mui/material';
import {Cached as CachedIcon} from '@mui/icons-material';

import {readLocalStorage} from '../services/LocalStorage';
import ConverterStore from "../stores/ConverterStore";
import FiatPriceResult from './FiatPriceResult';

export default function FiatPriceQuery() {
  const resultEUR = useQuery('fetchEurPrice', fetchFiatPrice("EUR"));
  const resultUSD = useQuery('fetchUsdPrice', fetchFiatPrice("USD"));
  const setFiatPrice = ConverterStore((state) => state.setFiatPrice);

  // React.useEffect is required, otherwise results in a console error
  React.useEffect(() => {
    if (resultEUR && resultEUR.data && resultEUR.data.EUR) {
      setFiatPrice(resultEUR.data.EUR);
    }
  }, [resultEUR, setFiatPrice]);

  if (resultEUR.isLoading || resultUSD.isLoading) return (<FiatPriceResult />);
  else if (resultEUR.error) return (<FiatPriceResult error={resultEUR.error.message} />);
  else if (resultUSD.error) return (<FiatPriceResult error={resultUSD.error.message} />);
  else return (<FiatPriceResult eur={resultEUR.data.EUR} usd={resultUSD.data.USD} loadingButton={<RefreshButton />} />);
}

function fetchFiatPrice(tsyms) {
  const id = readLocalStorage("api-ID", 10);
  console.log(id);
  return () => fetch("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=" + tsyms).then(res => res.json());
}

const RefreshButton = () => {
  const [isLoading, setLoading] = React.useState(false);
  const queryClient = useQueryClient(); // Get QueryClient from the context

  React.useEffect(() => {
    if (isLoading) {
      queryClient.invalidateQueries();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [isLoading, queryClient]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      color="primary"
      size="small"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}>
      {isLoading ? <CircularProgress size={24} color="secondary" /> : <CachedIcon />}
    </Button>
  );
};
