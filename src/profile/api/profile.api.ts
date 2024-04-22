import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "../../app/constants/app.constants";
import { GetProfileResponse } from "../types/get-profile/get-profile-response.type";
import { UpdateAvatarResponse } from "../types/update-avatar/update-avatar-response.type";
import { UpdateAvatarRequest } from "../types/update-avatar/update-avatar-request.type";
import { UpdateNameResponse } from "../types/update-name/update-name-response.type";
import { UpdateNameRequest } from "../types/update-name/update-name-request.type";

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
        }
    },
});

export const {
    useGetProfileQuery,
    useUpdateAvatarMutation,
    useUpdateNameMutation
} = profileApi;