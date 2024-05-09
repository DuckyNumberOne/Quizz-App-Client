import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PopupState {
  [key: string]: boolean;
}

const initialState: PopupState = {
  "popup_login": false, 
  "popup_loading_page_admin": false,
  "popup_create_quizer": true,
  "popup_choose_category_question": false,
  "popup_create_question": false,
  //Add more key
};

const scrollDisabledPopups = ["popup_login", "popup_loading_page_admin"];

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setTurnOnPopup: (state, action: PayloadAction<string>) => {
      if (scrollDisabledPopups.includes(action.payload)) {
        document.body.classList.add("disable-scroll");
      }
      state[action.payload] = true; 
    },
    setTurnOffPopup: (state, action: PayloadAction<string>) => {
      if (scrollDisabledPopups.includes(action.payload)) {
        document.body.classList.remove("disable-scroll");
      }
      state[action.payload] = false;
    },
  },
});

export const { setTurnOnPopup, setTurnOffPopup } = popupSlice.actions;
export default popupSlice.reducer;
