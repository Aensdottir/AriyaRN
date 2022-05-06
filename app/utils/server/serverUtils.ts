//import TcpSocket from "react-native-tcp-socket";
import { Buffer } from "buffer";

function Latency(serverTime: number) {
  const date = new Date();
  const dateString = date.toISOString().substring(14, 23); // "2020-01-06T19:57:12.14
  const minutes = parseInt(dateString.substring(0, 2)) * 60000;
  const secondsMs = parseInt(dateString.substring(3).replace(".", "")) * 1;
  const clientTime = minutes + secondsMs;
  const latency = clientTime - serverTime;
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

function ForegroundAppTitle(title: string) {
  let titleArray = null;
  if (title.includes("-")) titleArray = title.split("-");

  if (titleArray != null) {
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
        : (subTitle = title.replace("- Firefox", ""));
    } else if (title.includes("Google Chrome")) {
      mainTitle = "Google Chrome";
    }
    return [mainTitle, subTitle];
  }
}

function Sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function bin2String(array: any) {
  const base64encoded = String.fromCharCode.apply(String, array);
  const response = Buffer.from(base64encoded, "base64").toString();
  return response;
}
function Base64Encode(input: string) {
  return Buffer.from(input, "binary").toString("base64");
}
function Base64Decode(input: string) {
  return Buffer.from(input, "base64").toString();
}

export {
  Latency,
  Sleep,
  bin2String,
  ForegroundAppTitle,
  Base64Encode,
  Base64Decode,
};
