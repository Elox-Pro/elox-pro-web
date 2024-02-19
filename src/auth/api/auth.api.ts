import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LoginFormRequest } from "../components/login/login-form-request.type";
import { LoginFormResponse } from "../components/login/login-form-response.type";

//TODO: use env to set the base url
export const authenticationApi = createApi({
    reducerPath: "authenticationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://api.eloxpro.com/authentication",
        credentials: "include",
    }),
    endpoints(builder) {
        return {
            getTest: builder.query<string, void>({
                query() {
                    return `/test`
                }
            }),
            loginRequest: builder.mutation<LoginFormResponse, LoginFormRequest>({
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

export const { useGetTestQuery, useLoginRequestMutation } = authenticationApi;