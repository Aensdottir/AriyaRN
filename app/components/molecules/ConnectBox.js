// @ts-nocheck
import { Button, Flex } from "native-base";
import { ConnectButton } from "../atoms/ConnectButton";
import { useDispatch, useSelector } from "react-redux";
export const ConnectBox = (props) => {
  const data = useSelector((state) => state);
  return (
    <Flex bg={"#999999"} h={130} position={"absolute"} top={280} width={"full"}>
      <ConnectButton isDisabled={!data.server.buttonEnabled} {...props}>
        {data.server.toggle ? "CONNECT" : "DISCONNECT"}
      </ConnectButton>
    </Flex>
  );
};
