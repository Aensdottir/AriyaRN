// @ts-nocheck
import { Flex } from "native-base";
import { ConnectButton } from "../atoms/ConnectButton";
import { useSelector } from "react-redux";
import { AnimatedBackgroundColorView } from "react-native-animated-background-color-view";
import { styles } from "../../Styles";

export const ConnectFlex = ({ onPressFunc, color }) => {
  const data = useSelector((state) => state);
  return (
    <Flex
      h={130}
      position={"absolute"}
      justifyContent={"center"}
      top={280}
      width={"full"}
      bg={{
        linearGradient: {
          colors: ["transparent", "gradient.lightPurple"],
          start: [0, 1.5],
          end: [0, -0.5],
        },
      }}
    >
      <ConnectButton
        isDisabled={!data.server.buttonEnabled}
        onPress={onPressFunc}
      >
        {data.server.toggle ? "CONNECT" : "DISCONNECT"}
      </ConnectButton>
    </Flex>
  );
};

/*
    <Flex
      bg={color}
      h={130}
      position={"absolute"}
      justifyContent={"center"}
      top={280}
      width={"full"}
    >


    <AnimatedBackgroundColorView
      color={data.server.transitionColor}
      style={styles.connectFlex}
    >
      <Flex
        w={"full"}
        h={"full"}
        position={"absolute"}
        top={0}
        bg={{
          linearGradient: {
            colors: ["transparent", "main.dark"],
            start: [0, 1.5],
            end: [0, -0.5],
          },
        }}
      ></Flex>
      <ConnectButton
        isDisabled={!data.server.buttonEnabled}
        onPress={onPressFunc}
      >
        {data.server.toggle ? "CONNECT" : "DISCONNECT"}
      </ConnectButton>
    </AnimatedBackgroundColorView>*/
