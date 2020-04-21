import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';


import CloseIcon from '@material-ui/icons/Close';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
// import MaximizeIcon from '@material-ui/icons/Maximize';
import MinimizeIcon from '@material-ui/icons/Minimize';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import ReactNotifications from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { connect } from 'react-redux';
import styles from '../../assets/jss/doubtechatting.js';
const useStyles = makeStyles(styles);

function ChatBox(props) {
    const classes = useStyles();
    const messageListref1 = React.createRef();
    const [msgListRef, setMagListRef] = React.useState(null);
    const [minimize, setMinimize] = React.useState(false);
    
    const MinimizeChange = (value) => {
        setMinimize(!minimize);
    }
    
    React.useEffect(() => {
        if(msgListRef !== null){
            msgListRef.scrollTop = msgListRef.scrollHeight;
        }
        return function cleanup() {
        };
    }, [msgListRef]);
    return (
        <div className={classes.content}>
            <ReactNotifications />
            <div className={classes.Header}>
                <p className="loading-text">Loading...</p>
                <div className="icon-list">
                    <Tooltip title="Go To Content">
                        <OpenInBrowserIcon />
                    </Tooltip>
                    <Tooltip title="Resolve">
                        <CheckBoxIcon/>
                    </Tooltip>
                    <Tooltip title="Minimize">
                        <MinimizeIcon onClick={() => MinimizeChange(true)}/>
                    </Tooltip>
                    <Tooltip title="Close">
                        <CloseIcon/>
                    </Tooltip>
                </div>
            </div>
            {!minimize && (
                <>
                <div className={classes.messageContent}>
                    <PerfectScrollbar containerRef={(con) => {setMagListRef(con)}}>
                        <div  ref={messageListref1}>
                            <div className="doubte-content">
                                <p className="title">{"loading"}</p>
                            </div>
                            <div className="msg-description">
                                TAs are currently helping out others, will respond soon
                            </div>
                            <div className="message-list">
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <CircularProgress color="secondary" />
                                </div>
                            </div>
                        </div>
                        <div style={{height: '45px', width: '100%'}}></div>
                    </PerfectScrollbar>
                </div>
                <div className={classes.Footer}>
                    <div className={classes.messageInput}>
                        
                        <Divider className={classes.divider} orientation="vertical" />
                        <Tooltip title="Max size: 50MG">
                            <IconButton color="primary" className={classes.iconButton} aria-label="directions" size="small">
                                <label htmlFor="file-id">
                                    <AttachFileIcon fontSize="inherit"/>
                                </label>
                                <input type="file" id="file-id" style={{display: 'none'}}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Send Image">
                            <IconButton color="primary" className={classes.iconButton} aria-label="directions" size="small">
                                <label htmlFor="image-id">
                                    <ImageIcon fontSize="inherit"/>
                                    <input type="file" id="image-id" style={{display: 'none'}} accept="image/*"/>
                                </label>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Send Message">
                            <IconButton color="primary" className={classes.iconButton} aria-label="directions" size="small">
                                <SendIcon fontSize="inherit"/>
                            </IconButton>
                        </Tooltip>
                    </div>
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

export default connect(mapStateToProps)(ChatBox);