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

const RegisterButton = (props) => {
  return (
    <Button bg={"white"} {...styles.loginScreen} {...props}>
      <Text color={"red.500"}>Register</Text>
    </Button>
  );
};
const LoginButton = (props) => {
  return (
    <Button bg={"red.400"} {...styles.loginScreen} {...props}>
      <Text color={"#fff"}>Login</Text>
    </Button>
  );
};

export { LoginButton, RegisterButton };
