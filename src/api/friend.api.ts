import axios from "@/utils/index";
import { Friend } from "@/lib/interface/friend.interface";

export const getListFriends = async () => {
  try {
    const response = await axios.get("/friend/getAllFriends");
    const friends = response.data;
    return friends;
  } catch (error) {
    console.error(error);
  }
};

export const getItemFriend = async (id: string | string[]) => {
  try {
    const response = await axios.get(`/friend/getFriendByIdUser/${id}`);
    const friend = response.data;
    return friend;
  } catch (error) {
    console.error(error);
  }
};

export const postFriend = async (data: Friend) => {
    const response = await axios.post("/friend/addFriend", data);
    const friend = response.data;
    return friend;
};

export const updateItemFriend = async (data: Friend, id: string) => {
  try {
    const response = await axios.put(`/friend/updateFriend/${id}`, data);
    const friend = response.data;
    return friend;
  } catch (error) {
    console.error(error);
  }
};

export const deleteFriend = async (id: string) => {
    const response = await axios.delete(`/friend/removeFriend/${id}`);
    const friend = response.data;
    return friend;
};
