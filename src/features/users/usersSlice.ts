import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { User } from "../../common/interfaces/user.interface";

interface userInitialState {
  list: User[] | null;
  mutationUser: User | null;
}

const initialState: userInitialState = {
  list: null,
  mutationUser: null,
};

export const usersSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    listFetched: (state, action: PayloadAction<User[]>) => {
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
} = usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectUsers = (state: RootState) => state.users.list;

export const selectedMutationUser = (state: RootState) =>
  state.users.mutationUser;

export default usersSlice.reducer;
