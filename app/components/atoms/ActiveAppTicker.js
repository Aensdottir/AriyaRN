// @ts-nocheck
import { Box, Image, View, Flex, Text, Spacer } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import TextTicker from "react-native-text-ticker";

export const ActiveAppTicker = (props) => {
  const data = useSelector((state) => state);
  const appMainTitle = data.server.appMainTitle;
  const appSubTitle = data.server.appSubTitle;
  const activeApp = `   ${appMainTitle} ${
    appSubTitle == "" ? "" : `- ${data.server.appSubTitle}`
  }`;
  return (
    <Box
      borderRadius={"20"}
      w={"full"}
      h={60}
      mt={8}
      mb={4}
      shadow={9}
      p={2}
      bg={"#232834"}
      justifyContent={"center"}
      overflow={"hidden"}
    >
      <Box
        position={"absolute"}
        zIndex={2}
        w={60}
        h={"full"}
        bg={{
          linearGradient: {
            colors: ["#232834", "transparent"],
            start: [0.1, 0],
            end: [0.6, 0],
          },
        }}
      />
      <Box
        position={"absolute"}
        zIndex={2}
        right={0}
        w={60}
        h={"full"}
        bg={{
          linearGradient: {
            colors: ["#232834", "transparent"],
            start: [0.6, 0],
            end: [0.1, 0],
          },
        }}
      />
      <TextTicker
        zIndex={1}
        scroll={false}
        style={{ fontFamily: "Kanit-Regular", fontSize: 20 }}
        duration={8000}
        loop
        animationType="scroll"
        marqueeDelay={1000}
        useNativeDriver={true}
        repeatSpacer={50}
      >
        {activeApp}
      </TextTicker>
    </Box>
  );
};
