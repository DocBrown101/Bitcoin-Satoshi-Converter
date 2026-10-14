import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Settings from '@mui/icons-material/Settings';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';

import { version } from '../../package.json';

interface DrawerProps {
  readonly isDrawerOpen: boolean;
  readonly toggleDrawer: (open: boolean) => () => void;
}

export default function Drawer({ isDrawerOpen, toggleDrawer }: DrawerProps) {
  const { t } = useTranslation();
  return (
    <SwipeableDrawer open={isDrawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
      <Box onClick={toggleDrawer(false)} sx={{ width: 200, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <List sx={{ p: 0 }}>
          <ListItemButton sx={{ py: 3 }} component={Link} to='/'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={t('converter')} />
          </ListItemButton>

          <Divider />

          <ListItemButton component={Link} to='/settings'>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary={t('settings')} />
          </ListItemButton>
        </List>

        <Box sx={{ p: 1, textAlign: 'center', mt: 'auto' }}>
          <Typography variant='caption' color='text.secondary'>
            Version {version}
          </Typography>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}
