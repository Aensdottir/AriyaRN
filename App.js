// @ts-nocheck
import React, { Component, useEffect, useState } from "react";

import MainScreen from "./app/screens/MainScreen";
import LoginScreen from "./app/screens/LoginScreen";

import { Provider } from "react-redux";
import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./app/utils/redux/reducers/rootReducer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { ariyaTheme, mainConfig, styles } from "./app/Styles";
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from "react-native-navigation-bar-color";
const store = createStore(rootReducer /*applyMiddleware(logger)*/);

const App = () => {
  useEffect(() => {
    changeNavigationBarColor("#1b202a");
  }, []);

  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={ariyaTheme} config={mainConfig}>
        <Provider store={store}>
          <MainScreen />
        </Provider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
