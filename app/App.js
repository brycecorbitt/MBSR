import React from 'react';
import {View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DropdownAlert from 'react-native-dropdownalert';

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

const stack = createStackNavigator();
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function RootStack(){
  return (
    <stack.Navigator 
    initialRouteName="Home"
    headerMode='none'
    screenOptions={{ cardStyleInterpolator: forFade }}
    >
      <stack.Screen
        name="Home"
        component={Home}
        options={{title: 'DoYouMindful'}}
      />
      <stack.Screen 
        name="About"
        component={About}
      />
      <stack.Screen 
        name="Exercises"
        component={Exercises}
      />
      <stack.Screen
        name="Calendar"
        component={Calendar}
      />
      <stack.Screen
        name="Timer"
        component={Timer}
      />
      <stack.Screen
        name="Inspiration"
        component={Inspiration}
      />
      <stack.Screen
        name="Events"
        component={Events}
      />
      <stack.Screen
        name="Settings"
        component={Settings}
      />
      <stack.Screen
        name="Login"
        component={Login}
      />
      <stack.Screen
        name="Account"
        component={Account}
      />
      <stack.Screen
        name="Recover"
        component={Recover}
      />
      <stack.Screen
        name="AudioExercises"
        component={AudioExercises}
      />
      <stack.Screen
        name="VideoExercises"
        component={VideoExercises}
      />
    </stack.Navigator>
  )

} 
// RNLocalNotifications.setAndroidIcons("ic_launcher", "mipmap", "notification_small", "drawable");
// RNLocalNotifications.createNotification(1, 'Test Notification! Hopefully this works :)', '2019-09-22 17:55', 'default');

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

