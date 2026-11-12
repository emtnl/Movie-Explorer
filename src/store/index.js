import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/ApiSlice';
import movies from '../reducer/MovieSlice';
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    movie: movies,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;