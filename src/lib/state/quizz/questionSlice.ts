import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizzPost } from "@/lib/modal/quizz";

const initialState: QuizzPost = {
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
  },
});

export const { addQuizz } = quizzSlice.actions;
export default quizzSlice.reducer;
