export interface User {
  _id?: string;
  fullName: string;
  username: string;
  typeAccount: string;
  dateBirday: string;
  phoneNumber: string;
  country: string;
  urlAvatar: string;
  email: string;
  admin: boolean;
  password: string;
  updatedAt?: string;
  createdAt: string;
}

export interface UserOption {
  _id?: string;
  fullName: string;
  username: string;
  typeAccount: string;
  dateBirday: string;
  phoneNumber: string;
  country: string;
  urlAvatar: string;
  email: string;
  admin: boolean;
  password?:string;
  updatedAt?: string;
  createdAt?: string;
  __v?: string;
}

export interface UserPost {
  _id?: string;
  fullName: string;
  username: string;
  typeAccount: string;
  dateBirday: string;
  phoneNumber: string;
  country: string;
  email: string;
  password?:string;
}

export interface UserVerify {
  accessToken: string;
  userFilter: User;
}
