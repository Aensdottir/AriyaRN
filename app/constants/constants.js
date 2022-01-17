// @ts-nocheck
import GLOBAL from "../utils/state/globalState";
export const HEADER_MAX_HEIGHT = 300;
export const HEADER_MIN_HEIGHT = 85;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const fadeInValue = GLOBAL.fadeInValue;
export const fadeOutValue = GLOBAL.fadeOutValue;

export const headerTranslateY = GLOBAL.scrollY.interpolate({
  inputRange: [0, HEADER_SCROLL_DISTANCE],
  outputRange: [0, -HEADER_SCROLL_DISTANCE],
  extrapolate: "clamp",
});

//Server
export const options = {
  port: 10144,
  host: "78.98.67.193",
};
