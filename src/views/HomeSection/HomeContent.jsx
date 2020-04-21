import React from "react";
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import YouTube from 'react-youtube';
import ScrollContainer from 'react-indiana-drag-scroll';


//icon

import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import styles from '../../assets/jss/home/homecontent.js';
const useStyles = makeStyles(styles);
function HomeContent(props) {
    const opts = {
        height: '700',
        width: '100%',
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: 0
        }
    };
    const ref = React.useRef(null);
    const outRef = React.useRef(null);
    var time = null;
    // const ac = new AbortController()
    const classes = useStyles();
    const [userCarousle, setUserCarousle] = React.useState(0);
    const [userInfo, setUserInfo] = React.useState(false);
    const [userCarousleFlg, setUserCarousleFlg] = React.useState(0);
    
    function CaruosleStop() {
        clearTimeout(time);
    }
    function CaruosleStart() {
        time = setTimeout(function() {
            if(userCarousle < -ref.current.clientWidth){
                setUserCarousleFlg(1)
            }
            if(userCarousle === 0) {
                setUserCarousleFlg(0)
            }
            if(userCarousleFlg === 0){
                setUserCarousle(userCarousle-5)
            }
            else (
                setUserCarousle(userCarousle+5)
            )
            
        }, 50);
    }
    function userInfoCoverOpen() {
        setUserInfo(true);
    }
    function userInfoCoverClose() {
        setUserInfo(false);
    }
    function _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
    function EnterCourse(id) {
        props.history.push('/courses/'+id);
    }
    time = setTimeout(function() {
        if(ref.current !== null){
            if(userCarousle < -(390*5-ref.current.clientWidth)){
                setUserCarousleFlg(1)
            }
            if(userCarousle === 0) {
                setUserCarousleFlg(0)
            }
            if(userCarousleFlg === 0){
                setUserCarousle(userCarousle-5)
            }
            else (
                setUserCarousle(userCarousle+5)
            )
        }
    }, 50);
    
    React.useEffect(() => {
        return function cleanup() {
            clearTimeout(time);
        };
    }, [time]);
    return (
        <div className={classes.container}>
            <div style={{background: '#f7f7f7', paddingTop: '100px'}}>
                <Grid container spacing={3} className={classes.Content1}>
                    <Grid item xs={12} sm={6} md={6}>
                        <h1>CODING NINJAS</h1>
                        <p className="p1">Think, Create & Innovate. That’s the power of programming. Be a Ninja and build your own world</p>
                        <div className={classes.introAmount}>
                            <div className={classes.introAmountItem}>
                                <h2>5000</h2>
                                <span>Placements in tech giants</span>
                            </div>
                            <div className={classes.introAmountItem}>
                                <h2>15000</h2>
                                <span>Students trained</span>
                            </div>
                            <div className={classes.introAmountItem}>
                                <h2>09</h2>
                                <span>Courses Offered</span>
                            </div>
                        </div>
                        <p className="p2">We strive for teaching most up-to-date programming technologies. Our dynamic curriculum has been designed and refined by our founding members-a team of seasoned software developers and tech executives.</p>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <div className={classes.learnImg}>
                            <img src={require('../../assets/img/learn.png')} alt="learn"/>
                            <div className={classes.learnText}>
                                <h3>LEARN</h3>
                                <span>Go To Classroom</span>
                            </div>
                        </div>
                        <div className={classes.learnImg}>
                            <img src={require('../../assets/img/practice.png')} alt="learn"/>
                            <div className={classes.learnText}>
                                <h3>PRACTICE</h3>
                                <span>Practice on CodeZen</span>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <div className={classes.userListCursole} onMouseEnter={CaruosleStop} onMouseLeave={CaruosleStart} ref={outRef}>
                <ScrollContainer className="scroll-container" onScroll={(e) => {console.log(e)}}> 
                    <div style={{display: 'flex', position: 'relative', left: userCarousle}} ref={ref}>
                        
                        <div style={{display: 'inline-block'}}>
                            <div className={classes.supportTeam}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <div className={classes.supportDescription}>
                                    <p>Divyansh Chowdhary,<span>Microsoft</span></p>
                                    <p>I had a great learning experience with Coding Ninjas.The concepts were clearly explained by the teachers, especially the way Ankush teaches, makes it more fun and easy. It provided me a perfect foundation.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'inline-block'}}>   
                            <div className={classes.supportTeam}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <div className={classes.supportDescription}>
                                    <p>Divyansh Chowdhary,<span>Microsoft</span></p>
                                    <p>I had a great learning experience with Coding Ninjas.The concepts were clearly explained by the teachers, especially the way Ankush teaches, makes it more fun and easy. It provided me a perfect foundation.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'inline-block'}}> 
                            <div className={classes.supportTeam}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <div className={classes.supportDescription}>
                                    <p>Divyansh Chowdhary,<span>Microsoft</span></p>
                                    <p>I had a great learning experience with Coding Ninjas.The concepts were clearly explained by the teachers, especially the way Ankush teaches, makes it more fun and easy. It provided me a perfect foundation.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'inline-block'}}> 
                            <div className={classes.supportTeam}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <div className={classes.supportDescription}>
                                    <p>Divyansh Chowdhary,<span>Microsoft</span></p>
                                    <p>I had a great learning experience with Coding Ninjas.The concepts were clearly explained by the teachers, especially the way Ankush teaches, makes it more fun and easy. It provided me a perfect foundation.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'inline-block'}}> 
                            <div className={classes.supportTeam}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <div className={classes.supportDescription}>
                                    <p>Divyansh Chowdhary,<span>Microsoft</span></p>
                                    <p>I had a great learning experience with Coding Ninjas.The concepts were clearly explained by the teachers, especially the way Ankush teaches, makes it more fun and easy. It provided me a perfect foundation.</p>
                                </div>
                            </div>
                        </div>
                        {/* <div style={{display: 'inline-block'}}> 
                            <div className={classes.supportTeam}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <div className={classes.supportDescription}>
                                    <p>Divyansh Chowdhary,<span>Microsoft</span></p>
                                    <p>I had a great learning experience with Coding Ninjas.The concepts were clearly explained by the teachers, especially the way Ankush teaches, makes it more fun and easy. It provided me a perfect foundation.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'inline-block'}}> 
                            <div className={classes.supportTeam}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <div className={classes.supportDescription}>
                                    <p>Divyansh Chowdhary,<span>Microsoft</span></p>
                                    <p>I had a great learning experience with Coding Ninjas.The concepts were clearly explained by the teachers, especially the way Ankush teaches, makes it more fun and easy. It provided me a perfect foundation.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'inline-block'}}> 
                            <div className={classes.supportTeam}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <div className={classes.supportDescription}>
                                    <p>Divyansh Chowdhary,<span>Microsoft</span></p>
                                    <p>I had a great learning experience with Coding Ninjas.The concepts were clearly explained by the teachers, especially the way Ankush teaches, makes it more fun and easy. It provided me a perfect foundation.</p>
                                </div>
                            </div>
                        </div> */}
                        
                    </div>
                    </ScrollContainer>
                </div>
                <div className={classes.alumniWork}>
                    <h2>Where Our Alumni Work</h2>
                    <Grid container spacing={3} className={classes.Content1}>
                        <Grid item xs={12} sm={6} md={2}>
                            <div className={classes.serviceImg}>
                                <img src={require('../../assets/img/google.png')} alt="google"/>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                        
                            <div className={classes.serviceImg}>
                                <img src={require('../../assets/img/amazon.png')} alt="amazon"/>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                        
                            <div className={classes.serviceImg}>
                                <img src={require('../../assets/img/microsoft.png')} alt="microsoft"/>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <div className={classes.serviceImg}>
                                <img src={require('../../assets/img/expedia.png')} alt="microsoft"/>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <div className={classes.serviceImg}>
                                <img src={require('../../assets/img/adobe.png')} alt="microsoft"/>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <div className={classes.serviceImg}>
                                <img src={require('../../assets/img/oyo.png')} alt="microsoft"/>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <div className={classes.serviceImg}>
                                <img src={require('../../assets/img/flipkart.png')} alt="microsoft"/>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <div className={classes.serviceImg}>
                                <img src={require('../../assets/img/samsung.png')} alt="microsoft"/>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <div className={classes.serviceImg}>
                                <img src={require('../../assets/img/morgan.png')} alt="microsoft"/>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <div className={classes.serviceImg}>
                                <img src={require('../../assets/img/walmart.png')} alt="microsoft"/>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div style={{margin: '100px 0px', padding: '0px 50px'}}>
                <h1 style={{fontFamily: 'Archivo Black, sans-serif',letterSpacing: '-1px'}}>OUR ONLINE PROGRAMMING COURSES</h1>
                <h4 style={{fontFamily: 'Archivo Black, sans-serif',letterSpacing: '-1px', marginTop: '50px'}}> FOUNDATION COURSES</h4>
                <Grid container spacing={3}>
                    {props.courselist.map(function(item, i){
                        return(
                            <Grid item xs={12} sm={6} md={4} key={i}>
                                <div className={classes.courseItems} style={{backgroundImage: 'url("'+require('../../assets/img/program.png')+'")'}} onClick={() => EnterCourse(item._id)}>
                                    {/* <img src={require('../../assets/img/program.png')} alt="microsoft"/> */}
                                    <div className={classes.courseTitle}>
                                        <p>{item.title}<span> - ONLINE</span></p>
                                        <p>{item.preivew_title}</p>
                                    </div>
                                </div>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
            <div style={{background: '#f7f7f7', padding: '100px 50px'}}>
                <div className={classes.videoIntro}>
                    <h1 style={{marginTop: '50px'}}> FOUNDATION COURSES</h1>
                    <p>A sneak peek of how students become a Pro through industry-vetted online courses by the expert industry mentors</p>
                    <YouTube
                        videoId="Kdhje-gdviw"
                        opts={opts}
                        onReady={_onReady}
                    />
                </div>
                
            </div>
            <div style={{background: 'linear-gradient(270deg,#ffcc8d 0,#ff6868 98%)', padding: '100px 50px'}}>
                <div className={classes.videoIntro1}>
                    <h1 style={{marginTop: '50px'}}> WHAT OUR STUDENTS SAY ABOUT US</h1>
                    <p>Here, they share their Coding Ninjas reviews and journeys to victory.</p>
                    <YouTube
                        videoId="Kdhje-gdviw"
                        opts={opts}
                        onReady={_onReady}
                    />
                </div>
                <Grid container spacing={5} style={{marginTop: '50px'}}>
                    <Grid item xs={12} sm={6} md={4}>
                        <div className={classes.reviewListItem}>
                            <div className={classes.userInfo}>
                                <div className={classes.userName}>
                                    <p>Sukriti Macker</p>
                                    <span>Student - Maharaja Agrasen Institute of Technology</span>
                                </div>
                                <div className={classes.userImg}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  className={classes.reviewAvatarImg}/>
                                </div>
                                
                            </div>
                            <div style={{color: 'grey', marginTop: '30px', fontFamily: 'Nunito Sans, sans-serif', lineHeight: '25px'}}>
                                I was a beginner in Coding, but the way the Nidhi Ma’am taught was exceptionally good!The concepts she taught were so easy to understand. Mentors will help you out at every step ! Whatever course you may take, you will be offered the best faculty. I would recommend you to join and it will be the best experience. I guarantee!
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <div className={classes.reviewListItem}>
                            <div className={classes.userInfo}>
                                <div className={classes.userName}>
                                    <p>Sukriti Macker</p>
                                    <span>Student - Maharaja Agrasen Institute of Technology</span>
                                </div>
                                <div className={classes.userImg}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  className={classes.reviewAvatarImg}/>
                                </div>
                                
                            </div>
                            <div style={{color: 'grey', marginTop: '30px', fontFamily: 'Nunito Sans, sans-serif', lineHeight: '25px'}}>
                                I was a beginner in Coding, but the way the Nidhi Ma’am taught was exceptionally good!The concepts she taught were so easy to understand. Mentors will help you out at every step ! Whatever course you may take, you will be offered the best faculty. I would recommend you to join and it will be the best experience. I guarantee!
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <div className={classes.reviewListItem}>
                            <div className={classes.userInfo}>
                                <div className={classes.userName}>
                                    <p>Sukriti Macker</p>
                                    <span>Student - Maharaja Agrasen Institute of Technology</span>
                                </div>
                                <div className={classes.userImg}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  className={classes.reviewAvatarImg}/>
                                </div>
                                
                            </div>
                            <div style={{color: 'grey', marginTop: '30px', fontFamily: 'Nunito Sans, sans-serif', lineHeight: '25px'}}>
                                I was a beginner in Coding, but the way the Nidhi Ma’am taught was exceptionally good!The concepts she taught were so easy to understand. Mentors will help you out at every step ! Whatever course you may take, you will be offered the best faculty. I would recommend you to join and it will be the best experience. I guarantee!
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <div className={classes.reviewListItem}>
                            <div className={classes.userInfo}>
                                <div className={classes.userName}>
                                    <p>Sukriti Macker</p>
                                    <span>Student - Maharaja Agrasen Institute of Technology</span>
                                </div>
                                <div className={classes.userImg}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  className={classes.reviewAvatarImg}/>
                                </div>
                                
                            </div>
                            <div style={{color: 'grey', marginTop: '30px', fontFamily: 'Nunito Sans, sans-serif', lineHeight: '25px'}}>
                                I was a beginner in Coding, but the way the Nidhi Ma’am taught was exceptionally good!The concepts she taught were so easy to understand. Mentors will help you out at every step ! Whatever course you may take, you will be offered the best faculty. I would recommend you to join and it will be the best experience. I guarantee!
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <div className={classes.reviewListItem}>
                            <div className={classes.userInfo}>
                                <div className={classes.userName}>
                                    <p>Sukriti Macker</p>
                                    <span>Student - Maharaja Agrasen Institute of Technology</span>
                                </div>
                                <div className={classes.userImg}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  className={classes.reviewAvatarImg}/>
                                </div>
                                
                            </div>
                            <div style={{color: 'grey', marginTop: '30px', fontFamily: 'Nunito Sans, sans-serif', lineHeight: '25px'}}>
                                I was a beginner in Coding, but the way the Nidhi Ma’am taught was exceptionally good!The concepts she taught were so easy to understand. Mentors will help you out at every step ! Whatever course you may take, you will be offered the best faculty. I would recommend you to join and it will be the best experience. I guarantee!
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <div className={classes.reviewListItem}>
                            <div className={classes.userInfo}>
                                <div className={classes.userName}>
                                    <p>Sukriti Macker</p>
                                    <span>Student - Maharaja Agrasen Institute of Technology</span>
                                </div>
                                <div className={classes.userImg}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.reviewAvatarImg}/>
                                </div>
                                
                            </div>
                            <div style={{color: 'grey', marginTop: '30px', fontFamily: 'Nunito Sans, sans-serif', lineHeight: '25px'}}>
                                I was a beginner in Coding, but the way the Nidhi Ma’am taught was exceptionally good!The concepts she taught were so easy to understand. Mentors will help you out at every step ! Whatever course you may take, you will be offered the best faculty. I would recommend you to join and it will be the best experience. I guarantee!
                            </div>
                        </div>
                    </Grid>

                </Grid>
            </div>
            <div style={{padding: '100px 50px', background: '#fbfbfc'}}>
                <h1 style={{fontFamily: 'Archivo Black, sans-serif'}}>IN-HOUSE NINJAS</h1>
                <Grid container spacing={10} style={{marginTop: '50px'}}>
                    <Grid item xs={12} sm={6} md={4} >
                        <div onMouseEnter={userInfoCoverOpen} onMouseLeave={userInfoCoverClose} style={{width: '350px', margin: 'auto'}}>
                            <div className={classes.supportImg}>
                                <img src={require('../../assets/img/1.png')} alt="microsoft"/>
                                <div className={classes.userInfoFooter}>
                                    <p>Ankush Singla</p>
                                    <span>Founder & Instructor</span>
                                </div>
                                
                            </div>
                            {userInfo && (
                                <div className={classes.reviewListItem+" "+classes.hoverIntro}>
                                    <div className={classes.userInfo}>
                                        <div className={classes.userName}>
                                            <p>Ankush Singla</p>
                                            <span>Founder & Instructor</span>
                                        </div>
                                        <div className={classes.userImg}>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.reviewAvatarImg}/>
                                        </div>
                                        
                                    </div>
                                    <div style={{color: 'grey', marginTop: '30px', fontFamily: 'Nunito Sans, sans-serif', lineHeight: '25px'}}>
                                        I was a beginner in Coding, but the way the Nidhi Ma’am taught was exceptionally good!The concepts she taught were so easy to understand. Mentors will help you out at every step ! Whatever course you may take, you will be offered the best faculty. I would recommend you to join and it will be the best experience. I guarantee!
                                    </div>
                                </div>
                            )}
                            
                        </div>
                        
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <div className={classes.supportImg}>
                            <img src={require('../../assets/img/1.png')} alt="microsoft"/>
                            <div className={classes.userInfoFooter}>
                                <p>Ankush Singla</p>
                                <span>Founder & Instructor</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <div className={classes.supportImg}>
                            <img src={require('../../assets/img/1.png')} alt="microsoft"/>
                            <div className={classes.userInfoFooter}>
                                <p>Ankush Singla</p>
                                <span>Founder & Instructor</span>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div style={{padding: '100px 50px'}}>
                <h1 style={{fontFamily: 'Archivo Black, sans-serif'}}>EXCLUSIVE FEATURES</h1>
                <Grid container spacing={10} style={{marginTop: '50px'}}>
                    <Grid item xs={12} sm={6} md={4}>
                        <div className={classes.Exclusive}>
                            <img src={require('../../assets/img/exclusive4.png')} alt="microsoft"/>
                            <div >
                                <p>Exceptional Faculty</p>
                                <span>Our faculty is from the best institutes around the world such as IITD, Stanford and more. They also have work experience in tech giants like Amazon, Facebook, Adobe which makes them exceptional.</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <div className={classes.Exclusive}>
                            <img src={require('../../assets/img/exclusive6.png')} alt="microsoft"/>
                            <div >
                                <p>Mentor Support</p>
                                <span>An incredible mentor support is provided where 1 teaching assistant is assigned to 10 students. The TA’s are top performers alumni dedicated to support and clear doubts at any point of time.</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <div className={classes.Exclusive}>
                            <img src={require('../../assets/img/exclusive2.png')} alt="microsoft"/>
                            <div >
                                <p>CodeZen</p>
                                <span>An online platform using proprietary technologies, social elements and well-crafted content curriculum delivering the finest learning experience.</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <div className={classes.Exclusive}>
                            <img src={require('../../assets/img/exclusive5.png')} alt="microsoft"/>
                            <div >
                                <p>Placements</p>
                                <span>We do not make false promise to provide 100 % placements rather help students based on their performance. Our students are placed at bigwigs like Adobe, Amazon, Microsoft and many more.</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <div className={classes.Exclusive}>
                            <img src={require('../../assets/img/exclusive3.png')} alt="microsoft"/>
                            <div >
                                <p>Course curriculum</p>
                                <span>Industry leading curriculum designed by expert developers turned educators who have invested time to create quality content infused with unique teaching methodology.</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <div className={classes.Exclusive}>
                            <img src={require('../../assets/img/exclusive1.png')} alt="microsoft"/>
                            <div >
                                <p>Get Secured with Certificate</p>
                                <span>The student will be provided the certificates which are signed by instructors and have our logo on it which will help them secure their career and increase job prospects with certificates signed by us.</span>
                            </div>
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

export default connect(mapStateToProps)(withRouter(HomeContent));