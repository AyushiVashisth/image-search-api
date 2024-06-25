import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "sUU0GqUo88qJeiCP1zk6MvFvGbSOENMXcZhiMMadgPs";
const BASE_URL = "https://api.unsplash.com";

export const fetchImages = createAsyncThunk(
  "images/fetchImages",
  async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/photos`, {
        params: {
          query,
          client_id: API_KEY
        }
      });
      console.log("data", response.data.results);
      return response.data.results;
    } catch (error) {
      throw new Error("Failed to fetch images");
    }
  }
);

export const fetchImageDetails = createAsyncThunk(
  "images/fetchImageDetails",
  async (imageId) => {
    try {
      const response = await axios.get(`${BASE_URL}/photos/${imageId}`, {
        params: {
          client_id: API_KEY
        }
      });
      console.log("details", response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch image details");
    }
  }
);
