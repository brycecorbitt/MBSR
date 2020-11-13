import React from 'react';
import {View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DropdownAlert from 'react-native-dropdownalert';
import Orientation from 'react-native-orientation-locker'

import Home from './screens/Home';
import About from './screens/About';
import Exercises from './screens/Exercises';
import Calendar from './screens/Calendar';
import Timer from './screens/Timer';
import Inspiration from './screens/Inspiration';
import Events from './screens/Events';
import Settings from './screens/Settings';
import Login from './screens/Login';
import Account from './screens/Account';
import Recover from './screens/Recover';
import AudioExercises from './screens/AudioExercises';
import VideoExercises from './screens/VideoExercises';

import DropDownHolder from './DropDownHolder';
import LogEvent from './event'

const stack = createStackNavigator();
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
let prior_screen = null
let new_screen = null
const focus_listener =({navigation, route}) => ({
  focus: (e) => {
    new_screen = route.name
    LogEvent.logNavigationEvent(prior_screen, new_screen).catch((err) => {console.error(err)})
    prior_screen = new_screen
  },
})

function RootStack(){
  return (
    <stack.Navigator 
    initialRouteName="Home"
    headerMode='none'
    screenOptions={{ cardStyleInterpolator: forFade}}
    >
      <stack.Screen
        name="Home"
        component={Home}
        listeners={focus_listener}
        options={{title: 'DoYouMindful'}}
      />
      <stack.Screen 
        name="About"
        component={About}
        listeners={focus_listener}
      />
      <stack.Screen 
        name="Exercises"
        component={Exercises}
        listeners={focus_listener}
      />
      <stack.Screen
        name="Calendar"
        component={Calendar}
        listeners={focus_listener}
      />
      <stack.Screen
        name="Timer"
        component={Timer}
        listeners={focus_listener}
      />
      <stack.Screen
        name="Inspiration"
        component={Inspiration}
        listeners={focus_listener}
      />
      <stack.Screen
        name="Events"
        component={Events}
        listeners={focus_listener}
      />
      <stack.Screen
        name="Settings"
        component={Settings}
        listeners={focus_listener}
      />
      <stack.Screen
        name="Login"
        component={Login}
        listeners={focus_listener}
      />
      <stack.Screen
        name="Account"
        component={Account}
        listeners={focus_listener}
      />
      <stack.Screen
        name="Recover"
        component={Recover}
        listeners={focus_listener}
      />
      <stack.Screen
        name="AudioExercises"
        component={AudioExercises}
        listeners={focus_listener}
      />
      <stack.Screen
        name="VideoExercises"
        component={VideoExercises}
        listeners={focus_listener}
      />
    </stack.Navigator>
  )

} 
// RNLocalNotifications.setAndroidIcons("ic_launcher", "mipmap", "notification_small", "drawable");
// RNLocalNotifications.createNotification(1, 'Test Notification! Hopefully this works :)', '2019-09-22 17:55', 'default');

// Lock to Portrait orientation on startup (technically this is async, but we don't need to wait for it to complete)
Orientation.lockToPortrait()

class App extends React.Component {
  render() {
    return (
      <View>
        <DropdownAlert ref={(ref) => {DropDownHolder.setDropDown(ref)}} />
        <View style={{width: '100%', height: '100%'}}>
          <NavigationContainer>
            <RootStack/>
          </NavigationContainer>
        </View>
      </View>
    );
  }
}
export default App;

