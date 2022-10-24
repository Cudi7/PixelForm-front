import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { string } from "yup";
import { RootState } from "../../app/store";
import { User } from "../../common/interfaces/user.interface";

interface historyTest {
  modificadoPor: string;
  date: Date;
  action: string;
}

interface userInitialState {
  list: User[] | null;
  lastHistoryAction: historyTest | null;
}

const initialState: userInitialState = {
  list: null,
  lastHistoryAction: null,
};

export const usersSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    listFetched: (state, action: PayloadAction<User[]>) => {
      state.list = action.payload;
    },
    historyActionRecorded: (state, action: PayloadAction<historyTest>) => {
      state.lastHistoryAction = action.payload;
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
  historyActionRecorded,
  // byIdFetched, updated, deleted
} = usersSlice.actions;

export const recordHistoryAction = (data: historyTest) => (dispatch) => {
  dispatch({ type: historyActionRecorded.type, payload: data });
};

// Other code such as selectors can use the imported `RootState` type

export const selectUsers = (state: RootState) => state.users.list;

export const selectedMutationUser = (state: RootState) =>
  state.users.mutationUser;

export default usersSlice.reducer;
