import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_EXPENSES } from "../data/data";

const ExpensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: DUMMY_EXPENSES,
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload.expense);
    },
    removeExpense: (state, action) => {
      state.expenses.splice(state.expenses.indexOf(action.payload.id), 1);
    },
  },
});

export const addExpense = ExpensesSlice.actions.addExpense;
export const removeExpense = ExpensesSlice.actions.removeExpense;
export default ExpensesSlice.reducer;
