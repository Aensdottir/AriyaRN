// @ts-nocheck
import { Box as NBBox, Image } from "native-base";

export const ControlsView = (props) => {
  return (
    <NBBox
      size={100}
      borderRadius="md"
      borderWidth={2}
      borderColor={"#cccccc"}
      bg="transparent"
      {...props}
    />
  );
};
