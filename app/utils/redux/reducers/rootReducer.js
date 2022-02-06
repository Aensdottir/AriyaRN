import { combineReducers } from "redux";
import serverReducer from "./serverReducer";
import loginReducer from "./loginReducer";
const rootReducer = combineReducers({
  server: serverReducer,
  login: loginReducer,
});
export default rootReducer;
