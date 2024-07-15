import userReducer from "./user";
import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./messages";

const store = configureStore({
  reducer: {
    user: userReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
