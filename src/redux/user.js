import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    token: '',
    socket: '',
  },
  reducers: {
    login: (state, action) => {
      console.log(action.payload)
      state.username = action.payload
      state.token = action.payload
      state.socket = action.payload
    },
    logout: (state) => {
      state.username = ''
      state.token = ''
      state.socket = ''
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
