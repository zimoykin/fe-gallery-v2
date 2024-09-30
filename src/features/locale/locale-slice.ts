import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Locale } from "../../contexts/locale";

interface LocaleState {
  locale: Locale | null;
}

const initialState: LocaleState = {
  locale: "en",
};

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    storeLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
    dropLocale: (state) => {
      state.locale = null;
    },
  },
});

export const { storeLocale, dropLocale } = localeSlice.actions;
export default localeSlice.reducer;
