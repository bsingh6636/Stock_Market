import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme"
import symbolReducer from "./symbol";

const appStore = configureStore({
    reducer: {
        theme: themeReducer,
        symbol:symbolReducer
    },
})

export default appStore;