import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./TodoSlice";
import ExpenseReducer from "./ExpenseSlice";
import UIReducer from "./UISlice";

const store = configureStore({
    reducer:{ todo: TodoReducer, expense:ExpenseReducer, ui:UIReducer  },
});
export default store;