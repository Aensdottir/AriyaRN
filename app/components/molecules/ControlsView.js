// @ts-nocheck
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Box, Image, View, Flex, Text, Spacer, ScrollView } from "native-base";
import { ActiveAppTicker, ControlButton, SendImageCard } from "../atoms";
import { useDispatch, useSelector } from "react-redux";
import { UptimeText } from "./UptimeText";
import TcpSocket from "react-native-tcp-socket";
import TextTicker from "react-native-text-ticker";
import { useServer } from "../../utils/providers/ServerProvider";
import { options } from "../../constants";
import {
  Base64,
  Base64Encode,
  bin2String,
  ForegroundAppTitle,
  Sleep,
} from "../../utils";
import {
  SetForegroundApp,
  SetToggle,
  SetButtonEnabled,
  SetToggle2,
  SetConnectionText,
} from "../../utils/redux/actions";

export const ControlsView = (props) => {
  const { TcpConnect } = useServer();
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const appMainTitle = data.server.appMainTitle;
  const appSubTitle = data.server.appSubTitle;
  const activeApp = `    ${appMainTitle} ${
    appSubTitle == null ? "" : `- ${data.server.appSubTitle}`
  }`;
  return (
    <Flex>
      <Flex justify={"center"} m={4}>
        <Flex flexDirection={"row"} justify={"space-between"}>
          <Box
            borderRadius={"20"}
            h={150}
            w={195}
            shadow={9}
            bg={"#232834"}
            mr={4}
            p={4}
            justifyContent={"space-between"}
          >
            <UptimeText />
            <Box width={"full"} bg={"#fff"} h={1} />
            <Text
              fontFamily={"Kanit-Regular"}
              textAlign={"center"}
              fontSize={30}
            >
              Idle
            </Text>
          </Box>
          <Box
            borderRadius={"20"}
            size={150}
            ml={4}
            flexDir={"row"}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
            alignContent={"space-between"}
          >
            <ControlButton
              color={"#45303b"}
              type={"shutdown"}
              onPress={() => TcpConnect("shutdown")}
            />
            <ControlButton
              color={"#303845"}
              type={"restart"}
              onPress={() => TcpConnect("restart")}
            />
            <ControlButton
              color={"#30453f"}
              type={"lock"}
              onPress={() => TcpConnect("lock")}
            />
          </Box>
        </Flex>

        <ActiveAppTicker />
      </Flex>

      <ScrollView
        horizontal={true}
        p={4}
        h={200}
        bg={"#1b202a"}
        _contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <SendImageCard func={() => SendImage()} />
      </ScrollView>
    </Flex>
  );
  function SendImage() {
    const imgOptions = {
      mediaType: "photo",
      includeBase64: true,
    };
    launchImageLibrary(imgOptions, callback);

    var image = "";
    function callback(props) {
      image = props.assets[0].base64; // Base64 String
      TcpConnect(image);
    }
  }
};
