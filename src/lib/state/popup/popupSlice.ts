import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PopupState {
  [key: string]: boolean;
}

const initialState: PopupState = {
  "popup_login": false, 
  "popup_loading_page_admin": false,
  //Add more key
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setTurnOnPopup: (state, action: PayloadAction<string>) => {
      document.body.classList.add("disable-scroll");
      state[action.payload] = true; 
    },
    setTurnOffPopup: (state, action: PayloadAction<string>) => {
      document.body.classList.remove("disable-scroll");
      state[action.payload] = false;
    },
  },
});

export const { setTurnOnPopup, setTurnOffPopup } = popupSlice.actions;
export default popupSlice.reducer;
