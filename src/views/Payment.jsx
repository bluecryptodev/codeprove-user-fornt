import React from "react";

import { connect } from 'react-redux';

import Header from './HeaderComponent';
// import Footer from './FooterComponent';
import RegisterTopBar from './RegisterTopbar';
import PaymentComponent from './PaymentComponent/Component.jsx';
import LinearProgress from '@material-ui/core/LinearProgress';
import queryString from 'query-string';

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
function Payment(props) {

  const [pageLoad, setPageLoad] = React.useState(false);
  const [courseList, setCourseList] = React.useState([]);
  const [contentWidth, setContentWidth] = React.useState('1600px');
  const [price, setPrice] = React.useState('');

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
      for(var i = 0; i < res.length; i++){
        if(res[i]._id === props.match.params.id) {
          if(new Date(parseInt(queryString.parse(props.location.search).date)).getDate() === 1){
            setPrice(res[i].price[0].new_price);
          }
          else {
            setPrice(res[i].price[1].new_price);
          }
        }
      }
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
      <PaymentComponent courselist={courseList} id={props.match.params.id} date={queryString.parse(props.location.search).date} price={price} server={server_url}/>
      {/* <Footer /> */}
    </div>
    
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    posts: state
  }
}

export default connect(mapStateToProps)(Payment);