import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "./imageSlice";

export const store = configureStore({
  reducer: {
    images: imagesReducer
  }
});
