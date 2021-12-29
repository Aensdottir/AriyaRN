// @ts-nocheck
import React, { useState, Component } from "react";
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
} from "native-base";
import TopComponent from "./TopComponent";

const Box = (props) => {
  return <NBBox borderRadius="md" bg="primary.600" {...props} />;
};

function App() {
  const { toggleColorMode } = useColorMode();
  const [latencyText, setLatencyText] = useState("Latency");

  return (
    <NativeBaseProvider>
      <Flex bg={useColorModeValue("#fff", "802020")} flex={1}>
        <ScrollView>
          <TopComponent />
          <Text
            position={"absolute"}
            alignSelf={"center"}
            top={105}
            fontSize="2xl"
          >
            Latency
          </Text>
          <ScrollView>
            <Box mx="auto" my="5" px="20" py="5" onPress={toggleColorMode}>
              <Text color="cyan" fontWeight="bold">
                {" "}
                NativeBase
              </Text>
            </Box>
            <Button size={"md"} m={5} onPress={toggleColorMode}>
              Toggle
            </Button>
            <Button onPress={() => TcpConnect()}>Click</Button>
            <Box px="20" py="5" my={2} mx={5} onPress={toggleColorMode}></Box>
            <Box px="20" py="5" my={2} mx={5} onPress={toggleColorMode}></Box>
            <Box px="20" py="5" my={2} mx={5} onPress={toggleColorMode}></Box>
            <Box px="20" py="5" my={2} mx={5} onPress={toggleColorMode}></Box>
            <Box px="20" py="5" my={2} mx={5} onPress={toggleColorMode}></Box>
          </ScrollView>
        </ScrollView>
      </Flex>
    </NativeBaseProvider>
  );

  function TcpConnect() {
    const options = {
      port: 10144,
      //host: "192.168.1.30",
      host: "78.98.61.153",
    };
    const client = TcpSocket.createConnection(options, () => {
      client.write("Client");
    });
    client.on("data", function (data) {
      console.log("message was received", bin2String(data));
      var latency = Latency(bin2String(data));
      setLatencyText(latency + "ms");
      client.destroy();
    });

    client.on("error", function (error) {
      console.log(error);
    });

    client.on("close", function () {
      console.log("Connection closed!");
      client.destroy();
    });
  }
  function bin2String(array) {
    return String.fromCharCode.apply(String, array);
  }
  function Latency(serverTime) {
    const date = new Date();
    const dateString = date.toISOString().substring(17, 23); // "2020-01-06T19:57:12.14
    const latency = (dateString - serverTime.substring(17))
      .toPrecision(3)
      .substring(2);
    console.log(
      "Servertime: " +
        serverTime.substring(17) +
        "\n" +
        "Clienttime: " +
        dateString
    );
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
