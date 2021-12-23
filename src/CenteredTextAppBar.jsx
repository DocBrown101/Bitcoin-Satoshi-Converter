import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import {withStyles} from '@material-ui/core/styles';

import CollapsibleDrawer from './CollapsibleDrawer';

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
        <Box borderRadius={4} mt={3} color="#000000DE" bgcolor="primary.main">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <div className={classes.centered}>
              <NavLink to="/" style={style_unset}>
                <Typography variant="h4" style={{fontWeight: 'bold'}}>
                  シ Bitcoin Satoshi Converter
                </Typography>
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
