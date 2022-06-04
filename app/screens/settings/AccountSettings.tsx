import { Entypo } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Flex, Icon, Pressable, StatusBar, Text, View } from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { EditUserProfileView, VariableSettingButton } from "../../components";
// Custom Imports
import { styles } from "../../Styles";
// Providers
import { useUser } from "../../utils/providers/UserProvider";
// React-Navigation
import { RootStackParamList } from "../RootStackParams";
type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const AccountSettings = ({ route, navigation }: Props) => {
  const { userData } = useUser();

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
