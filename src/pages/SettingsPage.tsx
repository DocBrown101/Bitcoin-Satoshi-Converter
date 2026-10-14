import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useLocalStorage } from '../services/LocalStorage';
import { normalizeApiId } from '../services/FiatPriceApi';
import coingeckoLogo from '../assets/coingecko.webp';
import coinpaprika from '../assets/coinpaprika.webp';
import krakenLogo from '../assets/kraken.webp';

export default function SettingsPage() {
  const { t } = useTranslation();
  return (
    <div>
      <Container maxWidth='md'>
        <Stack sx={{ alignItems: 'center', justifyContent: 'center', minHeight: '10vh' }}>
          <Typography variant='h4'>{t('settings')}</Typography>
        </Stack>

        <SelectComponent />
        <LanguageComponent />
      </Container>
    </div>
  );
}

const SelectComponent = () => {
  const { t } = useTranslation();
  const [apiID, setApiID] = useLocalStorage<number>('api-ID', 40);
  const handleChange = (event: SelectChangeEvent<number>) => {
    setApiID(normalizeApiId(Number(event.target.value)));
  };
  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <FormControl fullWidth>
          <InputLabel id='api-label'>{t('ApiLabel')}</InputLabel>
          <Select
            id='api'
            labelId='api-label'
            label={t('ApiLabel')}
            value={normalizeApiId(apiID)}
            onChange={handleChange}
            required
            sx={{
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
              },
            }}
            MenuProps={{
              sx: {
                '&& .MuiMenuItem-root.Mui-selected': {
                  color: 'primary.contrastText',
                  backgroundColor: 'primary.main',
                },
              },
            }}>
            <MenuItem value={20}>
              <ListItemIcon sx={{ minWidth: 34 }}>
                <img src={coingeckoLogo} alt='coingeckoLogo' width='30' height='30' />
              </ListItemIcon>
              <ListItemText sx={{ ml: 1 }} primary='https://api.coingecko.com/' />
            </MenuItem>
            <MenuItem value={30}>
              <ListItemIcon sx={{ minWidth: 34 }}>
                <img src={coinpaprika} alt='coinpaprika' width='30' height='30' />
              </ListItemIcon>
              <ListItemText sx={{ ml: 1 }} primary='https://api.coinpaprika.com/' />
            </MenuItem>
            <MenuItem value={40}>
              <ListItemIcon sx={{ minWidth: 34 }}>
                <img src={krakenLogo} alt='krakenLogo' width='30' height='30' />
              </ListItemIcon>
              <ListItemText sx={{ ml: 1 }} primary='https://api.kraken.com/' />
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

const LanguageComponent = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <Paper>
      <Box sx={{ m: 2, p: 2, textAlign: 'center' }}>
        <Typography variant='h6'>{t('language')}</Typography>
        <Button sx={{ m: 1 }} variant='outlined' color='secondary' onClick={() => changeLanguage('de')}>
          DE
        </Button>
        <Button sx={{ m: 1 }} variant='outlined' color='secondary' onClick={() => changeLanguage('en')}>
          EN
        </Button>
      </Box>
    </Paper>
  );
};
