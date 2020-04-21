import React from "react";
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

//icon

import { makeStyles } from '@material-ui/core/styles';


import { connect } from 'react-redux';

import styles from '../../assets/jss/dashboard/content.js';
// import {user_get} from '../../Function/User.js';
import {course_get} from '../../Function/Courses.js';

const useStyles = makeStyles(styles);
function CourseOverView(props) {
    const classes = useStyles();
    const [courseList, setCourseList] = React.useState([]);
    // function eventChange() {
    //     props.history.push('/classroom-event');
    // }
    // function courseChange() {
    //     props.history.push('/classroom-course');
    // }
    React.useEffect(() => {
        console.log(props);
        var data = {
            id: '0'
        }
        course_get(data).then(res => {
            setCourseList(res);
        })
    }, [props]);
    return (
        <Container >
            <Grid container spacing={3} className={classes.Content1}>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} className={classes.classRoomList}>
                        <div className="header">
                            <img src={require('../../assets/img/event/glasses.png')} alt="..."/>
                            <div>
                                <p className="panel-type-title">Blogs</p>
                                <p className="panel-type-des">Want to know some more? Go Through our awesome blogs.</p>
                                <a href="/event" className="view-all-link">View More</a>
                            </div>
                        </div>
                        <div className="content">
                            <div className="content-list-item">
                                <img src={require('../../assets/img/blogs/1.png')} alt="..."/>
                                <p className="name">Coding Myths: Debunking age-old beliefs around Programming</p>
                            </div>
                            <div className="content-list-item">
                                <img src={require('../../assets/img/blogs/1.png')} alt="..."/>
                                <p className="name">Coding Myths: Debunking age-old beliefs around Programming</p>
                            </div>
                            <div className="content-list-item">
                                <img src={require('../../assets/img/blogs/1.png')} alt="..."/>
                                <p className="name">Coding Myths: Debunking age-old beliefs around Programming</p>
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} className={classes.classRoomList}>
                        <div className="header">
                            <img src={require('../../assets/img/event/courses.png')} alt="..."/>
                            <div>
                                <p className="panel-type-title">Courses</p>
                                <p className="panel-type-des">Learning was never this easy. Checkout the courses we provide</p>
                                <a href="/event" className="view-all-link">View More</a>
                            </div>
                        </div>
                        <div className="content">
                            {courseList.map(function(item, i){
                                return(
                                    <div className="content-list-item">
                                        <p className="name">{item.title}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} className={classes.classRoomList}>
                        <div className="header">
                            <img src={require('../../assets/img/event/events.png')} alt="..."/>
                            
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
    }
    const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(withRouter(CourseOverView));