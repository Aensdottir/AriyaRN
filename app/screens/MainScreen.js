// @ts-nocheck
import React, { useState, Component, useEffect, useRef } from "react";
import { Animated, StyleSheet, Image as RNImage } from "react-native";
import TcpSocket from "react-native-tcp-socket";
import LottieView from "lottie-react-native";

import {
  Box as NBBox,
  NativeBaseProvider,
  useColorModeValue,
  Button,
  Text,
  Flex,
  ScrollView,
  StatusBar,
  Image,
  PresenceTransition,
} from "native-base";
import { ariyaTheme, mainConfig } from "../Styles";
import { useFonts } from "expo-font";
import { Card, Box } from "../components";

const HEADER_MAX_HEIGHT = 300;
function MainScreen() {
  const [connectionText, setConnectionText] = useState("NOT CONNECTED");
  const [latencyStatus, setLatencyStatus] = useState(
    require("../assets/StatusDefault.png")
  );
  const [loadData, setLoadData] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [uptime, setUptime] = useState("00:00:00");
  const [uptimeToggle, setUptimeToggle] = useState(false);

  const [toggle, setToggle] = useState(true);
  const toggleTcp = () => {
    setButtonDisabled(true);
    if (toggle) {
      setToggle(!toggle);
      TcpConnect("connect");
    } else if (toggle == false) {
      setToggle(!toggle);
      TcpConnect("disconnect");
    }
  };

  const HEADER_MIN_HEIGHT = 85;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(1)).current;
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  function Uptime(uptime) {
    let hours = uptime.substring(0, 2);
    let minutes = uptime.substring(3, 5);
    let seconds = uptime.substring(6, 8);
    var startDateTime = new Date(2022, 0, 3, hours, minutes, seconds, 0); // YYYY (M-1) D H m s ms (start time and date from DB)
    var startStamp = startDateTime.getTime();
    var newDate = new Date();
    var newStamp = newDate.getTime();

    var timer;
    function updateClock() {
      newDate = new Date();
      newStamp = newDate.getTime();
      var diff = Math.round((newStamp - startStamp) / 1000);
      //console.log(diff);
      var d = Math.floor(diff / (24 * 60 * 60));
      diff = diff - d * 24 * 60 * 60;
      var h = Math.floor(diff / (60 * 60));
      diff = diff - h * 60 * 60;
      var m = Math.floor(diff / 60);
      diff = diff - m * 60;
      var s = diff;
      h = format(h);
      m = format(m);
      s = format(s);
      function format(object) {
        if (object < 10) {
          object = "0" + object;
        }
        return object;
      }

      setUptime(h + ":" + m + ":" + s);
    }
    timer = setInterval(updateClock, 1000);
  }

  let [fontsLoaded] = useFonts({
    "Agency-FB": require("../assets/fonts/agency-fb.ttf"),
  });
  return (
    <NativeBaseProvider theme={ariyaTheme} config={mainConfig}>
      <StatusBar
        backgroundColor={useColorModeValue("#151921", "#040810")}
        animated={true}
        barStyle={"light-content"}
      ></StatusBar>
      <Flex bg={"#21252e"} flex={1}>
        <PresenceTransition
          visible={true}
          initial={{
            opacity: 0,
            scale: 1,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 2000,
            },
          }}
        >
          <Animated.ScrollView
            contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true } // use native driver for animation
            )}
          >
            <ScrollView>
              <Button
                style={{
                  fontFamily: "Agency-FB",
                }}
                m={5}
                w={170}
                h={50}
                bg={"transparent"}
                isDisabled={buttonDisabled}
                _disabled={{ opacity: 0.5, backgroundColor: "#292e39" }}
                borderColor={"#fff"}
                borderWidth={2}
                borderRadius={100}
                alignSelf={"center"}
                onPress={() => toggleTcp()}
              >
                {toggle ? "CONNECT" : "DISCONNECT"}
              </Button>
              <ScrollView
                horizontal={true}
                bg={"#232834"}
                showsHorizontalScrollIndicator={false}
                h={200}
              >
                <Card>
                  <NBBox
                    height={35}
                    opacity={1}
                    bg={{
                      linearGradient: {
                        colors: ["#2b3a54", "#582828"],
                        start: [0, 0],
                        end: [1, 0],
                      },
                    }}
                  >
                    <Text mt={1.5} mx={3}>
                      Computer Information
                    </Text>
                  </NBBox>
                  <PresenceTransition
                    visible={!loadData}
                    initial={{
                      opacity: 0,
                      scale: 1,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 2000,
                      },
                    }}
                  >
                    <Image
                      position={"absolute"}
                      source={require("../assets/CardTextPlaceholder.png")}
                      top={-35}
                      opacity={0.7}
                      left={2}
                      w={260}
                      height={170}
                      alt="image"
                    />
                  </PresenceTransition>
                  <PresenceTransition
                    visible={loadData}
                    initial={{
                      opacity: 0,
                      scale: 1,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 2000,
                      },
                    }}
                  >
                    <Text
                      position={"absolute"}
                      top={35}
                      left={5}
                      fontSize={"3xl"}
                    >
                      {!uptimeToggle ? "00:00:00" : uptime}
                    </Text>
                  </PresenceTransition>
                </Card>
                <Card />
                <Flex>
                  <Box bg={"#21252e"} flex={1} w={200} my={4} mx={5}></Box>
                  <Box bg={"#21252e"} flex={1} w={200} my={4} mx={5}></Box>
                </Flex>
              </ScrollView>
              <NBBox bg={"#1b202a"} h={50} mb={10}>
                <Text
                  alignSelf={"center"}
                  fontFamily={"Agency-FB"}
                  fontSize={"3xl"}
                >
                  CONTROLS
                </Text>
              </NBBox>

              <Box px="20" py="5" my={2} mx={5}></Box>
              <Box px="20" py="5" my={2} mx={5}></Box>
              <Box px="20" py="5" my={2} mx={5}></Box>
              <Box px="20" py="5" my={2} mx={5}></Box>
              <Box px="20" py="5" my={2} mx={5}></Box>
              <Box px="20" py="5" my={2} mx={5}></Box>
              <Box px="20" py="5" my={2} mx={5}></Box>
              <Box px="20" py="5" my={2} mx={5}></Box>
              <Box px="20" py="5" my={2} mx={5}></Box>
              <Box px="20" py="5" my={2} mx={5}></Box>
              <Box px="20" py="5" my={2} mx={5}></Box>
              <Box px="20" py="5" my={2} mx={5}></Box>
            </ScrollView>
          </Animated.ScrollView>
        </PresenceTransition>

        <Animated.View
          style={{
            ...styles.header,
            transform: [{ translateY: headerTranslateY }],
            backgroundColor: "#1b202a",
          }}
        >
          <LottieView
            top={100}
            imageAssetsFolder={"lottie/TopBarAnim"}
            position={"absolute"}
            source={require("../assets/animations/headerAnim/TopBarAnimDisconnected.json")}
            opacity={fadeAnim2}
            autoPlay
            loop
          />
          <LottieView
            top={100}
            imageAssetsFolder={"lottie/TopBarAnim"}
            position={"absolute"}
            source={require("../assets/animations/headerAnim/TopBarAnim.json")}
            opacity={fadeAnim}
            speed={0.7}
            autoPlay
            loop
          />
          <Text
            top={220}
            alignSelf={"center"}
            position={"absolute"}
            fontFamily={"Agency-FB"}
            fontSize="3xl"
            textDecorationLine={"underline"}
          >
            {connectionText}
          </Text>
          <Text
            top={260}
            left={145}
            fontSize="2xl"
            alignSelf={"center"}
            position={"absolute"}
            fontFamily={"Agency-FB"}
            position={"absolute"}
          >
            STATUS:
          </Text>
          <RNImage
            style={{ width: 50 }}
            resizeMode="contain"
            left={213}
            top={251}
            source={latencyStatus}
          ></RNImage>
        </Animated.View>
      </Flex>
    </NativeBaseProvider>
  );

  function TcpConnect(command) {
    console.log(command);
    if (command == "connect") {
      setConnectionText("CONNECTING");
    }
    if (command == "disconnect") {
      setConnectionText("NOT CONNECTED");
      fadeOut(fadeAnim);
    }
    const options = {
      port: 10144,
      //host: "192.168.1.30",
      host: "78.98.61.153",
    };
    const client = TcpSocket.createConnection(options, () => {
      client.write(command);
    });
    client.setTimeout(5000);

    client.on("data", function (data) {
      client.destroy();
      const response = bin2String(data);
      console.log("message was received", response);
      const latencyOutput = Latency(response.substring(0, 7));
      const compUptime = response.substring(8, 16);
      if (!command.includes("disconnect")) {
        setConnectionText("CONNECTED");
        setLoadData(true);
        if (command.includes("connect")) {
          Uptime(compUptime);
        }

        Sleep(300).then(() => setUptimeToggle(true));
        fadeIn(fadeAnim);
        Sleep(500).then(() => fadeOut(fadeAnim2));
      } else if (command.includes("disconnect")) {
        Sleep(300).then(() => setUptimeToggle(false));
        setLatencyStatus(require("../assets/StatusDefault.png"));
        fadeIn(fadeAnim2);
        setLoadData(false);
      }
      setButtonDisabled(false);
      setToggle(!toggle);
      if (response != "disconnect") {
        if (command == "connect" || command == "latencyRefresh") {
          //Reconnect for latency check
          Sleep(20000).then(() => TcpConnect("latencyRefresh"));
        }
      }
    });
    client.on("error", function (error) {
      console.log(error);
      setConnectionText("NOT CONNECTED");
    });
    client.on("timeout", () => {
      if (command == "latencyRefresh") {
        setConnectionText("NOT CONNECTED");
        setToggle(true);
      } else setConnectionText("CONNECTION FAILED");
      setToggle(true);
      setButtonDisabled(false);
      console.log("socket timeout");
    });
    client.on("close", function () {
      console.log("Connection closed!");

      client.destroy();
    });
  }
  function fadeIn(object) {
    Animated.timing(
      // Animate over time
      object, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 2000, // 2000ms
        useNativeDriver: true,
      }
    ).start(); // Starts the animation
  }
  function fadeOut(object) {
    Animated.timing(
      // Animate over time
      object, // The animated value to drive
      {
        toValue: 0, // Animate to opacity: 0 (opaque)
        duration: 2000, // 2000ms
        useNativeDriver: true,
      }
    ).start(); // Starts the animation
  }

  function Sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function bin2String(array) {
    return String.fromCharCode.apply(String, array);
  }
  function Latency(serverTime) {
    const date = new Date();
    const dateString = date.toISOString().substring(14, 23); // "2020-01-06T19:57:12.14
    const minutes = dateString.substring(0, 2) * 60000;
    const secondsMs = dateString.substring(3).replace(".", "") * 1;
    const clientTime = minutes + secondsMs;
    const latency = (clientTime - serverTime).toString().substring(0);
    if (latency <= 250) {
      setLatencyStatus(require("../assets/StatusGood.png"));
    } else if (latency <= 450) {
      setLatencyStatus(require("../assets/StatusMid.png"));
    } else if (latency > 450) {
      setLatencyStatus(require("../assets/StatusBad.png"));
    }
    console.log(
      "Servertime: " + serverTime + "\n" + "Clienttime: " + clientTime
    );
    console.log(minutes + " / " + secondsMs);
    console.log(latency);
    return latency;
  }
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    height: HEADER_MAX_HEIGHT,

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },

  title: {
    color: "white",
    fontSize: 20,
  },
});

export default MainScreen;
