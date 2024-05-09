import { Anwsers, Question } from "@/lib/modal/question";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState: Question[] = []


const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    //fix  PayloadAction<any>
    addQuestion: (state, action: PayloadAction<any>) => {
      state.push(action.payload);
    },
  },
});

export const { addQuestion } = questionSlice.actions;
export default questionSlice.reducer;
