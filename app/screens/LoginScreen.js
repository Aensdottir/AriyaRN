// @ts-nocheck
// React Imports
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  Box,
  Image,
  Button,
  Pressable,
  AlertDialog,
  Flex,
} from "native-base";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { SetAlertOpen } from "../utils/redux/actions";
// Packages
import changeNavigationBarColor from "react-native-navigation-bar-color";
// Custom Imports
import { styles } from "../Styles";
import { errors } from "../constants";
import { onLoginPress } from "../utils";
import {
  AlertDialogUnavailable,
  EmailInput,
  ForgotPassword,
  LoginButton,
  LoginLogoBox,
  PasswordInput,
  RegisterButton,
} from "../components";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);

  const [errorIndex, setErrorIndex] = React.useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    changeNavigationBarColor("#303145");
  }, []);

  const login = () => {
    onLoginPress(email, password, (output) => setErrorIndex(output));
  };

  return (
    <SafeAreaView style={[styles.loginContainer]}>
      <StatusBar
        backgroundColor={"transparent"}
        translucent={true}
        animated={true}
        barStyle={"light-content"}
      />
      <View flex={1} bg={"main.bg"}>
        <Flex
          position={"absolute"}
          bottom={0}
          w={"100%"}
          h={300}
          bg={{
            linearGradient: {
              colors: ["main.bg", "#303145"],
              start: [0, 0],
              end: [0, 1],
            },
          }}
        />
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            flexGrow: 0.8,
          }}
        >
          <View alignItems={"center"}>
            <LoginLogoBox />

            <Text fontWeight={"bold"} color={"danger.500"}>
              {errors[errorIndex]}
            </Text>

            <EmailInput onChangeText={(text) => setEmail(text)} />
            <PasswordInput onChangeText={(text) => setPassword(text)} />

            <ForgotPassword
              onPress={() => dispatch(SetAlertOpen(!data.login.alertOpen))}
            />
            <LoginButton onPress={() => login()} />
            <RegisterButton
              onPress={() => {
                navigation.navigate("Register");
              }}
            />
          </View>
        </ScrollView>
      </View>

      <AlertDialogUnavailable />
    </SafeAreaView>
  );
};

export default LoginScreen;
