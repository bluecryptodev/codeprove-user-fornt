import React from "react";
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';

import Header from './HeaderComponent';
import LinearProgress from '@material-ui/core/LinearProgress';

import { withStyles } from '@material-ui/core/styles';

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
  
  React.useEffect(() => {
    setPageLoad(true);
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
  }, [props, pageLoad]);
  return (<>
    {courseList.length === 0 && (
      <div style={{position: 'absolute', width: '100%', zIndex: '100', top: '0px', left: '0px'}}>
        <ColorLinearProgress />
      </div>
    )}
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100vh'}}>
        <Header  courselist={courseList} login="false" redirecturl={queryString.parse(props.location.search).redirect}/>
        <div style={{width: '100%', margin: 'auto', overflow: 'hidden', backgroundImage: 'url("'+require('../assets/img/login_back.png')+'")', flex: '1 1 0'}}>

        </div>
    </div>
    
    
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    posts: state
  }
}

export default connect(mapStateToProps)(withRouter(CodeTest));