// @ts-nocheck
import { Box as NBBox, Flex, Text } from "native-base";

export const ControlsComponent = (props) => {
  return (
    <Flex top={-39}>
      <NBBox // Header
        justifyContent={"center"}
        bg={"main.dark"}
        h={60}
        borderTopRadius={30}
      >
        <Text
          top={0.5}
          textAlign={"center"}
          alignSelf={"center"}
          fontFamily={"Agency-FB"}
          fontSize={"20"}
          position={"absolute"}
        >
          QUICK CONTROLS
        </Text>
        <NBBox
          top={7}
          bg={"main.bg"}
          h={50}
          mb={0}
          justifyContent={"center"}
          borderTopRadius={30}
        ></NBBox>
      </NBBox>
    </Flex>
  );
};
