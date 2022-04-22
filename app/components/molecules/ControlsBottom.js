// @ts-nocheck
import { Image, Flex, Spacer } from "native-base";
import { useServer } from "../../utils/providers/ServerProvider";
import { QuickAccessButton } from "../atoms";
import { useDebounce } from "../../utils";

export const ControlsBottom = (props) => {
  const { TcpConnect } = useServer();
  const { debounce } = useDebounce(); // Prevent button double click
  return (
    <Flex
      flexDirection={"row"}
      justify={"center"}
      alignItems={"center"}
      margin={7}
    >
      <QuickAccessButton
        type={"ControlsBottom"}
        onPressFunc={() => debounce(TcpConnect("shutdown"))}
        icon={require("../../assets/images/MenuIcon.png")}
      />
      <Spacer />
      <QuickAccessButton
        type={"ControlsBottom"}
        onPressFunc={() => debounce(TcpConnect("lock"))}
        icon={require("../../assets/images/MenuIcon.png")}
      />
      <Spacer />
      <QuickAccessButton
        type={"ControlsBottom"}
        onPressFunc={() => debounce(TcpConnect("restart"))}
        icon={require("../../assets/images/UserIcon.png")}
      />
    </Flex>
  );
};
