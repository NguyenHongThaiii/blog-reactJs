import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersApi from "../../../api/usersApi";
import { STORAGE_KEY } from "../../constant";
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "./../../utils/common";

export const login = createAsyncThunk("users/login", async (data, thunkAPI) => {
  const response = await usersApi.login(data);
  console.log(response);
  setLocalStorage(STORAGE_KEY.TOKEN, response.token);
  setLocalStorage(STORAGE_KEY.USER, JSON.stringify(response.data.user));

  return response.data.user;
});

export const signup = createAsyncThunk(
  "users/signup",
  async (data, thunkAPI) => {
    const response = await usersApi.signup(data);
    console.log(response);
    setLocalStorage(STORAGE_KEY.TOKEN, response.token);
    setLocalStorage(STORAGE_KEY.USER, JSON.stringify(response.data.user));

    return response.data.user;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isShowLoginPage: false,
    current: JSON.parse(getLocalStorage(STORAGE_KEY.USER)) || null,
  },
  reducers: {
    showLoginPage: (state) => {
      state.isShowLoginPage = true;
    },
    hideLoginPage: (state) => {
      state.isShowLoginPage = false;
    },
    logout: (state) => {
      removeLocalStorage(STORAGE_KEY.USER);
      removeLocalStorage(STORAGE_KEY.TOKEN);
      state.current = null;
    },
    createSaveBlog: (state, action) => {
      const userLocal = JSON.parse(getLocalStorage(STORAGE_KEY.USER));

      if (userLocal.blogSaved.includes(action.payload)) return;
      userLocal.blogSaved = [...userLocal.blogSaved, action.payload];
      state.current = { ...userLocal };
      setLocalStorage(STORAGE_KEY.USER, JSON.stringify({ ...userLocal }));
    },
    removeSaveBlog: (state, action) => {
      const userLocal = JSON.parse(getLocalStorage(STORAGE_KEY.USER));

      if (!userLocal.blogSaved.includes(action.payload)) return;
      userLocal.blogSaved = userLocal.blogSaved.filter(
        (item) => item !== action.payload
      );
      state.current = { ...userLocal };
      setLocalStorage(STORAGE_KEY.USER, JSON.stringify({ ...userLocal }));
    },
    createReview: (state, action) => {
      console.log(action.payload);
      const userLocal = JSON.parse(getLocalStorage(STORAGE_KEY.USER));
      userLocal.listReviews = [...userLocal?.listReviews, action.payload];
      state.current = { ...userLocal };
      setLocalStorage(STORAGE_KEY.USER, JSON.stringify({ ...userLocal }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.current = action.payload;
      state.isShowLoginPage = false;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.current = action.payload;
      state.isShowLoginPage = false;
    });
  },
});

export const {
  showLoginPage,
  hideLoginPage,
  logout,
  createSaveBlog,
  removeSaveBlog,
  createReview,
} = authSlice.actions;
export default authSlice.reducer;
