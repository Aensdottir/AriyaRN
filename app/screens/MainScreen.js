// @ts-nocheck
//React Imports
import React, { useState, useRef } from "react";
import { Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NativeBaseProvider, Flex, StatusBar, Image } from "native-base";
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
} from "../utils";
import {
  SetForegroundApp,
  SetServerTime,
  SetToggle,
  SetButtonEnabled,
  SetToggle2,
  SetConnectionText,
} from "../utils/redux/actions";
import LottieView from "lottie-react-native";

const MainScreen = () => {
  const [loadData, setLoadData] = useState(true);

  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const toggle = data.server.toggle;

  useFonts({
    "Agency-FB": require("../assets/fonts/agency-fb.ttf"),
    "Agency-FB-Bold": require("../assets/fonts/agency-fb-bold.ttf"),
    Inconsolata: require("../assets/fonts/Inconsolata.ttf"),
    "Kanit-Regular": require("../assets/fonts/Kanit-Regular.ttf"),
    TwCenMT_Bold: require("../assets/fonts/TwCenMT_Bold.ttf"),
  });
  const offsetY = useRef(new Animated.Value(0)).current;

  function animateY() {
    Animated.timing(offsetY, { toValue: -100 }).start();
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
    dispatch(SetButtonEnabled(false));
    dispatch(SetToggle(!toggle));
  }
  function TcpConnect(command) {
    if (command == "connect") {
      dispatch(SetConnectionText("CONNECTING"));
    } else if (command == "disconnect") {
      dispatch(SetConnectionText("DISCONNECTING"));
    }
    // Connect
    const client = TcpSocket.createConnection(options, () => {
      client.write(command);
    });
    client.setTimeout(5000);
    // On data received
    client.on("data", function (data) {
      client.destroy();
      const response = bin2String(data).split(",");
      const serverTime = response[0];
      const compUptime = response[1];
      const foregroundApp = ForegroundAppTitle(response[2]);

      console.log("message was received", response);
      console.log("compUptime", compUptime);
      dispatch(SetForegroundApp(foregroundApp));
      dispatch(SetToggle(!toggle));
      dispatch(SetToggle2(false));
      dispatch(SetButtonEnabled(true));

      // CONNECT
      if (!command.includes("disconnect")) {
        if (command.includes("connect")) {
          dispatch(SetConnectionText("CONNECTED"));
          dispatch(SetServerTime(compUptime));
        }
        fadeIn(fadeInValue);
        Sleep(500).then(() => fadeOut(fadeOutValue));
      }
      // DISCONNECT
      else if (command.includes("disconnect")) {
        dispatch(SetConnectionText("NOT CONNECTED"));
        dispatch(SetServerTime("00:00:00"));
        setLoadData(false);
        dispatch(SetToggle2(true));
        fadeOut(fadeInValue);
        fadeIn(fadeOutValue);
      }
      // LATENCY
      if (command == "connect" || command == "latencyRefresh") {
        Sleep(20000).then(() => TcpConnect("latencyRefresh"));
      }
    });
    client.on("error", function (error) {
      console.log(error);
      dispatch(SetConnectionText("NOT CONNECTED"));
    });
    client.on("timeout", () => {
      console.log("socket timeout");
      if (command == "latencyRefresh") {
        dispatch(SetConnectionText("NOT CONNECTED"));
      } else {
        dispatch(SetConnectionText("CONNECTION FAILED"));
        dispatch(SetButtonEnabled(true));
      }
      dispatch(SetToggle(true));
    });
    client.on("close", function () {
      console.log("Connection closed!");
      client.destroy();
    });
  }
};

export default MainScreen;
