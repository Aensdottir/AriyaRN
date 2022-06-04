import { Pressable, Text, View } from "native-base";

export const LoginRedirectText = ({ navigation, type }) => {
  // DEFAULTS
  let text = "Already have an account?";
  let redirect = "  Login";
  let route = "Login";

  switch (type) {
    case "Login":
      text = "Already have an account?";
      break;
    case "ForgotPass":
      text = "Remember your password?";
      break;
    case "Register":
      text = "Don't have an account?";
      redirect = "  Sign Up";
      route = "Register";
      break;
  }

  return (
    <View
      position={"absolute"}
      bottom={8}
      flexDirection={"row"}
      alignSelf={"center"}
    >
      <Text fontFamily={"Kanit-Regular"} color={"muted.300"}>
        {text}
      </Text>
      <Pressable
        alignItems={"center"}
        onPress={() => navigation.navigate(route)}
      >
        {({ isPressed }) => {
          return (
            <Text
              fontFamily={"Kanit-Regular"}
              color={isPressed ? "muted.400" : "#fff"}
            >
              {redirect}
            </Text>
          );
        }}
      </Pressable>
    </View>
  );
};
