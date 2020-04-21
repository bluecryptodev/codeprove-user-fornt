import React from "react";
import { withRouter } from 'react-router-dom';
// import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
//Icon
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
//other
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
//animation 
import { bounceInUp, fadeInLeft } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import {lectureitemget} from '../../Function/LectureItems.js';
import {user_get} from '../../Function/User.js';

import { connect } from 'react-redux';

import styles from '../../assets/jss/codetest/testlist.js';

import videoIcon from '../../assets/img/video-icon.png';
import codeIcon from '../../assets/img/code-icon.png';
import notesIcon from '../../assets/img/notes-icon.png';
import puzzleIcon from '../../assets/img/puzzle-icon.png';



const animationStyles = {
    bounceUp: {
      animation: 'x 1.5s',
      animationName: Radium.keyframes(bounceInUp, 'bounceUp')
    },
    fadeLeft: {
      animation: 'x 0.5s',
      animationName: Radium.keyframes(fadeInLeft, 'fadeLeft')
    },
  }
const useStyles = makeStyles(styles);
function TestList(props) {
    const classes = useStyles();
    const ref = React.useRef(null);
    const [bookmark, setBookMark] = React.useState(false);
    // const [bookMarkID, setBookMarkId] = React.useState([]);
    const [listHeight, setListHeight] = React.useState(0);
    const [itemID, setItemID] = React.useState(props.posts[0].value);
    const [deadline, setDeadline] = React.useState('');
    const [bookmarkList, setBookmarkList] = React.useState([]);
    const [load, setLoad] = React.useState(false);
    function lectureItemSelect(itemtype, itemid, itemtitle, ) {
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
            data = {
                "id": "test_result",
                "value": []
            };
            props.dispatch({
                type: 'UPDATE',
                data
            });
        }
        setItemID(itemid);
    }
    function lectureItemSelect1(itemtype, itemid, itemtitle, lecture_id) {
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
        var url = "/lecture-content/"+lecture_id+"/"+itemid+"/"+props.deadline;
        props.history.push(url);
    }
    function bookMarkChange() {
        setBookMark(!bookmark);
    }
    function dateFormate(date1) {
        var date = new Date(parseInt(date1));
        var monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ];
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return monthNames[monthIndex]+" "+date.getDate()+", "+year
    }
    function backTopic() {
        window.location.href = '/classroom/courses/'+localStorage.course_id;
    }
    React.useEffect(() => {
        setListHeight(ref.current.clientHeight);
        setDeadline(dateFormate(props.deadline));
        if(props.posts[24].value || !load) {
            var data = {
                id: localStorage.userToken
            }
            user_get(data).then(res => {
                var bookList = res.bookmark_list;

                res.bookmark_list.map(function(item, i){
                    data = {
                        id: item.item_id
                    };
                    lectureitemget(data).then(res => {
                        bookList[i].item_name = res.title;
                        bookList[i].item_type = res.type;
                        if(i === bookList.length-1){
                            setLoad(true);
                            data = {
                                "id": "book_mark",
                                "value": false
                            };
                            props.dispatch({
                                type: 'UPDATE',
                                data
                            });
                        }
                        setBookmarkList(bookList);
                    });
                    return 0;
                })
                if(res.bookmark_list.length === 0){
                    setBookmarkList(bookList);
                }
            })
        }
    }, [props, load]);
    return (
        <StyleRoot>
            {!bookmark && (
            <div className={classes.container} style={animationStyles.fadeLeft}>
                <div className={classes.header+" code-list-header"}>
                    <Fab variant="extended" size="small" className={classes.topicButton} onClick={backTopic}>
                        <ViewComfyIcon fontSize="small"/>
                        Topics
                    </Fab>
                    <div>
                        <Avatar alt="avatar"  className={classes.avatarImage}/>
                        {!bookmark && (
                            <Tooltip TransitionComponent={Zoom} title="Bookmarks" placement="bottom">
                                <BookmarkBorderIcon  fontSize="large"  className={classes.avatarImage} style={{marginTop: "4px", marginRight: '5px'}} onClick={bookMarkChange}/>
                            </Tooltip>
                        )}
                        {bookmark && (
                            <Tooltip TransitionComponent={Zoom} title="Bookmarks" placement="bottom">
                                <BookmarkIcon  fontSize="large"  className={classes.avatarImage} style={{marginTop: "4px", marginRight: '5px'}} onClick={bookMarkChange}/>
                            </Tooltip>
                        )}
                    </div>
                </div>
                <div style={{flex: '1'}} ref={ref}>
                <StyleRoot >
                    <div className={classes.list}  style={animationStyles.bounceUp}>
                        <div className={classes.titleContent}>
                            <div className={classes.titleIcon} style={{background: ('linear-gradient(-143deg,'+props.lecture_info.color.first_color+' 0,'+props.lecture_info.color.second_color+' 100%)')}}>
                                <img src={props.server+"lecture/img_get/"+props.lecture_info.lecture_icon} alt="..."/>
                            </div>
                            <div className={classes.titletext}>
                                <p>{props.lecture_info.title}</p>
                                <span>Deadline</span>
                                <p>{deadline}</p>
                            </div>
                            <div style={{
                                background: ('linear-gradient(-143deg,'+props.lecture_info.color.first_color+' 0,'+props.lecture_info.color.second_color+' 100%)')
                            }}
                                className="box-shadow"
                            >

                            </div>
                        </div>
                    
                        <div style={{height: listHeight}}>
                            <PerfectScrollbar>
                                <div style={{padding: '20px 5px'}}>
                                    <Card className={classes.card}>
                                        
                                        <CardContent >
                                            <div>
                                                <p className={classes.listLecture}>Lecture</p>
                                                <LinearProgress 
                                                    variant="determinate"
                                                    color="secondary"
                                                    value={props.posts[16].value/parseInt(props.score)*100}
                                                    style={{width: '80%', display: 'inline-block'}}
                                                />
                                                
                                                <p className={classes.completPercent}>{Number((props.posts[16].value/props.score*100).toFixed(2))}%</p>
                                                <p style={{margin: '0px', fontSize: '12px'}}><span style={{color: 'grey'}}>score</span> {props.posts[16].value.toFixed(2)}/{props.score}</p>
                                            </div>
                                            
                                            <div style={{marginTop: '30px'}}>
                                                {props.itemlist.map(function(item, i){
                                                    return(<div  key={i}>
                                                        <div className={classes.listContent} onClick={() => {lectureItemSelect(item.type, item._id, item.title, item.lecture_id)}}>
                                                            <div className={classes.listIcon}>
                                                                {item.type === 'video' && (<img src={videoIcon} alt="video"/>)}
                                                                {item.type === 'code' && (<img src={codeIcon} alt="code"/>)}
                                                                {item.type === 'notes' && (<img src={notesIcon} alt="notes"/>)}
                                                                {item.type === 'puzzle' && (<img src={puzzleIcon} alt="puzzle"/>)}
                                                            </div>
                                                            <div className={classes.listTitle}>
                                                                <p className={item._id === props.posts[0].value ? classes.listActive : ""}>{item.title} </p>
                                                            </div>
                                                            {props.posts[15].value[i] === "false" && (
                                                                <div className={classes.submitMarkFalse}></div>
                                                            )}
                                                            {props.posts[15].value[i] === "true" && (
                                                                <div className={classes.submitMarkTrue}></div>
                                                            )}
                                                            <div className={classes.listCors}>
                                                                {item.score !== 0 && (<p>{props.posts[17].value[i].toFixed(2)}/{item.score}</p>)}
                                                            </div>
                                                        </div>
                                                        {i < props.itemlist.length-1 && (
                                                            <div className={classes.vertical}></div>
                                                        )}
                                                        
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            
                                        </CardContent>
                                    </Card>
                                </div>
                                
                            </PerfectScrollbar>
                        </div>
                        
                </div>
                </StyleRoot>
                </div>
            </div>
            )}
            {bookmark && (
                <div className={classes.container} style={animationStyles.fadeLeft}>
                <div className={classes.header+" code-list-header"}>
                    <Fab variant="extended" size="small" className={classes.topicButton} onClick={backTopic}>
                        <ViewComfyIcon fontSize="small"/>
                        Topics
                    </Fab>
                    <div>
                        <Avatar alt="avatar"  className={classes.avatarImage}/>
                        {!bookmark && (
                            <Tooltip TransitionComponent={Zoom} title="Bookmarks" placement="bottom">
                                <BookmarkBorderIcon  fontSize="large"  className={classes.avatarImage} style={{marginTop: "4px", marginRight: '5px'}} onClick={bookMarkChange}/>
                            </Tooltip>
                        )}
                        {bookmark && (
                            <Tooltip TransitionComponent={Zoom} title="Bookmarks" placement="bottom">
                                <BookmarkIcon  fontSize="large"  className={classes.avatarImage} style={{marginTop: "4px", marginRight: '5px'}} onClick={bookMarkChange}/>
                            </Tooltip>
                        )}
                    </div>
                </div>
                <div style={{flex: '1'}} ref={ref}>
                <StyleRoot >
                    <div className={classes.list}  style={animationStyles.bounceUp}>
                        <div className={classes.titleContent}>
                            <div className={classes.titleIcon} style={{backgroundImage: 'linear-gradient(-135deg, rgb(250, 217, 97) 0%, rgb(255, 76, 153) 100%)'}}>
                                <img src={props.server+"lecture/img_get/"+props.lecture_info.lecture_icon} alt="..."/>
                            </div>
                            <div className={classes.titletext}>
                                <p>Bookmarks</p>
                            </div>
                            <div style={{
                                backgroundImage: 'linear-gradient(-135deg, rgb(250, 217, 97) 0%, rgb(255, 76, 153) 100%)'
                            }}
                                className="box-shadow"
                            >

                            </div>
                        </div>
                    
                        <div style={{height: listHeight}}>
                            <PerfectScrollbar>
                                <div style={{padding: '20px 5px'}}>
                                    <Card className={classes.card}>
                                        
                                        <CardContent >
                                            {console.log(bookmarkList.length)}
                                            <div style={{marginTop: '30px'}}>
                                                {bookmarkList.map(function(item, i){
                                                    return(<div  key={i}>
                                                        <div className={classes.listContent} onClick={() => {lectureItemSelect1(item.item_type, item.item_id, item.item_name, item.lecture_id)}}>
                                                            <div className={classes.listIcon}>
                                                                {item.item_type === 'video' && (<img src={videoIcon} alt="video"/>)}
                                                                {item.item_type === 'code' && (<img src={codeIcon} alt="code"/>)}
                                                                {item.item_type === 'notes' && (<img src={notesIcon} alt="notes"/>)}
                                                                {item.item_type === 'puzzle' && (<img src={puzzleIcon} alt="puzzle"/>)}
                                                            </div>
                                                            <div className={classes.listTitle}>
                                                                <p>{item.item_name} </p>
                                                            </div>
                                                            
                                                            
                                                        </div>
                                                        </div>
                                                    )
                                                })}
                                                {bookmarkList.length === 0 && (
                                                    <p>You have no bookmarks</p>

                                                )}
                                            </div>
                                            
                                        </CardContent>
                                    </Card>
                                </div>
                                
                            </PerfectScrollbar>
                        </div>
                        
                </div>
                </StyleRoot>
                </div>
            </div>
            )}
        </StyleRoot>
    );
}
const mapStateToProps = (state) => {
    return {
      posts: state
    }
  }
  
export default connect(mapStateToProps)(withRouter(TestList));