"use strict";
import { extendTheme } from "native-base";
import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const ariyaTheme = extendTheme({
  colors: {
    main: {
      bg: "#202531",
      dark: "#1b202a",
      lighterBg: "#232834",
      lightPurple: "303145",
      statusBar: "#151921",
    },
    gradient: {
      blue: "#2b3a54",
      purple: "#383045",
      lightPurple: "#40374e",
      lighterPurple: "#303145",
      red: "#3e222d",
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

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6.27,
    elevation: 15,
  },
  connectFlex: {
    height: 130,
    width: windowWidth,
    position: "absolute",
    justifyContent: "center",
    top: 280,
  },
});

export { ariyaTheme, mainConfig, styles };
