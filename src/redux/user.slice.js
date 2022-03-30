import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    onlineUsers: {}
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setOnlineUsers } = userSlice.actions;

export default userSlice.reducer;
