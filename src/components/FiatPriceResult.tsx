import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { useTranslation } from 'react-i18next';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CachedIcon from '@mui/icons-material/Cached';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import coingeckoLogo from '../assets/coingecko.webp';
import coinpaprika from '../assets/coinpaprika.webp';
import krakenLogo from '../assets/kraken.webp';

interface FiatPriceResultProps {
  readonly api?: string;
  readonly error?: string;
  readonly eur?: number;
  readonly id?: number;
  readonly loadingButton?: ReactNode;
  readonly usd?: number;
}

export default function FiatPriceResult({ api, error, eur, id, loadingButton, usd }: FiatPriceResultProps) {
  const { t } = useTranslation();
  const refreshButton = loadingButton ?? (
    <Button color='primary' size='small' aria-label={t('RefreshPrice')} disabled>
      <CachedIcon />
    </Button>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          textAlign: 'center',
          border: 1,
          borderColor: 'primary.main',
          borderRadius: 1,
          bgcolor: 'background.paper',
          py: 2,
          px: 4,
          mx: 'auto',
        }}>
        <Typography variant='h6'>{t('CurrentPrice')}</Typography>

        {eur && usd ? (
          <PriceResultRow id={id} api={api} eur={eur} usd={usd} refreshButton={refreshButton} />
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            {!error && <LoadingPrice />}
            {refreshButton}
          </Box>
        )}
        {error && (
          <Alert severity='error' sx={{ mt: 1 }}>
            {t('AnErrorHasOccurred')} {error}
          </Alert>
        )}
      </Box>
    </Box>
  );
}

interface PriceResultRowProps {
  id?: number;
  api?: string;
  eur: number;
  usd: number;
  refreshButton: ReactNode;
}

const PriceResultRow = ({ id, api, eur, usd, refreshButton }: PriceResultRowProps) => {
  return (
    <Grid container spacing={1} columns={16} sx={{ alignItems: 'center' }}>
      <Grid size={4}>
        <Box sx={{ display: 'flex', height: '60px', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Tooltip title={api} placement='bottom'>
            <NavLink to='/settings'>
              <ApiLogo id={id} />
            </NavLink>
          </Tooltip>
        </Box>
      </Grid>
      <Grid size={8}>
        <PriceAmounts eur={eur} usd={usd} />
      </Grid>
      <Grid size={4}>{refreshButton}</Grid>
    </Grid>
  );
};

const LoadingPrice = () => {
  const { t } = useTranslation();
  return (
    <Typography variant='h6' sx={{ fontFamily: 'Monospace', fontWeight: 'fontWeightBold' }}>
      <Box>{t('LoadingCurrentPrice')}</Box>
      <Box>{t('PleaseWait')}</Box>
    </Typography>
  );
};

const ApiLogo = ({ id }: { id?: number }) => {
  switch (id) {
    case 20:
      return <img src={coingeckoLogo} alt='coingeckoLogo' width='60' height='60' />;
    case 30:
      return <img src={coinpaprika} alt='coinpaprika logo' width='60' height='60' />;
    default:
      return <img src={krakenLogo} alt='krakenLogo' width='60' height='60' />;
  }
};

const PriceAmounts = ({ eur, usd }: { eur: number; usd: number }) => {
  return (
    <Typography color='secondary' variant='h6' sx={{ fontFamily: 'Monospace', fontWeight: 'fontWeightBold' }}>
      <Box>
        <NumericFormat value={eur} displayType='text' decimalScale={2} fixedDecimalScale suffix=' €' thousandSeparator='.' decimalSeparator=',' />
      </Box>
      <Box>
        <NumericFormat value={usd} displayType='text' decimalScale={2} fixedDecimalScale thousandSeparator suffix=' $' />
      </Box>
    </Typography>
  );
};
