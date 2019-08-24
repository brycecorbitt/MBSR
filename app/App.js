import { AppRegistry } from 'react-native';
import React, {Component} from "react";
import Routes from "./Routes";
const App = () => <Routes/>
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed', 'Accessing view'];
console.disableYellowBox = true;
AppRegistry.registerComponent('DoYouMindful', () => App);
export default App