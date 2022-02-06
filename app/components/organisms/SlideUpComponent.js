// @ts-nocheck
import { Animated } from "react-native";
import { Box as NBBox, View, Text } from "native-base";
import SlidingUpPanel from "rn-sliding-up-panel";

import {
  height,
  draggedValue,
  draggableRange,
  backgroundOpacity,
  iconTranslateY,
  textTranslateY,
  textTranslateX,
  textScale,
  panelHeight,
  borderRadius2,
} from "../../constants";

export const SlideUpComponent = (props) => {
  return (
    <SlidingUpPanel
      draggableRange={draggableRange}
      animatedValue={draggedValue}
      snappingPoints={[350]}
      height={height + panelHeight}
      friction={0.5}
    >
      <View
        flex={1}
        bg={"#1c1e39"}
        position={"relative"}
        overflow={"hidden"}
        borderTopRadius={20}
      >
        <View
          height={panelHeight}
          bg={"#1c1e39"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <Animated.View
            style={{
              transform: [
                { translateY: textTranslateY },
                { translateX: textTranslateX },
                { scale: textScale },
              ],
            }}
          >
            <Text fontSize={28} bottom={10}>
              Slide Up Panel
            </Text>
          </Animated.View>
        </View>

        <View
          flex={1}
          bg={"#0d0d17"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text color={"#fff"}>Bottom sheet content</Text>
        </View>
      </View>
    </SlidingUpPanel>
  );
};
