import { launchImageLibrary } from "react-native-image-picker";
import { Box, Flex, Text, ScrollView } from "native-base";
import { ActiveAppTicker, ControlButton, SendImageCard } from "../atoms";
import { UptimeText } from "./UptimeText";
import { useServer } from "../../utils/providers/ServerProvider";

export const ControlsView = (props) => {
  const { TcpConnect } = useServer();

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
