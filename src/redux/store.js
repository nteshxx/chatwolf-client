import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter.slice";
import userReducer from "./user.slice";
import authReducer from "./auth.slice";
import messageSlice from "./message.slice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    auth: authReducer,
    message: messageSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;