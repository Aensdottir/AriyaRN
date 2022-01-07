// @ts-nocheck
import GLOBAL from "../utils/state/globalState";
export const HEADER_MAX_HEIGHT = 300;
export const HEADER_MIN_HEIGHT = 85;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const headerTranslateY = GLOBAL.scrollY.interpolate({
  inputRange: [0, HEADER_SCROLL_DISTANCE],
  outputRange: [0, -HEADER_SCROLL_DISTANCE],
  extrapolate: "clamp",
});
