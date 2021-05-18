import { act } from "react-dom/test-utils";
import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState.activeTab, action) => {
  if (action.type === types.SET_ACTIVE_TAB) {
    return (state = [action.value]);
  } 
   else {
    return state;
  }
};

export default reducer;
