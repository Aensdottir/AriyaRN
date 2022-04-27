import { Box, Image } from "native-base";
export const LoginScreenLogo = (props) => {
  return (
    <Box
      borderWidth={0}
      shadow={9}
      borderRadius={25}
      bg={{
        linearGradient: {
          colors: ["#30314599", "#303145"],
          start: [0, 0],
          end: [0, 1],
        },
      }}
      size={130}
      mb={6}
      justifyContent={"center"}
      {...props}
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
