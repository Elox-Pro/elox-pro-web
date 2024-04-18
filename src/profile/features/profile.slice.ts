import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../users/types/user.type";
import { ProfileState } from "../types/profile-state.type";

const initialState: ProfileState = {
    profile: {},
    profileTranslations: {}
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
        }
    }
});

const ProfileReducer = ProfileSlice.reducer;

export const {
    setProfile,
    setProfileTranslations,
} = ProfileSlice.actions;

export default ProfileReducer;