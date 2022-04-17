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
    <Animated.View style={{ transform: [{ translateY: offsetY }] }}>
      <View alignItems={"center"} justifyContent={"center"} top={100}>
        <View
          justifyContent={"center"}
          alignItems={"center"}
          position={"absolute"}
        >
          <Image
            width={320}
            height={280}
            alt="Nav"
            source={require("../../assets/images/NotConnectedElipse.png")}
          />
        </View>
        <Pressable
          onPress={onPressFunc}
          alignItems={"center"}
          justifyContent={"center"}
          overflow={"visible"}
          size={200}
        >
          {({ isHovered, isFocused, isPressed }) => {
            return (
              <View
                position={"absolute"}
                opacity={isPressed ? 0.8 : 1}
                alignItems={"center"}
              >
                <Image
                  w={79}
                  h={44}
                  source={require("../../assets/images/PCiconBlue.png")}
                  alt="Alternate Text"
                />
                <Text
                  fontFamily={"Agency-FB-Bold"}
                  fontSize={25}
                  textAlign={"center"}
                >
                  CONNECT
                </Text>
              </View>
            );
          }}
        </Pressable>
      </View>
    </Animated.View>
  );
};
