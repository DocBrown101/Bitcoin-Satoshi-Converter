import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import {Container, IconButton, Box, Toolbar, Tooltip, Typography} from '@mui/material';
import {Menu as MenuIcon, Brightness3 as Brightness3Icon, Brightness7 as Brightness7Icon} from '@mui/icons-material';
import {withStyles} from '@mui/styles';

import CollapsibleDrawer from './CollapsibleDrawer';

const styles = {
  centered: {
    flexGrow: 1,
    textAlign: 'center',
    paddingTop: "24px",
    paddingBottom: "24px",
    cursor: "default",
    '&::selection': {
      backgroundColor: 'transparent',
    },
  },
};

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
    const {classes} = this.props;
    return (
      <header>
        <Container maxWidth="md">
          <Box borderRadius={1} mt={3} p={0} color="primary.contrastText" bgcolor="primary.main">
            <Toolbar>
              <Tooltip title="Menu">
                <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>

              <div className={classes.centered}>
                <NavLink to="/" style={{all: "unset"}}>
                  <Typography variant="h4" sx={{fontWeight: 'bold'}}>
                    シ Bitcoin Converter ₿
                  </Typography>
                </NavLink>
              </div>

              <Tooltip title={this.props.isDarkTheme ? 'Light Theme' : 'Dark Theme'}>
                <IconButton color="inherit" aria-label="Theme" onClick={() => this.props.useStateCallback(!this.props.isDarkTheme)}>
                  {this.props.isDarkTheme ? <Brightness7Icon /> : <Brightness3Icon />}
                </IconButton>
              </Tooltip>
            </Toolbar>
          </Box>
          <CollapsibleDrawer isDrawerOpen={this.state.isDrawerOpen} toggleDrawer={this.toggleDrawer} />
        </Container>
      </header>
    );
  }
}

HeaderToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  isDarkTheme: PropTypes.bool,
};

export default withStyles(styles)(HeaderToolbar);
