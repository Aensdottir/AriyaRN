import { Animated } from "react-native";

function fadeIn(object) {
  Animated.timing(
    // Animate over time
    object, // The animated value to drive
    {
      toValue: 1, // Animate to opacity: 1 (opaque)
      duration: 2000, // 2000ms
      useNativeDriver: true,
    }
  ).start(); // Starts the animation
}
function fadeOut(object) {
  Animated.timing(
    // Animate over time
    object, // The animated value to drive
    {
      toValue: 0, // Animate to opacity: 0 (opaque)
      duration: 2000, // 2000ms
      useNativeDriver: true,
    }
  ).start(); // Starts the animation
}

export { fadeIn, fadeOut };
