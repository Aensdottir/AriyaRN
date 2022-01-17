// @ts-nocheck
const INITIAL_STATE = {
  toggle: true,
  buttonEnabled: true,
  uptime: "00:00:00",
  serverTime: "00:00:00",
  appMainTitle: "",
  appSubTitle: "",
};
const serverReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_TOGGLE":
      return { ...state, toggle: action.payload };
    case "SET_BUTTON_ENABLED":
      return { ...state, buttonEnabled: action.payload };
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
    default:
      return state;
  }
};
const handleRemoveTodo = (item, todos) => {
  const todoIndex = todos.indexOf(item);
  todos.splice(todoIndex, 1);
  return todos;
};
export default serverReducer;
