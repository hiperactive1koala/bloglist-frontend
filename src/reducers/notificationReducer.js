import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationAdd(state, action) {
      return {
        message: `a new blog ${action.payload.title} by ${action.payload.author} added`,
        isError: false,
      };
    },
    notificationError(state, action) {
      return {
        message: action.payload,
        isError: true,
      };
    },
    notificationRemove() {
      return null;
    },
  },
});

export const { notificationAdd, notificationError, notificationRemove } =
  notificationSlice.actions;

export const SetNotificationAdd = (notification, timer = 3) => {
  return async (dispatch) => {
    dispatch(notificationRemove());
    dispatch(notificationAdd(notification));
    setTimeout(() => {
      dispatch(notificationRemove());
    }, timer * 1000);
  };
};

export const SetNotificationError = (notification, timer = 5) => {
  return async (dispatch) => {
    dispatch(notificationError(notification));
    setTimeout(() => {
      dispatch(notificationRemove());
    }, timer * 1000);
  };
};

export default notificationSlice.reducer;
