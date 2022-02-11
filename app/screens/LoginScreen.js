// @ts-nocheck
import React, { useState, useEffect } from "react";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
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
  Image,
  Button,
  Pressable,
  AlertDialog,
} from "native-base";
import { styles } from "../Styles";
import { SetEmailValue, SetPasswordValue } from "../utils/redux/actions";

import { LoginInput } from "../components";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);

  const [show, setShow] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef(null);

  const onClose = () => setIsOpen(false);

  const handleClick = () => setShow(!show);

  const [fullName, setFullName] = useState("Adam");
  const [email, setEmail] = useState("krzakadam74@gmail.com");
  const [password, setPassword] = useState("aaaaaa");
  const [confirmPassword, setConfirmPassword] = useState("aaaaaa");
  const onLoginPress = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("Signed in!");
        navigation.navigate("Main");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }
        console.error(error);
      });
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
