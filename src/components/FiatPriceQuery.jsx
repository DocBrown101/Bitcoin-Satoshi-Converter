import React from 'react';
import {useQuery, useQueryClient} from 'react-query';

import {Button, CircularProgress} from '@mui/material';
import {Cached as CachedIcon} from '@mui/icons-material';

import {fetchFiatPrice} from '../services/FiatPriceApi';
import ConverterStore from "../stores/ConverterStore";
import FiatPriceResult from './FiatPriceResult';

export default function FiatPriceQuery() {
  console.log("FiatPriceQuery");
  const fetchResult = useQuery('fetchFiatPrice', fetchFiatPrice());
  const setEurFiatPrice = ConverterStore((state) => state.setEurFiatPrice);

  // React.useEffect is required, otherwise results in a console error
  React.useEffect(() => {
    if (fetchResult && fetchResult.data && fetchResult.data.EUR && fetchResult.data.USD) {
      setEurFiatPrice(fetchResult.data.EUR);
    }
  }, [fetchResult, setEurFiatPrice]);

  switch (fetchResult.status) {
    case "loading":
      return (<FiatPriceResult />);
    case "error":
      return (<FiatPriceResult error={fetchResult.error.message} />);
    default:
      return (<FiatPriceResult eur={fetchResult.data.EUR} usd={fetchResult.data.USD} api={fetchResult.data.API} id={fetchResult.data.ID} loadingButton={<RefreshButton />} />);
  }
}

const RefreshButton = () => {
  const [isLoading, setLoading] = React.useState(false);
  const queryClient = useQueryClient(); // Get QueryClient from the context

  React.useEffect(() => {
    if (isLoading) {
      queryClient.invalidateQueries('fetchFiatPrice');
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
