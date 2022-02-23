// @ts-nocheck
import { Animated, Dimensions } from "react-native";

export const fadeInValue = new Animated.Value(0);
export const fadeOutValue = new Animated.Value(1);

// SlideUpPanel
export const { height } = Dimensions.get("window");
export const panelHeight = 100;

export const draggableRange = {
  top: height + panelHeight - 64,
  bottom: panelHeight,
};
const { top, bottom } = draggableRange;

export const draggedValue = new Animated.Value(panelHeight);

export const backgroundOpacity = draggedValue.interpolate({
  inputRange: [height - 48, height],
  outputRange: [1, 0],
  extrapolate: "clamp",
});

export const iconTranslateY = draggedValue.interpolate({
  inputRange: [height - 56, height, top],
  outputRange: [0, 56, 180 - 32],
  extrapolate: "clamp",
});

export const textTranslateY = draggedValue.interpolate({
  inputRange: [bottom, top],
  outputRange: [0, 8],
  extrapolate: "clamp",
});

export const textTranslateX = draggedValue.interpolate({
  inputRange: [bottom + 100, top],
  outputRange: [0, -112],
  extrapolate: "clamp",
});

export const textScale = draggedValue.interpolate({
  inputRange: [bottom + 100, top],
  outputRange: [1, 0.7],
  extrapolate: "clamp",
});
export const borderRadius2 = draggedValue.interpolate({
  inputRange: [bottom, top],
  outputRange: [60, 0],
  extrapolate: "clamp",
});

//Server
export const options = {
  port: 10144,
  host: "78.98.19.180",
};

//Authentication Errors
export const errors = [
  "", // No Error
  "Invalid e-mail address or password.",
  "Invalid e-mail address format.",
  "Login attempt failed, please try again later.",
];
