"use strict";
import { extendTheme } from "native-base";
import { StyleSheet } from "react-native";
const ariyaTheme = extendTheme({
  colors: {
    ariya: {
      mintWhite: "#F7FFF7",
      blueGreen: "#3C98B9",
      blue: "#86A8D3",
      brown: "#A37871",
      red: "#F25C54",
      darkgray: "#424B54",
    },
    // Mint Cream: F7FFF7
    // Blue Green: 3C98B9
    // Little Boy Blue: 86A8D3
    // Burnished Brown: A37871
    // Fire Opal: F25C54
    // Charcoal: 424B54
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
  },
});

export { ariyaTheme, mainConfig, styles };
