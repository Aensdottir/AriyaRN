import React from "react";
import {
  Box,
  NativeBaseProvider,
  Center,
  useColorMode,
  useColorModeValue,
  Button,
  Text,
  Flex,
} from "native-base";

function TopComponent() {
  return (
    <Flex
      h={250}
      bg="#adecff"
      borderBottomRadius={15}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        bg={"#caf3ff"}
        borderColor={"#fff"}
        borderWidth={5}
        size={200}
        borderRadius={200}
        shadow={9}
      ></Box>
    </Flex>
  );
}

export default TopComponent;
