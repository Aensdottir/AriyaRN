// @ts-nocheck
//React Imports
import React, { useState, useRef } from "react";
import { Animated, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  NativeBaseProvider,
  Flex,
  StatusBar,
  Image,
  Button,
  Text,
  View,
} from "native-base";
//Package Imports
import TcpSocket from "react-native-tcp-socket";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
//Custom Imports
import { styles } from "../Styles";
import {
  FadeInTransition,
  Topbar,
  ConnectionComponent,
  ControlsBottom,
  SlideUpComponent,
  SlideUpPanel,
  SlidePanel,
} from "../components";

import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { useServer } from "../utils/providers/ServerProvider";
import { useDebounce } from "../utils";

const MainScreen = ({ navigation }) => {
  const { TcpConnect, toggle, setToggle, connected, connectionText } =
    useServer();
  const { debounce } = useDebounce(); // Prevent button double click
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
        // Color inherited from styles.container
      />

      <Flex flex={1} bg={"main.bg.100"}>
        <Topbar />
      </Flex>

      <Flex flex={1.1} bg={"main.bg.300"} alignItems={"center"}>
        <ConnectionComponent onPressFunc={() => debounce(ToggleTcp)} />
      </Flex>

      <ControlsBottom />

      {/*</SafeAreaView><SlideUpComponent disabled={!connected} />*/}
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
