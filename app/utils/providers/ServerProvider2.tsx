import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from "react";

import TcpSocket from "react-native-tcp-socket";
import {
  Base64Encode,
  bin2String,
  ForegroundAppTitle,
  Sleep,
  fadeIn,
  fadeOut,
} from "../../utils";
import { options, fadeInValue, fadeOutValue } from "../../constants";

interface CounterContextType {
  TcpConnect: ({ command }: { command: string }) => void;
  connectionText: string;
  serverTime: string;
  serverUptime: string;
  appMainTitle: string;
  appSubTitle: string;
  toggle: boolean;
  toggle2: boolean;
  buttonEnabled: boolean;
  connected: boolean;
}

interface Props {
  children: ReactNode;
}

const CounterContext = createContext({} as CounterContextType);

export const useTCP = () => useContext(CounterContext);

const CounterProvider: FunctionComponent<Props> = ({ children }) => {
  const [connectionText, setConnectionText] = useState("NOT CONNECTED");
  const [serverTime, setServerTime] = useState("00:00:00");
  const [serverUptime, setServerUptime] = useState("00:00:00");
  const [appMainTitle, setAppMainTitle] = useState();
  const [appSubTitle, setAppSubTitle] = useState();
  const [toggle, setToggle] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [connected, setConnected] = useState(false);

  const TcpConnect = (command) => {
    if (command == "connect") {
      setConnectionText("CONNECTING");
    } else if (command == "disconnect") {
      setConnectionText("DISCONNECTING");
    }
    // Connect
    const client = TcpSocket.createConnection(options, () => {
      command = Base64Encode(command);
      client.write(command + "$");
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
      setServerTime(serverTime);
      setAppMainTitle(foregroundApp[0]);
      setAppSubTitle(foregroundApp[1]);
      setToggle(!toggle);
      setToggle2(false);
      setButtonEnabled(true);

      // CONNECT
      if (!command.includes("disconnect")) {
        if (command.includes("connect")) {
          setConnected(true);
          setConnectionText("CONNECTED");
          setServerTime(compUptime);
        }
        fadeIn(fadeInValue);
        Sleep(500).then(() => fadeOut(fadeOutValue));
      }
      // DISCONNECT
      else if (command.includes("disconnect")) {
        setConnected(false);
        setConnectionText("NOT CONNECTED");
        setServerTime("00:00:00");
        setToggle2(true);
        fadeOut(fadeInValue);
        fadeIn(fadeOutValue);
      }
      // LATENCY
      if (command == "connect" || command == "latencyRefresh") {
        Sleep(20000).then(() => TcpConnect("latencyRefresh"));
      }
    });
    client.on("error", function (error) {
      console.log(error);
      setConnectionText("NOT CONNECTED");
      setConnected(false);
    });
    client.on("timeout", () => {
      console.log("socket timeout");
      if (command == "latencyRefresh") {
        setConnectionText("NOT CONNECTED");
      } else {
        setConnectionText("CONNECTION FAILED");
        setConnected(false);
        setButtonEnabled(true);
      }
      setToggle(true);
    });
    client.on("close", function () {
      console.log("Connection closed!");
      client.destroy();
    });
  };

  return (
    <CounterContext.Provider
      value={{
        TcpConnect,
        connectionText,
        serverTime,
        serverUptime,
        appMainTitle,
        appSubTitle,
        toggle,
        toggle2,
        buttonEnabled,
        connected,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};

export default CounterProvider;
