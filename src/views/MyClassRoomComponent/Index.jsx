import React from "react";
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

//icon
import LockIcon from '@material-ui/icons/Lock';

import { makeStyles } from '@material-ui/core/styles';


import { connect } from 'react-redux';

import styles from '../../assets/jss/myclassroom/content.js';
import {user_get} from '../../Function/User.js';
import {course_get} from '../../Function/Courses.js';


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
function CourseOverView(props) {
    const classes = useStyles();
    const [courseList, setCourseList] = React.useState([]);
    const [courseGetFlg, setCourseGetFlg] = React.useState(false);
    const [eventList, setEventList] = React.useState([]);
    const [eventGetFlg, setEventGetFlg] = React.useState(false);
    const [batchModal, setBatchModal] = React.useState(false);
    const [priceList, setPriceList] = React.useState([]);
    const [courseName, setCourseName] = React.useState("");
    const [courseId, setCourseID] = React.useState("");
    function dateFormate(date1) {
        var date = new Date(date1);
        var monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ];
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return monthNames[monthIndex]+" "+date.getDate()+", "+year
    }
    function batchModalOpen(value, price_list, course_name, course_id) {
        setBatchModal(value);
        setPriceList(price_list);
        setCourseName(course_name);
        setCourseID(course_id);
    }
    function eventChange() {
        props.history.push('/classroom-event');
    }
    function courseChange() {
        props.history.push('/classroom-course');
    }
    function enterClassroom(id) {
        props.history.push('/classroom/courses/'+id);
    }
    function enterEvent(id) {
        window.open('https://vimeo.com/'+id, '_blank');
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
    React.useEffect(() => {
        var data = {
            id: localStorage.userToken
        }
        user_get(data).then(res => {
            var course_list = [];
            var me_course_list = res.course_list;
            res.course_list.map(function(item, i) {
                var data = {
                    id: item.id
                }
                course_get(data).then(res => {
                    var course_obj = {
                        course_id: res._id,
                        course_price: res.price,
                        course_name: res.title,
                        course_des: res.description,
                        pay_status: item.pay_status,
                        batch_date: item.start_date
                    }
                    course_list.push(course_obj);
                    if(course_list.length === me_course_list.length){
                        setCourseList(course_list);
                        setCourseGetFlg(true);
                    }
                })
                return 0;
            });
            if(res.course_list.length === 0) {
                setCourseGetFlg(true);
            }
            setEventList(res.event_list);
            setEventGetFlg(true);
        })
    }, [props]);
    return (
        <Container >
            <Grid container spacing={3} className={classes.Content1}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} className={classes.classRoomList}>
                        <p className="enrollment-menu-text">Enrollment</p>
                        <div className={"enrollment-menu-list "+(props.location.pathname === '/classroom-course' ? "active" : "")} onClick={courseChange}>
                            Courses
                        </div>
                        <div className={"enrollment-menu-list "+(props.location.pathname === '/classroom-event' ? "active" : "")} onClick={eventChange}>
                            Events
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={9}>
                    {props.location.pathname === '/classroom-course' && (
                        <div className={classes.enrollmentContentList}>
                            <h3>Enrolled Courses</h3>
                            <hr></hr>
                            {courseGetFlg && (<>
                                {courseList.length === 0 && (
                                    <div>
                                        <p className="non-text">You're currently not enrolled into any of our courses!</p>
                                    </div>
                                )}
                                {courseList.map(function(item, i){
                                    return (
                                        <Paper elevation={3} className={classes.itemList} key={i}>
                                            <div className='item-content'>
                                                <div>
                                                    <p className="course-name-text">{item.course_name}</p>
                                                    {item.pay_status === 'free' && (
                                                        <p className="course-pay-text">FREE VERSION</p>
                                                    )}
                                                    {parseInt(item.batch_date) > new Date().getTime() && (<>
                                                        <p className="course-batch-text">Batch has not started yet</p>
                                                        <p className="course-batch-text">{dateFormate(parseInt(item.batch_date))}</p>
                                                        </>
                                                    )}
                                                    {parseInt(item.batch_date) <= new Date().getTime() && (
                                                        <p className="course-batch-text">{dateFormate(parseInt(item.batch_date))}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="course-info">
                                                <p className="course-name-text">{item.course_name}</p>
                                                <div style={{height: '75px', overflow: 'hidden'}}>
                                                    <p className="course-des-text">{item.course_des}</p>
                                                </div>
                                                
                                                {item.pay_status === 'free' && (
                                                    <p className="course-batch-text"><strong>Enroll in the course to unlock full content</strong></p>
                                                )}
                                                {item.pay_status === 'pay' && (
                                                    <p className="course-batch-text"><strong>STARTING ON:</strong> {dateFormate(parseInt(item.batch_date))}</p>
                                                )}
                                                
                                                <div className="button-part">
                                                    {item.pay_status === 'free' && (
                                                        <Button variant="contained" className="enroll-now-button" startIcon={<LockIcon />} size="large" onClick={() =>{batchModalOpen(true, item.course_price, item.course_name, item.course_id)}}>
                                                            ENROLL NOW
                                                        </Button>
                                                    )}
                                                    <Button variant="outlined" disabled={parseInt(item.batch_date) > new Date().getTime() ? true : false} className="classroom-enter-button" size="large" onClick={() => enterClassroom(item.course_id)}>
                                                        ENTER CLASSROOM
                                                    </Button>
                                                </div>
                                                
                                            </div>
                                        </Paper>
                                    )
                                })}
                                
                            </>)}
                            {!courseGetFlg && (
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <CircularProgress color="secondary" />
                                </div>
                            )}
                        </div>
                    )}
                    {props.location.pathname === '/classroom-event' && (
                        <div className={classes.enrollmentContentList}>
                            <h3>Enrolled Events</h3>
                            <hr></hr>
                            {eventGetFlg && (<>
                                {eventList.length === 0 && (
                                    <div>
                                        <p className="non-text">You're currently not registered into any of our events!</p>
                                    </div>
                                )}
                                {eventList.map(function(item, i){
                                    return (
                                        <Paper elevation={3} className={classes.itemList} key={i}>
                                            <div className='item-content'>
                                                <div>
                                                    <p className="course-name-text">EVENT</p>
                                                    <p className="course-batch-text">{dateFormate(item.start_date)}</p>
                                                </div>
                                            </div>
                                            <div className="course-info">
                                                <p className="course-name-text">{item.title}</p>
                                                <p className="course-des-text">{item.des}</p>
                                                {new Date(item.start_date).getTime() > new Date().getTime() && (
                                                    <p className="course-batch-text"><strong>STARTING ON:</strong> {dateFormate(item.start_date)}</p>
                                                )}
                                                <div className="button-part">
                                                    <Button variant="outlined" className="classroom-enter-button" size="large" onClick={() => enterEvent(item.video_url)} 
                                                        disabled={new Date(item.start_date).getTime() > new Date().getTime() ? true : false}
                                                    >
                                                        ENTER EVENT
                                                    </Button>
                                                </div>
                                                
                                            </div>
                                        </Paper>
                                    )
                                })}
                                
                            </>)}
                            {!eventGetFlg && (
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <CircularProgress color="secondary" />
                                </div>
                            )}
                        </div>
                    )}
                    
                </Grid>
            </Grid>
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
        </Container>
    );
    }
    const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(withRouter(CourseOverView));