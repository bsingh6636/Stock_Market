import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme"
import symbolReducer from "./symbol";
import userSliceReducer from "./userSlice";

const appStore = configureStore({
    reducer: {
        theme: themeReducer,
        symbol:symbolReducer,
        user: userSliceReducer,
    },
})

export default appStore;