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
        bg={"main.dark"}
        h={60}
        borderTopRadius={30}
      >
        <Text top={-13} textAlign={"center"}>
          DESKTOP-KU8SL2G
        </Text>
      </NBBox>

      <NBBox // Info Box
        top={-25}
        borderTopRadius={25}
        bg={{
          linearGradient: {
            colors: ["main.bg", "gradient.lightPurple"],
            start: [0, -0.1],
            end: [0, 1],
          },
        }}
        h={155}
      >
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
