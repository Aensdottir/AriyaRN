// @ts-nocheck
import GLOBAL from "../state/globalState";
import TcpSocket from "react-native-tcp-socket";
import { fadeIn, fadeOut } from "../transitions";

function TcpConnect(command) {
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

const ToggleTcp = () => {
  GLOBAL.buttonDisabled = true;
  if (GLOBAL.toggle) {
    GLOBAL.toggle = !GLOBAL.toggle;
    TcpConnect("connect");
  } else {
    GLOBAL.toggle = !GLOBAL.toggle;
    TcpConnect("disconnect");
  }
};

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

    GLOBAL.uptime = h + ":" + m + ":" + s;
  }
  timer = setInterval(updateClock, 1000);
}

function Latency(serverTime) {
  const date = new Date();
  const dateString = date.toISOString().substring(14, 23); // "2020-01-06T19:57:12.14
  const minutes = dateString.substring(0, 2) * 60000;
  const secondsMs = dateString.substring(3).replace(".", "") * 1;
  const clientTime = minutes + secondsMs;
  const latency = (clientTime - serverTime).toString().substring(0);
  if (latency <= 250) {
    GLOBAL.statusImage = require("../../assets/images/StatusGood.png");
  } else if (latency <= 450) {
    GLOBAL.statusImage = require("../../assets/images/StatusMid.png");
  } else if (latency > 450) {
    GLOBAL.statusImage = require("../../assets/images/StatusBad.png");
  }

  console.log("Servertime: " + serverTime + "\n" + "Clienttime: " + clientTime);
  console.log(minutes + " / " + secondsMs);
  console.log(latency);
  return latency;
}

function Sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function bin2String(array) {
  return String.fromCharCode.apply(String, array);
}

export { Latency, Sleep, bin2String, TcpConnect, ToggleTcp };
