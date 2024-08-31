import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
  // middleware: () => [
  //   applyMiddleware(thunk)]
});

export default store;
