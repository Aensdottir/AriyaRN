// @ts-nocheck
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  NativeBaseProvider,
  View,
  StatusBar,
  Input,
  Text,
  ScrollView,
  Box,
  Flex,
} from "native-base";
import { styles } from "../Styles";
import { SetEmailValue, SetPasswordValue } from "../utils/redux/actions";

import { LoginInput } from "../components";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  return (
    <SafeAreaView style={[styles.loginContainer]} justifyItems={"center"}>
      <StatusBar
        backgroundColor={"transparent"}
        translucent={true}
        animated={true}
        barStyle={"light-content"}
      />
      <ScrollView
        bg={"main.bg"}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          shadow={4}
          borderRadius={15}
          bg={"main.lighterBg"}
          size={100}
          mb={5}
        ></Box>
        <LoginInput
          keyboardType={"email-address"}
          textContentType={"emailAddress"}
          onChangeText={(text) => dispatch(SetEmailValue(text))}
        />
        <LoginInput
          placeholder="Password"
          onChangeText={(text) => dispatch(SetPasswordValue(text))}
        />
        <Text>{data.login.email}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
