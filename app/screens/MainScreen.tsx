import React, { useEffect } from "react";
import { Image as RNImage } from "react-native";
import {
  Flex,
  StatusBar,
  Button,
  Image,
  Box,
  useScreenReaderEnabled,
} from "native-base";
// Packages
import { SafeAreaView } from "react-native-safe-area-context";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
// Custom Imports
import { styles } from "../Styles";
import {
  Topbar,
  ConnectionComponent,
  ControlsBottom,
  SlideUpComponent,
} from "../components";
import { useDebounce } from "../utils";
// Providers
import { useServer } from "../utils/providers/ServerProvider";
import { useUser } from "../utils/providers/UserProvider";
// React-Navigation
import { RootStackParamList } from "./RootStackParams";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Main">;

const MainScreen = ({ route, navigation }: Props) => {
  const { TcpConnect, toggle, setToggle } = useServer();
  const { userData } = useUser();
  const { debounce } = useDebounce(); // Prevent button double click

  useEffect(() => {
    changeNavigationBarColor("#151921", true, true);
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

      <Flex flex={1} bg={"main.bg.50"}>
        <Flex
          position={"absolute"}
          bottom={0}
          w={"100%"}
          h={"100%"}
          bg={{
            linearGradient: {
              colors: ["transparent", "gradient.lightPurple"],
              start: [0, 0.3],
              end: [0, 1],
            },
          }}
        />
        <Topbar navigation={navigation} />
      </Flex>

      <Flex flex={1.2} bg={"main.bg.300"} alignItems={"center"}>
        <Flex
          position={"absolute"}
          bottom={0}
          w={"100%"}
          h={400}
          bg={{
            linearGradient: {
              colors: ["main.bg.300", "main.bg.50"],
              start: [0, 0],
              end: [0, 1],
            },
          }}
        />
        <ConnectionComponent onPressFunc={() => debounce(ToggleTcp)} />
        <Flex
          flexDirection={"row"}
          top={340}
          h={60}
          w={260}
          borderRadius={"full"}
          overflow={"hidden"}
          bg={{
            linearGradient: {
              colors: ["main.red", "gradient.blue", "#36507d"],
              start: [-0.05, -1.5],
              end: [1, 0],
            },
          }}
        >
          {/*<Flex
            position={"absolute"}
            bottom={0}
            w={"100%"}
            h={"100%"}
            bg={{
              linearGradient: {
                colors: ["transparent", "gradient.lightPurple"],
                start: [0, 0],
                end: [0, 2],
              },
            }}
          />
          <Button flex={1} bg={"transparent"} borderRadius={0}>
            <Image
              size={30}
              resizeMode="contain"
              alt="Nav"
              source={require("../assets/images/icons/PowerIcon.png")}
            />
          </Button>
          <Button flex={1} bg={"transparent"} borderRadius={0}>
            <Image
              size={33}
              resizeMode="contain"
              alt="Nav"
              source={require("../assets/images/icons/RestartIcon.png")}
            />
          </Button>
          <Button
            flex={1}
            bg={"transparent"}
            borderRadius={0}
            onPress={() => TcpConnect("lock")}
          >
            <Image
              size={30}
              resizeMode="contain"
              alt="Nav"
              source={require("../assets/images/icons/LockIcon.png")}
            />
          </Button>*/}
        </Flex>
      </Flex>

      {/*<ControlsBottom />*/}

      {/*</SafeAreaView><SlideUpComponent disabled={!connected} />*/}
    </SafeAreaView>
  );
  function ToggleTcp() {
    if (toggle) {
      TcpConnect("connect");
    } else {
      TcpConnect("disconnect");
    }
    setToggle(!toggle);
  }
};

export default MainScreen;
