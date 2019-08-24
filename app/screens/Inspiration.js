import React from "react";
import { Button, View, Text } from "react-native";
import Base from "../components/Base";

class Inspiration extends React.Component {
  render() {
    return (
      <Base>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button
            title="Go to Home screen"
            onPress={() => this.props.navigation.navigate("Home")}
          />
        </View>
      </Base>
    );
  }
}
export default Inspiration;
