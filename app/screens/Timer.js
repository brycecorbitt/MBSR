import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import CountDown from "react-native-countdown-component";

import Base from "../components/Base";
import Button from "../components/Button";
import BottomNav from "../components/BottomNav";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.timeid = "1";
    this.state = {
      endtime: 60 * 5,
      running: false
    };
    // this.timer = new CountDown(
    //   {style : styles.Timer,
    //   until : 60 * 5 + 30,
    //   // onFinish={() => alert("finished")},
    //   digitStyle : { backgroundColor: "none" },
    //   timeLabels : {},
    //   digitTxtStyle : { color: "rgba(46,70,108,1)", fontFamily: "Roboto" },
    //   separatorStyle : { color: "rgba(46,70,108,1)" },
    //   timeToShow : ["M", "S"],
    //   size : 50,
    //   showSeparator : true}
    // );
  }

  setTimer(t) {
    this.timer = t;
  }

  render() {
    let toggleText = ["Start Timer", "Stop Timer"];
    return (
      <Base>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "center"
          }}
          marginHorizontal="10%"
        >
          <Icon
            type="material-community"
            name="timer-sand"
            size={60}
            color="#2e466c"
            style={{ flex: 1 }}
          />
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "rgba(46,70,108,1)",
              width: "100%",
              textAlign: "center",
              flex: 1
            }}
          >
            Time Your Practice
          </Text>
        </View>
        <View
          style={{
            flex: 5,
            marginHorizontal: "5%",
            marginVertical: 20
            // justifyContent: "space-between"
          }}
        >
          <CountDown
            digitStyle={{ backgroundColor: "none" }}
            separatorStyle={{ color: "rgba(46,70,108,1)" }}
            until={this.state.endtime}
            timeLabels={{}}
            digitTxtStyle={{ color: "rgba(46,70,108,1)", fontFamily: "Roboto" }}
            timeToShow={["M", "S"]}
            size={50}
            running={this.state.running}
            showSeparator
          />
          <View style={{ marginHorizontal: "0%" }}>
            <Button
              title={this.state.running ? "Stop Timer" : "Start Timer"}
              icon={{ name: !this.state.running ? "play" : "stop" }}
              secondary
              centered
              onPress={() => {
                this.setState({ running: !this.state.running });
              }}
            />
          </View>
        </View>
        <BottomNav
          onBack={() => this.props.navigation.navigate("Home")}
          onHome={() => this.props.navigation.navigate("Home")}
        />
      </Base>
    );
  }
}

const styles = StyleSheet.create({

});
export default Timer;
