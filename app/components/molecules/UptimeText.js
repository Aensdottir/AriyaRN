// @ts-nocheck
import React, { useState } from "react";
import { Text, View } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { useServer } from "../../utils/providers/ServerProvider";

export const UptimeText = (props) => {
  const { serverTime, connected } = useServer();
  const time = serverTime;
  const [uptime, setUptime] = useState("00:00:00");
  if (time > "00:00:00") {
    let hours = time.substring(0, 2);
    let minutes = time.substring(3, 5);
    let seconds = time.substring(6, 8);
    let startDateTime = new Date(2022, 0, 3, hours, minutes, seconds, 0); // YYYY (M-1) D H m s ms
    let startStamp = startDateTime.getTime();
    let newDate = new Date();
    let newStamp = newDate.getTime();

    let timer;
    function updateClock(time) {
      newDate = new Date();
      newStamp = newDate.getTime();
      let diff = Math.round((newStamp - startStamp) / 1000);
      //console.log(diff);
      let d = Math.floor(diff / (24 * 60 * 60));
      diff = diff - d * 24 * 60 * 60;
      let h = Math.floor(diff / (60 * 60));
      diff = diff - h * 60 * 60;
      let m = Math.floor(diff / 60);
      diff = diff - m * 60;
      let s = diff;
      h = format(h);
      m = format(m);
      s = format(s);
      function format(object) {
        if (object < 10) {
          object = "0" + object;
        }
        return object;
      }

      //const uptime = h + ":" + m + ":" + s;

      setUptime(h + ":" + m + ":" + s);
      //dispatch(SetUptime(uptime));
    }
    timer = setInterval(updateClock, 1000, time);
  }
  return (
    <View>
      <Text textAlign={"center"} fontSize={30} {...props}>
        {connected ? uptime : "00:00:00"}
      </Text>
    </View>
  );
};
