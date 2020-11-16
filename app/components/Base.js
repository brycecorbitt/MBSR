import React from "react";
import { Image, View, ImageBackground, SafeAreaView, StatusBar, PixelRatio } from "react-native";

status_bar_height = PixelRatio.getPixelSizeForLayoutSize(10)

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
        <StatusBar backgroundColor="rgba(0,0,0,0)" translucent={true} />
        <SafeAreaView style={{ flex: 1, marginTop: status_bar_height, zIndex: 1}}>
          
          <View style={{ flex: 1 }}>{logo}{this.props.children}</View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default Base;
