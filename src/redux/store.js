import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter.slice";
import userReducer from "./user.slice";
import authReducer from "./auth.slice";
import messageReducer from "./message.slice";
import chatReducer from "./chat.slice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    auth: authReducer,
    message: messageReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;