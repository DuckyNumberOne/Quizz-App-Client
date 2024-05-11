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
    // checkExisQuestion: (state, action: PayloadAction<Question>) => {
    //   const updatedQuestion = action.payload;
    //   const existingQuestionIndex = state.findIndex(
    //     (question) => question.title === updatedQuestion.title
    //   );
    //   // Trả về true nếu câu hỏi tồn tại, ngược lại trả về false
    //   return existingQuestionIndex !== -1;
    // },
  },
});

export const { addQuestion, updateQuestion } = questionSlice.actions;
export default questionSlice.reducer;
