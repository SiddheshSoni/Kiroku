import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getExpense, sendExpense } from "../API/ExpenseDB";

const initialState = {
    expenses:[],
    totalExpense:0,
    loading:false,
    error:null,
};

export const sendExpenseThunk = createAsyncThunk(
    'expense/sendExpense',
    async (newExpense, ThunkAPI)=>{
        try{
            const res = await sendExpense(newExpense);
            if(!res.ok){
                return ThunkAPI.rejectWithValue(res.error);
            }
            return { ...newExpense, id:res.data.name };
        }catch(error){
            return ThunkAPI.rejectWithValue(error);
        }
    }
);

export const getExpenseThunk = createAsyncThunk(
    'expense/getExpense',
    async (_ , ThunkAPI)=>{
        try{
            const res = await getExpense();
            if(!res.ok){
                return ThunkAPI.rejectWithValue(res.error);
            }
            const allExpense = Object.keys(res.data).map(id => ({id, ...res.data[id]}));
            return allExpense;
        }catch(error){
            return ThunkAPI.rejectWithValue(error);
        }
    }
);

const ExpenseSlice = createSlice({
    name:"Expense",
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
            .addCase(sendExpenseThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendExpenseThunk.fulfilled, (state, action) => {
                state.expenses.push(action.payload);
                state.totalExpense += action.payload.amount;
                state.loading = false;
                state.error = null;
            })
            .addCase(sendExpenseThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getExpenseThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getExpenseThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.expenses = action.payload;
                state.totalExpense = action.payload.reduce((sum, expense) => sum + Number(expense.amount), 0);
            })
            .addCase(getExpenseThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const expenseActions = ExpenseSlice.actions;
export default ExpenseSlice.reducer;