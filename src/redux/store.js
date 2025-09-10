import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./slice.js";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});
