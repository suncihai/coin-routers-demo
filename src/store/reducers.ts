import { combineReducers } from "redux";

import { assetsReducer } from "../reducers/assetsReducer";

export const rootReducer = combineReducers({
  asset: assetsReducer,
});
