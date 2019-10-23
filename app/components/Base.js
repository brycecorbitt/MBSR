import React from "react";
import { Image, View, ImageBackground, SafeAreaView } from "react-native";

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.className = "base-screen";
  }
  

  render() {
    if(this.props.logo) {
      var logo = (
      <Image
        style={{ flex: 1, marginTop: 30, marginBottom: 10, resizeMode: "contain" , maxWidth: "90%", alignSelf: "center"}}
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
        <SafeAreaView style={{ flex: 1, marginTop: 0, zIndex: 1}}>
          
          <View style={{ flex: 1 }}>{logo}{this.props.children}</View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default Base;
