import React from "react";
import {withRouter} from 'react-router-dom';


import Skeleton from '@material-ui/lab/Skeleton';
// import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import GetAppIcon from '@material-ui/icons/GetApp';
// import { makeStyles, withStyles } from '@material-ui/core/styles';
import { makeStyles, withStyles, lighten } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import styles from '../../assets/jss/classroom/header.js';
import {course_get} from '../../Function/Courses.js';
import {user_get, custome_update} from '../../Function/User.js';
import {lecture_get} from '../../Function/Lectures.js';
import {json_file_read} from '../../Function/Courses.js';
import {now_time_get} from '../../Function/Time.js';

const BorderLinearProgress = withStyles({
    root: {
      height: 10,
      borderRadius: 20,
      backgroundColor: lighten('#ff6c5c', 0.5),
    },
    bar: {
      borderRadius: 20,
      backgroundColor: '#ff6c5c',
    },
  })(LinearProgress);

const useStyles = makeStyles(styles);
function FormatDate(props) {
    var date = new Date();
    var monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
  
    var day = date.getDate();
    
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    if(props.order === 0){
        if(day < 15){
            day = 15;
        }
        else {
            day = 1;
            monthIndex+=1;
        }
    }
    else {
        if(day < 15){
            day = 1;
            monthIndex+=1;
        }
        else {
            day = 15;
            monthIndex+=1;
        }
    }  
    if(monthIndex === 12){
        monthIndex = 0;
    }
    return (<p className="date-text" style={{fontSize: '18px', fontWeight: 'bolder'}}>{day + ' ' + monthNames[monthIndex] + ' ' + year}</p>);
}
function CourseContent(props) {
    const classes = useStyles();
    const [courseContent, setCourseContent] = React.useState({});
    const [lectureList, setLectureList] = React.useState([]);
    const [userData, setUserData] = React.useState({});
    const [stepIndex, setStepIndex] = React.useState(0);
    const [releaseDates, setReleaseDates] = React.useState([]);
    const [deadline, setDeadline] = React.useState([]);
    const [cardViewHover, setCardViewHover] = React.useState(0);
    const [courseTotalScore, setCourseTotalScore] = React.useState('');
    const [meTotalScore, setMeTotalScore] = React.useState('');
    const [contentPadding, setContentPadding] = React.useState('0px 100px');
    const [containerPadding, setContainerPadding] = React.useState('50px 100px')
    const [nowDate, setNowDate] = React.useState(new Date());
    const [lectureCounter, setLectureCounter] = React.useState(0);
    const [load, setLoad] = React.useState(false);
    const [batchModal, setBatchModal] = React.useState(false);
    const [priceList, setPriceList] = React.useState([]);
    const [courseName, setCourseName] = React.useState("");
    const [courseId, setCourseID] = React.useState("");
    
    
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
    
    function batchModalOpen(value, price_list, course_name, course_id) {
        setBatchModal(value);
        setPriceList(price_list);
        setCourseName(course_name);
        setCourseID(course_id);
    }
    function batchEnter(j, price) {
        var date = new Date();
        var monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ];
    
        var day = date.getDate();
        
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        if(j === 0){
            if(day < 15){
                day = 15;
            }
            else {
                day = 1;
                monthIndex+=1;
            }
        }
        else {
            if(day < 15){
                day = 1;
                monthIndex+=1;
            }
            else {
                day = 15;
                monthIndex+=1;
            }
        }  
        if(monthIndex === 12){
            monthIndex = 0;
        }
        const batch_date = new Date(day + ' ' + monthNames[monthIndex] + ' ' + year).getTime();
        window.location.href="/payment/"+courseId+"?date="+batch_date+"&price="+price;
    }
    function cardView(index) {
        setCardViewHover(index);
    }
    function LectureEnter(lecture_id, item_id, batch, flg){
        localStorage.course_id = courseContent._id;
        if(item_id === undefined) {
            item_id = 'f';
        }
        if(flg) {
            window.location.href = "/lecture-content/"+lecture_id+"/"+item_id+'/'+batch;
        }
    }
    function reportWindowSize() {
        if(window.innerWidth < 1900){
            setContentPadding('0px');
            setContainerPadding('50px 10px');
        }
        else {
            setContentPadding('0px 100px');
            setContainerPadding('50px 100px');
        }
    }
    React.useEffect(() => {
        if(!load){
            var data = {}
            now_time_get(data).then(res => {
                setNowDate(res)
            })
            data = {
                id: props.courseid
            }
            course_get(data).then(res => {
                var courseList = res;
                data = {
                    id: localStorage.userToken
                }
                user_get(data).then(res => {
                    setUserData(res);
                    for(var i = 0; i < res.course_list.length; i++){
                        if(courseList._id === res.course_list[i].id){
                            courseList.pay_status= res.course_list[i].pay_status;
                            courseList.step_status= res.course_list[i].step_status;
                            courseList.batch_status= res.course_list[i].batch_status;
                            break;
                        }
                    }
                    var user_data = res;
                    var data = {}
                    for(var j = 0; j < res.course_list.length; j++){
                        if(courseList._id === res.course_list[j].id){
                            data.filename = res.course_list[j].batch_file+".txt"
                        }
                    }
                    if(data.filename !== "undefined.txt" && data.filename !== undefined){
                        var total_days = [];
                        var start_date = 0;
                        var end_date = [];
                        json_file_read(data).then(res => {
                            for(var j = 0; j < user_data.course_list.length; j++){
                                if(props.courseid === user_data.course_list[j].id){
                                    
                                    total_days = user_data.course_list[j].remain_days_list;
                                    start_date = parseInt(user_data.course_list[j].start_date);
                                    end_date = user_data.course_list[j].remain_date_list;
                                }
                            }
                            if(courseList.batch_status === '1'){
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
                            else if(courseList.batch_status === '2'){
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
                    setCourseContent(courseList);
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
                console.log(err);
            });
            data = {
                id: props.courseid,
                course: 'from_course'
            }
            lecture_get(data).then(res => {
                setLectureCounter(res.length);
                var lecture_list = res.sort(function(a, b){return (a.level_number.toString() + a.order_number.toString()) - (b.level_number.toString() + b.order_number.toString())});
                data = {
                    id: localStorage.userToken
                }
                user_get(data).then(res => {
                    setUserData(res);
                    
                    var status = [];
                    var total = 0;
                    var me_total = 0;
                    for (var i = 0; i < res.lecture_list.length; i++){
                        me_total+=parseInt(res.lecture_list[i].score);
                    }
                    setMeTotalScore(me_total);
                    for(i = 0; i < res.course_list.length; i++){

                        if(res.course_list[i].id === props.courseid){
                            status = res.course_list[i].step_status;
                            
                            break;
                        }
                    }
                    var score_percent = 1;
                    for(i = 0; i < lecture_list.length; i++){
                        total += parseInt(lecture_list[i].total_score);
                        var flg = false;
                        for(var j = 0; j < res.lecture_list.length; j++){
                            if(lecture_list[i]._id === res.lecture_list[j].id){
                                lecture_list[i].step_status = res.lecture_list[j].step_status;
                                lecture_list[i].my_score = res.lecture_list[j].score;
                                lecture_list[i].open_status = true;
                                if(score_percent < 0.8){
                                    lecture_list[i].open_status = false
                                }
                                score_percent = res.lecture_list[j].score/lecture_list[i].total_score;
                                flg = true;
                            }
                        }
                        if(!flg) {
                            lecture_list[i].step_status = {};
                            lecture_list[i].my_score = 0;
                            lecture_list[i].open_status = true;
                            var new_lecture_data = {
                                id: lecture_list[i]._id,
                                score: 0,
                                step_status: {}
                            }
                            res.lecture_list.push(new_lecture_data);
                            data = {
                                id: localStorage.userToken,
                                data: res.lecture_list,
                                flg: 'new_lecture'
                            }
                            custome_update(data).then(res => {
                            })
                        }
                        if(lecture_list[i]._id === status.id) {
                            setStepIndex(i);
                            setCardViewHover(i);
                        }
                        setLectureList(lecture_list);
                    }
                    setCourseTotalScore(total);
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
                console.log(err);
            });
            if(window.innerWidth < 1900){
                setContentPadding('0px');
                setContainerPadding('50px 10px');
            }
            else {
                setContentPadding('0px 100px');
                setContainerPadding('50px 100px');
            }
        }
        setLoad(true);
        window.addEventListener('resize', reportWindowSize);
        return function cleanup() {
            window.removeEventListener("resize", reportWindowSize);
        };
        
    }, [props, load]);
    return (
        <div style={{background: 'white'}}>
            <div className={classes.container} style={{padding: containerPadding}}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit" href="/home">
                        Home
                    </Link>
                    <Link color="inherit" href="/classroom-course">
                        Classroom
                    </Link>
                    <Typography color="textPrimary" style={{color: '#f9336b'}}>{courseContent.title}</Typography>
                </Breadcrumbs>
                {courseContent.image !== undefined && (
                    <img 
                        src={props.server+'course/img_get/'+courseContent.image} 
                        alt="icon"
                        style={{width: '250px', position: 'absolute', right: '50px'}}
                    />
                )}
                {Object.keys(courseContent).length !== 0 && (<>
                    <Grid container spacing={3} style={{marginTop: '100px', padding: contentPadding}}>
                        <Grid item xs={12} sm={6} md={6}>
                            {courseContent.pay_status === 'free' && (<>
                                {lectureCounter === lectureList.length && (
                                    lectureList.map(function(item, i){
                                        
                                        return(
                                            (i >= stepIndex-1 && i <= stepIndex+1 && (item.step_status !== undefined)) &&(
                                                <div 
                                                    className={classes.cardLecture+" "+(stepIndex === i ? (stepIndex === 0 ? classes.cardLectureActive1 : classes.cardLectureActive) : (stepIndex === 0 ? classes.cardLectureNonActive1 : classes.cardLectureNonActive))} 
                                                    key={i}
                                                    onMouseEnter={() => cardView(i)}
                                                    onMouseLeave={() => setCardViewHover(stepIndex)}
                                                    style={{
                                                        transform: (cardViewHover !== stepIndex && i === stepIndex) ? "scale(0.8)" : '', 
                                                        cursor: (item.free_type === 'free') ? 'pointer' : 'no-drop',
                                                        margin: '0px'
                                                    }}
                                                    onClick={() => LectureEnter(item._id, item.step_status.id, 'free', (item.free_type === 'free'))}
                                                >
                                                    <div className={classes.titlContent}>
                                                        <div className={classes.logoImg} style={{background: ('linear-gradient(-143deg,'+item.color.first_color+' 0,'+item.color.second_color+' 100%)')}}>
                                                            <img src={props.server+"lecture/img_get/"+item.lecture_icon} alt="t" />
                                                        </div>
                                                        <h4>{item.title}</h4>
                                                    </div>
                                                    <div className={classes.lectureProps}>
                                                        <div className={classes.prosPart}>
                                                            <p>Release Date</p>
                                                            <p>{releaseDates[i]}</p>
                                                        </div>
                                                        <div className={classes.prosPart}>
                                                            <p>Deadline</p>
                                                            <p>{deadline[i]}</p>
                                                        </div>
                                                        <div className={classes.prosPart}>
                                                            <p>Weightage</p>
                                                            <p>{item.weightage}</p>
                                                        </div>
                                                    </div>
                                                    <div className={classes.classStatus}>
                                                        {(item.free_type === 'free') ? (
                                                            <img src={require('../../assets/img/lecture/play-button.svg')} alt="t" />
                                                        ) : (
                                                            <img src={require('../../assets/img/lecture/locked-button.svg')} alt="t" />
                                                        )}
                                                        
                                                        <div>
                                                            <p>Next Lecture</p>
                                                            {(item.step_status !== "" && item.step_status !== undefined) && (
                                                                <p>{item.step_status.name}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    })
                                )}
                            <div className={classes.coursePayStatus}>
                                <div className="text">
                                    <h3>Hey {userData.username}, you are on free trial</h3>
                                    <p>Buy course to unlock content</p>
                                    <p>New Batches launching soon!</p>
                                </div>
                                <Button 
                                    variant="contained" 
                                    className="enroll-button"
                                    onClick={() =>{batchModalOpen(true, courseContent.price, courseContent.title, courseContent._id)}}
                                >
                                    enroll now
                                </Button>
                            </div>
                            </>)}
                            {courseContent.pay_status === 'pay' && (<>
                            {lectureList.map(function(item, i){
                                return(
                                    (i >= stepIndex-1 && i <= stepIndex+1 && item.step_status !== undefined) &&(
                                        <div 
                                            className={classes.cardLecture+" "+(stepIndex === i ? (stepIndex === 0 ? classes.cardLectureActive1 : classes.cardLectureActive) : (stepIndex === 0 ? classes.cardLectureNonActive1 : classes.cardLectureNonActive))} 
                                            key={i}
                                            onMouseEnter={() => cardView(i)}
                                            onMouseLeave={() => setCardViewHover(stepIndex)}
                                            style={{
                                                transform: (cardViewHover !== stepIndex && i === stepIndex) ? "scale(0.8)" : '', 
                                                cursor: ((item.open_status || new Date(releaseDates[i]).getTime() < new Date(nowDate).getTime()) ? 'pointer' : 'no-drop'),
                                                margin: '0px '
                                            }}
                                            onClick={() => LectureEnter(item._id, item.step_status.id, new Date(releaseDates[i]).getTime(), ((new Date(releaseDates[i]).getTime() < new Date(nowDate).getTime()) || item.open_status))}
                                        >
                                            <div className={classes.titlContent}>
                                                <div className={classes.logoImg} style={{background: ('linear-gradient(-143deg,'+item.color.first_color+' 0,'+item.color.second_color+' 100%)')}}>
                                                    <img src={props.server+"lecture/img_get/"+item.lecture_icon} alt="t" />
                                                </div>
                                                <h4>{item.title}</h4>
                                            </div>
                                            <div className={classes.lectureProps}>
                                                <div className={classes.prosPart}>
                                                    <p>Release Date</p>
                                                    <p>{releaseDates[i]}</p>
                                                </div>
                                                <div className={classes.prosPart}>
                                                    <p>Deadline</p>
                                                    <p>{deadline[i]}</p>
                                                </div>
                                                <div className={classes.prosPart}>
                                                    <p>Weightage</p>
                                                    <p>{item.weightage}</p>
                                                </div>
                                            </div>
                                            <div className={classes.classStatus}>
                                                {(item.open_status || new Date(releaseDates[i]).getTime() < new Date(nowDate).getTime()) ? (
                                                    <img src={require('../../assets/img/lecture/play-button.svg')} alt="t" />
                                                ) : (
                                                    <img src={require('../../assets/img/lecture/locked-button.svg')} alt="t" />
                                                )}
                                                
                                                <div>
                                                    {(!item.open_status && new Date(releaseDates[i]).getTime() >= new Date(nowDate).getTime()) ? (
                                                            <p>this lecture will unlock on {releaseDates[i]} ,or<br />you have to get 80% score</p>
                                                        ) : (
                                                            <>
                                                                <p>Next Lecture</p>
                                                                {(item.step_status !== "" && item.step_status !== undefined) && (
                                                                    <p>{item.step_status.name}</p>
                                                                )}
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                            })}
                            </>)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <div className={classes.processBarPart}>
                                <div>
                                    <h3>Your Performance Status:</h3>
                                    {(meTotalScore !== '' && courseTotalScore !== "") && (<p>Your Current Score {(meTotalScore/courseTotalScore*100).toFixed(2)}(%)</p>)}
                                </div>
                                <div className={classes.processBar}>
                                {(meTotalScore !== '' && courseTotalScore !== "") && (<BorderLinearProgress variant="determinate" value={parseFloat((meTotalScore/courseTotalScore*100).toFixed(2))}/>)}
                                    <div style={{left: meTotalScore/courseTotalScore*100+'%', zIndex: '10', position: 'relative'}}>
                                        <div className='mark-vertical'></div>
                                        <div className='process-text-part'>
                                            <div className="mark-trangle"></div>
                                            {(meTotalScore !== '' && courseTotalScore !== "") && (<div className='process-text'>{(meTotalScore/courseTotalScore*100).toFixed(2)}% completed</div>)}
                                        </div>
                                    </div>
                                    {courseContent.pay_status !== 'free' && (
                                        <div className={classes.certDownload}>
                                            <div className="download-part" style={{left: "60%"}}>
                                                <p>60%</p>
                                                <Fab color="primary" size="small" aria-label="edit" className="download-button">
                                                    <GetAppIcon fontSize="small"/>
                                                </Fab>
                                            </div>
                                            <div className="download-part" style={{left: "90%"}}>
                                                <p>90%</p>
                                                <Fab color="primary" size="small" aria-label="edit" className="download-button">
                                                    <GetAppIcon fontSize="small"/>
                                                </Fab>
                                            </div>
                                            
                                        </div>
                                    )}
                                    
                                </div>
                                <Grid container spacing={3} style={{marginTop: '2px'}}>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <div style={{display: 'flex'}}>
                                            <div className={classes.pointAnimation}>
                                                <div className='circle-ripple'></div>
                                            </div>
                                            <div style={{width: '90%', padding: '0px 10px', borderRight: '3px solid grey'}}>Take the very first step to taste the success ahead of you. Start your course now!</div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <div className={classes.shareLink}>
                                            <p>Share Your Certificate :</p>
                                            <div className="share-link-icon">
                                                <FacebookIcon/>
                                                <LinkedInIcon/>
                                            </div>
                                        </div>
                                        
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                    
                    </>
                )}
                {Object.keys(courseContent).length === 0 && (
                <>
                    <Grid container spacing={3} className={classes.Content1} style={{marginTop: '50px'}}>
                        <Grid item xs={12} sm={6} md={6}>
                            <div className={classes.courseIntro}>
                                <Skeleton variant="circle" width={50} height={50} />
                                <Skeleton variant="rect" width="100%" height={30} />
                                <Skeleton variant="text" />
                                <Skeleton variant="text" />
                                <Skeleton variant="text" />
                            </div>
                            <br /><br /><br />
                            <div className={classes.property}>
                                <Grid container spacing={3} className={classes.Content1}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Skeleton variant="rect" width="100%" height={20} />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Skeleton variant="rect" width="100%" height={20} />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Skeleton variant="rect" width="100%" height={20} />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} className={classes.contactInfo}>
                            <Skeleton variant="rect" width="100%" height={300} />
                            
                            <div className={classes.buttonGroup}>
                                <Skeleton variant="rect" width="50px" height={50} />
                                <Skeleton variant="rect" width="50px" height={50} />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} className={classes.Content1} style={{marginTop: '50px'}}>
                    <Grid item xs={12} sm={6} md={6}>
                        <div className={classes.courseIntro}>
                            <Skeleton variant="circle" width={50} height={50} />
                            <Skeleton variant="rect" width="100%" height={30} />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                        </div>
                        <br /><br /><br />
                        <div className={classes.property}>
                            <Grid container spacing={3} className={classes.Content1}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Skeleton variant="rect" width="100%" height={20} />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Skeleton variant="rect" width="100%" height={20} />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Skeleton variant="rect" width="100%" height={20} />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} className={classes.contactInfo}>
                        <Skeleton variant="rect" width="100%" height={300} />
                        
                        <div className={classes.buttonGroup}>
                            <Skeleton variant="rect" width="50px" height={50} />
                            <Skeleton variant="rect" width="50px" height={50} />
                        </div>
                    </Grid>
                </Grid>
                </>
                )}
            </div>
            <Dialog
                open={batchModal}
                onClose={() =>batchModalOpen(false, [], "")}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={classes.askModalheader}
                // fullWidth={true}
                maxWidth={'sm'}
            >
                <DialogTitle id="alert-dialog-slide-title" className={classes.modalTitle} style={{background: 'url('+require("../../assets/img/enrollment_popup_back.png")+')'}}>
                    <strong>Make a commitment<br /> towards your career</strong>
                </DialogTitle>
                <DialogContent className={classes.modalContent}>
                    <p style={{margin: '20px 0px 10px'}}>Choose a course that suits you</p>
                    <div className={classes.priceList}>
                        <h3 style={{margin: '5px 0px'}}>{courseName}</h3>
                        {priceList.map(function(item1, j){
                            return(
                                <div className={classes.batchItem} key={j}>
                                    <div className="item-content">
                                        <div className="start-date">
                                            <p className="from-start">Starting from</p>
                                            <FormatDate order={j} />
                                        </div>
                                        <div className="price-list">
                                            <p className="new-price">INR {item1.new_price}/-</p>
                                            <p className="old-price">INR {item1.old_price}/-</p>
                                        </div>
                                    </div>
                                    <Button variant="contained" className="register-button" fullWidth onClick={() => batchEnter(j, item1.new_price)}>
                                        Register Now
                                    </Button>
                                </div>
                            )
                        })}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() =>{batchModalOpen(false, [], "")}} variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
    }
    const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(withRouter(CourseContent));