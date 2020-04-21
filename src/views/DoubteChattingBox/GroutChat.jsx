import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Rating from '@material-ui/lab/Rating';


import CloseIcon from '@material-ui/icons/Close';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
// import MaximizeIcon from '@material-ui/icons/Maximize';
import MinimizeIcon from '@material-ui/icons/Minimize';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';
import CheckIcon from '@material-ui/icons/Check';

import Avatar from 'react-avatar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { withChatkitOneToOne } from '@pusher/chatkit-client-react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { connect } from 'react-redux';
import styles from '../../assets/jss/doubtechatting.js';
import {doubte_update} from '../../Function/DoubtChat.js';
const useStyles = makeStyles(styles);
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
function ChatBox(props) {
    const classes = useStyles();
    const [pendingMessage, setPendingMessage] = React.useState('');
    const messageListref1 = React.createRef();
    const [msgListRef, setMagListRef] = React.useState(null);
    const [updateFlg, setUpdateFlg] = React.useState(false);
    const [minimize, setMinimize] = React.useState(false);
    const [itemID, setItemID] = React.useState(props.posts[0].value);
    const [solveFlg, setSolveFlg] = React.useState(false);
    const [solveFlg1, setSolveFlg1] = React.useState(false);
    const [rateFlg, setRateFlg] = React.useState('');
    
    const handleMessageKeyDown = event => {
        if (event.key === 'Enter') {
        handleSendMessage();
        }
        props.chatkit.sendTypingEvent();
    };

    const handleMessageChange = event => {
        setPendingMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (pendingMessage === '') {
        return;
        }
        // TODO: Send message to Chatkit
        props.chatkit.sendSimpleMessage({ text: pendingMessage });
        props.chatkit.setReadCursor();
        setPendingMessage('');
    };
    const MinimizeChange = (value) => {
        setMinimize(!minimize);
    }
    const ChatBoxClose = (id) => {
        var doubte_list = props.posts[23].value;
        doubte_list = doubte_list.filter(function( obj ) {
            return obj.id !== id;
        });
        var data = {
            "id": "doubte_list",
            "value": doubte_list
        };
        props.dispatch({
            type: 'UPDATE',
            data
        });
    }
    const DoubteSolve = () => {
        setSolveFlg(!solveFlg)
    }
    const DoubteSolveChange = () => {
        var data = {
            id: props.doubteData.id,
            data: {
                rate_flg: 'pending'
            }
        }
        doubte_update(data).then(res => {
            setRateFlg('pending');
        });
    }
    const RatingSend = (n) => {
        var data = {
            id: props.doubteData.id,
            data: {
                rate_flg: 'send',
                solve_flg: true,
                doubte_rate: n
            }
        }
        doubte_update(data).then(res => {
            store.addNotification({
                content: <MyNotification title="You have just solved this doubte"/>,
                container: 'top-right',
                animationIn: ["animated", "bounceIn"],
                animationOut: ["animated", "bounceOut"],
                dismiss: {
                  duration: 3000
                },
                width: 300
            })
            setRateFlg('send');
            setSolveFlg1(true)
        });
    }
    const ItemOpen = (itemtype, itemid, itemtitle) => {

        if(itemID !== itemid){
            props.posts[18].value = false;
            var data = {
                "id": "lecture_id",
                "value": itemid
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
            data = {
                "id": "lecture_type",
                "value": itemtype
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
            data = {
                "id": "lecture_title",
                "value": itemtitle
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
            data = {
                "id": "your_code_content",
                "value": ""
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
            data = {
                "id": "main_code_content",
                "value": ""
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
    
            data = {
                "id": "code_file",
                "value": "your"
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
            data = {
                "id": "main_com_load",
                "value": true
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
            data = {
              "id": "page_load",
              "value": false
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
            data = {
              "id": "puzzle_answer",
              "value": []
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
        }
        setItemID(itemid);
    }
    function handleImageChange (e, id) {
        props.chatkit.sendMultipartMessage({
            parts: [
                {
                  file: e.target.files[0],
                  customData: { metadata: 42 },
                }
            ]
        })
    };
    React.useEffect(() => {
        if(msgListRef !== null){
            msgListRef.scrollTop = msgListRef.scrollHeight;
        }
        if(props.chatkit.currentUser !== null && props.doubteData.room_id === ''){
            var room_id = '';
            props.chatkit.currentUser.rooms.some(function (r) {
                room_id = r.id;
                return room_id
            });
            var data = {
                id: props.doubteData.id,
                data: {
                    room_id: room_id
                }
            }
            doubte_update(data).then(res => {
            });
            setUpdateFlg(true);
        }
        setSolveFlg1(props.doubteData.solve);
        setRateFlg(props.doubteData.rate_flg);
        return function cleanup() {
        };
    }, [updateFlg, msgListRef, props]);
    var change_flg = '';
        var list = [];
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
            url: ""
        }
        if(m.parts[0].partType === 'attachment') {
            list[i].textContent = m.parts[0].payload.name;
            list[i].url = m.parts[0].payload._downloadURL
        }
        if(props.chatkit.messages.length === i+1){
            list[i].change_flg = true
        }
        change_flg = m.sender.id;
        return list;
    })
    return (
        <div className={classes.content}>
            <ReactNotifications />
            <div className={classes.Header}>
                {!props.doubteData.join_flg ? (
                    <p onClick={() => MinimizeChange(false)} className="header-title">{props.doubteData.title}</p>
                ) : (
                    props.chatkit.isLoading ? (
                        <p className="loading-text">Loading...</p>
                    ) : (
                        <div className="header-title other-status">
                            <div className={"online-status "+(props.chatkit.otherUser.presence ? 'online' : 'offline')}></div>
                            <p>{props.chatkit.otherUser.name}</p>
                        </div>
                    )
                )}
                
                <div className="icon-list">
                    <Tooltip title="Go To Content">
                        <OpenInBrowserIcon onClick={() => ItemOpen(props.doubteData.type, props.doubteData.lectureitem_id, props.doubteData.lectureitem_name)}/>
                    </Tooltip>
                    {rateFlg === '' && !solveFlg1 && (
                        <Tooltip title="Resolve">
                            <CheckBoxIcon onClick={DoubteSolve}/>
                        </Tooltip>
                    )}
                    <Tooltip title="Minimize">
                        <MinimizeIcon onClick={() => MinimizeChange(true)}/>
                    </Tooltip>
                    <Tooltip title="Close">
                        <CloseIcon onClick={() => ChatBoxClose(props.doubteData.id)}/>
                    </Tooltip>
                </div>
            </div>
            {!minimize && (
                <>
                <div className={classes.messageContent}>
                    <PerfectScrollbar containerRef={(con) => {setMagListRef(con)}}>
                        <div  ref={messageListref1}>
                            <div className="doubte-content">
                                <p className="title">{props.doubteData.title}</p>
                                <p className="description">{props.doubteData.description}</p>
                            </div>
                            <div className="msg-description">
                                TAs are currently helping out others, will respond soon
                            </div>
                            <div className="message-list">
                                {! props.chatkit.isLoading && (
                                    list.map(function(m, i) {
                                        return(
                                            m.textContent !== 'joined' ?
                                            (<div className="message-item" key={i}>
                                                <div className={"message " + (m.isOwnMessage ? "my-message" : "other-message")}>
                                                    {m.change_flg ? (
                                                        <Avatar name={m.isOwnMessage ? props.chatkit.currentUser.name : props.chatkit.otherUser.name} src={m.isOwnMessage ? props.chatkit.currentUser.avatarURL : props.chatkit.otherUser.avatarURL} size="30" round={true} className="avatar"/>
                                                    ) : (
                                                        <div style={{width: '30px', height: '30px'}}  className="avatar"></div>
                                                    )}
                                                    <div className="message-text">
                                                        {(m.messageType === 'attachment' && m.fileType === 'image/png') && (
                                                            <a href={m.url} target="_blank" rel="noopener noreferrer">
                                                                <img src={m.url} alt="img"/>{m.textContent}
                                                            </a>
                                                        )}
                                                        {(m.messageType === 'attachment' && m.fileType !== 'image/png') && (
                                                            <a href={m.url} target="_blank" rel="noopener noreferrer">
                                                                <AttachFileIcon fontSize="inherit"/>{m.textContent}
                                                            </a>
                                                        )}
                                                        {m.messageType !== 'attachment' && (
                                                            m.textContent
                                                        )}
                                                    </div>
                                                </div>
                                            </div>)
                                            :
                                            (
                                                <div className="msg-description" key={i}>
                                                    {props.chatkit.otherUser.name} has joined
                                                </div>
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
                        <div style={{height: '45px', width: '100%'}}></div>
                    </PerfectScrollbar>
                </div>
                <div className={classes.Footer}>
                    {(!solveFlg && rateFlg === '' && !solveFlg1) && (
                        <div className={classes.messageInput}>
                            <InputBase
                                className={classes.input}
                                placeholder="Type here..."
                                inputProps={{ 'aria-label': 'search google maps' }}
                                autoFocus
                                multiline
                                rowsMax={3}
                                value={pendingMessage}
                                onChange={handleMessageChange}
                                onKeyDown={handleMessageKeyDown}
                            />
                            <Divider className={classes.divider} orientation="vertical" />
                            <Tooltip title="Max size: 50MG">
                                <IconButton color="primary" className={classes.iconButton} aria-label="directions" size="small">
                                    <label htmlFor="file-id">
                                        <AttachFileIcon fontSize="inherit"/>
                                    </label>
                                    <input type="file" id="file-id" style={{display: 'none'}} onChange={(e) => handleImageChange(e, props.doubteData.id)}/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Send Image">
                                <IconButton color="primary" className={classes.iconButton} aria-label="directions" size="small">
                                    <label htmlFor="image-id">
                                        <ImageIcon fontSize="inherit"/>
                                        <input type="file" id="image-id" style={{display: 'none'}} accept="image/*" onChange={(e) => handleImageChange(e, props.doubteData.id)}/>
                                    </label>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Send Message">
                                <IconButton color="primary" className={classes.iconButton} aria-label="directions" size="small" onClick={handleSendMessage}>
                                    <SendIcon fontSize="inherit"/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    )}
                    {(solveFlg) && (
                        <div className="sovle-part">
                            <p>Are you sure you want to resolve this doubt?</p>
                            <div className="buttons-part">
                                <Button variant="contained" onClick={DoubteSolveChange}>Yes</Button>
                                <Button variant="contained">No</Button>
                            </div>
                        </div>
                    )}
                    {rateFlg === 'pending' && (
                        <div className="sovle-part">
                            <p>Rate your doubt experience</p>
                            <div className="buttons-part">
                                <Rating name="size-medium" defaultValue={2} onChange={(e, n) => {RatingSend(n)}}/>
                            </div>
                        </div>
                    )}
                    {solveFlg1 && (
                        <div className="solve-text">
                            This doubt has been resolved!
                        </div>
                    )}
                </div>
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

export default connect(mapStateToProps)(withChatkitOneToOne(ChatBox));