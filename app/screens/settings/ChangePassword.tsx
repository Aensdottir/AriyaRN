import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  Pressable,
  Flex,
  Button,
  Icon,
  Input,
} from "native-base";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
// Packages
import changeNavigationBarColor from "react-native-navigation-bar-color";
// Custom Imports
import { styles } from "../../Styles";
import {
  AlertDialogUnavailable,
  EmailInput,
  ForgotPassword,
  LoginButton,
  LoginRedirectText,
  LoginScreenLogo,
  PasswordInput,
} from "../../components";
// Providers
import { useCommon } from "../../utils/providers/CommonProvider";
import { useUser } from "../../utils/providers/UserProvider";
// React-Navigation
import { RootStackParamList } from "../RootStackParams";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "ForgotPass">;

const ChangePassword = ({ route, navigation }: Props) => {
  const { changePassword, changePassError } = useUser();

  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrent, setShowCurrent] = React.useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [showNew, setShowNew] = React.useState(false);
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
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            flexGrow: 0.8,
          }}
        >
          <View justifyContent={"center"} alignItems={"center"}>
            <Text
              fontFamily={"Kanit-Regular"}
              fontSize={40}
              textAlign={"center"}
            >
              Change
            </Text>
            <Text
              top={-20}
              fontFamily={"Kanit-Regular"}
              fontSize={40}
              textAlign={"center"}
            >
              Password?
            </Text>

            <Text
              top={-20}
              fontSize={15}
              textAlign={"center"}
              color={"gray.300"}
            >
              {"Enter your current password\nand your new password below."}
            </Text>
          </View>
          <View alignItems={"center"} top={-10}>
            <Text fontSize={15} textAlign={"center"} color={"main.red"}>
              {changePassError}
            </Text>
            <Input
              onChangeText={(text: string) => setCurrentPassword(text)}
              w={300}
              h={50}
              m={2}
              borderRadius={12}
              _focus={{
                borderColor: "#b65b5b",
              }}
              type={showCurrent ? "text" : "password"}
              placeholder="Current password"
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="lock-open" />}
                  size={22}
                  ml="3"
                  color="#fff"
                />
              }
              InputRightElement={
                <Pressable onPress={() => setShowCurrent(!showCurrent)}>
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <Icon
                        as={
                          <MaterialIcons
                            name={showCurrent ? "visibility" : "visibility-off"}
                          />
                        }
                        size={23}
                        mr="3"
                        color={showCurrent ? "muted.200" : "muted.400"}
                      />
                    );
                  }}
                </Pressable>
              }
            />

            <Input
              onChangeText={(text: string) => setNewPassword(text)}
              w={300}
              h={50}
              m={2}
              borderRadius={12}
              _focus={{
                borderColor: "#b65b5b",
              }}
              type={showNew ? "text" : "password"}
              placeholder="New password"
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="lock" />}
                  size={22}
                  ml="3"
                  color="#fff"
                />
              }
              InputRightElement={
                <Pressable onPress={() => setShowNew(!showNew)}>
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <Icon
                        as={
                          <MaterialIcons
                            name={showNew ? "visibility" : "visibility-off"}
                          />
                        }
                        size={23}
                        mr="3"
                        color={showNew ? "muted.200" : "muted.400"}
                      />
                    );
                  }}
                </Pressable>
              }
            />
            <Button
              bg={"main.red"}
              top={30}
              borderRadius={"full"}
              h={50}
              w={300}
              onPress={() => changePassword(currentPassword, newPassword)}
            >
              <Text color={"white"}>Change Password</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
