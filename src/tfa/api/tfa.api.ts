import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "../../app/constants/app.constants";
import { ValidateTfaResponse } from "../types/validate-tfa/validate-tfa-response.type";
import { ValidateTfaRequest } from "../types/validate-tfa/validate-tfa-request.type";
import i18n from "../../app/i18n/i18n";

export const tfaApi = createApi({
    reducerPath: "tfaApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/tfa`,
        credentials: "include",
        prepareHeaders: (headers) => {
            headers.append('Accept-Language', `${i18n.language}`);
            return headers;
        },
    }),
    endpoints(builder) {
        return {
            validateTfa: builder.mutation<ValidateTfaResponse, ValidateTfaRequest>({
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
    useValidateTfaMutation,
} = tfaApi;