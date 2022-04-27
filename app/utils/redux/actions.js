export const SetConnected = (payload) => ({ type: "SET_CONNECTED", payload });
export const SetToggle = (payload) => ({ type: "SET_TOGGLE", payload });
export const SetToggle2 = (payload) => ({ type: "SET_TOGGLE_2", payload });
export const SetButtonEnabled = (payload) => ({
  type: "SET_BUTTON_ENABLED",
  payload,
});
export const SetConnectionText = (payload) => ({
  type: "SET_CONNECTION_TEXT",
  payload,
});
export const SetLatencyText = (payload) => ({
  type: "SET_LATENCY_TEXT",
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
export const SetTransitionColor = (payload) => ({
  type: "SET_TRANSITION_COLOR",
  payload,
});

export const SetEmailValue = (payload) => ({
  type: "SET_EMAIL_VALUE",
  payload,
});
export const SetPasswordValue = (payload) => ({
  type: "SET_PASSWORD_VALUE",
  payload,
});

export const SetAlertOpen = (payload) => ({
  type: "SET_ALERT_OPEN",
  payload,
});
