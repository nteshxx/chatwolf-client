import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import AuthService from "../services/auth.service";
import io from 'socket.io-client';

const { REACT_APP_API } = process.env;

const data = JSON.parse(localStorage.getItem("user"));

const notifySuccess = () => toast.success('Success', {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

const notifyError = (message) => toast.error(`${message}`, {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(name, email, password);
      // thunkAPI.dispatch(setMessage(response.data.message));
      console.log(response);
      notifySuccess();
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      notifyError(message);
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      console.log("console here 3", data);
      notifySuccess();
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      notifyError(message);
      //thunkAPI.dispatch(setMessage(message));
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
      socket: null
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;