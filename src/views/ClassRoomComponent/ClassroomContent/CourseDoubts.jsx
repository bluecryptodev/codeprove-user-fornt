import React from "react";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


//icon
import LockIcon from '@material-ui/icons/Lock';

import { makeStyles, useTheme } from '@material-ui/core/styles';


import { connect } from 'react-redux';

import styles from '../../../assets/jss/classroom/content.js';
import {doubte_get} from '../../../Function/DoubtChat.js';

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
function CourseOverView(props) {
    const classes = useStyles();
    const theme = useTheme();

    const [tab1Value, setTab1Value] = React.useState(0);
    const [activeDoubteList, setActiveDoubteList] = React.useState([]);
    const [solvedDoubteList, setSolveDoubteList] = React.useState([]);

    const handleChange = (event, newValue) => {
        setTab1Value(newValue);
    };
    const handleChangeIndex = index => {
        setTab1Value(index);
    };
    function dateFormate(date1) {
        var date = new Date(date1);
        var monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ];
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var day = date.getDate();
        var hour = date.getHours();
        var minite = date.getMinutes();
        return hour+":"+minite+" "+day+" "+monthNames[monthIndex]+" "+year
    }
    function EnterClass(item) {
        window.location.href = "/lecture-content/"+item.lecture_id+"/"+item.lectureitem_id+"/"+item.course_deadline+"?chat_view=true&chat_id="+item._id;
    }
    React.useEffect(() => {
        if(props.courselist._id !== undefined){
            var data = {
                flg: 'user',
                user_id: localStorage.userToken,
                course_id: props.courselist._id
            }
            doubte_get(data).then(res => {
                var active_list = [];
                var solve_list = [];
                for(var i = 0; i < res.length; i++){
                    if(res[i].solve_flg){
                        solve_list.push(res[i])
                    }
                    if(!res[i].solve_flg){
                        active_list.push(res[i]);
                    }
                }
                console.log(solve_list)
                setActiveDoubteList(active_list);
                setSolveDoubteList(solve_list);
            })
        }
        
    }, [props]);
    return (
        <div className={classes.container}>
            {props.courselist.pay_status === 'free' && (
                <div className={classes.courseOverFlowContent}>
                    <Grid container spacing={3} className={classes.Content1}>
                        <Grid item xs={12} sm={6} md={12}>
                            <div className={classes.courseCommentLock}>
                                <LockIcon />
                                <h1 style={{textAlign: 'center'}}>Doubt Section will be unlocked once you register for the course.</h1>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )}
            {props.courselist.pay_status === 'pay' && (
                <div className={classes.doubtContent}>
                    <Tabs
                        value={tab1Value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        className={classes.doubtTab}
                        style={{width: '80%', margin: 'auto'}}
                    >
                        <Tab label="Unresolved" {...a11yProps(0)} />
                        <Tab label="Resolved" {...a11yProps(1)} />
                    </Tabs>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={tab1Value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={tab1Value} index={0} dir={theme.direction}>
                            <h2>Active Doubts ({activeDoubteList.length})</h2>
                            <Grid container spacing={3} className={classes.Content1}>
                                {activeDoubteList.map(function(item, i) {
                                    return (
                                        !item.solve_flg && (
                                            <Grid item xs={12} sm={12} md={3} key={i}>
                                                <div className={classes.DoubteList} onClick={() => {EnterClass(item)}}>
                                                    <div className="doubt_header">
                                                        <div style={{float: 'left'}}>
                                                            <h4>{item.title}</h4>
                                                            <p>{dateFormate(item.createdAt)}</p>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="doubt_content">
                                                        <p className="description">{item.description}</p>
                                                        <p className="lecture-type">{item.lectureitem_type}</p>
                                                        <p className="item-name">{item.lectureitem_name}</p>
                                                    </div>
                                                    <hr />
                                                    <div className="footer">
                                                        Go To Doubt
                                                    </div>

                                                </div>
                                            </Grid>
                                        )
                                    )
                                })}
                                {activeDoubteList.length === 0 && (
                                    <div className={classes.noDoubts}>
                                        <p>You have no active doubts at the moment.</p>
                                    </div>
                                )}
                            </Grid>
                        </TabPanel>
                        <TabPanel>
                            <Grid container spacing={3} className={classes.Content1}>
                                {solvedDoubteList.map(function(item, i) {
                                    return (
                                        item.solve_flg && (
                                            <Grid item xs={12} sm={12} md={3} key={i}>
                                                <div className={classes.DoubteList} onClick={() => {EnterClass(item)}}>
                                                    <div className="doubt_header">
                                                        <div style={{float: 'left'}}>
                                                            <h4>{item.title}</h4>
                                                            <p>{dateFormate(item.createdAt)}</p>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="doubt_content">
                                                        <p className="description">{item.description}</p>
                                                        <p className="lecture-type">{item.lectureitem_type}</p>
                                                        <p className="item-name">{item.lectureitem_name}</p>
                                                    </div>
                                                    {/* <div style={{float: 'right', width: '30px', height: '30px', background: 'grey'}}></div> */}
                                                    <hr />
                                                    <div className="footer">
                                                        Go To Doubt
                                                    </div>
                                                </div>
                                            </Grid>
                                        )
                                    )
                                })}
                                {solvedDoubteList.length === 0 && (
                                    <div className={classes.noDoubts}>
                                        <p>You have no resolved doubts at the moment.<br/>Doubts which you have resolved will appear here.</p>
                                    </div>
                                )}
                            </Grid>
                        </TabPanel>
                    </SwipeableViews>
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

export default connect(mapStateToProps)(CourseOverView);