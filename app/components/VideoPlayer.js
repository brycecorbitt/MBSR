import React from "react";
import {StyleSheet} from "react-native"
import VP from 'react-native-video-controls';

class VideoPlayer extends React.Component {
  onFullScreen = function(vp){
    // console.log("testfull")
    vp.style = styles.fullScreen
  }
  onMinimize = function(vp){
    // console.log("testmin")
    vp.style = styles.minimized
  }
  constructor(props){
    super()
    this.paused = props.paused
    if(this.paused == undefined)
      this.paused = true
  }
  render() {
    console.log(this)

    let vp = VP(this.props)
    return <VP {...this.props} paused={this.paused} style={styles.minimized}/>
    // <VP {... this.props} paused={this.paused} style={styles.minimized} 
    // onEnterFullscreen={(vp) => {this.style = styles.fullScreen; console.log(this)}} 
    // onExitFullscreen={(vp) => {this.style = styles.minimized; console.log(this)}}/>)
  }
}

const styles = StyleSheet.create({
  Text: {
    color: 'rgba(46,70,108,1)',
  },
  minimized: {
    height: 200,
    zIndex: 0
  },
  fullScreen: {
    height: 200,
    zIndex: 0
  }
  
});


export default VideoPlayer;