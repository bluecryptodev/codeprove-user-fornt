import React from "react";


import Skeleton from '@material-ui/lab/Skeleton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import Tooltip from '@material-ui/core/Tooltip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import PauseIcon from '@material-ui/icons/Pause';





//icon
import LockIcon from '@material-ui/icons/Lock';
import CheckIcon from '@material-ui/icons/Check';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { rubberBand } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import { connect } from 'react-redux';

import styles from '../../../assets/jss/classroom/content.js';
import {json_file_read} from '../../../Function/Courses.js';
import {lectureitemget} from '../../../Function/LectureItems.js';
import {user_get} from '../../../Function/User.js';
import {now_time_get} from '../../../Function/Time.js';

import videoIcon from '../../../assets/img/video-icon.png';
import codeIcon from '../../../assets/img/code-icon.png';
import notesIcon from '../../../assets/img/notes-icon.png';
import puzzleIcon from '../../../assets/img/puzzle-icon.png';
import {contact_send} from '../../../Function/Email.js';
const FQAList = [
    {
        qu: "How many lectures will be released throughout the week?",
        an: "2 lectures will be released every week. You should complete the lectures within the week."
    },
    {
        qu: "Will there be any assignments for practice?",
        an: "There are In-Class Quizzes, Assignments, Notes along with Lecture Videos in a lecture. You should attempt them all to master each section that you study."
    },
    {
        qu: "How many assignments will be there in the course?",
        an: "1. After almost every lecture there will be one assignment. 2. Assignments will have deadlines. Submissions after the deadline will be subject to penalty (Penalty procedure is explained separately)."
    },
    {
        qu: "Will there be tests in the course?",
        an: "Apart from assignments there will be frequent tests analysing your concepts and understanding."
    },
    {
        qu: "How does the scoring scheme work for tests?",
        an: "Scoring is automatically done against each submission, analogous to how it works for lecture or assignment submissions. Score will be shown to you post submission of the test. Remember, Any submission post test deadline would result to zero."
    },
    {
        qu: "Will watching hint videos lead to deduction in marks?",
        an: "Watching Hint videos will not add any penalty to your score."
    },
    {
        qu: "Will seeing the solution to the problem lead to deduction in marks?",
        an: "There are code solutions for every problem, whether in lecture or test. After checking/watching the solution, further submissions to that question will not fetch you any marks. However score achieved before watching solution will not be affected."
    },
    {
        qu: "How scoring in Leaderboard works?",
        an: "Your score on Leaderboard is the sum of weighted scores of all the topics that you have attempted. Every Topic(Lecture questions + Practice section) that you solve has a weightage assigned to it. For each Topic, weighted score is calculated as : (your score in that topic / max score of the topic) * weightage of topic."
    },
    {
        qu: "When do I complete an Assignment?",
        an: "You complete an assignment when you have attempted at least 60% of MCQ problems and you score an average of at least 60% in code problems, within an assignment"
    },
    {
        qu: "When do I complete a Lecture?",
        an: "You complete a lecture when you have attempted at least 60% of objective problems, have scored at least 60% in each code problems, and have seen at least 60% of the total videos, within a lecture"
    },
    {
        qu: "When do I complete a Test?",
        an: "You complete a test when you have submitted the test"
    },
    {
        qu: "What are the deadlines for submitting the assignments?",
        an: "For every Assignment, there is a soft deadline which is mentioned in every assignment. That is - if you submit problems in your assignment within the soft deadline of its release, you can get the full score for problems (if all the testcases for the problem are passed)."
    },
    {
        qu: "Is there any penalty for not submitting the assignments?",
        an: "1. For next 10 days (after deadline), a penalty of 25% will be applied on your problem submissions i.e. maximum score that you can get is 0.75*total_score. 2. For next 5 days a penalty of 50% will be applied on your submission, so the maximum possible score for a problem will be 0.5*total_score. And after that, you won’t get any marks for your submissions."
    },
    {
        qu: "For how long a student can access the course content?",
        an: "1. Lecture Videos in the course will be accessible by for the next five weeks from the release date of the last lecture of the course. 2. Hint/Solution Videos, quizzes, questions within a lecture, assignments and notes are available to you for lifetime."
    },
    {
        qu: "Will the assignments be graded by the faculty?",
        an: "1. All the lecture questions, quizzes and assignments are graded. 2. Submissions after deadlines will be penalised as per the penalty scheme specified above."
    },
    {
        qu: "How the penalty system works?",
        an: "1. Under \"Your Percentage Score\" you can see your 'With' and 'Without' penalty score. \"With penalty score\" is your final score considered for leaderboard and certificates. \"Without penalty score\" is your score without any penalties applied to the score, which just indicates your total progress in the course. 2. A leaderboard is maintained for the batch which you can see under overview section in your course. Based on your score you can check your class rank."
    },
    {
        qu: "Will there be any certificate provided after the course?",
        an: "1. After the module ends all those students whose \"With Penalty Score\" >= 60% will be awarded course certificates. 2. You will have to fill in your details for the certificate. Option to fill certificates details is right below \"Resume to Classroom\". 3. After the course ends, you will see an option to download your certificate right below \"Resume to Classroom\"."
    },
]
const animationStyles = {
    rubberBand: {
      animation: 'x 1s',
      animationName: Radium.keyframes(rubberBand, 'rubberBand')
    }
}
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
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );

}
function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
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
const useStylesBootstrap = makeStyles(theme => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}
const useStyles = makeStyles(styles);

