// @ts-nocheck
import TcpSocket from "react-native-tcp-socket";
import GLOBAL from "../state/globalState.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { View, Text } from "native-base";

function TcpConnect2(command) {
  const dispatch = useDispatch();
  console.log(command);
  if (command == "connect") {
    GLOBAL.connectionText = "CONNECTING";
  }
  if (command == "disconnect") {
    GLOBAL.connectionText = "NOT CONNECTED";
    fadeOut(GLOBAL.fadeInValue);
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
      GLOBAL.connectionText = "CONNECTED";
      GLOBAL.loadData = true;
      if (command.includes("connect")) {
        Uptime(compUptime);
      }

      Sleep(300).then((GLOBAL.uptimeToggle = true));
      fadeIn(GLOBAL.fadeInValue);
      Sleep(500).then(() => fadeOut(GLOBAL.fadeOutValue));
    } else if (command.includes("disconnect")) {
      Sleep(300).then((GLOBAL.uptimeToggle = false));
      GLOBAL.statusImage = require("../../assets/images/StatusDefault.png");
      fadeIn(GLOBAL.fadeOutValue);
      GLOBAL.loadData = false;
    }
    GLOBAL.buttonDisabled = false;
    GLOBAL.toggle = !GLOBAL.toggle;
    if (response != "disconnect") {
      if (command == "connect" || command == "latencyRefresh") {
        //Reconnect for latency check
        Sleep(20000).then(() => TcpConnect("latencyRefresh"));
      }
    }
  });
  client.on("error", function (error) {
    console.log(error);
    GLOBAL.connectionText = "NOT CONNECTED";
  });
  client.on("timeout", () => {
    if (command == "latencyRefresh") {
      GLOBAL.connectionText = "NOT CONNECTED";
      GLOBAL.toggle = true;
    } else GLOBAL.connectionText = "CONNECTION FAILED";
    GLOBAL.toggle = true;
    GLOBAL.buttonDisabled = false;
    console.log("socket timeout");
  });
  client.on("close", function () {
    console.log("Connection closed!");

    client.destroy();
  });
}

function Latency(serverTime) {
  const date = new Date();
  const dateString = date.toISOString().substring(14, 23); // "2020-01-06T19:57:12.14
  const minutes = dateString.substring(0, 2) * 60000;
  const secondsMs = dateString.substring(3).replace(".", "") * 1;
  const clientTime = minutes + secondsMs;
  const latency = (clientTime - serverTime).toString().substring(0);
  console.log("Servertime: " + serverTime + "\n" + "Clienttime: " + clientTime);
  console.log(minutes + " / " + secondsMs);
  console.log(latency);
  if (latency <= 250) {
    return require("../../assets/images/StatusGood.png");
  } else if (latency <= 450) {
    return require("../../assets/images/StatusMid.png");
  } else if (latency > 450) {
    return require("../../assets/images/StatusBad.png");
  }
}

function ForegroundAppTitle(title) {
  let titleArray = title.split("-");

  let mainTitle = titleArray[1];
  let subTitle = titleArray[0];
  if (title.includes("Visual Studio Code")) {
    mainTitle = titleArray[2];
    subTitle = titleArray[0] + " - " + titleArray[1];
  } else if (title.includes("Discord")) {
    mainTitle = "Discord";
    subTitle = title.replace("- Discord", "");
  } else if (title.includes("Firefox")) {
    title.includes("Firefox Developer Edition")
      ? (mainTitle = "Firefox Developer Edition")
      : (mainTitle = "Firefox");
    title.includes("Firefox Developer Edition")
      ? (subTitle = title.replace("- Firefox Developer Edition", ""))
      : ((subTitle = title.replace("- Firefox")), "");
  } else if (title.includes("Google Chrome")) {
    mainTitle = "Google Chrome";
  }
  return [mainTitle, subTitle];
}

function Sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function bin2String(array) {
  return String.fromCharCode.apply(String, array);
}
export { Latency, Sleep, bin2String, TcpConnect2, ForegroundAppTitle };
