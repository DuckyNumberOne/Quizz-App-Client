import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CounterState {
  statusPopup: boolean;
}

const initialState: CounterState = {
  statusPopup: false,
};

const counterSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setTurnOnPopup: (state) => {
      document.body.classList.add("disable-scroll");
      state.statusPopup = true;
    },
    setTurnOffPopup: (state) => {
      document.body.classList.remove("disable-scroll");
      state.statusPopup = false;
    },
  },
});

export const { setTurnOnPopup, setTurnOffPopup } = counterSlice.actions;
export default counterSlice.reducer;
