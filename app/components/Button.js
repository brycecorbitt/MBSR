import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

import { Icon } from "react-native-elements";

class Button extends React.Component {
  getIcon() {
    if (!this.props.icon) return null;
    let icon = this.props.icon;
    let style = !icon.end ? styles.IconLeft : styles.IconRight;
    let centered = !this.props.centered? styles.CenteredIcon : null; 
    return (
      <View style={style}>
        <Icon
          type="material-community"
          name={icon.name}
          style={[style, centered]}
          size={icon.size || 40}
          color={!this.props.secondary ? "white" : "rgba(46,70,108,1)"}
        />
      </View>
    );
  }

  getStartIcon() {
    if (this.props.icon) {
      if (this.props.icon.end) return null;
      return this.getIcon();
    }
    return null;
  }

  getEndIcon() {
    if (this.props.icon && this.props.icon.end) return this.getIcon();
    return null;
  }

  render() {
    let color = this.props.secondary? styles.Secondary : styles.Primary;
    let centered = this.props.centered? styles.Centered : null;



    return (
      <TouchableOpacity onPress={this.props.onPress} style={[styles.Button, color]}>
        {this.getStartIcon()}
        <Text
          style={
            [color, styles.Text, centered]
          }
        >
          {this.props.title}
        </Text>
        {this.getEndIcon()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  Primary: {
    color: "white",
    backgroundColor: "rgba(46,70,108,1)"
  },

  Secondary: {
    color: "rgba(46,70,108,1)",
    backgroundColor: "#e5ffff",
    fontWeight: "bold"
  },

  Button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    borderRadius: 2,
    borderWidth: 1,
    justifyContent: "center"
  },

  Text: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    flex: 1,
    backgroundColor: null
  },

  Centered: {
    // alignSelf: "",
    flex: .5,
    textAlign: "center"
  },

  CenteredIcon: {
    flex: 2
  },

  IconLeft: {
    // flex: 1
    paddingLeft: 10,
    paddingRight: 15,
  },
  IconRight: {
    // flex: 1
    paddingLeft: 15,
    paddingRight: 10
  }
});

export default Button;
