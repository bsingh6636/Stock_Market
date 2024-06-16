import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme"

const appStore =configureStore({
    reducer :{
            theme:themeReducer
    },
})

export default appStore;