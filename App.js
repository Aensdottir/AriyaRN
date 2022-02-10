// @ts-nocheck
import React, { Component, useEffect, useState } from "react";

import MainScreen from "./app/screens/MainScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";

import { Provider } from "react-redux";
import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./app/utils/redux/reducers/rootReducer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { ariyaTheme, mainConfig, styles } from "./app/Styles";
import changeNavigationBarColor from "react-native-navigation-bar-color";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const store = createStore(rootReducer /*applyMiddleware(logger)*/);

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    changeNavigationBarColor("#1b202a");
  }, []);

  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={ariyaTheme} config={mainConfig}>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Main" component={MainScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
