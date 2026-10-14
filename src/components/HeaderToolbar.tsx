import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import Drawer from './Drawer';

interface HeaderToolbarProps {
  readonly isDarkTheme: boolean;
  readonly onThemeChange: (value: boolean) => void;
}

export default function HeaderToolbar({ isDarkTheme, onThemeChange }: HeaderToolbarProps) {
  const { t } = useTranslation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <header>
      <Container maxWidth='md'>
        <Toolbar sx={{ justifyContent: 'space-between', gap: 1, cursor: 'default', px: { xs: 1, sm: 3 }, py: { xs: 1, sm: 3 }, borderRadius: 1, mt: 2, color: 'primary.contrastText', bgcolor: 'primary.main' }}>
          <Tooltip title={t('Menu')}>
            <IconButton color='inherit' aria-label={t('Menu')} onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Tooltip>

          <NavLink to='/' style={{ color: 'inherit', textDecoration: 'none', minWidth: 0 }}>
            <Typography variant='h4' sx={{ fontSize: { xs: '1.125rem', sm: '2.125rem' }, fontWeight: 'bold', textAlign: 'center' }}>
              シ Bitcoin Converter ₿
            </Typography>
          </NavLink>

          <Tooltip title={t(isDarkTheme ? 'LightTheme' : 'DarkTheme')}>
            <IconButton color='inherit' aria-label={t(isDarkTheme ? 'LightTheme' : 'DarkTheme')} onClick={() => onThemeChange(!isDarkTheme)}>
              {isDarkTheme ? <Brightness7Icon /> : <Brightness3Icon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      </Container>
    </header>
  );
}
