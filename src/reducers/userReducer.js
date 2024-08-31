import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = null;
const storageName = "loggedBlogappUser";

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      blogService.setToken(action.payload.token);
      return action.payload;
    },
    checkUser(state, action) {
      if (!action.payload) return null;

      const user = JSON.parse(action.payload);
      blogService.setToken(user.token);
      return user;
    },
    logout() {
      window.localStorage.removeItem(storageName);
      return null;
    },
  },
});

export const { checkUser, login, logout } = userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const userString = window.localStorage.getItem(storageName);
    dispatch(checkUser(userString));
  };
};

export const Login = (user) => {
  return async (dispatch) => {
    window.localStorage.setItem(storageName, JSON.stringify(user));
    dispatch(login(user));
  };
};

export const Logout = () => {
  return async (dispatch) => {
    dispatch(logout());
  };
};

export default userSlice.reducer;
