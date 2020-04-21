import React from "react";
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import CircularProgress from '@material-ui/core/CircularProgress';

//icon
import CheckIcon from '@material-ui/icons/Check';

import { makeStyles } from '@material-ui/core/styles';
// import Avatar from 'react-avatar';
import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { connect } from 'react-redux';

import styles from '../../assets/jss/event/content.js';
import {user_get, custome_update} from '../../Function/User.js';
import {event_get, event_update} from '../../Function/Event.js';
import {now_time_get} from '../../Function/Time.js';
import {server_url} from "../../server_host.js";
function MyNotification(props) {
    return (
      <div style={{
        display: 'flex',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: '15px'
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
const useStyles = makeStyles(styles);
function Event(props) {
    const classes = useStyles();
    const [eventList, setEventList] = React.useState([]);
    const [uncoming, setUncoming] = React.useState([]);
    const [past, setPast] = React.useState([]);
    const [register, setRegister] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({});
    const [nowDate, setNowDate] = React.useState(null);
    function dateFormate(date1) {
        var date = new Date(date1);
        var monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ];
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return monthNames[monthIndex]+" "+date.getDate()+", "+year
    }
    function eventRegister(id, members) {
        var event_list = eventList;
        var event_info = {};
        members.push(localStorage.userToken);
        for(var i = 0; i < event_list.length; i++){
            if(id === event_list[i]._id) {
                event_list[i].registered_members=members;
                event_info = {
                    id: event_list[i]._id,
                    title: event_list[i].title,
                    des: event_list[i].description,
                    start_date: event_list[i].start_date,
                    video_url: event_list[i].video_url
                };
                
            }
        }
        setEventList(event_list);
        var data = {
            id: id, 
            data: {
                registered_members: members
            }
        }
        
        event_update(data).then(res => {
            if(res.success) {
                userInfo.event_list.push(event_info);
                data = {
                    flg: 'event',
                    id: localStorage.userToken,
                    data: userInfo.event_list
                }
                custome_update(data).then(res => {
                    store.addNotification({
                        content: <MyNotification title="Bookmark Successfully Removed!"/>,
                        container: 'top-right',
                        animationIn: ["animated", "bounceIn"],
                        animationOut: ["animated", "bounceOut"],
                        dismiss: {
                          duration: 3000
                        },
                        width: 300
                    })
                    setRegister(!register)
                })
                
            }
        })
        console.log(data);
    }
    React.useEffect(() => {
        var data = {}
        now_time_get(data).then(res => {
            var now_date_time = res;
            setNowDate(res);
            data = {
                id: '0'
            }
            event_get(data).then(res => {
                var un_event = [];
                var past_event = [];
                for(var i = 0; i < res.length; i++){
                    if(new Date(res[i].start_date).getTime() > new Date().getTime(now_date_time)){
                        un_event.push(res[i]);
                    }
                    else {
                        past_event.push(res[i]);
                    }
                }
                setUncoming(un_event);
                setPast(past_event);
                setEventList(res);
            })
        })
        data = {
            id: localStorage.userToken
        }
        user_get(data).then(res => {
            setUserInfo(res);
        })
    }, [props]);
    return (
        <div style={{width: props.width, margin: 'auto'}}>
            <ReactNotifications />
            <div className={classes.headerPart} style={{backgroundImage: 'url("'+require('../../assets/img/event/header_background.png')+'")'}}>
                <h1>Events & News</h1>
                <p>Learn, Compete & Grow</p>
            </div>
            <div className={classes.Content}>
                <p className={classes.eventLevel}><strong>Upcoming</strong> Events</p>
                <Grid container spacing={0}>
                    {eventList.map(function(item, i) {
                        return (
                            (new Date(item.start_date).getTime() > new Date(nowDate).getTime()) && (
                            <Grid item xs={12} sm={6} md={6} className="event-grid" key={i}>
                                <Paper elevation={3} className={classes.eventListItem}>
                                    <div className="header">
                                        <div className="cover-color"></div>
                                        <img src={server_url+"event/img_get/"+item.background_img} alt="..."/>
                                        <div className="noti-message">
                                            <div className="circle-ripple"></div>
                                            <p>Registrations <strong>open</strong> till<strong>{dateFormate(item.start_date)} </strong></p>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <p className="title">{item.title}</p>
                                        <div className="event-info">
                                            <p><strong>Starts on</strong> {dateFormate(item.start_date)} </p>
                                            <p style={{marginLeft: '30px'}}><strong>Entry Fee</strong> {item.pay_type} </p>
                                            <p style={{marginLeft: '30px'}}><strong>Venue</strong> {item.venue}</p>
                                        </div>
                                        <div className="vertical-line"></div>
                                        <div className = "description-text">
                                            <p style={{color: 'rgba(28,28,28,.6)'}}>{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="footer">
                                        <div className="user-list">
                                            {/* <div style={{padding: '0px 20px'}}>
                                                <Avatar name={"s"} src="/static/images/avatar/3.jpg" size="30" round={true} style={{marginRight: 5}}/>
                                                <Avatar name={"shen change"} src="/static/images/avatar/3.jpg" size="30" round={true} style={{marginRight: 5}}/>
                                                <Avatar name={"pu"} src="/static/images/avatar/3.jpg" size="30" round={true} style={{marginRight: 5}}/>
                                                <Avatar name={"alex"} src="/static/images/avatar/3.jpg" size="30" round={true} style={{marginRight: 5}}/>
                                                <Avatar name={"test"} src="/static/images/avatar/3.jpg" size="30" round={true} style={{marginRight: 5}}/>
                                            </div>
                                            <p>and <strong>245</strong> others participated</p> */}
                                        </div>
                                        {localStorage.userToken !== undefined && (
                                            <div>
                                                {!item.registered_members.includes(localStorage.userToken) && (
                                                    <img src={require('../../assets/img/event/register_button.png')} alt="..." onClick={() => eventRegister(item._id, item.registered_members)}/>
                                                )}
                                                {item.registered_members.includes(localStorage.userToken) && (
                                                    <div className='register-button'>
                                                        <CheckIcon />
                                                        Registered
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        
                                        
                                    </div>
                                </Paper>
                            </Grid>
                            )
                        )
                    })}
                    {uncoming.length === 0 && (
                        <p>There are not events</p>
                    )}
                </Grid>
                <br /><br /><br /><br /><br />
                <p className={classes.eventLevel}><strong>Past</strong> Events</p>
                <Grid container spacing={0}>
                    
                    {eventList.map(function(item, i) {
                        return (
                            (new Date(item.start_date).getTime() < new Date(nowDate).getTime()) && (
                            <Grid item xs={12} sm={6} md={6} className="event-grid" key={i}>
                                <Paper elevation={3} className={classes.eventListItem}>
                                    <div className="header">
                                        <div className="cover-color"></div>
                                        <img src={server_url+"event/img_get/"+item.background_img} alt="..."/>
                                        
                                    </div>
                                    <div className="content">
                                        <p className="title">{item.title}</p>
                                        <div className="event-info">
                                            <p><strong>Starts on</strong> {dateFormate(item.start_date)} </p>
                                            <p style={{marginLeft: '30px'}}><strong>Entry Fee</strong> {item.pay_type} </p>
                                            <p style={{marginLeft: '30px'}}><strong>Venue</strong> {item.venue}</p>
                                        </div>
                                        <div className="vertical-line"></div>
                                        <div className = "description-text">
                                            <p style={{color: 'rgba(28,28,28,.6)'}}>{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="footer">
                                        <div className="user-list">
                                            {/* <div style={{padding: '0px 20px'}}>
                                                <Avatar name={"s"} src="/static/images/avatar/3.jpg" size="30" round={true} style={{marginRight: 5}}/>
                                                <Avatar name={"shen change"} src="/static/images/avatar/3.jpg" size="30" round={true} style={{marginRight: 5}}/>
                                                <Avatar name={"pu"} src="/static/images/avatar/3.jpg" size="30" round={true} style={{marginRight: 5}}/>
                                                <Avatar name={"alex"} src="/static/images/avatar/3.jpg" size="30" round={true} style={{marginRight: 5}}/>
                                                <Avatar name={"test"} src="/static/images/avatar/3.jpg" size="30" round={true} style={{marginRight: 5}}/>
                                            </div>
                                            <p>and <strong>245</strong> others participated</p> */}
                                        </div>
                                        {localStorage.userToken !== undefined && (
                                            <div>
                                                {item.registered_members.includes(localStorage.userToken) && (
                                                    <div className='register-button'>
                                                        <CheckIcon />
                                                        Registered
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Paper>
                            </Grid>
                            )
                        )
                    })}
                    {past.length === 0 && (
                        <p>There are not events</p>
                    )}
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

export default connect(mapStateToProps)(withRouter(Event));