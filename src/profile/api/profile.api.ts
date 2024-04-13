import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "../../app/constants/app.constants";
import { GetProfileResponse } from "../types/get-profile/get-profile-response.type";
import { UpdateAvatarResponse } from "../types/update-avatar/update-avatar-response.type";
import { UpdateAvatarRequest } from "../types/update-avatar/update-avatar-request.type";

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/users/profile`,
        credentials: "include",
    }),
    endpoints(builder) {
        return {
            getProfile: builder.query<GetProfileResponse, void>({
                query() {
                    return `/`
                }
            }),
            updateAvatar: builder.mutation<UpdateAvatarResponse, UpdateAvatarRequest>({
                query(data) {
                    return {
                        url: `/avatar`,
                        method: "PATCH",
                        body: data,
                    }
                },
            })
        }
    },
});

export const { useGetProfileQuery, useUpdateAvatarMutation } = profileApi;