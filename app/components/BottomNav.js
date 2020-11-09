import React from "react";
import { View } from "react-native";

import Button from "./Button"

class BottomNav extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row", marginVertical: 10 }}>
        <View style={{ flex: 1, marginLeft: "5%", marginRight: "10%", height: 60 }}>
          <Button
            id="nav_back"
            title="Back"
            icon={{ name: "chevron-left" }}
            secondary={true}
            onPress={this.props.onBack}
          />
        </View>
        <View style={{ flex: 1, marginRight: "5%", marginLeft: "10%", height: 60}}>
          <Button
            id="nav_home"
            title="Home"
            icon={{ name: "home", end: true }}
            secondary={true}
            onPress={this.props.onHome}
          />
        </View>
      </View>
    );
  }
}

export default BottomNav;
