import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "../../app/constants/app.constants";
import { RecoverPasswordInitResponse } from "../types/recover-password-init/recover-password-init-response.type";
import { RecoverPasswordInitRequest } from "../types/recover-password-init/recover-password-init-request.type";
import { RecoverPasswordResetResponse } from "../types/recover-password-reset/recover-password-reset-response.type";
import { RecoverPasswordResetRequest } from "../types/recover-password-reset/recover-password-reset-request.type";

export const recoverPasswordApi = createApi({
    reducerPath: "recoverPasswordApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/recover-password`,
        credentials: "include",
    }),
    endpoints(builder) {
        return {
            initRequest: builder
                .mutation<RecoverPasswordInitResponse, RecoverPasswordInitRequest>({
                    query(data) {
                        return {
                            url: `/init`,
                            method: "POST",
                            body: data,
                        }
                    },
                }),
            resetRequest: builder
                .mutation<RecoverPasswordResetResponse, RecoverPasswordResetRequest>({
                    query(data) {
                        return {
                            url: `/reset`,
                            method: "POST",
                            body: data,
                        }
                    }
                })
        }
    },
});

export const {
    useInitRequestMutation,
    useResetRequestMutation
} = recoverPasswordApi;