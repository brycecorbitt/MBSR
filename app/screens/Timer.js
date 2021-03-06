import React from 'react';
import {View, Text, StyleSheet, Vibration, Switch} from 'react-native';
import {Icon} from 'react-native-elements';
import CountDown from 'react-native-countdown-component';

var Sound = require('react-native-sound');

import Base from '../components/Base';
import Button from '../components/Button';
import BottomNav from '../components/BottomNav';

const DEFAULT_TIME = 60 * 5;
const alarm = new Sound('timer.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    // console.log('failed to load the sound', error);
    return;
  }
});

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeid: '1',
      endtime: DEFAULT_TIME,
      current_time: DEFAULT_TIME,
      running: false,
      silent: false,
    };
  }

  playAlarm() {
    alarm.play(success => {
      if (success) {
        // console.log('successfully finished playing');
      } else {
        // console.log('playback failed due to audio decoding errors');
      }
    });
  }

  render() {
    let toggleText = ['Start Timer', 'Stop Timer'];
    return (
      <Base logo>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          marginHorizontal="10%">
          <Icon
            type="material-community"
            name="timer-sand"
            size={60}
            color="#2e466c"
            style={{flex: 1}}
          />
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: 'rgba(46,70,108,1)',
              width: '100%',
              textAlign: 'center',
              flex: 1,
            }}>
            Time Your Practice
          </Text>
        </View>
        <View
          style={{
            flex: 5,
            marginHorizontal: '5%',
            marginVertical: 20,
            justifyContent: 'space-evenly',
          }}>
          <CountDown
            id={this.state.timeid}
            digitStyle={{backgroundColor: 'none'}}
            separatorStyle={{color: 'rgba(46,70,108,1)'}}
            until={this.state.endtime}
            timeLabels={{}}
            digitTxtStyle={{color: 'rgba(46,70,108,1)', fontFamily: 'Roboto'}}
            timeToShow={['M', 'S']}
            size={50}
            running={this.state.running}
            showSeparator
            onChange={until => {
              this.setState({current_time: until});
            }}
            onFinish={() => {
              Vibration.vibrate(2000);
              if (!this.state.silent) {
                this.playAlarm();
              }
              this.setState({running: false});
            }}
          />

          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignContent: 'space-around',
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={[styles.Text, {paddingRight: '10%'}]}>Adjust:</Text>
              <View style={styles.adjustButton}>
                <Button
                  title="+"
                  secondary
                  onPress={() => {
                    let current_id = parseInt(this.state.timeid);
                    let new_id = String(current_id + 1);
                    // Setting a new timer id will re-render countdown timer w/ updated time remaining
                    // Update the timeid value in the callback to the updated state so that the new countdown
                    // isn't created until after the new time has been stored.
                    this.setState({
                      endtime: this.state.current_time + 60,
                      current_time: this.state.current_time + 60,
                    }, () => {this.setState({timeid: new_id})});
                  }}
                />
              </View>
              <View style={styles.adjustButton}>
                <Button
                  title="-"
                  secondary
                  onPress={() => {
                    let current_id = parseInt(this.state.timeid);
                    let new_id = String(current_id + 1);
                    this.setState({
                      endtime: this.state.current_time - 60,
                      current_time: this.state.current_time - 60,
                    }, () => {this.setState({timeid: new_id})});
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignSelf: 'flex-start',
                maxWidth: 200,
              }}>
              <Text style={[styles.Text, {flex: 1}]}>
                Silent (Vibrate Only)
              </Text>
              <Switch
                onValueChange={value => {
                  this.setState({silent: value});
                }}
                value={this.state.silent}
              />
            </View>
            <Button
              title={this.state.running ? 'Stop Timer' : 'Start Timer'}
              icon={{name: !this.state.running ? 'play' : 'stop'}}
              secondary
              centered
              onPress={() => {
                this.setState({running: !this.state.running});
              }}
            />
          </View>
        </View>
        <BottomNav
          onBack={() => this.props.navigation.navigate('Home')}
          onHome={() => this.props.navigation.navigate('Home')}
        />
      </Base>
    );
  }
}

const styles = StyleSheet.create({
  adjustButton: {
    flex: 1,
    maxWidth: 75,
    // marginVertical: '20%',
  },

  Text: {
    color: 'rgba(46,70,108,1)',
    textAlignVertical: 'center',
  },
});
export default Timer;
