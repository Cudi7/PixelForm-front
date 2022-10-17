import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Text } from "../../common/interfaces/text.interface";

const baseUrl = "http://localhost:5000/api";

export const textApi = createApi({
  reducerPath: "textsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Texts"],
  endpoints: (builder) => ({
    getAll: builder.query<Text[], void>({
      query: () => `/texts`,
      providesTags: [{ type: "Texts", id: "textsLIST" }],
    }),
    addText: builder.mutation<Text, Text>({
      query(text: Text) {
        return {
          url: `/texts/new`,
          method: "POST",
          body: text,
        };
      },
      invalidatesTags: [{ type: "Texts", id: "textsLIST" }],
    }),
    // deleteUsers: builder.mutation<string[], User>({
    //   query(idArray: string[]) {
    //     return {
    //       url: `users/delete`,
    //       method: "DELETE",
    //       body: idArray,
    //     };
    //   },
    //   invalidatesTags: [{ type: "Users", id: "LIST" }],
    // }),
    // updateUser: builder.mutation<User, User>({
    //   query(user: User) {
    //     return {
    //       url: `users/update`,
    //       method: "PATCH",
    //       body: user,
    //     };
    //   },
    //   invalidatesTags: [{ type: "Users", id: "LIST" }],
    // }),
  }),
});
