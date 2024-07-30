import { clientInstance } from "@/api/services/axiosClient";
import { Posts } from "@/lib/interface/posts.interface";

export const getListPosts = async () => {
  try {
    const response = await clientInstance.get("/posts/getAllPosts");
    const posts = response.data;
    return posts;
  } catch (error) {
    console.error(error);
  }
};

export const getItemPosts = async (id: string | string[]) => {
  try {
    const response = await clientInstance.get(`/posts/getItemPosts/${id}`);
    const posts = response.data;
    return posts;
  } catch (error) {
    console.error(error);
  }
};

export const postPosts = async (data: Posts) => {
  try {
    const response = await clientInstance.post("/posts/createPosts", data);
    const posts = response.data;
    return posts;
  } catch (error) {
    console.error(error);
  }
};

export const updateItemPosts = async (data: Posts, id: string) => {
  try {
    const response = await clientInstance.put(`/posts/updatePosts/${id}`, data);
    const posts = response.data;
    return posts;
  } catch (error) {
    console.error(error);
  }
};

export const deletePosts = async (id: string) => {
  try {
    const response = await clientInstance.delete(`/posts/deletePosts/${id}`);
    const posts = response.data;
    return posts;
  } catch (error) {
    console.error(error);
  }
};
