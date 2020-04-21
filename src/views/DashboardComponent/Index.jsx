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
import {event_get} from '../../Function/Event.js';
import {blog_get} from '../../Function/Blog.js';
import {server_url} from "../../server_host.js";

const useStyles = makeStyles(styles);
function CourseOverView(props) {
    const classes = useStyles();
    const [courseList, setCourseList] = React.useState([]);
    const [eventList, setEventList] = React.useState([]);
    const [blogList, setBlogList] = React.useState([]);
    // function eventChange() {
    //     props.history.push('/classroom-event');
    // }
    // function courseChange() {
    //     props.history.push('/classroom-course');
    // }
    function EnterListItem(type, id) {
        if(type === 'course') {
            window.location.href=`/courses/${id}`;
        }
        if(type === 'blog') {
            window.location.href=`/blog/${id}`;
        }
        if(type === 'event') {
            window.location.href=`/event`;
        }
    }
    React.useEffect(() => {
        var data = {
            id: '0'
        }
        course_get(data).then(res => {
            setCourseList(res);
        })
        data = {
            id: '0'
        }
        event_get(data).then(res => {
            setEventList(res);
        })
        data = {
            id: '0'
        }
        blog_get(data).then(res => {
            setBlogList(res);
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
                            </div>
                        </div>
                        <div className="content">
                            {blogList.map(function(item, i){
                                return(
                                    <div className="content-list-item" key={i} onClick={() => {EnterListItem('blog', item._id)}}>
                                        <img src={require('../../assets/img/blogs/1.png')} alt="..."/>
                                        <div>
                                            <p className="name">{item.title}</p>
                                            <p className="user-name">codingninja</p>
                                        </div>
                                        
                                    </div>
                                )
                            })}
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
                            </div>
                        </div>
                        <div className="content">
                            {courseList.map(function(item, i){
                                return(
                                    <div className="content-list-item" key={i} onClick={() => {EnterListItem('course', item._id)}}>
                                        <img src={server_url+'course/img_get/'+item.image} className='course-img' alt="..."/>
                                        <div>
                                            <p className="name">{item.title}</p>
                                            <p className="small-name">{item.title}</p>
                                        </div>
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
                            <div>
                                <p className="panel-type-title">Events</p>
                                <p className="panel-type-des">Checkout the latest happenings and events.</p>
                            </div>
                        </div>
                        <div className="content">
                            {eventList.map(function(item, i){
                                return(
                                    <div className="content-list-item" key={i} onClick={() => {EnterListItem('event', i)}}>
                                        <div>
                                            <p className="name">{item.title}</p>
                                        </div>
                                    </div>
                                )
                            })}
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