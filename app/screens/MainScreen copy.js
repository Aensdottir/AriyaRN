// @ts-nocheck
//React Imports
import React, { useState } from "react";
import { Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Box as NBBox,
  NativeBaseProvider,
  Text,
  Flex,
  ScrollView,
  StatusBar,
} from "native-base";
//Package Imports
import TcpSocket from "react-native-tcp-socket";
import { useFonts } from "expo-font";
//Custom Imports
import { ariyaTheme, mainConfig } from "../Styles";
import {
  Card,
  Placeholder,
  Box,
  ComputerInfo,
  FadeInTransition,
  ConnectFlex,
  ConnectionHeader,
  ControlsComponent,
} from "../components";
import {
  scrollY,
  HEADER_MAX_HEIGHT,
  options,
  fadeInValue,
  fadeOutValue,
} from "../constants";
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
  SetTransitionColor,
} from "../utils/redux/actions";

const MainScreen = () => {
  const [loadData, setLoadData] = useState(true);

  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const toggle = data.server.toggle;

  const TestTcp = () => {
    TcpConnect2("connect");
  };

  useFonts({
    "Agency-FB": require("../assets/fonts/agency-fb.ttf"),
    Inconsolata: require("../assets/fonts/Inconsolata.ttf"),
    "Kanit-Regular": require("../assets/fonts/Kanit-Regular.ttf"),
  });

  const [animation, setAnimation] = useState(new Animated.Value(1));
  let boxInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(90,210,244)", "rgb(224,82,99)"],
  });
  const animatedStyle = {
    backgroundColor: boxInterpolation,
  };
  const [color, setColor] = useState("rgb(74, 45, 62)");
  return (
    <NativeBaseProvider theme={ariyaTheme} config={mainConfig}>
      <StatusBar
        backgroundColor={"#151921"}
        animated={true}
        barStyle={"light-content"}
      />
      <Flex bg={"main.bg"} flex={1}>
        <FadeInTransition>
          <Animated.ScrollView
            contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
          >
            <ConnectFlex onPressFunc={() => ToggleTcp()} />
            <ComputerInfo />

            <ControlsComponent />

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              bg={"main.lighterBg"}
              h={230}
            >
              <Card>
                <Text mt={1.5} mx={3}>
                  Ariya - Notification Panel
                </Text>
                <FadeInTransition visible={!loadData}>
                  <Placeholder />
                </FadeInTransition>
                <FadeInTransition visible={loadData}></FadeInTransition>
              </Card>

              <Card />
            </ScrollView>

            <Box px="20" py="5" my={2} mx={5}></Box>
            <Box px="20" py="5" my={2} mx={5}></Box>
            <Box px="20" py="5" my={2} mx={5}></Box>
            <Box px="20" py="5" my={2} mx={5}></Box>
            <Box px="20" py="5" my={2} mx={5}></Box>
          </Animated.ScrollView>
        </FadeInTransition>

        <ConnectionHeader />
      </Flex>
    </NativeBaseProvider>
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
