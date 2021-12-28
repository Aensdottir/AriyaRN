// @ts-nocheck
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import TcpSocket from "react-native-tcp-socket";

import { NativeBaseProvider, Box } from "native-base";
import LottieView from "lottie-react-native";

export default function App(text) {
  const [myText, setMyText] = useState("My Original Text");

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.topView}>
          <View style={styles.statusCircle}>
            <LottieView source={require("./testAnim.json")} autoPlay loop />
          </View>
        </View>

        <Text onPress={() => setMyText()}> {myText}</Text>
        <Button onPress={() => TcpConnect()} title="Click"></Button>
      </View>
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
      setMyText(latency);
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
    console.log(latency);
    return latency;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    flex: 0.3,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  statusCircle: {
    width: 200,
    height: 200,
    backgroundColor: "#fff",
    borderWidth: 5,
    borderColor: "lightgrey",
    borderRadius: 100,
    overflow: "hidden",
  },
  animation: {
    backgroundColor: "yellow",
    width: 300,
    height: 300,
  },
});
