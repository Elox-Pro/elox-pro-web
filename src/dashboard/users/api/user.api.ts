import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "../../../app/constants/app.constants";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/users`,
        credentials: "include",
    }),
    endpoints(builder) {
        return {
            getProfile: builder.query<any, string>({
                query(username: string) {
                    return `/${username}/profile` // => /users/yonax/profile - users/yonax/posts
                }
            })
        }
    },
});

export const { useGetProfileQuery } = usersApi;