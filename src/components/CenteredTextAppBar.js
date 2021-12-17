import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  title: {
    flexGrow: 1,
    fontWeight: "bold",
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

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Box borderRadius={4} mt={3} color="#000000DE" bgcolor="primary.main">
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              シ Bitcoin Satoshi Converter
            </Typography>

            <Tooltip title="Theme">
              <IconButton
                edge="end"
                color="inherit"
                aria-label="mode"
                onClick={() => this.props.useStateCallback(!this.props.isDarkTheme)}>
                {this.props.isDarkTheme ? <Brightness7Icon /> : <Brightness3Icon />}
              </IconButton>
            </Tooltip>
            {/* <Typography>
              Click on {this.props.isDarkTheme ? 'Sun' : 'Moon'} Icon to change to{' '}{this.props.isDarkTheme ? 'Light' : 'Dark'} theme
            </Typography> */}
          </Toolbar>
        </Box>
      </div>
    );
  }
}

CenteredTextAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(CenteredTextAppBar);
