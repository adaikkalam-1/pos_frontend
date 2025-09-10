import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import cartSlice from "./cartSlice"

const store = configureStore({
    reducer: {
        theme: themeSlice,
        cart: cartSlice,
    },
});
export default store;