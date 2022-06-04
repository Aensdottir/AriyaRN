import { Entypo } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Flex,
  Icon,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
// Packages
import changeNavigationBarColor from "react-native-navigation-bar-color";
import { SafeAreaView } from "react-native-safe-area-context";
// Custom Imports
import { styles } from "../../Styles";
// Providers
import { useUser } from "../../utils/providers/UserProvider";
// React-Navigation
import { RootStackParamList } from "../RootStackParams";
type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginHistory = ({ route, navigation }: Props) => {
  const { userData, isEditingProfile, setIsEditingProfile, signOut } =
    useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    changeNavigationBarColor("#202531", true, true);
  }, []);

  const loginArr = [{ time: "a", text: "text" }];
  loginArr.push({ time: "b", text: "b" });
  const fetchLogin = async () => {
    const loginEntriesSnapshot = await firestore()
      .collection("Users")
      .doc(userData?.id)
      .collection("loginEntries")
      .get();
    loginEntriesSnapshot.forEach((doc) => {
      console.log(doc.data().time);
      loginArr.push({ time: doc.data().time, text: "b" });
    });
    setIsLoading(false);
    console.log(loginArr);
  };

  const loginList = () => {
    initialArr.map(async (item) => {
      return (
        <Flex key={item.time} bg={"black"} h={50}>
          {item.time}
        </Flex>
      );
    });
  };
  const initialArr = [
    {
      color: "blue",
      time: "text1",
    },
    {
      color: "red",
      time: "text2",
    },
  ];

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
        <View
          flexDir={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          h={50}
          m={3}
        >
          <Pressable
            position={"absolute"}
            left={"2"}
            onPress={() => navigation.goBack()}
          >
            {({ isPressed }) => {
              return (
                <Icon
                  as={<Entypo name="chevron-thin-left" />}
                  size={25}
                  color={isPressed ? "gray.500" : "gray.300"}
                />
              );
            }}
          </Pressable>
          <Text fontSize={28} fontFamily={"Kanit-Regular"}>
            Login History
          </Text>
        </View>
        <Flex padding={6}>
          <View mb={7}>
            <Text textAlign={"center"}>
              Your login history is displayed here.
            </Text>
          </View>
          <ScrollView
            py={2}
            w={"full"}
            h={"85%"}
            borderRadius={20}
            bg={"main.bg.300"}
          >
            {loginList}
          </ScrollView>
        </Flex>
      </View>
    </SafeAreaView>
  );
};

export default LoginHistory;
