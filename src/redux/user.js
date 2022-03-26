import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    token: '',
  },
  reducers: {
    login: (state, action) => {
      console.log(action.payload)
      state.username = action.payload
    },
    logout: (state) => {
      state.username = ''
      state.token = ''
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;
