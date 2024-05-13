import { userInit } from "@/lib/config/initUser";
import { User } from "@/lib/modal/user";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";


const initialState: User = userInit;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;

