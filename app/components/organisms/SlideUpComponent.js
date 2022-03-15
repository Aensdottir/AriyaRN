// @ts-nocheck
import React, { useState, Component } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import {
  Box as NBBox,
  View,
  Text,
  Image,
  PresenceTransition,
  Pressable,
} from "native-base";
import SlidingUpPanel from "rn-sliding-up-panel";

import {
  height as height2,
  draggedValue,
  draggableRange,
  backgroundOpacity,
  iconTranslateY,
  headerTranslateY,
  textTranslateX,
  textScale,
  panelHeight,
  fadeInValue1,
  borderRadius2,
} from "../../constants";
import { ControlsView } from "../molecules";
import SlidingPanel from "react-native-sliding-panels";

export class SlideUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doOpen: true,
    };
  }
  render() {
    return (
      <SlidingUpPanel
        ref={(c) => (this._panel = c)}
        draggableRange={draggableRange}
        animatedValue={draggedValue}
        snappingPoints={[0]}
        height={height2 + panelHeight}
        friction={0.5}
      >
        <View
          flex={1}
          bg={"#1c1e39"}
          position={"relative"}
          overflow={"hidden"}
          borderTopRadius={20}
        >
          <View height={panelHeight} bg={"#1c1e39"} justifyContent={"flex-end"}>
            <Animated.View
              style={{
                transform: [{ translateY: iconTranslateY }],
                alignItems: "flex-end",
              }}
            >
              <View justifyContent={"center"}>
                <Text
                  fontFamily={"Agency-FB"}
                  fontSize={35}
                  left={5}
                  bottom={9}
                ></Text>
                <Pressable
                  onPress={() => {
                    this.setState({ doOpen: !this.state.doOpen });
                    this.state.doOpen ? this._panel.show() : this._panel.hide();
                  }}
                  size={50}
                  bottom={8}
                  right={5}
                >
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <View>
                        <PresenceTransition
                          visible={!this.state.doOpen}
                          initial={{
                            rotate: "0deg",
                            opacity: 1,
                          }}
                          animate={{
                            rotate: "180deg",
                          }}
                        >
                          <Image
                            size={40}
                            alt="Nav"
                            source={require("../../assets/images/chevron-up.png")}
                          />
                        </PresenceTransition>
                        <Image
                          opacity={this.state.doOpen | 0}
                          size={40}
                          alt="Nav"
                          source={require("../../assets/images/chevron-up.png")}
                        />
                      </View>
                    );
                  }}
                </Pressable>
              </View>
            </Animated.View>
          </View>

          <View
            flex={1}
            bg={"#0d0d17"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <ControlsView />
          </View>
        </View>
      </SlidingUpPanel>
    );
  }
}
