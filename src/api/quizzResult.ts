import axios from "@/utils/index";
import { QuizzResult } from "@lib/modal/quizzResult";

export const getItemQuizzResult = async (id: string | string[]) => {
  try {
    const response = await axios.get(`/quizzResult/getItemQuizzResult/${id}`);
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const getItemQuizzResultByUser = async (id: string | string[]) => {
  try {
    const response = await axios.get(
      `/quizzResult/getItemQuizzResultByUser/${id}`
    );
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const getQuestionPercentagesByQuizzId = async (id: string | string[]) => {
  try {
    const response = await axios.get(
      `/quizzResult/getQuestionPercentagesByQuizzId/${id}`
    );
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const getItemQuizzResultByQuizz = async (id: string | string[]) => {
  try {
    const response = await axios.get(
      `/quizzResult/getItemQuizzResultByQuizz/${id}`
    );
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const postQuizzResult = async (data: QuizzResult) => {
    const response = await axios.post("/quizzResult/createQuizzResult", data);
    const quizz = response.data;
    return quizz;

};

export const updateItemQuizzResult = async (data: QuizzResult, id: string) => {
  try {
    const response = await axios.put(
      `/quizzResult/updateQuizzResult/${id}`,
      data
    );
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const deleteQuizzResult = async (id: string) => {
  try {
    const response = await axios.delete(`/quizzResult/deleteQuizzResult/${id}`);
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAllQuizzResult = async () => {
  try {
    const response = await axios.delete(`/quizzResult/deleteAllQuizzResult/`);
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};