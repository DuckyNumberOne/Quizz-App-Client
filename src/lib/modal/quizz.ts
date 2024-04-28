import { Collection } from './collection';
import { Question } from "./question";
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

export interface QuizzPost {
  urlThumbnail: string;
  title: string;
  description: string;
  idCollection: string;
  visibility: string;
  keyword: string;
}
