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
  main: { alignItems: "center" },
  mainInput: {
    borderWidth: 1,
    height: 55,
    width: 40,
    padding: 10,
    margin: 10,
    alignItems: "center",
    borderRadius: 9,
  },
  todoList: {
    borderWidth: 1,
    borderRadius: 10,
    width: 30,
    height: 40,
  },
  todoView: { flex: 1, flexDirection: "row", margin: 10, padding: 5 },
  removeTodo: { backgroundColor: "cyan", borderRadius: 4, margin: 4 },
});

export { ariyaTheme, mainConfig, styles };
