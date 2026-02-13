import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./TodoSlice";
import ExpenseReducer from "./ExpenseSlice";
import UIReducer from "./UISlice";
import AuthReducer from "./AuthSlice";

const store = configureStore({
    reducer:{ todo: TodoReducer, expense:ExpenseReducer, ui:UIReducer, auth:AuthReducer },
});
export default store;