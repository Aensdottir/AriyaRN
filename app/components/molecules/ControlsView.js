// @ts-nocheck
import { Box, Image, View, Flex, Text, Spacer } from "native-base";
import { ActiveAppTicker, ControlButton } from "../atoms";
import { useDispatch, useSelector } from "react-redux";
import { UptimeText } from "./UptimeText";
import TcpSocket from "react-native-tcp-socket";
import TextTicker from "react-native-text-ticker";
import { options } from "../../constants";
import { bin2String, ForegroundAppTitle } from "../../utils";
import {
  SetForegroundApp,
  SetToggle,
  SetButtonEnabled,
  SetToggle2,
  SetConnectionText,
} from "../../utils/redux/actions";

export const ControlsView = (props) => {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const appMainTitle = data.server.appMainTitle;
  const appSubTitle = data.server.appSubTitle;
  const activeApp = `    ${appMainTitle} ${
    appSubTitle == null ? "" : `- ${data.server.appSubTitle}`
  }`;
  return (
    <Flex flexDirection={"row"} justify={"center"} flexWrap={"wrap"} m={9}>
      <Box
        borderRadius={"20"}
        size={150}
        shadow={9}
        bg={"#232834"}
        mr={4}
        p={4}
        justifyContent={"space-between"}
      >
        <UptimeText />
        <Box width={"full"} bg={"#fff"} h={1} />
        <Text fontFamily={"Kanit-Regular"} textAlign={"center"} fontSize={30}>
          Idle
        </Text>
      </Box>
      <Box
        borderRadius={"20"}
        size={150}
        ml={4}
        mb={8}
        flexDir={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        alignContent={"space-between"}
      >
        <ControlButton
          color={"#45303b"}
          size={"small"}
          type={"shutdown"}
          onPress={() => TcpConnect("shutdown")}
        />
        <ControlButton color={"#303845"} size={"small"} type={"restart"} />
        <ControlButton
          color={"#30453f"}
          size={"wide"}
          type={"lock"}
          onPress={() => TcpConnect("lock")}
        />
      </Box>

      <ActiveAppTicker />
    </Flex>
  );
  function TcpConnect(command) {
    console.log("Connecting with:", command);
    // Connect
    const client = TcpSocket.createConnection(options, () => {
      client.write(command);
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
      dispatch(SetForegroundApp(foregroundApp));
      dispatch(SetToggle(!toggle));
      dispatch(SetToggle2(false));
      dispatch(SetButtonEnabled(true));
    });
    client.on("error", function (error) {
      console.log(error);
      dispatch(SetConnectionText("NOT CONNECTED"));
    });
    client.on("timeout", () => {
      console.log("socket timeout");
      dispatch(SetConnectionText("CONNECTION FAILED"));
      dispatch(SetButtonEnabled(true));
      dispatch(SetToggle(true));
    });
    client.on("close", function () {
      console.log("Connection closed!");
      client.destroy();
    });
  }
};
