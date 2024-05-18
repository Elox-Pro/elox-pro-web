import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../users/types/user.type";
import { ProfileState } from "../types/profile-state.type";
import { logout } from "../../auth/features/auth.slice";

const initialState: ProfileState = {
    profile: null,
    profileTranslations: null
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action: { payload: User | null }) => {
            state.profile = action.payload;
        },
        setProfileTranslations: (state, action: { payload: Record<string, string> }) => {
            state.profileTranslations = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return profileSlice.getInitialState();
        })
    }
});

const profileReducer = profileSlice.reducer;

export const {
    setProfile,
    setProfileTranslations,
} = profileSlice.actions;

export default profileReducer;