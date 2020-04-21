import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SwipeableViews from 'react-swipeable-views';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

//icon
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PanToolIcon from '@material-ui/icons/PanTool';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Drawer from '@material-ui/core/Drawer';
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import Fullscreen from "react-full-screen";
import { ChatkitProvider, TokenProvider } from '../../views/src/index';
import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import VimeoPlayer from './VimeoPlayer.jsx';
import ChattingBox from '../DoubteChattingBox/index.jsx';
import LoadingBox from '../DoubteChattingBox/Loading.jsx';
import {course_get} from '../../Function/Courses.js';
import {lectureitemget, bookmark_add} from '../../Function/LectureItems.js';
import {user_get, custome_update} from '../../Function/User.js';
import {doubt_add, doubte_get} from '../../Function/DoubtChat.js';


import { connect } from 'react-redux';

import styles from '../../assets/jss/codetest/contentheader.js';
function MyNotification(props) {
    return (
      <div style={{
        display: 'flex',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: '15px'
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
const useStyles = makeStyles(styles);
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
const instanceLocator = 'v1:us1:eb148fcd-27ff-4a77-baf3-a490172b8165';
const tokenProvider = new TokenProvider({
  url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/eb148fcd-27ff-4a77-baf3-a490172b8165/token',
});
function ContentNavbar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const [codeMode, setCodeMode] = React.useState('python');
  const [slidLeft, setSlidLeft] = React.useState(false);
  const [chatButtonflg, setChatButtonFLG] = React.useState('1');
  const [askAnswer, setAskAnswer] = React.useState(false);
  const [solutionModal, setSolutionMOdal] = React.useState(false);
  const [solutionView, setSolutionView] = React.useState(false);
  const [codeHeight, setCodeHeight] = React.useState('0');
  const [full, setFull] = React.useState(false);
  const [videoDialog, setVideoDialog] = React.useState(false);
  const [confirmDialog, setConfirmDialog] = React.useState(false);
  const [bookMarkCheck, setBookMarkCheck] = React.useState(false);
  const [lectureItemContent, setLectureItemContent] = React.useState({});
  const [userInfo, setUserInfo] = React.useState({});
  const [sampleCode, setSampleCode] = React.useState({});
  const [doubtTitle, setDoubtTitle] = React.useState("");
  const [doubtDescription, setDoubtDescription] = React.useState("");
  const [doubteActiveList, setDoubteActiveList] = React.useState({});
  const [doubteSolveList, setDoubteSolveList] = React.useState([]);
  const [courseData, setCourseData] = React.useState({});
  const [hintVideoID, setHintVideoID] = React.useState('');
  const [load, setLoad] = React.useState(false);

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
      
      data = {
        "id": "book_mark",
        "value": true
        };
        props.dispatch({
            type: 'UPDATE',
            data
        });
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
  const fullScreen = () => {
    setFull(true);
    setCodeHeight('100vh');
    
  }
  function CodeChange(newValue) {
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
    var data = {
      "id": "your_code_content",
      "value": newValue
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
  }
  const askModalChange = (value) => {
    
    setValue(0);
    var data = {
        id: {
            item_id: props.posts[0].value,
            user_id: localStorage.userToken,
        },
        flg: 'item'
    };
    doubte_get(data).then(res => {
        setDoubteActiveList([])
        for(var i = 0; i < res.length; i++){

            if(!res[i].solve_flg){
                setDoubteActiveList(res[i])
            }
        }
        setDoubteSolveList(res);
        setAskAnswer(value);
    })
    .catch(err => {
        console.log(err)
    });
  }
  const solutionChange = (value) => {
      console.log(solutionView)
    if(solutionView){
        setSolutionMOdal(value);
    }
    else {
        setConfirmDialog(value);
    }
    setValue(0);
    
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log(newValue);
  };
  const videoChange = (value) => {
    setVideoDialog(value);
  }
  const confirmChange = (value, flg) => {
        if(flg === 'yes') {
            props.posts[18].value = true;
            setSolutionMOdal(true);
            setSolutionView(true)
            var lecture_content = userInfo.lecture_content_list;
            for(var i = 0; i < lecture_content.length; i++) {
                if(lecture_content[i].id === props.posts[0].value){
                    lecture_content[i].solution_view = true;
                }
            }
            if(lecture_content.length === 0){
                lecture_content = {
                    id: props.posts[0].value,
                    solution_view: true
                }
            }
            var data = {
                id: localStorage.userToken,
                data: lecture_content,
                flg: 'solution_view'
            }
            custome_update(data).then(res => {
                setConfirmDialog(value);
            })
        }
        else {
            setConfirmDialog(value);
        }
    
  }
  const handleChangeIndex = index => {
    setValue(index);
  };
  const toggleDrawer = (side, open) => event => {
    setValue(0);
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSlidLeft(open);
  };
  const chatButtonChange = flg => {
      setChatButtonFLG(flg);
  }
  function changeTheme() {
      var tt = '';
      if(props.posts[19].value === 'clouds_midnight'){
        tt = 'xcode'
      }
      else {
        tt = 'clouds_midnight'
      }
      var data = {
        "id": "editor_theme",
        "value": tt
        };
        props.dispatch({
            type: 'UPDATE',
            data
        });
  }
  function codeModeChange(e) {
    setCodeMode(e.target.value);
    if(e.target.value === 'python') {
        var data = {
            "id": "code_mode",
            "value": 'python'
        };
        props.dispatch({
            type: 'UPDATE',
            data
        });
        
    }
    else if(e.target.value === 'c++'){
        data = {
            "id": "code_mode",
            "value": 'c_cpp'
        };
        props.dispatch({
            type: 'UPDATE',
            data
        });
    }
    else {
        data = {
            "id": "code_mode",
            "value": 'java'
        };
        props.dispatch({
            type: 'UPDATE',
            data
        });
    }
    data = {
        "id": "your_code_content",
        "value": ""
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
    data = {
        "id": "main_code_content",
        "value": ""
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
    data = {
        "id": "main_com_load",
        "value": true
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
    data = {
        "id": "page_load",
        "value": false
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
    data = {
        "id": "puzzle_answer",
        "value": []
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
  }
  function ListViewer() {
        var data = {
            "id": "list_viewer",
            "value": !props.posts[6].value
        };
        props.dispatch({
            type: 'UPDATE',
            data
        });
  }
  function CodeFileChange(value) {
    var data = {
        "id": "code_file",
        "value": value
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
  }
  function defaultCode() {
    var data = {
        id: props.posts[0].value
    };
    lectureitemget(data).then(res => {
        if(props.posts[2].value === 'python'){
            var data = {
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
        if(props.posts[2].value === 'c_cpp'){
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
        if(props.posts[2].value === 'java'){
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
            id: localStorage.userToken,
            code_mode: props.posts[2].value,
            item_id: props.posts[0].value,
            flg: 'reset_code'
        }
        custome_update(data).then(res => {

        })
    })
    data = {
        id: localStorage.userToken
    }
  }
  function DoubtChange(e) {
    if(e.target.name === 'title') {
        setDoubtTitle(e.target.value);
    }
    else {
        setDoubtDescription(e.target.value);
    }
  }
  function DoubtAdd() {
    
      var data = {
        title: doubtTitle,
        description: doubtDescription,
        course_id: courseData._id,
        course_name: courseData.title,
        lecture_id: props.lecture_info._id,
        lectureitem_id: props.posts[0].value,
        lectureitem_type: props.posts[1].value,
        lectureitem_name: lectureItemContent.title,
        user_id: localStorage.userToken,
        course_deadline: props.deadline,
        user_name: userInfo.username
      };
      doubt_add(data).then(res => {
        store.addNotification({
            content: <MyNotification title="Doubt Created SuccessFully!
            A Teaching Assistant will contact you soon"/>,
            container: 'top-right',
            animationIn: ["animated", "bounceIn"],
            animationOut: ["animated", "bounceOut"],
            dismiss: {
              duration: 3000
            },
            width: 300
        })
        var doubte_list = props.posts[23].value;
        var flg = false;
        for(var i = 0; i < doubte_list.length; i++) {
            if(res.message.id === doubte_list[i].id){
                flg = true;
                break;
            }
        }
        if(!flg){
            var data = {
                id: res.message.id,
                title: doubtTitle,
                description: doubtDescription,
                type: props.posts[1].value,
                solve: false,
                lectureitem_id: props.posts[0].value,
                lectureitem_name: lectureItemContent.title,
                user_id: res.message.user_id,
                other_id: res.message.other_id,
                join_flg: false,
                rate_flg: ''
            }
            doubte_list.push(data);
            data = {
                "id": "doubte_list",
                "value": doubte_list
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
        }
            
        setAskAnswer(false);
      })
  }
  function ChatOpen(item) {
        var doubte_list = props.posts[23].value;
        var flg = false;
        for(var i = 0; i < doubte_list.length; i++) {
            if(item._id === doubte_list[i].id){
                flg = true;
                break;
            }
        }
        if(!flg) {
            var data = {
                id: item._id,
                title: item.title,
                description: item.description,
                type: item.lectureitem_type,
                solve: item.solve_flg,
                lectureitem_id: item.lectureitem_id,
                lectureitem_name: item.lectureitem_name,
                user_id: item.chat_user_id,
                other_id: item.chat_admin_id,
                join_flg: item.join_flg,
                rate_flg: item.rate_flg
            }
            doubte_list.push(data);
            data = {
                "id": "doubte_list",
                "value": doubte_list
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
        }        
        setAskAnswer(false);
  }
  React.useEffect(() => {
    var data = {
        id: props.posts[0].value
    };
    lectureitemget(data).then(res => {
        if(res.hint !== undefined){
            setHintVideoID(res.hint);
        }
        setSampleCode(res.sample_code);
        if(res.bookmark.includes(localStorage.userToken)){
            setBookMarkCheck(true);
        }
        else {
            setBookMarkCheck(false);
        }
        setLectureItemContent(res);
    });
    data = {
        id: localStorage.userToken
    }
    user_get(data).then(res => {
        var lecture_content = res.lecture_content_list;
        for(var i = 0; i < lecture_content.length; i++) {
            if(lecture_content[i].id === props.posts[0].value){
                setSolutionView(lecture_content[i].solution_view);
                props.posts[18].value = lecture_content[i].solution_view;
                break;
            }
        }
        setUserInfo(res);
    })
    data = {
        id: localStorage.course_id
    }
    course_get(data).then(res => {
        setCourseData(res);
    })
    .catch(err => {
        console.log(err);
    })
    var doubte_list = props.posts[23].value;
    if(props.chatid !== undefined && !load) {
        
        data = {
            flg: 'one',
            id: props.chatid
        }
        doubte_get(data).then(res =>{
            console.log(res)
            if(res !== null){
                data = {
                    id: res._id,
                    title: res.title,
                    description: res.description,
                    type: res.lectureitem_type,
                    solve: res.solve_flg,
                    lectureitem_id: res.lectureitem_id,
                    lectureitem_name: res.lectureitem_name,
                    user_id: res.chat_user_id,
                    other_id: res.chat_admin_id,
                    join_flg: res.join_flg,
                    rate_flg: res.rate_flg
                }
                doubte_list.push(data);
                data = {
                    "id": "doubte_list",
                    "value": doubte_list
                };
                props.dispatch({
                    type: 'UPDATE',
                    data
                });
            }
        });
        setLoad(true);
    }
  }, [props, load])
  return (
    props.posts.length !== 0 && (<div className={classes.root}><ReactNotifications />
        { props.posts[1].value === 'code' && ( <AppBar position="static" className={classes.navbar}>
            <Toolbar className={classes.title}>
                <div>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={ListViewer}>
                        <MenuIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('right', true)}>
                        <NotificationsIcon />
                    </IconButton>
                    <Button
                        size="small"
                        startIcon={<PanToolIcon />}
                        className={classes.button}
                        onClick={() =>askModalChange(true)}
                    >
                        ASK/VIEW DOUBT
                    </Button>
                    <Button
                        size="small"
                        startIcon={<DeveloperBoardIcon />}
                        className={classes.button}
                        onClick={() => solutionChange(true)}
                    >
                        SOLUTION
                    </Button>
                    {hintVideoID !== '' && (
                        <Button
                            size="small"
                            startIcon={<WbIncandescentIcon />}
                            className={classes.button}
                            onClick={() => videoChange(true)}
                        >
                            HINT
                        </Button>
                    )}
                </div>
                
            </Toolbar>
            <div className={classes.navbarcode}>
                <IconButton edge="start" className={classes.iconButton} color="inherit" aria-label="menu" size="small" onClick={fullScreen}>
                    <ControlCameraIcon />
                </IconButton>
                {(props.posts[10].value === 'main' && props.posts[3].value !== '') && (
                    <IconButton edge="start" className={classes.iconButton} color="inherit" aria-label="menu" size="small" onClick={() => CodeFileChange('your')} style={{fontSize: '12pz'}}>
                        Your Code
                    </IconButton>
                )}
                {(props.posts[10].value === 'your' && props.posts[3].value !== '') && (
                    <IconButton edge="start" className={classes.iconButton} color="inherit" aria-label="menu" size="small" onClick={() => CodeFileChange('main')} style={{fontSize: '12pz'}}>
                        Main Code
                    </IconButton>
                )}
                {/* <FormGroup className={classes.formGroup}  style={{fontSize: '12pz'}}>
                    <FormControlLabel
                        control={
                            <Switch
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                size="small"
                            />
                        }
                        label="Code Pair"
                    />
                </FormGroup> */}
                <span
                    size="small"
                    className={classes.themesButton}
                    onClick={changeTheme}
                    style={{fontSize: '12pz'}}
                >
                    {props.posts[19].value === 'xcode' ? 'Dark' : 'Light'}
                </span>
                <FormControl className={classes.formControl}>
                    <Select value={codeMode} displayEmpty className={classes.select} onChange={codeModeChange} style={{fontSize: '12pz'}}>
                        <MenuItem value='python'>Python</MenuItem>
                        <MenuItem value='c++'>C++</MenuItem>
                        <MenuItem value='java'>Java</MenuItem>
                    </Select>
                </FormControl>
                <IconButton edge="start" className={classes.iconButton} color="inherit" aria-label="menu" size="small" onClick={defaultCode}>
                    <AutorenewIcon />
                </IconButton>
            </div>
        </AppBar>)}
        { props.posts[1].value === 'video' && ( <AppBar position="static" className={classes.navbar}>
            <Toolbar className={classes.title}>
                <div>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={ListViewer}>
                        <MenuIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('right', true)}>
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={BookMarkChange}>
                        {bookMarkCheck && (
                            <BookmarkIcon />
                        )}
                        {!bookMarkCheck && (
                            <BookmarkBorderIcon />
                        )}
                    </IconButton>
                    <Button
                        size="small"
                        startIcon={<PanToolIcon />}
                        className={classes.button}
                        onClick={() =>askModalChange(true)}
                    >
                        ASK/VIEW DOUBT
                    </Button>
                </div>
                
            </Toolbar>
        </AppBar>)}
        { props.posts[1].value === 'notes' && ( <AppBar position="static" className={classes.navbar}>
            <Toolbar className={classes.title}>
                <div>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={ListViewer}>
                        <MenuIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('right', true)}>
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={BookMarkChange}>
                        {bookMarkCheck && (
                            <BookmarkIcon />
                        )}
                        {!bookMarkCheck && (
                            <BookmarkBorderIcon />
                        )}
                    </IconButton>
                    <Button
                        size="small"
                        startIcon={<PanToolIcon />}
                        className={classes.button}
                        onClick={() =>askModalChange(true)}
                    >
                        ASK/VIEW DOUBT
                    </Button>
                </div>
                
            </Toolbar>
        </AppBar>)}
        { props.posts[1].value === 'puzzle' && ( <AppBar position="static" className={classes.navbar}>
            <Toolbar className={classes.title}>
                <div>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={ListViewer}>
                        <MenuIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('right', true)}>
                        <NotificationsIcon />
                    </IconButton>
                    <Button
                        size="small"
                        startIcon={<PanToolIcon />}
                        className={classes.button}
                        onClick={() =>askModalChange(true)}
                    >
                        ASK/VIEW DOUBT
                    </Button>
                </div>
                
            </Toolbar>
        </AppBar>)}
        <Drawer anchor="right" open={slidLeft} onClose={toggleDrawer('right', false)}>
            <div 
                style={{width: '100%', height: '100vh', position: 'absolute', zIndex: '-1'}}
                onClick={toggleDrawer('right', false)} onKeyDown={toggleDrawer('right', false)}
            >
            </div>
            <div style={{height: '100vh'}}>
                
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                    <Tab label="Notifications" {...a11yProps(0)} />
                    <Tab label="Messages" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                    
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <div style={{borderBottom: '1px dotted grey'}}>
                            <Button size="small" onClick={() => {chatButtonChange('1')}} className={classes.messagePartButton+" "+(chatButtonflg === '1' ? classes.messagePartButtonActive : "")}>
                                Recents
                            </Button>
                            <Button size="small" onClick={() => {chatButtonChange('2')}} className={classes.messagePartButton+" "+(chatButtonflg === '2' ? classes.messagePartButtonActive : "")}>
                                Batchmates
                            </Button>
                            <Button size="small" onClick={() => {chatButtonChange('3')}} className={classes.messagePartButton+" "+(chatButtonflg === '3' ? classes.messagePartButtonActive : "")}>
                                Mentors
                            </Button>
                        </div>
                        <TextField
                            className={classes.margin}
                            id="input-with-icon-textfield"
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            }}
                        />
                    </TabPanel>
                </SwipeableViews>
            </div>
            
        </Drawer>
        <Dialog
            open={askAnswer}
            onClose={() =>askModalChange(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={classes.askModalheader}
            // fullWidth={true}
            maxWidth={false}
        >
            
            <DialogContent className={classes.askModalheader}>
                <div className="answer-header">
                </div>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        
                    >
                    <Tab label="Ask Doubt" {...a11yProps(0)} className={classes.askModalTab}/>
                    <Tab label="Previous Doubts" {...a11yProps(1)}  className={classes.askModalTab}/>
                    </Tabs>
                
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction} style={{width: '500px', height: '300px', padding: '20px'}}>
                        {Object.keys(doubteActiveList).length === 0 && (
                            <>
                                <h3>{lectureItemContent.title}</h3>
                                <Paper component="form" className={classes.root}>
                                    <IconButton className={classes.iconButton} aria-label="menu" style={{borderRadius: '5px', backgroundImage: 'linear-gradient(-135deg,#ff66a8 0,#fad961 100%)', color: 'white'}}>
                                        Title
                                    </IconButton>
                                    <InputBase
                                        className={classes.input}
                                        placeholder="Enter title of your doubt"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                        name="title"
                                        onChange={DoubtChange}
                                    />
                                </Paper>
                                <TextField 
                                    multiline={true} 
                                    rowsMax="4" 
                                    variant="filled" 
                                    style={{width: '100%', marginTop: '20px'}} 
                                    placeholder="Describe your doubt in brief. A Teaching Assistant will get back to you soon."
                                    name="des"
                                    onChange={DoubtChange}
                                />
                            </>
                        )}
                        {Object.keys(doubteActiveList).length !== 0 && (
                            <>
                                <h3>{props.posts[9].value}</h3>
                                <div className={classes.doubteActive}>
                                    <div className="active-first">
                                        <ReportProblemOutlinedIcon />
                                        <div>
                                            <p style={{color: '#e95959'}}>You already have an unresolved doubt. It is currently in <strong>available</strong> state.</p>
                                            <p>Please wait for our mentor to get back to you.</p>
                                        </div>
                                    </div>
                                    <div className="active-second">
                                        <div>
                                            <p style={{color: '#e95959', margin: '0px 0px 10px', fontSize: 14}}>{doubteActiveList.title}</p>
                                            <div className="doubte-data">
                                                <p><strong>Date:</strong> {doubteActiveList.createdAt}</p>
                                                <p><strong>Status:</strong> Available</p>
                                            </div>
                                        </div>
                                        <ForumOutlinedIcon className="chat-open-button" onClick={() => ChatOpen(doubteActiveList)}/>
                                    </div>
                                </div>
                            </>
                        )}
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction} style={{width: '500px', height: '300px', padding: '20px'}}>
                        {doubteSolveList.map(function(item, i){
                            return(
                                <div className={classes.doubteActive} key={i}>
                                    <div className="active-second">
                                        <div>
                                            <p style={{color: '#e95959', margin: '0px 0px 10px', fontSize: 14}}>{item.title}</p>
                                            <div className="doubte-data">
                                                <p><strong>Date:</strong> {item.createdAt}</p>
                                                <p><strong>Status:</strong> {item.solve_flg ? "Resolved" :" Available"}</p>
                                            </div>
                                        </div>
                                        <ForumOutlinedIcon className="chat-open-button" onClick={() => ChatOpen(item)}/>
                                    </div>
                                </div>
                            )
                        })}
                        {doubteSolveList.length === 0 && (
                            <h3 style={{textAlign: 'center'}}>No Asked Doubts</h3>
                        )}
                    </TabPanel>
                </SwipeableViews>
            </DialogContent>
            <DialogActions>
            {value === 0 && (
                <Button onClick={() =>DoubtAdd()} >
                    Submit
                </Button>
            )}
            {value === 1 && (
                <Button onClick={() =>askModalChange(false)} >
                    Close
                </Button>
            )} 
            </DialogActions>
        </Dialog>
        {sampleCode !== undefined && (
            <Dialog
                open={solutionModal}
                onClose={() =>solutionChange(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={classes.askModalheader}
                // fullWidth={true}
                maxWidth={false}
            >
                
                <DialogContent className={classes.askModalheader}>
                    {/* <div className="answer-header">
                    </div> */}
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                            
                        >
                        <Tab label="Python" {...a11yProps(0)} />
                        <Tab label="C++(g++)" {...a11yProps(1)} />
                        <Tab label="Java" {...a11yProps(2)} />
                        </Tabs>
                    
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction} style={{width: '500px'}}>
                            <SyntaxHighlighter language="python" style={anOldHope} showLineNumbers={true} className={classes.codeViewer}>
                                {sampleCode.python}
                            </SyntaxHighlighter>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction} style={{width: '500px'}}>
                            <SyntaxHighlighter language="cpp" style={anOldHope} showLineNumbers={true} className={classes.codeViewer}>
                                {sampleCode.cpp}
                            </SyntaxHighlighter>
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction} style={{width: '500px'}}>
                            <SyntaxHighlighter language="java" style={anOldHope} showLineNumbers={true} className={classes.codeViewer}>
                                {sampleCode.java}
                            </SyntaxHighlighter>
                        </TabPanel>
                    </SwipeableViews>
                </DialogContent>
                <DialogActions>
                <Button onClick={() =>{solutionChange(false)}} >
                    Close
                </Button>
                </DialogActions>
            </Dialog>
        )}
        <Dialog
            open={confirmDialog}
            onClose={() =>confirmChange(false, 'no')}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={classes.askModalheader}
            // fullWidth={true}
            maxWidth={false}
        >
            <DialogTitle id="alert-dialog-slide-title" className={classes.modalTitle}>{"Confirm"}</DialogTitle>
            <DialogContent className={classes.askModalheader}>
                <p style={{padding: '10px'}}>Are you sure you want to see solution? <br/>
                    You will <strong>not get</strong> any <strong>points</strong> after seeing the solution.</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={() =>{confirmChange(false, 'yes')}} variant="contained">
                    Yes
                </Button>
                <Button onClick={() =>{confirmChange(false, 'no')}} variant="contained">
                    No
                </Button>
            </DialogActions>
        </Dialog>
        <Fullscreen
          enabled={full}
          onChange={isFull => {setFull(isFull); if(!isFull){setCodeHeight('0')};}}
        >      
            {props.posts[10].value === 'main' && (
                <AceEditor
                    mode={props.posts[2].value}
                    fontSize={14}
                    theme={props.posts[19].value}
                    onChange={CodeChange}
                    name="UNIQUE_ID_OF_DIV"
                    width="100%"
                    height={codeHeight}
                    editorProps={{ $blockScrolling: true }}
                    value={props.posts[3].value}
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
                  height={codeHeight}
                  editorProps={{ $blockScrolling: true }}
                  value={props.posts[11].value}
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
            
        </Fullscreen>  
        <Dialog
            open={videoDialog}
            onClose={() =>videoChange(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={classes.askModalheader}
            // fullWidth={true}
            maxWidth={false}
        >
            {console.log(hintVideoID)}
            <DialogContent className={classes.askModalheader} style={{width: '700px', height: '400px'}}>
                <VimeoPlayer video={hintVideoID} height={400} width= {700} user_data={userInfo}/>
            </DialogContent>
        </Dialog>
        {props.posts[23] !== undefined && (
            <div style={{position: 'fixed', bottom: 0, right: 0, zIndex: 200, padding: '0px 10px', display: 'flex', alignItems: 'flex-end'}}>
                {props.posts[23].value.map(function(item, i) {
                    return(
                        item.loading === undefined ? (
                            <ChatkitProvider
                                instanceLocator={instanceLocator}
                                tokenProvider={tokenProvider}
                                userId={item.user_id}
                                key={i}
                            >
                                <ChattingBox roomId={item.id} roomName={item.title} otherUserId={item.other_id} doubteData={item}/>
                            </ChatkitProvider>
                        ) : (
                            <LoadingBox/>
                        )
                        
                    )
                })}
                
            </div>
        )}
            
    </div>)
  );
}
const mapStateToProps = (state) => {
    return {
      posts: state
    }
  }
  
export default connect(mapStateToProps)(ContentNavbar)