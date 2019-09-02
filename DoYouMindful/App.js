import React from 'react';
import { View, Text, Button, TouchableOpacity} from 'react-native';
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import { createStackNavigator } from 'react-navigation-stack';

import Home from './screens/Home';
import About from './screens/About';
import Exercises from './screens/Exercises';
import Calendar from './screens/Calendar';
import Timer from './screens/Timer';
import Inspiration from './screens/Inspiration';
import Events from './screens/Events';


const AppNavigator = createStackNavigator({
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
    screen: Inspiration
  },
  Events: {
    screen: Events
  },
}, {
    initialRouteName: 'Home',
    headerMode: "none"
});

export default createAppContainer(AppNavigator);