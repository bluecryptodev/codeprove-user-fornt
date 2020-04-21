/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Button, Fab, Avatar, colors } from '@material-ui/core';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  loginButton: {
    margin: '0px 30px 0px 10px',
    background: 'linear-gradient(62deg,#fbab7e 0,#f7ce68 100%)',
    color: 'white',
    padding: '0px 20px!important'
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { pages, className, userdata, openloginmodal1, ...rest } = props;

  const classes = useStyles();
  function Logout() {
    localStorage.clear();
    window.location.href='/';
  }
  return (
    <>
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {pages.map(page => (
        <ListItem
          className={classes.item}
          disableGutters
          key={page.title}
        >
          {page.collapse === undefined && (
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              to={page.href}
            >
              {page.title}
            </Button>
          )}
          {page.collapse && (
            <div style={{width: '100%'}}>
              <Button
                className={classes.button}
              >
                {page.title}
                <KeyboardArrowDownIcon />
              </Button>
              <div style={{padding: '0px 15px'}}>
                {page.links.map(function(item, i){
                  return(
                    <Button
                      activeClassName={classes.active}
                      className={classes.button}
                      component={CustomRouterLink}
                      to={item.href}
                      key={i}
                    >
                      {item.title}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}
          
        </ListItem>
      ))}
      {localStorage.userToken === undefined && (
        <ListItem>
          <Fab variant="extended" size='small' className={classes.loginButton} onClick={openloginmodal1}>
            Login
          </Fab>
        </ListItem>
      )}
      {localStorage.userToken !== undefined && (
        <>
        <ListItem>
          <Avatar alt={userdata.username} src={userdata.image === 'default.png' ? require("../../../../assets/img/default.png") : userdata.image} className={classes.avatarImg}/>
          <p>{userdata.username}</p>
          
        </ListItem>
        <ListItem>
          <Fab variant="extended" size='small' className={classes.loginButton} onClick={Logout}>
            Log Out
          </Fab>
        </ListItem>
        </>
      )}
      
    </List>
    
    </>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
  openloginmodal: PropTypes.func
};

export default SidebarNav;
