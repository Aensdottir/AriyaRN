// @ts-nocheck
import React, { useState, Component, useEffect, useRef } from "react";
import { Animated, StyleSheet, Image as RNImage } from "react-native";
import TcpSocket from "react-native-tcp-socket";

import {
  Box as NBBox,
  NativeBaseProvider,
  Text,
  Flex,
  ScrollView,
  StatusBar,
  PresenceTransition,
  Fade,
} from "native-base";
import { ariyaTheme, mainConfig } from "../Styles";
import { useFonts } from "expo-font";
import {
  Card,
  Placeholder,
  Box,
  ConnectButton,
  HeaderAnim,
  FadeInTransition,
} from "../components";
import { Latency, HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE } from "../utils";

function MainScreen() {
  /*const [latencyStatus, setLatencyStatus] = useState(
    require("../assets/images/StatusDefault.png")
  );*/
  const [connectionText, setConnectionText] = useState("NOT CONNECTED");
  const [loadData, setLoadData] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [toggle, setToggle] = useState(true);
  const toggleTcp = () => {
    setButtonDisabled(true);
    if (toggle) {
      setToggle(!toggle);
      TcpConnect("connect");
    } else {
      setToggle(!toggle);
      TcpConnect("disconnect");
    }
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(1)).current;

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  const [uptime, setUptime] = useState("00:00:00");
  const [uptimeToggle, setUptimeToggle] = useState(false);
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
        backgroundColor={"#151921"}
        animated={true}
        barStyle={"light-content"}
      />
      <Flex bg={"#21252e"} flex={1}>
        <FadeInTransition>
          <Animated.ScrollView
            contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true } // use native driver for animation
            )}
          >
            <ConnectButton
              isDisabled={buttonDisabled}
              onPress={() => toggleTcp()}
            >
              {toggle ? "CONNECT" : "DISCONNECT"}
            </ConnectButton>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              bg={"#232834"}
              h={200}
            >
              <Card>
                <Text mt={1.5} mx={3}>
                  Computer Information
                </Text>
                <FadeInTransition visible={!loadData}>
                  <Placeholder />
                </FadeInTransition>
                <FadeInTransition visible={loadData}>
                  <Text
                    position={"absolute"}
                    top={35}
                    left={5}
                    fontSize={"3xl"}
                  >
                    {!uptimeToggle ? "00:00:00" : uptime}
                  </Text>
                </FadeInTransition>
              </Card>

              <Card />
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
          </Animated.ScrollView>
        </FadeInTransition>

        <Animated.View
          style={{
            ...styles.header,
            transform: [{ translateY: headerTranslateY }],
            backgroundColor: "#1b202a",
          }}
        >
          <HeaderAnim opacity={fadeAnim2} />
          <HeaderAnim
            source={require("../assets/animations/headerAnim/TopBarAnim.json")}
            opacity={fadeAnim}
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
        setLatencyStatus(require("../assets/images/StatusDefault.png"));
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
