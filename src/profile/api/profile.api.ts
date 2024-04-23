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
        }
    },
});

export const {
    useGetProfileQuery,
    useUpdateAvatarMutation,
    useUpdateNameMutation,
    useUpdateGenderMutation,
    useUpdateEmailMutation,
} = profileApi;