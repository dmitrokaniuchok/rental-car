import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../services/api.js";

export const getAllCars = createAsyncThunk(
  "catalog/getAllCars",
  async (params, thunkAPI) => {
    try {
      const response = await axiosApi.get("/cars", { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCarById = createAsyncThunk(
  "catalog/getCarById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosApi.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
