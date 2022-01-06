// @ts-nocheck
import { Box as NBBox } from "native-base";

export const Card = (props) => {
  return (
    <NBBox
      bg={"#21252e"}
      shadow={5}
      borderTopLeftRadius={0}
      borderRadius={20}
      borderColor={"#1b202a"}
      w={280}
      flex={1}
      my={4}
      ml={5}
      overflow={"hidden"}
      {...props}
    />
  );
};
