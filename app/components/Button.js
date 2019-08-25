import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Icon } from "react-native-elements";

class Button extends React.Component {
  getIcon() {
    if (!this.props.icon) return null;
    let icon = this.props.icon;
    return (
      <View style={!icon.end ? styles.IconLeft : styles.IconRight}>
        <Icon
          type="material-community"
          name={icon.name}
          style={!icon.end ? styles.IconLeft : styles.IconRight}
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
    let style = !this.props.secondary
      ? styles.ButtonPrimary
      : styles.ButtonSecondary;
    return (
      <TouchableOpacity onPress={this.props.onPress} style={style}>
        {this.getStartIcon()}
        <Text
          style={
            !this.props.secondary ? styles.TextPrimary : styles.TextSecondary
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
  ButtonPrimary: {
    color: "white",
    backgroundColor: "rgba(46,70,108,1)",
    textAlign: "center",
    textAlignVertical: "center",
    paddingVertical: 10,
    borderRadius: 2,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 10
  },
  TextPrimary: {
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    flex: 5
  },
  ButtonSecondary: {
    color: "rgba(46,70,108,1)",
    backgroundColor: "#e5ffff",
    textAlign: "center",
    textAlignVertical: "center",
    paddingVertical: 10,
    borderRadius: 2,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 10
  },
  TextSecondary: {
    color: "rgba(46,70,108,1)",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    fontWeight: "bold",
    flex: 5
  },
  IconLeft: {
    flex: 1
  },
  IconRight: {
    flex: 1
  }
});

export default Button;
