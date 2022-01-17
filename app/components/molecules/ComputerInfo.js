// @ts-nocheck
import { Box as NBBox, Text, View } from "native-base";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UptimeText } from "./UptimeText";

export const ComputerInfo = (props) => {
  const data = useSelector((state) => state);

  return (
    <View top={95} mb={95}>
      <NBBox // Header
        justifyContent={"center"}
        bg={"#1b202a"}
        h={39}
        borderTopRadius={20}
      >
        <Text textAlign={"center"}>DESKTOP-KU8SL2G</Text>
      </NBBox>

      <NBBox // Info Box
        borderTopRadius={25}
        bg={{
          linearGradient: {
            colors: ["#1b202a", "#303145"],
            start: [0, -0.1],
            end: [0, 1],
          },
        }}
        h={170}
      >
        <NBBox
          bg={{
            linearGradient: {
              colors: ["#40374e", "#30405d", "#40374e"],
              start: [0, 0],
              end: [1, 0],
            },
          }}
          h={0.5}
        />

        <UptimeText />

        <View>
          <Text
            isTruncated
            maxW="270"
            textAlign={"center"}
            alignSelf={"center"}
          >
            {data.server.appSubTitle}
          </Text>
          <Text fontWeight={100} fontSize={20} textAlign={"center"}>
            {data.server.appMainTitle}
          </Text>
        </View>
      </NBBox>
    </View>
  );
};
