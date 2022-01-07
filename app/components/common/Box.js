// @ts-nocheck
import { Box as NBBox } from "native-base";

export const Box = (props) => {
  return (
    <NBBox
      borderRadius="md"
      borderWidth={2}
      borderColor={"#cccccc"}
      bg="transparent"
      {...props}
    />
  );
};
