import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ChatService from "../services/chat.service";
import { setMessages } from '../redux/message.slice';

export const getPreviousMessages = createAsyncThunk(
  "chat/get-messages",
  async ({ chatid, token }, thunkAPI) => {
    try {
      const data = await ChatService.getPreviousMessages(chatid, token);
      thunkAPI.dispatch(setMessages(data.messages));
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("get-messages error: ", message);
      thunkAPI.dispatch(setMessages([]));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/send-message",
  async ({ token, username, chatId, message, receiver }, thunkAPI) => {
    try {
      const data = await ChatService.sendMessage(token, username, chatId, message, receiver);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("send-message error: ", message);
      return thunkAPI.rejectWithValue();
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    status: false,
  },
  extraReducers: {
    [getPreviousMessages.fulfilled]: (state, action) => {
      state.status = true;
    },
    [getPreviousMessages.rejected]: (state, action) => {
      state.status = false;
    },
    [sendMessage.fulfilled]: (state, action) => {
      state.status = true;
    },
    [sendMessage.rejected]: (state, action) => {
      state.status = false;
    },
  },
});

const { reducer } = chatSlice;
export default reducer;