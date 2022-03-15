// @ts-nocheck
import { Button, Text } from "native-base";

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
    <Button bg={"red.400"} {...styles.loginScreen} {...props}>
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
    <Button bg={"red.400"} {...styles.loginScreen} {...props}>
      <Text color={"white"}>Register</Text>
    </Button>
  );
};

export { LoginButton, RegisterNavButton, RegisterButton };
