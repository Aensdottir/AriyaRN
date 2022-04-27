import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Box,
  Image,
  Button,
  Pressable,
  AlertDialog,
  Flex,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  NameInput,
  EmailInput,
  PasswordInput,
  RegisterButton,
} from "../components";
import { styles } from "../Styles";
import { useFonts } from "expo-font";

import { useDispatch, useSelector } from "react-redux";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

// React-Navigation
import { RootStackParamList } from "./RootStackParams";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen = ({ route, navigation }: Props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);

  const [show, setShow] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef(null);

  const onClose = () => setIsOpen(false);

  const handleClick = () => setShow(!show);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usersCollection = firestore().collection("Users");

  function onRegisterPress() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("User account created");
        const uid = response.user.uid;

        firestore()
          .collection("Users")
          .doc(uid)
          .set({
            id: uid,
            name: fullName,
            email: email,
          })
          .then(() => {
            console.log("User data added!");
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }
        console.error(error);
      });
  }
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
            <NameInput onChangeText={(text: string) => setFullName(text)} />
            <EmailInput onChangeText={(text: string) => setEmail(text)} />
            <PasswordInput onChangeText={(text: string) => setPassword(text)} />
            <RegisterButton onPress={() => onRegisterPress()} />
          </View>
        </ScrollView>
        <View
          position={"absolute"}
          bottom={8}
          flexDirection={"row"}
          alignSelf={"center"}
        >
          <Text fontFamily={"Kanit-Regular"} color={"muted.300"}>
            Already have an account?
          </Text>
          <Pressable
            px={25}
            alignItems={"center"}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            {({ isPressed }) => {
              return (
                <Text
                  underline={true}
                  position={"absolute"}
                  fontFamily={"Kanit-Regular"}
                  color={isPressed ? "muted.400" : "#fff"}
                >
                  Login
                </Text>
              );
            }}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
