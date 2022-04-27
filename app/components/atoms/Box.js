import { Box, Image } from "native-base";

const Template = (props) => {
  return (
    <Box
      borderRadius="md"
      borderWidth={2}
      borderColor={"#cccccc"}
      bg="transparent"
      {...props}
    />
  );
};
