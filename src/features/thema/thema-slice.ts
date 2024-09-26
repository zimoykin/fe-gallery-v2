import { createSlice } from "@reduxjs/toolkit";
import { Theme } from "../../contexts/theme/types";

interface ThemaState {
  thema: Theme;
}

const initialState: ThemaState = {
  thema: "system",
};

const themaSlice = createSlice({
  name: "thema",
  initialState,
  reducers: {
    toDark: (state) => {
      state.thema = "dark";
    },
    toLight: (state) => {
      state.thema = "light";
    },
    toSystem: (state) => {
      state.thema = "system";
    },
  },
});

export const { toDark, toLight, toSystem } = themaSlice.actions;

export default themaSlice.reducer;
