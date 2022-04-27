import { Button } from "native-base";

export const ConnectButton = (props) => {
  return (
    <Button
      m={5}
      w={170}
      h={50}
      mt={9}
      bg={"transparent"}
      _disabled={{ bg: "#000:alpha.20" }}
      _pressed={{
        bg: "#000:alpha.20",
      }}
      borderColor={"#fff"}
      borderWidth={2}
      borderRadius={100}
      alignSelf={"center"}
      isDisabled={false}
      {...props}
    ></Button>
  );
};
