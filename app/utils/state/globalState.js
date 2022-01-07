// @ts-nocheck
import { Animated, Image as RNImage, Text as RNText } from "react-native";

module.exports = {
  statusImage: require("../../assets/images/StatusDefault.png"),
  connectionText: "NOT CONNECTED",
  loadData: false,
  buttonDisabled: false,
  uptimeToggle: false,
  uptime: "00:00:00",
  toggle: true,
  scrollY: new Animated.Value(0),
  fadeInValue: new Animated.Value(0),
  fadeOutValue: new Animated.Value(1),
};
