import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./reducer/blogReducer";
import notificationReducer from "./reducer/notificationReducer";
import userReducer from "./reducer/userReducer";
import userListReducer from "./reducer/userListReducer";
const store = configureStore({
  reducer: {
    blog: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    users: userListReducer,
  },
});

export default store;
