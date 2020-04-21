import React from "react";

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';


//icon
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/core/styles';


import { connect } from 'react-redux';
import {custome_update} from '../../../Function/User.js';

import styles from '../../../assets/jss/classroom/content.js';
import {json_file_read} from '../../../Function/Courses.js';
import {now_time_get} from '../../../Function/Time.js';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const useStyles = makeStyles(styles);
function CourseOverView(props) {
    const classes = useStyles();
    const [remainDays, setRemainDays] = React.useState(1);
    const [remaiDaysList, setRemainDaysList] = React.useState([]);
    const [remainDate, setRemainDate] = React.useState();
    const [courseStartDate, setCourseStartDate] = React.useState("");
    const [courseEndDate, setCourseEndDate] = React.useState("");
    const [pauseDays, setPauseDays] = React.useState("");
    const [pauseConfirmOpen, setPauseConfirmOpen] = React.useState(false);
    const [pauseDateList, setPauseDateList] = React.useState([]);
    const [index, setIndex] = React.useState(0);
    const [pauseDays1, setPauseDays1] = React.useState(0);
    const [nowDate, setNowDate] = React.useState(new Date().toString());

    function remainDayChange(e) {
        setRemainDays(e.target.value)
        setRemainDate(addDays(parseInt(e.target.value)));
    }
    function pauseConfirmChange(value) {
        setPauseConfirmOpen(value);
    }
    function resumeCourse() {
        for(var i = 0; i < props.userdata.course_list.length; i++) {
            if(props.userdata.course_list[i].id === props.courselist._id){
                setIndex(i);
                const date1 = new Date(parseInt(props.userdata.course_list[i].remain_date_list[props.userdata.course_list[i].remain_date_list.length-1].start));
                const date2 = new Date(nowDate);
                const diffTime = Math.abs(date2 - date1);
                var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                props.userdata.course_list[i].remain_date_list[props.userdata.course_list[i].remain_date_list.length-1].end = dateFormate(new Date(nowDate));
                props.userdata.course_list[i].remain_date_list[props.userdata.course_list[i].remain_date_list.length-1].status = 'your';
                props.userdata.course_list[i].remain_days_list[props.userdata.course_list[i].remain_days_list.length-1] = parseInt(diffDays);
                props.userdata.course_list[i].pause = false;
            }
        }
        var data = {
            id: localStorage.userToken,
            data: props.userdata.course_list,
            flg: 'pause'
        }
        console.log(props.userdata.course_list);
        setPauseDays(pauseDays+parseInt(pauseDays1)-parseInt(diffDays))
        custome_update(data).then(res => {
            console.log(res);
        });
    }
    function coursePause(value) {
        setPauseConfirmOpen(value);
        var date = {
            start: (new Date(nowDate)).getTime(),
            end: remainDate,
            status: 'progress'
        }
        for(var i = 0; i < props.userdata.course_list.length; i++) {
            if(props.userdata.course_list[i].id === props.courselist._id){
                setIndex(i);
                props.userdata.course_list[i].remain_date_list.push(date);
                props.userdata.course_list[i].remain_days_list.push(parseInt(remainDays));
                props.userdata.course_list[i].pause = true;
            }
        }
        var data = {
            id: localStorage.userToken,
            data: props.userdata.course_list,
            flg: 'pause'
        }
        setPauseDays(pauseDays-parseInt(remainDays))
        custome_update(data).then(res => {
            console.log(res);
        });
    }
    function addDays(days) {
        var result = new Date(nowDate);
        result.setDate(result.getDate() + days);
        var monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ];
        var week = [
            'Sun', 'Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat' 
        ]
        var monthIndex = result.getMonth();
        var weekIndex = result.getDay();
        var day = result.getDate();
        var year = result.getFullYear();
        return week[weekIndex]+", "+monthNames[monthIndex]+" "+day+", "+year;
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
    function totalDays(total, num) {
        return total + num;
    }
    React.useEffect(() => {
        var day = [];
        for(var i = 0; i < parseInt(props.courselist.remain_days); i++){
            day[i] = i+1;
        }
        setRemainDaysList(day);
        var data = {}
        for(var j = 0; j < props.userdata.course_list.length; j++){
            if(props.courselist._id === props.userdata.course_list[j].id){
                data.filename = props.userdata.course_list[j].batch_file+".txt"
            }
        }
        json_file_read(data).then(res => {
            for(var i = 0; i < props.userdata.course_list.length; i++) {
                if(props.userdata.course_list[i].id === props.courselist._id){
                    setIndex(i);
                    setPauseDays1(props.userdata.course_list[i].remain_days_list.reduce(totalDays));
                    setPauseDays(parseInt(props.courselist.remain_days)-props.userdata.course_list[i].remain_days_list.reduce(totalDays));
                    setPauseDateList(props.userdata.course_list[i].remain_date_list);
                    if(props.userdata.course_list[i].batch_status === '1'){
                        setCourseStartDate(dateFormate(new Date(res.release_date[0])))
                        setCourseEndDate(dateFormate(new Date(res.batch_end_date)))
                    }
                    else {setCourseStartDate(dateFormate(new Date(res.release_date[0])))
                        setCourseEndDate(dateFormate(new Date(res.batch_end_date)))
                    }
                }
            }
        })
        data = {}
        now_time_get(data).then(res => {
            setNowDate(res)
            var result = new Date(res);
            result.setDate(result.getDate() + 1);
            var monthNames = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
            ];
            var week = [
                'Sun', 'Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat' 
            ]
            var monthIndex = result.getMonth();
            var weekIndex = result.getDay();
            var day = result.getDate();
            var year = result.getFullYear();
            setRemainDate(week[weekIndex]+", "+monthNames[monthIndex]+" "+day+", "+year)
        })
        
    }, [props]);
    return (
        <div className={classes.container}>
            <div className={classes.doubtContent}>
                <Grid container spacing={3} className={classes.Content1}>
                    <Grid item xs={12} sm={6} md={10}>
                        <Grid container spacing={3} className={classes.Content1}>
                            <Grid item xs={12} sm={6} md={10}>
                                {!props.userdata.course_list[index].pause && (<>
                                    <h2>Course Pause</h2>
                                    <p>You can use this feature to put your course on hold for few days. All the dates including future deadlines, videos availability and TA support date will be shifted accordingly.</p>
                                    <p>You can pause the course for a total of <strong>{props.courselist.remain_days} days</strong>. Since you have a limited number of days to pause the course, use it judiciously.</p>
                                    <FormControl className={classes.formControl} style={{width: '300px'}}>
                                        <Select 
                                            value={remainDays} 
                                            onChange={remainDayChange} 
                                            displayEmpty 
                                            className={classes.selectEmpty}
                                            input={<Input />}
                                            MenuProps={MenuProps}
                                        >
                                            {remaiDaysList.map(function (item, i){
                                                return (
                                                    <MenuItem value={item} key={i}>{item}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                    <p>Pause upto: <strong>{remainDate}</strong></p>
                                </>)}
                                {props.userdata.course_list[index].pause && (<>
                                    <h2>Course Paused</h2>
                                    <p>Course paused till <strong style={{color: 'green'}}>{props.userdata.course_list[index].remain_date_list[props.userdata.course_list[index].remain_date_list.length-1].end}</strong></p>
                                </>)}
                                {!props.userdata.course_list[index].pause && (
                                    <Button variant="contained" className={classes.pauseButton} onClick={() => pauseConfirmChange(true)}>
                                        Pause
                                    </Button>
                                )}
                                {props.userdata.course_list[index].pause && (<>
                                    <Button variant="contained" className={classes.pauseButton} onClick={() => resumeCourse(true)} >
                                        Resume
                                    </Button>
                                    <p><ErrorIcon /> If you resume now, <strong>1 day</strong> will be deducted from total pause days. </p>
                                </>)}
                                <hr />
                                <div className={classes.importantPart}>
                                    <h4>Important Points :-</h4>
                                    <ul>
                                        <li>You can pause the course for a <strong>minimum</strong> of <strong>1 day</strong> and a <strong>maximum</strong> of <strong>20 days</strong></li>
                                        <li>After every pause, <strong>minimum 1 day</strong> will be deducted from total pause days. And course can be resumed anytime you want.</li>
                                        <li>While the course is paused, you won’t be able to access the course content including problems, videos, notes etc. In case you want to access any content, you need to resume the course first.</li>
                                        <li>You can use this course pause feature till end of your video availability i.e. till <strong>{courseEndDate}</strong></li>
                                    </ul>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={2}>
                                <h1>{pauseDays}</h1>
                                <p>DAYS REMAINING</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <h2>Course History</h2>
                        <div className={classes.courseHistory}>
                            <div className="history-list">
                                <div className="dot"></div>
                                <div className="history-date">
                                    <p>{courseStartDate}</p>
                                    <p>Batch Starts</p>
                                </div>
                            </div>
                            {pauseDateList.map(function(item, i){
                                return(
                                    <div key={i}>
                                    <div className="dot-line"></div>
                                    <div className="history-list">
                                        <div className="dot"></div>
                                        <div className="history-date">
                                            <p>{dateFormate(new Date(parseInt(item.start)))}</p>
                                            <p>You paused the course for {props.userdata.course_list[index].remain_days_list[i+1]} day(s)</p>
                                        </div>
                                    </div>
                                    <div className="dot-line-pause"></div>
                                    <div className="history-list">
                                        <div className="dot"></div>
                                        <div className="history-date">
                                            <p>{item.end}</p>
                                            {item.status === 'progress' && (
                                                <p>You course will resume after {props.userdata.course_list[index].remain_days_list[i+1]} day(s) from pause date</p>
                                            )}
                                            {item.status === 'auto' && (
                                                <p>Course was resumed automatically</p>
                                            )}
                                            {item.status === 'your' && (
                                                <p>You resumed the course on {item.end}</p>
                                            )}
                                        </div>
                                    </div>
                                    </div>
                                )
                            })}
                            <div className="dot-line"></div>
                            <div className="history-list">
                                <div className="dot"></div>
                                <div className="history-date">
                                    <p>{courseEndDate}</p>
                                    <p>Batch Ends</p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                
                <Dialog
                    open={pauseConfirmOpen}
                    onClose={() =>pauseConfirmChange(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className={classes.askModalheader}
                    // fullWidth={true}
                    maxWidth={'sm'}
                >
                    <DialogTitle id="alert-dialog-slide-title" className={classes.modalTitle}>
                        <strong>Pause Course?</strong><br />
                        Course will be paused till <strong>{remainDate}</strong>
                    </DialogTitle>
                    <DialogContent className={classes.modalContent}>
                        <p style={{padding: '10px'}}>Before you continue, please note -</p>
                        <ul>
                            <li>Your course will be automatically resumed on <strong>{remainDate}</strong>, though you can resume it anytime before that.</li>
                            <li>If you resume the course after x days and few hours, x+1 days will be deducted. For e.g. if you resume after <strong>2 days and 5 hours, 3 pause days will be deducted.</strong></li>
                            <li>All the future deadlines, video availability and TA support availability will be shifted by 1 day (if you don’t resume before <strong>{remainDate}</strong>).</li>
                        </ul>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() =>{pauseConfirmChange(false)}} variant="contained">
                            Cancel
                        </Button>
                        <Button onClick={() =>{coursePause(false)}} variant="contained">
                            PAUSE
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
    }
    const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(CourseOverView);