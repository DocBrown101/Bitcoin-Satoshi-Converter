import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import {Container, IconButton, Toolbar, Tooltip, Typography} from '@mui/material';
import {Menu as MenuIcon, Brightness3 as Brightness3Icon, Brightness7 as Brightness7Icon} from '@mui/icons-material';

import CollapsibleDrawer from './CollapsibleDrawer';


class HeaderToolbar extends Component {

  state = {
    isDrawerOpen: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({
      isDrawerOpen: open,
    });
  };

  render() {
    return (
      <header>
        <Container maxWidth="md">
          <Toolbar sx={{justifyContent: 'space-between', cursor: "default", py: 3, borderRadius: 1, mt: 2, maxWidth: "md", color: "primary.contrastText", bgcolor: "primary.main"}}>
            <Tooltip title="Menu">
              <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Tooltip>

            <NavLink to="/" style={{all: "unset"}}>
              <Typography variant="h4" sx={{fontWeight: 'bold', textAlign: 'center'}}>
                シ Bitcoin Converter ₿
              </Typography>
            </NavLink>

            <Tooltip title={this.props.isDarkTheme ? 'Light Theme' : 'Dark Theme'}>
              <IconButton color="inherit" aria-label="Theme" onClick={() => this.props.useStateCallback(!this.props.isDarkTheme)}>
                {this.props.isDarkTheme ? <Brightness7Icon /> : <Brightness3Icon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
          <CollapsibleDrawer isDrawerOpen={this.state.isDrawerOpen} toggleDrawer={this.toggleDrawer} />
        </Container>
      </header>
    );
  }
}

HeaderToolbar.propTypes = {
  isDarkTheme: PropTypes.bool,
};

export default HeaderToolbar;
