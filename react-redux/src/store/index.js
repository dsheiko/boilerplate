import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./peopleSlice";

export const store = configureStore({
  reducer: {
    people: peopleReducer
  }
});
