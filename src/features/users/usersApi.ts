import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../common/interfaces/user.interface";

const baseUrl = "https://pixelformback.onrender.com/api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAll: builder.query<User[], void>({
      query: () => `/users`,
      providesTags: [{ type: "Users", id: "LIST" }],
    }),
    addUser: builder.mutation<User, User>({
      query(user: User) {
        return {
          url: `/users/new`,
          method: "POST",
          body: user,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    deleteUsers: builder.mutation<string[], User>({
      query(idArray: string[]) {
        return {
          url: `users/delete`,
          method: "DELETE",
          body: idArray,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUser: builder.mutation<User, User>({
      query(user: User) {
        return {
          url: `users/update`,
          method: "PATCH",
          body: user,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});
