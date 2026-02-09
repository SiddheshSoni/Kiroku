import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./TodoSlice";
import ExpenseReducer from "./ExpenseSlice";

const store = configureStore({
    reducer:{ todo: TodoReducer, expense:ExpenseReducer },
});
export default store;