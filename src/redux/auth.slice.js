import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ToastService from "../utils/toast.service";
import AuthService from "../services/auth.service";
import io from 'socket.io-client';

const { CHAT_API } = process.env;

const data = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const data = await AuthService.register(name, email, password);
      ToastService.success();
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      ToastService.error(message);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      ToastService.success();
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      ToastService.error(message);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "auth/upload-avatar",
  async ({ dataUrl, token }, thunkAPI) => {
    try {
      const data = await AuthService.updateAvatar(dataUrl, token);
      ToastService.success();
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      ToastService.error(message);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ token }, thunkAPI) => {
    try {
      const data = await AuthService.logout(token);
      if (data) {
        ToastService.success();
      };
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("logout error: ", message);
      return thunkAPI.rejectWithValue();
    }
  }
);

const connect = (data) => {
  const socketConnection = io.connect(`${CHAT_API}`, {
    query: data.accessToken
  });
  socketConnection.emit('new-online-user', `${data.user.name}-${data.user._id}`);
  return socketConnection;
};

const initialState = data
  ? { isLoggedIn: true,
      username: `${data.user.name}-${data.user._id}`,
      avatar: data.user.avatar,
      token: data.accessToken,
      socket: connect(data)
    }
  : { isLoggedIn: false,  
      username: '',
      avatar: null,
      token: '',
      socket: ''
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.username = `${action.payload.user.name}-${action.payload.user._id}`;
      state.avatar = action.payload.user.avatar;
      state.token = action.payload.accessToken;
      state.socket = connect(action.payload);
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.username = '';
      state.avatar = null;
      state.token = '';
      state.token = '';
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.username = `${action.payload.user.name}-${action.payload.user._id}`;
      state.avatar = action.payload.user.avatar;
      state.token = action.payload.accessToken;
      state.socket = connect(action.payload);
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.username = '';
      state.avatar = null;
      state.token = '';
      state.token = '';
    },
    [uploadAvatar.fulfilled]: (state, action) => {
      state.avatar = action.payload.updatedAvatar;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.username = '';
      state.avatar = null;
      state.token = '';
      state.token = '';
    },
  },
});

export const { setAvatar } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;