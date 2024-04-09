import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "../../app/constants/app.constants";
import { GetProfileResponse } from "../types/get-profile/get-profile-response.type";

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/users`,
        credentials: "include",
    }),
    endpoints(builder) {
        return {
            getProfile: builder.query<GetProfileResponse, void>({
                query() {
                    return `/profile`
                }
            })
        }
    },
});

export const { useGetProfileQuery } = profileApi;