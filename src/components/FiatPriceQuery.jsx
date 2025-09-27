import React from 'react';
import {useQuery, useQueryClient} from "@tanstack/react-query";

import {Button, CircularProgress} from '@mui/material';
import {Cached as CachedIcon} from '@mui/icons-material';

import {fetchFiatPrice} from '../services/FiatPriceApi';
import ConverterStore from "../stores/ConverterStore";
import FiatPriceResult from './FiatPriceResult';

export default function FiatPriceQuery() {
  console.log("FiatPriceQuery");

  const {data, isPending, isError, error} = useQuery({
    queryKey: ['fetchFiatPrice'],
    queryFn: fetchFiatPrice,
  });

  const setEurFiatPrice = ConverterStore((state) => state.setEurFiatPrice);

  React.useEffect(() => {
    if (data?.EUR && data?.USD) {
      setEurFiatPrice(data.EUR);
    }
  }, [data, setEurFiatPrice]);

  if (isPending) {return <FiatPriceResult />;}
  if (isError) {return <FiatPriceResult error={error.message} />;}
  return (
    <FiatPriceResult eur={data.EUR} usd={data.USD} api={data.API} id={data.ID} loadingButton={<RefreshButton />} />
  );
}

const RefreshButton = () => {
  const [isLoading, setLoading] = React.useState(false);
  const queryClient = useQueryClient(); // Get QueryClient from the context

  React.useEffect(() => {
    if (isLoading) {
      queryClient.invalidateQueries({queryKey: ['fetchFiatPrice']});
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
