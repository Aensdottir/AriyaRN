import { Flex, Image, Pressable, View } from "native-base";
// Providers
import { useUser } from "../../utils/providers/UserProvider";

export const ProfilePicture = (props) => {
  const { userData, isEditingProfile, selectProfileImage } = useUser();
  return (
    <View>
      <Image
        size={80}
        borderRadius={"full"}
        bg={"main.bg.100"}
        alt={"Profile"}
        source={{
          uri: userData?.profileImageUrl,
        }}
        key={userData?.profileImageUrl}
        {...props}
      />
      {isEditingProfile == true && (
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
      )}
    </View>
  );
};
