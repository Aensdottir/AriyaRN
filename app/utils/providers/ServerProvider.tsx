import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
// Packages
import TcpSocket from "react-native-tcp-socket";
// Custom Imports
import { fadeInValue, fadeOutValue } from "../../constants";
import { Base64Encode, bin2String, Sleep } from "../common";
import { fadeIn, fadeOut } from "../transitions";
import { useUser } from "./UserProvider";

interface ServerContextType {
  connectionText: string;
  isConnected: boolean;
  isCommunicating: boolean;
  startConnection: () => void;
  endConnection: () => void;
  refetchServerData: () => void;
  writeToServer: (data: string) => void;
  isDeviceLocked: boolean;
  deviceUptime: string;
  focusedApp: string;
}

interface Props {
  children: ReactNode;
}

const ServerContext = createContext({} as ServerContextType);

export const useServer = () => useContext(ServerContext);

const ServerProvider: FunctionComponent<Props> = ({ children }) => {
  const [connectionText, setConnectionText] = useState("not connected");
  const [isConnected, setIsConnected] = useState(false);
  const [isCommunicating, setIsCommunicating] = useState(false);
  const [isDeviceLocked, setIsDeviceLocked] = useState(false);

  const [deviceUptime, setDeviceUptime] = useState("00:00:00");
  const [focusedApp, setFocusedApp] = useState("unknown");

  const { userData } = useUser();

  var client: any = null;

  const startConnection = useCallback(async () => {
    try {
      setConnectionText("connecting");
      client = TcpSocket.createConnection(
        { host: userData?.deviceIpAddress, port: 10144 },
        () => {
          client.write(Base64Encode("connect") + "$");
        }
      );
      client.on("data", (data: string | Buffer) => {
        const response = bin2String(data);
        handleResponse(response);
        setIsConnected(true);
        setIsCommunicating(false);
        setConnectionText("connected");
      });
      client.on("error", function (error: any) {
        setIsConnected(false);
        setIsCommunicating(false);
        setConnectionText("not connected");
        console.error(error);
      });
      client.on("timeout", () => {
        setIsConnected(false);
        setIsCommunicating(false);
        setConnectionText("not connected");
        console.log("socket timeout");
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const endConnection = useCallback(async () => {
    try {
      setIsCommunicating(true);
      console.log("Ending connection");
      setConnectionText("disconnecting");
      client.write(Base64Encode("disconnect") + "$");
      client.on("data", async (data: string | Buffer) => {
        client.destroy();
        setIsConnected(false);
        setConnectionText("not connected");
        clearInterval(timer);
        console.log("Connection closed");
      });
    } catch (error) {
      setIsCommunicating(false);
      console.log(error);
    }
  }, []);
  const refetchServerData = useCallback(async () => {
    try {
      setIsCommunicating(true);
      console.log("Refetching server data...");
      client.write(Base64Encode("refetch") + "$");
    } catch (error) {
      setIsCommunicating(false);
      console.log(error);
    }
  }, []);

  const writeToServer = useCallback(async (data: string) => {
    try {
      setIsCommunicating(true);
      console.log("Writing to server");
      client.write(Base64Encode(data) + "$");
    } catch (error) {
      setIsCommunicating(false);
      console.log(error);
    }
  }, []);

  const handleResponse = useCallback(async (data: string) => {
    try {
      const response: string[] = data.split("$");
      console.warn(response);
      console.log("Acknowledged command:", response[0]);

      const invoker = response[0];
      const lockState = response[1];
      const bootTime = response[2];
      const focusedApp = response[3];

      lockState && setIsDeviceLocked(lockState === "True");
      bootTime && serverUptime(bootTime);
      focusedApp && setFocusedApp(focusedApp);

      if (invoker == "lock") {
        setIsDeviceLocked(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  var timer: NodeJS.Timeout;
  const serverUptime = useCallback(async (bootTime: string) => {
    if (bootTime > "00:00:00") {
      let hours = parseInt(bootTime.substring(0, 2));
      let minutes = parseInt(bootTime.substring(3, 5));
      let seconds = parseInt(bootTime.substring(6, 8));
      let startDateTime = new Date(2022, 0, 3, hours - 1, minutes, seconds, 0); // YYYY (M-1) D H m s ms
      let startStamp = startDateTime.getTime();
      let newDate = new Date();
      let newStamp = newDate.getTime();

      let updateClock = function (time: any) {
        // @ts-ignore
        if (isConnected == false) clearInterval(this);

        newDate = new Date();
        newStamp = newDate.getTime();
        let diff = Math.round((newStamp - startStamp) / 1000);
        //console.log(diff);
        let d: string | number = Math.floor(diff / (24 * 60 * 60));
        diff = diff - d * 24 * 60 * 60;
        let h: string | number = Math.floor(diff / (60 * 60));
        diff = diff - h * 60 * 60;
        let m: string | number = Math.floor(diff / 60);
        diff = diff - m * 60;
        let s: string | number = diff;
        h = format(h);
        m = format(m);
        s = format(s);
        function format(object: string | number) {
          if (object < 10) {
            object = "0" + object;
          }
          return object;
        }

        setDeviceUptime(h + ":" + m + ":" + s);
      };

      timer = setInterval(updateClock, 1000, bootTime);
    }
  }, []);

  return (
    <ServerContext.Provider
      value={{
        startConnection,
        endConnection,
        refetchServerData,
        writeToServer,
        connectionText,
        isConnected,
        isCommunicating,
        isDeviceLocked,
        deviceUptime,
        focusedApp,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export default ServerProvider;
/*const TcpConnect = (command: string) => {
  console.log("Start");

  if (command == "connect") {
    setConnectionText("CONNECTING");
  } else if (command == "disconnect") {
    setConnectionText("DISCONNECTING");
  }
  // Connect
  console.log("Connect");
  client = createConnection(options, () => {
    let data = Base64Encode(command);
    client.write("ONE" + "$");
    //Sleep(120000).then(() => client.write("TWO" + "$"));
  });
  // On data received
  client.on("data", (data: string | Buffer) => {
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
  });
};*/
