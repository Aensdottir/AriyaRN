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

import { ReactReduxContext, useDispatch, useSelector } from "react-redux";

import { firebase } from "../firebase/config";

const RegisterScreen = ({ navigation }) => {
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
  const onRegisterPress = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        firebase
          .firestore()
          .collection("users")
          .add(data)
          .then(() => {
            navigation.navigate("Main");
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
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
            keyboardType={"name"}
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
            onPress={() => navigation.navigate("Main")}
          >
            <Text color={"red.500"}>Test</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
