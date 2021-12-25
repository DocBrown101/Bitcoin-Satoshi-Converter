import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import {IconButton, Box, Toolbar, Tooltip, Typography} from '@mui/material';
import {Menu as MenuIcon, Brightness3 as Brightness3Icon, Brightness7 as Brightness7Icon} from '@mui/icons-material';
import {ThemeProvider, createTheme, responsiveFontSizes} from '@mui/material/styles';
import {withStyles} from '@mui/styles';

import CollapsibleDrawer from './CollapsibleDrawer';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const styles = theme => ({
  centered: {
    flexGrow: 1,
    textAlign: 'center',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    cursor: "default",
    '&::selection': {
      backgroundColor: 'transparent',
    },
  },
});

class CenteredTextAppBar extends Component {

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
    const style_unset = {all: "unset"};
    return (
      <div>
        <Box borderRadius={1} mt={3} color="primary.contrastText" bgcolor="primary.main">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <div className={classes.centered}>
              <NavLink to="/" style={style_unset}>
                <ThemeProvider theme={theme}>
                  <Typography variant="h4" sx={{fontWeight: 'bold'}}>
                    シ Bitcoin Satoshi Converter
                  </Typography>
                </ThemeProvider>
              </NavLink>
            </div>

            <Tooltip title={this.props.isDarkTheme ? 'Light Theme' : 'Dark Theme'}>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="mode"
                onClick={() => this.props.useStateCallback(!this.props.isDarkTheme)}>
                {this.props.isDarkTheme ? <Brightness7Icon /> : <Brightness3Icon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Box>
        <CollapsibleDrawer isDrawerOpen={this.state.isDrawerOpen} toggleDrawer={this.toggleDrawer} />
      </div>
    );
  }
}

CenteredTextAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(CenteredTextAppBar);
