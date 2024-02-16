import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LoginFormType } from "../components/login/login-form.type";

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
            loginReq: builder.mutation<LoginFormType, any>({
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

export const { useGetTestQuery, useLoginReqMutation } = authenticationApi;