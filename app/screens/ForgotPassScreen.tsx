import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Flex, ScrollView, StatusBar, Text, View } from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmailInput, LoginRedirectText } from "../components";
// Custom Imports
import { styles } from "../Styles";
import { useUser } from "../utils/providers/UserProvider";
// React-Navigation
import { RootStackParamList } from "./RootStackParams";
type Props = NativeStackScreenProps<RootStackParamList, "ForgotPass">;

const ForgotPassScreen = ({ route, navigation }: Props) => {
  const { sendResetPasswordEmail, forgotPassError } = useUser();

  const [email, setEmail] = useState("");
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
          <View justifyContent={"center"} alignItems={"center"}>
            <Text
              fontFamily={"Kanit-Regular"}
              fontSize={40}
              textAlign={"center"}
            >
              Forgot
            </Text>
            <Text
              top={-20}
              fontFamily={"Kanit-Regular"}
              fontSize={40}
              textAlign={"center"}
            >
              Password?
            </Text>

            <Text
              top={-20}
              fontSize={15}
              textAlign={"center"}
              color={"gray.300"}
            >
              {"Enter your email address below\nto reset your password."}
            </Text>
          </View>
          <View alignItems={"center"} top={-10}>
            <Text fontSize={15} textAlign={"center"} color={"main.red"}>
              {forgotPassError}
            </Text>
            <EmailInput onChangeText={(text: string) => setEmail(text)} />

            <Button
              bg={"main.red"}
              top={30}
              borderRadius={"full"}
              h={50}
              w={300}
              onPress={() => sendResetPasswordEmail(email)}
            >
              <Text color={"white"}>Reset Password</Text>
            </Button>
          </View>
        </ScrollView>
        <LoginRedirectText navigation={navigation} type={"ForgotPass"} />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassScreen;
