import React from "react";

import { connect } from 'react-redux';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import RegisterTopBar from './RegisterTopbar';
import HomeContent from './HomeSection/HomeContent.jsx';
import LinearProgress from '@material-ui/core/LinearProgress';

import { withStyles } from '@material-ui/core/styles';

import {server_url} from "../server_host.js";
import {course_get} from '../Function/Courses.js';
// const useStyles = makeStyles(styles);
const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#ff6c5c',
  },
  barColorPrimary: {
    backgroundColor: 'white',
  },
})(LinearProgress);
function CodeTest(props) {

  const [pageLoad, setPageLoad] = React.useState(false);
  const [courseList, setCourseList] = React.useState([]);
  const [contentWidth, setContentWidth] = React.useState('1600px');
  function reportWindowSize() {
    if(window.innerWidth < 1600){
        setContentWidth('100%');
    }
    else {
        setContentWidth('1600px');
    }
  }
  React.useEffect(() => {
    setPageLoad(true);
    if(window.innerWidth < 1600) {
      setContentWidth('100%')
    }
    else {
      setContentWidth('1600px')
    }
    if(!pageLoad){
      props.dispatch({
        type: 'DELETE_ALL'
      });
    }
    var data = {
      id: '0'
    }
    course_get(data).then(res => {
      setCourseList(res);
    })
    .catch(err => {
      console.log(err);
    });
    window.scrollTo(0, 0);
    window.addEventListener('resize', reportWindowSize);
    return function cleanup() {
      window.removeEventListener("resize", reportWindowSize);
    };
  }, [props, pageLoad]);
  return (<>
    {courseList.length === 0 && (
      <div style={{position: 'absolute', width: '100%', zIndex: '100', top: '0px', left: '0px'}}>
        <ColorLinearProgress />
      </div>
    )}
    <RegisterTopBar />
    <Header courselist={courseList} server={server_url}/>
    <div style={{width: contentWidth, margin: 'auto', overflow: 'hidden'}}>
      <HomeContent  courselist={courseList}/>
      <Footer />
    </div>
    
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    posts: state
  }
}

export default connect(mapStateToProps)(CodeTest);