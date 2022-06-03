import { Animated, Dimensions, StatusBar } from "react-native";

export const fadeInValue = new Animated.Value(0);
export const fadeInValue1 = new Animated.Value(0);
export const fadeOutValue = new Animated.Value(1);

// SlideUpPanel
export const { height } = Dimensions.get("window");
export const panelHeight = 100;

export const draggableRange = {
  top: height + (StatusBar.currentHeight || 0),
  bottom: panelHeight - 30,
};
const { top, bottom } = draggableRange;

export const draggedValue = new Animated.Value(panelHeight - 30);

export const backgroundOpacity = draggedValue.interpolate({
  inputRange: [height - 48, height],
  outputRange: [1, 0],
  extrapolate: "clamp",
});

export const chevronTranslateY = draggedValue.interpolate({
  inputRange: [bottom, top],
  outputRange: [0, 25],
  extrapolate: "clamp",
});

export const chevronRotate = draggedValue.interpolate({
  inputRange: [bottom, top / 2],
  outputRange: ["0deg", "180deg"],
  extrapolate: "clamp",
});
export const chevronOpacity = draggedValue.interpolate({
  inputRange: [bottom, 300, 700, top],
  outputRange: [1, 0, 0, 1],
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
