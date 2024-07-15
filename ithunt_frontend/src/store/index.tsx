import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import messagesReducer from "./modules/messages";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
