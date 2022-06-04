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
import { Base64Encode, bin2String } from "../common";
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
