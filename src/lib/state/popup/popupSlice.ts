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
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, () => {
  //       console.log("incrementAsync.pending");
  //     })
  //     .addCase(
  //       incrementAsync.fulfilled,
  //       (state, action: PayloadAction<number>) => {
  //         state.value += action.payload;
  //       }
  //     );
  // },
});

// export const incrementAsync = createAsyncThunk(
//   "counter/incrementAsync",
//   async (amount: number) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     return amount;
//   }
// );

// export const { setTurnOnPopup, setTurnOffPopup, incrementByAmount } = counterSlice.actions;
export const { setTurnOnPopup, setTurnOffPopup } = counterSlice.actions;
export default counterSlice.reducer;
