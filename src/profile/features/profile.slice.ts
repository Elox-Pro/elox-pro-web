import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../users/types/user.type";

type AvatarState = {
    selected: string
}

type ProfileState = {
    profile: User,
    profileTranslations: Record<string, string>,
    avatar: AvatarState
}

const initialState: ProfileState = {
    profile: {},
    profileTranslations: {},
    avatar: { selected: "" }
}

const ProfileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action: { payload: User }) => {
            state.profile = action.payload;
        },
        setProfileTranslations: (state, action: { payload: Record<string, string> }) => {
            state.profileTranslations = action.payload;
        },
        setAvatar: (state, action: { payload: AvatarState }) => {
            state.avatar = action.payload;
        }
    }
});

const ProfileReducer = ProfileSlice.reducer;

export const {
    setProfile,
    setProfileTranslations,
} = ProfileSlice.actions;

export default ProfileReducer;