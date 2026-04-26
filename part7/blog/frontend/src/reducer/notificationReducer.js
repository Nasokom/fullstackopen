import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.push(action.payload);
    },
    removeNotification: (state, action) => {
      return state.filter((elt) => elt.id !== action.payload.id);
    },
  },
});

const uniqueId = () => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
};

export const { setNotification, removeNotification } =
  notificationSlice.actions;

export const triggerNotification = (content) => {
  const notif = {
    id: uniqueId(),
    ...content,
  };
  return (dispatch) => {
    dispatch(setNotification(notif));
    if (notif.type !== "success") {
      new Audio("/sosumi.mp3").play();
    }
    setTimeout(() => dispatch(removeNotification(notif)), 5000);
  };
};

export default notificationSlice.reducer;
