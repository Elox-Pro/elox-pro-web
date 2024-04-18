import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../app/constants/app.constants";
import {  ListAvatarsResponse } from "../types/list-avatars/list-avatars-response.type";

export const avatarApi = createApi({
    reducerPath: "avatarApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/avatars`,
        credentials: "include",
    }),
    endpoints(builder) {
        return {
            listAvatars: builder.query<ListAvatarsResponse, void>({
                query() { return "/" }
            }),
        }
    },
});

export const { useListAvatarsQuery } = avatarApi;