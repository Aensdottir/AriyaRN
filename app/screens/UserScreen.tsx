import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  Pressable,
  Flex,
  Image,
  Button,
} from "native-base";
// Packages
import changeNavigationBarColor from "react-native-navigation-bar-color";
// Custom Imports
import { styles } from "../Styles";
// Providers
import { useUser } from "../utils/providers/UserProvider";
// React-Navigation
import { RootStackParamList } from "./RootStackParams";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, Platform } from "react-native";
type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const UserScreen = ({ route, navigation }: Props) => {
  const { userData, selectProfileImage } = useUser();
  const [image, setImage] = useState("");

  useEffect(() => {
    changeNavigationBarColor("#303145", true, true);
  }, []);

  const [imgSrc, setImgSrc] = useState(userData?.profileImageUrl);
  const [fallback, setFallback] = useState(false);
  const reloadSrc = (e: any) => {
    if (fallback) {
      e.target.src = userData?.profileImageUrl;
    } else {
      e.target.src = imgSrc;
      setFallback(true);
    }
  };
  console.log(userData);
  return (
    <SafeAreaView style={[styles.loginContainer]}>
      <StatusBar
        backgroundColor={"transparent"}
        translucent={true}
        animated={true}
        barStyle={"light-content"}
      />
      <View flex={1} bg={"main.bg.100"}>
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
        <Flex
          flex={1}
          bg={"main.bg.400"}
          alignItems={"center"}
          justify={"center"}
          borderBottomRadius={40}
        >
          <View>
            <Image
              size={180}
              borderRadius={"full"}
              bg={"gray.500"}
              alt={"Profile"}
              source={{
                uri: userData?.profileImageUrl,
              }}
              key={userData?.profileImageUrl}
              onError={reloadSrc}
            />

            <Pressable
              position={"absolute"}
              bottom={1}
              right={1}
              size={45}
              onPress={() => selectProfileImage()}
            >
              {({ isPressed }) => {
                return (
                  <Flex size={45} borderRadius={"full"} bg={"main.red"}></Flex>
                );
              }}
            </Pressable>
          </View>
          {/*<Button onPress={() => selectImage()}> Select</Button>
          <Button onPress={() => uploadImage()}> Upload</Button>
          {image !== "" ? (
            <Image size={210} source={{ uri: image.uri }} />
          ) : null}*/}
        </Flex>
        <Flex flex={1.7}></Flex>
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;
