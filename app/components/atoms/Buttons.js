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
    <Button bg={"main.red"} {...styles.loginScreen} {...props}>
      <Text color={"white"}>Login</Text>
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

export { LoginButton, RegisterButton };
