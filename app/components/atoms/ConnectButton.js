// @ts-nocheck
import { Button } from "native-base";

export const ConnectButton = (props) => {
  return (
    <Button
      m={5}
      w={170}
      h={50}
      bg={"transparent"}
      _disabled={{ bg: "#000:alpha.20" }}
      borderColor={"#fff"}
      borderWidth={2}
      borderRadius={100}
      alignSelf={"center"}
      isDisabled={false}
      _pressed={{
        bg: "#000:alpha.20",
      }}
      {...props}
    ></Button>
  );
};
