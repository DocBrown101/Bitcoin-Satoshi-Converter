import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";

import {Box, SwipeableDrawer, List, Divider, ListItemIcon, ListItemText, ListItemButton, Typography} from '@mui/material';
import {Home as HomeIcon, Settings} from '@mui/icons-material';

export default function CollapsibleDrawer(props) {
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
    <SwipeableDrawer open={props.isDrawerOpen} onClose={props.toggleDrawer(false)} onOpen={props.toggleDrawer(true)}>
      <div
        tabIndex={0}
        role="button"
        onClick={props.toggleDrawer(false)}
        onKeyDown={props.toggleDrawer(false)}
      >
        {drawerList}
      </div>
    </SwipeableDrawer>
  );
}
