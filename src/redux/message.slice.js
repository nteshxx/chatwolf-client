import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    receiver: '',
    chatId: '',
  },
  reducers: {
    setReceiver: (state, action) => {
      state.receiver = action.payload
    },
    setChatId: (state, action) => {
      state.chatId = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setChatId, setReceiver } = messageSlice.actions;

export default messageSlice.reducer;
