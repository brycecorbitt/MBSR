import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

import Base from '../components/Base'
// import Button from '../components/Button'

class MenuItem extends React.Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 15,
          marginHorizontal: 20
        }}
      >
        <View style={{ flex: 1, marginRight: 10 }}>
          <Icon
            type="material-community"
            name={this.props.icon}
            size={40}
            color="#2e466c"
          />
        </View>
        <View style={{ flex: 6, height: 40 }}>
          <TouchableOpacity
            color="#2e466c"
            title={this.props.title}
            onPress={this.props.path}
          >
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
  render() {
    return (
    //   <ImageBackground
    //     style={{width: '100%', height: '100%'}}
    //     source={require("../assets/background.jpg")}
    //   >
    //     <View style={styles.Base}>
    //       <Image style={styles.Logo} source={require("../assets/logo.png")} />
    <Base>
          <View style={styles.Menu}>
            <MenuItem
              title="About Mindfulness"
              icon="lightbulb-outline"
              path={() => this.props.navigation.navigate("About")}
            />
            <MenuItem
              title="Mindfulness Exercises"
              icon="human-handsup"
              path={() => this.props.navigation.navigate("Exercises")}
            />
            <MenuItem
              title="Calendar & Timer"
              icon="calendar"
              path={() => this.props.navigation.navigate("Calendar")}
            />
            <MenuItem
              title="Inspirational Corner"
              icon="format-quote-close"
              path={() => this.props.navigation.navigate("Inspiration")}
            />
            <MenuItem
              title="Local Events"
              icon="routes"
              path={() => this.props.navigation.navigate("Events")}
            />
            {/* <Button title="Primary Button"></Button>
            <Button title="Secondary Button" secondary={true}></Button>
            <Button title="Primary Button With a left Icon" icon={{name: "rowing"}}></Button>
            <Button title="Secondary Button With a right Icon" icon={{name: "rowing", end: true}} secondary={true}></Button> */}
          </View>
    </Base>
    //     </View>
    //   </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  Base: {
    flex: 1,
    marginTop: 24
  },
  Logo: {
    flex: 1,
    marginVertical: 20,
    resizeMode: "contain"
  },
  Menu: {
    flex: 6,
    flexDirection: "column"
  },
  MenuItem: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-around",
    alignItems: "stretch"
  },
  MenuButton: {
    color: "white",
    backgroundColor: "rgba(46,70,108,1)",
    textAlign: "center",
    textAlignVertical: "center",
    paddingVertical: 10,
    fontSize: 18,
    borderRadius: 2,
    borderWidth: 1
  },
  MenuIcon: {
    flex: 1,
    marginRight: 20
  }
});

export default Home;
