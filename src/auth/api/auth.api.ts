import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LoginRequest } from "../types/login/login-request.type";
import { LoginResponse } from "../types/login/login-response.type";
import { API_URL } from "../../app/constants/app.constants";
import { SignupResponse } from "../types/signup/signup-response.type";
import { SignupRequest } from "../types/signup/signup-request.type";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/authentication`,
        credentials: "include",
    }),
    endpoints(builder) {
        return {
            signupRequest: builder.mutation<SignupResponse, SignupRequest>({
                query(data) {
                    return {
                        url: `/signup`,
                        method: "POST",
                        body: data,
                    }
                },
            }),
            login: builder.mutation<LoginResponse, LoginRequest>({
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

export const {
    useSignupRequestMutation,
    useLoginMutation,
    useLogoutRequestMutation
} = authApi;