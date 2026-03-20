import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";

import {Box, SwipeableDrawer, List, Divider, ListItemIcon, ListItemText, ListItemButton, Typography} from '@mui/material';
import {Home as HomeIcon, Settings} from '@mui/icons-material';

interface CollapsibleDrawerProps {
  isDrawerOpen: boolean;
  toggleDrawer: (open: boolean) => () => void;
}

export default function CollapsibleDrawer({isDrawerOpen, toggleDrawer}: CollapsibleDrawerProps) {
  const {t} = useTranslation();
  const drawerList = (
    <Box sx={{width: 200, height: '100vh', display: 'flex', flexDirection: 'column'}}>
      <List sx={{p: 0}}>
        <ListItemButton sx={{py: 3}} component={Link} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary={t("converter")} />
        </ListItemButton>

        <Divider />

        <ListItemButton component={Link} to="/settings">
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary={t("settings")} />
        </ListItemButton>
      </List>

      <Box sx={{flexGrow: 1}} /> {/* Spacer */}

      <Box sx={{p: 1, textAlign: 'center', mt: 'auto'}}>
        <Typography variant="caption" color="text.secondary">
          Version 1.1.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <SwipeableDrawer open={isDrawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
      <div
        tabIndex={0}
        role="button"
        onClick={toggleDrawer(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleDrawer(false)();
          }
        }}
      >
        {drawerList}
      </div>
    </SwipeableDrawer>
  );
}
