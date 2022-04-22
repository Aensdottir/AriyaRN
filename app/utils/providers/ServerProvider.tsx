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
} from "..";
import { options, fadeInValue, fadeOutValue } from "../../constants";

interface CounterContextType {
  TcpConnect: (command: string) => void;
  connectionText: string;
  serverTime: string;
  serverUptime: string;
  appMainTitle: string;
  appSubTitle: string;
  toggle: boolean;
  toggle2: boolean;
  buttonEnabled: boolean;
  connected: boolean;
  setToggle: (value: boolean) => void;
}

interface Props {
  children: ReactNode;
}

const ServerContext = createContext({} as CounterContextType);

export const useServer = () => useContext(ServerContext);

const ServerProvider: FunctionComponent<Props> = ({ children }) => {
  const [connectionText, setConnectionText] = useState("NOT CONNECTED");
  const [serverTime, setServerTime] = useState("00:00:00");
  const [serverUptime, setServerUptime] = useState("00:00:00");
  const [appMainTitle, setAppMainTitle] = useState("");
  const [appSubTitle, setAppSubTitle] = useState("");
  const [toggle, setToggle] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [connected, setConnected] = useState(false);

  const TcpConnect = (command: string) => {
    console.log("Start");

    const client = TcpSocket.createConnection(options, () => {
      console.log("Connect");
      let i = 0;
      const MAX_ITER = 1000;
      write();
      async function write() {
        console.log("Write");
        let ok = true;
        while (i < MAX_ITER && ok) {
          i++;
          const buff = " ->" + command + "<- ";
          ok = client.write(buff);
          // await new Promise((resolve) => setTimeout(resolve, 50));
          //console.log("Bytes sent", ok, buff, client.bytesWritten);
        }
        if (i >= MAX_ITER) {
          client.destroy();
        } else if (!ok) {
          // Had to stop early!
          // Write some more once it drains.
          client.once("drain", write);
        }
      }
    });

    client.on("data", function (data) {
      console.log("message was received", data);
    });

    client.on("error", function (error) {
      console.log(error);
    });

    client.on("close", function () {
      console.log("Connection closed!");
    });
    /*if (command == "connect") {
      setConnectionText("CONNECTING");
    } else if (command == "disconnect") {
      setConnectionText("DISCONNECTING");
    }
    // Connect
    console.log("Connect");
    const client = TcpSocket.createConnection(options, () => {
      //let data = Base64Encode(command);
      /*for (let i = 0; i < 100; i++) {
        let data = command.slice(2048 * i, 2048 * (i + 1));
        client.write(data);
        console.log("A");
      }*/

    /* let i = 1000000;
      write();
      function write() {
        console.log("Start");
        let ok = true;
        do {
          i--;
          if (i === 0) {
            console.log("LAST");
            // Last time!
            client.write(command);
          } else {
            console.log("NORMAL");
            // See if we should continue, or wait.
            // Don't pass the callback, because we're not done yet.
            ok = client.write(command);
          }
        } while (i > 0 && ok);
        if (i > 0) {
          console.log("DRAIN");
          // Had to stop early!
          // Write some more once it drains.
          client.once("drain", () => write());
        }
      }*/

    /*client.write(Base64Encode("AAA"));
      client.once("drain", () => TcpConnect(command));
      console.log("a");
      client.write(Base64Encode("BBB"));
      console.log("b");
      client.write(Base64Encode("CCC") + "$");
      console.log("c");
    });*/
    // On data received
    /*client.on("data", function (data) {
      client.destroy();
      const response = bin2String(data).split(",");
      const serverTime = response[0];
      const compUptime = response[1];
      //const foregroundApp = ForegroundAppTitle(response[2]);

      setServerTime(serverTime); // For latency

      console.log("message was received", response);
      console.log("compUptime", compUptime);
      //setAppMainTitle(foregroundApp[0]);
      //setAppSubTitle(foregroundApp[1]);
      setToggle(!toggle);
      setToggle2(false);
      setButtonEnabled(true);

      // CONNECT
      if (command == "connect") {
        setConnected(true);
        setConnectionText("CONNECTED");
        setServerUptime(compUptime);

        fadeIn(fadeInValue);
        Sleep(500).then(() => fadeOut(fadeOutValue));
      }
      // DISCONNECT
      else if (command == "disconnect") {
        setConnected(false);
        setConnectionText("NOT CONNECTED");
        setServerTime("00:00:00");
        setToggle2(true);
        fadeOut(fadeInValue);
        fadeIn(fadeOutValue);
      }*/
    // LATENCY
    /*if (command == "connect" || command == "latencyRefresh") {
        Sleep(20000).then(() => TcpConnect("latencyRefresh"));
      }*/
    /*});
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
    });*/
  };

  return (
    <ServerContext.Provider
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
        setToggle,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export default ServerProvider;
