import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question } from "@/lib/modal/question";

const initialState: Question[] = [];

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.push(action.payload);
    },
    updateQuestion: (state, action: PayloadAction<Question>) => {
      const updatedQuestion = action.payload;
      const existingQuestionIndex = state.findIndex(
        (question) => question._id === updatedQuestion._id
      );
      if (existingQuestionIndex !== -1) {
        state[existingQuestionIndex] = updatedQuestion;
      }
    },
    deleteQuestionByIndex: (state, action: PayloadAction<number>) => {
      const indexToDelete = action.payload;
      if (indexToDelete >= 0 && indexToDelete < state.length) {
        state.splice(indexToDelete, 1);
      }
    },
  },
});

export const { addQuestion, updateQuestion,deleteQuestionByIndex } = questionSlice.actions;
export default questionSlice.reducer;
