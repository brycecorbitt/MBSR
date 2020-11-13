import React from "react";
import {StyleSheet, Dimensions, Modal} from "react-native"
import VP from 'react-native-video-controls'
import Orientation from 'react-native-orientation-locker'
const initial_orientation = Orientation.getInitialOrientation();
let dim = Dimensions.get('window')
const [screen_width, screen_height] = initial_orientation === 'LANDSCAPE'? [dim.width, dim.height] : [dim.height, dim.width]


class VideoPlayer extends React.Component {
  constructor(props){
    super(props)
    let paused = props.paused
    if(paused === undefined)
      paused = true
    this.state = { paused, styles: minimized_styles, fullscreen: false, progress: props.progress || 5, volume: this.props.volume || 1}
    this.onMaximize = this.onMaximize.bind(this)
    this.onMinimize = this.onMinimize.bind(this)
    this.onProgress = this.onProgress.bind(this)
  }

  async onMaximize(){
    Orientation.lockToLandscape()
    this.setState({styles: fullscreen_styles, fullscreen: true, progress: this.player.state.currentTime, volume: this.player.state.volume})
  }
  async onMinimize(){
    Orientation.lockToPortrait()
    this.setState({styles: minimized_styles, fullscreen: false, progress: this.player.state.currentTime, volume: this.player.state.volume})
  }

  // For other events, we don't use setState() because we don't want to trigger a re-render when we don't need to
  onProgress(){
    this.state.progress = this.player.state.currentTime
  }
  
  render() {
    const {paused, volume, fullscreen} = this.state
    const player =  <VP {...this.props} 
      paused={paused}
      volume={volume}
      disableBack={true} 
      style={this.state.styles}
      videoStyle={this.state.videoStyles}
      ref={(ref) => {this.player = ref}}
      controlTimeout={paused? 100000000000 : 5000}
      toggleResizeModeOnFullscreen={false}
      isFullScreen={fullscreen}
      onEnterFullscreen={this.onMaximize}
      onExitFullscreen={this.onMinimize}
      onProgress={this.onProgress}
      onLoad={() => {
        if(this.state.progress) {
          this.player.seekTo(this.state.progress)
        }
        this.player.resetControlTimeout()
      }}
      onPlay={() => {
        this.state.paused = false
        this.player.player.controlTimeoutDelay = 5000 // Hide controls after 5 seconds of playing without interaction
        this.player.resetControlTimeout()
        console.log('onPlay')
      }}
      onPause={() => {
        this.state.paused = true
        this.player.player.controlTimeoutDelay = 100000000000 // Keep controls shown while video is paused
        this.player.resetControlTimeout()
        console.log('onPause')
      }}
      onSeekStart={(time) => {
        console.log('onSeekStart: ' + time)
      }}
      onSeekRelease={(time) => {
        console.log('onSeekRelease: ' + time)
      }}
      onVolumeStart={(volume) => {
        console.log('onVolumeStart: ' + volume)
      }}
      onVolumeRelease={(volume) => {
        console.log('onVolumeRelease: ' + volume)
      }}
    />
      if(fullscreen)
        return <Modal
          animationType={'fade'}
          visible={fullscreen}
          onRequestClose={() => {
            this.onMinimize()
          }}
          >
          {player}
        </Modal>
    return player
    // <VP {... this.props} paused={this.paused} style={styles.minimized} 
    // onEnterFullscreen={(vp) => {this.style = styles.fullScreen; console.log(this)}} 
    // onExitFullscreen={(vp) => {this.style = styles.minimized; console.log(this)}}/>)
  }
}

const styles = {
  volume: StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      height: 1,
      marginLeft: 20,
      marginRight: 20,
      width: 2000,
    },
    track: {
      backgroundColor: '#333',
      height: 1,
      marginLeft: 7,
    },
    fill: {
      backgroundColor: '#FFF',
      height: 1,
    },
    handle: {
      position: 'absolute',
      marginTop: -24,
      marginLeft: -24,
      padding: 16,
    },
    icon: {
      marginLeft: 7,
    },
  })
};

const minimized_styles = [styles, StyleSheet.create({
  height: 200,
  zIndex: 0
})]

const fullscreen_styles = [styles, StyleSheet.create({
  width: screen_width,
  height: screen_height,
  top: 0,
  left: 0
})]


export default VideoPlayer;