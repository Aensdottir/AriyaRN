// @ts-nocheck
import { Box as NBBox, Image } from "native-base";

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
    >
      <NBBox
        height={35}
        opacity={1}
        bg={{
          linearGradient: {
            colors: ["#2b3a54", "#582828"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        {...props}
      ></NBBox>
    </NBBox>
  );
};
export const Placeholder = (props) => {
  return (
    <Image
      position={"absolute"}
      source={require("../../assets/images/CardTextPlaceholder.png")}
      top={-35}
      opacity={0.7}
      left={2}
      w={260}
      height={170}
      alt="image"
    />
  );
};
