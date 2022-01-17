// @ts-nocheck
export const SetToggle = (payload) => ({ type: "SET_TOGGLE", payload });
export const SetButtonEnabled = (payload) => ({
  type: "SET_BUTTON_ENABLED",
  payload,
});
export const SetUptime = (payload) => ({ type: "SET_UPTIME", payload });

export const SetServerTime = (payload) => ({
  type: "SET_SERVER_TIME",
  payload,
});
export const SetForegroundApp = (payload) => ({
  type: "SET_FOREGROUND_APP",
  payload,
});
