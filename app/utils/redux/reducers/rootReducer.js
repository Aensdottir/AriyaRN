import { combineReducers } from "redux";
import serverReducer from "./serverReducer";
const rootReducer = combineReducers({ server: serverReducer });
export default rootReducer;
