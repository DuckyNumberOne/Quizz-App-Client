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
