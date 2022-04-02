import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";

import {SwipeableDrawer, List, Divider, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import {Home as HomeIcon, Settings} from '@mui/icons-material';

export default function CollapsibleDrawer(props) {
  const {t} = useTranslation();
  const drawerList = (
    <List sx={{width: 200, p: 0}}>
      <ListItem sx={{minHeight: 100}} button component={Link} to="/">
        <ListItemIcon><HomeIcon /></ListItemIcon>
        <ListItemText primary={t("converter")} />
      </ListItem>

      <Divider />

      <ListItem button component={Link} to="/settings">
        <ListItemIcon><Settings /></ListItemIcon>
        <ListItemText primary={t("settings")} />
      </ListItem>
    </List>
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
