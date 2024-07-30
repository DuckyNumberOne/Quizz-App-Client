import { clientInstance } from "@/api/services/axiosClient";
import { Collection } from "@/lib/interface/collection.interface";

export const getListCollection = async () => {
  try {
    const response = await clientInstance.get("/collection/getAllCollection");
    const collection = response.data;
    return collection;
  } catch (error) {
    console.error(error);
  }
};

export const getItemCollection = async (id: string | string[]) => {
  try {
    const response = await clientInstance.get(`/collection/getItemCollection/${id}`);
    const collection = response.data;
    return collection;
  } catch (error) {
    console.error(error);
  }
};

export const postCollection = async (data: Collection) => {
  try {
    const response = await clientInstance.post("/collection/createCollection", data);
    const collection = response.data;
    return collection;
  } catch (error) {
    console.error(error);
  }
};

export const updateItemCollection = async (data: Collection, id: string) => {
  try {
    const response = await clientInstance.put(
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
    const response = await clientInstance.delete(`/collection/deleteCollection/${id}`);
    const Collection = response.data;
    return Collection;
  } catch (error) {
    console.error(error);
  }
};
