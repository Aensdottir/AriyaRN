// @ts-nocheck
import React, { useState, Component, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  View,
  StyleSheet,
  Text as RNText,
} from "react-native";
import TcpSocket from "react-native-tcp-socket";
import LottieView from "lottie-react-native";

import {
  Box as NBBox,
  NativeBaseProvider,
  Center,
  useColorMode,
  useColorModeValue,
  Button,
  Text,
  Flex,
  ScrollView,
  Pressable,
  Tabs,
  StatusBar,
  useTheme,
  extendTheme,
  Fade,
  PresenceTransition,
} from "native-base";
import { TopComponent, FadeInComponent } from "./TopComponent";
import ariyaTheme from "./Styles";
import AnimatedLottieView from "lottie-react-native";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

const Box = (props) => {
  return <NBBox borderRadius="md" bg="primary.600" {...props} />;
};

const HEADER_MAX_HEIGHT = 300;
function App() {
  const { toggleColorMode } = useColorMode();
  const [latencyText, setLatencyText] = useState("Latency");
  const [connectionText, setConnectionText] = useState("Disconnected");

  const HEADER_MIN_HEIGHT = 85;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const scrollY = useRef(new Animated.Value(0)).current; // our animated value

  let fadeAnim = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });
  return (
    <NativeBaseProvider theme={ariyaTheme}>
      <StatusBar
        backgroundColor={useColorModeValue("#fff", "#040810")}
        animated={true}
        barStyle={useColorModeValue("dark-content", "light-content")}
      ></StatusBar>
      <Flex bg={useColorModeValue("#c7ebff", "#040810")} flex={1}>
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
              <Button m={5} onPress={() => TcpConnect("connect")}>
                Connect
              </Button>
              <Button size={"md"} m={5} onPress={toggleColorMode}>
                Toggle
              </Button>
              <ScrollView
                horizontal={true}
                bg={"#e8f3f3"}
                showsHorizontalScrollIndicator={false}
                h={185}
              >
                <Box bg={"#fff"} w={230} flex={1} my={2} ml={5}></Box>
                <Box bg={"#fff"} w={200} flex={1} my={2} ml={5}></Box>
                <Flex>
                  <Box bg={"#fff"} flex={1} w={200} my={2} mx={5}></Box>
                  <Box bg={"#fff"} flex={1} w={200} my={2} mx={5}></Box>
                </Flex>
              </ScrollView>
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
          style={[
            styles.header,
            {
              transform: [{ translateY: headerTranslateY }],
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: "#fff",
              overflow: "hidden",
            },
          ]}
        >
          <LottieView
            top={100}
            imageAssetsFolder={"lottie/TopBarAnim"}
            position={"absolute"}
            source={require("../android/app/src/main/assets/TopBarAnimDisconnected.json")}
            opacity={1}
            autoPlay
            loop
          />
          <LottieView
            top={100}
            imageAssetsFolder={"lottie/TopBarAnim"}
            position={"absolute"}
            source={require("../android/app/src/main/assets/TopBarAnim.json")}
            opacity={fadeAnim}
            autoPlay
            loop
          />
          <Text top={200} alignSelf={"center"} fontSize="2xl">
            {connectionText}
          </Text>
        </Animated.View>
      </Flex>
    </NativeBaseProvider>
  );

  function TcpConnect(command) {
    setConnectionText("Connecting");
    const options = {
      port: 10144,
      //host: "192.168.1.30",
      host: "78.98.61.153",
    };
    const client = TcpSocket.createConnection(options, () => {
      client.write(command);
    });
    client.on("data", function (data) {
      client.destroy();
      console.log("message was received", bin2String(data));
      const latencyOutput = Latency(bin2String(data));
      setConnectionText("Connected");
      setLatencyText(latencyOutput + "ms");
      fadeIn();
      if (command == "connect") {
        //Reconnect for latency check
        Sleep(20000).then(() => TcpConnect("connect"));
      }
    });

    client.on("error", function (error) {
      console.log(error);
      setConnectionText("Disconnected");
    });

    client.on("close", function () {
      console.log("Connection closed!");
      client.destroy();
    });
  }
  function fadeIn() {
    Animated.timing(
      // Animate over time
      fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
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
  },

  title: {
    color: "white",
    fontSize: 20,
  },
});

class MainScreen extends Component {
  render() {
    return (
      <NativeBaseProvider>
        <App />
      </NativeBaseProvider>
    );
  }
}

export default MainScreen;
/*
<Flex
bg="ariya.darkgray"
h={250}
borderBottomRadius={15}
justifyContent={"center"}
alignItems={"center"}
></Flex>*/
