import React from "react";
import { Input, Icon, Pressable } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const style = {
  w: 300,
  h: 50,
  margin: 2,
  borderRadius: 12,
  _focus: {
    borderColor: "#b65b5b",
  },
};

const NameInput = (props) => {
  return (
    <Input
      type={"name"}
      placeholder="Name"
      textContentType={"name"}
      InputLeftElement={
        <Icon
          as={<MaterialIcons name="person" />}
          size={22}
          ml="3"
          color="#fff"
        />
      }
      {...style}
      {...props}
    />
  );
};
const EmailInput = (props) => {
  return (
    <Input
      keyboardType="email-address"
      textContentType={"emailAddress"}
      placeholder="Email"
      InputLeftElement={
        <Icon
          as={<MaterialIcons name="mail-outline" />}
          size={22}
          ml="3"
          color="#fff"
        />
      }
      {...style}
      {...props}
    />
  );
};

const PasswordInput = (props) => {
  const [show, setShow] = React.useState(false);
  return (
    <Input
      type={show ? "text" : "password"}
      placeholder="Password"
      InputLeftElement={
        <Icon
          as={<MaterialIcons name="lock-open" />}
          size={22}
          ml="3"
          color="#fff"
        />
      }
      InputRightElement={
        <Pressable onPress={() => setShow(!show)}>
          {({ isHovered, isFocused, isPressed }) => {
            return (
              <Icon
                as={
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                  />
                }
                size={23}
                mr="3"
                color={show ? "muted.200" : "muted.400"}
              />
            );
          }}
        </Pressable>
      }
      {...style}
      {...props}
    />
  );
};

export { NameInput, EmailInput, PasswordInput };
