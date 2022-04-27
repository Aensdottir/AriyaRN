import { Text, Flex, Spacer } from "native-base";
import { QuickAccessButton } from "../atoms";
import { useServer } from "../../utils/providers/ServerProvider";

export const Topbar = () => {
  const { connectionText } = useServer();
  return (
    <Flex
      flexDirection={"row"}
      justify={"center"}
      alignItems={"center"}
      margin={7}
    >
      <Flex
        position={"absolute"}
        justifyContent={"center"}
        bg={"main.red"}
        borderRadius={35}
        w={160}
        h={40}
      >
        <Text fontFamily={"Agency-FB-Bold"} textAlign={"center"} fontSize={22}>
          {connectionText}
        </Text>
      </Flex>
      <QuickAccessButton
        type={"TopBar"}
        icon={require("../../assets/images/MenuIcon.png")}
      />
      <Spacer />
      <QuickAccessButton
        type={"TopBar"}
        icon={require("../../assets/images/UserIcon.png")}
      />
    </Flex>
  );
};
