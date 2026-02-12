import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Authenticate from "../API/Authenticate";

const userId = localStorage.getItem('user');

const token = localStorage.getItem('idToken');
const isUserLoggedIn = !!token;

const initialState ={
    idToken: token,
    userId: userId,
    isLoggedIn: isUserLoggedIn,
    loading:false,
    error: null,
};

export const LoginThunk = createAsyncThunk(
    'auth/login',
    async({ email, password, authMode}, ThunkAPI)=>{
        console.log(authMode);
        try{
            const res = await Authenticate( email, password, authMode);
            
            if(!res.ok){
                return ThunkAPI.rejectWithValue(res.error);
            }
            return res.data;
        }catch(error){
            return ThunkAPI.rejectWithValue(error.message);
        }
    }
);

const AuthSlice = createSlice({
    name:'auth',
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(LoginThunk.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(LoginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.idToken = action.payload.idToken;
                if(action.payload.email){
                    state.userId = action.payload.email.replace(/[.#$[\]]/g, "_");
                }
            })
            .addCase(LoginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})