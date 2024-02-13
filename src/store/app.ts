import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  title: string;
  colorMode: "light" | "dark" | null;
  checkingAuthentication: boolean;
  // colorMode: "light" | "dark" | null;
}

const savedColorMode: "light" | "dark" =
  (window.localStorage.getItem("colorMode") as "light" | "dark") || "light";

const initialState: AppState = {
  title: "Bacuumen",
  colorMode: savedColorMode,
  checkingAuthentication: true,
};
export const appSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      window.document.title = action.payload;
      state.title = action.payload;
    },
    setColorMode: (state, action: PayloadAction<string>) => {
      const colorMode = action.payload as "light" | "dark" | null;
      state.colorMode = colorMode;

      window.localStorage.setItem("colorMode", action.payload || "light");
    },
    setTmpColorMode: (state, action: PayloadAction<string>) => {
      state.colorMode = action.payload as "light" | "dark" | null;
    },
    // Index Data
  },
});

// Action creators are generated for each case reducer function
export const { setTitle, setColorMode, setTmpColorMode } = appSlice.actions;

export default appSlice.reducer;
