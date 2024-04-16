import axios from "@/utils/index";
import { Posts } from "@lib/modal/posts";

export const getListPosts = async () => {
  try {
    const response = await axios.get("/posts/getAllPosts");
    const posts = response.data;
    return posts;
  } catch (error) {
    console.error(error);
  }
};

export const getItemPosts = async (id: string | string[]) => {
  try {
    const response = await axios.get(`/posts/getItemPosts/${id}`);
    const posts = response.data;
    return posts;
  } catch (error) {
    console.error(error);
  }
};

export const postPosts = async (data: Posts) => {
  try {
    const response = await axios.post("/posts/createPosts", data);
    const posts = response.data;
    return posts;
  } catch (error) {
    console.error(error);
  }
};

export const updateItemPosts = async (data: Posts, id: string) => {
  try {
    const response = await axios.put(`/posts/updatePosts/${id}`, data);
    const posts = response.data;
    return posts;
  } catch (error) {
    console.error(error);
  }
};

export const deletePosts = async (id: string) => {
  try {
    const response = await axios.delete(`/posts/deletePosts/${id}`);
    const posts = response.data;
    return posts;
  } catch (error) {
    console.error(error);
  }
};
