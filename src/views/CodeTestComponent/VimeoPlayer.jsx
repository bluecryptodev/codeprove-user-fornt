import React from "react";
import Vimeo from '@u-wave/react-vimeo';

import { connect } from 'react-redux';
// const useStyles = makeStyles(styles);
function VimeoPlayer(props) {

    const [top, setTop] = React.useState(Math.floor((Math.random() * props.height) + 1));
    const [left, setLeft] = React.useState(Math.floor((Math.random() * props.width) + 1));
    const [videoPlay, setVideoPlay] = React.useState(false);
  function VideoPlayChange() {
    setVideoPlay(true);
    var data = {
      "id": "last_video",
      "value": props.video
    };
    props.dispatch({
        type: 'UPDATE',
        data
    });
  }
  function VideoPauseChange() {
    setVideoPlay(false);
  }
  React.useEffect(() => {
    var timer = setInterval(function () {
        setTop(Math.floor((Math.random() * (props.height-64)) + 64));
        setLeft(Math.floor((Math.random() * (props.width-400)) + 1));

    }, 2000);
    return function cleanup() {
        clearTimeout(timer);
    }
  }, [props]);
  return (
        <div style={{background: 'black'}} >
            <Vimeo 
                video={props.video}
                height={props.height} 
                width= {props.width}
                onPlay={VideoPlayChange}
                onPause={VideoPauseChange}
                className = "vimeo-video-player-custom"
            />
            {videoPlay && (
                <p 
                    style={{
                        position: 'absolute', 
                        width: '400px', 
                        textAlign: 'center', 
                        color: 'white', 
                        margin: '0px', 
                        padding: '10px', 
                        display: 'inline-block', 
                        zIndex: 100, 
                        top: top, 
                        right: left
                    }}
                >
                    {props.user_data.email}
                </p>
            )}
            
        </div>
    
  );
}
const mapStateToProps = (state) => {
  return {
    posts: state
  }
}

export default connect(mapStateToProps)(VimeoPlayer);