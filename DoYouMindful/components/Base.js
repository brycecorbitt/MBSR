import React from "react";
import { Image, View, ImageBackground } from "react-native";

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.className = "base-screen";
  }
  

  render() {
    if(this.props.logo) {
      var logo = (
      <Image
        style={{ flex: 1, marginVertical: 20, resizeMode: "contain" }}
        source={require("../assets/logo.png")}
      />)
      }
    else
      var logo = null
    return (
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("../assets/background.jpg")}
      >
        <View style={{ flex: 1, marginTop: 24 }}>
          {logo}
          <View style={{ flex: 6 }}>{this.props.children}</View>
        </View>
      </ImageBackground>
    );
  }
}

export default Base;
