import { clientInstance } from "@/api/services/axiosClient";
import { Question } from "@/lib/interface/question.interface";
import { QuizzPost } from "@/lib/interface/quizz.interface";

export const getListQuizz = async () => {
  try {
    const response = await clientInstance.get("/quizz/getAllQuizz");
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const getItemQuizz = async (id: string | string[]) => {
  try {
    const response = await clientInstance.get(`/quizz/getItemQuizz/${id}`);
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const getAnwsersIsTrue = async (data:any,id: string | string[] | undefined) => {
  try {
    const response = await clientInstance.post(`/quizz/getAnwsersIsTrue/${id}`, data);
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const getQuestionById = async (id: string | string[]) => {
  try {
    const response = await clientInstance.get(`/quizz/getQuestionById/${id}`);
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const getItemQuizzByUser = async (id: string | string[]) => {
  try {
    const response = await clientInstance.get(`/quizz/getItemQuizzByUser/${id}`);
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const postQuizz = async (data: QuizzPost) => {
    const response = await clientInstance.post("/quizz/createQuizz", data);
    const quizz = response.data;
    return quizz;
 
};

export const updateItemQuizz = async (data: QuizzPost, id: string) => {
  try {
    const response = await clientInstance.put(`/quizz/updateQuizz/${id}`, data);
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const addQuestion = async (data: Question, id: string) => {
  try {
    const response = await clientInstance.put(`/quizz/addQuestions/${id}`, data);
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};

export const deleteQuizz = async (id: string) => {
  try {
    const response = await clientInstance.delete(`/quizz/deleteQuizz/${id}`);
    const quizz = response.data;
    return quizz;
  } catch (error) {
    console.error(error);
  }
};
