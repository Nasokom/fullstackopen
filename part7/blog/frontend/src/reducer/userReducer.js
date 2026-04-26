import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { triggerNotification } from "./notificationReducer";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return action.payload;
    },
    logoutUser: (state, action) => {
      return null;
    },
  },
});

const { loginUser, logoutUser } = userSlice.actions;

export const authUser = (user) => {
  return async (dispatch) => {
    if (user.token) {
      dispatch(loginUser(user));
      dispatch(
        triggerNotification({
          type: "success",
          content: "Welcome " + user.user.name,
        }),
      );
      return;
    }
    try {
      const { data } = await blogService.login(user);
      dispatch(loginUser(data));
      blogService.saveUser(data);
      dispatch(
        triggerNotification({
          type: "success",
          content: "Welcome " + data.user.name,
        }),
      );
    } catch (error) {
      dispatch(
        triggerNotification({
          type: "error",
          content: "error: wrong login or password",
        }),
      );
    }
  };
};

export const unAuthUser = () => {
  return (dispatch) => {
    dispatch(logoutUser());
    dispatch(
      triggerNotification({
        type: "success",
        content: "Bye Bye",
      }),
    );
  };
};

export default userSlice.reducer;
