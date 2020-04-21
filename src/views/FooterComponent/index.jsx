import React from "react";

import Grid from '@material-ui/core/Grid';
//icon
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { ChatkitProvider, TokenProvider } from '../../views/src/index';

import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import ChatBox from '../ChattingBoxComponent';
import ChatBox1 from '../ChattingBoxComponent/ChatOpen.jsx';
import styles from '../../assets/jss/home/homefooter.js';
import {support_chat_get} from '../../Function/SupportChat.js';

const useStyles = makeStyles(styles);
const instanceLocator = 'v1:us1:eb148fcd-27ff-4a77-baf3-a490172b8165';
const tokenProvider = new TokenProvider({
  url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/eb148fcd-27ff-4a77-baf3-a490172b8165/token',
});
function Footer(props) {
    
    const classes = useStyles();
    
    React.useEffect(() => {
        if(localStorage.support_chat_data !== undefined){
            var data = {
                flg: 'one',
                id: localStorage.support_chat_data
            }
            support_chat_get(data).then(res => {
                if(props.posts.length === 0 && res !== null){
                    data = {
                        "id": "user_id",
                        "value": res.user_id
                    }
                    props.dispatch({
                        type: 'ADD_POST',
                        data
                    });
                    data = {
                        "id": "other_user_id",
                        "value": res.admin_id
                    }
                    props.dispatch({
                        type: 'ADD_POST',
                        data
                    });
                    data = {
                        "id": "room_id",
                        "value": res.room_id
                    }
                    props.dispatch({
                        type: 'ADD_POST',
                        data
                    });
                    data = {
                        "id": "new_chat",
                        "value": false
                    }
                    props.dispatch({
                        type: 'ADD_POST',
                        data
                    });
                }
            })
        }
        else {
            if(props.posts.length === 0){
                data = {
                    "id": "user_id",
                    "value": ""
                }
                props.dispatch({
                    type: 'ADD_POST',
                    data
                });
                data = {
                    "id": "other_user_id",
                    "value": ""
                }
                props.dispatch({
                    type: 'ADD_POST',
                    data
                });
                data = {
                    "id": "room_id",
                    "value": ""
                }
                props.dispatch({
                    type: 'ADD_POST',
                    data
                });
                data = {
                    "id": "new_chat",
                    "value": true
                }
                props.dispatch({
                    type: 'ADD_POST',
                    data
                });
            }
        }
        
    }, [props]);
    return (
        <div className={classes.container}>
            <Grid container spacing={3} className={classes.Content1}>
                <Grid item xs={12} sm={6} md={4}>
                    <div className={classes.footerLogo}>
                        <img  src={require('../../assets/img/logo.png')} alt="logo"/>
                    </div>
                    
                </Grid>
                <Grid item xs={12} sm={6} md={4} className={classes.contactInfo}>
                    <h3 style={{color: 'white'}}>Reach Us</h3>
                    <div className={classes.socialIconList}>
                        <FacebookIcon />
                        <InstagramIcon />
                        <YouTubeIcon />
                        <TwitterIcon />
                        <LinkedInIcon />
                    </div>
                    <div>
                        <p>1800-123-3598</p>
                        <p>contact@codingninjas.in</p>
                    </div>
                    <br />
                    <p>
                        Plot Number 360, Kohat Enclave,<br />
                        Main Pitam Pura Road, Delhi 110034<br />
                        Opposite Kohat Metro Station exit 3
                    </p>
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                    <Map
                        google={props.google}
                        zoom={8}
                        style={{width: '100%', height: '100%', position: 'relative!important'}}
                        initialCenter={{ lat: 47.444, lng: -122.176}}
                        className={classes.mapStyle}
                    >
                        <Marker position={{ lat: 47.444, lng: -122.176}} />
                    </Map>
                </Grid>
            </Grid>
            {props.posts.length > 2 && (
                (props.posts[0].value !== '' && props.posts[1].value !== '' && props.posts[2].value !== '') ? (
                    <ChatkitProvider
                        instanceLocator={instanceLocator}
                        tokenProvider={tokenProvider}
                        userId={props.posts[0].value}
                    >
                        <ChatBox1 roomId={props.posts[2].value} roomName="Support Chat" otherUserId={props.posts[1].value}/>
                    </ChatkitProvider>
                ) : (
                    <ChatBox />
                )
            )}
        </div>
    );
    }
    const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(GoogleApiWrapper({
    apiKey: 'AIzaSyDbKRyp-LIrguvpb-ysO3q94gVxWjuBPko'
  })(Footer));