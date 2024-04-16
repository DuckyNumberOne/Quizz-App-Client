import axios from "@/utils/index";
import { Category } from "@lib/modal/category";

export const getListCategory = async () => {
  try {
    const response = await axios.get("/category/getAllCategory");
    const category = response.data;
    return category;
  } catch (error) {
    console.error(error);
  }
};

export const getItemCategory = async (id: string | string[]) => {
  try {
    const response = await axios.get(`/category/getItemCategory/${id}`);
    const category = response.data;
    return category;
  } catch (error) {
    console.error(error);
  }
};

export const postCategory = async (data: Category) => {
  try {
    const response = await axios.post("/category/createCategory", data);
    const category = response.data;
    return category;
  } catch (error) {
    console.error(error);
  }
};

export const updateItemCategory = async (data: Category, id: string) => {
  try {
    const response = await axios.put(`/category/updateCategory/${id}`, data);
    const category = response.data;
    return category;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const response = await axios.delete(`/category/deleteCategory/${id}`);
    const category = response.data;
    return category;
  } catch (error) {
    console.error(error);
  }
};
