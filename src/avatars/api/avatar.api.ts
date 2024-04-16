import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../app/constants/app.constants";
import { GetAvatarsResponse } from "../types/get-avatars/get-avatars-response.type";

export const avatarApi = createApi({
    reducerPath: "avatarApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/avatars`,
        credentials: "include",
    }),
    endpoints(builder) {
        return {
            getAvatars: builder.query<GetAvatarsResponse, void>({
                query() { return "/" }
            }),
        }
    },
});

export const { useGetAvatarsQuery } = avatarApi;