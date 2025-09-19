import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: localStorage.getItem("accessToken")
    ? JSON.parse(localStorage.getItem("accessToken")) : null,
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
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.accessToken = null;
      state.activeMenu = "/",
        state.layoutCollapsed = false,
        localStorage.removeItem("accessToken")
      sessionStorage.removeItem("activeMenu");
      sessionStorage.removeItem("layoutCollapsed")

    }
  }
});

export const { setActiveMenu, setLayoutCollapsed, setAccessToken, logout } = themeSlice.actions;
export default themeSlice.reducer;
