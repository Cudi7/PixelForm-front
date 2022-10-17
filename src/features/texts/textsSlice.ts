import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Text } from "../../common/interfaces/text.interface";

interface textInitialState {
  list: Text[] | null;
}

const initialState: textInitialState = {
  list: null,
};

export const textsSlice = createSlice({
  name: "texts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    listFetched: (state, action: PayloadAction<Text[]>) => {
      state.list = action.payload;
    },
    // byIdFetched: (state, action: PayloadAction<User>) => {
    //   state.mutationUser = action.payload;
    // },
    // updated: (state, action: PayloadAction<User>) => {
    //   state.mutationUser = action.payload;
    // },
    // deleted: (state, action) => {
    //   state.mutationUser = action.payload;
    // },
  },
});

export const {
  listFetched,
  // byIdFetched, updated, deleted
} = textsSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectTexts = (state: RootState) => state.texts.list;

export default textsSlice.reducer;
