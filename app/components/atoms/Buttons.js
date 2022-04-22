// @ts-nocheck
import { Pressable, Flex, Image, Button, Text } from "native-base";

const styles = {
  loginScreen: {
    m: 2,
    borderRadius: "full",
    h: 50,
    w: 300,
  },
};

const LoginButton = (props) => {
  return (
    <Button bg={"main.red"} {...styles.loginScreen} {...props}>
      <Text color={"white"}>Login</Text>
    </Button>
  );
};
const RegisterNavButton = (props) => {
  return (
    <Button bg={"white"} {...styles.loginScreen} {...props}>
      <Text color={"red.500"}>Sign Up</Text>
    </Button>
  );
};
const RegisterButton = (props) => {
  return (
    <Button bg={"main.red"} {...styles.loginScreen} {...props}>
      <Text color={"white"}>Register</Text>
    </Button>
  );
};

const QuickAccessButton = ({ type, onPressFunc, icon }) => {
  if (type == "TopBar") {
    return (
      <Pressable onPress={onPressFunc}>
        {({ isPressed }) => {
          return (
            <Flex
              size={60}
              bg={isPressed ? "main.bg.400" : "main.bg.300"}
              justifyContent={"center"}
              borderRadius={20}
            >
              <Image resizeMode="contain" alt="Nav" source={icon} />
            </Flex>
          );
        }}
      </Pressable>
    );
  }
  if (type == "ControlsBottom") {
    return (
      <Pressable onPress={onPressFunc}>
        {({ isPressed }) => {
          return (
            <Flex
              size={70}
              bg={isPressed ? "main.bg.100" : "main.bg.50"}
              justifyContent={"center"}
              borderRadius={20}
            >
              <Image resizeMode="contain" alt="Nav" source={icon} />
            </Flex>
          );
        }}
      </Pressable>
    );
  }
};

export { LoginButton, RegisterNavButton, RegisterButton, QuickAccessButton };
