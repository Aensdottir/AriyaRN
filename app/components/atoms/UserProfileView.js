import React, { useState } from "react";
import {
  View,
  Text,
  Icon,
  Pressable,
  Input,
  Box,
  Modal,
  FormControl,
  Button,
} from "native-base";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
// Custom Imports
import { ProfilePicture } from "./ProfilePicture";
// Providers
import { useUser } from "../../utils/providers/UserProvider";

export const UserProfileView = () => {
  const { userData } = useUser();

  return (
    <View flexDir={"row"} alignItems={"center"}>
      <ProfilePicture />
      <View ml={8} mt={-3}>
        <Text fontFamily={"Montserrat-Medium"} fontSize={25} color={"white"}>
          {userData.name}
        </Text>
        <Text fontFamily={"Montserrat"} fontSize={13} color={"gray.300"}>
          {userData.email}
        </Text>
      </View>
    </View>
  );
};

export const EditUserProfileView = () => {
  const { userData, selectProfileImage, changeName } = useUser();

  const [newName, setNewName] = useState(userData?.name);
  const [showModal, setShowModal] = useState(false);

  return (
    <View mt={5} alignItems={"center"} justifyContent={"center"}>
      <View>
        <View overflow={"hidden"} borderRadius={"full"}>
          <ProfilePicture size={130} borderWidth={2} borderColor={"main.red"} />
          <Box
            borderRadius={"full"}
            position={"absolute"}
            bottom={0}
            right={0}
            borderWidth={2}
            borderColor={"main.red"}
            bg={"main.bg.300"}
            size={37}
          />
        </View>
        <Pressable
          onPress={() => selectProfileImage()}
          position={"absolute"}
          bottom={0}
          right={0}
          size={35}
        >
          {({ isPressed }) => {
            return (
              <Box
                borderRadius={"full"}
                size={35}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Icon
                  as={<MaterialCommunityIcons name="image-edit-outline" />}
                  size={25}
                  color={"main.red"}
                />
              </Box>
            );
          }}
        </Pressable>
      </View>
      <View alignItems={"center"} mt={4} mb={7}>
        <View flexDirection={"row"} alignItems={"center"}>
          <Text fontFamily={"Montserrat-Medium"} fontSize={25} color={"white"}>
            {userData?.name}
          </Text>
          <Pressable
            onPress={() => setShowModal(true)}
            position={"absolute"}
            right={-25}
          >
            {({ isPressed }) => {
              return (
                <Icon
                  as={<MaterialIcons name="edit" />}
                  size={21}
                  color={"main.red"}
                />
              );
            }}
          </Pressable>
        </View>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content
            maxWidth="400px"
            bg={"transparent"}
            p={0}
            borderRadius={20}
          >
            <Modal.Body bg={"main.bg.300"}>
              <FormControl>
                <Input
                  onChangeText={(text) => setNewName(text)}
                  variant={"underlined"}
                  fontSize={20}
                  fontFamily={"Montserrat-Medium"}
                  _focus={{
                    borderColor: "#b65b5b",
                  }}
                >
                  {newName}
                </Input>
              </FormControl>
            </Modal.Body>
            <Modal.Footer bg={"main.bg.300"} p={0} m={0}>
              <Button
                m={0}
                variant={"solid"}
                bg={"main.bg.300"}
                _pressed={{ bg: "main.bg.400" }}
                onPress={() => {
                  setShowModal(false);
                  changeName(newName);
                }}
              >
                <Text
                  fontSize={22}
                  fontFamily={"Montserrat-Medium"}
                  color={"main.red"}
                >
                  Save
                </Text>
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <Text fontFamily={"Montserrat"} fontSize={13} color={"gray.300"}>
          {userData?.email}
        </Text>
      </View>
    </View>
  );
};
