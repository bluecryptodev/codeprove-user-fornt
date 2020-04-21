import React from "react";
import {withRouter} from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Skeleton from '@material-ui/lab/Skeleton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import LinearProgress from '@material-ui/core/LinearProgress';

import Vimeo from '@u-wave/react-vimeo';
import axios from "axios";


import { Link, Element } from 'react-scroll';


//icon
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CloseIcon from '@material-ui/icons/Close';

import InfiniteCarousel from 'react-leaf-carousel';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';


import { connect } from 'react-redux';

import styles from '../../assets/jss/course/coursecontent.js';
import {course_get, json_file_read} from '../../Function/Courses.js';
import {user_update, user_get} from '../../Function/User.js';
import {lecture_get} from '../../Function/Lectures.js';
import {item_from_course} from '../../Function/LectureItems.js';
import {now_time_get} from '../../Function/Time.js';


const ColorLinearProgress = withStyles({
    colorPrimary: {
      backgroundColor: '#ff6c5c',
    },
    barColorPrimary: {
      backgroundColor: 'white',
    },
})(LinearProgress);
function FormatDate(props) {
    var date = new Date(props.date);
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
    return (<p>{day + ' ' + monthNames[monthIndex] + ' ' + year}</p>);
}
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
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );

}
const useStyles = makeStyles(styles);
function CourseContent(props) {
    
    const classes = useStyles();
    const theme = useTheme();
    const ref = React.useRef(null);
    const ref1 = React.useRef(null);
    const [introVideoHeight, setIntroVideoHeight] = React.useState(0);
    const [reviewVideoHeight, setReviewVideoHeight] = React.useState(0);
    const [courseContent, setCourseContent] = React.useState({});
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [featureItemIndex, setFeatureItemIndex] = React.useState(0);
    const [featureImg, setFeatureImg] = React.useState('');
    const [value, setValue] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false);
    const [scrollMenuPosition, setScrollMenuPosition] = React.useState(false);
    const [lectureModal, setLectureModal] = React.useState(false);
    const [lectureItemOpen, setLectureItemOpen] = React.useState(0);
    const [userInfo, setUserInfo] = React.useState({});
    const [nowTime, setNowDate] = React.useState(new Date());
    const [endTime, setEndTime] = React.useState('');
    const [batchIdList, setBatchIdList] = React.useState([]);
    const [load, setLoad] = React.useState('');

    function batchEnter(j, price) {
        var date = new Date(nowTime);
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
        window.location.href="/payment/"+props.courseid+"?date="+batch_date;
    }
    function lectureItemOpenChange(value){
        setLectureItemOpen(value)
    }
    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    
    const handleChangeIndex = (index: number) => {
      setValue(index);
    };
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
      ) => {
        setSelectedIndex(index);
    };
    function FeatureItemSelected(index, url) {
        setFeatureItemIndex(index);
        setFeatureImg(url);
    }
    function ScrollMenuSet(value) {
        // console.log(value)
        setSelectedIndex(value)
    }
    const scrollMenuChange = () => {
        const windowsScrollTop = window.pageYOffset;
        if (windowsScrollTop > 560) {
            setScrollMenuPosition(true)
        } else {
            setScrollMenuPosition(false)
        }
    };
    function lectureModalChange(value){
        setLectureModal(value)
    }
    function tryForFree(id) {
        var url = "";
        localStorage.course_id = props.courseid;
        if(localStorage.userToken !== undefined){
            url = "/lecture-content/";
            var course1 = false;
            for(var j = 0; j < userInfo.course_list.length; j++) {
                if(userInfo.course_list[j].id === props.courseid){
                    course1 = true;
                    break;
                }
            }
            
                var course = {
                    id: props.courseid,
                    pay_status: 'free',
                    batch_status: '1',
                    step_status: ''
                }
                userInfo.course_list.push(course);
                var data = {
                    id: props.courseid,
                    course: 'from_course'
                }
                lecture_get(data).then(res => {
                    for(var i = 0; i < res.length; i++){
                        var lecture = {
                            id: res[i]._id,
                            score: 0,
                            step_status: ''
                        }
                        userInfo.lecture_list.push(lecture);
                    }
                    for( i = 0; i < res.length; i++){
                        if(res[i].free_type === 'free'){
                            var lecture_id = res[i]._id;

                            data = {
                                id: res[i]._id
                            }
                            break;
                        }
                    }
                    item_from_course(data).then(res => {
                        for(var i = 0; i < res.length; i++){
                            var lecture_item = {
                                id: res[i]._id,
                                score: 0,
                                submit_list: [],
                                cpp_code: '',
                                java_code: '',
                                python_code: ''
                            }
    
                            userInfo.lecture_content_list.push(lecture_item);
                        }
                        url = url+ lecture_id+"/"+res[0]._id+"/"+0;
                        if(!course1){
                            user_update(userInfo).then(res => {
                                window.location.href = url;
                            })
                        }
                        else {
                            window.location.href = url;
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            url = "/login?type=free&redirect=classroom/"+id;
            props.history.push(url);
        }
        // props.history.push(url);
    }
    React.useEffect(() => {
        let source = axios.CancelToken.source();
        var data = {
            id: props.courseid
        }
        
        course_get(data, { cancelToken: source.token }).then(res => {
            var user_list = [];
            data = {}
            now_time_get(data).then(res => {
                setNowDate(res)
            })
            for(var i = 0; i < res.batch_members.length; i++) {
                for(var j = 0; j < res.batch_members[i].members.length; j++){
                    user_list.push(res.batch_members[i].members[j])
                }
            }
            setBatchIdList(user_list);
            if(courseContent._id !== res._id){
                setCourseContent(res);
                setLoad(!load);
            }
            setFeatureImg("support.png");
        })
        data = {

        }
        now_time_get(data).then(res => {
            setNowDate(res)
        })
        if(localStorage.userToken !== null){
            data = {
                id: localStorage.userToken
            }
            user_get(data).then(res => {
                setUserInfo(res);
                for(var i = 0; i < res.course_list.length; i++){
                    if(res.course_list[i].id === props.courseid){
                        if(res.course_list[i].batch_file !== undefined){
                            data = {
                                filename: res.course_list[i].batch_file+'.txt'
                            }
                            json_file_read(data).then(res => {
                                setEndTime(res.batch_end_date);
                            })
                        }
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
        if(ref.current !== null){
            setIntroVideoHeight(ref.current.clientWidth);
            setReviewVideoHeight(ref1.current.clientWidth);
        }
        window.addEventListener("scroll", scrollMenuChange);
        return function cleanup() {
            window.removeEventListener("scroll", scrollMenuChange);
            source.cancel();
        };
    }, [props, courseContent, load]);
    return (
        <div className={classes.container}>
            {/* {console.log(courseContent)} */}
            {Object.keys(courseContent).length === 0 && (
                <div style={{position: 'absolute', width: '100%', zIndex: '100', top: '0px', left: '0px'}}>
                    <ColorLinearProgress />
                </div>
            )}
            {Object.keys(courseContent).length !== 0 && (<>
                <div className={classes.contentHeader} style={{backgroundImage: 'url("'+require('../../assets/img/courses/header_img.png')+'")'}} id="123">
                    <Grid container spacing={3} className={classes.Content1}>
                        <Grid item xs={12} sm={6} md={6}>
                            <div className={classes.courseIntro}>
                                <img src={props.server+'course/img_get/'+courseContent.image} alt="icon"/>
                                <h1>{courseContent.title}</h1>
                                <p>{courseContent.description}</p>
                            </div>
                            <br /><br /><br />
                            <div className={classes.property}>
                                <Grid container spacing={3} className={classes.Content1}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <h2>Duration</h2>
                                        <p>4-6 months</p>
                                        <p>Online Course: Mixed Languages(Hindi & English)</p>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <h2>Prepare for</h2>
                                        <p>ICPC, Hackercup etc</p>
                                        <p></p>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <h2>Success Stories</h2>
                                        <p>100+</p>
                                        <p></p>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} className={classes.contactInfo} ref={ref}>
                            {introVideoHeight !== 0 && (
                                <Vimeo video={ courseContent.intro_video_id } height="500px" width= {introVideoHeight}/>
                            )}
                            <div className={classes.buttonGroup}>
                                <Link 
                                    activeClass='active' 
                                    to="enroll_form" 
                                    spy={true} 
                                    smooth={true} 
                                    duration={500} 
                                    offset={-70}
                                    onSetActive={() =>ScrollMenuSet(0)}
                                >
                                    <Button variant="contained" className={classes.enrollButtonHeader}>
                                        Enroll Now
                                    </Button>
                                </Link>
                                <Button 
                                    variant="contained" 
                                    disabled={(batchIdList.includes(localStorage.userToken) && (new Date(endTime).getTime() > new Date(nowTime).getTime())) ? true : false} 
                                    className={classes.freeButtonHeader} 
                                    onClick={() => tryForFree(courseContent._id)}
                                >
                                    Try For Free
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                    
                </div>
                <Element name="test1" >
                <div style={{background: '#f9f9fb'}}>
                    <Grid container spacing={3} className={classes.Content1}>
                        <Grid item xs={12} sm={6} md={3}>
                            <div className={classes.scrollList} style={{position: (scrollMenuPosition ? 'fixed' : 'relative'), top: (scrollMenuPosition ? '80px' : '0px')}}>
                                <Paper className={classes.scrollListbutton}>
                                    <List component="nav" aria-label="main mailbox folders">
                                        <Link 
                                            activeClass='active' 
                                            to="test1" 
                                            spy={true} 
                                            smooth={true} 
                                            duration={500} 
                                            offset={-70}
                                            onSetActive={() =>ScrollMenuSet(0)}
                                        >
                                            <ListItem
                                                button
                                                selected={selectedIndex === 0}
                                                onClick={event => handleListItemClick(event, 0)}
                                            >
                                                <ListItemText primary="Faculty" />
                                            </ListItem>
                                        </Link>
                                        <Link 
                                            activeClass='active' 
                                            to="test2" 
                                            spy={true} 
                                            smooth={true} 
                                            duration={500} 
                                            offset={-70}
                                            onSetActive={() =>ScrollMenuSet(1)}
                                        >
                                            <ListItem
                                                button
                                                selected={selectedIndex === 1}
                                                onClick={event => handleListItemClick(event, 1)}
                                            >
                                                <ListItemText primary="Course Curriculum" />
                                            </ListItem>
                                        </Link>
                                        <Link 
                                            activeClass='active' 
                                            to="test3" 
                                            spy={true} 
                                            smooth={true} 
                                            duration={500} 
                                            offset={-70}
                                            onSetActive={() =>ScrollMenuSet(2)}
                                            ignoreCancelEvents={true}
                                        >
                                            <ListItem
                                                button
                                                selected={selectedIndex === 2}
                                                onClick={event => handleListItemClick(event, 2)}
                                            >
                                                <ListItemText primary="Career Prospects" />
                                            </ListItem>
                                        </Link>
                                        <Link 
                                            activeClass='active' 
                                            to="test4" 
                                            spy={true} 
                                            smooth={true} 
                                            duration={500} 
                                            offset={-70}
                                            onSetActive={() =>ScrollMenuSet(3)}
                                            ignoreCancelEvents={true}
                                        >
                                            <ListItem
                                                button
                                                selected={selectedIndex === 3}
                                                onClick={event => handleListItemClick(event, 3)}
                                            >
                                                <ListItemText primary="Features" />
                                            </ListItem>
                                        </Link>
                                        <Link 
                                            activeClass='active' 
                                            to="test5" 
                                            spy={true} 
                                            smooth={true} 
                                            duration={500} 
                                            offset={-70}
                                            onSetActive={() =>ScrollMenuSet(4)}
                                            ignoreCancelEvents={true}
                                        >
                                            <ListItem
                                                button
                                                selected={selectedIndex === 4}
                                                onClick={event => handleListItemClick(event, 4)}
                                            >
                                                <ListItemText primary="Testimonials" />
                                            </ListItem>
                                        </Link>
                                        <Link 
                                            activeClass='active' 
                                            to="test6" 
                                            spy={true} 
                                            smooth={true} 
                                            duration={500} 
                                            offset={-70}
                                            onSetActive={() =>ScrollMenuSet(5)}
                                            ignoreCancelEvents={true}
                                        >
                                            <ListItem
                                                button
                                                selected={selectedIndex === 5}
                                                onClick={event => handleListItemClick(event, 5)}
                                            >
                                                <ListItemText primary="FAQs" />
                                            </ListItem>
                                        </Link>
                                    </List>
                                </Paper>
                                <Link 
                                    activeClass='active' 
                                    to="enroll_form" 
                                    spy={true} 
                                    smooth={true} 
                                    duration={500} 
                                    offset={-70}
                                    onSetActive={() =>ScrollMenuSet(0)}
                                >
                                    <Button variant="contained" className={classes.enrollButton}>
                                        Enroll Now
                                    </Button>
                                </Link>
                                
                                <Button 
                                    variant="contained" 
                                    disabled={(batchIdList.includes(localStorage.userToken) && (new Date(endTime).getTime() > new Date(nowTime).getTime())) ? true : false} 
                                    className={classes.freeButton} 
                                    onClick={tryForFree}
                                >
                                    Try For Free
                                </Button>
                            </div>
                            
                        </Grid>
                        <Grid item xs={12} sm={6} md={9}>
                            <div className={classes.topsupportList}>
                                <div>
                                    <div className={classes.topBar}></div>
                                    <h1>Learn with the best</h1>
                                </div>
                                <Grid container spacing={3} className={classes.Content1}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div className={classes.userAvartar}>
                                            <img src={require('../../assets/img/1.png')} alt="support"/>
                                            
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={9}>
                                        <div>
                                            <h4>Ankush Singla</h4>
                                            <p>Co-Founder & Instructor<br />Ankush is the Founder who holds a Bachelors in CS from IIT-D and Masters in Machine Learning from Stanford University. He has10+ years of valuable industry experience with Amazon and Facebook in the US. He is a leading tech educationist and has created the curriculum for all our courses plus the teaching methodology that Coding Ninjas follows.</p>
                                        </div>
                                    </Grid>
                                    <br /><br />
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div className={classes.userAvartar}>
                                            <img src={require('../../assets/img/1.png')} alt="support"/>
                                            
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={9}>
                                        <div>
                                            <h4>Ankush Singla</h4>
                                            <p>Co-Founder & Instructor<br />Ankush is the Founder who holds a Bachelors in CS from IIT-D and Masters in Machine Learning from Stanford University. He has10+ years of valuable industry experience with Amazon and Facebook in the US. He is a leading tech educationist and has created the curriculum for all our courses plus the teaching methodology that Coding Ninjas follows.</p>
                                        </div>
                                    </Grid>
                                </Grid>
                                
                                <div style={{marginTop: '100px'}}>
                                    <div className={classes.topBar}></div>
                                    <h1>The only online platform which provides live doubt support from over 100 handpicked mentors</h1>
                                    <Grid container spacing={3} className={classes.Content1}>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <div>
                                                <h1 style={{color: '#fa6c22', margin: '10px 0px'}}>100 +</h1>
                                                <hr style={{width: '100px', margin: 'auto'}}/>
                                                <p style={{color: 'grey', textAlign: 'center', margin: '10px 0px'}}>Doubts Solved per hour</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <div>
                                                <h1 style={{color: '#fa6c22', margin: '10px 0px'}}>97 %</h1>
                                                <hr style={{width: '100px', margin: 'auto'}}/>
                                                <p style={{color: 'grey', textAlign: 'center', margin: '10px 0px'}}>Doubt resolutions with min 4 star ratings</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <div>
                                                <h1 style={{color: '#fa6c22', margin: '10px 0px'}}>{"<7 Min"}</h1>
                                                <hr style={{width: '100px', margin: 'auto'}}/>
                                                <p style={{color: 'grey', textAlign: 'center', margin: '10px 0px'}}>Average time for you to get a response</p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <p style={{color: 'grey', textAlign: 'center', margin: '100px 0px'}}>Mentors are available from 6 pm to 12 am</p>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                </Element>
                <Element name="test2">
                <div  style={{background: 'white'}}>
                    <Grid container spacing={3} className={classes.Content1}>
                        <Grid item xs={12} sm={6} md={3}>
                        </Grid>
                        <Grid item xs={12} sm={6} md={9}>
                            <div className={classes.Curriculum}>
                                <div className={classes.topBar}></div>
                                <h1>Curriculum has been designed that fulfils the industry standard</h1>
                                <div className={classes.curriculumList}>
                                    <div className={classes.tabBar}>
                                        <div className={classes.Tab+" "+(value === 0 ? classes.TabSelect : '')} onClick={() => handleChangeIndex(0)}>
                                            <p>Option 1</p>
                                            <p>Competitive Programming Course</p>
                                            <p>Excel at solving hard coding problems</p>
                                                <div className={classes.mostOpted}>
                                                    MOST OPTED
                                                </div>
                                        </div>
                                    </div>
                                    <SwipeableViews
                                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                        index={value}
                                        onChangeIndex={handleChangeIndex}
                                        className={classes.tabPanel} 
                                    >

                                        <TabPanel value={value} index={0} dir={theme.direction} className={classes.tabContent}>
                                            <Grid container spacing={3} className={classes.Content1}>
                                                <Grid item xs={12} sm={6} md={9}>
                                                    <div className={classes.intro}>
                                                        <h3>Competitive Programming Course</h3>
                                                        <p>Competitive programming course will help in enhancing your Cognitive and Problem-Solving Abilities. Being able to solve tough problems in the most efficient way is a highly sought after skill in any developer. The course will also help in refining your programming skills, making you ready for global competitions such as ACM-ICPC, IPC and more.</p>
                                                    </div>
                                                    <div className={classes.tagPart}>
                                                        <h3>Pre-requisite</h3>
                                                        <p >Good knowledge of programming fundamentals and implementation of data structures.</p>
                                                        <p >Knowledge of basic mathematics is required</p>
                                                    </div>
                                                    <div className={classes.tagPart}>
                                                        <h3>Course USP's</h3>
                                                        <p >Hint videos</p>
                                                        <p >Personalised chatrooms</p>
                                                        <p >Become an expert problem solver.</p>
                                                        <p >Faculty from IIT, Stanford, DTU and more.</p>
                                                        <p >Prepare for ACM-ICPC, Code Jam, Hacker Cup etc.</p>
                                                        <p >Advance training for the topics like Recursion, String, Trees and many more</p>
                                                    </div>
                                                    <div className={classes.highlight}>
                                                        <h3>Course Highlights</h3>
                                                        <div className={classes.highlightItem}>
                                                            <h5>4-6 months</h5>
                                                            <p>Course Duration</p>
                                                        </div>
                                                        <div className={classes.highlightItem}>
                                                            <h5>15</h5>
                                                            <p>Assignmentsn</p>
                                                        </div>
                                                        <div className={classes.highlightItem}>
                                                            <h5>150+</h5>
                                                            <p>Live Problems</p>
                                                        </div>
                                                        <div className={classes.highlightItem}>
                                                            <h5>60+</h5>
                                                            <p>Hours of Video Content</p>
                                                        </div>
                                                    </div>
                                                    <div className={classes.CurriculumCheck}>
                                                        <h4>Explore the course content</h4>
                                                        <Button
                                                            variant="outlined"
                                                            color="primary"
                                                            className={classes.CurriculumCheckButton}
                                                            onClick={() => lectureModalChange(true)}
                                                        >
                                                            Check Out Curriculum
                                                        </Button>
                                                        <Dialog
                                                            open={lectureModal}
                                                            onClose={() =>lectureModalChange(false)}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                            
                                                            maxWidth={false}
                                                            width={400}
                                                        >
                                                            <div 
                                                                style={{backgroundImage: 'url("'+require('../../assets/img/courses/modalback.png')+'")'}}
                                                                className={classes.lectureModal}
                                                            >
                                                                <DialogTitle id="alert-dialog-slide-title" className={classes.lectureModalTitle}>
                                                                    <p>Course Curriculum</p>
                                                                    <div className={classes.bottomBar}></div>
                                                                    <CloseIcon  className={classes.closeButton} onClick={() =>lectureModalChange(false)}/>
                                                                </DialogTitle>
                                                                <DialogContent className={classes.lectureModalContent}>
                                                                    <div>
                                                                        <div className={classes.lectureDivid} >
                                                                            <div className={classes.lectureIcon+" "+(lectureItemOpen === 0 ? classes.lectureDivideSelect : '')} onClick={() => lectureItemOpenChange(0)}>
                                                                                <KeyboardArrowDownIcon />
                                                                            </div>
                                                                            <div className={classes.lectureContent}>
                                                                                <p className={"title "+ (lectureItemOpen === 0 ? classes.lectureDivideSelect : '')}>Class 1-5</p>
                                                                                {lectureItemOpen === 0 && (<>
                                                                                    <p className="description">Course will commence with basics of competitive coding. These topics will form the base for the future topics and are also the most important topics for competitive programming.</p>
                                                                                    <ul>
                                                                                        <li>Basics Of Competitive Coding</li>
                                                                                        <li>Various type of errors</li>
                                                                                        <li>Basics of Recursion</li>
                                                                                        <li>Time Complexity</li>
                                                                                        <li>Space Complexity</li>
                                                                                        <li>Language Tools</li>
                                                                                        <li>STL</li>
                                                                                        <li>Sorting and Searching Applications</li>
                                                                                        <li>Binary Search Applications</li>
                                                                                        <li>Live Questions on above topics</li>
                                                                                    </ul>
                                                                                    </>
                                                                                )}
                                                                                
                                                                            </div>
                                                                        </div>
                                                                        <div className={classes.lectureDivid} >
                                                                            <div className={classes.lectureIcon+" "+(lectureItemOpen === 1 ? classes.lectureDivideSelect : '')} onClick={() => lectureItemOpenChange(1)}>
                                                                                <KeyboardArrowDownIcon />
                                                                            </div>
                                                                            <div className={classes.lectureContent}>
                                                                                <p className={"title "+ (lectureItemOpen === 1 ? classes.lectureDivideSelect : '')}>Class 6-10</p>
                                                                                {lectureItemOpen === 1 && (<>
                                                                                    <p className="description">We will focus on the most important topics for competitive programming in these classes including Recursion, Bit Manipulation & greedy problems.</p>
                                                                                    <ul>
                                                                                        <li>Backtracking</li>
                                                                                        <li>Recursion 2</li>
                                                                                        <li>Basics of Recursion</li>
                                                                                        <li>Recursion Applications</li>
                                                                                        <li>Bit Manipulation</li>
                                                                                        <li>Applications of Bit Manipulation</li>
                                                                                        <li>Greedy problems</li>
                                                                                        <li>Greedy Mathematics</li>
                                                                                        <li>Live Questions on above topics</li>
                                                                                    </ul>
                                                                                    </>
                                                                                )}
                                                                                
                                                                            </div>
                                                                        </div>
                                                                        <div className={classes.lectureDivid} >
                                                                            <div className={classes.lectureIcon+" "+(lectureItemOpen === 2 ? classes.lectureDivideSelect : '')} onClick={() => lectureItemOpenChange(2)}>
                                                                                <KeyboardArrowDownIcon />
                                                                            </div>
                                                                            <div className={classes.lectureContent}>
                                                                                <p className={"title "+ (lectureItemOpen === 2 ? classes.lectureDivideSelect : '')}>Class 11-15</p>
                                                                                {lectureItemOpen === 2 && (<>
                                                                                    <p className="description">We will continue the course with important advanced data structures needed to solve Range Minimum Query problems including Segment Treec. & other important topics like Dynamic Programming to solve competitive programming problems.</p>
                                                                                    <ul>
                                                                                        <li>Modulo Arithmetic</li>
                                                                                        <li>Applications of Modulo Operations</li>
                                                                                        <li>Dynamic Programming-1</li>
                                                                                        <li>Dynamic Programming-2</li>
                                                                                        <li>DP plus Maths problems</li>
                                                                                        <li>Segment Tree With Lazy Propagation</li>
                                                                                        <li>Applications of Segment Tree</li>
                                                                                        <li>Live Questions on above topics</li>
                                                                                    </ul>
                                                                                    </>
                                                                                )}
                                                                                
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </DialogContent>
                                                                <DialogActions>
                                                                    
                                                                </DialogActions>
                                                            </div>
                                                            
                                                        </Dialog> 
                                                    </div>
                                                    
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                
                                                <Element name="enroll_form">
                                                    <h3>Select a suitable batch</h3>
                                                    {courseContent.price.map(function(item1, j){
                                                        return(
                                                            <div className={classes.batchItem} key={j}>
                                                                <div className={classes.startDate}>
                                                                    <p>Starting from</p>
                                                                    <FormatDate order={j} date={nowTime}/>
                                                                </div>
                                                                <div className={classes.priceList}>
                                                                    <p className="old-price">INR {item1.old_price}/-</p>
                                                                    <p className="new-price">INR {item1.new_price}/-</p>
                                                                    <br />
                                                                    <p className="cont1">All Inclusive</p>
                                                                    <p className="cont2">Offer valid till</p>
                                                                    <FormatDate order={j} date={nowTime}/>
                                                                </div>
                                                                <Button 
                                                                    variant="contained" 
                                                                    className={classes.RegisterButton} 
                                                                    onClick={() => batchEnter(j, item1.new_price)} 
                                                                    disabled={(batchIdList.includes(localStorage.userToken) && (new Date(endTime).getTime() > new Date(nowTime).getTime())) ? true : false} 
                                                                >
                                                                    Register Now
                                                                </Button>
                                                            </div>
                                                        )
                                                    })}
                                                </Element>  
                                                </Grid>
                                                
                                            </Grid>
                                        </TabPanel>
                                    </SwipeableViews>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                </Element>
                <Element name="test3">
                <div  style={{background: '#f8f9fd'}}>
                    <Grid container spacing={3} className={classes.Content1}>
                        <Grid item xs={12} sm={6} md={3}>
                        </Grid>
                        <Grid item xs={12} sm={6} md={9}>
                            <div className={classes.Career}>
                                <Grid container spacing={3} className={classes.Content1}>
                                    <Grid item xs={12} sm={6} md={9}>
                                        <div className="who-part">
                                            <h1>Who this course is for?</h1>
                                            <p>The programme will benefit those who are want to up-skill their coding experience and want to build themselves for the global coding competitions. Join the league of intellectuals with the expert problem solving abilities that will help you conquer even the toughest problems.</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div className={classes.courseLogoImg}>
                                            <img src={props.server+'course/img_get/'+courseContent.image} alt="icon"/>
                                        </div>
                                    </Grid>
                                </Grid>
                                <div className={classes.future}>
                                    <h1>What Competitive Programming holds for your programming future?</h1>
                                    <Grid container spacing={3} className={classes.Content1}>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <div className={classes.futureItem}>
                                                <h3>Skill Enhancements</h3>
                                                <p>The course builds a mind with the expert problem solving abilities that will help in cracking the toughest problems efficiently in the technical world.</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <div className={classes.futureItem}>
                                                <h3>Job Prospects</h3>
                                                <p>Participants and winners of programming competitions are highly sought after by companies like Google, Facebook, Microsoft, Amazon etc. A competitive programmer will be able to crack any coding challenge in the most efficient way possible.</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <div className={classes.futureItem}>
                                                <h3>Career Advice</h3>
                                                <p>A Competitive Programmer has an aptitude to excel in different segments of programming. Practicing different codes with a set timeframe will help you fast track your career. One should never stop practicing algorithms and should be active in participating in the competitions like ACM-ICPC, APAC etc to keep themselves updated with the trend of complex codes. This will help them in shaping a polished resume and in turn gaining a good job.</p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    
                                </div>
                            </div>
                            
                        </Grid>
                    </Grid>
                </div>
                </Element>
                <Element name="test4">
                <div  style={{background: 'white'}}>
                    <Grid container spacing={3} className={classes.Content1}>
                        <Grid item xs={12} sm={6} md={3}>
                        </Grid>
                        <Grid item xs={12} sm={6} md={9}>
                            <div className={classes.features}>
                                <div className={classes.topBar}></div>
                                <h1>Curriculum has been designed that fulfils the industry standard</h1>
                                <Grid container spacing={3} className={classes.Content1}>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <div className={classes.featureItem+" "+(0 === featureItemIndex ? classes.featureItemSelect : '')} onMouseEnter={() => FeatureItemSelected(0, "support.png")}>
                                            <h3>Mentor Support</h3>
                                            <p>Your right hand for the best doubts support</p>
                                            <br />
                                            {0 === featureItemIndex && (
                                                <p>Mentors are assigned to the individual group of students where they can communicate through live chats and video sessions for their doubt support.</p>
                                            )}
                                        </div>
                                        <div className={classes.featureItem+" "+(1 === featureItemIndex ? classes.featureItemSelect : '')} onMouseEnter={() => FeatureItemSelected(1, "introductor.png")}>
                                            <h3>Instructor</h3>
                                            <p>Highly qualified faculty for your enhanced learning</p>
                                            <br />
                                            {1 === featureItemIndex && (
                                                <p>You will be taught by experts and renowned faculty with experience in companies like Facebook, graduating from IITs and Stanford.</p>
                                            )}
                                        </div>
                                        <div className={classes.featureItem+" "+(2 === featureItemIndex ? classes.featureItemSelect : '')} onMouseEnter={() => FeatureItemSelected(2, "curriculum.png")}>
                                            <h3>Curriculum</h3>
                                            <p>Concepts that will make you industry ready</p>
                                            <br />
                                            {2 === featureItemIndex && (
                                                <p>The curriculum has been designed with the guidance from the industry mentors to help you give a solid foundation in the concepts that hold importance in the professional world.</p>
                                            )}
                                        </div>
                                        <div className={classes.featureItem+" "+(3 === featureItemIndex ? classes.featureItemSelect : '')} onMouseEnter={() => FeatureItemSelected(3, "vibe.png")}>
                                            <h3>Classroom Vibe</h3>
                                            <p>Convert your room into a classroom at your fingertips</p>
                                            <br />
                                            {3 === featureItemIndex && (
                                                <p>It is a common myth that Online classes aren't as effective as in-class learning. Well, here you can interact real-time with your mentors, faculty members and other students of your course through the chatroom on Slack.</p>
                                            )}
                                        </div>
                                        <div className={classes.featureItem+" "+(4 === featureItemIndex ? classes.featureItemSelect : '')} onMouseEnter={() => FeatureItemSelected(4, "certificate.png")}>
                                            <h3>Certificate of Course Completion</h3>
                                            <p>Validate your course with an official certificate</p>
                                            <br />
                                            {4 === featureItemIndex && (
                                                <p>You will be awarded with a course completion certificate only if you pass with a minimum grade of 60%.</p>
                                            )}
                                        </div>
                                        <div className={classes.featureItem+" "+(5 === featureItemIndex ? classes.featureItemSelect : '')} onMouseEnter={() => FeatureItemSelected(5, "freeze.png")}>
                                            <h3>Course Extension and Freeze</h3>
                                            <p>Make your course convenient and flexible</p>
                                            <br />
                                            {5 === featureItemIndex && (
                                                <p>Are you stuck with your college exams ? Do you seek revision or need a little more time to get better in your subject? Don’t worry! WE HAVE GOT YOU COVERED. As a part of our ninja family you can freeze(pause) your course for upto 20 days and extend your course for upto 15 days or you can opt for both from your postal.</p>
                                            )}
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <div className={classes.featureImg}>
                                            {featureImg !== '' && (
                                                <img  src={require(('../../assets/img/courses/'+featureImg))} alt="course_logo"/>
                                            )}
                                        </div>
                                        
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                </Element>
                <Element name="test5" >
                <div  style={{background: 'white'}}>
                    <Grid container spacing={3} className={classes.Content1}>
                        <Grid item xs={12} sm={6} md={3}>
                        </Grid>
                        <Grid item xs={12} sm={6} md={9}>
                            <div className={classes.studentReviews}>
                                <div className={classes.topBar}></div>
                                <h1>Don’t listen to us, But listen to our students</h1>
                                <p>Hear what have our students have to say</p>
                            </div>
                        </Grid>
                    </Grid>
                    <div className={classes.studentReviewsContent} style={{backgroundImage: 'url("'+require('../../assets/img/courses/review.png')+'")'}}>
                        <Grid container spacing={3} className={classes.Content1}>
                            <Grid item xs={12} sm={6} md={3}>
                            </Grid>
                            <Grid item xs={12} sm={6} md={9} ref={ref1}>
                                <div className={classes.reviewVideo_List}>
                                    <div>
                                        {reviewVideoHeight !== 0 && (
                                            <Vimeo video={ courseContent.reivew_video_id } height="500px" width= {reviewVideoHeight}/>
                                        )}
                                    </div>
                                    
                                    <InfiniteCarousel
                                        breakpoints={[
                                        {
                                            breakpoint: 768,
                                            settings: {
                                            slidesToShow: 1,
                                            slidesToScroll: 1,
                                            },
                                        },
                                        ]}
                                        dots={false}
                                        showSides={false}
                                        sidesOpacity={1}
                                        sideSize={.1}
                                        slidesToScroll={1}
                                        slidesToShow={3}
                                        scrollOnDevice={true}
                                        autoCycle={true}
                                        cycleInterval={1000}
                                    >
                                        <div >
                                            <Paper elevation={3}  className={classes.reviewList}>
                                                <div className={classes.reviewListHeader}>
                                                    <img src={require('../../assets/img/exclusive5.png')} alt="microsoft"/>
                                                    <p>Dharneesh Gupta</p>
                                                </div>
                                                <div>
                                                    <p>It was great learning experience.The kind of content it provides.It really helps in building ur logic and how to approach a problem in a real life too.Ankush sir has done a wonderful job in explaining the core concept of hard topics.</p>
                                                </div>
                                            </Paper>
                                        </div>
                                        <div >
                                            <Paper elevation={3}  className={classes.reviewList}>
                                                <div className={classes.reviewListHeader}>
                                                    <img src={require('../../assets/img/exclusive5.png')} alt="microsoft"/>
                                                    <p>Dharneesh Gupta</p>
                                                </div>
                                                <div>
                                                    <p>It was great learning experience.The kind of content it provides.It really helps in building ur logic and how to approach a problem in a real life too.Ankush sir has done a wonderful job in explaining the core concept of hard topics.</p>
                                                </div>
                                            </Paper>
                                        </div>
                                        <div >
                                            <Paper elevation={3}  className={classes.reviewList}>
                                                <div className={classes.reviewListHeader}>
                                                    <img src={require('../../assets/img/exclusive5.png')} alt="microsoft"/>
                                                    <p>Dharneesh Gupta</p>
                                                </div>
                                                <div>
                                                    <p>It was great learning experience.The kind of content it provides.It really helps in building ur logic and how to approach a problem in a real life too.Ankush sir has done a wonderful job in explaining the core concept of hard topics.</p>
                                                </div>
                                            </Paper>
                                        </div>
                                    </InfiniteCarousel>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <Grid container spacing={3} className={classes.Content1}>
                        <Grid item xs={12} sm={6} md={3}>
                        </Grid>
                        <Grid item xs={12} sm={6} md={9} style={{padding: '0px 20px'}}>
                            <div className={classes.trackIntro}>
                                <Grid container spacing={3} className={classes.Content1}>
                                    <Grid item xs={12} sm={6} md={9}>
                                        <h2 style={{fontFamily: 'Vidaloka, serif', margin: '0px'}}>Not just it! We have launched career tracks courses!</h2>
                                        <p>A powerful course which covers techniques for attacking and solving challenging computational problems in which the Fundamental algorithmic and Domain specific techniques will also be covered.</p>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            endIcon={<ArrowForwardIosIcon />}
                                            className={classes.exploreButton}
                                        >
                                            Explore
                                        </Button>
                                            
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                </Element>
                <Element name='test6'>
                <div style={{background: '#f8f9fd'}}>
                    <Grid container spacing={3} className={classes.Content1}>
                        <Grid item xs={12} sm={6} md={3}>
                        </Grid>
                        <Grid item xs={12} sm={6} md={9} style={{padding: '0px 20px'}}>
                            <div className={classes.askQuestion}>
                                <h2>Frequently Asked Question</h2>
                                <ExpansionPanel expanded={expanded === ('panel1')} onChange={handleChange('panel1')} className={classes.FQAsPanel}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography className={classes.question}>Do the Coding Ninjas provides Placement assistance?</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            We have an in-house placement team. We often work with students to sharpen their resumé and hone interview skills and make sure they’re prepared for the competitive job hunt. We’ll showcase your achievements, skills and projects through our profile page & put you face to face with potential employers.
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={expanded === ('panel2')} onChange={handleChange('panel2')} className={classes.FQAsPanel}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography className={classes.question}>How my doubts will get resolved?</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                        We have an army of TA’s who are available in different time slots to resolve all your doubts. You can also interact with faculty through social elements such as Whatsapp.
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={expanded === ('panel3')} onChange={handleChange('panel3')} className={classes.FQAsPanel}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography className={classes.question}>How long does it take to complete the course ?</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            Time to completion can vary based on your schedule, but most learners are able to complete the Specialization in 2-3 months. Moreover, it depends upon which course/module you select, as each of them has different durations.
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={expanded === ('panel4')} onChange={handleChange('panel4')} className={classes.FQAsPanel}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography className={classes.question}>What background knowledge is necessary?</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            You should have good knowledge about programming fundamentals,data structures and algorithms.
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={expanded === ('panel5')} onChange={handleChange('panel5')} className={classes.FQAsPanel}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography className={classes.question}>Is this course suitable for me?</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            Definitely! If you want to shift to software developer career path, then this course is perfect for you!
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </div>
                            
                        </Grid>
                    </Grid>
                </div>
                </Element>
                </>
            )}
            {Object.keys(courseContent).length === 0 && (<>
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
    );
    }
    const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(withRouter(CourseContent));