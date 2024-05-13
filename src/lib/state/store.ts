import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./popup/popupSlice";
import questionReducer from "./questions/questionSlice";
import answerReducer from "./answer/answerSlice";
import quizzReducer from "./quizz/quizzSlice";
import userReducer from "./user/userSlice";
import resultReducer from "./result/resultSlice"

export const store = configureStore({
  reducer: {
    popup: popupReducer,
    question:questionReducer,
    answers:answerReducer,
    quizz:quizzReducer,
    user:userReducer,
    result:resultReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
