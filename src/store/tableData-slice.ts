import { createSlice } from "@reduxjs/toolkit";

export interface tableDataState {
  key: React.Key;
  birth_date: string;
  name: string;
  age: number;
  biography: string | undefined;
}
const initialState: { dataSource: tableDataState[] } = {
  dataSource: [],
};

const handleDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1;
  const formatedMonth =
    month < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  const birth_date = `${year}-${formatedMonth}-${day}`;

  return { birth_date };
};

export const tableDataSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    add: (state, action) => {
      const { birth_date } = handleDate(action.payload.birth_date);
      const timestamp = action.payload.birth_date;

      const payload = { ...action.payload, birth_date, timestamp };
      const data = [...state.dataSource, payload];

      const dataSource = data.map((item, idx) => ({ key: idx, ...item }));

      state.dataSource = dataSource;
    },
    edit: (state, action) => {
      const { birth_date } = handleDate(action.payload.birth_date);

      const payload = { ...action.payload, birth_date };

      const indexToChange = state.dataSource.findIndex((item) => {
        return item.key === payload.key;
      });

      const updatedState = [...state.dataSource];

      updatedState[indexToChange] = {
        ...updatedState,
        key: payload.key,
        birth_date: payload.birth_date,
        age: payload.age,
        name: payload.name,
        biography: payload.curriculum_vitae,
      };

      state.dataSource = updatedState;
    },
    deleteRow: (state, action) => {
      const record = action.payload.key;

      const indexToDelete = state.dataSource.findIndex((item) => {
        return item.key === record;
      });

      const filteredState = state.dataSource.filter((_, index) => {
        return index !== indexToDelete;
      });

      state.dataSource = filteredState;
    },
    deleteMultipleRows: (state, action) => {
      const indexesToDelete = action.payload;

      indexesToDelete.sort((a: number, b: number) => b - a).flat();

      const newArray = state.dataSource.slice();

      for (const index of indexesToDelete) {
        let rightIndex = newArray.findIndex((item) => {
          return item.key === index;
        });
        newArray.splice(rightIndex, 1);
      }

      state.dataSource = newArray;
    },
  },
});

export const { add, edit, deleteRow, deleteMultipleRows } =
  tableDataSlice.actions;

export default tableDataSlice.reducer;
