import React from "react";

import SwipeableViews from 'react-swipeable-views';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
//icon
//core component
import CourseOverView from './ClassroomContent/CourseOverView.jsx';
import CourseContentLectures from './ClassroomContent/CourseContent.jsx';
import CourseDoubts from './ClassroomContent/CourseDoubts.jsx';
import CourseBatchMembers from './ClassroomContent/CourseBatchMembers.jsx';
import CourseSetting from './ClassroomContent/CourseSetting.jsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';


import { connect } from 'react-redux';

import styles from '../../assets/jss/classroom/content.js';
import {course_get} from '../../Function/Courses.js';
import {user_get} from '../../Function/User.js';
import {lecture_get} from '../../Function/Lectures.js';


function TabPanel(props: TabPanelProps) {
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
function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}
const useStyles = makeStyles(styles);
function CourseContent(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [courseContent, setCourseContent] = React.useState({});
    const [lectureList, setLectureList] = React.useState({});
    const [userData, setUserData] = React.useState({});
    const [tab1Value, setTab1Value] = React.useState(1);
    const handleChange = (event, newValue) => {
        setTab1Value(newValue);
    };

    const handleChangeIndex = index => {
        setTab1Value(index);
    };
    React.useEffect(() => {
        var data = {
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
                        courseList.pause = res.course_list[i].pause;
                        break;
                    }
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
            var lectureList = res;
            data = {
                id: localStorage.userToken
            }
            user_get(data).then(res => {
                for(var i = 0; i < lectureList.length; i++){
                    var flg = false;
                    for(var j = 0; j < res.lecture_list.length; j++){
                        if(lectureList[i]._id === res.lecture_list[j].id){
                            flg = true;
                            lectureList[i].score = res.lecture_list[j].score;
                            lectureList[i].step_status = res.lecture_list[j].step_status;
                        }
                    }
                    if(!flg) {
                        lectureList[i].step_status = {};
                        lectureList[i].score = 0;
                    }
                }
                lectureList.sort(function(a, b){return (a.level_number.toString() + a.order_number.toString()) - (b.level_number.toString() + b.order_number.toString())})
                
                setLectureList(lectureList);
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        });

        
    }, [props]);
    return (
        <div>
            <div className={classes.container}>
                <div>
                    <Tabs
                        value={tab1Value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        className={classes.courseTab}
                    >
                        <Tab label="Course Overview" {...a11yProps(0)} />
                        <Tab label="Content" {...a11yProps(1)} />
                        <Tab label="Doubts" {...a11yProps(2)} />
                        <Tab label="Batchmates/Mentors" {...a11yProps(3)} />
                        {courseContent.pay_status === 'pay' && (
                            <Tab label="Course Settings" {...a11yProps(4)} />
                        )}
                    </Tabs>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={tab1Value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={tab1Value} index={0} dir={theme.direction}>
                            <div className={classes.tabPanel} style={{backgroundImage: 'url("'+require('../../assets/img/tab-back.png')+'")'}}>
                                <CourseOverView courselist={courseContent} lecturelist={lectureList} userdata={userData}/>
                            </div>
                        </TabPanel>
                        <TabPanel value={tab1Value} index={1} dir={theme.direction}>
                            <div className={classes.tabPanel} style={{backgroundImage: 'url("'+require('../../assets/img/tab-back.png')+'")'}}>
                                {userData.course_list !== undefined && (
                                    <CourseContentLectures courselist={courseContent} lecturelist={lectureList} userdata={userData} server={props.server}/>
                                )}
                            </div>
                        </TabPanel>
                        <TabPanel value={tab1Value} index={2} dir={theme.direction}>
                            <div className={classes.tabPanel} style={{backgroundImage: 'url("'+require('../../assets/img/tab-back.png')+'")'}}>
                                <CourseDoubts courselist={courseContent} lecturelist={lectureList} userdata={userData}/>
                            </div>
                        </TabPanel>
                        <TabPanel value={tab1Value} index={3} dir={theme.direction}>
                            <div className={classes.tabPanel} style={{backgroundImage: 'url("'+require('../../assets/img/tab-back.png')+'")'}}>
                                <CourseBatchMembers courselist={courseContent} lecturelist={lectureList} userdata={userData}/>
                            </div>
                        </TabPanel>
                        <TabPanel value={tab1Value} index={4} dir={theme.direction}>
                            <div className={classes.tabPanel} style={{backgroundImage: 'url("'+require('../../assets/img/tab-back.png')+'")'}}>
                                <CourseSetting courselist={courseContent} lecturelist={lectureList} userdata={userData}/>
                            </div>
                        </TabPanel>
                    </SwipeableViews>
                </div>
            </div>
        </div>
    );
    }
    const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(CourseContent);