import React from "react";
import { Switch, Platform } from "react-native";

import monoTheme from "../constants/Theme";

class MonoSwitch extends React.Component {
  render() {
    const { value, ...props } = this.props;
    const thumbColor =
      Platform.OS === "ios"
        ? monoTheme.COLORS.PRIMARY
        : Platform.OS === "android" && value
        ? monoTheme.COLORS.SWITCH_ON
        : monoTheme.COLORS.SWITCH_OFF;

    return (
      <Switch
        value={value}
        thumbColor={[
          value === true
            ? monoTheme.COLORS.SWITCH_ON
            :'#ffffff'
        ]}
        ios_backgroundColor={"#D8D8D8"}
        trackColor={{
          true: "#d3d3d3",
          false: Platform.OS == "ios" ? "#d3d3d3" : "#333"
        }}
        {...props}
      />
    );
  }
}

export default MonoSwitch;
