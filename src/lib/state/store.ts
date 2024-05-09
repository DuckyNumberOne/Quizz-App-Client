import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./popup/popupSlice";
import questionReducer from "./questions/questionSlice";
import answerReducer from "./answer/answerSlice";
import quizzReducer from "./quizz/questionSlice";




export const store = configureStore({
  reducer: {
    popup: popupReducer,
    question:questionReducer,
    answers:answerReducer,
    quizz:quizzReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
