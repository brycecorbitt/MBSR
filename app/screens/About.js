import React from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";

import Base from "../components/Base";
import Button from "../components/Button";
import BottomNav from "../components/BottomNav";

class About extends React.Component {
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
            name="lightbulb-outline"
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
            About Mindfulness
          </Text>
        </View>
        <View
          style={{
            flex: 5,
            marginHorizontal: "5%",
            marginVertical: 20,
            justifyContent: "space-between"
          }}
        >
          <Button
            title="What is Mindfulness?"
            icon={{ name: "help", size: 50 }}
          />
          <Button
            title="Mindfulness Around the World"
            icon={{ name: "earth", size: 50 }}
          />
          <Button
            title="Benefits of Mindfulness"
            icon={{ name: "star", size: 50 }}
          />
          <Button
            title="Mindfulness Success Stories"
            icon={{ name: "heart-multiple", size: 50 }}
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
export default About;