function CourseContentLectures(props) {
    const classes = useStyles();
    const theme = useTheme();

    const [lectureList, setLectureList] = React.useState([]);
    const [courseList, setCourseList] = React.useState([]);
    const [releaseDates, setReleaseDates] = React.useState([]);
    const [deadline, setDeadline] = React.useState([]);
    const [tab1Value, setTab1Value] = React.useState(0);
    const [bookmarkList, setBookmarkList] = React.useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [subject, setSubject] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [levelList, setLevelList] = React.useState([]);
    const [nowDate, setNowDate] = React.useState(new Date());
    
    // const [currentLecture, setCurrentLecture]  = React.useState("");
    const handleChange = (event, newValue) => {
        setTab1Value(newValue);
    };
    const handleExpandedChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleChangeIndex = index => {
        setTab1Value(index);
    };
    const messageChange = e => {
        if(e.target.name === 'subject') {
            setSubject(e.target.value);
        }
        else {
            setMessage(e.target.value);
        }
    }
    
    function sendContact() {
        var data = {
            user_mail: props.userdata.email,
            subject: subject,
            message: message
        }
        contact_send(data).then(res => {
            setSubject("");
            setMessage("");
            store.addNotification({
                content: <MyNotification title="Sent mail to Support Team"/>,
                container: 'top-right',
                animationIn: ["animated", "bounceIn"],
                animationOut: ["animated", "bounceOut"],
                dismiss: {
                  duration: 3000
                },
                width: 300
            })
        })
    }
    function dateFormate(date1, start, end, adddays) {
        var date = new Date(date1);
        var monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ];
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var day1 = date.getDate();
        var return_date = day1+" "+monthNames[monthIndex]+" "+year;
        var total_days = 0;
        // console.log(end, adddays)
        if(end !== undefined) {
            for(var i = 0; i < end.length; i++){
                total_days+=adddays[i+1];
                if((new Date(return_date)).getTime() > (new Date(end[i].end)).getTime()) {
                    var result = new Date(return_date);
                    result.setDate(result.getDate() + total_days);
                    monthIndex = result.getMonth();
                    var day = result.getDate();
                    year = result.getFullYear();
                    return_date = day+" "+monthNames[monthIndex]+" "+year;
                }
            }
        }
        return return_date
    }
    function LectureEnter(lecture_id, item_id, bach_date){
        localStorage.course_id = props.courselist._id;
        if(item_id === undefined) {
            item_id='f';
        }
        window.location.href = "/lecture-content/"+lecture_id+"/"+item_id+"/"+bach_date;
    }
    // function totalDays(total, num) {
    //     return total + num;
    // }
    React.useEffect(() => {
        var list = [];
        var index = 0;
        for(var k = 0; k < props.courselist.level_number; k++){
            var flg = false;
            for(var l = 0; l < props.lecturelist.length; l++){
                if(props.lecturelist[l].level_number === (k+1)){
                    flg = true;
                }
            }
            if(flg){
                list[index] = {
                    id: k+1,
                    text: "Level "+(k+1)
                };
                index++;
            }
        }
        setLevelList(list);
        var data = {}
        for(var j = 0; j < props.userdata.course_list.length; j++){
            if(props.courselist._id === props.userdata.course_list[j].id){
                data.filename = props.userdata.course_list[j].batch_file+".txt"
            }
        }
        if(data.filename !== "undefined.txt" && data.filename !== undefined){
            var total_days = [];
            var start_date = 0;
            var end_date = [];
            json_file_read(data).then(res => {
                for(var j = 0; j < props.userdata.course_list.length; j++){
                    if(props.courselist._id === props.userdata.course_list[j].id){
                        
                        total_days = props.userdata.course_list[j].remain_days_list;
                        start_date = parseInt(props.userdata.course_list[j].start_date);
                        end_date = props.userdata.course_list[j].remain_date_list;
                    }
                }
                if(props.courselist.batch_status === '1'){
                    var release = [];
                    var deadline = [];
                    for(var i = 0; i < res.release_date.length; i++){
                        release[i] = dateFormate(res.release_date[i], start_date, end_date, total_days);
                    }
                    setReleaseDates(release);
                    for(i = 0; i < res.deadline_date.length; i++){
                        deadline[i] = dateFormate(res.deadline_date[i], start_date, end_date, total_days)
                    }
                    setDeadline(deadline);
                }
                else if(props.courselist.batch_status === '2'){
                    release = [];
                    deadline = [];
                    for(i = 0; i < res.release_date.length; i++){
                        release[i] = dateFormate(res.release_date[i], start_date, end_date, total_days)
                    }
                    setReleaseDates(release);
                    for(i = 0; i < res.deadline_date.length; i++){
                        deadline[i] = dateFormate(res.deadline_date[i], start_date, end_date, total_days)
                    }
                    setDeadline(deadline);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
        setLectureList(props.lecturelist);
        var book_list = [];
        if(props.userdata.bookmark_list !== undefined && Object.keys(props.courselist).length !== 0){
            props.userdata.bookmark_list.map(function(item, i) {
                var book_obj = {
                    course_id: '',
                    lecture_id: '',
                    lecture_name: '',
                    lecture_image: '',
                    lecture_color: '',
                    item_id: '',
                    item_name: '',
                    item_type: '',
                    deadline: item.deadline,
                    save_date: item.save_date
                }
                if(item.course_id === props.courselist._id) {
                    book_obj.course_id = props.courselist._id;
                    for(var j = 0; j < props.lecturelist.length; j++){
                        if(props.lecturelist[j]._id === item.lecture_id){
                            book_obj.lecture_id = item.lecture_id;
                            book_obj.lecture_name = props.lecturelist[j].title;
                            book_obj.lecture_image = props.lecturelist[j].lecture_icon;
                            book_obj.lecture_color = props.lecturelist[j].color;
                            break;
                        }
                    }
                    var data = {
                        id: item.item_id
                    }
                    lectureitemget(data).then(res => {
                        book_obj.item_id = res._id;
                        book_obj.item_name = res.title;
                        book_obj.item_type = res.type;
                        book_list.push(book_obj);
                        setBookmarkList(book_list)
                    })
                }
                return 0;
            })
        }
        data = {
            id: localStorage.userToken
        }
        user_get(data).then(res => {
            for(var i = 0; i < res.course_list.length; i++){
                if(props.courselist._id === res.course_list[i].id){
                    props.courselist.pause = res.course_list[i].pause;
                    break;
                }
            }
        });
        setCourseList(props.courselist);
        data = {}
        now_time_get(data).then(res => {
            setNowDate(res)
        })
    }, [props]);
    var prev_score = 1;
    return (
            <div className={classes.container}>
                <ReactNotifications />
                {!courseList.pause && (<>
                <Tabs
                    value={tab1Value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    className={classes.courseTab1}
                    style={{width: '80%', margin: 'auto'}}
                >
                    <Tab label="Topics" {...a11yProps(0)} />
                    <Tab label="Bookmarks" {...a11yProps(1)} />
                    <Tab label="FAQs" {...a11yProps(2)} />
                </Tabs>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={tab1Value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={tab1Value} index={0} dir={theme.direction}>
                        {(Object.keys(courseList).length !== 0 && lectureList.length !== 0 && (lectureList.length <= releaseDates.length || releaseDates.length === 0)) && (
                            <div style={{marginTop: '50px'}}>
                                {courseList.pay_status === 'free' && (
                                    levelList.map(function(level, j) {
                                        return(<div key={j}>
                                            <h3>{level.text}</h3>
                                            <Grid container spacing={3} className={classes.Content1}>
                                        
                                                {lectureList.map(function(item, i){
                                                    return(
                                                        
                                                        item.level_number === (level.id) && (
                                                            <Grid item xs={12} sm={6} md={4} key={i}>
                                                                {item.free_type === 'free' && (
                                                                    <>
                                                                    <div className={classes.courseContent1} onClick={() => LectureEnter(item._id, item.step_status.id, 'free')}>
                                                                        <div className={classes.courseContent}>
                                                                            <div className={classes.courseProps}>
                                                                            <BootstrapTooltip title={
                                                                                <React.Fragment>
                                                                                    {item.title}
                                                                                </React.Fragment>
                                                                            }
                                                                            placement="top"
                                                                            >
                                                                                <p className="lecture-name">{item.title}</p>
                                                                            </BootstrapTooltip>
                                                                                <div className={classes.PropsList}>
                                                                                    <div style={{marginRight: '10px'}}>
                                                                                        <p>Release Date</p>
                                                                                        <p style={{color: '#ff7296'}}>--/--/--</p>
                                                                                        <p style={{color: '#ff7296'}}>--:--:--</p>
                                                                                    </div>
                                                                                    <div style={{marginRight: '10px'}}>
                                                                                        <p>Deadline</p>
                                                                                        <p style={{color: '#ff7296'}}>--/--/--</p>
                                                                                        <p style={{color: '#ff7296'}}>--:--:--</p>
                                                                                    </div>
                                                                                    <div style={{marginRight: '10px'}}>
                                                                                        <p>Weightage</p>
                                                                                        <p style={{color: '#ff7296'}}>{item.weightage}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className={classes.lectureImg} style={{background: ('linear-gradient(-143deg,'+item.color.first_color+' 0,'+item.color.second_color+' 100%)')}}>
                                                                                {props.courselist.step_status.id === item._id && (
                                                                                    <StyleRoot>
                                                                                        <div className="current-tag" style={animationStyles.rubberBand}>
                                                                                            <div className="current-tag-text">Currently On</div>
                                                                                            <div className="current-tag-trangle"></div>
                                                                                        </div>
                                                                                    </StyleRoot>
                                                                                )}
                                                                                <img src={props.server+"lecture/img_get/"+item.lecture_icon} alt="..."/>
                                                                                {/* <div className={classes.lectureStatus}>
                                                                                    <CheckIcon />
                                                                                </div> */}
                                                                                <div className={classes.lectureImgShadow} style={{background: ('linear-gradient(-143deg,'+item.color.first_color+' 0,'+item.color.second_color+' 100%)')}}>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                    </div>
                                                                    </>
                                                                )}
                                                                {item.free_type === 'pay' && (
                                                                    <>
                                                                    
                                                                    <div className={classes.lockIcon}>
                                                                        <LockIcon />
                                                                    </div>
                                                                    <BootstrapTooltip title={
                                                                        <React.Fragment>
                                                                            <Typography color="inherit" variant="button">Buy Course to Unlock</Typography><br />
                                                                            <Typography color="inherit" variant="caption">{item.title}</Typography>
                                                                        </React.Fragment>
                                                                    }
                                                                    placement="top"
                                                                    >
                                                                    <div className={classes.courseContent1} style={{filter: 'grayscale(100%) blur(1px) brightness(0.80)'}}>
                                                                        <div className={classes.courseContent} >
                                                                            <div className={classes.courseProps}>
                                                                                <p className="lecture-name">{item.title}</p>
                                                                                <div className={classes.PropsList}>
                                                                                    <div style={{marginRight: '10px'}}>
                                                                                        <p>Release Date</p>
                                                                                        <p style={{color: '#ff7296'}}>--/--/--</p>
                                                                                        <p style={{color: '#ff7296'}}>--:--:--</p>
                                                                                    </div>
                                                                                    <div style={{marginRight: '10px'}}>
                                                                                        <p>Deadline</p>
                                                                                        <p style={{color: '#ff7296'}}>--/--/--</p>
                                                                                        <p style={{color: '#ff7296'}}>--:--:--</p>
                                                                                    </div>
                                                                                    <div style={{marginRight: '10px'}}>
                                                                                        <p>Weightage</p>
                                                                                        <p style={{color: '#ff7296'}}>{item.weightage}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className={classes.lectureImg} style={{background: ('linear-gradient(-143deg,'+item.color.first_color+' 0,'+item.color.second_color+' 100%)')}}>
                                                                                <img src={props.server+"lecture/img_get/"+item.lecture_icon} alt="..."/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    </BootstrapTooltip>
                                                                    </>
                                                                )}
                                                            </Grid>
                                                        )
                                                    )
                                                })}
                                            </Grid>
                                        </div>)
                                    })
                                )}
                                {props.courselist.pay_status === 'pay' && (
                                    levelList.map(function(level, j) {
                                        return(<div key={j}>
                                            <h3>{level.text}</h3>
                                            <Grid container spacing={3} className={classes.Content1}>
                                                {props.lecturelist.map(function(item, i){
                                                    return(
                                                        item.level_number === level.id && (
                                                            <Grid item xs={12} sm={6} md={4} key={i}>
                                                                { (prev_score < 0.8 && new Date(nowDate).getTime() < new Date(releaseDates[i]).getTime()) && (
                                                                    <>
                                                                    <div className={classes.lockIcon}>
                                                                        <LockIcon />
                                                                    </div>
                                                                    <BootstrapTooltip title={
                                                                        <React.Fragment>
                                                                            <p>This content will unlock on {releaseDates[i]}. Or to unlock this beforehand, you need to score at least 80% in</p>
                                                                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                                                <div style={{background: ('linear-gradient(-143deg,'+props.lecturelist[i-1].color.first_color+' 0,'+props.lecturelist[i-1].color.second_color+' 100%)'), width: 30, height: 30,display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '30px'}}>
                                                                                    <img src={props.server+"lecture/img_get/"+props.lecturelist[i-1].lecture_icon} alt="..." style={{width: 15}}/>
                                                                                </div>
                                                                                <p>{props.lecturelist[i-1].title}</p>
                                                                            </div>
                                                                        </React.Fragment>
                                                                    }
                                                                    placement="top"
                                                                    >
                                                                        <div className={classes.courseContent1} style={{filter: 'grayscale(100%) blur(1px) brightness(0.80)'}}>
                                                                            <div className={classes.courseContent} >
                                                                                <div className={classes.courseProps}>
                                                                                    <p className="lecture-name">{item.title}</p>
                                                                                    <div className={classes.PropsList}>
                                                                                        <div style={{marginRight: '10px'}}>
                                                                                            <p>Release Date</p>
                                                                                            <p style={{color: '#ff7296'}}>{releaseDates[i]}</p>
                                                                                            <p style={{color: '#ff7296'}}>--:--:--</p>
                                                                                        </div>
                                                                                        <div style={{marginRight: '10px'}}>
                                                                                            <p>Deadline</p>
                                                                                            <p style={{color: '#ff7296'}}>{deadline[i]}</p>
                                                                                            <p style={{color: '#ff7296'}}>--:--:--</p>
                                                                                        </div>
                                                                                        <div style={{marginRight: '10px'}}>
                                                                                            <p>Weightage</p>
                                                                                            <p style={{color: '#ff7296'}}>{item.weightage}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className={classes.lectureImg} style={{background: ('linear-gradient(-143deg,'+item.color.first_color+' 0,'+item.color.second_color+' 100%)')}}>
                                                                                    <img src={props.server+"lecture/img_get/"+item.lecture_icon} alt="..."/>
                                                                                    <div className={classes.lectureStatusLock}>
                                                                                        <LockIcon />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </BootstrapTooltip>
                                                                    </>
                                                                )}
                                                                {(prev_score >= 0.8 || new Date(nowDate).getTime() > new Date(releaseDates[i]).getTime()) && (
                                                                    <div className={classes.courseContent1} onClick={() => LectureEnter(item._id, item.step_status.id, new Date(deadline[i]).getTime())}>
                                                                    <div className={classes.courseContent}>
                                                                        <div className={classes.courseProps}>
                                                                            <BootstrapTooltip title={
                                                                                <React.Fragment>
                                                                                    {item.title}
                                                                                </React.Fragment>
                                                                            }
                                                                            placement="top"
                                                                            >
                                                                                <p className="lecture-name">{item.title}</p>
                                                                            </BootstrapTooltip>
                                                                            <div className={classes.PropsList}>
                                                                                <div style={{marginRight: '10px'}}>
                                                                                    <p>Release Date</p>
                                                                                    <p style={{color: '#ff7296'}}>{releaseDates[i]}</p>
                                                                                    <p style={{color: '#ff7296'}}>--:--:--</p>
                                                                                </div>
                                                                                <div style={{marginRight: '10px'}}>
                                                                                    <p>Deadline</p>
                                                                                    <p style={{color: '#ff7296'}}>{deadline[i]}</p>
                                                                                    <p style={{color: '#ff7296'}}>--:--:--</p>
                                                                                </div>
                                                                                <div style={{marginRight: '10px'}}>
                                                                                    <p>Weightage</p>
                                                                                    <p style={{color: '#ff7296'}}>{item.weightage}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className={classes.lectureImg} style={{background: ('linear-gradient(-143deg,'+item.color.first_color+' 0,'+item.color.second_color+' 100%)')}}>
                                                                            {props.courselist.step_status.id === item._id && (
                                                                                <StyleRoot>
                                                                                    <div className="current-tag" style={animationStyles.rubberBand}>
                                                                                        <div className="current-tag-text">Currently On</div>
                                                                                        <div className="current-tag-trangle"></div>
                                                                                    </div>
                                                                                </StyleRoot>
                                                                            )}
                                                                            <img src={props.server+"lecture/img_get/"+item.lecture_icon} alt="..."/>
                                                                            {item.score === item.total_score && (
                                                                                <div className={classes.lectureStatus}>
                                                                                    <CheckIcon />
                                                                                </div>
                                                                            )}
                                                                            {item.score !== item.total_score && (
                                                                                <div className={classes.lectureStatusLock}>
                                                                                    <LockOpenIcon />
                                                                                </div>
                                                                            )}
                                                                            <div className={classes.lectureImgShadow} style={{background: ('linear-gradient(-143deg,'+item.color.first_color+' 0,'+item.color.second_color+' 100%)')}}>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <LinearProgress 
                                                                        variant="determinate"
                                                                        color="secondary"
                                                                        value={parseInt(item.score)/parseInt(item.total_score)*100}
                                                                    />
                                                                    <p style={{display: 'none'}}>{prev_score = (item.total_score !== 0 && item.score !== undefined) ? parseInt(item.score)/parseInt(item.total_score) : 1}</p>
                                                                </div>
                                                                )}
                                                            </Grid>
                                                        )
                                                    )
                                                })}
                                            </Grid>
                                        </div>)
                                    })
                                )}
                            </div>
                        )}
                        {(Object.keys(courseList).length === 0 || lectureList.length === 0) && (
                            <Grid container spacing={3} className={classes.Content1} style={{marginTop: '50px'}}>
                                {[0,0,0,0,0,0].map(function(item, i){
                                    return(
                                        <Grid item xs={12} sm={6} md={4} key={i}>
                                            <div className={classes.courseContent1} >
                                                <div className={classes.courseContent}>
                                                    <div className={classes.courseProps} style={{width: '70%', marginRight: '10px'}}>
                                                        <Skeleton variant="rect" width="100%" height={15} />
                                                        <div className={classes.PropsList} style={{width: '100%', marginTop: '20px'}}>
                                                            <Skeleton variant="rect" width="30%" height={30} style={{margin: '0px 7px'}}/>
                                                            <Skeleton variant="rect" width="30%" height={30} style={{margin: '0px 7px'}}/>
                                                            <Skeleton variant="rect" width="30%" height={30} style={{margin: '0px 7px'}}/>
                                                        </div>
                                                    </div>
                                                    <Skeleton variant="circle" width={70} height={70} />
                                                </div>
                                            </div>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        )}
                    </TabPanel>
                    <TabPanel value={tab1Value} index={1} dir={theme.direction}>
                        <Grid container spacing={3} className={classes.Content1}>
                            {bookmarkList.map(function(item, i) {
                                    return(
                                        <Grid item xs={12} sm={6} md={3} key={i}>
                                            <div className={classes.bookmarkPart} onClick={() => LectureEnter(item.lecture_id, item.item_id, parseInt(item.deadline))}>
                                                <div className={classes.lectureInfo}>
                                                    <div style={{background: ('linear-gradient(-143deg,'+item.lecture_color.first_color+' 0,'+item.lecture_color.second_color+' 100%)')}} className='icon-part'>
                                                        <img src={props.server+"lecture/img_get/"+item.lecture_image} alt="..." style={{width: 15}}/>
                                                    </div>
                                                    <p>{item.lecture_name}</p>
                                                </div>
                                                <CollectionsBookmarkIcon className={classes.bookMarkIcon}/>
                                                <div className={classes.lectureItemInfo}>
                                                    {item.item_type === 'video' && (<img src={videoIcon} alt="video"/>)}
                                                    {item.item_type === 'code' && (<img src={codeIcon} alt="code"/>)}
                                                    {item.item_type === 'notes' && (<img src={notesIcon} alt="notes"/>)}
                                                    {item.item_type === 'puzzle' && (<img src={puzzleIcon} alt="puzzle"/>)}
                                                    <p>{item.item_name}</p>
                                                </div>
                                                <div className={classes.saveDate}>
                                                    <p>Bookmarked on: <strong>{item.save_date}</strong></p>
                                                </div>
                                            </div>
                                        </Grid>
                                    )
                            })}
                        </Grid>
                    </TabPanel>
                    <TabPanel value={tab1Value} index={2} dir={theme.direction}>
                        <Grid container spacing={3} className={classes.Content1}>
                            <Grid item xs={12} sm={6} md={8}>
                                <Paper className={classes.FQAPart}>
                                    <h2>Course Overview</h2>
                                    {FQAList.map(function(item , i){
                                        return (
                                            <ExpansionPanel expanded={expanded === ('panel'+i)} onChange={handleExpandedChange('panel'+i)} className={classes.FQAsPanel} key={i}>
                                                <ExpansionPanelSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                >
                                                    <Typography className={classes.question}>{item.qu}</Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography>
                                                        {item.an}
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                        )
                                    })}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Paper className={classes.contactPart}>
                                    <h2>Contact Us</h2>
                                    <p>Still confused about something? Contact us for further information.</p>
                                    <label>Subject</label>
                                    <InputBase
                                        className="subject-input"
                                        placeholder="Subject..."
                                        inputProps={{ 'aria-label': '"Type title in here' }}
                                        name="subject"
                                        onChange={messageChange}
                                    />
                                    <label>Message</label>
                                    <InputBase
                                        className="subject-input"
                                        placeholder="Message..."
                                        inputProps={{ 'aria-label': '"Type title in here' }}
                                        name="message"
                                        onChange={messageChange}
                                        multiline
                                        rows= {5}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.sendButton}
                                        endIcon={<SendIcon />}
                                        disabled = {(subject === "" || message === "") ? true : false}
                                        onClick={sendContact}
                                    >
                                        Send
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={tab1Value} index={3} dir={theme.direction}>
                        Item Three
                    </TabPanel>
                </SwipeableViews></>
                )}
                {courseList.pause && (
                    <div className={classes.courseOverFlowContent}>
                        <Grid container spacing={3} className={classes.Content1}>
                            <Grid item xs={12} sm={6} md={12}>
                                <div className={classes.courseCommentLock}>
                                    <PauseIcon />
                                    <h1 style={{textAlign: 'center'}}>Course is on pause currently. Resume course to view topics.</h1>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                )}
        </div>
    );
    }
    const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(CourseContentLectures);