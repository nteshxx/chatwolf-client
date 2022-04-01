import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ToastService from "../utils/toast.service";
import AuthService from "../services/auth.service";
import io from 'socket.io-client';

const { REACT_APP_API } = process.env;

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

const connect = (data) => {
  const socketConnection = io.connect(`${REACT_APP_API}`, {
    query: data.accessToken
  });
  // add user to the list of online users
  socketConnection.emit('new-online-user', `${data.user.name}-${data.user._id}`);
  return socketConnection;
};

export const logout = createAsyncThunk("auth/logout", async () => {
  AuthService.logout();
});

const initialState = data
  ? { isLoggedIn: true,
      username: `${data.user.name}-${data.user._id}`,
      token: data.accessToken,
      socket: connect(data)
    }
  : { isLoggedIn: false,  
      username: '',
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
      state.token = action.payload.accessToken;
      state.socket = connect(action.payload);
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.username = `${action.payload.user.name}-${action.payload.user._id}`;
      state.token = action.payload.accessToken;
      state.socket = connect(action.payload);
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [logout.fulfilled]: (state, action) => {
      console.log("logout fulfilled");
      state.isLoggedIn = false;
      state.username = '';
      state.token = '';
      state.token = '';
    },
  },
});

const { reducer } = authSlice;
export default reducer;