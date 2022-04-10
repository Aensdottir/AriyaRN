// @ts-nocheck
const INITIAL_STATE = {
  current: [],
  connected: false,
  toggle: true,
  toggle2: true,
  buttonEnabled: true,
  connectionText: "NOT CONNECTED",
  uptime: "00:00:00",
  serverTime: "00:00:00",
  appMainTitle: "",
  appSubTitle: "",
  transitionColor: "rgb(74, 45, 62)",
};
const serverReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CONNECTED":
      return { ...state, connected: action.payload };
    case "SET_TOGGLE":
      return { ...state, toggle: action.payload };
    case "SET_TOGGLE_2":
      return { ...state, toggle2: action.payload };
    case "SET_BUTTON_ENABLED":
      return { ...state, buttonEnabled: action.payload };
    case "SET_CONNECTION_TEXT":
      return { ...state, connectionText: action.payload };
    case "SET_LATENCY_TEXT":
      return { ...state, latencyText: action.payload };
    case "SET_UPTIME":
      return { ...state, uptime: action.payload };
    case "SET_SERVER_TIME":
      return { ...state, serverTime: action.payload };
    case "SET_FOREGROUND_APP":
      return {
        ...state,
        appMainTitle: action.payload[0],
        appSubTitle: action.payload[1],
      };
    case "SET_TRANSITION_COLOR":
      return { ...state, transitionColor: action.payload };
    default:
      return state;
  }
};
export default serverReducer;
