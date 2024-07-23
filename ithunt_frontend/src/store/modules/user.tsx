// src/store/modules/user.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {UserLoginType, UserType} from "@/type";
import { RootState } from ".";
import { getToken, removeToken, setToken } from "@/utils";
import {getUserDetails, userLogin} from "@/api";

const isBrowser = typeof window !== "undefined";


const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
    role: "",
    uploaddate: "",
    id: "",
    status: "",
    username: "",
    token: getToken() || ""
  },
  reducers: {
    loginUser(state, action: PayloadAction<UserType>) {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.role = action.payload.role;
      state.id = action.payload.id;
      state.status = action.payload.status;
      state.username = action.payload.username;
      state.token = action.payload.token;
      if (isBrowser) {
        setToken(action.payload.token);//set token to the local storage
      }
      console.log("state after loginUser:", state);
    },
    logoutUser(state) {
      state.email = "";
      state.password = "";
      state.role = "";
      state.uploaddate = "";
      state.id = "";
      state.status = "";
      state.username = "";
      state.token = "";
      if (isBrowser) {
        removeToken();
      }
    },
  },
});



const { loginUser, logoutUser } = userSlice.actions;

const fetchLogin = (values: UserLoginType) => {
  return async (dispatch) => {
    const res = await userLogin(values);
    dispatch(loginUser(res.data as UserType));
  };
};
export {loginUser,logoutUser,fetchLogin}

export const selectUserRole = (state: RootState) => state.user.role;
export const selectUserName = (state: RootState) => state.user.username;
export const selectUserToken = (state: RootState) => state.user.token;
export default userSlice.reducer;
