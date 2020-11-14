import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {Icon} from 'react-native-elements';
import API from '../API';
import Base from '../components/Base';
import LogEvents from '../event'
// import Button from '../components/Button'
const on_press = function(evt, id=null){
  const route = 'Home'
  const timestamp = evt.timeStamp
  const {pageX, pageY, locationX, locationY} = evt.nativeEvent
  LogEvents.logButtonPressEvent(route, id, pageX, pageY, locationX, locationY, timestamp).catch(err => {console.error(err)})
}


class MenuItem extends React.Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 15,
          marginHorizontal: 20,
        }}>
        <View style={{flex: 1, marginRight: 10}}>
          <Icon
            type="material-community"
            name={this.props.icon}
            size={40}
            color="#2e466c"
          />
        </View>
        <View style={{flex: 6, height: 40}}>
          <TouchableOpacity
            color="#2e466c"
            title={this.props.title}
            onPress={this.props.path}>
            <Text style={styles.MenuButton} size={48}>
              {this.props.title}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
      user: API.get_user()
    };
  }

  async componentDidMount() {
    user_call = await API.check_session();
    if(user_call.data)
      this.setState({user: user_call.data});
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({user: API.get_user()});
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    if(this.focusListener && this.focusListener.remove)
      this.focusListener.remove();
  }


  render_user(){
    let {user} = this.state;
    if(user){
      return (
      <View style={{position:'absolute',top:0, zIndex: 2, alignContent: 'flex-start'}}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={(evt) => {
            this.props.navigation.navigate('Account');
          }}>
            <Icon
              type="material-community"
              name="account"
              size={28}
              color="#2e466c"
            />
            <Text style={{color: "#2e466c", textAlignVertical: "center"}}>{user.username}</Text>
        </TouchableOpacity>
      </View>);
    }
    return null;
  }
  render() {
    return (
      <Base logo>
        {this.render_user()}
        <View style={{position:'absolute',top:0, zIndex: 2, alignSelf: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Settings');
            }}>
            <Icon
              type="material"
              name="settings"
              size={28}
              color="#2e466c"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.Menu}>
          <MenuItem
            title="About Mindfulness"
            icon="lightbulb-outline"
            path={(evt) => {            
              on_press(evt, 'nav_about')
            this.props.navigation.navigate('About')}}
          />
          <MenuItem
            title="Mindfulness Exercises"
            icon="human-handsup"
            path={(evt) => {            
              on_press(evt, 'nav_exercises')
              this.props.navigation.navigate('Exercises')}}
          />
          <MenuItem
            title="Schedule Reminder"
            icon="calendar"
            path={(evt) => {            
              on_press(evt, 'nav_calendar')
              this.props.navigation.navigate('Calendar')}}
          />
          <MenuItem
            title="Practice Timer"
            icon="timer-sand"
            path={(evt) => {            
              on_press(evt, 'nav_timer')
              this.props.navigation.navigate('Timer')}}
          />
          <MenuItem
            title="Inspirational Corner"
            icon="format-quote-close"
            path={(evt) => {            
              on_press(evt, 'nav_inspiration')
              this.props.navigation.navigate('Inspiration')}}
          />
          <MenuItem
            title="Local Events"
            icon="routes"
            path={(evt) => {            
              on_press(evt, 'nav_events')
              this.props.navigation.navigate('Events')}}
          />
        </View>
      </Base>
    );
  }
}

const styles = StyleSheet.create({
  Base: {
    flex: 1,
    marginTop: 24,
  },
  Logo: {
    flex: 1,
    marginVertical: 20,
    resizeMode: 'contain',
  },
  Menu: {
    flex: 6,
    flexDirection: 'column',
  },
  MenuItem: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: "space-around",
    alignItems: 'stretch',
  },
  MenuButton: {
    color: 'white',
    backgroundColor: 'rgba(46,70,108,1)',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingVertical: 10,
    fontSize: 18,
    borderRadius: 2,
    borderWidth: 1,
  },
  MenuIcon: {
    flex: 1,
    marginRight: 20,
  },
});

export default Home;
