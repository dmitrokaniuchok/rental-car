import { createSlice } from "@reduxjs/toolkit";
import { getAllCars, getCarById } from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    currentCar: null,
    favorites: [],
    filters: {},
    totalCars: 0,
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentItem: (state) => {
      state.currentCar = null;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    clearSearchParams: (state) => {
      state.cars = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.totalCars = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCars.pending, handlePending)
      .addCase(getAllCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const { cars, page, totalPages, totalCars } = action.payload;
        state.cars = page === 1 ? cars : [...state.cars, ...cars];
        state.currentPage = page;
        state.totalPages = totalPages;
        state.totalCars = totalCars;
      })
      .addCase(getAllCars.rejected, handleRejected)
      .addCase(getCarById.pending, handlePending)
      .addCase(getCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentCar = action.payload;
      })
      .addCase(getCarById.rejected, handleRejected);
  },
});

export const carsActions = carsSlice.actions;
export default carsSlice.reducer;
