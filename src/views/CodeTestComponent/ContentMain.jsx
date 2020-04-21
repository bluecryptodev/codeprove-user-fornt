import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import SwipeableViews from 'react-swipeable-views';
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CodeIcon from '@material-ui/icons/Code';
import CircularProgress from '@material-ui/core/CircularProgress';
import WebIcon from '@material-ui/icons/Web';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CheckIcon from '@material-ui/icons/Check';


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import FileCopyIcon from '@material-ui/icons/FileCopy';
// import Rating from '@material-ui/lab/Rating';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import JSZIP from 'jszip';
import { saveAs } from 'file-saver';

import { connect } from 'react-redux';

//other
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { bounceIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import AceEditor from "react-ace";

import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/snippets/c_cpp";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-xcode";

import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import styles from '../../assets/jss/codetest/contentmain.js';

import VimeoPlayer from './VimeoPlayer.jsx';
import playButton from '../../assets/img/play_button.svg';

import {lectureitemget, bookmark_add} from '../../Function/LectureItems.js';
import {codereivew} from '../../Function/CodeReview.js';
import {user_get, custome_update} from '../../Function/User.js';
import {feedback_add} from '../../Function/Feedback.js';


const useStyles = makeStyles(styles);
const animationStyles = {
  bounceIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounceIn, 'bounceUp')
  },
}
/******************Tab Pannel **************************/
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </Typography>
  );
}
function MyNotification(props) {
  return (
    <div style={{
      display: 'flex',
      backgroundColor: 'white',
      borderRadius: 5,
      padding: '15px',
      width: '100%'
    }}>
      <div style={{padding: '5px 10px 10px 5px', width: '20px', height: '20px', borderRadius: '20px', background: 'linear-gradient(-32deg, rgb(28, 247, 45) 0px, rgb(205, 250, 97) 100%)'}}>
        <CheckIcon style={{color: 'white'}}/>
      </div>
      <div style={{marginTop: 10, marginLeft: 10}}>
        <h5 style={{margin: 0}}>{props.title}</h5>
      </div>
    </div>
  )
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
function ContentNavbar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [value1, setValue1] = React.useState(0);

  
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };

  const handleChangeIndex1 = index => {
    setValue1(index);
  };
  const ref = React.useRef(null);
  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);
  const [problemTab, setProblemTab] = React.useState(true);
  const [contentHeight, setContentHeight] = React.useState(0);
  const [codeEditorHeight, setCodeEditorHeight] = React.useState('');
  const [lectureItemContent, setLectureItemContent] = React.useState({});
  const [puzzleAnswer, setPuzzleAnswer] = React.useState([]);
  const [sampleExcute, setSampleExcute] = React.useState(false);
  const [excuteSubmitted, setExcuteSubmitted] = React.useState(false);
  const [excuteResult, setExcuteResult] = React.useState([false, false, false]);
  const [testResult, setTestResult] = React.useState([]);
  const [customInput, setCustomInput] = React.useState('');
  const [customExcute, setCustomExcute]= React.useState(false);
  const [customResult, setCustomResult] = React.useState('');
  const [customResultError, setCustomeResultError] = React.useState(false);
  const [expectResult, setExpectResult] = React.useState('');
  const [expectSubmit, setExpectSubmit] = React.useState(false);

  const [solutionModal, setSolutionMOdal] = React.useState(false);
  const [mainCode, setMainCode] = React.useState('');
  const [yourCode, setYourCode] = React.useState('');
  const [codeMode, setCodeMode] = React.useState('');
  const [sampleCode, setSampleCode] = React.useState('');
  const [sampleMainCode, setSampleMainCode] = React.useState('');
  const [videoDialog, setVideoDialog] = React.useState(false);
  const [feedBackSend, setFeedBackSend] = React.useState(false);
  const [bookMarkCheck, setBookMarkCheck] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});

  const [yourCode1, setYourCode1] = React.useState(props.posts[11].value);
  const [mainCode1, setMainCode1] = React.useState(props.posts[3].value);
  const [previousID, setPreviousID] = React.useState('');
  const [pageLoad, setPageLoad] = React.useState(false);
  const [sampleInput, setSampleInput] = React.useState([]);
  const [sampleOutput, setSampleOutput] = React.useState([]);
  const [feedback, setFeedback] = React.useState('');
  

  const FeedBackChange = (value) => {
    setFeedBackSend(value)
  }
  const SubmissionChange = (value) => {
    // console.log(props.posts[22].value)
    var data = {
      "id": "submission_tab",
      "value": value
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
  }
  const BookMarkChange = () => {
    if(!bookMarkCheck){
      lectureItemContent.bookmark.push(localStorage.userToken);
    }
    else {
      var remove = lectureItemContent.bookmark.indexOf(localStorage.userToken);
      if(remove > -1){
        lectureItemContent.bookmark.splice(remove, 1);
      }
    }
    var data= {
      id: props.posts[0].value,
      bookmark_list: lectureItemContent.bookmark
    }
    bookmark_add(data).then(res => {
      setBookMarkCheck(!bookMarkCheck);
      if(bookMarkCheck){
        store.addNotification({
          content: <MyNotification title="Bookmark Successfully Removed!"/>,
          container: 'top-right',
          animationIn: ["animated", "bounceIn"],
          animationOut: ["animated", "bounceOut"],
          dismiss: {
            duration: 3000
          },
          width: 300
        })
      }
      else {
        store.addNotification({
          content: <MyNotification title="Bookmark Successfully Added!"/>,
          container: 'top-right',
          animationIn: ["animated", "bounceIn"],
          animationOut: ["animated", "bounceOut"],
          dismiss: {
            duration: 3000
          },
          width: 300
        })
      }
      var flg = props.posts[24].value;
      data = {
        "id": "book_mark",
        "value": !flg
        };
        props.dispatch({
            type: 'UPDATE',
            data
        });
    })
    if(!bookMarkCheck){
      var bookList = {
        course_id: localStorage.course_id,
        lecture_id: props.lecture_info._id,
        item_id: lectureItemContent._id,
        deadline: props.deadline,
        save_date: dateFormate()
      }
      userInfo.bookmark_list.push(bookList);
    }
    else {
      var filtered = userInfo.bookmark_list.filter(function(el) { return el.item_id !== lectureItemContent._id; }); 
      userInfo.bookmark_list = filtered
    }
    data = {
      id: localStorage.userToken,
      data: userInfo.bookmark_list,
      flg: 'bookmark',
    };
    custome_update(data).then(res => {
    })
  }
  function dateFormate() {
    var date = new Date();
    var monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var day = date.getDate();
    return day+" "+monthNames[monthIndex]+" "+year;
  }
  const solutionChange = (value, item) => {
    setSolutionMOdal(value);
    if(item !== undefined){
      setYourCode(item.solutionfile);
      setMainCode(item.mainfile);
      if(item.code === "c_cpp"){
        setCodeMode("cpp");
      }
      if(item.code === "python"){
        setCodeMode("python");
      }
      if(item.code === "java"){
        setCodeMode("java");
      }
    }
    
    setValue(0);
  }

  function FeedBackValueChange(e) {
    setFeedback(e.target.value);
  }
  function FeedbackAdd() {
    var data = {
      user_id: userInfo._id,
      user_name: userInfo.username,
      user_email: userInfo.email,
      lectureitem_id: lectureItemContent._id,
      lectureitem_name: lectureItemContent.title,
      feedback: feedback
    }
    feedback_add(data).then(res => {
      store.addNotification({
        content: <MyNotification title="Sent Feedback!"/>,
        container: 'top-right',
        animationIn: ["animated", "bounceIn"],
        animationOut: ["animated", "bounceOut"],
        dismiss: {
          duration: 3000
        },
        width: 300
      });
      setFeedBackSend(false)
    })
    .catch(err => {
      console.log(err);
    })
  }
  // const id = props.posts[0].value;
  function selelctProblemTab(value) {
    setProblemTab(value);
    var data = {
      "id": "code_submit",
      "value": 'false'
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
  }
  function CodeChange(newValue) {
    setMainCode1(newValue);
    var data = {
      "id": "main_code_content",
      "value": newValue
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
  }
  function YourCodeChange(newValue) {
    setYourCode1(newValue)
    var data = {
      "id": "your_code_content",
      "value": newValue
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
  }
  const puzzleAnswerChange = event => {
    setPuzzleAnswer([event.target.value]);
    var value = [event.target.value]
    var data = {
      "id": "puzzle_answer",
      "value": value
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
  };
  function puzzleAnswerChangeCheck(e) {
    if(e.target.checked){
      var data1 = [...puzzleAnswer, e.target.value];
    }
    else {
      data1 = puzzleAnswer;
      var remove = data1.indexOf(e.target.value);
      if(remove > -1){
        data1.splice(remove, 1);
      }
    }
    setPuzzleAnswer(data1);
    var data = {
      "id": "puzzle_answer",
      "value": data1
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
  }
  function puzzleAnswerChangeText(e) {
    setPuzzleAnswer(e.target.value)
    var data = {
      "id": "puzzle_answer",
      "value": [e.target.value]
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
  }
  
  function sampleExcuteSubmite() {
    setSampleExcute(true);
    setExcuteSubmitted(false);
    var lng = '';
    var solutionfilename = '';
    var mainfilename = '';
    if(props.posts[2].value === 'python')
    {
      lng = 'python';
      mainfilename = 'main.py';
      solutionfilename = 'Solution.py';
    }
    else if(props.posts[2].value === 'c_cpp'){
      lng = 'cpp';
      solutionfilename = 'Solution.h';
      mainfilename = 'main.cpp';
    }
    else {
      lng = 'java';
      solutionfilename = 'Solution.java';
      mainfilename = 'main.java';
    }
    for(var i = 0; i < sampleInput.length; i++){
      valueCompair(lng, mainfilename, solutionfilename, sampleInput[i], sampleOutput[i])
    }  
  }
  var count = 0;
  function valueCompair(lng, filename, solutionfilename, inp, out){
    var data = {};
    if(props.posts[3].value === ''){
      data = {
        url: 'https://run.glot.io/languages/'+lng+'/latest',
        jsondata: {
          "stdin": inp,
          "files": [
            {
              "name": solutionfilename,
              "content": props.posts[11].value,
              'time': ''
            }
          ]
        }
      }
    }
    else {
      data = {
        url: 'https://run.glot.io/languages/'+lng+'/latest',
        jsondata: {
          "stdin": inp,
          "files": [
            {
              "name": filename,
              "content": props.posts[3].value,
              'time': ''
            },
            {
              "name": solutionfilename,
              "content": props.posts[11].value,
              'time': ''
            }
          ]
        }
      }
    }
    
    codereivew(data).then(res => {
      var re = excuteResult;
      for(var i = 0; i < sampleInput.length; i++){
        if(sampleOutput[i] === out){
          if(out === res.stdout.split('\n')[0]){
            re[i] = true
          }
          else {
            re[i] = false
          }
        }
      }
      setExcuteResult(re);
      count++;
      if(count === 3){
        setSampleExcute(false);
        setExcuteSubmitted(true);
        count = 0;
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  function customInputChange(e){
    setCustomInput(e.target.value)
  }
  function customInputReview(){
    setCustomExcute(true);
    setExpectSubmit(false);
    var count = 0;
    var lng = '';
    
    
    var solutionfilename = '';
    var mainfilename = "";
    if(props.posts[2].value === 'python')
    {
      lng = 'python';
      mainfilename = 'main.py';
      solutionfilename = 'Solution.py';
    }
    else if(props.posts[2].value === 'c_cpp'){
      lng = 'cpp';
      solutionfilename = 'Solution.h';
      mainfilename = 'main.cpp';
    }
    else {
      lng = 'java';
      solutionfilename = 'Solution.java';
      mainfilename = 'main.java';
    }
    var data = {};
    if(props.posts[3].value === ''){
      data = {
        url: 'https://run.glot.io/languages/'+lng+'/latest',
        jsondata: {
          "stdin": customInput,
          "files": [
            {
              "name": solutionfilename,
              "content": props.posts[11].value,
              'time': ''
            }
          ]
        }
      }
    }
    else {
      data = {
        url: 'https://run.glot.io/languages/'+lng+'/latest',
        jsondata: {
          "stdin": customInput,
          "files": [
            {
              "name": mainfilename,
              "content": props.posts[3].value,
              'time': ''
            },
            {
              "name": solutionfilename,
              "content": props.posts[11].value,
              'time': ''
            }
          ]
        }
      }
    }
    
    codereivew(data).then(res => {
      count++;
      // var flg = 'custom';
      if(count === 2){
        setCustomExcute(false);
        setExpectSubmit(true);
      }
      if(res.stderr === ""){
        setCustomResult(res.stdout)
      }
      else {
        setCustomResult(res.stderr);
        setCustomeResultError(true);
      }
      
    })
    .catch(err => {
      console.log(err)
    })
    if(props.posts[3].value === ''){
      data = {
        url: 'https://run.glot.io/languages/'+lng+'/latest',
        jsondata: {
          "stdin": customInput,
          "files": [
            {
              "name": solutionfilename,
              "content": sampleCode,
              'time': ''
            }
          ]
        }
      }
    }
    else {
      data = {
        url: 'https://run.glot.io/languages/'+lng+'/latest',
        jsondata: {
          "stdin": customInput,
          "files": [
            {
              "name": mainfilename,
              "content": sampleMainCode,
              'time': ''
            },
            {
              "name": solutionfilename,
              "content": sampleCode,
              'time': ''
            }
          ]
        }
      }
    }
    
    codereivew(data).then(res => {
      // var flg = 'expect';
      count++;
      if(count === 2){
        setCustomExcute(false);
        setExpectSubmit(true);
      }
      setExpectResult(res.stdout)
      
    })
    .catch(err => {
      console.log(err)
    })
  }
  function inputCopy(value) {
    setCustomInput(value);
  }
  function ZIPFile() {
    var zip = new JSZIP();
    var input = zip.folder("in");
    for(var i = 0; i < sampleInput.length; i++){
      input.file(("input"+(i+1)+".txt"), sampleInput[i]);
    }
    
    var output = zip.folder("out");
    for(i = 0; i < sampleOutput.length; i++){
      output.file(("output"+(i+1)+".txt"), sampleOutput[i]);
    }
    zip.generateAsync({type:"blob"}).then(function(content) {
      // see FileSaver.js
      saveAs(content, "example.zip");
    });
  }
  const videoChange = (value) => {
    setVideoDialog(value);
  }

  React.useEffect(() => {
    // setContentHeight(0);
    if(ref.current !== null && (props.posts[1].value === 'code')){
      setContentHeight(ref.current.clientHeight);
      setCodeEditorHeight(ref1.current.clientHeight.toString()+"px");
      
    }
    if(ref2.current !== null && (props.posts[1].value === 'puzzle')){
    }
    
    var item_name = "";
    
    if(((props.posts[0].value !== previousID || props.posts[1].value === 'code') && !props.posts[14].value)){
      setPageLoad(false);
      
      var data = {
        id: props.posts[0].value
      };
      lectureitemget(data).then(res => {
        if(res.bookmark.includes(localStorage.userToken)){
          setBookMarkCheck(true);
        }
        else {
          setBookMarkCheck(false);
        }
        item_name = res.title;
        setLectureItemContent(res);
        setSampleInput(res.check_input);
        setSampleOutput(res.check_output);
        item_name = res.title;
        if(res.sample_code !== undefined){
          if(props.posts[2].value === 'python'){
            setSampleCode(res.sample_code.python);
            
          }
          if(props.posts[2].value === 'c_cpp'){
            setSampleCode(res.sample_code.cpp);
            setSampleMainCode(res.filename.cpp.main);
          }
          if(props.posts[2].value === 'java'){
            setSampleCode(res.sample_code.java);
            setSampleMainCode(res.filename.java.main);
          }
        }
        if(res.type === 'code' && (props.posts[3].value === "" && props.posts[11].value === "") && props.posts[12].value) {
          
          if(props.posts[2].value === 'python'){
            data = {
              "id": "your_code_content",
              "value": res.filename.python.solution
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
            data = {
                "id": "main_code_content",
                "value": res.filename.python.main
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
          }
          else if(props.posts[2].value === 'c_cpp'){
            data = {
              "id": "your_code_content",
              "value": res.filename.cpp.solution
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
            data = {
                "id": "main_code_content",
                "value": res.filename.cpp.main
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
          }
          else {
            data = {
              "id": "your_code_content",
              "value": res.filename.java.solution
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
            data = {
                "id": "main_code_content",
                "value": res.filename.java.main
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
          }
          data = {
            id: localStorage.userToken
          }
          user_get(data).then(res => {
            setUserInfo(res);
            for(var i = 0; i < res.lecture_content_list.length; i++){
              if(res.lecture_content_list[i].id === props.posts[0].value){
                
                if(props.posts[2].value === 'python'){
                  if(res.lecture_content_list[i].python_code.your !== "" && res.lecture_content_list[i].python_code.your !== undefined){
                    data = {
                      "id": "your_code_content",
                      "value": res.lecture_content_list[i].python_code.your
                    };
                    props.dispatch({
                        type: 'UPDATE',
                        data
                    });
                  }
                  if(res.lecture_content_list[i].python_code.main !== "" && res.lecture_content_list[i].python_code.main !== undefined){
                    data = {
                        "id": "main_code_content",
                        "value": res.lecture_content_list[i].python_code.main
                    };
                    props.dispatch({
                        type: 'UPDATE',
                        data
                    });
                  }
                }
                else if(props.posts[2].value === 'c_cpp'){
                  if(res.lecture_content_list[i].cpp_code.your !== "" && res.lecture_content_list[i].cpp_code.your !== undefined){
                    data = {
                      "id": "your_code_content",
                      "value": res.lecture_content_list[i].cpp_code.your
                    };
                    props.dispatch({
                        type: 'UPDATE',
                        data
                    });
                  }
                  if(res.lecture_content_list[i].cpp_code.main !== "" && res.lecture_content_list[i].cpp_code.main !== undefined){
                    data = {
                        "id": "main_code_content",
                        "value": res.lecture_content_list[i].cpp_code.main
                    };
                    props.dispatch({
                        type: 'UPDATE',
                        data
                    });
                  }
                }
                else {
                  if(res.lecture_content_list[i].java_code.your !== "" && res.lecture_content_list[i].java_code.your !== undefined){
                    data = {
                      "id": "your_code_content",
                      "value": res.lecture_content_list[i].java_code.your
                    };
                    props.dispatch({
                        type: 'UPDATE',
                        data
                    });
                  }
                  if(res.lecture_content_list[i].java_code.main !== "" && res.lecture_content_list[i].java_code.main !== undefined){
                    data = {
                        "id": "main_code_content",
                        "value": res.lecture_content_list[i].java_code.main
                    };
                    props.dispatch({
                        type: 'UPDATE',
                        data
                    });
                  }
                }
                break;
              }
            }
            
          })
          data = {
            "id": "main_com_load",
            "value": false
          };
          props.dispatch({
              type: 'UPDATE',
              data
          });
        }
        data = {
          id: localStorage.userToken,
          course_id: localStorage.course_id,
          lecture_id: props.lecture_info._id,
          lecture_name: props.lecture_info.title,
          item_id: props.posts[0].value,
          item_name: item_name,
          flg: 'step_status',
        }
        custome_update(data).then(res => {
        })
      })
      .catch(err => {
        console.log(err)
      });
      
      if(!props.posts[14].value){
        data = {
          "id": "page_load",
          "value": true
        };
        props.dispatch({
            type: 'UPDATE',
            data
        });
      }
    }
    else {
      if(!props.posts[14].value){
        data = {
          "id": "page_load",
          "value": true
        };
        props.dispatch({
            type: 'UPDATE',
            data
        });
      }
    }
    
    if(!props.posts[14].value){
      data = {
        id: localStorage.userToken
      }
      user_get(data).then(res => {
        for(var i = 0; i < res.lecture_content_list.length; i++){
          if(res.lecture_content_list[i].id === props.posts[0].value){
            if(props.posts[1].value === 'code'){
              if(res.lecture_content_list[i].submit_list !== undefined){
                data = {
                  "id": "test_result",
                  "value": res.lecture_content_list[i].submit_list
                };
                props.dispatch({
                    type: 'UPDATE',
                    data
                });
              }
              var t = [];
              if(res.lecture_content_list[i].submit_list !== undefined){
                for(var j = 0; j < res.lecture_content_list[i].submit_list.length; j++){
                  t[res.lecture_content_list[i].submit_list.length-(j+1)] = res.lecture_content_list[i].submit_list[j];
                }
              }
              setTestResult(t);
            }
            if(props.posts[1].value === 'puzzle'){
              data = {
                "id": "puzzle_answer",
                "value": res.lecture_content_list[i].submit_list
              };
              props.dispatch({
                  type: 'UPDATE',
                  data
              });
              if(res.lecture_content_list[i].submit_list.length !== 0){
                setPuzzleAnswer(res.lecture_content_list[i].submit_list);
              }
              else {
                setPuzzleAnswer([]);
              }
              
            }
            
            break;
          }
        }
        setTimeout(function(){
          setPageLoad(true);
        }, 1000);
      })
      .catch(err => {
        console.log(err);
      })
    }
    if(props.posts[0].value !== previousID && props.posts[1].value === 'puzzle'){
      setPuzzleAnswer('')
    }
    var t = [];
    if(props.posts[5].value !== undefined){
      for(var j = 0; j < props.posts[5].value.length; j++){
        t[props.posts[5].value.length-(j+1)] = props.posts[5].value[j];
      }
    }
    data = {
      id: localStorage.userToken
    }
    user_get(data).then(res => {
      setUserInfo(res)
    })
    setTestResult(t);
    setYourCode1(props.posts[11].value);
    setMainCode1(props.posts[3].value);
    setPreviousID(props.posts[0].value);
    
    return function cleanup() {
      
    };
  }, [props, previousID]);
  return (<>
    {pageLoad && (
    <>
    <ReactNotifications />
    {Object.keys(lectureItemContent).length !== 0 && (
      <div style={{maxHeight: props.height}}>
{/***************************** VIDEO *********************************************/}
        { props.posts[1].value === 'video' && ( <div style={{background: 'black'}}>
          {/* {console.log(props.width)} */}
          {props.width !== 0 && (
            
            // <Clappr 
            //   title="qwe"
            //   width = {props.width}
            //   height = {props.height}
            //   source = {lectureItemContent.url}
            //   mute= {true}
            // />
            // <Vimeo video="384539109" height={props.height} width= {props.width}/>
            <VimeoPlayer video={lectureItemContent.url} height={props.height} width= {props.width} user_data={userInfo}/>
          )}
        </div>)}
{/************************ CODE *********************************************/}
        { (props.posts[1].value === 'code' && Object.keys(lectureItemContent).length !== 0) && (
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6} md={4}>
              <div  className={classes.content} style={{height: props.height, width: '100%', display: 'flex', flexDirection: 'column'}}>
                <div className={classes.problemHeader}>
                  <div className={classes.buttonGroup}>
                    {(problemTab && props.posts[4].value === 'false') && (<><StyleRoot style={{display: 'inline-block'}}>
                      <div className={classes.button+ " " +classes.buttonSelect} style={animationStyles.bounceIn} onClick={() => selelctProblemTab(true)}>
                        Problem
                      </div>
                    </StyleRoot>
                    <div className={classes.button} style={animationStyles.bounceIn} onClick={() => selelctProblemTab(false)}>
                      Result
                    </div></>
                    )}

                    {(!problemTab || props.posts[4].value === 'true') && (<>
                    <div className={classes.button} style={animationStyles.bounceIn} onClick={() => selelctProblemTab(true)}>
                      Problem
                    </div>
                    <StyleRoot style={{display: 'inline-block'}}>
                      <div className={classes.button+ " " + classes.buttonSelect} style={animationStyles.bounceIn} onClick={() => selelctProblemTab(false)}>
                        Result
                      </div>
                    </StyleRoot></>)}
                  </div>
                  <Tooltip TransitionComponent={Zoom} title="Bookmark Problem" placement="left">
                    <IconButton edge="start" className={classes.bootmarkbutton} color="inherit" aria-label="menu" onClick={BookMarkChange}>
                      {bookMarkCheck && (
                        <BookmarkIcon style={{color: '#ff8e8e'}}/>
                      )}
                      {!bookMarkCheck && (
                        <BookmarkBorderIcon  style={{color: '#ff8e8e'}}/>
                      )}
                      
                    </IconButton>
                  </Tooltip>
                </div>
                <div style={{flex: 1}} ref={ref}>
                  {contentHeight !== 0 && (
                  <div style={{height: contentHeight}}>
                    <PerfectScrollbar>
                      {(problemTab && props.posts[4].value === 'false') && (
                      <div className={classes.problemContent}>
                        <h3>{lectureItemContent.title}</h3>
                        <span onClick={() => FeedBackChange(true)} className="send_feedback">Send Feedback</span>

                        <br />
                        <p className={classes.problemText}>{lectureItemContent.description}</p>
                        {lectureItemContent.in_format !== '' && (
                          <div className={classes.group}>
                            <p >Input Format:</p>
                            <div className={classes.codepart}>
                              <pre>
                                <code className={classes.problemCode}>
                                  {lectureItemContent.in_format}
                                </code>
                              </pre>
                            </div>
                          </div>
                        )}
                        {lectureItemContent.out_format !== '' && (
                          <div className={classes.group}>
                            <p >Output Format:</p>
                            <div className={classes.codepart}>
                              <pre>
                                <code className={classes.problemCode}>
                                  {lectureItemContent.out_format}
                                </code>
                              </pre>
                            </div>
                          </div>
                        )}
                        {lectureItemContent.contain !== '' && (
                          <div className={classes.group}>
                            <p >Constraints:</p>
                            
                              <pre>
                                <code className={classes.problemCode}>
                                  {lectureItemContent.contain}
                                </code>
                              </pre>
                          </div>
                        )}
                        {lectureItemContent.notes !== '' && (
                          <div className={classes.group}>
                            <p >Note:</p>
                            
                              <pre>
                                <code className={classes.problemCode}>
                                  {lectureItemContent.notes}
                                </code>
                              </pre>
                          </div>
                        )}
                        {lectureItemContent.sample_input.map(function(item, i){
                          return(<div key={i}>
                            <div className={classes.group}>
                              <p >Sample Input:</p>
                              <div className={classes.codepart}>
                                <pre>
                                  <code className={classes.problemCode}>
                                    {item}
                                  </code>
                                </pre>
                              </div>
                            </div>
                            <div className={classes.group}>
                              <p >Sample Output:</p>
                              <div className={classes.codepart}>
                                <pre>
                                  <code className={classes.problemCode}>
                                    {lectureItemContent.sample_output[i]}
                                  </code>
                                </pre>
                              </div>
                            </div>
                            </div>
                          )
                        })}
                      </div>
                      )}
                      {(!problemTab || props.posts[4].value === 'true') && (
                        <div className={classes.problemContent}>
                          
                          <div className={classes.sbmissionTab}>
                            <span onClick={() => SubmissionChange(0)} className={(props.posts[22].value === 0) ? classes.sbmissionTabActive : ''}>Submission</span>
                            <span onClick={() => SubmissionChange(1)} className={(props.posts[22].value === 1) ? classes.sbmissionTabActive : ''}>Test Case</span>
                          </div>
                          <div>
                            {(props.posts[22].value === 0) && (
                            <div value={value} index={0} dir={theme.direction} >
                              {testResult.length === 0 && (
                                <h2>No Submission</h2>
                              )}
                              {testResult.map(function(item1, j){
                                if(item1.status.length !== 0){
                                  return(
                                    <div className={!item1.status.includes(false) ? (classes.testResult+" "+classes.testResultSuccess) : classes.testResult} key={j}>
                                      <div className={classes.testResultheader}>
                                        <div className={classes.headerScore}>
                                          <span>Score</span>
                                          <p>{item1.score.toFixed(2)}</p>
                                        </div>
                                        <div>
                                          <Tooltip TransitionComponent={Zoom} title="View Submission" placement="top">
                                            <Fab aria-label="edit" size="small" className={classes.codeViewerbutton} onClick={() => solutionChange(true, item1)}>
                                              <WebIcon />
                                            </Fab>
                                          </Tooltip> 
                                        </div>
                                      </div>
                                      <div className={classes.content1}>
                                        <Grid container spacing={2}>
                                            {item1.status.map(function(item, i){
                                              return(
                                                <Grid item xs={12} sm={6} md={6} key={i}>
                                                  <Tooltip TransitionComponent={Zoom} title={item1.runtimemsg[i]} placement="bottom">
                                                    <div className={classes.resultPart} style={{textAlign: 'center'}}>
                                                      <div className='textpart'>
                                                        <p style={{fontSize: '14px', fontWeight: 'bolder', margin: '5px 0px'}}>Test Case{i+1}</p>
                                                        {item && (
                                                          <p style={{fontSize: '10px', color: 'green', margin: '0px'}}>Correct Answer</p>
                                                        )}
                                                        {(!item && !item1.runtimeflg[i]) && (
                                                          <p style={{fontSize: '10px', color: 'red', margin: '0px'}}>Wrong Answer</p>
                                                        )}
                                                        {item1.runtimeflg[i] && (
                                                          <p style={{fontSize: '10px', color: 'red', margin: '0px'}}>Runtime Error</p>
                                                        )}
                                                      </div>
                                                    </div>
                                                  </Tooltip>
                                                </Grid>
                                              )
                                            })}
                                            
                                          </Grid>
                                      </div>
                                      <div>
                                      <Tooltip TransitionComponent={Zoom} title="Total Time" placement="bottom">
                                          <div className={classes.timeTag}>
                                            <div className={classes.timeIcon}>
                                                <AccessTimeIcon />
                                                
                                            </div>
                                            <p>{item1.time} ms</p>
                                          </div>
                                        </Tooltip>
                                        <Tooltip TransitionComponent={Zoom} title="Language Used" placement="bottom">
                                          <div className={classes.codeTag}>
                                            <div className={classes.codeTagIcon}>
                                                <CodeIcon />
                                                
                                            </div>
                                            {item1.code === 'python' && (
                                              <p>python</p>
                                            )}
                                            {item1.code === 'c_cpp' && (
                                              <p>c++</p>
                                            )}
                                            {item1.code === 'java' && (
                                              <p>java</p>
                                            )}
                                          </div>
                                        </Tooltip>
                                        
                                      </div>
                                    </div>
                                  )
                                }
                                else {
                                  return(
                                    <div className={classes.testResult} key={j}>
                                      <div style={{color: 'red', position: 'relative', top: '50%', left: '50%', display: 'inline-block', transform: 'translate(-50%, 0)'}}>
                                        <CircularProgress size={40} style={{color: 'red'}}/>
                                      </div>
                                    </div>
                                  )
                                  
                                }
                              })}
                              
                            </div>
                            )}
                            {props.posts[22].value === 1 && (
                            <div value={value} index={1} dir={theme.direction}>
                              <div className={classes.sampleTest}>
                                <div className={classes.sampleTestheader}>
                                  <p>Sample Test Cases</p>
                                  <span onClick={ZIPFile}>DOWNLOAD</span>
                                </div>
                                <div>
                                  {sampleExcute && (<>
                                    <CircularProgress size={30} style={{color: 'red'}}/>
                                    <p style={{color: 'red', margin: '-10px 0 0 0', display: 'inline-block', position: 'relative', top: '-9px', left: '5px'}}>Evaluating sample cases...</p>
                                  </>)}
                                  {excuteSubmitted && (
                                  <div className={'result'}>
                                    <Grid container spacing={2}>
                                      {sampleOutput.map(function(item, i){
                                        return(
                                          <Grid item xs={12} sm={6} md={6} key={i}>
                                            <div className={classes.resultPart}>
                                              <div className='textpart'>
                                                <p style={{fontSize: '14px', fontWeight: 'bolder', margin: '5px 0px'}}>Test Case{i+1}</p>
                                                {excuteResult[i] && (
                                                  <p style={{fontSize: '10px', color: 'green', margin: '0px'}}>Correct Answer</p>
                                                )}
                                                {!excuteResult[i] && (
                                                  <p style={{fontSize: '10px', color: 'red', margin: '0px'}}>Wrong Answer</p>
                                                )}
                                              </div>
                                              <Tooltip TransitionComponent={Zoom} title="Copy" placement="bottom">
                                                <IconButton edge="start" className={classes.bootmarkbutton} color="inherit" aria-label="menu" size="small" onClick={() => inputCopy(sampleInput[i])}>
                                                  <FileCopyIcon />
                                                </IconButton>
                                              </Tooltip>
                                            </div>
                                          </Grid>
                                        )
                                      })}
                                      
                                    </Grid>
                                  </div>)}
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.excuteButton}
                                    startIcon={<EmojiPeopleIcon />}
                                    size="small"
                                    disabled={sampleExcute ? true : false}
                                    onClick={sampleExcuteSubmite}
                                  >
                                    EXECUTE
                                  </Button>
                                </div>
                                
                              </div>
                              <div className={classes.sampleTest}>
                                <div className={classes.sampleTestheader}>
                                  <p>Custom Test Case</p>
                                  
                                </div>
                                <TextField
                                  id="outlined-multiline-static"
                                  label="Input Test Case"
                                  multiline
                                  rows="4"
                                  value={customInput}
                                  variant="outlined"
                                  onChange={customInputChange}
                                  style={{width: '100%', marginBottom: '20px'}}
                                />
                                <div className={classes.footerButton}>
                                  {customExcute && (<>
                                    <CircularProgress size={30} style={{color: 'red'}}/>
                                    <p style={{color: 'red', margin: '-10px 0 0 0', display: 'inline-block', position: 'relative', top: '-9px', left: '5px'}}>Evaluating the test case...</p>
                                  </>)}
                                  
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      className={classes.excuteButton}
                                      startIcon={<EmojiPeopleIcon />}
                                      size="small"
                                      onClick={customInputReview}
                                      disabled = {(customInput === '' || customExcute) ? true : false}
                                    >
                                      EXECUTE
                                    </Button>
                                  
                                </div>
                                {expectSubmit && (<>
                                  <div style={{borderBottom: '1px solid #d8d8d8', margin: '20px 0px'}}></div>
                                  <div className={classes.customresultPart}>
                                      <p style={{fontWeight: 'bolder'}}>Result</p>
                                      <p>Your Output</p>
                                      {(customResult !== expectResult && !customResultError) && (
                                        <p style={{background: 'rgba(255,0,0,.1)', color: 'rgba(255,0,0,1)', margin: '0px', display: 'inline-block'}}>Incorrect Output</p>
                                      )}
                                      {(customResult !== expectResult && customResultError) && (
                                        <>
                                          <p style={{background: 'rgba(255,0,0,.1)', color: 'rgba(255,0,0,1)', margin: '0px 0px 20px', display: 'inline-block'}}>Runtime Error (NZEC)</p>
                                          <p style={{background: 'rgba(255,0,0,.1)', color: 'rgba(255,0,0,1)', margin: '0px',  display: 'inline-block'}}>{customResult}</p>
                                        </>
                                      )}
                                      {customResult === expectResult && (
                                        <p style={{background: 'rgba(0,255,0,.1)', color: 'rgba(0,255,0,1)', margin: '0px',  display: 'inline-block'}}>{customResult}</p>
                                      )}
                                      <br/>
                                      <br />
                                      <p>Expected Output</p>
                                      <span>{expectResult}</span>
                                  </div></>
                                )}
                                
                              </div>
                            </div>
                            )}
                          </div>
                          <Dialog
                              open={solutionModal}
                              onClose={() =>solutionChange(false)}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                              className={classes.askModalheader}
                              // fullWidth={true}
                              maxWidth={false}
                          >
                            {codeMode !== 'python' && (
                              <DialogContent className={classes.askModalheader}>
                              {/* <div className="answer-header">
                              </div> */}
                                <Tabs
                                  value={value1}
                                  onChange={handleChange1}
                                  indicatorColor="primary"
                                  // variant="fullWidth"
                                  aria-label="full width tabs example"
                                >
                                  <Tab label="Solution" {...a11yProps(0)} />
                                  <Tab label="Main" {...a11yProps(1)} />
                                </Tabs>
                                
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={value1}
                                    onChangeIndex={handleChangeIndex1}
                                >
                                    <TabPanel value={value1} index={0} dir={theme.direction} style={{width: '700px'}}>
                                      <SyntaxHighlighter language={codeMode} style={anOldHope} showLineNumbers={true} className={classes.codeViewer}>
                                        {yourCode}
                                      </SyntaxHighlighter>
                                    </TabPanel>
                                    <TabPanel value={value1} index={1} dir={theme.direction} style={{width: '700px'}}>
                                      <SyntaxHighlighter language={codeMode} style={anOldHope} showLineNumbers={true} className={classes.codeViewer}>
                                        {mainCode}
                                      </SyntaxHighlighter>
                                    </TabPanel>
                                    
                                </SwipeableViews>
                            </DialogContent>
                            )} 
                            {codeMode === 'python' && (
                              <DialogContent className={classes.askModalheader}>
                              {/* <div className="answer-header">
                              </div> */}
                                <Tabs
                                  value={value1}
                                  onChange={handleChange1}
                                  indicatorColor="primary"
                                  aria-label="full width tabs example"
                                >
                                  <Tab label="Solution" {...a11yProps(0)} />
                                  
                                </Tabs>
                                
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={value1}
                                    onChangeIndex={handleChangeIndex1}
                                >
                                    <TabPanel value={value1} index={0} dir={theme.direction} style={{width: '500px'}}>
                                      <SyntaxHighlighter language={codeMode} style={anOldHope} showLineNumbers={true} className={classes.codeViewer}>
                                        {yourCode}
                                      </SyntaxHighlighter>
                                    </TabPanel>
                                    
                                </SwipeableViews>
                            </DialogContent>
                            )}   
                              
                             
                          </Dialog>
                        </div>
                      )}
                    </PerfectScrollbar>
                    <Tooltip TransitionComponent={Zoom} title="Play Last Video" placement="top">
                      <div className={classes.playButton} onClick={() => videoChange(true)}>
                        <img src ={playButton} alt="play"/>
                      </div>
                    </Tooltip>
                  </div>
                )}   
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={8}  ref={ref1}>
              {props.posts[10].value === 'main' && (
                <AceEditor
                  mode={props.posts[2].value}
                  fontSize={14}
                  theme={props.posts[19].value}
                  onChange={CodeChange}
                  name="UNIQUE_ID_OF_DIV"
                  width="100%"
                  height={codeEditorHeight}
                  editorProps={{ $blockScrolling: true }}
                  value={mainCode1}
                  className="full-screenable-node"
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2
                  }}
                />
              )}
              {props.posts[10].value === 'your' && (
                
                <AceEditor
                  mode={props.posts[2].value}
                  fontSize={14}
                  theme={props.posts[19].value}
                  
                  onChange={YourCodeChange}
                  name="UNIQUE_ID_OF_DIV"
                  width="100%"
                  height={codeEditorHeight}
                  editorProps={{ $blockScrolling: true }}
                  value={yourCode1}
                  className="full-screenable-node"
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2
                  }}
                />
              )}
              
            </Grid>
          </Grid>
        )}
        {props.posts[1].value === 'notes' && (<>
          {lectureItemContent.filename !== undefined && (
            <embed src={props.server+"lectureitem/pdf_get/"+lectureItemContent.filename}  style={{width: "100%", height: props.height}}/>
          )}
          </>
        )}
        
        {(props.posts[1].value === 'puzzle' && lectureItemContent.length !== 0) && (
          <Grid container spacing={0}>
          <Grid item xs={12} sm={6} md={4}>
            <div  className={classes.content} style={{height: props.height, width: '100%', display: 'flex', flexDirection: 'column'}}>
              
              <div style={{flex: 1}} ref={ref2}>
                <div style={{height: props.height}}>
                  <PerfectScrollbar>
                    <div className={classes.puzzleContent}>
                      <div className={classes.puzzleHeader}>
                        <div className={classes.puzzleTitle}>
                          <h3>{lectureItemContent.title}</h3>
                          <span onClick={() => FeedBackChange(true)}>Send Feedback</span>
                        </div>
                        <Tooltip TransitionComponent={Zoom} title="Bookmark Problem" placement="left">
                          <IconButton edge="start" className={classes.puzzleBookmarkButton} color="inherit" aria-label="menu" onClick={BookMarkChange}>
                            {bookMarkCheck && (
                              <BookmarkIcon style={{color: '#ff8e8e'}}/>
                            )}
                            {!bookMarkCheck && (
                              <BookmarkBorderIcon  style={{color: '#ff8e8e'}}/>
                            )}
                          </IconButton>
                        </Tooltip>
                      </div>
                      <p className={classes.problemText}>{lectureItemContent.description}</p>
                      {lectureItemContent.contain !== '' && (
                        <div className={classes.group}>
                          <div className={classes.codepart}>
                            <pre>
                              <code className={classes.problemCode}>
                                {lectureItemContent.contain}
                              </code>
                            </pre>
                          </div>
                        </div>
                      )}
                      
                    </div>
                  </PerfectScrollbar>
                  <Tooltip TransitionComponent={Zoom} title="Play Last Video" placement="top">
                    <div className={classes.playButton} onClick={() => videoChange(true)}>
                      <img src ={playButton} alt="play"/>
                    </div>
                  </Tooltip>
                </div>
                  
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={8}  ref={ref1} style={{padding: '20px', background: '#f3f3f3'}}>
            <Card>
              {lectureItemContent.sample_input.length !== 0 && (
              <CardContent>
                {((lectureItemContent.sample_input[0] === 'option')) && (
                <RadioGroup aria-label="gender" name="answer" value={puzzleAnswer[0] !== undefined ? puzzleAnswer[0] : ''} onChange={puzzleAnswerChange}>
                  {lectureItemContent.sample_input.map(function(item, i){
                    return(
                      i !== 0 &&(
                        <FormControlLabel 
                          value={item} 
                          control={<Radio />} 
                          label={(puzzleAnswer[0] === item && props.submit === 'true') ? <div>{item+" "}<CheckIcon fontSize="small"  style={{ color: 'green' }} /></div> : item} 
                          disabled={(puzzleAnswer[0] !== item && props.submit === 'true') ? true : false}
                          key={i}
                        />
                      )
                        
                    )
                  })}
                  </RadioGroup>
                )}
                {lectureItemContent.sample_input[0] === 'check' && (
                <FormGroup>
                  {lectureItemContent.sample_input.map(function(item, i){
                    return(
                      
                      i !== 0 &&(
                        <FormControlLabel 
                          control={<Checkbox onChange={(e) => puzzleAnswerChangeCheck(e)} value={item} />} 
                          label={(puzzleAnswer.includes(item) && props.submit === 'true') ? <div>{item+" "}<CheckIcon fontSize="small"  style={{ color: 'green' }} /></div> : item} 
                          disabled={(!puzzleAnswer.includes(item) && props.submit === 'true') ? true : false}
                          checked={puzzleAnswer.includes(item) ? true : false}
                          key={i}
                        />)
                        
                    )
                  })}
                  </FormGroup>
                )}
                {lectureItemContent.sample_input[0] === 'textfield' && (
                  <div>
                    <p style={{fontWeight: 'bolder'}}>Answer</p>
                    <TextField id="outlined-basic" label="Type Here" variant="outlined" onChange={(e) => puzzleAnswerChangeText(e)} value={puzzleAnswer}/>
                  </div>
                  
                )}
                {props.submit === 'true' && (
                  <p style={{color: '#0cbf0c', fontWeight: '700', margin: 0}}>Correct Answer</p>
                )}
                {props.submit === 'false' && (
                  <p style={{color: 'red', fontWeight: '700', margin: 0}}>Wrong Answer, Attempt Again</p>
                )}
                {props.submit === 'true' && (
                  <div style={{width: '100%', height: '200px', display: 'flex', flexDirection: 'column', marginTop: '-200px', position: 'relative', zIndex: 1}}>
                    <div style={{flex: '1 1 0%'}}></div>
                  </div>
                )}
              </CardContent>
              )}
            </Card>
          </Grid>
        </Grid>
        )}
        <Dialog
            open={videoDialog}
            onClose={() =>videoChange(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={classes.askModalheader}
            // fullWidth={true}
            maxWidth={false}
        >
            
            <DialogContent className={classes.askModalheader} style={{width: '700px', height: '400px'}}>
                <VimeoPlayer video={props.posts[13].value} height={400} width= {700} user_data={userInfo}/>
            </DialogContent>
        </Dialog>
        <Dialog
            open={feedBackSend}
            onClose={() =>FeedBackChange(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={classes.askModalheader}
            // fullWidth={true}
            maxWidth={false}
        >
            <DialogTitle id="alert-dialog-slide-title" className={classes.modalTitle}>
              <p>Suggest Edit</p>
              
            </DialogTitle>
            <DialogContent className={classes.feedbackModalContent}>
              <TextField
                id="outlined-multiline-static"
                label="Feedback Here"
                multiline
                rows="6"
                value={feedback}
                variant="outlined"
                style={{width: '100%', marginTop: '20px'}}
                placeholder="Your feedback is important to us."
                onChange={FeedBackValueChange}
              />
              {/* <Rating name="size-large" defaultValue={0} size="large" onChange={(e, n) => console.log(n)}/> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={() =>{FeedbackAdd(false)}} >
                  Submit
              </Button>
            </DialogActions>
        </Dialog> 
      </div>)}
      </>
      )}
      {!pageLoad && (
        <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.4)'}}>
          <CircularProgress size={40} style={{color: 'red'}}/>
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
  
export default connect(mapStateToProps)(ContentNavbar)