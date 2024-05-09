import { Anwsers } from "@/lib/modal/question";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AddAnswerPayload {
  answer: Anwsers;
}

interface AddMultipleAnswersPayload {
  anwsers: Anwsers[];
}


const initialState: Anwsers[] = [];

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    addAnswer: (state, action: PayloadAction<AddAnswerPayload>) => {
      const { answer } = action.payload;
      const existingAnswer = state.find((item) => item.number === answer.number);
      if (existingAnswer) {
        if (existingAnswer.isCorrect !== answer.isCorrect) {
          existingAnswer.isCorrect = answer.isCorrect;
        }
      } else {
        state.push(answer);
      }
    },
    addMultipleAnswers: (state, action: PayloadAction<AddMultipleAnswersPayload>) => {
      const { anwsers } = action.payload;
      state.push(...anwsers);
    },
    clearAnswer: (state) => {
      return [];
    },
  },
});

export const { addAnswer,addMultipleAnswers,clearAnswer } = answersSlice.actions;
export default answersSlice.reducer;
