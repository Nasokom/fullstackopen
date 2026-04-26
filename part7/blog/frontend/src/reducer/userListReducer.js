import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const userListSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addList: (state, action) => {
      return action.payload;
    },
  },
});
const { addList } = userListSlice.actions;

export const initUserList = () => {
  return async (dispatch) => {
    try {
      const data = await blogService.getAllUser();
      dispatch(addList(data));
    } catch (error) {
      console.log("userListReducer err :", error);
    }
  };
};

export default userListSlice.reducer;
