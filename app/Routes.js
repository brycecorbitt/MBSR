import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./screens/Home";
import About from "./screens/About";
import Exercises from "./screens/Exercises";
import Calendar from "./screens/Calendar";
import Timer from "./screens/Timer"
import Inspiration from "./screens/Inspiration";
import Events from "./screens/Events";

const generateNavigationParams = function(screens) {
  var params = {};
  screens.forEach(s => {
    params[s.name] = {
      screen: s,
      navigationOptions: { header: null, marginTop: 24 }
    };
  });
  return params;
};
const Project = createStackNavigator(generateNavigationParams([Home, About, Exercises, Calendar, Timer, Inspiration, Events]));
export default createAppContainer(Project);
