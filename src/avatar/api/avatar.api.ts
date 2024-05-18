import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../app/constants/app.constants";
import { ListAvatarsResponse } from "../types/list-avatars/list-avatars-response.type";
import i18n from "../../app/i18n/i18n";

export const avatarApi = createApi({
    reducerPath: "avatarApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/avatars`,
        credentials: "include",
        prepareHeaders: (headers) => {
            headers.append('Accept-Language', `${i18n.language}`);
            return headers;
        },
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