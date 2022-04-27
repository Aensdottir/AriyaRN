import { View, Text, Pressable } from "native-base";
// React-Navigation
import { RootStackParamList } from "../../screens/RootStackParams";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const LoginRedirectText = ({ navigation, type }) => {
  return (
    <View
      position={"absolute"}
      bottom={8}
      flexDirection={"row"}
      alignSelf={"center"}
    >
      <Text fontFamily={"Kanit-Regular"} color={"muted.300"}>
        {type == "Register"
          ? "Don't have an account?"
          : "Already have an account?"}
      </Text>
      <Pressable
        alignItems={"center"}
        onPress={() => {
          navigation.navigate(type);
        }}
      >
        {({ isPressed }) => {
          return (
            <Text
              fontFamily={"Kanit-Regular"}
              color={isPressed ? "muted.400" : "#fff"}
            >
              {type == "Register" ? "  Sign Up" : "  Login"}
            </Text>
          );
        }}
      </Pressable>
    </View>
  );
};
