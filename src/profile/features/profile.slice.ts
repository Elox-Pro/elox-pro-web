import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../users/types/user.type";

type Toast = {
    title: string
    message: string
    show: boolean
}

type ProfileState = {
    toast: Toast,
    profile: User,
    profileT: Record<string, string> // Profile translations
}

const initialState: ProfileState = {
    toast: {
        title: "",
        message: "",
        show: false
    },
    profile: {},
    profileT: {}
}

const ProfileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfileToast: (state, action: { payload: Toast }) => {
            state.toast = action.payload;
        },
        setProfile: (state, action: { payload: User }) => {
            state.profile = action.payload;
        },
        setProfileT: (state, action: { payload: Record<string, string> }) => {
            state.profileT = action.payload;
        }
    }
});

const ProfileReducer = ProfileSlice.reducer;
export const { setProfileToast, setProfile, setProfileT } = ProfileSlice.actions;
export default ProfileReducer;