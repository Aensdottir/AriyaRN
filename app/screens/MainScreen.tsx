import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Flex, Icon, Pressable, StatusBar, Text } from "native-base";
import React, { useEffect } from "react";
import FadeInOut from "react-native-fade-in-out";
import changeNavigationBarColor from "react-native-navigation-bar-color";
// Packages
import { SafeAreaView } from "react-native-safe-area-context";
// Custom Imports
import { styles } from "../Styles";
// Providers
import { useServer } from "../utils/providers/ServerProvider";
import { useUser } from "../utils/providers/UserProvider";
// React-Navigation
import { RootStackParamList } from "./RootStackParams";
type Props = NativeStackScreenProps<RootStackParamList, "Main">;

const MainScreen = ({ route, navigation }: Props) => {
  const {
    isConnected,
    isCommunicating,
    startConnection,
    endConnection,
    refetchServerData,
    writeToServer,
    isDeviceLocked,
    deviceUptime,
    focusedApp,
    connectionText,
  } = useServer();
  const { userData } = useUser();

  useEffect(() => {
    changeNavigationBarColor("#303145", true, true);
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar
        backgroundColor={"transparent"}
        translucent={true}
        animated={true}
        barStyle={"light-content"}
        // Color inherited from styles.container
      />

      <Flex flex={1} bg={"main.bg.100"}>
        <Flex
          position={"absolute"}
          bottom={0}
          w={"100%"}
          h={300}
          bg={{
            linearGradient: {
              colors: ["main.bg.100", "#303145"],
              start: [0, 0],
              end: [0, 1],
            },
          }}
        />

        <Flex flex={1} padding={"6"}>
          <Pressable
            mb={5}
            flexDirection={"row-reverse"}
            onPress={() => navigation.navigate("User")}
          >
            {({ isPressed }) => {
              return (
                <Flex
                  size={60}
                  bg={isPressed ? "main.bg.400" : "main.bg.300"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  borderRadius={20}
                >
                  <Icon
                    as={<MaterialIcons name="settings" />}
                    size={25}
                    color={isPressed ? "gray.500" : "gray.300"}
                  />
                </Flex>
              );
            }}
          </Pressable>
          <Flex flex={1} alignItems={"center"}>
            <Flex px={10} width={"full"}>
              <Flex>
                <Text color={"gray.400"} fontFamily={"Montserrat"}>
                  You are currently
                </Text>
                <Flex top={-10} flexDirection={"row"}>
                  <Text
                    color={"main.red"}
                    fontFamily={"Montserrat-Bold"}
                    fontSize={25}
                  >
                    {connectionText}
                  </Text>
                  {/* if isConnected */}
                  {connectionText == "connected" ? (
                    <Text
                      left={3}
                      color={"gray.300"}
                      fontFamily={"Montserrat-Bold"}
                      fontSize={25}
                    >
                      0:00
                    </Text>
                  ) : null}
                </Flex>
              </Flex>
              <Flex top={-10}>
                <Text color={"gray.400"} fontFamily={"Montserrat"}>
                  to your device
                </Text>
                <Text
                  top={-5}
                  fontFamily={"Montserrat-Bold"}
                  fontSize={20}
                  numberOfLines={1}
                >
                  DESKTOP-KU8SL2G
                </Text>
              </Flex>
              <Flex top={-10}>
                <Text color={"gray.400"} fontFamily={"Montserrat"}>
                  on address
                </Text>
                <Text
                  top={-5}
                  fontFamily={"Montserrat-Bold"}
                  fontSize={20}
                  numberOfLines={1}
                >
                  {userData?.deviceIpAddress}
                </Text>
              </Flex>

              <FadeInOut visible={isConnected} duration={1000}>
                <Flex>
                  <Text color={"gray.400"} fontFamily={"Montserrat"}>
                    Your device is
                  </Text>
                  <Text
                    top={-5}
                    fontFamily={"Montserrat-Bold"}
                    fontSize={25}
                    numberOfLines={1}
                    color={"main.red"}
                  >
                    {isDeviceLocked ? "locked" : "unlocked"}
                  </Text>
                </Flex>
                <Flex>
                  <Text color={"gray.400"} fontFamily={"Montserrat"}>
                    looking at
                  </Text>
                  <Text
                    top={-5}
                    fontFamily={"Montserrat-Bold"}
                    fontSize={22}
                    numberOfLines={1}
                  >
                    {isDeviceLocked ? "lockscreen" : focusedApp}
                  </Text>
                </Flex>
                <Flex>
                  <Text color={"gray.400"} fontFamily={"Montserrat"}>
                    running for
                  </Text>
                  <Text
                    top={-5}
                    fontFamily={"Montserrat-Bold"}
                    fontSize={22}
                    numberOfLines={1}
                  >
                    {deviceUptime}
                  </Text>
                </Flex>
              </FadeInOut>
            </Flex>
            <Flex position={"absolute"} bottom={10} w={290}>
              <Flex
                h={70}
                flexDirection={"row"}
                justifyContent={"space-evenly"}
                mb={5}
              >
                <FadeInOut visible={isConnected} duration={1000}>
                  <Button
                    variant={"outline"}
                    borderRadius={20}
                    borderColor={"gray.400"}
                    size={70}
                    onPress={() => writeToServer("restart")}
                  >
                    <Icon
                      as={<MaterialCommunityIcons name="restart" />}
                      size={35}
                      color={"gray.200"}
                    />
                  </Button>
                </FadeInOut>
                <FadeInOut visible={isConnected} duration={1500}>
                  <Button
                    variant={"outline"}
                    borderRadius={20}
                    borderColor={"main.red"}
                    size={70}
                    onPress={() => writeToServer("shutdown")}
                  >
                    <Icon
                      as={<MaterialCommunityIcons name="power" />}
                      size={35}
                      color={"gray.200"}
                    />
                  </Button>
                </FadeInOut>
                <FadeInOut visible={isConnected} duration={2000}>
                  <Button
                    variant={"outline"}
                    borderRadius={20}
                    borderColor={"gray.400"}
                    size={70}
                    onPress={() => writeToServer("lock")}
                  >
                    <Icon
                      as={<MaterialCommunityIcons name="lock-outline" />}
                      size={35}
                      color={"gray.200"}
                    />
                  </Button>
                </FadeInOut>
              </Flex>

              <Button
                isDisabled={isCommunicating}
                _disabled={{ bg: "white" }}
                borderRadius={"full"}
                h={50}
                bg={isConnected ? "white" : "main.red"}
                onPress={() => {
                  isConnected ? endConnection() : startConnection();
                }}
              >
                <Text color={"main.bg.200"} fontFamily={"Montserrat-Bold"}>
                  Connect
                </Text>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </SafeAreaView>
  );
};

export default MainScreen;
