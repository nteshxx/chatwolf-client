import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import chatReducer from "./chat.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;