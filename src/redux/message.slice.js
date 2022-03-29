import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    receiver: '',
    messages: [],
    chatId: ''
  },
  reducers: {
    setReceiver: (state, action) => {
      state.receiver = action.payload
    },
    setChatId: (state, action) => {
      state.chatId = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setChatId, setMessages, setReceiver } = messageSlice.actions;

export default messageSlice.reducer;
