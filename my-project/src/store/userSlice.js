import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;


const initialState = {
  user: storedUser,
  role: storedUser ? storedUser.role || "user" : "guest",

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const user = action.payload;
      state.user = user;
      state.role = user?.role || "user";
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.role = "guest";
      localStorage.removeItem("loggedInUser");
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
