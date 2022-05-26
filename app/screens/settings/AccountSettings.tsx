import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  StatusBar,
  Text,
  Flex,
  Icon,
  Pressable,
  Input,
  Box,
  Modal,
  FormControl,
  Button,
} from "native-base";
// Packages
import changeNavigationBarColor from "react-native-navigation-bar-color";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
// Custom Imports
import { styles } from "../../Styles";
// Providers
import { useUser } from "../../utils/providers/UserProvider";
// React-Navigation
import { RootStackParamList } from "../RootStackParams";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, Platform } from "react-native";
import {
  EditUserProfileView,
  ProfilePicture,
  UserProfileView,
  VariableSettingButton,
} from "../../components";
type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const AccountSettings = ({ route, navigation }: Props) => {
  const {
    userData,
    isEditingProfile,
    setIsEditingProfile,
    signOut,
    selectProfileImage,
    changeName,
  } = useUser();

  useEffect(() => {
    changeNavigationBarColor("#202531", true, true);
  }, []);

  const [newName, setNewName] = useState(userData?.name);
  const [showModal, setShowModal] = useState(false);

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
            Account Settings
          </Text>
        </View>
        <Flex padding={6} pt={0}>
          <EditUserProfileView />
          <Flex
            py={2}
            w={"full"}
            borderTopRadius={20}
            borderRadius={20}
            bg={"main.bg.300"}
            alignItems={"center"}
          >
            <VariableSettingButton
              type={"arrow"}
              primaryText={"Change Password"}
              secondaryText={null}
              onPress={() => navigation.navigate("ChangePassword")}
            />
            <VariableSettingButton
              type={"arrow"}
              primaryText={"Change Email"}
              secondaryText={null}
              onPress={() => navigation.navigate("ChangeEmail")}
            />
            <VariableSettingButton
              type={"arrow"}
              primaryText={"Login History"}
              secondaryText={null}
              onPress={() => navigation.navigate("LoginHistory")}
            />
            <VariableSettingButton
              type={"arrow"}
              primaryText={"Usage History"}
              secondaryText={null}
            />
            <VariableSettingButton
              type={"arrow"}
              primaryText={"Account Deletion"}
              secondaryText={null}
              onPress={() => navigation.navigate("AccountDeletion")}
            />
          </Flex>
        </Flex>
      </View>
    </SafeAreaView>
  );
};

export default AccountSettings;
/*
          <Flex
            py={2}
            h={"100%"}
            w={"full"}
            borderTopRadius={20}
            bg={"main.bg.300"}
            alignItems={"center"}
          >
            <VariableSettingButton
              type={"arrow"}
              primaryText={"Personal information"}
              secondaryText={null}
            />
            <VariableSettingButton
              type={"switch"}
              primaryText={"App Theme"}
              secondaryText={"Dark"}
            />
            <VariableSettingButton
              type={"arrow"}
              primaryText={"Device IP Address"}
              secondaryText={"78.98.69.227"}
            />
            <VariableSettingButton
              type={"arrow"}
              primaryText={"Log out"}
              secondaryText={null}
              onPress={() => signOut()}
            />
          </Flex>*/
