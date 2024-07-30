import { clientInstance } from "@/api/services/axiosClient";
import { User, UserPost } from "@/lib/interface/user.interface";

export const getListUser = async () => {
  try {
    const response = await clientInstance.get("/user/getAllUser");
    const users = response.data;
    return users;
  } catch (error) {
    console.error(error);
  }
};

interface PropsCheckEmail {
  username: string;
  email: string;
  password: string;
}

export const checkEmail = async (data: PropsCheckEmail) => {
  try {
    const response = await clientInstance.post("/user/checkExisEmail", data);
    const users = response.data;
    return users;
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (id: string | undefined) => {
  try {
    const response = await clientInstance.get(`/user/getUser/${id}`);
    const users = response.data;
    return users;
  } catch (error) {
    console.error(error);
  }
};

export const getUserByCategoryId = async (id: string | undefined) => {
  try {
    const response = await clientInstance.get(`/user/getItemPostsByCategoryId/${id}`);
    const users = response.data;
    return users;
  } catch (error) {
    console.error(error);
  }
};

export const getAllUserByFullName = async (fullName: string | undefined) => {
  try {
    const response = await clientInstance.get(`/user/getAllUserByFullName/${fullName}`);
    const users = response.data;
    return users;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (data: User, id: string) => {
    const response = await clientInstance.put(`/user/updateUser/${id}`, data);
    const users = response.data;
    return users;
};

export const postUser = async (data: UserPost) => {
  try {
    const response = await clientInstance.post("/user/createUser", data);
    const users = response.data;
    return users;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await clientInstance.delete(`/user/deleteUser/${id}`);
    const users = response.data;
    return users;
  } catch (error) {
    console.error(error);
  }
};
