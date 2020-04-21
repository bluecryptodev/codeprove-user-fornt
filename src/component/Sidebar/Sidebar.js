import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Drawer } from '@material-ui/core';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, openloginmodal, className, ...rest } = props;

  const classes = useStyles();
  const [pagesList, setPagesList] = React.useState([])

  
  React.useEffect(() => {
    var pages = [
      {
        title: 'Home',
        href: '/home',
        icon: ""
      },
      {
        collapse: true,
        title: 'Courses',
        links: [],
        icon: ""
      },
      {
        collapse: true,
        title: 'Career Tracks',
        links: [
          {
            title: 'Competitive Programming Course',
            href: '/#',
            icon: ""
          },
          {
            title: 'Full Stack Web Development with Node.js',
            href: '/#',
            icon: ""
          },
          {
            title: 'Data Science & Machine Learning Complete',
            href: '/#',
            icon: ""
          },
        ],
        icon: ""
      },
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: ""
      },
      {
        title: 'Events',
        href: '/event',
        icon: ""
      },
      {
        title: 'My Classroom',
        href: '/classroom-course',
        icon: ""
      },
    ];
    var links = [];
    if(props.courselist.length !== 0){
      for(var i = 0; i < props.courselist.length; i++){
        links[i] = {
          title: props.courselist[i].title,
          href: "/courses/"+props.courselist[i]._id,
          icon: ""
        }
      }
    }
    pages[1].links = links;
    setPagesList(pages)
  },[setPagesList, props])
  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pagesList}
          openloginmodal1={openloginmodal}
          userdata={props.userdata}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  openloginmodal: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
