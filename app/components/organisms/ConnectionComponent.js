// @ts-nocheck
import React, { useRef } from "react";

import {
  Box as NBBox,
  View,
  Text,
  Image,
  Flex,
  Spacer,
  Pressable,
} from "native-base";
import { Animated } from "react-native";
import LottieView from "lottie-react-native";

export const ConnectionComponent = ({ onPressFunc }) => {
  const offsetY = useRef(new Animated.Value(10)).current;
  let toggle = true;

  function animateY() {
    Animated.timing(offsetY, {
      toValue: toggle ? -100 : 10,
      useNativeDriver: true,
    }).start();
    toggle = !toggle;
  }

  return (
    <Flex
      position={"absolute"}
      justifyContent={"center"}
      alignItems={"center"}
      top={-105}
      size={210}
      borderRadius={"full"}
      bg={"main.bg.300"}
    >
      <Pressable onPress={onPressFunc}>
        {({ isPressed }) => {
          return (
            <Flex alignItems={"center"}>
              <Image
                position={"absolute"}
                top={60}
                w={250}
                resizeMode={"contain"}
                source={require("../../assets/images/CornerSmooth.png")}
                alt="."
              />
              <Flex
                bg={"red.500"}
                size={175}
                borderRadius={"full"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Flex
                  bg={isPressed ? "main.bg.300" : "main.bg.100"}
                  size={155}
                  borderRadius={"full"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Image
                    size={90}
                    opacity={isPressed ? 0.9 : 1}
                    resizeMode={"contain"}
                    source={require("../../assets/images/ConnectButtonIcon.png")}
                    alt="Connect"
                  />
                </Flex>
              </Flex>
            </Flex>
          );
        }}
      </Pressable>
    </Flex>
  );
};
