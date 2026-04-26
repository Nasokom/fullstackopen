import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { triggerNotification } from "./notificationReducer";
import { externRouter } from "../utils/helper";

const initialState = [];
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    initBlogs: (state, action) => {
      console.log("1state:", action);
      return [...action.payload];
    },
    createBlog: (state, action) => {
      state.push(action.payload);
    },
    updateBlog: (state, action) => {
      return state.map((blog) => {
        if (blog.id === action.payload.id) {
          return action.payload;
        }
        return blog;
      });
    },
    removeBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

const { initBlogs, createBlog, updateBlog, removeBlog } = blogSlice.actions;

export const initBlogList = () => {
  return async (dispatch) => {
    try {
      const data = await blogService.getAll();
      console.log(data);
      dispatch(initBlogs(data));
    } catch (error) {
      console.log("err:", error);
    }
  };
};

export const addBlog = (newBlog, token) => {
  return async (dispatch) => {
    try {
      const response = await blogService.postBlog(newBlog, token);
      dispatch(createBlog(response.data));
      dispatch(
        triggerNotification({
          type: "success",
          content: `a new blog ${response.data.author} by ${response.data.author} added`,
        }),
      );
    } catch (error) {
      if (error.response) {
        const msg = error.response.data.error;
        dispatch(
          triggerNotification({
            type: "error",
            content: "error: " + msg,
          }),
        );
      }
    }
  };
};

export const likeBlog = (targetedBlog) => {
  return async (dispatch) => {
    try {
      const { data } = await blogService.updateBlog(targetedBlog);
      dispatch(updateBlog(data));
      dispatch(
        triggerNotification({
          type: "success",
          content: `the post ${data.title} by ${data.author} just gain 1 like`,
        }),
      );
    } catch (error) {
      dispatch(
        triggerNotification({
          type: "error",
          content: `error: ${error}`,
        }),
      );
    }
  };
};

export const deleteBlog = (id, token) => {
  return async (dispatch) => {
    try {
      const request = await blogService.deleteBlog(id, token);
      dispatch(removeBlog(id));
      dispatch(
        triggerNotification({
          type: "success",
          content: "blog delete with success",
        }),
      );
      externRouter.navigate("/blogs");
    } catch (error) {
      dispatch(
        triggerNotification({ type: "error", content: "error:" + error }),
      );
    }
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const { data } = await blogService.addComment(id, comment);
      dispatch(updateBlog(data));
      dispatch(
        triggerNotification({
          content: "a blog received a comment",
          type: "success",
        }),
      );
    } catch (error) {
      dispatch(
        triggerNotification({ type: "error", content: "error:" + error }),
      );
    }
  };
};
export default blogSlice.reducer;
