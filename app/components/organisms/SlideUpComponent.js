// @ts-nocheck
import React, { useState, Component } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
  Box as NBBox,
  View,
  Text,
  Image,
  PresenceTransition,
  Pressable,
  Flex,
} from "native-base";
import SlidingUpPanel from "rn-sliding-up-panel";

import {
  height as height2,
  draggedValue,
  draggableRange,
  chevronTranslateY,
  panelHeight,
  chevronRotate,
  chevronOpacity,
} from "../../constants";
import { ControlsView } from "../molecules";

import { useDebounce } from "../../utils";

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
        allowDragging={false}
        draggableRange={draggableRange}
        animatedValue={draggedValue}
        snappingPoints={[0, draggableRange.top]}
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
          <View
            height={panelHeight}
            bg={"main.bg.300"}
            justifyContent={"flex-end"}
          >
            <Animated.View
              style={{
                transform: [{ translateY: chevronTranslateY }],
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
                  disabled={/*this.props.disabled*/ false}
                >
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <View>
                        <Animated.Image
                          style={{
                            width: 50,
                            height: 50,
                            transform: [
                              {
                                rotate: chevronRotate,
                              },
                            ],
                          }}
                          opacity={this.props.disabled ? 0.5 : 1}
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

          <View flex={1} bg={"main.bg.100"}>
            <ControlsView />
          </View>
        </View>
      </SlidingUpPanel>
    );
  }
}

const mapStateToProps = (state) => {
  const { server } = state;
  return { server };
};

export default connect(mapStateToProps)(SlideUpComponent);
