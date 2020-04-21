import React from "react";



// import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

//icon
import LockIcon from '@material-ui/icons/Lock';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import CheckIcon from '@material-ui/icons/Check';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloseIcon from '@material-ui/icons/Close';

import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from 'react-avatar';

import { connect } from 'react-redux';
import {user_get} from '../../../Function/User.js';
import {comment_add, file_upload, comment_get, comment_update, comment_delete} from '../../../Function/CourseComment.js';
import {server_url} from '../../../server_host.js';

import styles from '../../../assets/jss/classroom/content.js';

function MyNotification(props) {
    return (
      <div style={{
        display: 'flex',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: '15px',
        width: '100%'
      }}>
        <div style={{padding: '5px 10px 10px 5px', width: '20px', height: '20px', borderRadius: '20px', background: 'linear-gradient(-32deg, rgb(28, 65, 247) 0px, rgb(97, 250, 250) 100%)'}}>
          <CheckIcon style={{color: 'white'}}/>
        </div>
        <div style={{marginTop: 10, marginLeft: 10}}>
          <h5 style={{margin: 0}}>{props.title}</h5>
        </div>
      </div>
    )
}
const useStyles = makeStyles(styles);
function CourseOverView(props) {
    const classes = useStyles();
    const [preiviewImg, setPreivewImg] = React.useState(null);
    const [fileType, setFileType] = React.useState(null);
    const [fileName, setFileName] = React.useState('');
    const [imageFile, setImageFile] = React.useState(null);
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [commentList, setCommentList] = React.useState([]);
    const [meComment, setMeComment] = React.useState([]);
    const [batchMembers, setBatchMembers] = React.useState([]);
    const [load, setLoad] = React.useState(false);
    const [batchGetFlg, setBatchGetFlg] = React.useState(false);
    const [commentView, setCommentView] = React.useState(false);
    const [likeUserList, setLikeUserList] = React.useState([]);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [userCount, setUserCount] = React.useState(0);

    function ModalChangeClose() {
        setModalOpen(false);
        setLikeUserList([])
    }
    function handleImage(e) {
        e.preventDefault();
        let reader = new FileReader();
        let newFile = e.target.files[0];
        setFileType(e.target.files[0].type);
        setFileName(e.target.files[0].name)
        reader.onloadend = () => {
            setImageFile(newFile);
            setPreivewImg(reader.result);
        };
        reader.readAsDataURL(newFile);
    }
    function commentChange(event) {
        if(event.target.name === "title"){
            setTitle(event.target.value);
        }
        else {
            setContent(event.target.value);
        }
        
    }
    function RemoveComment(id) {
        var comment_list = commentList;
        var data = {
            id: id
        }
        comment_delete(data).then(res => {
            comment_list.splice(comment_list.findIndex(e => e._id === id),1);
            setCommentList(comment_list);
            setLoad(!load);
        })
    }
    function CommentFieldOpen() {
        setCommentView(!commentView)
    }
    function meCommentChange(e, i) {
        var com_me = meComment;
        com_me[i] = e.target.value;
        setMeComment(com_me);
        setLoad(!load);
    }
    function dateFormate() {
        var date = new Date();
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
    function commentAdd() {
        const data = new FormData();
        data.append('file', imageFile);
        var imgData = {
            imgData: data
        };
        file_upload(imgData).then(res => {
            var comment = {
                course_id: props.courselist._id,
                user_id: localStorage.userToken,
                title: title,
                content: content,
                image: fileName,
                upload_file: res.filename,
                file_type: fileType,
                post_date: dateFormate(),
                comment_like: [],
                added_comment: []
            }
            comment_add(comment).then(res => {
                store.addNotification({
                    content: <MyNotification title="Result Arrived!"/>,
                    container: 'top-right',
                    animationIn: ["animated", "bounceIn"],
                    animationOut: ["animated", "bounceOut"],
                    dismiss: {
                      duration: 3000
                    },
                    width: 300
                })
                comment.user_img = props.userdata.image;
                comment.user_name = props.userdata.username;
                comment.preview_img = preiviewImg;
                comment._id = res.message._id;
                var comment_list = commentList.reverse();
                comment_list.push(comment);
                comment_list.reverse();
                setCommentList(comment_list );
                setLoad(!load);
                setPreivewImg(null);
                setFileType(null);
                setFileName('');
                setImageFile(null);
                setTitle("");
                setContent("");
                setCommentView(false);
            })
        })
        .catch(err => {
            console.log(err);
        })
        
    }
    function commentInsert(e, i) {
        e.preventDefault();
        setMeComment([])
        if(meComment[i] !== ""){
            var comment_list = commentList;
            var comment = {
                user_id: localStorage.userToken,
                content: meComment[i],
                comment_like: [],
                post_date: dateFormate(),
            }
            comment_list[i].added_comment.push(comment);
            var data = {
                id: comment_list[i]._id,
                data: {
                    added_comment: comment_list[i].added_comment
                }
            }
            comment_update(data).then(res => {
                store.addNotification({
                    content: <MyNotification title="Result Arrived!"/>,
                    container: 'top-right',
                    animationIn: ["animated", "bounceIn"],
                    animationOut: ["animated", "bounceOut"],
                    dismiss: {
                    duration: 3000000
                    },
                    width: 300
                })
                comment_list[i].added_comment[comment_list[i].added_comment.length-1].user_name = props.userdata.username;
                comment_list[i].added_comment[comment_list[i].added_comment.length-1].image = props.userdata.image;
                setCommentList(comment_list)
                setLoad(!load);
            });
        }
    }
    function CommentLike(e, i) {
        var comment_list = commentList;
        e.preventDefault();
        if(!comment_list[i].comment_like.includes(props.userdata._id)){
            comment_list[i].comment_like.push(props.userdata._id)
            var data = {
                id: comment_list[i]._id,
                data: {
                    comment_like: comment_list[i].comment_like
                }
            }
            comment_update(data).then(res => {
                store.addNotification({
                    content: <MyNotification title="Result Arrived!"/>,
                    container: 'top-right',
                    animationIn: ["animated", "bounceIn"],
                    animationOut: ["animated", "bounceOut"],
                    dismiss: {
                    duration: 3000000
                    },
                    width: 300
                })
                setCommentList(comment_list)
                setLoad(!load);
            });
        }
    }
    function AddCommentLike(e, i, j) {
        var comment_list = commentList;
        e.preventDefault();
        if(!comment_list[i].added_comment[j].comment_like.includes(props.userdata._id)){
            comment_list[i].added_comment[j].comment_like.push(props.userdata._id)
            var data = {
                id: comment_list[i]._id,
                data: {
                    added_comment: comment_list[i].added_comment
                }
            }
            comment_update(data).then(res => {
                store.addNotification({
                    content: <MyNotification title="Result Arrived!"/>,
                    container: 'top-right',
                    animationIn: ["animated", "bounceIn"],
                    animationOut: ["animated", "bounceOut"],
                    dismiss: {
                    duration: 3000000
                    },
                    width: 300
                })
                setCommentList(comment_list)
                setLoad(!load);
            });
        }
    }
    function LikeUserList(e, userid_list) {
        setModalOpen(true);
        var user_list = [];
        setUserCount(userid_list.length)
        for(var i = 0; i < userid_list.length; i++) {
            var data = {
                id: userid_list[i]
            }
            user_get(data).then(res => {
                user_list.push(res);
                if(userid_list.length === user_list.length){
                    setLikeUserList(user_list);
                }
                
            })
        }

    }
    React.useEffect(() => {
        
        var data = {
            id: props.courselist._id
        }
        comment_get(data).then(res => {
            var index = 0;
            var total_length = res.length;
            for (var k = 0; k < res.length; k++){
                total_length+=res[k].added_comment.length+res[k].comment_like.length;
            }
            var comment = res;
            comment.map(function(item, i){
                var data = {
                    id: item.user_id
                }
                user_get(data).then(res => {
                    item.user_img = res.image;
                    item.user_name = res.username;
                    setCommentList(comment);
                    index++;
                    if(total_length === index){
                        setLoad(true);
                    }
                })
                item.added_comment.map(function(item1, j) { 
                    data = {
                        id: item1.user_id
                    }
                    user_get(data).then(res => {

                        item1.user_img = res.image;
                        item1.user_name = res.username;
                        setCommentList(comment);
                        index++;
                        if(total_length === index){
                            setTimeout(function(){
                                setLoad(true);
                            },1000)
                            
                            console.log('12312312312312312312312312312312________________')
                        }
                    });
                    return 0;
                })
                item.comment_like.map(function(item1, j) { 
                    data = {
                        id: item1
                    }
                    user_get(data).then(res => {
                        
                        index++;
                        if(total_length === index){
                            setTimeout(function(){
                                setLoad(true);
                            },1000)
                        }
                    });

                    return 0;
                })
                return 0;
            });
        })
        var batch_member_list = [];
        
        if(!batchGetFlg){
            var members = [];
            for(var i = 0 ; i < props.courselist.batch_members.length; i++){
                for(var j = 0; j < props.courselist.batch_members[i].members.length; j++){
                    members.push(props.courselist.batch_members[i].members[j]);
                }
            }
            for(i = 0; i < members.length; i++){
                data = {
                    id: members[i]
                }
                user_get(data).then(res => {
                    var batch_obj = {
                        user_id: res._id,
                        user_img: res.image,
                        user_name: res.username,
                        score: 0
                    };
                    for (var h = 0; h < res.lecture_list.length; h++){
                        batch_obj.score += res.lecture_list[h].score;
                    }
                    var flg = false;
                    for(var l = 0; l < batch_member_list.length; l++){
                        if(batch_member_list[l].user_id === res._id){
                            flg = true;
                            break;
                        }
                    }
                    if(!flg){
                        batch_member_list.push(batch_obj);
                    }
                    batch_member_list.sort(function(a, b) {
                        return a.score - b.score;
                    }).reverse();
                    setBatchMembers(batch_member_list);
                    if(batch_member_list.length === props.courselist.batch_members.length){
                        setBatchGetFlg(true);
                    }
                    
                });
            }
            
        }
        
    }, [props, batchGetFlg]);
    return (
        <div className={classes.container}>
            <Dialog onClose={ModalChangeClose} aria-labelledby="simple-dialog-title" open={modalOpen}>
                <DialogTitle id="simple-dialog-title">Reactions</DialogTitle>
                {likeUserList.length === userCount && (
                    <List>
                        {likeUserList.map(item => (
                            <ListItem button key={item._id}>
                                <ListItemAvatar>
                                    <Avatar name={item.username} src={item.image} size="50" round={true} className="avatar"/>
                                </ListItemAvatar>
                                <ListItemText primary={item.username} />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Dialog>
            {props.courselist.pay_status === 'free' && (
                <div className={classes.courseOverFlowContent}>
                    <Grid container spacing={3} className={classes.Content1}>
                        <Grid item xs={12} sm={6} md={8}>
                            <div className={classes.courseCommentLock}>
                                <LockIcon />
                                <h1 style={{textAlign: 'center'}}>Batch Wall will be unlocked once you register for the course.</h1>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.lockscreen}>
                                <h3>Leaderboard</h3>
                                <img src={require('../../../assets/img/lock_screen1.png')} alt="..."/>
                                <p>Leaderboard will be unlocked once you register for the course</p>
                            </div>
                            
                        </Grid>
                    </Grid>
                </div>
            )}
            {props.courselist.pay_status === 'pay' && (
                <div className={classes.courseOverFlowContent}>
                    <ReactNotifications />
                    <Grid container spacing={3} className={classes.Content1}>
                        <Grid item xs={12} sm={6} md={8}>
                            <Paper elevation={3} style={{marginBottom: '20px'}}>
                                <div className={classes.commentList}>
                                    <div className={classes.commentHeader}>
                                        <div className={classes.userInfoPart}>
                                            {props.userdata.image !== undefined && (
                                                <Avatar name={props.userdata.username} src={props.userdata.image} size="50" round={true} style={{marginRight: 20}}/>
                                            )}
                                            {commentView ? (
                                                <p>{props.userdata.username}</p>
                                            ) : (
                                                <p onClick={CommentFieldOpen} style={{cursor: 'pointer'}}>Post your queries here</p>
                                            )}
                                            
                                        </div>
                                        <div className={classes.commentButton}>
                                            <IconButton aria-label="delete" className={classes.margin}>
                                                <label htmlFor="file">
                                                    <AttachFileIcon fontSize="small" />
                                                </label>
                                                <input id="file" type="file" style={{display: 'none'}} onChange={handleImage}/>
                                            </IconButton>
                                        </div>
                                    </div>
                                    {commentView && (
                                        <div className={classes.postPart}>
                                            <div className={classes.postTitlePart}>
                                                <div className="title-button">
                                                    Add Title
                                                </div>
                                                <InputBase
                                                    className="title-input"
                                                    placeholder="Type title in here"
                                                    inputProps={{ 'aria-label': '"Type title in here' }}
                                                    onChange={commentChange}
                                                    name="title"
                                                    value={title}
                                                />
                                            </div>
                                            <div className={classes.postContent}>
                                                <p>Add Content</p>
                                                <InputBase
                                                    className="title-input"
                                                    placeholder="Type content in here"
                                                    inputProps={{ 'aria-label': '"Type content in here' }}
                                                    onChange={commentChange}
                                                    name="content"
                                                    value={content}
                                                    multiline
                                                    rows={6}
                                                />
                                            </div>
                                            {preiviewImg !== null && (
                                                fileType.includes('image/') ? (
                                                    <img src={preiviewImg} alt="comment-img" />
                                                ) : (
                                                <p><AttachFileIcon fontSize="small" />{fileName}</p>
                                                )
                                            )}
                                        </div>
                                        
                                    )}
                                </div>
                                <Button color="primary" onClick={commentAdd} disabled={(title !== "" && content !== "") ? false : true}>post</Button>
                            </Paper>
                            {commentList.map(function(item, i){
                                return(
                                    <Paper elevation={3} style={{marginBottom: '20px', padding: '0px'}} key={i}>
                                        <div className={classes.commentList}>
                                            <div className={classes.commentHeader}>
                                                <div className={classes.userInfoPart}>
                                                    {console.log(item.user_img)}
                                                    {item.user_img !== undefined && (
                                                        <Avatar name={item.user_name} src={item.user_img} size="50" round={true} style={{marginRight: 20}}/>
                                                    )}
                                                    {item.user_name !== undefined && (
                                                        <p>{item.user_name}</p>
                                                    )}
                                                </div>
                                                <div className={classes.commentButton}>
                                                    <p>{item.post_date}</p>
                                                    {item.user_id === localStorage.userToken && (
                                                        <IconButton aria-label="delete" className={classes.CloseButton} onClick={() => RemoveComment(item._id)}>
                                                            <CloseIcon fontSize="small" />
                                                        </IconButton>
                                                    )}
                                                </div>
                                            </div>
                                                
                                            <div className={classes.postPart}>
                                                <div className={classes.commentContent}>
                                                    <p className="comment-title">{item.title}</p>
                                                    <p className="comment-content">{item.content}</p>
                                                    {item.upload_file !== '' && (
                                                        item.file_type.includes('image/') ? (
                                                            <img src={item.preview_img === undefined ? (server_url+"comment/img_get/"+item.upload_file) : item.preview_img} alt="comment-img"/>
                                                        ) : (
                                                            <p><AttachFileIcon fontSize="small" />{item.file_name}</p>
                                                        )
                                                    )}
                                                </div>
                                                <div style={{margin: '10px 20px', display: 'flex', alignItems: 'center'}}>
                                                    <ThumbUpAltOutlinedIcon className={classes.LikeButton} onClick={(e) => {CommentLike(e, i)}}/>
                                                    {item.comment_like.length !== 0 && (
                                                        <span className={classes.LikeListButton} onClick={(e) => LikeUserList(e, item.comment_like)}>{item.comment_like.length} reactions</span>
                                                    )}
                                                </div>
                                                {item.added_comment.map(function(item1, j){
                                                    return(
                                                        <div className={classes.addedCommentPard} key={j}>
                                                            <div className="comment-content">
                                                                <Avatar name={item1.user_name} src={item1.image} size="30" round={true} style={{marginRight: 20}}/>
                                                                <div>
                                                                    <p className="name">{item1.user_name}</p>
                                                                    <p className="content">{item1.content}</p>
                                                                    <div style={{margin: '10px 0px', display: 'flex', alignItems: 'center'}}>
                                                                        <ThumbUpAltOutlinedIcon className={classes.LikeButton} onClick={(e) => {AddCommentLike(e, i, j)}}/>
                                                                        {item1.comment_like.length !== 0 && (
                                                                            <span className={classes.LikeListButton}onClick={(e) => LikeUserList(e, item1.comment_like)}>{item1.comment_like.length} reactions</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="post-date">
                                                                {item1.post_date}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                <div className={classes.addComment}>
                                                    {props.userdata.image !== undefined && (
                                                        <Avatar name={props.userdata.username} src={props.userdata.image} size="40" round={true} style={{marginRight: 20}}/>
                                                    )}
                                                    <form onSubmit={(e) => commentInsert(e, i)} >
                                                        <InputBase
                                                            className="input"
                                                            placeholder="Add comment"
                                                            inputProps={{ 'aria-label': '"Add Comment...' }}
                                                            onChange={(e) => meCommentChange(e, i)}
                                                            value={meComment[i] === undefined ? "" : meComment[i]}
                                                        />
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </Paper>
                                )
                            })} 
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.lockscreen}>
                                <h3>Leaderboard</h3>
                                <div className={classes.topBachMembers}>
                                    {batchMembers.map(function(item, i) {
                                        return (
                                            <div key={i}>
                                                {i === 1 && (
                                                    <div className="top-rank-tab avatar-img" style={{left: "-100px"}}>
                                                        <p className='order-number'>2</p>
                                                        <Avatar name={item.user_name} src={item.image} round size="70px"/>
                                                        <p>{item.user_name}</p>
                                                    </div>
                                                )}
                                                {i === 0 && (
                                                    <div className="top-rank-tab first-place avatar-img" style={{left: "95px"}}>
                                                        <p className='order-number'>1</p>
                                                        <div className="">
                                                            <Avatar name={item.user_name} src={item.image} round size="80px"/>
                                                        </div>
                                                        <p>{item.user_name}</p>
                                                    </div>
                                                )}
                                                {i === 2 && (
                                                    <div className="top-rank-tab avatar-img" style={{left: "25px"}} >
                                                        <p className='order-number'>3</p>
                                                        <Avatar name={item.user_name} src={item.image} round size="70px"/>
                                                        <p>{item.user_name}</p>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className={classes.rankingList}>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell>Performers</TableCell>
                                                <TableCell align="right">Rank</TableCell>
                                                <TableCell align="right">Score</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {batchMembers.map(function(item, i) {
                                                return (
                                                    <TableRow key={i} className={localStorage.userToken === item.user_id ? classes.meOrder : ""}>
                                                        <TableCell align="left" style={{display: 'flex', alignItems: 'center'}}>
                                                            <Avatar name={item.user_name} src={item.image} className="avatar-img" round size="40"/>
                                                            {item.user_name}
                                                        </TableCell>
                                                        <TableCell align="right">{i+1}</TableCell>
                                                        <TableCell align="right">{item.score}</TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                            
                        </Grid>
                    </Grid>
                </div>
            )}
            {/* <Skeleton variant="circle" width={50} height={50} />
            <Skeleton variant="rect" width="100%" height={30} />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" /> */}
        </div>
    );
    }
    const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(CourseOverView);