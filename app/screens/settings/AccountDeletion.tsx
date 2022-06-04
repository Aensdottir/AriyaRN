import { MaterialIcons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Button,
  Flex,
  Icon,
  Input,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// Custom Imports
import { styles } from "../../Styles";
import { useUser } from "../../utils/providers/UserProvider";
// React-Navigation
import { RootStackParamList } from "../RootStackParams";
type Props = NativeStackScreenProps<RootStackParamList, "ForgotPass">;

const AccountDeletion = ({ route, navigation }: Props) => {
  const { deleteUser } = useUser();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = React.useState(false);

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
              Delete
            </Text>
            <Text
              top={-20}
              fontFamily={"Kanit-Regular"}
              fontSize={40}
              textAlign={"center"}
            >
              Account?
            </Text>

            <Text fontSize={15} textAlign={"center"}>
              <Text color={"gray.300"}>{"You can "}</Text>
              <Text color={"main.red"} fontWeight={"bold"}>
                {"permanently "}
              </Text>
              <Text color={"gray.300"}>
                {"delete your account\nby entering your password below."}
              </Text>
            </Text>
          </View>
          <View alignItems={"center"}>
            <Text fontSize={15} textAlign={"center"} color={"main.red"}>
              {}
            </Text>
            <Input
              onChangeText={(text: string) => setPassword(text)}
              w={300}
              h={50}
              m={2}
              borderRadius={12}
              _focus={{
                borderColor: "#b65b5b",
              }}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="lock-open" />}
                  size={22}
                  ml="3"
                  color="#fff"
                />
              }
              InputRightElement={
                <Pressable onPress={() => setShowPass(!showPass)}>
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <Icon
                        as={
                          <MaterialIcons
                            name={showPass ? "visibility" : "visibility-off"}
                          />
                        }
                        size={23}
                        mr="3"
                        color={showPass ? "muted.200" : "muted.400"}
                      />
                    );
                  }}
                </Pressable>
              }
            />
            <Input
              onChangeText={(text: string) => setConfirmPassword(text)}
              w={300}
              h={50}
              m={2}
              borderRadius={12}
              _focus={{
                borderColor: "#b65b5b",
              }}
              type={"password"}
              placeholder="Confirm Password"
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="lock" />}
                  size={22}
                  ml="3"
                  color="#fff"
                />
              }
            />
            <Button
              bg={"main.red"}
              top={30}
              borderRadius={"full"}
              h={50}
              w={300}
              onPress={() => deleteUser(password, confirmPassword)}
            >
              <Text color={"white"}>Delete Account</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AccountDeletion;
