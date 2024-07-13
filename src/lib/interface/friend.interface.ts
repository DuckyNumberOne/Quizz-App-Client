import { User } from "./user.interface";

export interface Friend {
    _id?: string;
    userId: string; // ID của người dùng
    friendId: string; // ID của bạn bè
    // status: "pending" | "accepted" | "rejected"; // Trạng thái mối quan hệ bạn bè
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface FriendOption {
    _id?: string;
    userId: string; // ID của người dùng
    friendId: User; // ID của bạn bè
    // status: "pending" | "accepted" | "rejected"; // Trạng thái mối quan hệ bạn bè
    createdAt?: Date;
    updatedAt?: Date;
  }