// @ts-nocheck
const INITIAL_STATE = {
  email: "",
  password: "",
};
const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_EMAIL_VALUE":
      return { ...state, email: action.payload };
    case "SET_PASSWORD_VALUE":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
export default loginReducer;
