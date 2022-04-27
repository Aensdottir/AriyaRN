import { Box, Image, View, Text, Pressable, Flex } from "native-base";

const buttonTypes = {
  small: {
    size: 67,
    borderRadius: "15",
    justifyContent: "center",
    alignItems: "center",
    shadow: 9,
    opacity: 0.7,
  },
  wide: {
    w: 150,
    h: 67,
    shadow: 9,
    borderRadius: "15",
    justifyContent: "center",
    alignItems: "center",
    flexDir: "row",
  },
};

export const ControlButton = ({ props, color, type, onPress }) => {
  const bg = {
    linearGradient: {
      colors: ["#232834", color == null ? "#232834" : color],
      start: [0, 0],
      end: [0, 1],
    },
    pressed: {
      linearGradient: {
        colors: ["#1e2630", color == null ? "#232834" : color],
        start: [0, 0],
        end: [0, 1],
      },
    },
  };

  switch (type) {
    case "shutdown":
      return (
        <Pressable onPress={onPress}>
          {({ isPressed }) => {
            return (
              <Box
                bg={isPressed ? bg.pressed : bg}
                {...buttonTypes.small}
                {...props}
              >
                <Image
                  opacity={isPressed ? 0.7 : 1}
                  size={35}
                  alt="Nav"
                  source={require("../../assets/images/power.png")}
                />
              </Box>
            );
          }}
        </Pressable>
      );

    case "restart":
      return (
        <Pressable onPress={onPress}>
          {({ isPressed }) => {
            return (
              <Box
                bg={isPressed ? bg.pressed : bg}
                {...buttonTypes.small}
                {...props}
              >
                <Image
                  opacity={isPressed ? 0.7 : 1}
                  size={35}
                  alt="Nav"
                  source={require("../../assets/images/restart.png")}
                />
              </Box>
            );
          }}
        </Pressable>
      );

    case "lock":
      return (
        <Pressable onPress={onPress}>
          {({ isPressed }) => {
            return (
              <Box
                bg={isPressed ? bg.pressed : bg}
                {...buttonTypes.wide}
                {...props}
              >
                <Image
                  m={1}
                  size={25}
                  alt="Nav"
                  source={require("../../assets/images/lock.png")}
                  opacity={isPressed ? 0.7 : 1}
                />
                <Text
                  fontFamily={"Kanit-Regular"}
                  fontSize={20}
                  m={1}
                  opacity={isPressed ? 0.7 : 1}
                >
                  {"Lock"}
                </Text>
              </Box>
            );
          }}
        </Pressable>
      );
  }
};
