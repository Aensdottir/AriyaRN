// @ts-nocheck
import { Box as NBBox, Text } from "native-base";
import { useSelector } from "react-redux";

export const ServerInfoPanel = (props) => {
  const data = useSelector((state) => state);
  return (
    <NBBox
      pt={57}
      px={5}
      borderBottomRadius={25}
      mt={79}
      h={95}
      bg={"main.dark"}
    >
      <Text fontSize={20} textAlign={"right"}>
        {data.server.uptime}
      </Text>
    </NBBox>
  );
};
