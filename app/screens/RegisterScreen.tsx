import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Flex, ScrollView, StatusBar, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// Custom Imports
import {
  EmailInput,
  LoginRedirectText,
  NameInput,
  PasswordInput,
  RegisterButton,
} from "../components";
import { styles } from "../Styles";
// Providers
import { useUser } from "../utils/providers/UserProvider";
// React-Navigation
import { RootStackParamList } from "./RootStackParams";
type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen = ({ route, navigation }: Props) => {
  const { signUpError, resetError, createUserWithEmailAndPassword } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
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
            flexGrow: 1,
          }}
        >
          <View justifyContent={"center"} alignItems={"center"}>
            <Text fontFamily={"Kanit-Regular"} fontSize={40}>
              Register
            </Text>
          </View>
          <View alignItems={"center"}>
            <Text fontWeight={"bold"} color={"danger.500"}>
              {signUpError}
            </Text>

            <NameInput onChangeText={(text: string) => setName(text)} />
            <EmailInput onChangeText={(text: string) => setEmail(text)} />
            <PasswordInput onChangeText={(text: string) => setPassword(text)} />

            <RegisterButton
              onPress={() =>
                createUserWithEmailAndPassword({ email, password, name })
              }
            />
          </View>
        </ScrollView>
        <LoginRedirectText navigation={navigation} type={"Login"} />
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
