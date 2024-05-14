import { Collection } from './collection';
import { Question, QuestionPost } from "./question";
import { User } from "./user";

export interface Quizz {
  user: User;
  collection:Collection;
  _id: string;
  idUser: string;
  title: string;
  description: string;
  urlThumbnail: string;
  idCollection: string;
  visibility: string;
  keyword: string;
  play: number;
  share: number;
  question: Array<Question>;
  updatedAt?: string;
  createdAt?: string;
}

export interface CollectionOption2{
  _id:string;
  title:string
}
export interface QuizzOption2 {
  user: User;
  _id: string;
  idUser: string;
  title: string;
  description: string;
  urlThumbnail: string;
  idCollection: CollectionOption2
  keyword: string;
  play: number;
  share: number;
  question: Array<Question>;
  updatedAt?: string;
  createdAt?: string;
}

export interface QuizzPost {
  idUser: string;
  urlThumbnail: string;
  title: string;
  description: string;
  idCollection: string;
  visibility: string;
  keyword: string;
  question: QuestionPost[]
}
