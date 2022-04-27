import { Box, Image, Flex, Text, Pressable } from "native-base";

const SendImageCard = ({ func }) => {
  return (
    <Box
      bg={"#303845"}
      w={300}
      h={"full"}
      justifyContent={"center"}
      borderRadius={15}
      overflow={"hidden"}
    >
      <Flex
        position={"absolute"}
        justifyContent={"center"}
        bottom={0}
        left={0}
        h={118}
        w={250}
      >
        <Text
          m={5}
          fontFamily={"Kanit-Regular"}
          fontSize={15}
          textAlign={"center"}
        >
          You can send an image from your phone straight to your connected
          device.
        </Text>
        <Box
          position={"absolute"}
          size={"full"}
          bg={{
            linearGradient: {
              colors: ["transparent", "#000000"],
              start: [0, 0.07],
              end: [0, -0.1],
            },
          }}
        />
        <Box
          position={"absolute"}
          size={"full"}
          bg={{
            linearGradient: {
              colors: ["transparent", "#000000"],
              start: [0.97, 0],
              end: [1.05, 0],
            },
          }}
        />
      </Flex>
      <Box
        position={"absolute"}
        top={0}
        h={50}
        w={250}
        bg={{
          linearGradient: {
            colors: ["#6B404B90", "#00000030"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        justifyContent={"center"}
        zIndex={0}
      >
        <Text
          left={6}
          fontFamily={"Kanit-Regular"}
          fontSize={20}
          textAlign={"center"}
        >
          Sending an image
        </Text>
      </Box>
      <Box
        zIndex={1}
        position={"absolute"}
        alignItems={"center"}
        justifyContent={"center"}
        borderBottomRightRadius={15}
        size={50}
        top={0}
        left={0}
        bg={{
          linearGradient: {
            colors: ["#6B404B", "#454B69"],
            start: [0, 0],
            end: [1, 1],
          },
        }}
      >
        <Image
          size={25}
          opacity={0.8}
          alt="Nav"
          source={require("../../assets/images/image.png")}
        />
      </Box>
      <Pressable
        onPress={func}
        position={"absolute"}
        alignItems={"center"}
        justifyContent={"center"}
        h={"full"}
        w={50}
        right={0}
      >
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Box
              bg={"#00000030"}
              h={"full"}
              w={50}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image
                opacity={isPressed ? 0.5 : 0.8}
                size={30}
                alt="Nav"
                source={require("../../assets/images/chevron-right.png")}
              />
            </Box>
          );
        }}
      </Pressable>
    </Box>
  );
};
export { SendImageCard };
