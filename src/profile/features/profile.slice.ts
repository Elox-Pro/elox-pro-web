import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../users/types/user.type";
import { ProfileState } from "../types/profile-state.type";
import { logout } from "../../auth/features/auth.slice";

const initialState: ProfileState = {
    profile: null
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action: { payload: User | null }) => {
            state.profile = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return profileSlice.getInitialState();
        })
    }
});

const profileReducer = profileSlice.reducer;

export const {
    setProfile
} = profileSlice.actions;

export default profileReducer;