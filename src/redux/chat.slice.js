import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ChatService from '../services/chat.service';

export const getPreviousMessages = createAsyncThunk(
  'chat/get-messages',
  async ({ chatid, token, page, limit }, thunkAPI) => {
    try {
      const data = await ChatService.getPreviousMessages(
        chatid,
        token,
        page,
        limit
      );
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getAllConversations = createAsyncThunk(
  'chat/all-chats',
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
      console.log(message);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/send-message',
  async ({ token, username, chatId, message, receiver }, thunkAPI) => {
    try {
      const data = await ChatService.sendMessage(
        token,
        username,
        chatId,
        message,
        receiver
      );
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue();
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    status: false,
    onlineUsers: {},
    chats: [{ _id: 0, name: 'Loading...', text: 'Please Wait!' }],
    messages: [{ text: 'Hello, Sir' }, { text: 'Thanks, for choosing us!' }],
    currentPage: 0,
    totalPages: 0,
    receiver: 'Chat Wolf',
    receiverAvatar: null,
    chatId: '',
  },
  reducers: {
    setReceiver: (state, action) => {
      state.receiver = action.payload;
    },
    setReceiverAvatar: (state, action) => {
      state.receiverAvatar = action.payload;
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
      state.messages = [];
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
  },
  extraReducers: {
    [getPreviousMessages.fulfilled]: (state, action) => {
      state.messages = [...action.payload.result.messages, ...state.messages];
      state.currentPage = action.payload.result.currentPage;
      state.totalPages = action.payload.result.totalPages;
    },
    [getPreviousMessages.rejected]: (state, action) => {
      state.messages = [];
      state.currentPage = 0;
      state.totalPages = 0;
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

export const {
  setMessages,
  setChatId,
  setReceiver,
  setReceiverAvatar,
  setOnlineUsers,
  setChats,
} = chatSlice.actions;
const { reducer } = chatSlice;
export default reducer;
