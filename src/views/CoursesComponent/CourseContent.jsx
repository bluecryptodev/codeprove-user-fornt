import React from "react";

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


import { Link, Element } from 'react-scroll';


//icon
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CloseIcon from '@material-ui/icons/Close';

import YouTube from 'react-youtube';
import InfiniteCarousel from 'react-leaf-carousel';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';


import { connect } from 'react-redux';

import styles from '../../assets/jss/course/coursecontent.js';
import {course_get} from '../../Function/Courses.js';
const ColorLinearProgress = withStyles({
    colorPrimary: {
      backgroundColor: '#ff6c5c',
    },
    barColorPrimary: {
      backgroundColor: 'white',
    },
})(LinearProgress);
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
    const opts = {
        height: '400',
        width: '100%',
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: 0
        }
    };
    const classes = useStyles();
    const theme = useTheme();
    const [courseContent, setCourseContent] = React.useState({});
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [featureItemIndex, setFeatureItemIndex] = React.useState(0);
    const [featureImg, setFeatureImg] = React.useState('');
    const [value, setValue] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false);
    const [scrollMenuPosition, setScrollMenuPosition] = React.useState(false);
    const [lectureModal, setLectureModal] = React.useState(false);
    const [lectureItemOpen, setLectureItemOpen] = React.useState(0);

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
    React.useEffect(() => {
        var data = {
            id: props.courseid
        }
        course_get(data).then(res => {
            setCourseContent(res);
            setFeatureImg(res.features[0].img);
        })
        .catch(err => {
            console.log(err);
        });
        window.addEventListener("scroll", scrollMenuChange);
        return function cleanup() {
            window.removeEventListener("scroll", scrollMenuChange);
        };
    }, [props]);
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
                                <img src={require('../../assets/img/courses/icon1.png')} alt="icon"/>
                                <h1>{courseContent.faculty.title}</h1>
                                <p>{courseContent.faculty.discription}</p>
                            </div>
                            <br /><br /><br />
                            <div className={classes.property}>
                                <Grid container spacing={3} className={classes.Content1}>
                                    {courseContent.faculty.property.map(function(item, i){
                                        return(
                                            <Grid item xs={12} sm={6} md={4} key={i}>
                                                <h2>{item.title}</h2>
                                                <p>{item.content}</p>
                                                <p>{item.other}</p>
                                            </Grid>
                                        )
                                        
                                    })}
                                    
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} className={classes.contactInfo}>
                            <YouTube
                                videoId={courseContent.faculty.video_url}
                                opts={opts}
                            />
                            
                            <div className={classes.buttonGroup}>
                                <Button variant="contained" className={classes.enrollButtonHeader}>
                                    Enroll Now
                                </Button>
                                <Button variant="contained" className={classes.freeButtonHeader}>
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
                                <Button variant="contained" className={classes.enrollButton}>
                                    Enroll Now
                                </Button>
                                <Button variant="contained" className={classes.freeButton}>
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
                                        {courseContent.faculty.course_support.map(function(item, i) {
                                            return(
                                                <Grid item xs={12} sm={6} md={4} key={i}>
                                                    <div>
                                                        <h1 style={{color: '#fa6c22', margin: '10px 0px'}}>{item.amount}</h1>
                                                        <hr style={{width: '100px', margin: 'auto'}}/>
                                                        <p style={{color: 'grey', textAlign: 'center', margin: '10px 0px'}}>{item.title}</p>
                                                    </div>
                                                    
                                                </Grid>
                                            )
                                        })}
                                        
                                    </Grid>
                                    <p style={{color: 'grey', textAlign: 'center', margin: '100px 0px'}}>{courseContent.faculty.support_time}</p>
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
                                    {/* <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                    >
                                        
                                        
                                        <Tab {...a11yProps(1)} >
                                            <p>test</p>
                                        </Tab>
                                        <Tab label="Item Three" {...a11yProps(2)} />
                                    </Tabs> */}
                                    <div className={classes.tabBar}>
                                        {courseContent.course_curriculum.map(function(item, i) {
                                            return(
                                                <div className={classes.Tab+" "+(value === i ? classes.TabSelect : '')} onClick={() => handleChangeIndex(i)} key={i}>
                                                    <p>Option {i+1}</p>
                                                    <p>{item.tab_title}</p>
                                                    <p>{item.tab_dis}</p>
                                                    {item.most_opted && (
                                                        <div className={classes.mostOpted}>
                                                            MOST OPTED
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <SwipeableViews
                                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                        index={value}
                                        onChangeIndex={handleChangeIndex}
                                        className={classes.tabPanel} 
                                    >
                                        {courseContent.course_curriculum.map(function(item, i) {
                                            return(
                                                <TabPanel value={value} index={0} dir={theme.direction} key={i} className={classes.tabContent}>
                                                    <Grid container spacing={3} className={classes.Content1}>
                                                        <Grid item xs={12} sm={6} md={9}>
                                                            <div className={classes.intro}>
                                                                <h3>{item.panel_title}</h3>
                                                                <p>{item.panel_dis}</p>
                                                            </div>
                                                            {item.content.map(function(item1, j){
                                                                return(
                                                                    <div className={classes.tagPart} key={j}>
                                                                        <h3>{item1.title}</h3>
                                                                        {item1.tags.map(function(item2, k){
                                                                            return (
                                                                                <p key={k}>{item2}</p>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                )
                                                            })}
                                                            <div className={classes.highlight}>
                                                                <h3>Course Highlights</h3>
                                                                {item.highlights.map(function(item1, j){
                                                                    return(
                                                                        <div className={classes.highlightItem} key={j}>
                                                                            <h5>{item1.amount}</h5>
                                                                            <p>{item1.title}</p>
                                                                        </div>
                                                                    )
                                                                })}
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
                                                                                {item.lecture_divide.map(function(item1, j){
                                                                                    return(
                                                                                        <div className={classes.lectureDivid} key={j}>
                                                                                            <div className={classes.lectureIcon+" "+(lectureItemOpen === j ? classes.lectureDivideSelect : '')} onClick={() => lectureItemOpenChange(j)}>
                                                                                                <KeyboardArrowDownIcon />
                                                                                            </div>
                                                                                            <div className={classes.lectureContent}>
                                                                                                <p className={"title "+ (lectureItemOpen === j ? classes.lectureDivideSelect : '')}>{item1.title}</p>
                                                                                                {lectureItemOpen === j && (<>
                                                                                                    <p className="description">{item1.description}</p>
                                                                                                    <ul>
                                                                                                        {item1.content_list.map(function(item2, k){
                                                                                                            return(
                                                                                                                <li key={k}>{item2}</li>
                                                                                                            )
                                                                                                        })}
                                                                                                    </ul>
                                                                                                    </>
                                                                                                )}
                                                                                                
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </DialogContent>
                                                                        <DialogActions>
                                                                            
                                                                        </DialogActions>
                                                                    </div>
                                                                    
                                                                </Dialog> 
                                                            </div>
                                                            
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={3}>
                                                            <h3>Select a suitable batch</h3>
                                                            {item.batch_list.map(function(item1, j){
                                                                return(
                                                                    <div className={classes.batchItem} key={j}>
                                                                        <div className={classes.startDate}>
                                                                            <p>Starting from</p>
                                                                            <p>15 Jan'20</p>
                                                                        </div>
                                                                        <div className={classes.priceList}>
                                                                            <p className="old-price">INR {item1.old_price}/-</p>
                                                                            <p className="new-price">INR {item1.new_price}/-</p>
                                                                            <br />
                                                                            <p className="cont1">All Inclusive</p>
                                                                            <p className="cont2">Offer valid till</p>
                                                                            <p className="cont2">12 Jan'20 11:59 PM</p>
                                                                        </div>
                                                                        <Button variant="contained" className={classes.RegisterButton}>
                                                                            Register Now
                                                                        </Button>
                                                                    </div>
                                                                )
                                                            })}
                                                            
                                                        </Grid>
                                                    </Grid>
                                                </TabPanel>
                                            )
                                        })}
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
                                            <p>{courseContent.career_prospects.who_for}</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div className={classes.courseLogoImg}>
                                            <img src={require('../../assets/img/courses/icon1.png')} alt="course_logo"/>
                                        </div>
                                    </Grid>
                                </Grid>
                                <div className={classes.future}>
                                    <h1>What Competitive Programming holds for your programming future?</h1>
                                    <Grid container spacing={3} className={classes.Content1}>
                                        {courseContent.career_prospects.future.map(function(item, i){
                                            return(
                                                <Grid item xs={12} sm={6} md={4} key={i}>
                                                    <div className={classes.futureItem}>
                                                        <h3>{item.title}</h3>
                                                        <p>{item.content}</p>
                                                    </div>
                                                </Grid>
                                            )
                                        })}
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
                                        {courseContent.features.map(function(item, i){
                                            return (
                                                <div className={classes.featureItem+" "+(i === featureItemIndex ? classes.featureItemSelect : '')} key={i} onMouseEnter={() => FeatureItemSelected(i, item.img)}>
                                                    <h3>{item.title}</h3>
                                                    <p>{item.dis}</p>
                                                    <br />
                                                    {i === featureItemIndex && (
                                                        <p>{item.content}</p>
                                                    )}
                                                    
                                                </div>
                                            )
                                        })}
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
                            <Grid item xs={12} sm={6} md={9}>
                                <div className={classes.reviewVideo_List}>
                                    <div>
                                        <YouTube
                                            videoId={courseContent.testimonials.video_url}
                                            opts={opts}
                                        />
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
                                        <p>{courseContent.testimonials.tracks}</p>
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
                                {courseContent.FAQs.map(function(item, i){
                                    return(
                                        <ExpansionPanel expanded={expanded === ('panel'+i)} onChange={handleChange('panel'+i)} key={i} className={classes.FQAsPanel}>
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                            >
                                                <Typography className={classes.question}>{item.question}</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Typography>
                                                    {item.answer}
                                                </Typography>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    )
                                })}
                                
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

export default connect(mapStateToProps)(CourseContent);