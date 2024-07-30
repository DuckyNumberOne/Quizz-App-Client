import { clientInstance } from "@/api/services/axiosClient";
import { Category } from "@/lib/interface/category.interface";

export const getListCategory = async () => {
  try {
    const response = await clientInstance.get("/category/getAllCategory");
    const category = response.data;
    return category;
  } catch (error) {
    console.error(error);
  }
};

export const getItemCategory = async (id: string | string[]) => {
  try {
    const response = await clientInstance.get(`/category/getItemCategory/${id}`);
    const category = response.data;
    return category;
  } catch (error) {
    console.error(error);
  }
};

export const postCategory = async (data: Category) => {
  try {
    const response = await clientInstance.post("/category/createCategory", data);
    const category = response.data;
    return category;
  } catch (error) {
    console.error(error);
  }
};

export const updateItemCategory = async (data: Category, id: string) => {
  try {
    const response = await clientInstance.put(`/category/updateCategory/${id}`, data);
    const category = response.data;
    return category;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const response = await clientInstance.delete(`/category/deleteCategory/${id}`);
    const category = response.data;
    return category;
  } catch (error) {
    console.error(error);
  }
};
