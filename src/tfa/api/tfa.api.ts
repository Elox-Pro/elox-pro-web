import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "../../app/constants/app.constants";
import { ValidateTfaResponse } from "../types/validate-tfa/validate-tfa-response.type";
import { ValidateTfaRequest } from "../types/validate-tfa/validate-tfa-request.type";

export const tfaApi = createApi({
    reducerPath: "tfaApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/tfa`,
        credentials: "include",
    }),
    endpoints(builder) {
        return {
            validateTfaRequest: builder.mutation<ValidateTfaResponse, ValidateTfaRequest>({
                query(data) {
                    return {
                        url: `/validate`,
                        method: "POST",
                        body: data,
                    }
                },
            }),
        }
    },
});

export const {
    useValidateTfaRequestMutation,
} = tfaApi;