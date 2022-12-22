import { configureStore } from "@reduxjs/toolkit";
import ExpensesReducer from "./ExpensesReducer";

export const store = configureStore({
  reducer: {
    expenses: ExpensesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
