export interface QuizzResult {
  _id?: string;
  idUser: string;
  idQuizz: string;
  rightAnswer: number;
  completionTime: number;
  totalPoints: number;
  updatedAt?: string;
  createdAt?: string;
}
interface UserResult{
  _id:string;
  fullName:string;
  urlAvatar:string;
}
export interface QuizzResultOption {
  _id?: string;
  idUser: UserResult;
  idQuizz: string;
  rightAnswer: number;
  completionTime: number;
  totalPoints: number;
  updatedAt?: string;
  createdAt?: string;
}
