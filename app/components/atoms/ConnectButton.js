// @ts-nocheck
import { Button } from "native-base";

export const ConnectButton = (props) => {
  return (
    <Button
      m={5}
      w={170}
      h={50}
      bg={"transparent"}
      _disabled={{ opacity: 0.5, backgroundColor: "#292e39" }}
      borderColor={"#fff"}
      borderWidth={2}
      borderRadius={100}
      alignSelf={"center"}
      isDisabled={false}
      {...props}
    ></Button>
  );
};
