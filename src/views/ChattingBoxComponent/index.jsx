import React from "react";
import Draggable from 'react-draggable';


import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

import CancelIcon from '@material-ui/icons/Cancel';
import {Motion, spring} from 'react-motion';

import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import styles from '../../assets/jss/chatbox.js';
import '../../assets/css/chattingbox.css';
import {user_get} from '../../Function/User.js';
import {supportchat_add} from '../../Function/SupportChat.js';

const useStyles = makeStyles(styles);

function ChatBox(props) {
    
    const classes = useStyles();
    const [height, setHeight] = React.useState(59);
    const [dragHandleEnter, setDragHandleEnter] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [chatBoxOpen, setChatBoxOpen] = React.useState(false);
    const [translateX, setTranslateX] = React.useState(0);
    const [email, setEmail] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    function handleDrag(e, ui) {
        setTranslateX(ui.lastX);
        if(chatBoxOpen){
            if(height >= 400 && dragHandleEnter){
                setHeight(height-ui.deltaY);
            }
            if(height < 400) {
                setHeight(400)
            }
        }
        
    }
    function dragEnter(value) {
        setDragHandleEnter(value)
    }
    function messageChange(e) {
        setMessage(e.target.value);
    }
    function chatOpenChange(value) {
        if(value){
            setHeight(400)
        }
        else {
            setHeight(59);
            setTranslateX(0);
        }
        setChatBoxOpen(value);
    }
    function ChatOpen() {
        var data = {
            email: email,
            phone: phone,
            username: userName
        }
        supportchat_add(data).then(res => {
            localStorage.support_chat_data = res.message.id;
            localStorage.support_chat_first_msg = message;
            var data = {
                "id": "user_id",
                "value": res.message.user_id
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
            data = {
                "id": "other_user_id",
                "value": res.message.admin_id
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
            data = {
                "id": "room_id",
                "value": res.message.room_id
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
        })
    }
    React.useEffect(() => {
        if(localStorage.userToken !== undefined){
            var data = {
                id: localStorage.userToken
            }
            user_get(data).then(res => {
                setUserName(res.username);
                setPhone(res.phone_number);
                setEmail(res.email);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, []);
    return (
    <Motion defaultStyle={{x: 0, y: 0}} style={{x: spring(height), y: spring(translateX)}}>
            {value => 
        <Draggable
            axis="x"
            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            position={{x: (chatBoxOpen ? translateX : value.y), y: 0}}
            grid={[1, 1]}
            scale={1}
            bounds={{left: -window.innerWidth+350+40, right: 0}}
            onDrag={(t, ui) => handleDrag(t, ui)}
        >
            
                <div className={classes.container} style={{height: value.x}}>
                    <div className={classes.chatBoxHeader+(chatBoxOpen ? " handle" : "")} onMouseEnter={() => dragEnter(true)} onMouseLeave={() => dragEnter(false)} onClick={() => chatOpenChange(true)}>
                        <p>Send Message</p>
                    </div>
                    {chatBoxOpen && (<CancelIcon onClick={() => chatOpenChange(false)} className={classes.chatCloseButton}/>)}
                    {chatBoxOpen && (<>
                        <div className={classes.chatBoxContent}>
                            <div style={{padding: '15px'}}>
                                <InputBase
                                    className="field-input"
                                    placeholder="Your name*"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                    onChange={(e) => setUserName(e.target.value)}
                                    value={userName}
                                    autoFocus
                                />
                                <InputBase
                                    className="field-input"
                                    placeholder="Your phone*"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    autoFocus
                                />
                                <InputBase
                                    className="field-input"
                                    placeholder="Your email*"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    autoFocus
                                />
                                <InputBase
                                    className="field-input-msg"
                                    placeholder="Your message*"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                    onChange={messageChange}
                                    value={message}
                                    autoFocus
                                    multiline
                                    rows={4}
                                />
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    fullWidth
                                    disabled={(
                                        userName !== '' &&
                                        phone !== '' &&
                                        email !== '' &&
                                        message !== ''
                                    ) ? false : true}
                                    onClick={ChatOpen}
                                >
                                    Start Chat
                                </Button>
                            </div>
                        </div>
                        </>
                    )}
                </div>
            
        </Draggable>
        }
            </Motion>
        
    );
    }
    const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(ChatBox);