// React Imports
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
// Packages
import changeNavigationBarColor from "react-native-navigation-bar-color";
import { SafeAreaProvider } from "react-native-safe-area-context";
import fonts from "./app/assets/fonts/fonts";
import ForgotPassScreen from "./app/screens/ForgotPassScreen";
import LoginScreen from "./app/screens/LoginScreen";
// Screen Navigation
import MainScreen from "./app/screens/MainScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import { RootStackParamList } from "./app/screens/RootStackParams";
import AccountDeletion from "./app/screens/settings/AccountDeletion";
import AccountSettings from "./app/screens/settings/AccountSettings";
import ChangeEmail from "./app/screens/settings/ChangeEmail";
import ChangePassword from "./app/screens/settings/ChangePassword";
import GeneralSettings from "./app/screens/settings/GeneralSettings";
import LoginHistory from "./app/screens/settings/LoginHistory";
import UserScreen from "./app/screens/UserScreen";
// Custom Imports
import { ariyaTheme, mainConfig } from "./app/Styles";
import { navigationRef } from "./app/utils/navigation/RootNavigation";
import ServerProvider from "./app/utils/providers/ServerProvider";
// Providers
import UserProvider, { useUser } from "./app/utils/providers/UserProvider";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const { isFirebaseInitializing } = useUser();

  const [user, setUser] = useState();
  function onAuthStateChanged(user: any) {
    setUser(user);
  }
  useEffect(() => {
    changeNavigationBarColor("#1b202a", true, true);
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  let [fontsLoaded] = useFonts(fonts);

  if (isFirebaseInitializing && !fontsLoaded) return null;
  return (
    <UserProvider>
      <ServerProvider>
        <SafeAreaProvider>
          <NativeBaseProvider theme={ariyaTheme} config={mainConfig}>
            <NavigationContainer ref={navigationRef}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  animation: "fade_from_bottom",
                }}
                initialRouteName={user ? "Main" : "Login"}
              >
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen
                  name="Register"
                  component={RegisterScreen}
                  options={{
                    animation: "slide_from_right",
                  }}
                />
                <Stack.Screen
                  name="ForgotPass"
                  component={ForgotPassScreen}
                  options={{
                    animation: "slide_from_left",
                  }}
                />
                <Stack.Screen
                  name="User"
                  component={UserScreen}
                  options={{
                    animation: "slide_from_right",
                  }}
                />
                <Stack.Screen
                  name="GeneralSettings"
                  component={GeneralSettings}
                  options={{
                    animation: "slide_from_right",
                  }}
                />
                <Stack.Screen
                  name="AccountSettings"
                  component={AccountSettings}
                  options={{
                    animation: "slide_from_right",
                  }}
                />
                <Stack.Screen
                  name="ChangePassword"
                  component={ChangePassword}
                  options={{
                    animation: "slide_from_right",
                  }}
                />
                <Stack.Screen
                  name="ChangeEmail"
                  component={ChangeEmail}
                  options={{
                    animation: "slide_from_right",
                  }}
                />
                <Stack.Screen
                  name="LoginHistory"
                  component={LoginHistory}
                  options={{
                    animation: "slide_from_right",
                  }}
                />
                <Stack.Screen
                  name="AccountDeletion"
                  component={AccountDeletion}
                  options={{
                    animation: "slide_from_right",
                  }}
                />
                <Stack.Screen name="Main" component={MainScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </NativeBaseProvider>
        </SafeAreaProvider>
      </ServerProvider>
    </UserProvider>
  );
};

export default App;
