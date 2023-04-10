import { configureStore } from "@reduxjs/toolkit";
import tableDataReducer from "../store/tableData-slice";
import languageReducer from "../store/lang-slice";

export const store = configureStore({
  reducer: {
    tableData: tableDataReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
