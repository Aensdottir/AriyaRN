import { Box as NBBox, Text } from "native-base";
import { useServer } from "../../utils/providers/ServerProvider";

export const ServerInfoPanel = () => {
  const { serverUptime } = useServer();

  return (
    <NBBox
      pt={57}
      px={5}
      borderBottomRadius={25}
      mt={79}
      h={95}
      bg={"main.bg.300"}
    >
      <Text fontSize={20} textAlign={"right"}>
        {serverUptime}
      </Text>
    </NBBox>
  );
};
