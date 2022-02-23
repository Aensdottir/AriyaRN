// @ts-nocheck
import { Box as NBBox, Image } from "native-base";

const Box = (props) => {
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
const LoginLogoBox = (props) => {
  return (
    <Box
      borderWidth={0}
      shadow={9}
      borderRadius={25}
      bg={{
        linearGradient: {
          colors: ["main.lighterBg", "#303145"],
          start: [0, 0],
          end: [0, 1],
        },
      }}
      size={130}
      mb={6}
      justifyContent={"center"}
    >
      <Image
        source={require("../../assets/images/AriyaLogo.png")}
        alt="Ariya"
        height={85}
        resizeMode={"contain"}
      />
    </Box>
  );
};

export { Box, LoginLogoBox };
