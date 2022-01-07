// @ts-nocheck
import React from "react";
import { Animated, Image as RNImage } from "react-native";
import {
  Box as NBBox,
  NativeBaseProvider,
  Text,
  Flex,
  ScrollView,
  StatusBar,
} from "native-base";
import { ariyaTheme, mainConfig, styles } from "../Styles";
import { useFonts } from "expo-font";
import {
  Card,
  Placeholder,
  Box,
  ConnectButton,
  HeaderAnim,
  FadeInTransition,
} from "../components";
import { ToggleTcp, HEADER_MAX_HEIGHT, headerTranslateY } from "../utils";

import GLOBAL from "../utils/state/globalState";

const MainScreen = () => {
  const toggle = GLOBAL.toggle;

  let [fontsLoaded] = useFonts({
    "Agency-FB": require("../assets/fonts/agency-fb.ttf"),
  });

  return (
    <NativeBaseProvider theme={ariyaTheme} config={mainConfig}>
      <StatusBar
        backgroundColor={"#151921"}
        animated={true}
        barStyle={"light-content"}
      />
      <Flex bg={"#21252e"} flex={1}>
        <FadeInTransition>
          <Animated.ScrollView
            contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: GLOBAL.scrollY } } }],
              { useNativeDriver: true }
            )}
          >
            <ConnectButton
              isDisabled={GLOBAL.buttonDisabled}
              onPress={() => ToggleTcp()}
            >
              {toggle ? "CONNECT" : "DISCONNECT"}
            </ConnectButton>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              bg={"#232834"}
              h={200}
            >
              <Card>
                <Text mt={1.5} mx={3}>
                  Computer Information
                </Text>
                <FadeInTransition visible={!GLOBAL.loadData}>
                  <Placeholder />
                </FadeInTransition>
                <FadeInTransition visible={GLOBAL.loadData}>
                  <Text
                    position={"absolute"}
                    top={35}
                    left={5}
                    fontSize={"3xl"}
                  >
                    {!GLOBAL.uptimeToggle ? "00:00:00" : GLOBAL.uptime}
                  </Text>
                </FadeInTransition>
              </Card>

              <Card />
            </ScrollView>

            <NBBox bg={"#1b202a"} h={50} mb={10}>
              <Text
                textAlign={"center"}
                fontFamily={"Agency-FB"}
                fontSize={"3xl"}
              >
                CONTROLS
              </Text>
            </NBBox>

            <Box px="20" py="5" my={2} mx={5}></Box>
            <Box px="20" py="5" my={2} mx={5}></Box>
            <Box px="20" py="5" my={2} mx={5}></Box>
            <Box px="20" py="5" my={2} mx={5}></Box>
            <Box px="20" py="5" my={2} mx={5}></Box>
            <Box px="20" py="5" my={2} mx={5}></Box>
            <Box px="20" py="5" my={2} mx={5}></Box>
            <Box px="20" py="5" my={2} mx={5}></Box>
            <Box px="20" py="5" my={2} mx={5}></Box>
            <Box px="20" py="5" my={2} mx={5}></Box>
            <Box px="20" py="5" my={2} mx={5}></Box>
            <Box px="20" py="5" my={2} mx={5}></Box>
          </Animated.ScrollView>
        </FadeInTransition>

        <Animated.View
          style={{
            ...styles.header,
            transform: [{ translateY: headerTranslateY }],
            backgroundColor: "#1b202a",
            height: HEADER_MAX_HEIGHT,
          }}
        >
          <HeaderAnim opacity={GLOBAL.fadeOutValue} />
          <HeaderAnim
            source={require("../assets/animations/headerAnim/TopBarAnim.json")}
            opacity={GLOBAL.fadeInValue}
          />
          <Text
            top={220}
            textAlign={"center"}
            fontFamily={"Agency-FB"}
            fontSize="3xl"
            textDecorationLine={"underline"}
          >
            {GLOBAL.connectionText}
          </Text>
          <Text
            top={260}
            left={145}
            fontSize="2xl"
            position={"absolute"}
            fontFamily={"Agency-FB"}
            position={"absolute"}
          >
            STATUS:
          </Text>
          <RNImage
            position={"absolute"}
            style={{ width: 50 }}
            resizeMode="contain"
            left={213}
            top={251}
            source={GLOBAL.statusImage}
          ></RNImage>
        </Animated.View>
      </Flex>
    </NativeBaseProvider>
  );
};

export default MainScreen;
