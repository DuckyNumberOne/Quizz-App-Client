import { userInit } from "@lib/config/initUser";
import { User, UserOption } from "@/lib/interface/user.interface";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";


const initialState: UserOption = userInit;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserOption>) => {
      return action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;

