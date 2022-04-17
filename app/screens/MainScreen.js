// @ts-nocheck
//React Imports
import React, { useState, useRef } from "react";
import { Animated, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  NativeBaseProvider,
  Flex,
  StatusBar,
  Image,
  Button,
} from "native-base";
//Package Imports
import TcpSocket from "react-native-tcp-socket";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
//Custom Imports
import { styles } from "../Styles";
import {
  Box,
  FadeInTransition,
  Topbar,
  ConnectionComponent,
  SlideUpComponent,
  SlideUpPanel,
  SlidePanel,
} from "../components";
import { options, fadeInValue, fadeOutValue } from "../constants";
import {
  Sleep,
  Latency,
  bin2String,
  TcpConnect2,
  ForegroundAppTitle,
  fadeIn,
  fadeOut,
  Base64Encode,
} from "../utils";
import {
  SetForegroundApp,
  SetServerTime,
  SetToggle,
  SetButtonEnabled,
  SetToggle2,
  SetConnectionText,
  SetConnected,
} from "../utils/redux/actions";
import LottieView from "lottie-react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { Text } from "react-native-svg";
import { useServer } from "../utils/providers/ServerProvider";

const MainScreen = ({ navigation }) => {
  const { TcpConnect, toggle, setToggle } = useServer();
  const [loadData, setLoadData] = useState(true);

  const offsetY = useRef(new Animated.Value(0)).current;

  async function Logout() {
    await AsyncStorage.removeItem("loginData");
    auth().signOut();
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar
        backgroundColor={"transparent"}
        translucent={true}
        animated={true}
        barStyle={"light-content"}
      />
      <Flex bg={"#0d0d17"} flex={1}>
        <Image
          opacity={1}
          source={require("../assets/images/bgImage.png")}
          alt="Alternate Text"
          size="full"
          position={"absolute"}
          resizeMethod="resize"
        />
        <Topbar />

        <ConnectionComponent onPressFunc={() => ToggleTcp()} />

        <Button
          bg={"#1c1e39"}
          alignSelf={"center"}
          top={180}
          w={300}
          onPress={() => Logout()}
        >
          Logout
        </Button>

        <SlideUpComponent />
      </Flex>
    </SafeAreaView>
  );
  function ToggleTcp() {
    if (toggle) {
      TcpConnect("connect");
    } else {
      TcpConnect("disconnect");
    }
    setToggle(!toggle);
  }
};

export default MainScreen;
