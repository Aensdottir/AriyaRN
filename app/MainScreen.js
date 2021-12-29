// @ts-nocheck
import React, { useState, Component, useEffect } from "react";
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
} from "native-base";
import TopComponent from "./TopComponent";

const Box = (props) => {
  return <NBBox borderRadius="md" bg="primary.600" {...props} />;
};

function App() {
  const { toggleColorMode } = useColorMode();
  const [latencyText, setLatencyText] = useState("Latency");
  const [connectionText, setConnectionText] = useState("Disconnected");

  /* //Executed on load
  useEffect(() => {
    TcpConnect();
  }, []);*/

  return (
    <NativeBaseProvider>
      <Flex bg={useColorModeValue("#fff", "802020")} flex={1}>
        <ScrollView>
          <Text position={"absolute"}>AAA</Text>
          <TopComponent />
          <Text position={"absolute"} alignSelf={"center"} fontSize="md">
            AAA
          </Text>
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
        </ScrollView>
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
    const latency = (clientTime - serverTime).toString().substring(1);
    console.log(
      "Servertime: " + serverTime + "\n" + "Clienttime: " + clientTime
    );
    console.log(minutes + " / " + secondsMs);
    console.log(latency);
    return latency;
  }
}

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
