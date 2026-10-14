import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import CachedIcon from '@mui/icons-material/Cached';
import CircularProgress from '@mui/material/CircularProgress';

import { fetchFiatPrice, normalizeApiId } from '../services/FiatPriceApi';
import { readLocalStorage } from '../services/LocalStorage';
import ConverterStore from '../stores/ConverterStore';
import FiatPriceResult from './FiatPriceResult';

export default function FiatPriceQuery() {
  const { t } = useTranslation();
  const apiId = normalizeApiId(readLocalStorage('api-ID', 40));
  const { data, isFetching, isError, error, refetch } = useQuery({
    queryKey: ['fetchFiatPrice', apiId],
    queryFn: ({ signal }) => fetchFiatPrice(apiId, signal),
  });
  const setEurFiatPrice = ConverterStore((state) => state.setEurFiatPrice);

  useEffect(() => {
    setEurFiatPrice(data?.EUR ?? 0);
  }, [data, setEurFiatPrice]);

  return (
    <FiatPriceResult
      eur={data?.EUR}
      usd={data?.USD}
      api={data?.API}
      id={data?.ID}
      error={isError ? error.message : undefined}
      loadingButton={
        <Button color='primary' size='small' aria-label={t('RefreshPrice')} disabled={isFetching} onClick={() => void refetch()}>
          {isFetching ? <CircularProgress size={24} color='secondary' /> : <CachedIcon />}
        </Button>
      }
    />
  );
}
