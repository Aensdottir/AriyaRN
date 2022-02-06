// @ts-nocheck
import { Box as NBBox, View, Text, Image, Flex, Spacer } from "native-base";

export const Topbar = (props) => {
  return (
    <Flex flexDirection={"row"} margin={5}>
      <Image
        size={25}
        alt="Nav"
        source={require("../../assets/images/NavigationIcon.png")}
      />
      <Spacer />
      <Text top={-12} fontFamily={"TwCenMT_Bold"} fontSize="3xl">
        ARIYA
      </Text>
      <Spacer />
      <Image
        size={25}
        alt="Nav"
        source={require("../../assets/images/SettingsIcon.png")}
      />
    </Flex>
  );
};
