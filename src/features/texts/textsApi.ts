import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Text } from "../../common/interfaces/text.interface";

const baseUrl = "https://pixelformback.onrender.com/api";

export const textApi = createApi({
  reducerPath: "textsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Texts"],
  endpoints: (builder) => ({
    getAll: builder.query<
      { success: boolean; texts: Text[]; status: number },
      void
    >({
      query: () => `/texts`,
      providesTags: [{ type: "Texts", id: "LIST" }],
    }),
    addText: builder.mutation<Text, Text>({
      query(text: Text) {
        return {
          url: `/texts/new`,
          method: "POST",
          body: text,
        };
      },
      invalidatesTags: [{ type: "Texts", id: "LIST" }],
    }),
    deleteTexts: builder.mutation<string[], string[]>({
      query(idArray: string[]) {
        return {
          url: `texts/delete`,
          method: "DELETE",
          body: idArray,
        };
      },
      invalidatesTags: [{ type: "Texts", id: "LIST" }],
    }),
    updateText: builder.mutation<Text, Text>({
      query(text: Text) {
        return {
          url: `texts/update`,
          method: "PATCH",
          body: text,
        };
      },
      invalidatesTags: [{ type: "Texts", id: "LIST" }],
    }),
  }),
});
