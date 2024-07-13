export interface Posts {
  _id: string;
  username: string;
  title: string;
  content: string;
  urlImage: string;
  category: string;
  view: number;
  updatedAt?: string;
  createdAt?: string;
}
