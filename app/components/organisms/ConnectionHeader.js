// @ts-nocheck
import { Text, PresenceTransition, Box as NBBox } from "native-base";
import { useSelector } from "react-redux";
import { Animated } from "react-native";
import { styles } from "../../Styles";
import {
  HeaderAnimConnected,
  HeaderAnimDisconnected,
} from "../atoms/HeaderAnim";
import { SlideTransition, FadeInTransition } from "../transitions";
import {
  HEADER_MAX_HEIGHT,
  headerTranslateY,
  fadeInValue,
  fadeOutValue,
} from "../../constants";

export const ConnectionHeader = () => {
  const data = useSelector((state) => state);
  return (
    <Animated.View
      style={{
        ...styles.header,
        transform: [{ translateY: headerTranslateY }],
        backgroundColor: "#1b202a",
        justifyContent: "flex-end",
        height: HEADER_MAX_HEIGHT,
      }}
    >
      <HeaderAnimDisconnected opacity={fadeOutValue} />
      <HeaderAnimConnected opacity={fadeInValue} />
      <NBBox
        h={85}
        bg={{
          linearGradient: {
            colors: ["transparent", "main.dark"],
            start: [0, 0.5],
            end: [0, 1],
          },
        }}
      >
        <SlideTransition visible={!data.server.toggle2}>
          <Text
            opacity={0}
            textAlign={"center"}
            fontFamily={"Agency-FB"}
            fontSize={33}
            textDecorationLine={"underline"}
          >
            {data.server.connectionText}
          </Text>
        </SlideTransition>
        <Text
          position={"absolute"}
          opacity={1}
          top={4}
          alignSelf={"center"}
          textAlign={"center"}
          fontFamily={"Agency-FB"}
          fontSize={33}
          textDecorationLine={"underline"}
        >
          {data.server.connectionText}
        </Text>
        <FadeInTransition visible={!data.server.toggle}>
          <Text
            top={260}
            left={145}
            fontSize="2xl"
            position={"absolute"}
            fontFamily={"Agency-FB"}
            position={"absolute"}
          >
            CONNECTION: GOOD
          </Text>
        </FadeInTransition>
        <Text
          opacity={0}
          top={260}
          left={125}
          fontSize="2xl"
          position={"absolute"}
          fontFamily={"Agency-FB"}
          position={"absolute"}
        >
          CONNECTION: STRONG
        </Text>
      </NBBox>
    </Animated.View>
  );
};
