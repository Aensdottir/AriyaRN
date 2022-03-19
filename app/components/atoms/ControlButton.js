// @ts-nocheck
import { Box, Image, View, Text, Pressable } from "native-base";

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
    borderRadius: "15",
    justifyContent: "center",
    alignItems: "center",
    flexDir: "row",
  },
};

export const ControlButton = ({ props, color, size, type, onPress }) => {
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

  let icon = null;
  let text = null;
  switch (type) {
    case "shutdown":
      icon = require("../../assets/images/power.png");
      break;
    case "restart":
      icon = require("../../assets/images/restart.png");
      break;
    case "lock":
      icon = require("../../assets/images/lock.png");
      text = "Lock";
      break;
  }

  if (size == "small") {
    return (
      <Pressable onPress={onPress}>
        {({ isHovered, isFocused, isPressed }) => {
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
                source={icon}
              />
            </Box>
          );
        }}
      </Pressable>
    );
  } else if (size == "wide")
    return (
      <Pressable onPress={onPress}>
        {({ isHovered, isFocused, isPressed }) => {
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
                source={icon}
                opacity={isPressed ? 0.7 : 1}
              />
              <Text
                fontFamily={"Kanit-Regular"}
                fontSize={20}
                m={1}
                opacity={isPressed ? 0.7 : 1}
              >
                {text}
              </Text>
            </Box>
          );
        }}
      </Pressable>
    );
};
