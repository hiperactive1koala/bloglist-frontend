import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlog(state, action) {
      return [...state, action.payload];
    },
    setBlogs(state, action) {
      return action.payload;
    },
    likeBlog(state, action) {
      const blogs = state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload,
      );
      return blogs;
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { addBlog, setBlogs, likeBlog, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const anecdotes = await blogService.getAll();
    dispatch(setBlogs(anecdotes));
  };
};

export const CreateBlog = (blog) => {
  return async (dispatch) => {
    await blogService.create(blog);
    dispatch(addBlog(blog));
  };
};

export const SetBlogs = (blogs) => {
  return async (dispatch) => {
    dispatch(setBlogs(blogs));
  };
};

export const LikeBlog = (blog) => {
  return async (dispatch) => {
    const changedBlog = await blogService.change(blogObj);
    dispatch(likeBlog(blog));
  };
};

export const DeleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteOne(id);
    dispatch(deleteBlog(id));
  };
};

export default blogSlice.reducer;
