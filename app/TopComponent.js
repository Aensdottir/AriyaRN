// @ts-nocheck
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
import { Animated, useRef } from "react-native";
import LottieView from "lottie-react-native";
import ariyaTheme from "./Styles";
var fadeAnim2 = new Animated.Value(1);

export function TopComponent() {
  return (
    <Flex
      bg="ariya.darkgray"
      h={250}
      position={"relative"}
      top={0}
      borderBottomRadius={15}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <LottieView
        position={"absolute"}
        source={require("../spinAnim.json")}
        opacity={1}
        autoPlay
        loop
      />
      <LottieView
        resizeMode="contain"
        position={"absolute"}
        source={require("../spinAnim.json")}
        opacity={fadeAnim2}
        autoPlay
        loop
      />
      <Box
        position={"absolute"}
        bg={"#caf3ff"}
        opacity={0}
        w={"100%"}
        h={250}
        borderBottomRadius={15}
        shadow={9}
      ></Box>
      <Box
        opacity={0}
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

export const FadeInComponent = () => {
  console.log("Fade Called");
  fadeAnim2 = Animated.timing(
    // Animate over time
    fadeAnim2, // The animated value to drive
    {
      toValue: 0, // Animate to opacity: 1 (opaque)
      duration: 2000, // 2000ms
    }
  ).start(); // Starts the animation
};
