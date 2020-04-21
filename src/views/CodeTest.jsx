import React from "react";
import Grid from "@material-ui/core/Grid";
import LinearProgress from '@material-ui/core/LinearProgress';

import { connect } from 'react-redux';
import { makeStyles, withStyles } from "@material-ui/core/styles";

import styles from "../assets/jss/codetest/codetest.js";
//Component
import TestList from './CodeTestComponent/TestList.jsx';
import ContentNavbar from './CodeTestComponent/ContentNavbar.jsx';
import ContentMain from './CodeTestComponent/ContentMain.jsx';
import ContentFooter from './CodeTestComponent/ContentFooter.jsx';
import queryString from 'query-string';

import {item_from_course} from '../Function/LectureItems.js';
import {user_get} from '../Function/User.js';
import {lecture_get} from '../Function/Lectures.js';
import {server_url} from "../server_host.js";
const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#ff6c5c',
  },
  barColorPrimary: {
    backgroundColor: 'white',
  },
})(LinearProgress);

const useStyles = makeStyles(styles);
function CodeTest(props) {
  const classes = useStyles();
  const ref = React.useRef(null);

  // const [lectureItem, setLectureItem] = React.useState('');
  const [mainWidth, setMainWidth] = React.useState(0);
  const [mainHeight, setMainHeight] = React.useState(0);
  const [itemList, setItemList] = React.useState([]);
  const [loadflg, setLoadflg] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [submitResult, setSubmitResult] = React.useState('');
  const [lectureInfo, setLectureInfo] = React.useState({});
  const [pauseDays, setPauseDays] = React.useState(0);
  function totalDays(total, num) {
    return total + num;
  }  
  React.useEffect(() => {
    if(localStorage.userToken !== undefined) {

    
      if(ref.current !== null && !loadflg){
        setMainWidth(ref.current.clientWidth);
        setMainHeight(ref.current.clientHeight);
      }
      
      var data = {
        id: props.match.params.lecture_id
      }
      
      item_from_course(data).then(res => {
        res.sort(function(a, b){return a.order_number-b.order_number})
        var score = 0;
        for(var i = 0; i < res.length; i++){
          
          score+=res[i].score;
          
        }
        setScore(score);
        if(props.posts.length >= 23 ){
          setLoadflg(true);
          
          for(i = 0; i < res.length; i++){
            if(res[i]._id === props.posts[0].value){
              setSubmitResult(props.posts[15].value[i]);
            }
          }
        }
          if(props.posts.length === 0){
            /** 0 **/
            var lectureitem_id = '0';
            if(res.length !== 0){
              lectureitem_id = res[0]._id;
            }
            if(props.match.params.item_id !== 'f'){
              lectureitem_id = props.match.params.item_id;
            }
            var data = {
              "id": "lecture_id",
              "value": lectureitem_id
            }
            props.dispatch({
                type: 'ADD_POST',
                data
            });
            /** 1 **/
            var lecture_type = "0";
            if(res.length !== 0){
              lecture_type = res[0].type;
            }
            if(props.match.params.item_id !== 'f'){
              for(var h = 0; h < res.length; h++){
                if(props.match.params.item_id === res[h]._id){
                  lecture_type = res[h].type;
                }
              }
            }
            data = {
              "id": "lecture_type",
              "value": lecture_type
            }
            props.dispatch({
              type: 'ADD_POST',
              data
            });
            /** 2 **/
            data = {
              "id": "code_mode",
              "value": 'python'
            }
            props.dispatch({
              type: 'ADD_POST',
              data
            });
            /** 3 **/
            data = {
              "id": "main_code_content",
              "value": ''
            }
            props.dispatch({
              type: 'ADD_POST',
              data
            });
            /** 4 **/
            data = {
              "id": "code_submit",
              "value": 'false'
            }
            props.dispatch({
              type: 'ADD_POST',
              data
            });
            /** 5 **/
            data = {
              "id": "test_result",
              "value": []
            }
            props.dispatch({
              type: 'ADD_POST',
              data
            });
            /** 6 **/
            data = {
              "id": "list_viewer",
              "value": true
            }
            props.dispatch({
              type: 'ADD_POST',
              data
            });
            /** 7 **/
            data = {
              "id": "full_screen",
              "value": false
            };
            props.dispatch({
              type: 'ADD_POST',
              data
            });
            /** 8 **/
            data = {
              "id": "custome_input",
              "value": false
            };
            props.dispatch({
              type: 'ADD_POST',
              data
            });
            /** 9 **/
            data = {
              "id": "lecture_title",
              "value": res.length !== 0 ? res[0].title : ""
            };
            props.dispatch({
              type: 'ADD_POST',
              data
            });
            /** 10 **/
            data = {
              "id": "code_file",
              "value": "your"
            };
            props.dispatch({
              type: 'ADD_POST',
              data
            });
            /** 11 **/
            data = {
              "id": "your_code_content",
              "value": ''
            }
            props.dispatch({
              type: 'ADD_POST',
              data
            });

            /** 12 **/
            data = {
              "id": "main_com_load",
              "value": true
            }
            props.dispatch({
              type: 'ADD_POST',
              data
            });
            var video_flg = false;
            for(i = 0; i < res.length; i++){
              if(res[i].type === 'video'){
                /** 13 **/
                data = {
                  "id": "last_video",
                  "value": res[i].url
                }
                props.dispatch({
                  type: 'ADD_POST',
                  data
                });
                video_flg = true;
                break;
              }
              
            }
            if(!video_flg) {
              /** 13 **/
              data = {
                "id": "last_video",
                "value": ""
              }
              props.dispatch({
                type: 'ADD_POST',
                data
              });
            }
            /** 14 **/
            data = {
              "id": "page_load",
              "value": false
            }
            props.dispatch({
              type: 'ADD_POST',
              data
            });
            data = {
              id: localStorage.userToken
            }
            var item_list_db = res;
            user_get(data).then(res => {
              var flg = [];
              var in_score = [];
              var answer_list = [];
              for(i = 0; i < item_list_db.length; i++){
                flg[i] = '';
                in_score[i] = 0;
                for(var l = 0; l < res.lecture_content_list.length; l++){
                  if(res.lecture_content_list[l].id === item_list_db[i]._id){
                    flg[i] = res.lecture_content_list[l].submit_status;
                    in_score[i] = res.lecture_content_list[l].score === undefined ? 0 : res.lecture_content_list[l].score;
                  }
                }
                answer_list[i] = [];
              }
              /** 15 **/
              data = {
                "id": "submit_result",
                "value": flg
              }
              props.dispatch({
                type: 'ADD_POST',
                data
              });
              /** 16 **/
              for(i = 0; i < res.lecture_list.length; i++){
                if(props.match.params.lecture_id === res.lecture_list[i].id){
                  data = {
                    "id": "total_score",
                    "value": res.lecture_list[i].score
                  }
                  props.dispatch({
                    type: 'ADD_POST',
                    data
                  });
                }
              }
              /** 17 **/
              data = {
                "id": "individual_score",
                "value": in_score
              }
              props.dispatch({
                type: 'ADD_POST',
                data
              });
              /** 18 **/
              data = {
                "id": "solution_view",
                "value": false
              }
              props.dispatch({
                type: 'ADD_POST',
                data
              });
              /** 19 **/
              data = {
                "id": "editor_theme",
                "value": "clouds_midnight"
              }
              props.dispatch({
                type: 'ADD_POST',
                data
              });
              /** 20 **/
              data = {
                "id": "puzzle_answer",
                "value": []
              }
              props.dispatch({
                type: 'ADD_POST',
                data
              });
              /** 21 **/
              data = {
                "id": "answer_list",
                "value": answer_list
              }
              props.dispatch({
                type: 'ADD_POST',
                data
              });
              /** 22 **/
              data = {
                "id": "submission_tab",
                "value": 0
              }
              props.dispatch({
                type: 'ADD_POST',
                data
              });
              /** 23 **/
              data = {
                "id": "doubte_list",
                "value": []
              }
              props.dispatch({
                type: 'ADD_POST',
                data
              });
              /** 24 **/
              data = {
                "id": "book_mark",
                "value": false
              }
              props.dispatch({
                type: 'ADD_POST',
                data
              });
            })
          }
          setItemList(res.sort(function(a, b){return a.order_number-b.order_number}));
          if(ref.current !== null && !loadflg){
            setMainWidth(ref.current.clientWidth);
          setMainHeight(ref.current.clientHeight);
          }
          
          var itemlist = res;
          data = {
            id: localStorage.userToken
          }
          user_get(data).then(res => {
            for(i = 0; i < itemlist.length; i++){
              for(var j = 0; j < res.lecture_content_list.length; j++){
                if(itemlist[i]._id === res.lecture_content_list[j].id){
                  itemlist[i].me_score = res.lecture_content_list[j].score;
                  itemlist[i].cpp_code = res.lecture_content_list[j].cpp_code;
                  itemlist[i].java_code = res.lecture_content_list[j].java_code;
                  itemlist[i].python_code = res.lecture_content_list[j].python_code;
                }
              }
              for(j = 0; j < res.course_list.length; j++){
                if(localStorage.course_id === res.course_list[j].id){
                  if(res.course_list[j].remain_days_list !== undefined) {
                    setPauseDays(res.course_list[j].remain_days_list.reduce(totalDays))
                  }
                  else {
                    setPauseDays(0);
                  }
                  
                }
              }
            }
            setItemList(itemlist);
          })
          data = {
            id: props.match.params.lecture_id,
            course: 'other'
          }
          lecture_get(data).then(res => {
            setLectureInfo(res);
          });
          
      })
      .catch(err => {
          console.log(err);
      })
      
    }
    else {
      var url = "/login?redirect=lecture-content/"+props.match.params.lecture_id+"/"+props.match.params.item_id+"/"+props.match.params.batch_date;
      window.location.href=url;
    }
  }, [props, loadflg]);
  return (<>
    {!loadflg && (
      <div style={{position: 'absolute', width: '100%', zIndex: '100'}}>
        <ColorLinearProgress />
      </div>
    )}
    {loadflg && (
    <div style={{background: 'white'}}>
      {itemList.length !== 0 && (
      <Grid container spacing={0}>
        {props.posts[6].value &&(
          <Grid item xs={12} sm={6} md={3}>
            <TestList itemlist={itemList} score={score} lecture_info={lectureInfo} deadline={props.match.params.batch_date} server={server_url}/>
          </Grid>
        )}
          
        <Grid item xs={12} sm={6} md={props.posts[6].value ? 9 : 12}>
          <div className={classes.container}>
            <div >
              <ContentNavbar lecture_info={lectureInfo} deadline={props.match.params.batch_date} chatid={queryString.parse(props.location.search).chat_id}/>
            </div>
            <div style={{flex: 1}} ref={ref} >
              <ContentMain width={mainWidth} height={mainHeight} submit={submitResult} server={server_url} lecture_info={lectureInfo} deadline={props.match.params.batch_date}/>
            </div>
            <div>
              <ContentFooter itemlist={itemList} lecture_id={props.match.params.lecture_id} deadline={props.match.params.batch_date} pausedays={pauseDays}/>
            </div>
          </div>
          
        </Grid>
      </Grid>
      )}
    </div>
    )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    posts: state
  }
}

export default connect(mapStateToProps)(CodeTest);