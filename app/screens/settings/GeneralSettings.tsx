import { Entypo } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Flex, Icon, Pressable, StatusBar, Text, View } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { VariableSettingButton } from "../../components";
// Custom Imports
import { styles } from "../../Styles";
// Providers
import { useUser } from "../../utils/providers/UserProvider";
// React-Navigation
import { RootStackParamList } from "../RootStackParams";
type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const GeneralSettings = ({ route, navigation }: Props) => {
  const { userData, isEditingProfile, setIsEditingProfile, signOut } =
    useUser();

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
            General Settings
          </Text>
        </View>
        <Flex padding={6}>
          <Flex
            py={2}
            w={"full"}
            borderRadius={20}
            bg={"main.bg.300"}
            alignItems={"center"}
          >
            <VariableSettingButton
              type={"arrow"}
              primaryText={"Theme"}
              secondaryText={null}
            />
            <VariableSettingButton
              type={"arrow"}
              primaryText={""}
              secondaryText={null}
            />
            <VariableSettingButton
              type={"arrow"}
              primaryText={""}
              secondaryText={null}
            />
            <VariableSettingButton
              type={""}
              primaryText={"Version"}
              secondaryText={"1.0.0"}
            />
          </Flex>
        </Flex>
      </View>
    </SafeAreaView>
  );
};

export default GeneralSettings;
