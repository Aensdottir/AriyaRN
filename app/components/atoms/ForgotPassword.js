// @ts-nocheck
import { Pressable, Text } from "native-base";

export const ForgotPassword = (props) => {
  return (
    <Pressable p="2" {...props}>
      {({ isPressed }) => {
        return (
          <Text margin={-1} color={isPressed ? "#555a69" : "#656a7a"}>
            Forgot Password?
          </Text>
        );
      }}
    </Pressable>
  );
};
