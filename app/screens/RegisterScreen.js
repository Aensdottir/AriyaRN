// @ts-nocheck
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
import { LoginInput } from "../components";
import { styles } from "../Styles";
import { useFonts } from "expo-font";

import { useDispatch, useSelector } from "react-redux";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);

  const [show, setShow] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef(null);

  const onClose = () => setIsOpen(false);

  const handleClick = () => setShow(!show);

  const [fullName, setFullName] = useState("Adam");
  const [email, setEmail] = useState("krzakadam74@gmail.com");
  const [password, setPassword] = useState("iiiiiiiiiiii");

  const usersCollection = firestore().collection("Users");

  function onRegisterPress() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("User account created & signed in!");
        const uid = response.user.uid;

        firestore()
          .collection("Users")
          .add({
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

  useFonts({
    "Agency-FB": require("../assets/fonts/agency-fb.ttf"),
    "Agency-FB-Bold": require("../assets/fonts/agency-fb-bold.ttf"),
    Inconsolata: require("../assets/fonts/Inconsolata.ttf"),
    "Kanit-Regular": require("../assets/fonts/Kanit-Regular.ttf"),
    TwCenMT_Bold: require("../assets/fonts/TwCenMT_Bold.ttf"),
  });
  return (
    <SafeAreaView style={[styles.loginContainer]}>
      <StatusBar
        backgroundColor={"transparent"}
        translucent={true}
        animated={true}
        barStyle={"light-content"}
      />
      <ScrollView
        bg={"main.bg"}
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
          <LoginInput
            type={"name"}
            placeholder="Name"
            textContentType={"name"}
            onChangeText={(text) => setFullName(text)}
          />
          <LoginInput
            keyboardType={"email-address"}
            textContentType={"emailAddress"}
            onChangeText={(text) => setEmail(text)}
          />
          <LoginInput
            type={show ? "text" : "password"}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            InputRightElement={
              <Button
                bg={"#323744"}
                size="xs"
                rounded="none"
                w="1/6"
                h="full"
                onPress={handleClick}
              >
                {show ? "Hide" : "Show"}
              </Button>
            }
          />
        </View>

        <View alignItems={"center"}>
          <Button
            m={2}
            bg={"white"}
            borderRadius={"full"}
            h={50}
            w={300}
            onPress={() => onRegisterPress()}
          >
            <Text color={"red.500"}>Register</Text>
          </Button>
          <Button
            m={2}
            bg={"white"}
            borderRadius={"full"}
            h={50}
            w={300}
            onPress={() => test()}
          >
            <Text color={"red.500"}>Test</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
