import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authenticationApi = createApi({
    reducerPath: "authenticationApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3024/authentication" }),
    endpoints(builder) {
        return {
            getTest: builder.query<string, void>({
                query() {
                    return `/test`
                }
            })
        }
    },
});

export const { useGetTestQuery } = authenticationApi;