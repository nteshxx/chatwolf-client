import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ChatService from "../services/chat.service";

export const getPreviousMessages = createAsyncThunk(
  "chat/get-messages",
  async ({ chatid, token }, thunkAPI) => {
    try {
      const data = await ChatService.getPreviousMessages(chatid, token);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("get-messages error: ", message);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getAllConversations = createAsyncThunk(
  "chat/all-chats",
  async ({ token }, thunkAPI) => {
    try {
      const data = await ChatService.getAllChats(token);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("getAllChats error: ", message);
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
    chats: [],
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload
    },
  },
  extraReducers: {
    [getPreviousMessages.fulfilled]: (state, action) => {
      state.messages = action.payload.messages;
    },
    [getPreviousMessages.rejected]: (state, action) => {
      state.messages = [];
    },
    [getAllConversations.fulfilled]: (state, action) => {
      state.chats = action.payload.chats;
    },
    [getAllConversations.rejected]: (state, action) => {
      state.chats = [];
    },
    [sendMessage.fulfilled]: (state, action) => {
      state.status = true;
    },
    [sendMessage.rejected]: (state, action) => {
      state.status = false;
    },
  },
});

export const { setMessages } = chatSlice.actions;
const { reducer } = chatSlice;
export default reducer;