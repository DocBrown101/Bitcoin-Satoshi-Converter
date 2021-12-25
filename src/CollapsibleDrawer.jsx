import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import {SwipeableDrawer, List, Divider, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import {Home as HomeIcon, Settings} from '@mui/icons-material';
import {withStyles} from '@mui/styles';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class CollapsibleDrawer extends Component {
  render() {

    const {classes} = this.props;
    const style_unset = {all: "unset"};

    const sideList = (
      <div className={classes.list}>
        <List>

          <NavLink to="/" style={style_unset}>
            <ListItem button key={'Home'}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
          </NavLink>

          {/* <NavLink exact to="/test" style={style_unset}>
            <ListItem button key={'TestPage'}>
              <ListItemIcon><SearchIcon /></ListItemIcon>
              <ListItemText primary={'TestPage'} />
            </ListItem>
          </NavLink> */}

        </List>
        <Divider />
        <List>

          <NavLink to="/settings" style={style_unset}>
            <ListItem button key={'Settings'}>
              <ListItemIcon><Settings /></ListItemIcon>
              <ListItemText primary={'Settings'} />
            </ListItem>
          </NavLink>

          {/* <ListItem button key={'Version'}>
            <ListItemIcon><CloudIcon /></ListItemIcon>
            <ListItemText primary={'Version'} secondary={"v0.1"} />
          </ListItem> */}

        </List>
      </div>
    );

    return (
      <div>
        <SwipeableDrawer open={this.props.isDrawerOpen} onClose={this.props.toggleDrawer(false)} onOpen={this.props.toggleDrawer(true)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.props.toggleDrawer(false)}
            onKeyDown={this.props.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

export default withStyles(styles)(CollapsibleDrawer);