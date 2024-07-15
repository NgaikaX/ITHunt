// src/store/modules/user.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@/type";
import { RootState } from ".";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
    role: "",
    uploaddate: "",
    id: "",
    status: "",
    username: "User",
  },
  reducers: {
    loginUser(state, action: PayloadAction<UserType>) {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.role = action.payload.role;
      state.id = action.payload.id;
      state.status = action.payload.status;
      state.username = action.payload.username;
      console.log("state:", state);
    },
    logoutUser(state) {
      state.email = "";
      state.password = "";
      state.role = "";
      (state.uploaddate = ""), (state.id = "");
      state.status = "";
      state.username = "User";
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export const selectUserRole = (state: RootState) => state.user.role;
export const selectUserName = (state: RootState) => state.user.username;
export default userSlice.reducer;
