import { createSlice } from "@reduxjs/toolkit";

const themeSlice=createSlice({
    name:"theme",
    initialState:{isDarkMode:true},
    reducers :{
        changeTheme :(state,action) =>{
            console.log(state)
            state.isDarkMode = !state.isDarkMode; 
        }
    }
    
})

export const {changeTheme} =themeSlice.actions;
export default themeSlice.reducer;