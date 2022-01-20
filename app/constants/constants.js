// @ts-nocheck
import { Animated } from "react-native";
export const HEADER_MAX_HEIGHT = 300;
export const HEADER_MIN_HEIGHT = 85;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const scrollY = new Animated.Value(0);
export const fadeInValue = new Animated.Value(0);
export const fadeOutValue = new Animated.Value(1);

export const headerTranslateY = scrollY.interpolate({
  inputRange: [0, HEADER_SCROLL_DISTANCE],
  outputRange: [0, -HEADER_SCROLL_DISTANCE],
  extrapolate: "clamp",
});

//Server
export const options = {
  port: 10144,
  host: "78.98.19.180",
};
