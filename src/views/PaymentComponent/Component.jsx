import React from "react";
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
// import MuiPhoneNumber  from 'material-ui-phone-number';
import ReactPhoneInput from 'react-phone-input-mui';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//icon

import { makeStyles } from '@material-ui/core/styles';


import { connect } from 'react-redux';

import styles from '../../assets/jss/payment/content.js';
import {user_get, user_update} from '../../Function/User.js';
import {course_get, course_update} from '../../Function/Courses.js';
import {lecture_get} from '../../Function/Lectures.js';
import { item_from_course} from '../../Function/LectureItems.js';
import {payment_get, payment_add, invoice, invoice_send} from '../../Function/PaymentList.js';

const useStyles = makeStyles(styles);
const useStylesFacebook = makeStyles({
    root: {
      position: 'relative',
    },
    top: {
      color: '#eef3fd',
    },
    bottom: {
      color: '#6798e5',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
    },
});
function FacebookProgress(props) {
    const classes = useStylesFacebook();
  
    return (
      <div className={classes.root}>
        <CircularProgress
          variant="determinate"
          value={100}
          className={classes.top}
          size={50}
          thickness={4}
          {...props}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.bottom}
          size={50}
          thickness={4}
          {...props}
        />
      </div>
    );
  }
function CourseOverView(props) {
    const classes = useStyles();
    const [courseList, setCourseList] = React.useState({});
    const [userInfo, setUserInfo] = React.useState({});
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [userEmail, setUserEmail] = React.useState("");
    const [balanceAmount, setBalanceAmount] = React.useState(0);
    const [invoiceCount, setInvoiceCount] = React.useState(0);
    const [payProgress, setPayProgress] = React.useState(false);
    // function eventChange() {
    //     props.history.push('/classroom-event');
    // }
    // function courseChange() {
    //     props.history.push('/classroom-course');
    // }
    function phoneNumberChange(target, formattedNumber, selectedCountry, rawValue) {
        setPhoneNumber(target)
    }
    function persnolInfoChange(e){
        if(e.target.name === 'name') {
            setUserName(e.target.value);
        }
        else {
            setUserEmail(e.target.value);
        }
    }
    function dateFormate(date1) {
        var monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ];
        var weekNmaes = [
            'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
        ];
        var monthIndex = date1.getMonth();
        var year = date1.getFullYear();
        var day = date1.getDate();
        var weekIndex = date1.getDay();
        return weekNmaes[weekIndex]+", "+day+" "+monthNames[monthIndex]+" "+year;
    }
    function pay() {
        var phone_num = phoneNumber.replace(/\s/g, '').replace(/-/g, '')
        const options = {
            key: "rzp_test_sIORQ7rW8eT9l1",
            amount: (parseInt(props.price)+1320)*100,
            name: 'Payments',
            description: courseList.title,

            handler(response) {
                const paymentId = response.razorpay_payment_id;
                const url = props.server+'payment/razorpay/'+paymentId+'/'+(parseInt(props.price)+1320)*100;
                // Using my server endpoints to capture the payment
                fetch(url, {
                method: 'get',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
                })
                .then(resp =>  resp.json())
                .then(function (data) {
                    setPayProgress(true)
                    var course1 = false;
                    var batch_file = '';
                    var batch_status = '';
                    var batch_date = new Date(parseInt(props.date));
                    if(batch_date.getDate() === 1) {
                        batch_file = "batch_"+(batch_date.getMonth()+1)+"_"+1;
                        batch_status = '1'
                    }
                    else {
                        batch_file = "batch_"+(batch_date.getMonth()+1)+"_"+2;
                        batch_status = '2'
                    }
                    // var lecture_id = '';
                    var course = {
                        id: props.id,
                        pay_status: 'pay',
                        batch_status: batch_status,
                        batch_file: batch_file,
                        start_date: props.date,
                        remain_days_list: [0],
                        remain_date_list: [],
                        pause: false,
                        step_status: ''
                    }
                    for(var j = 0; j < userInfo.course_list.length; j++) {
                        if(userInfo.course_list[j].id === props.id){
                            userInfo.course_list[j] = course;
                            course1 = true;
                        }
                    }
                    if(!course1) {
                        userInfo.course_list.push(course);
                    }
                    data = {
                        id: props.id,
                        course: 'from_course'
                    }
                    lecture_get(data).then(res => {
                        
                        for(var i = 0; i < res.length; i++){
                            var lecture_flg = false;
                            var lecture = {
                                id: res[i]._id,
                                score: 0,
                                step_status: ''
                            }
                            var user_lecture = userInfo.lecture_list;
                            for(j = 0; j < userInfo.lecture_list.length; j++) {
                                if(userInfo.lecture_list[j].id === res[i]._id){
                                    userInfo.lecture_list[j] = lecture;
                                    lecture_flg = true;
                                }
                            }
                            if(!lecture_flg) {
                                userInfo.lecture_list.push(lecture);
                            }
                        }
                        userInfo.lecture_list = user_lecture;
                        data = {
                            id: props.id
                        }
                        item_from_course(data).then(res => {
                            for(var i = 0; i < res.length; i++){
                                var lecture_item = {
                                    id: res[i]._id,
                                    solution_view: false,
                                    submit_status: "",
                                    lecture_id: res[i].lecture_id,
                                    score: 0,
                                    submit_list: [],
                                    cpp_code: '',
                                    java_code: '',
                                    python_code: ''
                                }
                                for(j = 0; j < userInfo.lecture_content_list.length; j++) {
                                    if(userInfo.lecture_content_list[j].id === res[i]._id){
                                        userInfo.lecture_content_list[j] = lecture_item;
                                    }
                                }
                            }
                            // url1 = url1+lecture_id+"/"+res[0]._id+"/"+props.date;
                            user_update(userInfo).then(res => {
                                var batch_data = courseList.batch_members;
                                for(var i = 0; i < batch_data.length; i++){
                                    if(batch_data[i].id === batch_file){
                                        if(!batch_data[i].members.includes(localStorage.userToken)){
                                            batch_data[i].members.push(localStorage.userToken);
                                        }
                                    }
                                }
                                data = {
                                    id: courseList._id,
                                    batch_members: batch_data
                                }
                                course_update(data).then(res => {
                                    data = {
                                        razorpay_payment_id: paymentId,
                                        user_id: localStorage.userToken,
                                        user_email: userEmail,
                                        invoice_number: 'INV ' + (invoiceCount+1),
                                        description: "payment for "+courseList.title,
                                        pay_amount: (parseInt(props.price)+1320),
                                        balance: balanceAmount+(parseInt(props.price)+1320)
                                    }
                                    payment_add(data).then(res => {
                                        var data1 = data;
                                        invoice(data1).then(res => {
                                            console.log(res);
                                            data = {
                                                email: userEmail,
                                                invoice_number: 'INV ' + (invoiceCount+1),
                                            }
                                            invoice_send(data).then(res => {
                                                console.log(res);
                                                window.location.href = '/classroom-course';
                                                setPayProgress(false);
                                            })
                                            
                                        })
                                        // window.location.href = '/classroom-course';
                                    })
                                })
                            })
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
                })
                .catch(function (error) {
                    console.log('Request failed', error);
                });
            },

            prefill: {
                name: userName,
                email: userEmail,
                contact: phone_num
            },
            notes: {
                address: 'Goa,India',
            },
            theme: {
                color: '#9D50BB',
            },
        };
        const rzp1 = new window.Razorpay(options);

        rzp1.open();
    }
    React.useEffect(() => {
        var data = {
            id: props.id
        }
        course_get(data).then(res => {
            setCourseList(res);
        })
        data = {
            id: localStorage.userToken
        }
        user_get(data).then(res => {
            setUserInfo(res);
            setUserName(res.username);
            setUserEmail(res.email);
            setPhoneNumber(res.phone_number);
        })
        data = {

        }
        payment_get(data).then(res => {
            var amount = 0;
            for(var i = 0; i < res.length; i++){
                amount += res[i].pay_amount;
            }
            setInvoiceCount(res.length)
            setBalanceAmount(amount);
        })
        .catch(err => {
            console.log(err);
        })
    }, [props]);
    return (
        <>
        <Container >
            <Grid container spacing={3} className={classes.Content1}>
                <Grid item xs={12} sm={6} md={8}>
                    <Paper elevation={3} className={classes.personalDetails}>
                        <p className="title-text">Personal Details</p>
                        <Grid container spacing={3} className={classes.Content1}>
                            
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField required id="name-required" label="Your Name" value={userName} name="name" onChange={persnolInfoChange} style={{width: '100%', marginTop: '20px'}}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField required id="email-required" label="Email" value={userEmail} name="email" onChange={persnolInfoChange} style={{width: '100%', marginTop: '20px'}}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                {/* <MuiPhoneNumber value={phoneNumber} required defaultCountry={'in'} label="Contact Number" onChange={phoneNumberChange} countryCodeEditable={false}/> */}
                                <ReactPhoneInput
                                    value={phoneNumber}
                                    defaultCountry={'in'}
                                    onChange={phoneNumberChange}
                                    inputClass={classes.field}
                                    dropdownClass={classes.countryList}
                                    component={TextField}
                                    countryCodeEditable={false}
                                    inputStyle={{width: '100%', marginTop: '20px'}}
                                    inputExtraProps={{
                                        autoComplete: 'phone',
                                        name: 'custom-username',
                                        label: "Contact Number",
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper elevation={3} className={classes.orderDetails}>
                        <p className="title-text">Order Details</p>
                        <Grid container spacing={3} className={classes.Content1}>
                            <Grid item xs={12} sm={6} md={6}>
                                <div className="details-content">
                                    <p>Product Name</p>
                                    <p>{courseList.title}</p>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <div className="details-content">
                                    <p>Starting From</p>
                                    <p>{dateFormate(new Date(parseInt(props.date)))}</p>
                                </div>
                            </Grid>
                            
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} className={classes.paymentPart}>
                        <p className="title-text">Price Breakdown</p>
                        <div className="content-row">
                            <p className="title-text left">Fees</p>
                            <p className="title-text right">INR {props.price}</p>
                        </div>
                        <p className="color-red">{dateFormate(new Date(parseInt(props.date)))}</p>
                        <br />
                        <div className="content-row">
                            <p className="add-payment left"><img src={require('../../assets/img/payment/coupon.png')} alt="..."/>Alumni_AdvanceCourses10P</p>
                            <p className="right" style={{marginTop: '6px'}}> - INR 1320</p>
                        </div>
                        <div className="content-row">
                            <p className="add-payment left"><img src={require('../../assets/img/payment/tax.png')} alt="..."/>Taxes</p>
                            <p className="right" style={{marginTop: '6px'}}> + 9% CGST+ 9% SGST</p>
                        </div>
                        <hr />
                        <div className="content-row">
                            <p className="title-text left">Net Amount to be Paid</p>
                            <p className="title-text right">INR {parseInt(props.price)+1320}</p>
                        </div>
                        <p style={{float: 'right', textAlign: 'right', fontSize: '12px', color: 'rgba(0,0,0,0.5)'}}>Price inclusive of all taxes.</p>
                        <br />
                        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                            <Button 
                                variant="contained" 
                                className="pay-button" 
                                onClick={pay}
                                disabled={(userName !== "" && userEmail !== "" && phoneNumber !== undefined && phoneNumber !== "") ? false : true}
                            > 
                                Proceed to Pay 
                            </Button>
                        </div>
                        
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        {payProgress && (
            <div style={{position: 'absolute', width: '100%', height: '100%', top: '0px', left: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.3)', zIndex: '1000'}}>
                <FacebookProgress />
            </div>
        )}
        </>
    );
    }
    const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(withRouter(CourseOverView));