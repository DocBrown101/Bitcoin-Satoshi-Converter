import {useState} from 'react';
import {NavLink} from 'react-router-dom';

import {Container, IconButton, Toolbar, Tooltip, Typography} from '@mui/material';
import {Menu as MenuIcon, Brightness3 as Brightness3Icon, Brightness7 as Brightness7Icon} from '@mui/icons-material';

import CollapsibleDrawer from './CollapsibleDrawer';

interface HeaderToolbarProps {
  isDarkTheme: boolean;
  useStateCallback: (value: boolean) => void;
}

export default function HeaderToolbar({isDarkTheme, useStateCallback}: HeaderToolbarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <header>
      <Container maxWidth="md">
        <Toolbar sx={{justifyContent: 'space-between', cursor: "default", py: 3, borderRadius: 1, mt: 2, maxWidth: "md", color: "primary.contrastText", bgcolor: "primary.main"}}>
          <Tooltip title="Menu">
            <IconButton color="inherit" aria-label="Menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Tooltip>

          <NavLink to="/" style={{all: "unset"}}>
            <Typography variant="h4" sx={{fontWeight: 'bold', textAlign: 'center'}}>
              シ Bitcoin Converter ₿
            </Typography>
          </NavLink>

          <Tooltip title={isDarkTheme ? 'Light Theme' : 'Dark Theme'}>
            <IconButton color="inherit" aria-label="Theme" onClick={() => useStateCallback(!isDarkTheme)}>
              {isDarkTheme ? <Brightness7Icon /> : <Brightness3Icon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
        <CollapsibleDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      </Container>
    </header>
  );
}
