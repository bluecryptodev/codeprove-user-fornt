import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SendIcon from '@material-ui/icons/Send';
import InputIcon from '@material-ui/icons/Input';
import KeyboardOutlinedIcon from '@material-ui/icons/KeyboardOutlined';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import { connect } from 'react-redux';
import styles from '../../assets/jss/codetest/contentfooter.js';

import {codereivew} from '../../Function/CodeReview.js';
import {custome_update} from '../../Function/User.js';

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

function ContentNavbar(props) {
  const classes = useStyles();
  const [sampleExcute, setSampleExcute] = React.useState(false);
  const [prevFlg, setPrevFlg] = React.useState(true);
  const [nextFlg, setNextFlg] = React.useState(false);
  const [keyboardDialog, setKeyboardDialog] = React.useState(false);
  const [testInput, setTestInput] = React.useState([]);
  const [testOutput, setTestOutput] = React.useState([]);

  // const testInput = ['2 1', '3 2', '1 4', '0 0', '6 1', '9 0'];
  // const testOutput = ['2', '9', '1', '1', '6', '1'];
  function customeInputTab() {
    var data = {
      "id": "code_submit",
      "value": 'true'
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
    data = {
      "id": "submission_tab",
      "value": 1
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
  }
  function codeSend() {
    var data = {
      "id": "code_submit",
      "value": 'true'
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
    data = {
      "id": "submission_tab",
      "value": 0
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
    var data2 = {
      code: props.posts[2].value,
      status: []
    }
    var data1 = props.posts[5].value.concat(data2);
    data = {
      "id": "test_result",
      "value": data1
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });  
    setSampleExcute(true);
    var lng = '';
    var solutionfilename = '';
    var mainfilename = '';
    if(props.posts[2].value === 'python')
    {
      lng = 'python';
      mainfilename = 'main.py';
      solutionfilename = 'Solution.py';
    }
    else if(props.posts[2].value === 'c_cpp'){
      lng = 'cpp';
      solutionfilename = 'Solution.h';
      mainfilename = 'main.cpp';
    }
    else {
      lng = 'java';
      solutionfilename = 'Solution.java';
      mainfilename = 'main.java';
    }
    for(var i = 0; i < testInput.length; i++){
      valueCompair(lng, mainfilename, solutionfilename, testInput[i], testOutput[i])
    }  
    
  }
  var count = 0;
  var timerval = '';
  var timer = 0;
  function timerRun(){
    timer++;
    timerval = setTimeout(timerRun, 1);
  }
  var re = [false, false, false, false, false, false];
  var runtimeflg = [false, false, false, false, false, false];
  var runtimemsg = ['', '', '', '', '', ''];
  var score1 = 0;
  function valueCompair(lng, filename, solutionfilename, inp, out){
    
    var data = {};
    if(props.posts[3].value === ''){
      data = {
        url: 'https://run.glot.io/languages/'+lng+'/latest',
        jsondata: {
          "stdin": inp,
          "files": [
            {
              "name": solutionfilename,
              "content": props.posts[11].value,
              'time': ''
            }
          ]
        }
      }
    }
    else {
      data = {
        url: 'https://run.glot.io/languages/'+lng+'/latest',
        jsondata: {
          "stdin": inp,
          "files": [
            {
              "name": filename,
              "content": props.posts[3].value,
              'time': ''
            },
            {
              "name": solutionfilename,
              "content": props.posts[11].value,
              'time': ''
            }
          ]
        }
      }
    }
    
    codereivew(data).then(res => {
      var flg1 = props.posts[15].value;
      var flg2 = props.posts[15].value;
      var score = 0;
      var submite_result_status = "true";
      for(var k = 0; k < props.itemlist.length; k++){
        if(props.posts[0].value === props.itemlist[k]._id){
          score = parseFloat(props.itemlist[k].score);
        }
      }
      for(var i = 0; i < testInput.length; i++){
        if(testInput[i] === inp){
          if(res.stdout.includes(out) || res.stdout.includes("Error occurred during initialization of VM")){
            re[i] = true;
            score1+=score/6;
            for(var j = 0; j < props.itemlist.length; j++){
              if(props.posts[0].value === props.itemlist[j]._id){
                flg1[j] = "true";
              }
            }  
          }
          else {
            re[i] = false;
            for(j = 0; j < props.itemlist.length; j++){
              if(props.posts[0].value === props.itemlist[j]._id){
                if(flg2[j] !== "true"){
                  flg1[j] = "false";
                  submite_result_status = "false"
                }
              }
            }  
          }
          if(res.stderr !== ''){
            runtimeflg[i] = true;
            runtimemsg[i] = res.stderr
          }
          else {
            runtimeflg[i] = false;
            runtimemsg[i] = res.stderr
          }
        }
      }
      timerRun();
      count++;
      if(count === 6){
        setSampleExcute(false);
        clearTimeout(timerval);
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
        var lecture_score = props.posts[16].value;
        var item_score = 0;
        for(j = 0; j < props.itemlist.length; j++){
          if(props.posts[0].value === props.itemlist[j]._id){
            lecture_score = props.posts[16].value - props.posts[17].value[j];
            if(props.posts[17].value[j] <= score1){
              item_score = score1;
            }
            else {
              item_score = props.posts[17].value[j];
            }
          }
        }  
        count = 0;
        var data2 = {
          code: props.posts[2].value,
          status: re,
          time: timer,
          runtimeflg: runtimeflg,
          runtimemsg: runtimemsg,
          mainfile: props.posts[3].value,
          solutionfile: props.posts[11].value,
          score: score1
        }
        var data1 = props.posts[5].value.concat(data2);
        
        data = {
          id: localStorage.userToken,
          solutio_view: props.posts[18].value,
          item_id: props.posts[0].value,
          lecture_id: props.lecture_id,
          data: data1,
          lecture_score: lecture_score,
          item_score: item_score,
          submite_result_status: submite_result_status,
          code_mode: props.posts[2].value,
          deadline_date: props.deadline,
          me_code: {main: props.posts[3].value, your: props.posts[11].value},
          pause_days: parseInt(props.pausedays),
          flg: 'submit_list',
        };
        custome_update(data).then(res => {
          data = {
            "id": "total_score",
            "value": res.lecture_socre
          };
          props.dispatch({
              type: 'UPDATE',
              data
          });
          for(j = 0; j < props.itemlist.length; j++){
            if(props.posts[0].value === props.itemlist[j]._id){
              props.posts[17].value[j] = res.item_score
            }
          }
          data = {
            "id": "individual_score",
            "value": props.posts[17].value
          };
          props.dispatch({
              type: 'UPDATE',
              data
          });
          data1[data1.length-1].score = res.item_score;
          data = {
            "id": "test_result",
            "value": data1
          };
          props.dispatch({
              type: 'UPDATE',
              data
          });
        })
      }
      
    })
    .catch(err => {
      console.log(err)
    })
  }
  function orderID(value) {
    if(value){
      for(var i = 0; i < props.itemlist.length; i++){
        if(props.itemlist[i]._id === props.posts[0].value){
          // console.log(i)
          if(i+2 === props.itemlist.length){
            setNextFlg(true);

          }
          setPrevFlg(false);
          var data = {
            "id": "lecture_id",
            "value": props.itemlist[i+1]._id
          };
          props.dispatch({
              type: 'UPDATE',
              data
          });
          data = {
            "id": "lecture_type",
            "value": props.itemlist[i+1].type
          };
          props.dispatch({
              type: 'UPDATE',
              data
          });
          data = {
            "id": "lecture_title",
            "value": props.itemlist[i+1].title
          };
          props.dispatch({
              type: 'UPDATE',
              data
          });

        }
      }
    }
    else {
      for(i = 0; i < props.itemlist.length; i++){
        if(i-1 === 0){
          setPrevFlg(true);

        }
        setNextFlg(false);
        if(props.itemlist[i]._id === props.posts[0].value){
          data = {
            "id": "lecture_id",
            "value": props.itemlist[i-1]._id
          };
          props.dispatch({
              type: 'UPDATE',
              data
          });
          data = {
            "id": "lecture_type",
            "value": props.itemlist[i-1].type
          };
          props.dispatch({
              type: 'UPDATE',
              data
          });
          data = {
            "id": "lecture_title",
            "value": props.itemlist[i-1].title
          };
          props.dispatch({
              type: 'UPDATE',
              data
          });
        }
      }
    }
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
  function keyboardChange(value) {
    setKeyboardDialog(value)
  }
  function answerReview() {
    var flg1 = props.posts[15].value;
    var indi = props.posts[17].value;
    var submite_result_status = "";
    var item_score = 0;
    var lecture_score = props.posts[16].value;
    
    for(var i = 0; i < props.itemlist.length; i++){
      if(props.itemlist[i]._id === props.posts[0].value){
        var flg = props.itemlist[i].sample_output.length === props.posts[20].value.length && props.itemlist[i].sample_output.sort().every(function(value, index) { return value === props.posts[20].value.sort()[index]});
        lecture_score = props.posts[16].value - indi[i];
        if(flg){
          flg1[i] = 'true';
          
          indi[i] = props.itemlist[i].score;
          item_score = props.itemlist[i].score;
          submite_result_status = "true";
        }
        else {
          flg1[i] = 'false';
          submite_result_status = 'false';
          item_score = props.posts[17].value[i];
        }
      }
    }
    var data = {
      "id": "submit_result",
      "value": flg1
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
    data = {
      id: localStorage.userToken,
      item_id: props.posts[0].value,
      lecture_id: props.lecture_id,
      lecture_score: lecture_score,
      item_score: item_score,
      submite_result_status: submite_result_status,
      data: props.posts[20].value,
      deadline_date: props.deadline,
      pause_days: parseInt(props.pausedays),
      flg: 'puzzle',
    };
    custome_update(data).then(res => {
      data = {
        "id": "total_score",
        "value": res.lecture_socre
      };
      props.dispatch({
          type: 'UPDATE',
          data
      });
      for(var j = 0; j < props.itemlist.length; j++){
        if(props.posts[0].value === props.itemlist[j]._id){
          props.posts[17].value[j] = res.item_score
        }
      }
      data = {
        "id": "individual_score",
        "value": props.posts[17].value
      };
      props.dispatch({
          type: 'UPDATE',
          data
      });
      console.log(res)
    })
  }
  React.useEffect(() => {
    for(var i = 0; i < props.itemlist.length; i++){
      if(props.itemlist[i]._id === props.posts[0].value){
        setTestInput(props.itemlist[i].test_input)
        setTestOutput(props.itemlist[i].test_output)
        setPrevFlg(false);
        setNextFlg(false);
        if(i === 0){
          setPrevFlg(true);
        }
        if(i === props.itemlist.length-1){
          setNextFlg(true);
        }
      }
    }
  }, [props])
  return (
      <div className={classes.footer}>
        <ReactNotifications />
        <Button
          size="small"
          startIcon={<ArrowBackIosIcon />}
          className={classes.button}
          onClick={() => orderID(false)}
          disabled={prevFlg ? true : false}
        >
          PREVIOUS
        </Button>
        <Button
          size="small"
          endIcon={<ArrowForwardIosIcon />}
          className={classes.button}
          onClick={() => orderID(true)}
          disabled={nextFlg ? true : false}
        >
          NEXT
        </Button>
        {(props.posts[1].value === 'code') && (
          <div className={classes.submitpart}>
            <Button
              size="small"
              startIcon={<InputIcon />}
              className={classes.button}
              onClick={customeInputTab}
            >
              CUSTOM INPUT
            </Button>
            <Button
              size="small"
              startIcon={<SendIcon />}
              className={classes.button+" "+classes.submitbutton}
              onClick={codeSend}
              disabled={sampleExcute ? true : false}
            >
              SUBMIT
            </Button>
          </div>
        )}
        {(props.posts[1].value === 'puzzle') && (
          <div className={classes.submitpart}>
            
            <Button
              size="small"
              startIcon={<SendIcon />}
              className={classes.button+" "+classes.submitbutton}
              onClick={answerReview}
              disabled={props.posts[20].value.length === 0 ? true : false}
            >
              SUBMIT
            </Button>
          </div>
        )}
        {props.posts[1].value === 'code' && (
          <IconButton aria-label="delete" className={classes.keyboardIconbutton} onClick={() => keyboardChange(true)}>
            <KeyboardOutlinedIcon fontSize="small" />
          </IconButton>  
        )}
         <Dialog
            open={keyboardDialog}
            onClose={() =>keyboardChange(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={classes.askModalheader}
            // fullWidth={true}
            maxWidth={false}
        >
            <DialogTitle id="alert-dialog-slide-title" className={classes.modalTitle}>
              <p>Keyboard Shortcuts</p>
              <IconButton aria-label="delete" className={classes.keyboardIconbutton+" "+classes.keyboardModalClose} onClick={() => keyboardChange(false)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </DialogTitle>
            <DialogContent className={classes.keyboardList}>
              <h2>Editor</h2>
              <hr className={classes.hrclass}/>
                <p>
                  <span>Ctrl + Space</span>
                  <span>Auto Complete</span>
                </p>
                <p>
                  <span>Tab</span>
                  <span>Indent More</span>
                </p>
                <p>
                  <span>Shift + Tab</span>
                  <span>Indent Less</span>
                </p>
                <p>
                  <span>Ctrl/⌘ + /</span>
                  <span>Comment</span>
                </p>
                <p>
                  <span>Ctrl + I</span>
                  <span>Smart Indent</span>
                </p>
            </DialogContent>
            
        </Dialog> 
      </div>
  );
}
const mapStateToProps = (state) => {
    return {
      posts: state
    }
  }
  
export default connect(mapStateToProps)(ContentNavbar)