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
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    filters: {},
    totalCars: 0,
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
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
    toggleFavorite: (state, action) => {
      const carId = action.payload;
      if (state.favorites.includes(carId)) {
        state.favorites = state.favorites.filter((id) => id !== carId);
      } else {
        state.favorites.push(carId);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCars.pending, handlePending)
      .addCase(getAllCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const { cars, page, totalPages, totalCars } = action.payload;

        if (page === 1) {
          state.cars = cars;
        } else {
          const existingIds = new Set(state.cars.map((car) => car.id));
          const newCars = cars.filter((car) => !existingIds.has(car.id));
          state.cars = [...state.cars, ...newCars];
        }

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

export const {
  setFilters,
  clearCurrentItem,
  clearFilters,
  clearSearchParams,
  toggleFavorite,
} = carsSlice.actions;
export default carsSlice.reducer;
