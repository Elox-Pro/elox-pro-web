import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

//TODO: Watch a video about rtk query 
export const authenticationApi = createApi({
    reducerPath: "authentication-api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3024/authentication" }),
    tagTypes: ["Authentication"],
    endpoints(builder) {
        return {
            getTest: builder.query<void, string | void>({
                query() {
                    return `/test`
                },
                providesTags: ["Authentication"],
            })
        }
    },
});

export const { useGetTestQuery } = authenticationApi;