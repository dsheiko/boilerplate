import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    username: 0,
  },
  reducers: {
    login: ( state, action ) => {
      state.username = action.payload;
    },
    logout: ( state ) => {
      state.username = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = appSlice.actions

export default appSlice.reducer