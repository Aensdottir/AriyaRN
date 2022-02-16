// @ts-nocheck
import React, { useState, useEffect } from "react";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  NativeBaseProvider,
  View,
  StatusBar,
  Text,
  ScrollView,
  Box,
  Flex,
  Image,
  Button,
  Pressable,
  AlertDialog,
} from "native-base";
import { styles } from "../Styles";
import { SetEmailValue, SetPasswordValue } from "../utils/redux/actions";

import { LoginInput } from "../components";
import { validateEmail } from "../utils";
import { errors } from "../constants";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);

  const [show, setShow] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [errorIndex, setErrorIndex] = React.useState(0);
  const cancelRef = React.useRef(null);

  const onClose = () => setIsOpen(false);

  const handleClick = () => setShow(!show);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {}, []);

  const onLoginPress = () => {
    if (validateEmail(email) != null) {
      console.log("Email VALID");
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          console.log("Signed in!");

          const user = { userId: email };
          setLoginLocal(user); // storing in local storage for next launch

          navigation.navigate("Main");
        })
        .catch((error) => {
          if (
            error.code === "auth/invalid-email" ||
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
          ) {
            console.log("Email address or password is invalid");
            setErrorIndex(1);
          }
          console.error(error);
        });
    } else {
      console.log("Email INVALID");
      setErrorIndex(2);
    }
  };
  const setLoginLocal = async (loginData) => {
    try {
      await AsyncStorage.setItem("loginData", JSON.stringify(loginData));
    } catch (err) {
      console.log(err);
    }
  };

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
        <View alignItems={"center"}>
          <Box
            shadow={4}
            borderRadius={15}
            bg={"main.lighterBg"}
            size={100}
            mb={5}
            justifyContent={"center"}
          >
            <Image
              source={require("../assets/images/AriyaLogo.png")}
              alt="Alternate Text"
              height={79}
              resizeMode={"contain"}
            />
          </Box>
          <Text fontWeight={"bold"} color={"danger.500"}>
            {errors[errorIndex]}
          </Text>
          <LoginInput
            keyboardType="email-address"
            textContentType={"emailAddress"}
            placeholder="Email"
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
          <Pressable p="2" onPress={() => setIsOpen(!isOpen)}>
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Text color={isPressed ? "#555a69" : "#656a7a"}>
                  Forgot Password?
                </Text>
              );
            }}
          </Pressable>
        </View>

        <View alignItems={"center"}>
          <Button
            m={2}
            bg={"red.400"}
            borderRadius={"full"}
            h={50}
            w={300}
            onPress={() => onLoginPress()}
          >
            <Text color={"#fff"}>Login</Text>
          </Button>
          <Button
            m={2}
            bg={"white"}
            borderRadius={"full"}
            h={50}
            w={300}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text color={"red.500"}>Register</Text>
          </Button>
        </View>
      </ScrollView>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content bg={"#313544"}>
          <AlertDialog.Header alignSelf={"center"}>
            Unavailable
          </AlertDialog.Header>
          <AlertDialog.Body alignSelf={"center"}>
            This function is currently unavailable.
            <View mt={5} flexDirection={"row"}>
              <Button
                flex={1}
                borderWidth={2}
                bg={"transparent"}
                borderColor={"#656a7a"}
                _pressed={{ bg: "#555a69" }}
                onPress={onClose}
                ref={cancelRef}
              >
                Close
              </Button>
            </View>
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
    </SafeAreaView>
  );
};

export default LoginScreen;
