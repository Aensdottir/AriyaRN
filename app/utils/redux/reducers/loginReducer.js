// @ts-nocheck
const INITIAL_STATE = {
  email: "",
  password: "",
  alertOpen: false,
};
const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_EMAIL_VALUE":
      return { ...state, email: action.payload };
    case "SET_PASSWORD_VALUE":
      return { ...state, password: action.payload };
    case "SET_ALERT_OPEN":
      return { ...state, alertOpen: action.payload };
    default:
      return state;
  }
};
export default loginReducer;
