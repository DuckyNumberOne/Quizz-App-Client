export interface Anwsers {
  _id?: string;
  number: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  _id?: string;
  title: string;
  imgQuestion: string;
  time: number;
  point: number;
  anwsers: Array<Anwsers>;
  updatedAt?: string;
  createdAt?: string;
}
