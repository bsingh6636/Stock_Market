import { createSlice } from "@reduxjs/toolkit";

const symbolSlice=createSlice({
    name:"symbol",
    initialState:{symbol:"AAPL"},
    reducers :{
        newSymbol :(state,action) =>{
             state.symbol = action.payload
        }
    }
    
})

export const {newSymbol} =symbolSlice.actions;
export default symbolSlice.reducer;