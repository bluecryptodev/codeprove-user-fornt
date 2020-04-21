import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

//icon
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
///
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';

import styles from '../../assets/jss/home/homeheader.js';

import {email_confirm, user_add, user_get, user_login} from '../../Function/User.js';
import {email_send} from '../../Function/Email.js';

const useStyles = makeStyles(styles);

function CourseHeader(props) {
    const { className, onSidebarOpen, ...rest } = props;

    const classes = useStyles();
    const [menuOpen, setMenuOpen] = React.useState(null);
    const [headerPosition, setHeaderPosition] = React.useState(false);
    const [LoginModal, setLoginModal] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMsg, setEmailErrorMag] = React.useState('');
    const [continuDisabled, setContinueDisabled] = React.useState(true);
    const [submitted, setSubmitted] = React.useState(false);
    const [OTPField, setOTPField] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [OTP, setOTP] = React.useState('');
    const [OTPValue, setOTPValue] = React.useState('');
    const [nextStep, setNextStep] = React.useState(false);
    const [userData, setUserData] = React.useState({});

    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMsg, setNameErrorMsg] = React.useState("");
    const [phoneError, setPhoneError] = React.useState(false);
    const [phoneErrorMsg, setPhoneErrorMsg] = React.useState("");
    const [OPTError, setOPTError] = React.useState(false);
    const [OPTErrorMsg, setOPTErrorMsg] = React.useState("");
    const [resendflg, setResendOTPflg] = React.useState(false);


    function OpenMenu(value) {
        setMenuOpen(value)
    }
    const headerColorChange = () => {
        const windowsScrollTop = window.pageYOffset;
        if (windowsScrollTop > 98) {
            setHeaderPosition(true)
        } else {
            setHeaderPosition(false)
        }
    };
    function LoginModalChange(value){
        if(!value){
            setOTPField("");
            setName("");
            setPhone("");
            setOTP("");
            setNextStep(false);
            setEmail("");
        }
        setLoginModal(value);
        
    }
    function backTo() {
        setOTPField("");
        setName("");
        setPhone("");
        setOTP("");
        setNextStep(false);
    }
    function responseGoogle(res) { 
        console.log(res);
    }
    const responseFacebook = (response) => {
        console.log(response);
    }
    function validateEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    function EmailChange(e){
        setEmail(e.target.value);
        if(e.target.value === ''){
            setEmailError(true);
            setEmailErrorMag('E-mail is required');
            setContinueDisabled(true);
        }
        else if(!validateEmail(email)){
            setEmailError(true);
            setContinueDisabled(true);
            setEmailErrorMag('Please enter a valid email address');
        }
        else {
            setEmailError(false);
            setEmailErrorMag('');
            setContinueDisabled(false);
        }
    }
    function emailErrorChange() {
        if(email === ''){
            setEmailError(true);
            setContinueDisabled(true);
            setEmailErrorMag('E-mail is required');
        }
        else if(!validateEmail(email)){
            setEmailError(true);
            setContinueDisabled(true);
            setEmailErrorMag('Please enter a valid email address');
        }
        else {
            setEmailError(false);
            setEmailErrorMag('');
            setContinueDisabled(false);
        }
    }
    function NameChange(e) {
        setName(e.target.value);
        if(e.target.value === ""){
            setNameError(true);
            setNameErrorMsg("Name is required");
        }
        else {
            setNameError(false);
            setNameErrorMsg("");
        }
    }
    function nameErrorChange() {
        if(name === ""){
            setNameError(true);
            setNameErrorMsg("Name is required");
        }
        else {
            setNameError(false);
            setNameErrorMsg("");
        }
    }
    
    function PhoneChange(e) {
        setPhone(e.target.value);
        if(e.target.value === ""){
            setPhoneError(true);
            setPhoneErrorMsg("Phone number is required");
        }
        else {
            setPhoneError(false);
            setPhoneErrorMsg("");
        }
    }
    function phoneErrorChange(e) {
        if(phone === ""){
            setPhoneError(true);
            setPhoneErrorMsg("Phone number is required");
        }
        else {
            setPhoneError(false);
            setPhoneErrorMsg("");
        }
    }
    function OTPChange(e) {
        setOTP(e.target.value);
        console.log(e.target.value, OTPValue)
        if(e.target.value === ""){
            setOPTError(true);
            setOPTErrorMsg("OPT is required");
        }
        else if(e.target.value !== OTPValue.toString()){
            setOPTError(true);
            setOPTErrorMsg("Invalid OTP. Please enter the correct OTP sent to the above mentioned email");
        }
        else {
            setOPTError(false);
            setOPTErrorMsg("");
        }
    }
    function OTPErrorChange(e) {
        if(OTP === ""){
            setOPTError(true);
            setOPTErrorMsg("OPT is required");
        }
        else if(OTP !== OTPValue.toString()){
            
            setOPTError(true);
            setOPTErrorMsg("Invalid OTP. Please enter the correct OTP sent to the above mentioned email");
        }
        else {
            setOPTError(false);
            setOPTErrorMsg("");
        }
    }
    function emailCheck() {
        setSubmitted(true);
        var data = {
            email: email
        };
        email_confirm(data).then(res => {
            if(res.status) {
                setOTPField("true");
            }
            else {
                setOTPField("false");
            }
            setOTPValue(res.password);
            data = {
                email: email,
                password: res.password
            }
            email_send(data).then(res => {
                if(res){
                    setSubmitted(false);
                    setNextStep(true);
                }
            })
        })
        .catch(err => {
            console.log(err);
        })
        

    }
    function ResendOTP() {
        var OTP_r = Math.floor(100000 + Math.random() * 900000);
        setOTPValue(OTP_r)
        var data = {
            email: email,
            password: OTP_r
        }
        email_send(data).then(res => {
            if(res){
                setResendOTPflg(true);
                setTimeout(function() {
                    setResendOTPflg(false);
                },5000)
            }
        })
    }
    function SignUp() {
        var data = {
            email: email,
            name: name,
            password: OTP,
            img: ''
        }
        user_add(data).then(res => {
            if(res.success){
                localStorage.userToken = res.message._id;
                window.location.href='/';
            }
        })
        .catch(err=> {
            console.log(err);
        })
    }
    function Login() {
        var data ={
            email: email
        };
        user_login(data).then(res => {
            if(res.success){
                localStorage.userToken = res.message._id;
                window.location.href='/';
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    function Logout() {
        localStorage.clear();
        window.location.href='/';
    }
    React.useEffect(() => {
        var data = {
            id: localStorage.userToken
        }
        user_get(data).then(res => {
            setUserData(res);
        })
        .catch(err => {
            console.log(err);
        })
        window.addEventListener("scroll", headerColorChange);
        return function cleanup() {
            window.removeEventListener("scroll", headerColorChange);
        };

    }, []);
    return (<>
        
        <AppBar
            {...rest}
            className={clsx(classes.root, className)}
            color='inherit'
            position={headerPosition ? "fixed" : "static"}
        >
        <Toolbar className={clsx(classes.content, className)}>
            <RouterLink to="/" >
                <img
                    alt="Logo"
                    src={require('../../assets/img/logo.png')}
                />
            </RouterLink>
            <Hidden mdDown>
                <RouterLink to="/home" className={classes.navbar}>Home</RouterLink>
                <div className={classes.navbaritem} onMouseEnter={() => OpenMenu('course')} onMouseLeave={() => OpenMenu('none')}>
                    <RouterLink to="/terms" className={classes.navbar} >Courses<KeyboardArrowDownIcon /></RouterLink>
                    {menuOpen === 'course' && (
                        <Paper className={classes.menuItems}>
                            <ul>
                                <p>Advanced Courses</p>
                                {props.courselist.map(function(item, i){
                                    return(
                                        item.type === "advanced" && (<li key={i}><RouterLink to={"/courses/"+item._id}>{item.title}</RouterLink></li>)
                                    )
                                })}
                                <p>Foundation Courses</p>
                                {props.courselist.map(function(item, i){
                                    return(
                                        item.type === "foundation" && (<li key={i}><RouterLink to={"/courses/"+item._id}>{item.title}</RouterLink></li>)
                                    )
                                })}
                            </ul>
                        </Paper>
                    )}
                </div>
                <div className={classes.navbaritem} onMouseEnter={() => OpenMenu('career')} onMouseLeave={() => OpenMenu('none')}>
                    <RouterLink to="/terms" className={classes.navbar} >Career Tracks<KeyboardArrowDownIcon /></RouterLink>
                    {menuOpen === 'career' && (
                        <Paper className={classes.menuItems}>
                            <ul>
                                <li><RouterLink to="/terms">Competitive Programming Course</RouterLink></li>
                                <li><RouterLink to="/terms">Full Stack Web Development with Node.js</RouterLink></li>
                                <li><RouterLink to="/terms">Data Science & Machine Learning Complete</RouterLink></li>
                            </ul>
                        </Paper>
                    )}
                </div>
                <RouterLink to="/contact" className={classes.navbar} >Register</RouterLink>
                <RouterLink to="/contact" className={classes.navbar} >Events</RouterLink>
            </Hidden>
            <div className={classes.flexGrow} />
            <Hidden mdDown>
                <RouterLink to="/home" className={classes.navbar}> My Classroom </RouterLink>
                {localStorage.userToken === undefined && (
                    <Fab variant="extended" size='small' className={classes.loginButton} onClick={() => LoginModalChange(true)}>
                        Login
                    </Fab>
                )}
                {localStorage.userToken !== undefined && (
                    <div className={classes.avartarPart}>
                        <Avatar alt={userData.username} src={userData.img === 'default.png' ? require("../../assets/img/default.png") : 'userData.img'} className={classes.avatarImg}/>
                        <Paper className={classes.profileMenu+ " viewMenu"}>
                            asd
                            <hr />
                            <Button className={classes.logoutButton} onClick={Logout}>
                                Logout
                            </Button>
                        </Paper>
                    </div>
                    
                )}
            </Hidden>
            <Hidden lgUp>
            <IconButton
                color="inherit"
                onClick={onSidebarOpen}
            >
                <MenuIcon />
            </IconButton>
            </Hidden>
        </Toolbar>
        </AppBar>
        <Dialog
            open={LoginModal}
            onClose={() =>LoginModalChange(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={classes.askModalheader}
            maxWidth={false}
            width={400}
        >
            <DialogTitle id="alert-dialog-slide-title" className={classes.modalTitle}>
                <p>Login / Sign Up</p>
            
            </DialogTitle>
            {(!nextStep) && (
                <>
                <DialogContent className={classes.LoginModal}>
                    <GoogleLogin
                            
                        render={renderProps => (
                        <div className={classes.socialLoginButton} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <img src={require('../../assets/img/googlelogo.png')} alt="googlelogo"/>
                            <span>Login with Google</span>
                        </div>
                        )}
                        clientId="1063578959139-6qgr3gh5ophaalpsi7ej1777grft54td.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                        buttonText={'Login With Google'}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        className={classes.socialLoginButton}
                    />
                    <FacebookLogin
                        appId="746406599150239" //APP ID NOT CREATED YET
                        callback={responseFacebook}
                        render={renderProps => (
                            <div className={classes.socialLoginButton} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <img src={require('../../assets/img/facebooklogo.png')} alt="googlelogo"/>
                                <span>Login with Facebook</span>
                            </div>
                        )}
                    />
                    <div className={classes.divider}>
                        <span>OR</span>
                    </div>
                    <p style={{textAlign: 'center'}}>Or use your email address</p>
                    <TextField
                        error={emailError}
                        id="outlined-multiline-static"
                        label="Email address"
                        value={email}
                        style={{width: '100%', marginTop: '20px'}}
                        onChange={(e) => EmailChange(e)}
                        onBlur={emailErrorChange}
                        helperText={emailErrorMsg}
                        className={!continuDisabled ? classes.inputSuccess : ''}
                        type="email"
                    />
                </DialogContent>
                <DialogActions>
                    <Fab variant="extended" className={classes.loginContiuneButton} disabled={continuDisabled} onClick={emailCheck}>
                        Continue
                        {submitted && (
                            <CircularProgress size={20} style={{color: 'white', marginLeft: '15px'}}/>
                        )}
                        
                    </Fab>
                    
                </DialogActions>
                </>
            )}
            {nextStep && (
                <>
                <DialogContent className={classes.LoginModal}>
                    
                    <p style={{textAlign: 'center'}}>One Time Password has been sent to your email, <strong>{email}</strong>, please enter the same here to login. Valid for 10 minutes.</p>
                    {OTPField === "false" && (
                        <>
                        <TextField
                            error={nameError}
                            id="outlined-multiline-static"
                            label="Name"
                            value={name}
                            style={{width: '100%', marginTop: '20px'}}
                            onChange={(e) => NameChange(e)}
                            onBlur={nameErrorChange}
                            helperText={nameErrorMsg}
                        />
                        <TextField
                            error={phoneError}
                            id="outlined-multiline-static"
                            label="Phone Number"
                            value={phone}
                            style={{width: '100%', marginTop: '20px'}}
                            onChange={(e) => PhoneChange(e)}
                            onBlur={phoneErrorChange}
                            type="number"
                            helperText={phoneErrorMsg}
                        />
                        </>
                    )}
                    <span style={{cursor: 'pointer',position: 'relative', top: '60px', float: 'right', color: '#fbab7e', fontSize: '14px', marginTop: '-16px', zIndex: '100'}} onClick={ResendOTP}>Resend OTP</span>
                    <TextField
                        error={OPTError}
                        id="outlined-multiline-static"
                        label="Enter OTP"
                        value={OTP}
                        style={{width: '100%', marginTop: '20px'}}
                        onChange={(e) => OTPChange(e)}
                        onBlur={OTPErrorChange}
                        type="password"
                        helperText={OPTErrorMsg}
                    />
                    
                    {resendflg && (
                        <p style={{fontSize: '14px'}}>OTP Sent Successfully, please check your email for the OTP</p>
                    )}
                    
                </DialogContent>
                <DialogActions><>
                    {OTPField === "false" && (
                        <Fab variant="extended" className={classes.loginContiuneButton} disabled={(name !== "" && phone !== "" && !OPTError &&  OTP !== '') ? false : true} onClick={SignUp}>
                            Sign Up
                        </Fab>
                    )}
                    {OTPField === "true" && (
                        <Fab variant="extended" className={classes.loginContiuneButton} disabled={(!OPTError && OTP !== '') ? false : true} onClick={Login}>
                            Login
                        </Fab>
                    )}
                    
                </> 
                </DialogActions>
                <div style={{display: 'flex', alignItems: 'center', padding: '10px 175px', marginBottom: '20px'}} onClick={backTo}>
                    <ArrowBackIcon />
                    Go Back
                </div>
                </>
            )}
        </Dialog> 
        </>
    );
};

CourseHeader.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default CourseHeader;
