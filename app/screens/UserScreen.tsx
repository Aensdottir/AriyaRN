import { Entypo } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Flex, Icon, Pressable, StatusBar, Text, View } from "native-base";
import React, { useEffect } from "react";
// Packages
import changeNavigationBarColor from "react-native-navigation-bar-color";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserProfileView, VariableSettingButton } from "../components";
// Custom Imports
import { styles } from "../Styles";
// Providers
import { useUser } from "../utils/providers/UserProvider";
// React-Navigation
import { RootStackParamList } from "./RootStackParams";
type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const UserScreen = ({ route, navigation }: Props) => {
  const { userData, isEditingProfile, setIsEditingProfile, signOut } =
    useUser();

  useEffect(() => {
    changeNavigationBarColor("#303145", true, true);
  }, []);

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
            Settings
          </Text>
        </View>
        <Flex padding={6}>
          <View mb={7}>
            <UserProfileView />
          </View>

          <Flex
            py={2}
            w={"full"}
            borderRadius={20}
            bg={"main.bg.300"}
            alignItems={"center"}
          >
            <VariableSettingButton
              type={"arrow"}
              primaryText={"General"}
              secondaryText={null}
              onPress={() => navigation.navigate("GeneralSettings")}
            />
            <VariableSettingButton
              type={"arrow"}
              primaryText={"Account"}
              secondaryText={null}
              onPress={() => navigation.navigate("AccountSettings")}
            />
            <VariableSettingButton
              type={"arrow"}
              primaryText={"Security"}
              secondaryText={null}
              onPress={() => navigation.navigate("AccountSettings")}
            />
            <VariableSettingButton
              type={"arrow"}
              primaryText={"Sign out"}
              secondaryText={null}
              onPress={() => signOut()}
            />
          </Flex>
        </Flex>
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;
