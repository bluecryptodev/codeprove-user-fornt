import React from "react";

import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import BlogComponent from './BlogComponent';

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

function MyClassroom(props) {

  const [pageLoad, setPageLoad] = React.useState(false);
  const [courseList, setCourseList] = React.useState([]);
  const [contentWidth, setContentWidth] = React.useState('1200px');
  function reportWindowSize() {
    if(window.innerWidth < 1200){
        setContentWidth('100%');
    }
    else {
        setContentWidth('1200px');
    }

  }
  
  React.useEffect(() => {
    
    setPageLoad(true);
    if(window.innerWidth < 1200) {
        setContentWidth('100%')
    }
    else {
      setContentWidth('1200px')
    }
    if(!pageLoad){
      props.dispatch({
        type: 'DELETE_ALL'
      });
    }
    if(props.posts.length === 0){
      /** 0 **/
      var data = {
        "id": "register_top_bar",
        "value": true
      }
      props.dispatch({
          type: 'ADD_POST',
          data
      });
    }
    data = {
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
    <BlogComponent width={contentWidth}/>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    posts: state
  }
}

export default connect(mapStateToProps)(MyClassroom);