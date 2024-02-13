import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LoginFormData } from "../types/login-form.data";

//TODO: use env to set the base url
export const authenticationApi = createApi({
    reducerPath: "authenticationApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3024/authentication" }),
    endpoints(builder) {
        return {
            getTest: builder.query<string, void>({
                query() {
                    return `/test`
                }
            }),
            login: builder.mutation<LoginFormData, any>({
                query(data) {
                    return {
                        url: `/login`,
                        method: "POST",
                        body: data,
                    }
                },
            }),
        }
    },
});

export const { useGetTestQuery, useLoginMutation } = authenticationApi;