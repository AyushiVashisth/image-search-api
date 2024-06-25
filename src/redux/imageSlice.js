import { createSlice } from "@reduxjs/toolkit";
import { fetchImageDetails, fetchImages } from "./api";

const initialState = {
  images: [],
  status: "idle",
  error: null,
  selectedImage: null,
  imageStatus: "idle",
  imageError: null
};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    clearSelectedImage: (state) => {
      state.selectedImage = null;
      state.imageStatus = "idle";
      state.imageError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchImageDetails.pending, (state) => {
        state.imageStatus = "loading";
      })
      .addCase(fetchImageDetails.fulfilled, (state, action) => {
        state.imageStatus = "succeeded";
        state.selectedImage = action.payload;
      })
      .addCase(fetchImageDetails.rejected, (state, action) => {
        state.imageStatus = "failed";
        state.imageError = action.error.message;
      });
  }
});

export const { clearSelectedImage } = imagesSlice.actions;

export default imagesSlice.reducer;
