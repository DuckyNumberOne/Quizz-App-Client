import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizzPost, QuizzPostOption } from "@/lib/interface/quizz.interface";

const initialState: QuizzPostOption = {
  urlThumbnail: "",
  title: "",
  description: "",
  idCollection: "",
  visibility: "",
  keyword: "",
};

const quizzSlice = createSlice({
  name: "quizz",
  initialState,
  reducers: {
    addQuizz: (state, action: PayloadAction<QuizzPost>) => {
      return action.payload;
    },
    updateQuizz: (state, action: PayloadAction<Partial<QuizzPost>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetQuizz: (state) => {
      return initialState; // Trả về giá trị initialState để reset state
    },
  },
});

export const { addQuizz,updateQuizz } = quizzSlice.actions;
export default quizzSlice.reducer;
