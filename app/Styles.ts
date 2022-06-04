"use strict";
import { extendTheme } from "native-base";
import { Dimensions, StyleSheet } from "react-native";
const windowWidth = Dimensions.get("window").width;
const ariyaTheme = extendTheme({
  colors: {
    main: {
      bg: {
        50: "#232834",
        100: "#202531",
        200: "#1f2530",
        300: "#1a1f29",
        400: "#151921",
      },
      red: "#f87171", // red.400
    },

    gradient: {
      blue: "#2b3a54",
      purple: "#383045",
      lightPurple: "#40374e",
      lighterPurple: "#303145",
      red: "#3e222d",
    },
    control: {
      red: "#303145",
    },
  },
  sizes: {
    ...{
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      12: 12,
      16: 14,
      20: 20,
      24: 24,
      32: 32,
      40: 40,
      48: 48,
      56: 56,
      64: 64,
      72: 72,
      80: 80,
      96: 96,
    },
  },
  config: {
    initialColorMode: "dark",
  },
});
const mainConfig = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    left: 0,
    right: 0,

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  infoBar: {
    position: "absolute",
    top: -100,
    left: 0,
    right: 0,

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  connectFlex: {
    position: "absolute",
    top: 270,
    left: 0,
    right: 0,

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  container: {
    flex: 1,
    backgroundColor: "#1a1f29",
  },
  loginContainer: {
    flex: 1,
    backgroundColor: "#1b202a",
  },
});

export { ariyaTheme, mainConfig, styles };
