import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LoginRequest } from "../types/login/login-request.type";
import { LoginResponse } from "../types/login/login-response.type";
import { API_URL } from "../../app/constants/app.constants";
import { ValidateTfaResponse } from "../types/validate-tfa/validate-tfa-response.type";
import { ValidateTfaRequest } from "../types/validate-tfa/validate-tfa-request.type";

export const authenticationApi = createApi({
    reducerPath: "authenticationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/authentication`,
        credentials: "include",
    }),
    endpoints(builder) {
        return {
            loginRequest: builder.mutation<LoginResponse, LoginRequest>({
                query(data) {
                    return {
                        url: `/login`,
                        method: "POST",
                        body: data,
                    }
                },
            }),
            validateTfaRequest: builder.mutation<ValidateTfaResponse, ValidateTfaRequest>({
                query(data) {
                    return {
                        url: `/validate-tfa`,
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
    useLogoutRequestMutation,
    useLoginRequestMutation,
    useValidateTfaRequestMutation
} = authenticationApi;