import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    theme:localStorage.getItem("theme") || "light",
};

const UISlice = createSlice({
    name:'ui',
    initialState,
    reducers:{
        toggleTheme :(state) => {
            state.theme = state.theme === 'light'? 'dark' : 'light';
        },
        setTheme :(state, action)=>{
            state.theme = action.payload;
        },
    },
});

export const UIActions = UISlice.actions;
export default UISlice.reducer;