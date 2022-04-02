import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice";
import authReducer from "./auth.slice";
import chatReducer from "./chat.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;