import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {
  createAppContainer,
  StackActions,
  NavigationActions,
} from 'react-navigation'; // Version can be specified in package.json
import DropdownAlert from 'react-native-dropdownalert';
import {createStackNavigator} from 'react-navigation-stack';

import DropDownHolder from './DropDownHolder';

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

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    About: {
      screen: About,
    },
    Exercises: {
      screen: Exercises,
    },
    Calendar: {
      screen: Calendar,
    },
    Timer: {
      screen: Timer,
    },
    Inspiration: {
      screen: Inspiration,
    },
    Events: {
      screen: Events,
    },
    Settings: {
      screen: Settings,
    },
    Login: {
      screen: Login,
    },
    Account: {
      screen: Account,
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

const NavContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    return (
      <View>
      <View style={{width: '100%', height: '100%'}}>
        <NavContainer />
      </View>
      <DropdownAlert ref={(ref) => DropDownHolder.setDropDown(ref)} />
      </View>
    );
  }
}

export default App;

