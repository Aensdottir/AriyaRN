import React, { useState, useRef } from "react";
import { Animated, Dimensions } from "react-native";
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
// Packages
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
// Custom Imports
import { styles } from "../Styles";
import {
  FadeInTransition,
  Topbar,
  ConnectionComponent,
  ControlsBottom,
  SlideUpComponent,
} from "../components";
import { useDebounce } from "../utils";
// Providers
import { useServer } from "../utils/providers/ServerProvider";
// React-Navigation
import { RootStackParamList } from "./RootStackParams";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Main">;

const MainScreen = ({ route, navigation }: Props) => {
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

      <Button onPress={() => Logout()}></Button>

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
