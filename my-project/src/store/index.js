import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    orders: orderReducer,
  },
});
