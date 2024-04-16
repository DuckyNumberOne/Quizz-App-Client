import axios from "@/utils/index";
import { Collection } from "@lib/modal/collection";

export const getListCollection = async () => {
  try {
    const response = await axios.get("/collection/getAllCollection");
    const collection = response.data;
    return collection;
  } catch (error) {
    console.error(error);
  }
};

export const getItemCollection = async (id: string | string[]) => {
  try {
    const response = await axios.get(`/collection/getItemCollection/${id}`);
    const collection = response.data;
    return collection;
  } catch (error) {
    console.error(error);
  }
};

export const postCollection = async (data: Collection) => {
  try {
    const response = await axios.post("/collection/createCollection", data);
    const collection = response.data;
    return collection;
  } catch (error) {
    console.error(error);
  }
};

export const updateItemCollection = async (data: Collection, id: string) => {
  try {
    const response = await axios.put(
      `/collection/updateCollection/${id}`,
      data
    );
    const collection = response.data;
    return collection;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCollection = async (id: string) => {
  try {
    const response = await axios.delete(`/collection/deleteCollection/${id}`);
    const Collection = response.data;
    return Collection;
  } catch (error) {
    console.error(error);
  }
};
