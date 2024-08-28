import { configureStore } from "@reduxjs/toolkit";
import alertsSlice from "./slice/alertSlice";
import categorySlice from "./slice/categorySlice";
import productSlice from "./slice/productSlice";

export const store = configureStore({
  reducer: {
    alertsState: alertsSlice,
    categoryState: categorySlice,
    productState: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});