import React from "react";

import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

//icon
import LockIcon from '@material-ui/icons/Lock';

import Avatar from 'react-avatar';

import { makeStyles } from '@material-ui/core/styles';


import { connect } from 'react-redux';

import {user_get} from '../../../Function/User.js';
import styles from '../../../assets/jss/classroom/content.js';

const useStyles = makeStyles(styles);
function CourseBatchMembers(props) {
    const classes = useStyles();
    const [batchGetFlg, setBatchGetFlg] = React.useState(false);
    const [batchMembers, setBatchMembers] = React.useState([]);

    React.useEffect(() => {
        var batch_member_list = [];
        if(!batchGetFlg){
            if(Object.keys(props.courselist).length !== 0 ){
                var members = [];
                for(var i = 0 ; i < props.courselist.batch_members.length; i++){
                    for(var j = 0; j < props.courselist.batch_members[i].members.length; j++){
                        if(!members.includes(props.courselist.batch_members[i].members[j])){
                            members.push(props.courselist.batch_members[i].members[j]);
                        }
                    }
                }
                for(i = 0; i < members.length; i++){
                    var data = {
                        id: members[i]
                    }
                    user_get(data).then(res => {
                        var batch_obj = {
                            user_id: res._id,
                            user_img: res.image,
                            user_name: res.username,
                            user_level: res.user_level
                        };
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
                        if(batch_member_list.length === members.length){
                            setTimeout(function(){
                                setBatchGetFlg(true);
                            }, 500)
                            setBatchMembers(batch_member_list)
                        }
                        
                    });
                }
                // for(var j = 0; j < props.courselist.batch_members.length; j++){
                //     var members = props.courselist.batch_members[j].members;
                //     for(var i = 0; i < props.courselist.batch_members[j].members.length; i++){
                //         var member = props.courselist.batch_members[j].members[i];
                        
                //         // console.log(item1)
                //         var data = {
                //             id: member
                //         }
                        // user_get(data).then(res => {
                        //     var batch_obj = {
                        //         user_id: res._id,
                        //         user_img: res.image,
                        //         user_name: res.username,
                        //         user_level: res.user_level
                        //     };
                        //     batch_member_list.push(batch_obj);
                        //     console.log(props.courselist.batch_members[j].members)
                        //     if(batch_member_list.length === members.length){
                        //         setTimeout(function(){
                        //             setBatchGetFlg(true);
                        //         }, 1000)
                        //         setBatchMembers(batch_member_list)
                        //     }
                            
                        // });
                //     }
                // }
            }
        }
    }, [props, batchGetFlg]);
    return (
        <div className={classes.container}>
            {props.courselist.pay_status === 'free' && (
                <div className={classes.courseOverFlowContent}>
                    <Grid container spacing={3} className={classes.Content1}>
                        <Grid item xs={12} sm={6} md={12}>
                            <div className={classes.courseCommentLock}>
                                <LockIcon />
                                <h1 style={{textAlign: 'center'}}>Batchmates Section will be unlocked once you register for the course.</h1>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )}
            {props.courselist.pay_status === 'pay' && (
                <div className={classes.doubtContent}>
                    {batchGetFlg && (<>
                        <h3>Faculty</h3>
                        {batchMembers.map(function(item, i) {
                            return (
                                <Grid container spacing={3} className={classes.Content1} key={i}>
                                    {item.user_level === 'faculty' && (
                                        <Grid item xs={12} sm={6} md={3}>
                                        
                                            <div className={classes.memberPart}>
                                                <div className="header">
                                                    <Avatar name={item.user_name} src={item.user_img} className={classes.backAvartar}/>
                                                </div>
                                                <div className="usr-avartar-img">
                                                    <Avatar name={item.user_name} src={item.user_img} size="80" round={true} className="avartar-img"/>
                                                    <p>{item.user_name}</p>
                                                </div>
                                                
                                            </div>
                                        
                                        </Grid>
                                    )}
                                </Grid>
                            )
                        })}
                        <br />
                        <br />
                        <h3>BatchMates</h3>
                        <Grid container spacing={3} className={classes.Content1}>
                            {batchMembers.map(function(item, i) {
                                return (
                                    item.user_level === 'normal' && (
                                        <Grid item xs={12} sm={6} md={3} key={i}>
                                        
                                            <div className={classes.memberPart}>
                                                <div className="header">
                                                    <Avatar name={item.user_name} src={item.user_img} className={classes.backAvartar}/>
                                                </div>
                                                <div className="usr-avartar-img">
                                                    <Avatar name={item.user_name} src={item.user_img} size="80" round={true} className="avartar-img"/>
                                                    <p>{item.user_name}</p>
                                                </div>
                                                
                                            </div>
                                        
                                        </Grid>
                                    )
                                )
                            })}
                        </Grid>
                        </>
                    )}
                    {!batchGetFlg && (<>
                        <h3>Faculty</h3>
                        <Grid container spacing={3} className={classes.Content1}>
                            {[0,0,0,0].map(function(item, i) {
                                return (
                                    <Grid item xs={12} sm={6} md={3} key={i}>
                                    
                                        <div className={classes.memberPart}>
                                            <div className="header">
                                                <Skeleton variant="rect" width="100%" height="100%"/>
                                            </div>
                                            <div className="usr-avartar-img">
                                                <Skeleton variant="circle" width="80px" height="80px" className="avartar-img"/>
                                                <Skeleton variant="rect" width="50%" height="30px" style={{margin: '15px auto'}}/>
                                            </div>
                                            
                                        </div>
                                    
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <br />
                        <br />
                        <h3>BatchMates</h3>
                        <Grid container spacing={3} className={classes.Content1}>
                            {[0,0,0,0].map(function(item, i) {
                                return (
                                    <Grid item xs={12} sm={6} md={3} key={i}>
                                    
                                        <div className={classes.memberPart}>
                                            <div className="header">
                                                <Skeleton variant="rect" width="100%" height="100%"/>
                                            </div>
                                            <div className="usr-avartar-img">
                                                <Skeleton variant="circle" width="80px" height="80px" className="avartar-img"/>
                                                <Skeleton variant="rect" width="50%" height="30px" style={{margin: '15px auto'}}/>
                                            </div>
                                            
                                        </div>
                                    
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </>)}
                </div>
            )}
        </div>
    );
    }
    const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(CourseBatchMembers);