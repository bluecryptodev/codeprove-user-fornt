import React from 'react';
import Clappr from 'clappr';
import LevelSelector from 'level-selector'
// import '../../assets/css/testcode.css';
class ClapprComponent extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.h = ''
    this.state = {
      titleview: false,
      urlvalidate: false,
      play: false,
      top: Math.floor((Math.random() * this.props.height) + 1),
      left: Math.floor((Math.random() * this.props.width) + 1),
      video_play: false
    }
    this.VideoPlay = this.VideoPlay.bind(this);
    this.VideoPause = this.VideoPause.bind(this);
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   let changed = (nextProps.source !== this.props.source);
  //   if (changed) {
  //     this.change(nextProps.source);
  //   }
  //   return false;
  // }
  componentDidUpdate(prevProps, nextState) {
    let changed = (prevProps.source !== this.props.source);
    if (changed) {
      this.change(this.props.source);
    }
    return false;
  }
  
  componentDidMount() {
    var height = this.props.height;
    var width = this.props.width
    this._isMounted = true;
    this._isMounted && this.change(this.props.source);
    this.h = setInterval(function () {
      this.setState({top: Math.floor((Math.random() * (height-64)) + 64)});
      this.setState({left: Math.floor((Math.random() * (width-400)) + 1)});
    }.bind(this), 2000);
    
  }

  componentWillUnmount() {
    clearTimeout(this.h)
    this._isMounted = false;
    this.destroyPlayer();
  }
  
  destroyPlayer() {
    if (this.player) {
      this.player.destroy();
    }
    this.player = null;
  }

  change(source) {
    console.log(LevelSelector)
    if (this.player) {
      this.destroyPlayer();
    }
    this.player = new Clappr.Player({
      parent: this.refs.player,
      source: source,
      width: this.props.width,
      height: this.props.height,
      playback: {
        hlsjsConfig: {
          enableWorker: false
        }
      },
      events: {
        onReady: function() {
          this.core.activePlayback.listenTo(
            this.core.activePlayback,
            Clappr.Events.PLAYBACK_ERROR,
            function(e) {
              this.setState({urlvalidate: true})
            }.bind(this)
          );
        },
        onPlay: this.VideoPlay,
        onPause: this.VideoPause
      },
      plugins: [LevelSelector],
      levelSelectorConfig: {
        title: 'Quality',
        labels: {
            2: 'High', // 500kbps
            1: 'Med', // 240kbps
            0: 'Low', // 120kbps
        },
        labelCallback: function(playbackLevel, customLabel) {
          console.log(12312123)
            return customLabel + playbackLevel.level.height+'p'; // High 720p
        }
      },
      
    });
  }
  
  VideoPlay() {
    this.setState({video_play: true})
  }
  VideoPause() {
    this.setState({video_play: false})
  }
  render() {
    return (
      <div 
        style={{width: "100%", height: '100%', margin: 'auto', background: 'black'}}
      >
        
        <div ref="player" style={{width: this.props.width, margin: 'auto'}}></div>
        {this.state.video_play && (
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
              top: this.state.top, 
              right: this.state.left
            }}
          >
            example@gmail.com
          </p>
        )}
        
      </div>
    );
  }
}
export default ClapprComponent;