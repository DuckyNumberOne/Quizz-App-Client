import { User } from "./user.interface";

export interface Friend {
    _id?: string;
    userId: string; 
    friendId: string; 
    // status: "pending" | "accepted" | "rejected"; 
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface FriendOption {
    _id?: string;
    userId: string; 
    friendId: User; 
    // status: "pending" | "accepted" | "rejected"; 
    createdAt?: Date;
    updatedAt?: Date;
  }