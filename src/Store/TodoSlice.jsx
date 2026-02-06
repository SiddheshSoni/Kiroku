import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddTodoDB, DeleteTodoDB, GetTodoDB, UpdateTodoDB } from "../API/TodoDB";
import { handleStreakUpdate } from "../Components/helper/Streaks";

const initialState = {
    todos:[],
    loading: false,
    error: null,
};

export const SendTodosThunk = createAsyncThunk(
    'todos/addTodos',
    async(newTodo, ThunkAPI)=>{
        try{
            const res = await AddTodoDB(newTodo);

            if(!res.ok){
                return ThunkAPI.rejectWithValue(res.error);
            }
            return {...newTodo, id: res.data.name};
        }catch(error){
            return ThunkAPI.rejectWithValue(error);
        }
    }
);

export const GetTodosThunk = createAsyncThunk(
    'todos/getTodos',
    async(_, ThunkAPI) =>{
        try{
            const res = await GetTodoDB();
            if(!res.ok){
                return ThunkAPI.rejectWithValue(res.error);
            }
            const userTodos = Object.keys(res.data).map(id => ({id, ...res.data[id]}));
            return userTodos; 
        }catch(error){
            return ThunkAPI.rejectWithValue(error);
        }
    }
);

export const UpdateTodosThunk = createAsyncThunk(
    'todos/updateTodos',
    async( todo , ThunkAPI) =>{
        
        const today = new Date().toLocaleDateString("en-CA");

        let updatedTodo;
        if(todo.isDaily){
            updatedTodo = {lastCompletedDate : today, isCompleted: null}
            await handleStreakUpdate();
        }else{
            updatedTodo = {isCompleted : !todo.isCompleted};
        }

        try{
            const res = await UpdateTodoDB(todo.id, updatedTodo);
            if(!res.ok){
                return ThunkAPI.rejectWithValue(res.error);
            }
            return {id: todo.id, ...updatedTodo};
        }catch(error){
            return ThunkAPI.rejectWithValue(error);
        }
    }
);
export const DeleteTodosThunk = createAsyncThunk(
    'todos/deleteTodos',
    async( id, ThunkAPI ) =>{
        try{
            const res = await DeleteTodoDB(id);
            if(!res.ok){
                return ThunkAPI.rejectWithValue(res.error);
            }
            return { id };
        }catch(error){
            return ThunkAPI.rejectWithValue(error);
        }
    }
);

const TodoSlice = createSlice({
    name:"Todos",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(SendTodosThunk.pending, (state) =>{
                state.loading= true;
                state.error = null;
            })
            .addCase(SendTodosThunk.fulfilled, (state, action) =>{
                state.todos.push(action.payload);
                state.loading= false;
                state.error = null;
            })
            .addCase(SendTodosThunk.rejected, (state, action) =>{
                state.loading= false;
                state.error = action.payload;
            })
            .addCase(GetTodosThunk.pending, (state)=>{
                state.loading = true;
                state.error= null;
            })
            .addCase(GetTodosThunk.fulfilled, (state, action)=>{
                state.loading = false;
                state.error= null;
                state.todos = action.payload;
            })
            .addCase(GetTodosThunk.rejected, (state, action)=>{
                state.loading = false;
                state.error= action.payload;
            })
            .addCase(UpdateTodosThunk.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateTodosThunk.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = null;
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if(index !== -1){
                    state.todos[index] ={
                        ...state.todos[index],
                        ...action.payload
                    } 
                }
                if (state.todos[index].isDaily) {
                    delete state.todos[index].isCompleted;
                }
            })
            .addCase(UpdateTodosThunk.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(DeleteTodosThunk.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(DeleteTodosThunk.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = null;
                state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
            })
            .addCase(DeleteTodosThunk.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const TodoActions = TodoSlice.actions;
export default TodoSlice.reducer;