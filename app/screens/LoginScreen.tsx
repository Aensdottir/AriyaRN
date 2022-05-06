import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  Pressable,
  Flex,
} from "native-base";
// Packages
import changeNavigationBarColor from "react-native-navigation-bar-color";
// Custom Imports
import { styles } from "../Styles";
import {
  AlertDialogUnavailable,
  EmailInput,
  ForgotPassword,
  LoginButton,
  LoginRedirectText,
  LoginScreenLogo,
  PasswordInput,
} from "../components";
// Providers
import { useCommon } from "../utils/providers/CommonProvider";
import { useUser } from "../utils/providers/UserProvider";
// React-Navigation
import { RootStackParamList } from "./RootStackParams";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ route, navigation }: Props) => {
  const {
    signInError,
    resetError,
    signInWithEmailAndPassword,
    sendResetPasswordEmail,
  } = useUser();

  const { setAlertOpen } = useCommon();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    changeNavigationBarColor("#303145", true, true);
    resetError();
  }, []);

  return (
    <SafeAreaView style={[styles.loginContainer]}>
      <StatusBar
        backgroundColor={"transparent"}
        translucent={true}
        animated={true}
        barStyle={"light-content"}
      />
      <View flex={1} bg={"main.bg.100"}>
        <Flex
          position={"absolute"}
          bottom={0}
          w={"100%"}
          h={300}
          bg={{
            linearGradient: {
              colors: ["main.bg.100", "#303145"],
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
            <LoginScreenLogo />

            <Text fontWeight={"bold"} color={"danger.500"}>
              {signInError}
            </Text>

            <EmailInput onChangeText={(text: string) => setEmail(text)} />
            <PasswordInput onChangeText={(text: string) => setPassword(text)} />

            <ForgotPassword onPress={() => navigation.navigate("ForgotPass")} />

            <LoginButton
              onPress={() => signInWithEmailAndPassword({ email, password })}
            />
          </View>
        </ScrollView>
        <LoginRedirectText navigation={navigation} type={"Register"} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
