import { createSlice } from "@reduxjs/toolkit";

type Toast = {
    title: string
    message: string
    show: boolean
}

type ProfileState = {
    toast: Toast
}

const initialState: ProfileState = {
    toast: {
        title: "",
        message: "",
        show: false
    }
}

const ProfileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfileToast: (state, action: { payload: Toast }) => {
            state.toast = action.payload;
        }
    }
});

const ProfileReducer = ProfileSlice.reducer;
export const { setProfileToast } = ProfileSlice.actions;
export default ProfileReducer;