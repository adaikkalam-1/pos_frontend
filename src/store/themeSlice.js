import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeMenu: sessionStorage.getItem("activeMenu")
    ? JSON.parse(sessionStorage.getItem("activeMenu"))
    : "/",
  layoutCollapsed: sessionStorage.getItem("layoutCollapsed")
    ? JSON.parse(sessionStorage.getItem("layoutCollapsed"))
    : false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
      sessionStorage.setItem("activeMenu", JSON.stringify(action.payload));
    },
    setLayoutCollapsed: (state, action) => {
      state.layoutCollapsed = action.payload;
      sessionStorage.setItem("layoutCollapsed", JSON.stringify(action.payload));
    },
  },
});

export const { setActiveMenu, setLayoutCollapsed } = themeSlice.actions;
export default themeSlice.reducer;
