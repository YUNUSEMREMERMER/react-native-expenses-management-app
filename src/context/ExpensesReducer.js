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
    updateExpense: (state, action) => {
      state.expenses.forEach((expense) => {
        if (expense.id === action.payload.expense.id) {
          expense.amount = action.payload.expense.amount;
          expense.description = action.payload.expense.description;
          expense.date = action.payload.expense.date;
        }
      });
    },
  },
});

export const addExpense = ExpensesSlice.actions.addExpense;
export const updateExpense = ExpensesSlice.actions.updateExpense;
export const removeExpense = ExpensesSlice.actions.removeExpense;
export default ExpensesSlice.reducer;
