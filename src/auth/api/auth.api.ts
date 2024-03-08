import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LoginFormRequest } from "../components/login/login-form-request.type";
import { LoginFormResponse } from "../components/login/login-form-response.type";
import { API_URL } from "../../app/constants/app.constants";

export const authenticationApi = createApi({
    reducerPath: "authenticationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/authentication`,
        credentials: "include",
    }),
    endpoints(builder) {
        return {
            loginRequest: builder.mutation<LoginFormResponse, LoginFormRequest>({
                query(data) {
                    return {
                        url: `/login`,
                        method: "POST",
                        body: data,
                    }
                },
            }),
            logoutRequest: builder.mutation<void, void>({
                query() {
                    return {
                        url: `/logout`,
                        method: "POST",
                    }
                }
            }),
        }
    },
});

export const { useLogoutRequestMutation, useLoginRequestMutation } = authenticationApi;