import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResultState {
  point: number;
  time: number;
  index: number;
  rightAnswer:boolean;
}

const initialState: ResultState[] = [];

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    addResult: (state, action: PayloadAction<ResultState>) => {
      state.push(action.payload);;
    },
    resetResult: (state) => {
      return [];
    }
  
  },
});

export const { addResult ,resetResult} = resultSlice.actions;
export default resultSlice.reducer;
