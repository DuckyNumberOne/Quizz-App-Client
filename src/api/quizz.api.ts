import axios from "@/utils/index";
import { Question } from "@/lib/interface/question.interface";
import { QuizzPost } from "@/lib/interface/quizz.interface";

export const getListQuizz = async () => {
  try {
    const response = await axios.get("/quizz/getAllQuizz");
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const getItemQuizz = async (id: string | string[]) => {
  try {
    const response = await axios.get(`/quizz/getItemQuizz/${id}`);
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const getAnwsersIsTrue = async (data:any,id: string | string[] | undefined) => {
  try {
    const response = await axios.post(`/quizz/getAnwsersIsTrue/${id}`, data);
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const getQuestionById = async (id: string | string[]) => {
  try {
    const response = await axios.get(`/quizz/getQuestionById/${id}`);
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const getItemQuizzByUser = async (id: string | string[]) => {
  try {
    const response = await axios.get(`/quizz/getItemQuizzByUser/${id}`);
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const postQuizz = async (data: QuizzPost) => {
    const response = await axios.post("/quizz/createQuizz", data);
    const quizz = response.data;
    return quizz;
 
};

export const updateItemQuizz = async (data: QuizzPost, id: string) => {
  try {
    const response = await axios.put(`/quizz/updateQuizz/${id}`, data);
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const addQuestion = async (data: Question, id: string) => {
  try {
    const response = await axios.put(`/quizz/addQuestions/${id}`, data);
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const deleteQuizz = async (id: string) => {
  try {
    const response = await axios.delete(`/quizz/deleteQuizz/${id}`);
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};
