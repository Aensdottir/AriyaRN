// @ts-nocheck
function Latency(serverTime) {
  const date = new Date();
  const dateString = date.toISOString().substring(14, 23); // "2020-01-06T19:57:12.14
  const minutes = dateString.substring(0, 2) * 60000;
  const secondsMs = dateString.substring(3).replace(".", "") * 1;
  const clientTime = minutes + secondsMs;
  const latency = (clientTime - serverTime).toString().substring(0);
  if (latency <= 250) {
    //setLatencyStatus(require("../../assets/StatusGood.png"));
  } else if (latency <= 450) {
    //setLatencyStatus(require("../../assets/StatusMid.png"));
  } else if (latency > 450) {
    //setLatencyStatus(require("../../assets/StatusBad.png"));
  }
  console.log("Servertime: " + serverTime + "\n" + "Clienttime: " + clientTime);
  console.log(minutes + " / " + secondsMs);
  console.log(latency);
  return latency;
}

export { Latency };
