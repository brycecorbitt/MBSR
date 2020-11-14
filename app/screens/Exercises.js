import React from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";

import Base from "../components/Base";
import Button from "../components/Button";
import BottomNav from "../components/BottomNav";

class Exercises extends React.Component {
  render() {
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
            name="human-handsup"
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
            Mindfulness Exercises
          </Text>
        </View>
        <View
          style={{
            flex: 5,
            marginHorizontal: "5%",
            marginVertical: 20,
            // justifyContent: "space-between"
          }}
        >
          
          <Button
            title="Audio Exercises"
            icon={{ name: "volume-high", size: 50 }}
            onPress={() => this.props.navigation.navigate("AudioExercises")}
          />
          <View style={{marginVertical: 20}}></View>
          <Button
            title="Video Exercises"
            icon={{ name: "video-library", type: 'material', size: 50 }}
            onPress={() => this.props.navigation.navigate("VideoExercises")}
          />
          
        </View>

        <BottomNav
          onBack={() => this.props.navigation.navigate("Home")}
          onHome={() => this.props.navigation.navigate("Home")}
        />
      </Base>
    );
  }
}
export default Exercises;
