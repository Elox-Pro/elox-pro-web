import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../app/constants/app.constants";
import i18n from "../../app/i18n/i18n";
import { GetUsersResponse } from "../types/get-users/get-users.response";
import { GetUsersRequest } from "../types/get-users/get-users.request";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/users`,
        credentials: "include",
        prepareHeaders: (headers) => {
            headers.append('Accept-Language', `${i18n.language}`);
            return headers;
        },
    }),
    tagTypes: ["getUsers"],
    endpoints(builder) {
        return {
            getUsers: builder.query<GetUsersResponse, GetUsersRequest>({
                query(data) {
                    return {
                        url: '/',
                        method: "POST",
                        body: data,
                    }
                },
                providesTags: ["getUsers"]
            }),
        }
    },
});

export const {
    useGetUsersQuery,
} = userApi;