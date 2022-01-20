// @ts-nocheck
import { Box as NBBox, Image, Text } from "native-base";

export const Card = (props) => {
  return (
    <NBBox
      bg={"#1f232c"}
      shadow={5}
      borderRadius={20}
      borderColor={"main.dark"}
      w={390}
      flex={1}
      my={4}
      ml={3}
      mr={2}
      overflow={"hidden"}
      {...props}
    >
      <NBBox
        height={35}
        opacity={1}
        bg={{
          linearGradient: {
            colors: ["gradient.blue", "gradient.purple"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        {...props}
      ></NBBox>

      <Text position={"relative"} mt={1} textAlign={"center"} mt={3}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mollis
        odio massa, a condimentum ante tincidunt eu. Phasellus ac ligula libero.
        In ligula justo, tempus non elit vel, malesuada dapibus massa.
        Vestibulum sed libero aliquet, aliquam velit a, pretium tortor. Fusce
        est ante, sodales vel vulputate vitae.
      </Text>
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
