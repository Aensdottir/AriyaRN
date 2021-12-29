// @ts-nocheck
import React, { useState, Component } from "react";
//import { Pressable, StyleSheet, Text, View } from "react-native";
import MainScreen from "./app/MainScreen";

import { NativeBaseProvider } from "native-base";

class App extends Component {
  render() {
    return (
      <NativeBaseProvider>
        <MainScreen />
      </NativeBaseProvider>
    );
  }
}

export default App;
