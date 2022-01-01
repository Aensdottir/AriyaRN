// @ts-nocheck
import React, { useState, Component, useEffect } from "react";
import SplashScreen from "react-native-splash-screen";

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
