import { createSlice } from "@reduxjs/toolkit/react";
import { AvatarState } from "../types/avatar-state.type";
import { Avatar } from "../types/avatar.type";

const initialState: AvatarState = {
    selectedAvatar: null
}

const avatarSlice = createSlice({
    name: "avatar",
    initialState,
    reducers: {
        setSelectedAvatar: (state, action: { payload: Avatar | null }) => {
            state.selectedAvatar = action.payload;
        },
    }
})

const avatarReducer = avatarSlice.reducer;
export const { setSelectedAvatar } = avatarSlice.actions;
export default avatarReducer;
