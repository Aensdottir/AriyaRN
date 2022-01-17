// @ts-nocheck
//React Imports
import React, { useState } from "react";
import { Animated, Image as RNImage } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Box as NBBox,
  NativeBaseProvider,
  Text,
  Flex,
  ScrollView,
  StatusBar,
  PresenceTransition,
} from "native-base";
//Package Imports
import TcpSocket from "react-native-tcp-socket";
import { useFonts } from "expo-font";
//Custom Imports
import GLOBAL from "../utils/state/globalState";
import { ariyaTheme, mainConfig, styles } from "../Styles";
import {
  Card,
  Placeholder,
  Box,
  HeaderAnimConnected,
  HeaderAnimDisconnected,
  ComputerInfo,
  FadeInTransition,
  SlideTransition,
  ConnectBox,
} from "../components";
import {
  HEADER_MAX_HEIGHT,
  headerTranslateY,
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
} from "../utils/redux/actions";

const MainScreen = () => {
  const [connectionText, setConnectionText] = useState("NOT CONNECTED");
  const [latencyImage, setLatencyImage] = useState(
    require("../assets/images/StatusDefault.png")
  );
  const [loadData, setLoadData] = useState(true);

  const [toggle2, setToggle2] = useState(true);
  const [textOpacity1, setTextOpacity1] = useState(1);

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

  return (
    <NativeBaseProvider theme={ariyaTheme} config={mainConfig}>
      <StatusBar
        backgroundColor={"#151921"}
        animated={true}
        barStyle={"light-content"}
      />
      <Flex bg={"#202531"} flex={1}>
        <FadeInTransition>
          <Animated.ScrollView
            contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: GLOBAL.scrollY } } }],
              { useNativeDriver: true }
            )}
          >
            <ConnectBox onPress={() => ToggleTcp()} />
            <ComputerInfo />

            <NBBox bg={"#1b202a"} h={50} mb={0} justifyContent={"center"}>
              <Text
                textAlign={"center"}
                fontFamily={"Agency-FB"}
                fontSize={"30"}
              >
                ABOUT
              </Text>
            </NBBox>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              bg={"#232834"}
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

        <Animated.View
          style={{
            ...styles.header,
            transform: [{ translateY: headerTranslateY }],
            backgroundColor: "#1b202a",
            height: HEADER_MAX_HEIGHT,
          }}
        >
          <HeaderAnimDisconnected opacity={fadeOutValue} />
          <HeaderAnimConnected opacity={fadeInValue} />
          <SlideTransition visible={!toggle2}>
            <Text
              textAlign={"center"}
              fontFamily={"Agency-FB"}
              fontSize={33}
              textDecorationLine={"underline"}
            >
              {connectionText}
            </Text>
          </SlideTransition>
          <Text
            position={"absolute"}
            opacity={textOpacity1}
            top={227}
            alignSelf={"center"}
            textAlign={"center"}
            fontFamily={"Agency-FB"}
            fontSize={33}
            textDecorationLine={"underline"}
          >
            {connectionText}
          </Text>
          <PresenceTransition
            visible={!toggle}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 2000,
              },
            }}
          >
            <Text
              top={260}
              left={145}
              fontSize="2xl"
              position={"absolute"}
              fontFamily={"Agency-FB"}
              position={"absolute"}
            >
              CONNECTION: GOOD
            </Text>
          </PresenceTransition>
          <Text
            opacity={0}
            top={260}
            left={125}
            fontSize="2xl"
            position={"absolute"}
            fontFamily={"Agency-FB"}
            position={"absolute"}
          >
            CONNECTION: STRONG
          </Text>
          <RNImage
            opacity={0}
            position={"absolute"}
            style={{ width: 50 }}
            resizeMode="contain"
            left={213}
            top={251}
            source={latencyImage}
          ></RNImage>
        </Animated.View>
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
      setConnectionText("CONNECTING");
    } else if (command == "disconnect") {
      setConnectionText("DISCONNECTING");
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
      setLatencyImage(Latency(serverTime));
      dispatch(SetToggle(!toggle));
      setToggle2(false);
      dispatch(SetButtonEnabled(true));

      // CONNECT
      if (!command.includes("disconnect")) {
        if (command.includes("connect")) {
          Sleep(500).then(() => setTextOpacity1(0));
          setConnectionText("CONNECTED");
          dispatch(SetServerTime(compUptime));
        }
        fadeIn(fadeInValue);
        Sleep(500).then(() => fadeOut(fadeOutValue));
      }
      // DISCONNECT
      else if (command.includes("disconnect")) {
        Sleep(100).then(() => setTextOpacity1(1));
        setConnectionText("NOT CONNECTED");
        dispatch(SetServerTime("00:00:00"));
        setLoadData(false);
        setToggle2(true);
        fadeOut(fadeInValue);
        fadeIn(fadeOutValue);
        setLatencyImage(require("../assets/images/StatusDefault.png"));
      }
      // LATENCY
      if (command == "connect" || command == "latencyRefresh") {
        Sleep(20000).then(() => TcpConnect("latencyRefresh"));
      }
    });
    client.on("error", function (error) {
      console.log(error);
      setConnectionText("NOT CONNECTED");
    });
    client.on("timeout", () => {
      console.log("socket timeout");
      if (command == "latencyRefresh") {
        setConnectionText("NOT CONNECTED");
      } else {
        Sleep(100).then(() => setTextOpacity1(1));
        setConnectionText("CONNECTION FAILED");
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
