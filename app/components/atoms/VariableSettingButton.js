import { View, Text, Spacer, Icon, Switch, Pressable } from "native-base";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

export const VariableSettingButton = ({
  type,
  primaryText,
  secondaryText,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      {({ isPressed }) => {
        return (
          <View
            bg={isPressed ? "main.bg.400" : "transparent"}
            borderRadius={15}
            w={"95%"}
            h={50}
            px={3}
            flexDir={"row"}
            alignItems={"center"}
          >
            <Text
              color={primaryText == "Sign out" ? "main.red" : "gray.300"}
              fontSize={16}
              fontFamily={"Montserrat"}
            >
              {primaryText}
            </Text>
            <Spacer />
            <View flexDir={"row"} alignItems={"center"}>
              {secondaryText && (
                <Text
                  color={"gray.300"}
                  fontSize={15}
                  fontFamily={"Montserrat"}
                  mr={1}
                >
                  {secondaryText}
                </Text>
              )}
              {type == "switch" && (
                <Switch
                  style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                  defaultIsChecked
                  offTrackColor="gray.100"
                  onTrackColor="gray.600"
                  onThumbColor="main.red"
                  offThumbColor="main.red"
                />
              )}
              {type == "arrow" && (
                <Icon
                  as={<Entypo name="chevron-thin-right" />}
                  size={19}
                  color={primaryText == "Sign out" ? "main.red" : "gray.300"}
                />
              )}
            </View>
          </View>
        );
      }}
    </Pressable>
  );
};
