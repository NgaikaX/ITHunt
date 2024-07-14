import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: "user",
  initialState: {
    email: "",
    role: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
  },
});

const { setUser } = userStore.actions;

const userRedeucer = userStore.reducer;

export { setUser };

export default userRedeucer;
