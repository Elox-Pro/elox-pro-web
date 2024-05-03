import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "../../app/constants/app.constants";
import { GetProfileResponse } from "../types/get-profile/get-profile-response.type";
import { UpdateAvatarResponse } from "../types/update-avatar/update-avatar-response.type";
import { UpdateAvatarRequest } from "../types/update-avatar/update-avatar-request.type";
import { UpdateNameResponse } from "../types/update-name/update-name-response.type";
import { UpdateNameRequest } from "../types/update-name/update-name-request.type";
import { UpdateGenderResponse } from "../types/update-gender/update-gender-response.type";
import { UpdateGenderRequest } from "../types/update-gender/update-gender-request.type";
import { UpdateEmailResponse } from "../types/update-email/update-email-response.type";
import { UpdateEmailRequest } from "../types/update-email/update-email-request.type";
import { UpdatePhoneResponse } from "../types/update-phone/update-phone-response.type";
import { UpdatePhoneRequest } from "../types/update-phone/update-phone-request.type";
import { UpdatePasswordRequest } from "../types/update-password/update-password-request.type";
import { UpdatePasswordResponse } from "../types/update-password/update-password-response.type";
import { UpdateTfaResponse } from "../types/update-tfa/update-tfa-response.type";
import { UpdateTfaRequest } from "../types/update-tfa/update-tfa-request.type";

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/users/profile`,
        credentials: "include",
    }),
    tagTypes: ["getProfile"],
    endpoints(builder) {
        return {
            getProfile: builder.query<GetProfileResponse, void>({
                query() { return `/` },
                providesTags: ["getProfile"]
            }),
            updateAvatar: builder.mutation<UpdateAvatarResponse, UpdateAvatarRequest>({
                query(body) {
                    return { url: `/avatar`, method: "PATCH", body }
                },
                invalidatesTags: ["getProfile"]
            }),
            updateName: builder.mutation<UpdateNameResponse, UpdateNameRequest>({
                query(body) {
                    return { url: `/name`, method: "PATCH", body }
                },
                invalidatesTags: ["getProfile"]
            }),
            updateGender: builder.mutation<UpdateGenderResponse, UpdateGenderRequest>({
                query(body) {
                    return { url: `/gender`, method: "PATCH", body }
                },
                invalidatesTags: ["getProfile"]
            }),
            updateEmail: builder.mutation<UpdateEmailResponse, UpdateEmailRequest>({
                query(body) {
                    return { url: `/email`, method: "PATCH", body }
                },
                invalidatesTags: ["getProfile"]
            }),
            updatePhone: builder.mutation<UpdatePhoneResponse, UpdatePhoneRequest>({
                query(body) {
                    return { url: `/phone`, method: "PATCH", body }
                },
                invalidatesTags: ["getProfile"]
            }),
            updatePassword: builder.mutation<UpdatePasswordResponse, UpdatePasswordRequest>({
                query(body) {
                    return { url: `/password`, method: "PATCH", body }
                },
                invalidatesTags: ["getProfile"]
            }),
            updateTfa: builder.mutation<UpdateTfaResponse, UpdateTfaRequest>({
                query(body) {
                    return { url: `/tfa`, method: "PATCH", body }
                },
                invalidatesTags: ["getProfile"]
            })
        }
    },
});

export const {
    useGetProfileQuery,
    useUpdateAvatarMutation,
    useUpdateNameMutation,
    useUpdateGenderMutation,
    useUpdateEmailMutation,
    useUpdatePhoneMutation,
    useUpdatePasswordMutation,
    useUpdateTfaMutation
} = profileApi;