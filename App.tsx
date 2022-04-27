// React Imports
import React, { Component, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
// Screen Navigation
import MainScreen from "./app/screens/MainScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import { navigationRef } from "./app/utils/navigation/RootNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./app/utils/redux/reducers/rootReducer";
// Packages
import changeNavigationBarColor from "react-native-navigation-bar-color";
import auth from "@react-native-firebase/auth";
// Custom Imports
import { validateEmail } from "./app/utils";
import { ariyaTheme, mainConfig } from "./app/Styles";
import fonts from "./app/assets/fonts/fonts";

import ServerProvider from "./app/utils/providers/ServerProvider";
import CommonProvider from "./app/utils/providers/CommonProvider";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { RootStackParamList } from "./app/screens/RootStackParams";

const store = createStore(rootReducer /*applyMiddleware(logger)*/);

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  useEffect(() => {
    changeNavigationBarColor("#1b202a", true, true);

    const loginData = async () => {
      const jsonValue = await AsyncStorage.getItem("loginData");
      const user = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(user);
      if (user != null) {
        auth().onAuthStateChanged((user) => {
          if (user) {
            setLoggedIn(true);
          }
        });
      }
    };
    loginData();
  }, []);
  useFonts(fonts);
  return (
    <CommonProvider>
      <ServerProvider>
        <SafeAreaProvider>
          <NativeBaseProvider theme={ariyaTheme} config={mainConfig}>
            <Provider store={store}>
              <NavigationContainer ref={navigationRef}>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                    animation: "fade_from_bottom",
                  }}
                  initialRouteName={isLoggedIn ? "Main" : "Login"}
                >
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{
                      animation: "slide_from_right",
                    }}
                  />
                  <Stack.Screen name="Main" component={MainScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </Provider>
          </NativeBaseProvider>
        </SafeAreaProvider>
      </ServerProvider>
    </CommonProvider>
  );
};

export default App;