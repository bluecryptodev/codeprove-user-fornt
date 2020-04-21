import React from "react";
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
// import CircularProgress from '@material-ui/core/CircularProgress';

//icon
import { makeStyles } from '@material-ui/core/styles';
// import Avatar from 'react-avatar';
import ReactNotifications from 'react-notifications-component';
import ReactHtmlParser from 'react-html-parser';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { connect } from 'react-redux';

import styles from '../../assets/jss/blog/content.js';
import {blog_get} from '../../Function/Blog.js';
import {server_url} from "../../server_host.js";

const useStyles = makeStyles(styles);
function CourseOverView(props) {
    const classes = useStyles();
    const [blogData, setBlogData] = React.useState({});
    function dateFormate(date1) {
        var date = new Date(date1);
        var monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ];
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return monthNames[monthIndex]+" "+date.getDate()+", "+year
    }
    
    React.useEffect(() => {
        var data = {
            id: props.match.params.id
        }
        blog_get(data).then(res => {
            console.log(res)
            setBlogData(res);
        })
    }, [props]);
    return (
        <div style={{width: "100%", background: 'white'}}>
            <div style={{width: props.width, margin: 'auto', background: 'white'}}>
                <ReactNotifications />
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={6} md={9}>
                        <div className={classes.gridContent}>
                            <h1>{blogData.title}</h1>
                            <img src={server_url+"blog/img_get/"+blogData.image} alt="background"/>
                            <br />
                            <br />
                            <Grid container spacing={0} style={{marginTop: '50px'}}>
                                <Grid item xs={12} sm={6} md={3} className={classes.postUser}>
                                    <img src={require('../../assets/img/blogs/1.png')} alt="..."/>
                                    <p>codingninja</p>
                                    <p>{dateFormate(blogData.createdAt)}</p>
                                </Grid>
                                <Grid item xs={12} sm={6} md={9} className="event-grid">
                                    {ReactHtmlParser(blogData.content)}
                                </Grid>
                            </Grid>
                        </div>
                        
                    </Grid>
                </Grid>
            </div> 
        </div>
    );
    }
    const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(withRouter(CourseOverView));