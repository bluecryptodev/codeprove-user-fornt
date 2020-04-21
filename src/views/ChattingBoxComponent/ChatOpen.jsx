import React from "react";
import Draggable from 'react-draggable';


import InputBase from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import MoodIcon from '@material-ui/icons/Mood';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Grid from '@material-ui/core/Grid';
import CancelIcon from '@material-ui/icons/Cancel';
import { withChatkitOneToOne } from '../../views/src/index';
import { zoomIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import {Motion, spring} from 'react-motion';
import Avatar from 'react-avatar';

import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import styles from '../../assets/jss/chatbox.js';
import '../../assets/css/chattingbox.css';
import {message_delete, chat_file_upload} from "../../Function/SupportChat.js";
import {server_url} from '../../server_host.js';
const useStyles = makeStyles(styles);
const iconlist = [
    {
        description: '1',
        icon: '😇'
    },
    {
        description: '2',
        icon: '🦄'
    },
    {
        description: '3',
        icon: '😕'
    },
    {
        description: '4',
        icon: '😡'
    },
    {
        description: '5',
        icon: '😈'
    },
    {
        description: '6',
        icon: '😞'
    },
    {
        description: '7',
        icon: '😘'
    },
    {
        description: '8',
        icon: '😋'
    },
    {
        description: '9',
        icon: '😥'
    },
    {
        description: '10',
        icon: '😩'
    },
    {
        description: '11',
        icon: '😁'
    },
    {
        description: '12',
        icon: '😆'
    },
    {
        description: '13',
        icon: '😉'
    },
    {
        description: '14',
        icon: '😎'
    },
    {
        description: '15',
        icon: '😐'
    },
    {
        description: '16',
        icon: '😜'
    },
    {
        description: '17',
        icon: '😮'
    },
    {
        description: '18',
        icon: '👍'
    },
    {
        description: '19',
        icon: '👎'
    }
];
const animationStyles = {
    zoomIn: {
        animation: 'x .3s',
        animationName: Radium.keyframes(zoomIn, 'zoomIn')
    },
}
function ChatBox(props) {
    
    const classes = useStyles();
    const messageList = React.createRef();
    const [height, setHeight] = React.useState(59);
    const [dragHandleEnter, setDragHandleEnter] = React.useState(false);
    const [iconGroup, setconGroup] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [chatBoxOpen, setChatBoxOpen] = React.useState(false);
    const [translateX, setTranslateX] = React.useState(0);
    const [chatReload, setChatReload] = React.useState(false);
    const [messagLength, setMessageLength] = React.useState(0);
    const [load, setLoad] = React.useState(false);
    const [imageFile, setImageFile] = React.useState(null);
    const [processPercent, setProcessPercent] = React.useState(0);
    const [audio] = React.useState(new Audio(`${server_url}audio_file_get/knob.mp3`));
    const [audio1] = React.useState(new Audio(`${server_url}audio_file_get/definite.mp3`));
    const [msgLoad, setMsgLoad] = React.useState(false);

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
    function iconGroupOpen(value) {
        setconGroup(value);
    };
    function messageChange(e) {
        setMessage(e.target.value);
    }
    function messageIconChange(value) {
        setMessage(message+" "+value);
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
    function ProcessBar(event){
        setProcessPercent(event.loaded/event.total*100)
    }
    function onSubmit(e){
        e.preventDefault();
        if(message !== ""){
            // props.chatkit.sendSimpleMessage({ text: message });
            // props.chatkit.setReadCursor();
            if(imageFile !== null) {
                const data = new FormData()
                data.append('file', imageFile);
                var data1 = {
                    file: data,
                    onProcessFuc: ProcessBar
                }
                chat_file_upload(data1).then(res => {
                    props.chatkit.sendMultipartMessage({
                        parts: [
                          {
                            type: imageFile.type,
                            content: JSON.stringify({file_name: imageFile.name, upload_file_name: res.filename})
                          }
                        ]
                    });
                    props.chatkit.setReadCursor();
                    props.chatkit.sendSimpleMessage({ text: message });
                    props.chatkit.setReadCursor();
                    setImageFile(null);
                })
            }
            else {
                props.chatkit.sendSimpleMessage({ text: message });
                props.chatkit.setReadCursor();
            }
        }
        else {
            if(imageFile !== null) {
                const data = new FormData()
                data.append('file', imageFile);
                data1 = {
                    file: data,
                    onProcessFuc: ProcessBar
                }
                chat_file_upload(data1).then(res => {
                    props.chatkit.sendMultipartMessage({
                        parts: [
                          {
                            type: imageFile.type,
                            content: JSON.stringify({file_name: imageFile.name, upload_file_name: res.filename})
                          }
                        ]
                    });
                    props.chatkit.setReadCursor();
                    setImageFile(null);
                })
            }
        }
        setMessage("");
    }
    function fileChange(e){
        setImageFile(e.target.files[0])
    }
    React.useEffect(() => {
        if(messageList.current !== null){
            if(messageList.current.scrollTop !== messageList.current.scrollHeight){
                messageList.current.scrollTop = messageList.current.scrollHeight;
            }
        }
            
        if(!props.chatkit.isLoading) {
            if(messagLength < props.chatkit.messages.length && load){
                if(props.chatkit.messages[props.chatkit.messages.length-1].senderId.includes("_user")){
                    audio1.play();
                }
                else {
                    audio.play();
                }
            }
            setMessageLength(props.chatkit.messages.length);
            setLoad(true);
        }
        
        if(props.chatkit.messages.length > 0 && !chatReload) {
            if(props.chatkit.messages[props.chatkit.messages.length-1].parts[0].payload.content.includes('{"id":')){
                var other_id = JSON.parse(props.chatkit.messages[props.chatkit.messages.length-1].parts[0].payload.content).id;
                var data = {
                    "id": "other_user_id",
                    "value": ""
                };
                props.dispatch({
                    type: 'UPDATE',
                    data
                });
                data = {
                    roomId: props.chatkit.messages[props.chatkit.messages.length-1].roomId,
                    messageId: props.chatkit.messages[props.chatkit.messages.length-1].id
                }
                message_delete(data).then(res => {
                    data = {
                        "id": "other_user_id",
                        "value": other_id
                    };
                    props.dispatch({
                        type: 'UPDATE',
                        data
                    });
                })
                setChatReload(true);
            }
        }
        if(!props.chatkit.isLoading && props.posts[3].value && props.chatkit.messages.length === 0 && !msgLoad){
            setMsgLoad(true);
            props.chatkit.sendSimpleMessage({ text: localStorage.support_chat_first_msg });
            props.chatkit.setReadCursor();
            data = {
                "id": "new_chat",
                "value": false
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
        }
        
    }, [props, chatReload, messagLength, load, audio, audio1, msgLoad, messageList]);
    var list = [];
    var change_flg = '';
    props.chatkit.messages.map(function(m, i) {
        if(change_flg !== ''){
            if(change_flg !== m.sender.id){
                list[i-1].change_flg = true;
            }
        }
        list[i] = {
            id: m.id,
            isOwnMessage: m.sender.id === props.chatkit.currentUser.id,
            change_flg: false,
            createdAt: m.createdAt,
            // This will only work with simple messages.
            // To learn more about displaying multi-part messages see
            // https://pusher.com/docs/chatkit/reference/javascript#messages
            messageType: m.parts[0].partType,
            fileType: m.parts[0].payload.type,
            textContent: m.parts[0].payload.content,
            view_type: true,
            url: ""
        }
        if(m.parts[0].payload.type === 'application/json'){
            list[i].view_type = JSON.parse(m.parts[0].payload.content).view;
            list[i].textContent = JSON.parse(m.parts[0].payload.content).value;
        }
        if(m.parts[0].payload.type.includes('image/')) {
            list[i].textContent = JSON.parse(m.parts[0].payload.content).file_name;
            list[i].url = server_url+"supportchat/img_get/"+JSON.parse(m.parts[0].payload.content).upload_file_name;
        }
        if(props.chatkit.messages.length === i+1){
            list[i].change_flg = true;
        }
        change_flg = m.sender.id;
        return list;
    })
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
                            <div ref={messageList}>
                                {!props.chatkit.isLoading && (
                                    list.map(function(item, i){
                                        return(
                                            item.textContent !== 'joined' ? (
                                                <div key={i}>
                                                    {!item.isOwnMessage && (
                                                        <div className={classes.messageItem} style={{display: 'flex'}} >
                                                            <Avatar name={props.chatkit.otherUser.name} src={props.chatkit.otherUser.avatarURL} size="40" round={true} className="avatar" style={{marginRight: '10px'}}/>
                                                            <StyleRoot style={{width: '70%'}}>
                                                                <p className={classes.otherMsg} style={animationStyles.zoomIn}>
                                                                    {item.url !== "" && (
                                                                        <img src={item.url} alt="support_chat"/>
                                                                    )}
                                                                    {item.textContent}
                                                                </p>
                                                            </StyleRoot>
                                                        </div>
                                                    )}
                                                    {item.isOwnMessage && (
                                                        <div className={classes.messageItem}>
                                                            <StyleRoot>
                                                                <p className={classes.meMsg} style={animationStyles.zoomIn}>
                                                                    {item.url !== "" && (
                                                                        <img src={item.url} alt="support_chat"/>
                                                                    )}
                                                                    {item.textContent}
                                                                </p>
                                                            </StyleRoot>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <p  key={i}>{props.chatkit.otherUser.name} has joined to this chat</p>
                                            )
                                            
                                        )
                                    })
                                )}
                                {props.chatkit.isLoading && (
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                        <CircularProgress color="secondary" />
                                    </div>
                                )}
                                
                            </div>
                        </div>
                        {imageFile !== null && (
                            <div style={{padding: '5px', background: '#248af3'}}>
                                <p style={{margin: 0, color: 'white'}}>{imageFile.name}</p>
                                <LinearProgress value={processPercent} variant="determinate"/>
                            </div>
                        )}
                        <div className={classes.chatBoxFooter}>
                            <form onSubmit={onSubmit}>
                            <div className={classes.messageInput}>
                                
                                <InputBase
                                    className={classes.input}
                                    placeholder="Enter your message"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                    onChange={messageChange}
                                    value={message}
                                    autoFocus
                                />
                                
                                <Divider className={classes.divider} orientation="vertical" />
                                <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={onSubmit}>
                                    <ArrowUpwardIcon />
                                </IconButton>
                            </div>
                            </form>
                            <div className={classes.fileIcon}>
                                <input type="file" id="fif" onChange={fileChange} accept="image/jpeg, image/png" style={{display: 'none'}}/>
                                <label htmlFor='fif' style={{float: 'left'}}>
                                    {/* <div className={classes.fileErrorMsg}>you can send only image</div> */}
                                    <AttachFileIcon  className={classes.iconButton}/>
                                </label>
                                <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={() => iconGroupOpen(!iconGroup)}>
                                    <MoodIcon />
                                </IconButton>
                                {iconGroup && (
                                    <div className={classes.iconGroup}>
                                        <Grid container spacing={1} className={classes.Content1}>
                                            {iconlist.map(function(item, i){
                                                return(
                                                    <Grid item xs={12} sm={6} md={2} key={i} className={classes.iconItem}>
                                                        <span role="img" aria-label={item.description} onClick={() => {iconGroupOpen(false); messageIconChange(item.icon)}}>{item.icon}</span>
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                        <div className={classes.iconAllow}></div>
                                    </div>
                                )}
                                
                            </div>
                        </div></>
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

export default connect(mapStateToProps)(withChatkitOneToOne(ChatBox));