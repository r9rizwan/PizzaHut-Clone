import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/auth-slice";
import cart from "./slices/cart-slice";
import deals from "./slices/deals-slice";

const rootReducer = combineReducers({
  auth,
  cart,
  deals,
});

export default rootReducer;
