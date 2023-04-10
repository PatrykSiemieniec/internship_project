import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  language: any;
}

const initialState: LanguageState = {
  language: "pl",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state: LanguageState, action: PayloadAction<any>) => {
      action.payload === "pl"
        ? (state.language = "pl")
        : (state.language = "en");
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
